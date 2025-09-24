export default function Header() {
    return <div className="navbar justify-center gap-8 bg-base-100 shadow-sm">
        <div className="">
            <a className="text-xl font-semibold noto-sans" href="/">AJ Kneisl</a>
        </div>

        {/* Projects */}
        <div>
            <ul className="menu menu-horizontal px-1">
                <li><a href="/aj_resume_sep_15.pdf" target="_blank">resume</a></li>
            </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-row items-center gap-2">
            <div>
                <a target="_blank" href="https://github.com/ajkneisl">
                    <img
                        className="h-[32px] cursor-pointer transition duration-200 transform hover:-translate-y-0.5 hover:brightness-75"
                        src="github.svg"
                        alt="GitHub"
                    />
                </a>
            </div>
            <div>
                <a target="_blank" href="https://linkedin.com/in/ajkn">
                    <img
                        className="h-[32px] cursor-pointer transition duration-200 transform hover:-translate-y-0.5 hover:brightness-75"
                        src="linkedin.svg"
                        alt="LinkedIn"
                    />
                </a>
            </div>
        </div>
    </div>
}
