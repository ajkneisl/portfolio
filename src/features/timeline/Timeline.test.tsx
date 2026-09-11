import { fireEvent, render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Timeline from "./Timeline"
import { experiences, projects } from "./timeline.api"

/** The clickable row wrapping a given experience or project heading. */
const rowFor = (title: string) => {
    const row = screen
        .getByRole("heading", { name: title })
        .closest("div.cursor-pointer")
    if (!row) throw new Error(`no clickable row found for "${title}"`)
    return row as HTMLElement
}

/** The collapsible wrapper around an experience description. */
const descriptionWrapper = (description: string) => {
    const wrapper = screen.getByText(description).parentElement
    if (!wrapper)
        throw new Error(`no wrapper found for description "${description}"`)
    return wrapper
}

const isExpanded = (exp: (typeof experiences)[number]) =>
    descriptionWrapper(exp.description).className.includes("max-h-96")

describe("<Timeline />", () => {
    it("renders both sections", () => {
        render(<Timeline />)

        expect(
            screen.getByRole("heading", { name: "Experience" })
        ).toBeInTheDocument()
        expect(
            screen.getByRole("heading", { name: "Projects" })
        ).toBeInTheDocument()
    })

    it("renders every experience with its company, year and tech list", () => {
        render(<Timeline />)

        experiences.forEach((exp) => {
            const row = rowFor(exp.title)
            expect(
                within(row).getByText(`at ${exp.company}`)
            ).toBeInTheDocument()
            expect(within(row).getAllByText(exp.year).length).toBeGreaterThan(0)
            expect(
                within(row).getByText(exp.tech.join(" • "))
            ).toBeInTheDocument()
        })
    })

    it("renders every project with its subtitle, year and tech list", () => {
        render(<Timeline />)

        projects.forEach((proj) => {
            const row = rowFor(proj.title)
            expect(within(row).getByText(proj.subtitle)).toBeInTheDocument()
            expect(within(row).getAllByText(proj.year).length).toBeGreaterThan(
                0
            )
            expect(
                within(row).getByText(proj.tech.join(" • "))
            ).toBeInTheDocument()
        })
    })

    it("renders an icon for entries that have one", () => {
        render(<Timeline />)

        experiences
            .filter((exp) => exp.icon)
            .forEach((exp) => {
                expect(
                    within(rowFor(exp.title)).getByAltText(exp.company)
                ).toHaveAttribute("src", exp.icon)
            })

        projects
            .filter((proj) => proj.icon)
            .forEach((proj) => {
                expect(
                    within(rowFor(proj.title)).getByAltText(proj.title)
                ).toHaveAttribute("src", proj.icon)
            })
    })

    it("falls back to an initial for entries with no icon", () => {
        render(<Timeline />)

        experiences
            .filter((exp) => !exp.icon)
            .forEach((exp) => {
                const row = rowFor(exp.title)
                expect(
                    within(row).queryByAltText(exp.company)
                ).not.toBeInTheDocument()
                expect(
                    within(row).getByText(exp.company.charAt(0).toUpperCase())
                ).toBeInTheDocument()
            })

        projects
            .filter((proj) => !proj.icon)
            .forEach((proj) => {
                const row = rowFor(proj.title)
                expect(
                    within(row).queryByAltText(proj.title)
                ).not.toBeInTheDocument()
                expect(
                    within(row).getByText(proj.title.charAt(0).toUpperCase())
                ).toBeInTheDocument()
            })
    })

    it("links out to a project's site, repository and App Store listing when set", () => {
        render(<Timeline />)

        projects.forEach((proj) => {
            const hrefs = within(rowFor(proj.title))
                .queryAllByRole("link")
                .map((link) => link.getAttribute("href"))

            if (proj.link) expect(hrefs).toContain(proj.link)
            if (proj.githubLink) expect(hrefs).toContain(proj.githubLink)
            if (proj.appStoreLink) expect(hrefs).toContain(proj.appStoreLink)
        })
    })

    it("renders no GitHub icon for a project without a repository", () => {
        render(<Timeline />)

        const withoutRepo = projects.filter((proj) => !proj.githubLink)
        expect(withoutRepo.length).toBeGreaterThan(0)

        withoutRepo.forEach((proj) => {
            expect(
                within(rowFor(proj.title)).queryByAltText("GitHub")
            ).not.toBeInTheDocument()
        })
    })

    it("never renders a link without an href", () => {
        const { container } = render(<Timeline />)

        expect(container.querySelectorAll("a:not([href])")).toHaveLength(0)
    })

    it("opens every outbound link in a new tab without leaking the referrer", () => {
        render(<Timeline />)

        screen.getAllByRole("link").forEach((link) => {
            expect(link).toHaveAttribute("target", "_blank")
            expect(link).toHaveAttribute("rel", "noopener noreferrer")
        })
    })

    describe("expanding an experience", () => {
        it("starts collapsed", () => {
            render(<Timeline />)

            experiences.forEach((exp) => expect(isExpanded(exp)).toBe(false))
        })

        it("expands the clicked experience", () => {
            render(<Timeline />)

            fireEvent.click(rowFor(experiences[0].title))

            expect(isExpanded(experiences[0])).toBe(true)
        })

        it("collapses again on a second click", () => {
            render(<Timeline />)

            fireEvent.click(rowFor(experiences[0].title))
            fireEvent.click(rowFor(experiences[0].title))

            expect(isExpanded(experiences[0])).toBe(false)
        })

        it("leaves the other experiences alone", () => {
            render(<Timeline />)

            fireEvent.click(rowFor(experiences[0].title))

            experiences
                .slice(1)
                .forEach((exp) => expect(isExpanded(exp)).toBe(false))
        })

        it("keeps several experiences open at once", () => {
            render(<Timeline />)

            fireEvent.click(rowFor(experiences[0].title))
            fireEvent.click(rowFor(experiences[1].title))

            expect(isExpanded(experiences[0])).toBe(true)
            expect(isExpanded(experiences[1])).toBe(true)
        })

        it("rotates the chevron while expanded", () => {
            const { container } = render(<Timeline />)
            const chevron = () =>
                rowFor(experiences[0].title).querySelector("svg") as SVGElement

            expect(container).toBeTruthy()
            expect(chevron().getAttribute("class")).not.toContain("rotate-180")

            fireEvent.click(rowFor(experiences[0].title))

            expect(chevron().getAttribute("class")).toContain("rotate-180")
        })
    })
})
