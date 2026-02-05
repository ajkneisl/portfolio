import React, { useState } from 'react'
import { projects, experiences } from './timeline.api'

export default function Timeline() {
    const [expandedExperiences, setExpandedExperiences] = useState<Set<number>>(new Set())

    const toggleExperience = (index: number) => {
        const newExpanded = new Set(expandedExperiences)
        if (newExpanded.has(index)) {
            newExpanded.delete(index)
        } else {
            newExpanded.add(index)
        }
        setExpandedExperiences(newExpanded)
    }

    return (
        <div className="bg-white text-neutral-800 p-4 sm:p-8 w-full min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Experience Section */}
                <section>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4">Experience</h2>
                    <div className="space-y-2">
                        {experiences.map((exp, i) => {
                            const isExpanded = expandedExperiences.has(i)
                            return (
                                <div key={i} className="rounded-lg hover:bg-neutral-50 transition-colors">
                                    <div
                                        className="flex items-start gap-3 sm:gap-4 p-2 sm:p-3 cursor-pointer"
                                        onClick={() => toggleExperience(i)}
                                    >
                                        {/* Icon */}
                                        {exp.icon ? (
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-white border border-neutral-200 flex-shrink-0 flex items-center justify-center p-1">
                                                <img src={exp.icon} alt={exp.company} className="w-full h-full object-contain" />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-gray-200 flex-shrink-0 flex items-center justify-center text-black font-semibold text-base sm:text-lg">
                                                {exp.company.charAt(0).toUpperCase()}
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                                                <h3 className="font-semibold text-neutral-900 text-sm sm:text-base">{exp.title}</h3>
                                                <span className="text-xs sm:text-sm text-neutral-600">at {exp.company}</span>
                                            </div>
                                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                                                <p className="text-sm text-neutral-600 mt-1">
                                                    {exp.description}
                                                </p>
                                            </div>
                                            <p className="text-xs text-neutral-500 mt-1">{exp.tech.join(' • ')}</p>
                                            <span className="text-xs text-neutral-500 sm:hidden mt-1 block">{exp.year}</span>
                                        </div>

                                        {/* Date and Link */}
                                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 pt-0.5">
                                            <span className="text-xs text-neutral-500 hidden sm:inline">{exp.year}</span>
                                            {exp.link && (
                                                <a
                                                    href={exp.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 sm:p-2 hover:bg-neutral-200 rounded transition-colors cursor-pointer"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <img src="/link.svg" alt="External Link" className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
                                                </a>
                                            )}
                                            {/* Chevron indicator */}
                                            <svg
                                                className={`w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 transition-transform duration-500 ease-in-out ${isExpanded ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Projects Section */}
                <section>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4">Projects</h2>
                    <div className="space-y-2">
                        {projects.map((proj, i) => (
                            <div key={i} className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
                                {/* Icon */}
                                {proj.icon ? (
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-white border border-neutral-200 flex-shrink-0 flex items-center justify-center p-1">
                                        <img src={proj.icon} alt={proj.title} className="w-full h-full object-contain" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-gray-200 flex-shrink-0 flex items-center justify-center text-black font-semibold text-base sm:text-lg">
                                        {proj.title.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-neutral-900 text-sm sm:text-base">{proj.title}</h3>
                                    <p className="text-xs sm:text-sm text-neutral-600 truncate">{proj.subtitle}</p>
                                    <p className="text-xs text-neutral-500">{proj.tech.join(' • ')}</p>
                                    <span className="text-xs text-neutral-500 sm:hidden">{proj.year}</span>
                                </div>

                                {/* Links and Date */}
                                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                    {proj.link && (
                                        <a
                                            href={proj.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 sm:p-2 hover:bg-neutral-200 rounded transition-colors cursor-pointer"
                                        >
                                            <img src="/link.svg" alt="External Link" className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
                                        </a>
                                    )}
                                    <a
                                        href={proj.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 sm:p-2 hover:bg-neutral-200 rounded transition-colors cursor-pointer"
                                    >
                                        <img src="/github.svg" alt="GitHub" className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
                                    </a>
                                    <span className="text-xs text-neutral-500 hidden sm:inline">{proj.year}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}