import { Project } from './timeline.types'

export const projects: Project[] = [
    {
        year: '2025',
        title: 'Burrow',
        subtitle: 'A study-group finding app built for the University of Minnesota in Social Coding.',
        tech: ['React', 'Kotlin', 'PostgreSQL'],
        githubLink: 'https://github.com/ajkneisl/burrow',
        backgroundImage: '/projects/burrow.png',
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
        backgroundStyle: "object-scale-down",
        backgroundImage: "/projects/decafe.png"
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
        backgroundImage: "/projects/unifey.jpeg",
        backgroundStyle: "object-top",
        backgroundMaintainText: true
    },
    {
        year: '2019',
        title: 'SpotKey',
        subtitle: 'A computer-wide Spotify hot-key manager, back when they didn\'t work as well.',
        tech: ['Java', 'JavaFX'],
        githubLink: 'https://github.com/ajkneisl/spotkey'
    }
]
