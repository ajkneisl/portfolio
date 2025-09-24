import Footer from './Footer'
import Header from './Header'
import { BrowserRouter, Route, Routes } from 'react-router'
import Timeline from './Timeline'

/**
 * main app
 */
export default function App() {
    return <>
        <div className="flex items-center justify-center">
            <div className="max-w-6xl min-h-[100vh] flex gap-8 flex-center items-center justify-between flex-col">
                <Header />

                <BrowserRouter>
                    <Routes>
                        <Route path="/"
                               element={<div className="flex flex-col justify-center items-center2 gap-4 h-full w-full">
                                   <div
                                       className="flex flex-col justify-center items-center w-full max-w-screen m-4 gap-2">
                                       <h2 className="text-3xl font-light">AJ Kneisl</h2>
                                       <p className="break-all">junior at the university of minnesota, studying computer science :) <br />
                                           take a look at <a className="underline" href="/resume.pdf"
                                                             target={'_blank'}>my resume</a>.</p>
                                   </div>

                                   <h2 className="text-2xl text-center font-light">my programming projects!</h2>
                                   <Timeline />
                               </div>} />
                    </Routes>
                </BrowserRouter>

                <Footer />
            </div>
        </div>
    </>
}
