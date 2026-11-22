import { describe, expect, it } from "vitest"
import { contentSlugs, hasContent, projectContent, renderMarkdown } from "./projectContent"
import { projects, projectSlug } from "./timeline.api"

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
