import { Project, Experience } from './timeline.types'

export const experiences: Experience[] = [
    {
        year: 'Incoming June — Aug 2026',
        title: 'Software Developer Intern',
        company: 'RBC Minneapolis',
        description: 'Incoming software developer intern at RBC Minneapolis.',
        tech: ['Java', 'Web'],
        icon: '/rbc.svg'
    },
    {
        year: 'Oct 2025 — Present',
        title: 'IT Help Desk',
        company: 'University of Minnesota',
        description: 'Provide technical support to students and faculty, troubleshooting hardware, software, and network connectivity issues across Windows, macOS, and Linux.',
        tech: ['Windows', 'macOS', 'Linux', 'Active Directory', 'TDX'],
        icon: '/umn-logo.svg'
    },
    {
        year: 'Sept 2022 — Present',
        title: 'Fullstack Developer & System Administrator',
        company: 'Freelance Work',
        description: 'Deployed script-sharing marketplace scaling to 1,000+ users with 99.9% uptime. Implemented automatic payout systems through crypto and PayPal. Designed responsive mortgage application forms improving completion rates by 35% over previous solutions.',
        tech: ['TypeScript', 'Jetty', 'RESTful API', 'System Administration']
    }
]

export const projects: Project[] = [
    {
        year: '2025 — Present',
        title: 'Burrow',
        subtitle: 'A study-group finding app built for the University of Minnesota.',
        tech: ['Typescript/React', 'React Native', 'Kotlin/Ktor', 'PostgreSQL'],
        githubLink: 'https://github.com/ajkneisl/burrow',
        icon: '/projects/burrow.webp',
        link: 'https://umn.app',
        appStoreLink: 'https://apps.apple.com/us/app/burrow-at-umn/id6757548307'
    },
    {

        year: '2025',
        title: 'Echoes',
        subtitle: 'Share your voices and become interconnected within your community. Top 5 Hackathon entry.',
        tech: ['Typescript/React Native', 'Kotlin/Ktor', 'PostgreSQL'],
        githubLink: 'https://github.com/ajkneisl/echoes',
        icon: '/projects/echoes.webp'
    },
    {
        year: '2025',
        title: 'nextMETRO',
        subtitle: 'A simple & customizable utility to get the next MetroTransit train or bus at a stop.',
        tech: ['Go'],
        githubLink: 'https://github.com/ajkneisl/nextmetro',
        link: 'https://ajkn.dev/metro'
    },
    {
        year: '2024 — 2025',
        title: 'Bulletin',
        subtitle: 'A customizable photo-board, leveraging photo compression to create a smooth experience.',
        tech: ['React', 'Kotlin'],
        githubLink: 'https://github.com/ajkneisl/bulletin',
        link: 'https://ajkneisl.photos'
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
        title: 'printPI',
        subtitle: 'A remote receipt printer software, allowing for secure & remote printing anywhere.',
        tech: ['Java / Kotlin', 'MongoDB'],
        githubLink: 'https://github.com/ajkneisl/printer-service'
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
        githubLink: 'https://github.com/ajkneisl/spotkey'
    }
]
