/**
 * A project.
 *
 * @param year The year this project was developed / worked on.
 * @param title The name of the project.
 * @param subtitle Sub details of the project.
 * @param tech The technology used in this project.
 * @param backgroundImage A background image for the project.
 * @param backgroundStyle Attributes to adjust the background image with.
 * @param githubLink The link to the GitHub.
 * @param link The link to the project.
 */
export type Project = {
    year: string,
    title: string,
    subtitle: string,
    tech: string[],
    backgroundImage?: string,
    backgroundStyle?: string,
    backgroundMaintainText?: boolean,
    githubLink?: string,
    link?: string
}
