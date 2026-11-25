import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it, vi } from "vitest"
import { Site } from "./App"
import {
    experiences,
    experienceSlug,
    projects,
    projectsByYear,
    projectSlug
} from "../features/timeline/timeline.api"

/** Pretend only Burrow has a Markdown write-up. */
const WRITTEN = "burrow"

/** Pretend only the IT Lead role has a Markdown write-up. */
const WRITTEN_ROLE = "it-lead"

vi.mock("../features/timeline/projectContent", () => ({
    hasContent: (slug: string) => slug === "burrow",
    projectContent: (slug: string) =>
        slug === "burrow" ? "<h2>Write-up heading</h2><p>Write-up body.</p>" : undefined,
    hasExperienceContent: (slug: string) => slug === "it-lead",
    experienceContent: (slug: string) =>
        slug === "it-lead" ? "<h2>Role heading</h2><p>Role body.</p>" : undefined
}))

const renderAt = (path: string) =>
    render(
        <MemoryRouter initialEntries={[path]}>
            <Site />
        </MemoryRouter>
    )

/** The projects page with every year group opened. */
const renderProjects = () => {
    const result = renderAt("/projects")
    document
        .querySelectorAll<HTMLButtonElement>('.year-toggle[aria-expanded="false"]')
        .forEach((button) => fireEvent.click(button))
    return result
}

describe("<Site />", () => {
    describe("home", () => {
        it("has no name heading, headshot or experience list", () => {
            renderAt("/")
            const main = within(screen.getByRole("main"))

            expect(main.queryByRole("heading", { level: 1 })).toBeNull()
            expect(main.queryByAltText("AJ Kneisl")).toBeNull()
            expect(main.queryByText(/Experience/)).toBeNull()
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
        const yearButton = (year: number) =>
            screen.getByRole("button", { name: new RegExp(`^${year}\\b`) })

        it("groups projects under the last year they were active, newest first", () => {
            renderAt("/projects")

            const years = screen
                .getAllByRole("button", { expanded: undefined })
                .filter((b) => b.classList.contains("year-toggle"))
                .map((b) => Number(b.querySelector(".year-label")!.textContent))
            expect(years).toEqual(projectsByYear().map((g) => g.year))
            expect(years).toEqual([...years].sort((a, b) => b - a))
        })

        it("opens 2026 by default and keeps the other years closed", () => {
            renderAt("/projects")
            const [newest, ...older] = projectsByYear()

            expect(newest.year).toBe(2026)
            expect(yearButton(2026)).toHaveAttribute("aria-expanded", "true")
            newest.projects.forEach((proj) => expect(rowFor(proj.title)).toBeInTheDocument())
            older.forEach((group) => {
                expect(yearButton(group.year)).toHaveAttribute("aria-expanded", "false")
                group.projects.forEach((proj) =>
                    expect(screen.queryByRole("heading", { name: proj.title })).toBeNull()
                )
            })
        })

        it("opens and closes a year when its header is clicked", () => {
            renderAt("/projects")
            const older = projectsByYear()[1]

            fireEvent.click(yearButton(older.year))
            expect(yearButton(older.year)).toHaveAttribute("aria-expanded", "true")
            expect(rowFor(older.projects[0].title)).toBeInTheDocument()

            fireEvent.click(yearButton(older.year))
            expect(screen.queryByRole("heading", { name: older.projects[0].title })).toBeNull()

            fireEvent.click(yearButton(2026))
            expect(yearButton(2026)).toHaveAttribute("aria-expanded", "false")
        })

        it("lists every project with its subtitle once its year is open", () => {
            renderProjects()

            projects.forEach((proj) =>
                expect(within(rowFor(proj.title)).getByText(proj.subtitle)).toBeInTheDocument()
            )
        })

        it("shows a project's picture when it has one, and an empty slot otherwise", () => {
            renderProjects()

            projects.forEach((proj) => {
                const img = rowFor(proj.title).querySelector(".row-icon img")
                if (proj.icon) expect(img).toHaveAttribute("src", proj.icon)
                else expect(img).toBeNull()
            })
        })

        it("shows a date next to the name only when it says more than the year header", () => {
            renderProjects()

            projectsByYear().forEach(({ year, projects: group }) =>
                group.forEach((proj) => {
                    const date = rowFor(proj.title).querySelector(".row-date")
                    if (proj.year === String(year)) {
                        expect(date).toBeNull()
                    } else {
                        expect(date).toHaveTextContent(proj.year)
                        expect(date!.previousElementSibling).toBe(
                            screen.getByRole("heading", { name: proj.title })
                        )
                    }
                })
            )
        })

        it("keeps each description to one line, with the full text on hover", () => {
            renderProjects()

            projects.forEach((proj) => {
                const desc = within(rowFor(proj.title)).getByText(proj.subtitle)
                expect(desc).toHaveClass("row-desc")
                expect(desc).toHaveAttribute("title", proj.subtitle)
            })
        })

        it("puts the links on their own line below the description", () => {
            renderProjects()

            projects
                .filter((proj) => proj.link || proj.appStoreLink || proj.githubLink)
                .forEach((proj) => {
                    const links = rowFor(proj.title).querySelector(".row-links")
                    expect(links!.previousElementSibling).toBe(
                        within(rowFor(proj.title)).getByText(proj.subtitle)
                    )
                })
        })

        it("links out to each project's site, App Store listing and repository when set", () => {
            renderProjects()

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
            renderProjects()

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

    describe("experience", () => {
        const rowFor = (title: string) =>
            screen.getByRole("heading", { name: title }).closest("li") as HTMLElement

        it("is in the nav", () => {
            renderAt("/")

            fireEvent.click(
                within(screen.getByRole("navigation")).getByRole("link", {
                    name: "Experience"
                })
            )

            expect(
                screen.getByRole("heading", { level: 1, name: "Experience" })
            ).toBeInTheDocument()
        })

        it("lists the TA, OIT and RBC roles", () => {
            renderAt("/experience")

            expect(screen.getByText(/College of Science and Engineering/)).toBeInTheDocument()
            expect(screen.getByText(/Office of Information Technology/)).toBeInTheDocument()
            expect(screen.getByText(/RBC/)).toBeInTheDocument()
        })

        it("shows every role with its dates and organization, and no description", () => {
            renderAt("/experience")

            experiences.forEach((exp) => {
                const row = rowFor(exp.title)
                expect(within(row).getByText(exp.year)).toBeInTheDocument()
                expect(within(row).getByText(exp.company)).toBeInTheDocument()
                expect(row.querySelector(".row-desc")).toBeNull()
            })
        })

        it("links a role to its own page only when it has a write-up", () => {
            renderAt("/experience")

            experiences.forEach((exp) => {
                const link = screen.queryByRole("link", { name: exp.title })
                if (experienceSlug(exp) === WRITTEN_ROLE) {
                    expect(link).toHaveAttribute("href", `/experience/${WRITTEN_ROLE}`)
                } else {
                    expect(link).toBeNull()
                }
            })
        })

        it("opens a role's page with its write-up, and back", () => {
            renderAt("/experience")
            const role = experiences.find((exp) => experienceSlug(exp) === WRITTEN_ROLE)!

            fireEvent.click(screen.getByRole("link", { name: role.title }))

            expect(screen.getByRole("heading", { level: 1, name: role.title })).toBeInTheDocument()
            expect(screen.getByText(role.year)).toBeInTheDocument()
            expect(screen.getByRole("heading", { name: "Role heading" })).toBeInTheDocument()
            expect(
                within(screen.getByRole("navigation")).getByRole("link", { name: "Experience" })
            ).toHaveClass("active")

            fireEvent.click(screen.getByRole("link", { name: "← Experience" }))
            expect(screen.getByRole("heading", { level: 1, name: "Experience" })).toBeInTheDocument()
        })

        it("has no page for a role without a write-up", () => {
            const other = experiences.find((exp) => experienceSlug(exp) !== WRITTEN_ROLE)!
            renderAt(`/experience/${experienceSlug(other)}`)

            expect(screen.getByRole("heading", { name: "Not found" })).toBeInTheDocument()
        })

        it("puts the date on the same line, right after the role", () => {
            renderAt("/experience")

            experiences.forEach((exp) => {
                const date = within(rowFor(exp.title)).getByText(exp.year)
                expect(date.previousElementSibling).toBe(
                    screen.getByRole("heading", { name: exp.title })
                )
            })
        })

        it("shows each role's logo when it has one", () => {
            renderAt("/experience")

            experiences.forEach((exp) => {
                const img = rowFor(exp.title).querySelector(".row-icon img")
                if (exp.icon) expect(img).toHaveAttribute("src", exp.icon)
                else expect(img).toBeNull()
            })
        })

        it("links each organization in a new tab", () => {
            renderAt("/experience")

            experiences
                .filter((exp) => exp.link)
                .forEach((exp) => {
                    const link = screen.getByRole("link", { name: exp.company })
                    expect(link).toHaveAttribute("href", exp.link)
                    expect(link).toHaveAttribute("target", "_blank")
                    expect(link).toHaveAttribute("rel", "noopener noreferrer")
                })
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
