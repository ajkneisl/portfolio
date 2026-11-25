import { useState } from 'react'
import { Link } from 'react-router'
import { projectsByYear, projectSlug } from '../features/timeline/timeline.api'
import { hasContent } from '../features/timeline/projectContent'
import RowIcon from '../features/timeline/RowIcon'
import type { Project } from '../features/timeline/timeline.types'

const external = { target: '_blank', rel: 'noopener noreferrer' }

function ProjectRow({ proj, groupYear }: { proj: Project; groupYear: number }) {
    const slug = projectSlug(proj)
    // The year header already says e.g. "2025", so only show ranges like "2024 — 2025".
    const showDate = proj.year.trim() !== String(groupYear)

    return (
        <li className="row">
            <RowIcon src={proj.icon} />
            <div className="row-body">
                <div className="row-head">
                    <h3 className="row-name">
                        {hasContent(slug) ? <Link to={`/projects/${slug}`}>{proj.title}</Link> : proj.title}
                    </h3>
                    {showDate && <time className="row-date">{proj.year}</time>}
                </div>
                <p className="row-desc" title={proj.subtitle}>{proj.subtitle}</p>
                {(proj.link || proj.appStoreLink || proj.githubLink) && (
                    <div className="row-links">
                        {proj.link && <a href={proj.link} {...external}>Site ↗</a>}
                        {proj.appStoreLink && <a href={proj.appStoreLink} {...external}>App Store ↗</a>}
                        {proj.githubLink && <a href={proj.githubLink} {...external}>GitHub ↗</a>}
                    </div>
                )}
            </div>
        </li>
    )
}

export default function Projects() {
    const groups = projectsByYear()
    // Only the newest year starts open.
    const [open, setOpen] = useState<Set<number>>(() => new Set(groups.slice(0, 1).map((g) => g.year)))

    const toggle = (year: number) =>
        setOpen((prev) => {
            const next = new Set(prev)
            if (next.has(year)) next.delete(year)
            else next.add(year)
            return next
        })

    return (
        <section className="projects">
            <h1>Projects</h1>
            {groups.map(({ year, projects }) => {
                const isOpen = open.has(year)
                return (
                    <section key={year} className="year-group">
                        <h2>
                            <button
                                type="button"
                                className="year-toggle"
                                aria-expanded={isOpen}
                                aria-controls={`year-${year}`}
                                onClick={() => toggle(year)}
                            >
                                <span className="year-label">{year}</span>
                                <span className="year-count">{projects.length}</span>
                                <span className={`year-chevron${isOpen ? ' open' : ''}`} aria-hidden="true">›</span>
                            </button>
                        </h2>
                        {/* Always rendered so it can animate; hidden from keyboard and screen readers while closed. */}
                        <div
                            className={`year-panel${isOpen ? ' open' : ''}`}
                            id={`year-${year}`}
                            aria-hidden={!isOpen}
                            {...(!isOpen && { inert: '' })}
                        >
                            <div className="year-panel-inner">
                                <ul className="rows">
                                    {projects.map((proj) => (
                                        <ProjectRow key={proj.title} proj={proj} groupYear={year} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                )
            })}
        </section>
    )
}
