import { useEffect } from 'react'
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router'
import Footer from '../features/layout/Footer'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import ProjectPage from '../pages/ProjectPage'
import Experience from '../pages/Experience'
import ExperiencePage from '../pages/ExperiencePage'

/** Start each page at the top, like a normal page load. */
function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

/** Site chrome and routes, without a router so tests can supply their own. */
export function Site() {
    return (
        <div className="page">
            <ScrollToTop />
            <header className="topbar">
                <nav>
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/experience">Experience</NavLink>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:slug" element={<ProjectPage />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/experience/:slug" element={<ExperiencePage />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>

            <Footer />
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <Site />
        </BrowserRouter>
    )
}
