import React, { useEffect, useRef, useState } from 'react'

const projects = [
    {
        year: '2025',
        title: 'Burrow',
        subtitle: 'A study-group finding app built for the University of Minnesota.',
        tech: ['React', 'Kotlin', 'PostgreSQL']
    },
    {
        year: '2024 — 2025',
        title: 'Bulletin',
        subtitle: 'A customizable photo-board, leveraging photo compression to create a smooth experience.',
        tech: ['React', 'Kotlin']
    },
    {
        year: '2023',
        title: 'DECAfe',
        subtitle: 'Online ordering demo for a nationally qualifying DECA project.',
        tech: ['Kotlin / Java + Ktor', 'React + Tailwind'],
        githubLink: 'https://github.com/ajkneisl/decafe-website'
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
        githubLink: 'https://github.com/unifey-net'
    },
    {
        year: '2019',
        title: 'SpotKey',
        subtitle: 'A computer-wide Spotify hot-key manager, back when they didn\'t work as well.',
        tech: ['Java', 'JavaFX'],
        githubLink: 'https://github.com/ajkneisl/spotkey'
    }
]

// Scroll-in animation
function useInView(ref: React.RefObject<HTMLDivElement>) {
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true)
            },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [ref])
    return isVisible
}

export default function Timeline() {
    return (
        <div className="bg-white text-neutral-800 p-8 w-full min-h-screen">
            <div
                className="relative flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center flex-wrap border-neutral-300">
                {projects.map((proj, i) => {
                    const ref = useRef<HTMLDivElement>(null)
                    const isVisible = useInView(ref)

                    return (
                        <div key={i} className="relative w-full md:w-[47%] md:m-4">
                            {/* Project card container */}
                            <div className="flex-1">
                                <div
                                    ref={ref}
                                    className={`relative max-w-3xl rounded-xl overflow-hidden bg-neutral-100 shadow-md group transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                                >
                                    {/* Project image */}
                                    <img
                                        src={`https://placehold.co/600x200?text=${proj.title}`}
                                        alt={proj.title}
                                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {/* Slide-in info on hover */}
                                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white px-4 py-3 flex flex-col justify-center
                    opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0
                    transition-all duration-300 ease-in-out border-l border-neutral-300 pointer-events-none">
                                        <p className="text-md font-semibold mb-1">{proj.title}</p>
                                        <p className="text-xs md:text-sm text-neutral-500 mb-3">{proj.subtitle}</p>
                                        <div className="text-xs md:text-sm text-neutral-700">
                                            <p className="font-medium mb-1">Tech:</p>
                                            <ul className="list-disc list-inside">
                                                {proj.tech.map((t, j) => <li key={j}>{t}</li>)}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* GitHub icon */}
                                    <a
                                        href={proj.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-3 right-3 z-20 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                                    >
                                        <img
                                            src="/github.svg"
                                            alt="GitHub"
                                            className="w-6 h-6 opacity-80 hover:opacity-100"
                                        />
                                    </a>

                                    <div
                                        className="absolute top-3 left-4 bg-white text-sm font-semibold px-2 py-1 rounded shadow text-blue-600">
                                        {proj.year}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
