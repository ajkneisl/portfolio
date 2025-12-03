/**
 * A project.
 *
 * @param year The year this project was developed / worked on.
 * @param title The name of the project.
 * @param subtitle Sub details of the project.
 * @param tech The technology used in this project.
 * @param icon An icon for the project.
 * @param githubLink The link to the GitHub.
 * @param link The link to the project.
 */
export type Project = {
    year: string,
    title: string,
    subtitle: string,
    tech: string[],
    icon?: string,
    githubLink?: string,
    link?: string
}

/**
 * A work experience.
 *
 * @param year The year(s) of employment.
 * @param title The job title.
 * @param company The company name.
 * @param description Brief description of the role.
 * @param tech Technologies used in this role.
 * @param icon An icon for the company.
 * @param link Link to the company website.
 */
export type Experience = {
    year: string,
    title: string,
    company: string,
    description: string,
    tech: string[],
    icon?: string,
    link?: string
}
