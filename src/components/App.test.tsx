import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it, vi } from "vitest"
import { Site } from "./App"
import { projects, projectSlug } from "../features/timeline/timeline.api"

/** Pretend only Burrow has a Markdown write-up. */
const WRITTEN = "burrow"

vi.mock("../features/timeline/projectContent", () => ({
    hasContent: (slug: string) => slug === "burrow",
    projectContent: (slug: string) =>
        slug === "burrow" ? "<h2>Write-up heading</h2><p>Write-up body.</p>" : undefined
}))

const renderAt = (path: string) =>
    render(
        <MemoryRouter initialEntries={[path]}>
            <Site />
        </MemoryRouter>
    )

describe("<Site />", () => {
    describe("home", () => {
        it("has no name heading, headshot or experience", () => {
            renderAt("/")

            expect(screen.queryByRole("heading", { level: 1 })).toBeNull()
            expect(screen.queryByRole("img")).toBeNull()
            expect(screen.queryByText(/Experience/)).toBeNull()
        })

        it.each([
            ["GitHub", "https://github.com/ajkneisl"],
            ["LinkedIn", "https://linkedin.com/in/ajkn"]
        ])("links to %s in a new tab", (label, href) => {
            renderAt("/")

            const link = screen.getByRole("link", { name: new RegExp(label) })
            expect(link).toHaveAttribute("href", href)
            expect(link).toHaveAttribute("target", "_blank")
            expect(link).toHaveAttribute("rel", "noopener noreferrer")
        })

        it("exposes a mailto link", () => {
            renderAt("/")

            expect(screen.getByRole("link", { name: "aj@knei.sl" })).toHaveAttribute(
                "href",
                "mailto:aj@knei.sl"
            )
        })

        it("navigates to the projects page", () => {
            renderAt("/")

            fireEvent.click(
                within(screen.getByRole("navigation")).getByRole("link", {
                    name: "Projects"
                })
            )

            expect(
                screen.getByRole("heading", { level: 1, name: "Projects" })
            ).toBeInTheDocument()
        })
    })

    describe("projects", () => {
        const rowFor = (title: string) =>
            screen.getByRole("heading", { name: title }).closest("li") as HTMLElement

        it("lists every project with its subtitle and year", () => {
            renderAt("/projects")

            projects.forEach((proj) => {
                const row = rowFor(proj.title)
                expect(within(row).getByText(proj.subtitle)).toBeInTheDocument()
                expect(within(row).getByText(proj.year)).toBeInTheDocument()
            })
        })

        it("links out to each project's site, App Store listing and repository when set", () => {
            renderAt("/projects")

            projects.forEach((proj) => {
                const links = within(rowFor(proj.title))
                    .queryAllByRole("link")
                    .filter((l) => l.getAttribute("target") === "_blank")

                expect(links.map((l) => l.getAttribute("href"))).toEqual(
                    [proj.link, proj.appStoreLink, proj.githubLink].filter(Boolean)
                )
                links.forEach((l) => {
                    expect(l).toHaveAttribute("target", "_blank")
                    expect(l).toHaveAttribute("rel", "noopener noreferrer")
                })
            })
        })
    })

    describe("project page", () => {
        const written = projects.find((proj) => projectSlug(proj) === WRITTEN)!
        const unwritten = projects.filter((proj) => projectSlug(proj) !== WRITTEN)

        it("is linked from the list only for projects with a write-up", () => {
            renderAt("/projects")

            expect(screen.getByRole("link", { name: written.title })).toHaveAttribute(
                "href",
                `/projects/${WRITTEN}`
            )
            unwritten.forEach((proj) =>
                expect(screen.queryByRole("link", { name: proj.title })).toBeNull()
            )
        })

        it("opens from the list", () => {
            renderAt("/projects")

            fireEvent.click(screen.getByRole("link", { name: written.title }))

            expect(
                screen.getByRole("heading", { level: 1, name: written.title })
            ).toBeInTheDocument()
            expect(screen.getByText("Write-up body.")).toBeInTheDocument()
        })

        it("shows the project's details and write-up", () => {
            renderAt(`/projects/${WRITTEN}`)

            expect(
                screen.getByRole("heading", { level: 1, name: written.title })
            ).toBeInTheDocument()
            expect(screen.getByText(written.year)).toBeInTheDocument()
            expect(screen.getByText(written.subtitle)).toBeInTheDocument()
            expect(screen.getByText(written.tech.join(", "))).toBeInTheDocument()
            expect(
                screen.getByRole("heading", { name: "Write-up heading" })
            ).toBeInTheDocument()

            const hrefs = screen
                .queryAllByRole("link")
                .filter((l) => l.getAttribute("target") === "_blank")
                .map((l) => l.getAttribute("href"))
            expect(hrefs).toEqual(
                [written.link, written.appStoreLink, written.githubLink].filter(Boolean)
            )
        })

        it("has no page for a project without a write-up", () => {
            renderAt(`/projects/${projectSlug(unwritten[0])}`)

            expect(
                screen.getByRole("heading", { name: "Project not found" })
            ).toBeInTheDocument()
        })

        it("keeps Projects highlighted in the nav", () => {
            renderAt(`/projects/${WRITTEN}`)

            expect(
                within(screen.getByRole("navigation")).getByRole("link", {
                    name: "Projects"
                })
            ).toHaveClass("active")
        })

        it("says so for an unknown project, with a way back", () => {
            renderAt("/projects/does-not-exist")

            expect(
                screen.getByRole("heading", { name: "Project not found" })
            ).toBeInTheDocument()
            expect(screen.getByRole("link", { name: "← Projects" })).toHaveAttribute(
                "href",
                "/projects"
            )
        })
    })

    it("moves between pages from the nav without breaking", () => {
        renderAt("/")
        const nav = () => within(screen.getByRole("navigation"))

        fireEvent.click(nav().getByRole("link", { name: "Projects" }))
        expect(screen.getByRole("heading", { level: 1, name: "Projects" })).toBeInTheDocument()

        fireEvent.click(nav().getByRole("link", { name: "Home" }))
        expect(screen.getByRole("link", { name: "aj@knei.sl" })).toBeInTheDocument()
    })

    it("marks the current page in the nav", () => {
        renderAt("/projects")
        const nav = within(screen.getByRole("navigation"))

        expect(nav.getByRole("link", { name: "Projects" })).toHaveClass("active")
        expect(nav.getByRole("link", { name: "Home" })).not.toHaveClass("active")
    })

    it("falls back to home for unknown paths", () => {
        renderAt("/nope")

        expect(screen.getByRole("link", { name: "aj@knei.sl" })).toBeInTheDocument()
    })

    it("renders the footer", () => {
        renderAt("/")

        expect(
            within(screen.getByRole("contentinfo")).getByText(/AJ Kneisl ©/)
        ).toBeInTheDocument()
    })
})
