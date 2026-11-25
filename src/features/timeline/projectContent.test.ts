import { describe, expect, it } from "vitest"
import {
    contentSlugs,
    experienceContent,
    experienceContentSlugs,
    hasContent,
    hasExperienceContent,
    projectContent,
    renderMarkdown
} from "./projectContent"
import { experiences, experienceSlug, projects, projectSlug } from "./timeline.api"

describe("project content", () => {
    it("names every Markdown file after an existing project", () => {
        const slugs = new Set(projects.map(projectSlug))

        expect(contentSlugs.filter((slug) => !slugs.has(slug))).toEqual([])
    })

    it("ignores the README", () => {
        expect(contentSlugs).not.toContain("README")
    })

    it("returns nothing for a project without a write-up", () => {
        expect(hasContent("does-not-exist")).toBe(false)
        expect(projectContent("does-not-exist")).toBeUndefined()
    })

    it("agrees on which projects have a write-up", () => {
        projects.map(projectSlug).forEach((slug) =>
            expect(hasContent(slug)).toBe(projectContent(slug) !== undefined)
        )
    })

    it("names every experience Markdown file after an existing role", () => {
        const slugs = new Set(experiences.map(experienceSlug))

        expect(experienceContentSlugs.filter((slug) => !slugs.has(slug))).toEqual([])
    })

    it("agrees on which roles have a write-up", () => {
        experiences.map(experienceSlug).forEach((slug) =>
            expect(hasExperienceContent(slug)).toBe(experienceContent(slug) !== undefined)
        )
        expect(hasExperienceContent("does-not-exist")).toBe(false)
    })

    it("renders Markdown to HTML", () => {
        const html = renderMarkdown(
            "## Heading\n\nSome **bold** text with a [link](https://example.com).\n\n- one\n- two"
        )

        expect(html).toContain("<h2>Heading</h2>")
        expect(html).toContain("<strong>bold</strong>")
        expect(html).toContain('<a href="https://example.com">link</a>')
        expect(html).toContain("<li>one</li>")
    })
})
