import { Link, useParams } from 'react-router'
import { findExperience, experienceSlug } from '../features/timeline/timeline.api'
import { experienceContent } from '../features/timeline/projectContent'

const external = { target: '_blank', rel: 'noopener noreferrer' }

export default function ExperiencePage() {
    const exp = findExperience(useParams().slug)
    const content = exp && experienceContent(experienceSlug(exp))

    if (!exp || !content) {
        return (
            <section className="project">
                <Link className="back" to="/experience">← Experience</Link>
                <h1>Not found</h1>
            </section>
        )
    }

    return (
        <article className="project">
            <Link className="back" to="/experience">← Experience</Link>

            <div className="project-head">
                {exp.icon && <img className="project-icon" src={exp.icon} alt="" />}
                <div>
                    <h1>{exp.title}</h1>
                    <time className="project-year">{exp.year}</time>
                </div>
            </div>

            <p className="project-summary">
                {exp.link ? (
                    <a href={exp.link} {...external}>{exp.company}</a>
                ) : (
                    exp.company
                )}
            </p>

            <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    )
}
