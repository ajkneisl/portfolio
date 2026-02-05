import Footer from '../features/layout/Footer'
import Header from '../features/layout/Header'
import { BrowserRouter, Route, Routes } from 'react-router'
import Timeline from '../features/timeline/Timeline'

export default function App() {
    return (
        <div className="flex items-center justify-center px-4 sm:px-6">
            <div className="max-w-6xl w-full min-h-screen flex gap-6 sm:gap-8 items-center justify-between flex-col">
                <Header />

                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="flex flex-col justify-center items-center gap-4 w-full">
                                    <div className="flex flex-col justify-center items-center w-full max-w-screen m-4 gap-2">
                                        <p className="break-words">
                                            junior at the university of minnesota, studying computer science :)
                                            <br />
                                            take a look at{' '}
                                            <a className="underline" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                                my resume
                                            </a>
                                            .
                                        </p>
                                    </div>

                                    <Timeline />
                                </div>
                            }
                        />
                    </Routes>
                </BrowserRouter>

                <Footer />
            </div>
        </div>
    )
}
