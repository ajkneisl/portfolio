import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { Site } from "./App"
import { projects } from "../features/timeline/timeline.api"

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

            expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
                "href",
                "mailto:aj@ajkneisl.dev"
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
                const links = within(rowFor(proj.title)).queryAllByRole("link")

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

    it("marks the current page in the nav", () => {
        renderAt("/projects")
        const nav = within(screen.getByRole("navigation"))

        expect(nav.getByRole("link", { name: "Projects" })).toHaveClass("active")
        expect(nav.getByRole("link", { name: "Home" })).not.toHaveClass("active")
    })

    it("falls back to home for unknown paths", () => {
        renderAt("/nope")

        expect(screen.getByRole("link", { name: "Email" })).toBeInTheDocument()
    })

    it("renders the footer", () => {
        renderAt("/")

        expect(
            within(screen.getByRole("contentinfo")).getByText(/AJ Kneisl ©/)
        ).toBeInTheDocument()
    })
})
