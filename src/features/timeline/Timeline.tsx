import React, { useRef } from 'react'
import useInView from './useInView'
import { projects } from './timeline.api'

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
                                    <div className="relative">
                                        <img
                                            src={proj.backgroundImage ? proj.backgroundImage : `https://placehold.co/600x200?text=${proj.title}`}
                                            alt={proj.title}
                                            className={`w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105 ${proj.backgroundStyle}`}
                                        />

                                        {proj.backgroundMaintainText && (
                                            <img
                                                src={`https://placehold.co/600x200/transparent/999999?text=${proj.title}`}
                                                alt={proj.title}
                                                className="absolute inset-0 w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105 z-10 pointer-events-none"
                                            />
                                        )}
                                    </div>

                                    {/* Slide-in info on hover */}
                                    <div className="z-20 absolute top-0 right-0 w-1/2 h-full bg-white px-4 py-3 flex flex-col justify-center
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

                                    {/* Website link icon */}
                                    {proj.link && (
                                        <a
                                            href={proj.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cursor-pointer bg-white p-1 rounded-xl absolute top-3 right-12 z-20 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                                        >
                                            <img
                                                src="/link.svg"
                                                alt="External Link"
                                                className="icon-link w-6 h-6 opacity-80 hover:opacity-100"
                                            />
                                        </a>
                                    )}

                                    {/* GitHub icon */}
                                    <a
                                        href={proj.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cursor-pointer bg-white p-1 rounded-xl absolute top-3 right-3 z-20 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
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
