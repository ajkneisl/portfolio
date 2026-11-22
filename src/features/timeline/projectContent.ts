import { marked } from 'marked'

const files = import.meta.glob(['../../content/projects/*.md'], {
    query: '?raw',
    import: 'default',
    eager: true
}) as Record<string, string>

const slugOf = (path: string) => path.split('/').pop()!.replace(/\.md$/, '')

const bySlug = new Map(Object.entries(files).map(([path, md]) => [slugOf(path), md]))

/** Slugs that have a Markdown file. */
export const contentSlugs = [...bySlug.keys()]

/** Renders Markdown to HTML. */
export const renderMarkdown = (md: string): string => marked.parse(md, { async: false, gfm: true }) as string

/** Whether a project has a (non-empty) Markdown write-up, and so its own page. */
export const hasContent = (slug: string): boolean => Boolean(bySlug.get(slug)?.trim())

/** The rendered write-up for a project, or undefined if it has no (non-empty) Markdown file. */
export const projectContent = (slug: string): string | undefined => {
    const md = bySlug.get(slug)
    return md?.trim() ? renderMarkdown(md) : undefined
}
