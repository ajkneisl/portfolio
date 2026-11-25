import { marked } from 'marked'

/**
 * Optional Markdown write-ups. A file named after an entry's slug gives that entry its own page:
 *   src/content/projects/burrow.md       → /projects/burrow
 *   src/content/experience/it-lead.md    → /experience/it-lead
 */
const projectFiles = import.meta.glob(['../../content/projects/*.md', '!**/README.md'], {
    query: '?raw',
    import: 'default',
    eager: true
}) as Record<string, string>

const experienceFiles = import.meta.glob(['../../content/experience/*.md', '!**/README.md'], {
    query: '?raw',
    import: 'default',
    eager: true
}) as Record<string, string>

/** Renders Markdown to HTML. */
export const renderMarkdown = (md: string): string => marked.parse(md, { async: false, gfm: true }) as string

const slugOf = (path: string) => path.split('/').pop()!.replace(/\.md$/, '')

/** One folder of write-ups, keyed by slug. Empty files count as missing. */
const collection = (files: Record<string, string>) => {
    const bySlug = new Map(Object.entries(files).map(([path, md]) => [slugOf(path), md]))
    return {
        slugs: [...bySlug.keys()],
        has: (slug: string): boolean => Boolean(bySlug.get(slug)?.trim()),
        render: (slug: string): string | undefined => {
            const md = bySlug.get(slug)
            return md?.trim() ? renderMarkdown(md) : undefined
        }
    }
}

const projectDocs = collection(projectFiles)
const experienceDocs = collection(experienceFiles)

/** Slugs that have a project Markdown file. */
export const contentSlugs = projectDocs.slugs
/** Whether a project has a write-up, and so its own page. */
export const hasContent = projectDocs.has
/** The rendered write-up for a project, or undefined if it has none. */
export const projectContent = projectDocs.render

/** Slugs that have an experience Markdown file. */
export const experienceContentSlugs = experienceDocs.slugs
/** Whether a role has a write-up, and so its own page. */
export const hasExperienceContent = experienceDocs.has
/** The rendered write-up for a role, or undefined if it has none. */
export const experienceContent = experienceDocs.render
