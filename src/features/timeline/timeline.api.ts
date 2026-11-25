import { Project, Experience } from './timeline.types'

export const experiences: Experience[] = [
    {
        year: 'June 2026 — Aug 2026',
        title: 'Software Developer Intern',
        company: 'RBC Wealth Management',
        tech: ['Java', 'Backend'],
        icon: '/rbc.svg',
        link: 'https://www.rbcwealthmanagement.com/en-us/'
    },
    {
        year: 'Oct 2025 — Present',
        title: 'IT Lead',
        company: 'UMN Office of Information Technology',
        tech: ['Windows', 'macOS', 'Linux', 'Active Directory', 'TDX'],
        icon: '/umn-logo.svg',
        link: 'https://it.umn.edu'
    },
    {
        year: 'Jan 2025 — Present',
        title: 'Teaching Assistant',
        company: 'UMN College of Science and Engineering',
        tech: ['Java', 'Git', 'Linux', 'Gradescope'],
        icon: '/umn-logo.svg',
        link: 'https://cse.umn.edu'
    },
    {
        year: '2022 — 2025',
        title: 'Freelance Developer',
        company: 'Self-employed',
        tech: ['React', 'Jetty', 'Linux', 'System Administration', 'Docker', 'AWS']
    }
]

export const projects: Project[] = [
    {
        year: '2026',
        title: 'Beacc',
        subtitle: 'Tracks your goals automatically, then puts you up against your friends.',
        tech: ['iOS'],
        link: 'https://beacc.app',
        appStoreLink: 'https://apps.apple.com/us/app/beacc/id6825988118',
        githubLink: 'https://github.com/ajkneisl/beacc',
        icon: '/projects/beacc.svg'
    },
    {
        year: '2025 — 2026',
        title: 'Burrow',
        subtitle: 'A study-group finding app built for the University of Minnesota.',
        tech: ['Typescript/React', 'React Native', 'Kotlin/Ktor', 'PostgreSQL'],
        githubLink: 'https://github.com/ajkneisl/burrow',
        icon: '/projects/burrow.webp',
        link: 'https://umn.app',
        appStoreLink: 'https://apps.apple.com/us/app/burrow-at-umn/id6757548307'
    },
    {
        year: '2026',
        title: 'Social Coding',
        subtitle: 'Website for Social Coding @ UMN.',
        tech: ['React'],
        link: 'https://socialcoding.net',
        githubLink: 'https://github.com/ajkneisl/socialcoding',
        icon: '/projects/social-coding.svg'
    },
    {
        year: '2026',
        title: 'Allersight',
        subtitle: 'Detects allergens in food for businesses and consumers. Top 10 Hackathon entry.',
        tech: ['Typescript/React', 'React Native', 'PostgreSQL', 'OpenCV', 'Python', 'Flask'],
        icon: '/projects/allersight.svg'
    },
    {

        year: '2025',
        title: 'Echoes',
        subtitle: 'Share your voices with your community. Top 5 Hackathon entry.',
        tech: ['Typescript/React Native', 'Kotlin/Ktor', 'PostgreSQL'],
        githubLink: 'https://github.com/ajkneisl/echoes',
        icon: '/projects/echoes.webp'
    },
    {
        year: '2024 — 2025',
        title: 'Bulletin',
        subtitle: 'A customizable photo-board.',
        tech: ['React', 'Kotlin'],
        githubLink: 'https://github.com/ajkneisl/bulletin',
        icon: '/projects/bulletin.svg'
    },
    {
        year: '2023',
        title: 'DECAfe',
        subtitle: 'Online ordering demo for a nationally qualifying DECA project.',
        tech: ['Kotlin / Java + Ktor', 'React + Tailwind'],
        githubLink: 'https://github.com/ajkneisl/decafe-website',
        icon: '/projects/decafe.webp'
    },
    {
        year: '2022',
        title: 'PrintPI',
        subtitle: 'A receipt printer controlled by a Raspberry Pi.',
        tech: ['Java / Kotlin', 'MongoDB'],
        githubLink: 'https://github.com/ajkneisl/printer-service',
        icon: '/projects/printpi.svg'
    },
    {
        year: '2020 — 2022',
        title: 'Unifey',
        subtitle: 'Fully fledged forum and live chat based social media site, variably scaled using AWS.',
        tech: ['Kotlin / Java + Ktor', 'React + Tailwind', 'AWS, MySQL'],
        githubLink: 'https://github.com/unifey-net',
        icon: '/projects/unifey.webp'
    },
    {
        year: '2019',
        title: 'SpotKey',
        subtitle: 'A computer-wide Spotify hot-key manager, back when they didn\'t work as well.',
        tech: ['Java', 'JavaFX'],
        githubLink: 'https://github.com/ajkneisl/spotkey',
        icon: '/projects/spotkey.svg'
    }
]

/** URL-safe identifier for a project, derived from its title (e.g. "Social Coding" -> "social-coding"). */
export const projectSlug = (project: Project): string =>
    project.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

/** Looks up a project by its slug. */
export const findProject = (slug: string | undefined): Project | undefined =>
    projects.find((project) => projectSlug(project) === slug)

/** URL-safe identifier for a role, derived from its title (e.g. "IT Lead" -> "it-lead"). */
export const experienceSlug = (experience: Experience): string =>
    experience.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

/** Looks up a role by its slug. */
export const findExperience = (slug: string | undefined): Experience | undefined =>
    experiences.find((experience) => experienceSlug(experience) === slug)

/**
 * The year a project is filed under: the last year it was active.
 * "2025 — 2026" → 2026, "2019" → 2019, "Present" counts as the current year.
 */
export const projectYear = (project: Project, now = new Date()): number => {
    if (/present/i.test(project.year)) return now.getFullYear()
    const years = project.year.match(/\d{4}/g)?.map(Number) ?? []
    return years.length ? Math.max(...years) : now.getFullYear()
}

/** Projects grouped by projectYear, newest year first, keeping each group's original order. */
export const projectsByYear = (list: Project[] = projects): { year: number; projects: Project[] }[] => {
    const groups = new Map<number, Project[]>()
    list.forEach((project) => {
        const year = projectYear(project)
        groups.set(year, [...(groups.get(year) ?? []), project])
    })
    return [...groups.entries()]
        .sort(([a], [b]) => b - a)
        .map(([year, projects]) => ({ year, projects }))
}
