import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import Footer from '../features/layout/Footer'
import Home from '../pages/Home'
import Projects from '../pages/Projects'

/** Site chrome and routes, without a router so tests can supply their own. */
export function Site() {
    return (
        <div className="page">
            <header className="topbar">
                <nav>
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
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
