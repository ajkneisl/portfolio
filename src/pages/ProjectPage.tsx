import { Link, useParams } from 'react-router'
import { findProject, projectSlug } from '../features/timeline/timeline.api'
import { projectContent } from '../features/timeline/projectContent'

const external = { target: '_blank', rel: 'noopener noreferrer' }

export default function ProjectPage() {
    const project = findProject(useParams().slug)
    const content = project && projectContent(projectSlug(project))

    if (!project || !content) {
        return (
            <section className="project">
                <Link className="back" to="/projects">← Projects</Link>
                <h1>Project not found</h1>
            </section>
        )
    }

    const links = [
        { label: 'Site', href: project.link },
        { label: 'App Store', href: project.appStoreLink },
        { label: 'GitHub', href: project.githubLink }
    ].filter((link): link is { label: string; href: string } => Boolean(link.href))

    return (
        <article className="project">
            <Link className="back" to="/projects">← Projects</Link>

            <div className="project-head">
                {project.icon && <img className="project-icon" src={project.icon} alt="" />}
                <div>
                    <h1>{project.title}</h1>
                    <time className="project-year">{project.year}</time>
                </div>
            </div>

            <p className="project-summary">{project.subtitle}</p>

            <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />

            <dl className="project-meta">
                <dt>Built with</dt>
                <dd>{project.tech.join(', ')}</dd>

                {links.length > 0 && (
                    <>
                        <dt>Links</dt>
                        <dd>
                            {links.map(({ label, href }) => (
                                <a key={label} href={href} {...external}>{label} ↗</a>
                            ))}
                        </dd>
                    </>
                )}
            </dl>
        </article>
    )
}
