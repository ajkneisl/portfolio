import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"

const ROOT = process.cwd()
const SRC_DIR = path.join(ROOT, "src")
const PUBLIC_DIR = path.join(ROOT, "public")

/** Every src=""/href="" literal in the source that names a file rather than a route or URL. */
const ASSET_REF =
    /(?:src|href)=["'](?!https?:|mailto:|data:|#)([^"']+\.[a-z0-9]{2,4})["']/gi

function sourceFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((entry) => {
        const full = path.join(dir, entry)
        if (statSync(full).isDirectory()) return sourceFiles(full)
        return /\.(ts|tsx)$/.test(entry) && !/\.(test|spec)\.tsx?$/.test(entry)
            ? [full]
            : []
    })
}

type AssetRef = { file: string; ref: string }

const references: AssetRef[] = sourceFiles(SRC_DIR).flatMap((file) => {
    const contents = readFileSync(file, "utf-8")
    return Array.from(contents.matchAll(ASSET_REF), (match) => ({
        file: path.relative(ROOT, file),
        ref: match[1]
    }))
})

/** Resolves a reference against public/, treating a bare path as root-relative. */
const resolveInPublic = (ref: string) =>
    path.join(PUBLIC_DIR, ref.replace(/^\//, ""))

describe("public asset references", () => {
    it("finds asset references to check", () => {
        expect(references.length).toBeGreaterThan(0)
    })

    it("resolves every referenced asset to a file in public/", () => {
        const broken = references
            .filter(({ ref }) => !existsSync(resolveInPublic(ref)))
            .map(({ file, ref }) => `${file} → ${ref}`)

        expect(broken).toEqual([])
    })

    it("ships an index.html that points at real entry assets", () => {
        const html = readFileSync(path.join(ROOT, "index.html"), "utf-8")
        const broken = Array.from(html.matchAll(ASSET_REF), (match) => match[1])
            .filter((ref) => !ref.startsWith("/src/"))
            .filter((ref) => !existsSync(resolveInPublic(ref)))

        expect(broken).toEqual([])
    })
})
