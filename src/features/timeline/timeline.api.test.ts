import { existsSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { experiences, projects } from "./timeline.api"
import { Experience, Project } from "./timeline.types"

const PUBLIC_DIR = path.resolve(process.cwd(), "public")

/** Resolves a public-root-relative asset path (e.g. "/rbc.svg") to a file on disk. */
const publicAsset = (ref: string) =>
    path.join(PUBLIC_DIR, ref.replace(/^\//, ""))

/** Every entry that can carry an icon, flattened so asset checks cover both sections. */
const allEntries: Array<Experience | Project> = [...experiences, ...projects]

describe("timeline data", () => {
    it("exposes a non-empty experience and project list", () => {
        expect(experiences.length).toBeGreaterThan(0)
        expect(projects.length).toBeGreaterThan(0)
    })

    describe.each(experiences.map((exp) => [exp.company, exp] as const))(
        "experience: %s",
        (_company, exp) => {
            it("has every required field filled in", () => {
                expect(exp.year.trim()).not.toBe("")
                expect(exp.title.trim()).not.toBe("")
                expect(exp.company.trim()).not.toBe("")
                expect(exp.description.trim()).not.toBe("")
            })

            it("lists at least one technology, none of them blank", () => {
                expect(exp.tech.length).toBeGreaterThan(0)
                exp.tech.forEach((tech) => expect(tech.trim()).not.toBe(""))
            })
        }
    )

    describe.each(projects.map((proj) => [proj.title, proj] as const))(
        "project: %s",
        (_title, proj) => {
            it("has every required field filled in", () => {
                expect(proj.year.trim()).not.toBe("")
                expect(proj.title.trim()).not.toBe("")
                expect(proj.subtitle.trim()).not.toBe("")
            })

            it("lists at least one technology, none of them blank", () => {
                expect(proj.tech.length).toBeGreaterThan(0)
                proj.tech.forEach((tech) => expect(tech.trim()).not.toBe(""))
            })
        }
    )

    it("uses a unique title for every project", () => {
        const titles = projects.map((proj) => proj.title)
        expect(new Set(titles).size).toBe(titles.length)
    })

    it("points every icon at a file that exists in public/", () => {
        const missing = allEntries
            .filter((entry) => entry.icon)
            .map((entry) => entry.icon as string)
            .filter((icon) => !existsSync(publicAsset(icon)))

        expect(missing).toEqual([])
    })

    it("starts every icon path at the public root", () => {
        allEntries
            .filter((entry) => entry.icon)
            .forEach((entry) => expect(entry.icon).toMatch(/^\//))
    })

    it("uses absolute https URLs for every outbound link", () => {
        const links = [
            ...experiences.flatMap((exp) => (exp.link ? [exp.link] : [])),
            ...projects.flatMap((proj) =>
                [proj.link, proj.githubLink, proj.appStoreLink].filter(
                    (link): link is string => Boolean(link)
                )
            )
        ]

        expect(links.length).toBeGreaterThan(0)
        links.forEach((link) => expect(link).toMatch(/^https:\/\//))
    })

    it("points every githubLink at github.com", () => {
        projects
            .filter((proj) => proj.githubLink)
            .forEach((proj) =>
                expect(new URL(proj.githubLink as string).hostname).toBe(
                    "github.com"
                )
            )
    })

    it("points every appStoreLink at apps.apple.com", () => {
        projects
            .filter((proj) => proj.appStoreLink)
            .forEach((proj) =>
                expect(new URL(proj.appStoreLink as string).hostname).toBe(
                    "apps.apple.com"
                )
            )
    })
})
