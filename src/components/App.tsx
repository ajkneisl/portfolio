import Footer from '../features/layout/Footer'
import { BrowserRouter, Route, Routes } from 'react-router'
import Timeline from '../features/timeline/Timeline'

export default function App() {
    return (
        <div className="flex items-center justify-center px-4 sm:px-6">
            <div className="max-w-4xl w-full min-h-screen flex gap-8 sm:gap-12 items-center justify-between flex-col py-8 sm:py-12">
                {/* Hero */}
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full">
                    <img
                        src="/headshot.webp"
                        alt="AJ Kneisl"
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-2 ring-neutral-200 flex-shrink-0"
                    />

                    <div className="flex flex-col items-center sm:items-start gap-3">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 noto-sans">AJ Kneisl</h1>
                            <p className="text-neutral-600 mt-1">
                                Student at the University of Minnesota studying Computer Science
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 underline underline-offset-2 transition-colors"
                            >
                                resume
                            </a>
                            <span className="text-neutral-300">|</span>
                            <a target="_blank" href="https://github.com/ajkneisl" className="hover:opacity-70 transition-opacity">
                                <img className="h-5" src="github.svg" alt="GitHub" />
                            </a>
                            <a target="_blank" href="https://linkedin.com/in/ajkn" className="hover:opacity-70 transition-opacity">
                                <img className="h-5" src="linkedin.svg" alt="LinkedIn" />
                            </a>
                            <a href="mailto:aj@ajkneisl.dev" className="hover:opacity-70 transition-opacity">
                                <img className="h-5" src="email.svg" alt="Email" />
                            </a>
                        </div>
                    </div>
                </div>

                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Timeline />} />
                    </Routes>
                </BrowserRouter>

                <Footer />
            </div>
        </div>
    )
}
