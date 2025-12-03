import { Project, Experience } from './timeline.types'

export const experiences: Experience[] = [
    {
        year: 'Oct 2025 — Present',
        title: 'IT Help Desk',
        company: 'University of Minnesota',
        description: 'Provide technical support to students and faculty, troubleshooting hardware, software, and network connectivity issues across Windows, macOS, and Linux.',
        tech: ['Windows', 'macOS', 'Linux', 'Active Directory', 'TDX'],
        icon: '/umn-logo.svg'
    },
    {
        year: 'Jan 2025 — Present',
        title: 'CS Undergraduate Teaching Assistant',
        company: 'University of Minnesota',
        description: 'Facilitate weekly lab sessions for 30+ students, providing hands-on guidance with data structures, algorithms, and debugging techniques.',
        tech: ['Python', 'Java', 'Teaching', 'Grading'],
        icon: '/umn-logo.svg'
    },
    {
        year: 'Sept 2022 — Present',
        title: 'Fullstack Developer & System Administrator',
        company: 'Freelance Work',
        description: 'Deployed script-sharing marketplace scaling to 1,000+ users with 99.9% uptime. Designed responsive forms improving completion rates by 35%.',
        tech: ['TypeScript', 'Jetty', 'RESTful API', 'System Administration']
    }
]

export const projects: Project[] = [
    {
        year: '2025',
        title: 'Burrow',
        subtitle: 'A study-group finding app built for the University of Minnesota in Social Coding.',
        tech: ['React', 'Kotlin', 'PostgreSQL'],
        githubLink: 'https://github.com/ajkneisl/burrow',
        icon: '/projects/burrow.png',
        link: 'https://umn.app'
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
        icon: '/projects/decafe.png'
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
        icon: '/projects/unifey.jpeg'
    },
    {
        year: '2019',
        title: 'SpotKey',
        subtitle: 'A computer-wide Spotify hot-key manager, back when they didn\'t work as well.',
        tech: ['Java', 'JavaFX'],
        githubLink: 'https://github.com/ajkneisl/spotkey'
    }
]
