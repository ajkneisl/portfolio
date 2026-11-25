import { Link } from 'react-router'
import { experiences, experienceSlug } from '../features/timeline/timeline.api'
import { hasExperienceContent } from '../features/timeline/projectContent'
import RowIcon from '../features/timeline/RowIcon'

const external = { target: '_blank', rel: 'noopener noreferrer' }

export default function Experience() {
    return (
        <section className="projects">
            <h1>Experience</h1>
            <ul className="rows">
                {experiences.map((exp) => (
                    <li key={experienceSlug(exp)} className="row">
                        <RowIcon src={exp.icon} />
                        <div className="row-body">
                            <div className="row-head">
                                <h2 className="row-name">
                                    {hasExperienceContent(experienceSlug(exp)) ? (
                                        <Link to={`/experience/${experienceSlug(exp)}`}>{exp.title}</Link>
                                    ) : (
                                        exp.title
                                    )}
                                </h2>
                                <time className="row-date row-period">{exp.year}</time>
                            </div>
                            <p className="row-org">
                                {exp.link ? (
                                    <a href={exp.link} {...external}>{exp.company}</a>
                                ) : (
                                    exp.company
                                )}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
