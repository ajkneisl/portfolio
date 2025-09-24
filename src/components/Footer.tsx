export default function Footer() {
    return <footer className="footer sm:footer-horizontal footer-center text-base-content p-4">
        <aside>
            <p>AJ Kneisl ©{new Date().getFullYear()} — <a href="mailto:ajkneisl.pm" className="underline">email</a> — <a
                className="underline"
                href="https://ajkneisl.photos">ajkneisl.photos</a></p>
        </aside>
    </footer>
}
