import { projects } from '../features/timeline/timeline.api'

const external = { target: '_blank', rel: 'noopener noreferrer' }

export default function Projects() {
    return (
        <section className="projects">
            <h1>Projects</h1>
            <ul className="rows">
                {projects.map((proj) => (
                    <li key={proj.title} className="row">
                        <time className="row-date">{proj.year}</time>
                        <div>
                            <h2 className="row-name">{proj.title}</h2>
                            <p className="row-desc">{proj.subtitle}</p>
                        </div>
                        <div className="row-links">
                            {proj.link && <a href={proj.link} {...external}>Site ↗</a>}
                            {proj.appStoreLink && <a href={proj.appStoreLink} {...external}>App Store ↗</a>}
                            {proj.githubLink && <a href={proj.githubLink} {...external}>GitHub ↗</a>}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
