import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import App from "./App"

describe("<App />", () => {
    it("renders the hero with name and headshot", () => {
        render(<App />)

        expect(
            screen.getByRole("heading", { level: 1, name: "AJ Kneisl" })
        ).toBeInTheDocument()
        expect(screen.getByAltText("AJ Kneisl")).toHaveAttribute(
            "src",
            "/headshot.webp"
        )
    })

    it("links to the resume in a new tab", () => {
        render(<App />)
        const resume = screen.getByRole("link", { name: "resume" })

        expect(resume).toHaveAttribute("href", "/resume.pdf")
        expect(resume).toHaveAttribute("target", "_blank")
        expect(resume).toHaveAttribute("rel", "noopener noreferrer")
    })

    it.each([
        ["GitHub", "https://github.com/ajkneisl"],
        ["LinkedIn", "https://linkedin.com/in/ajkn"]
    ])("links to %s exactly once, in a new tab", (label, href) => {
        const { container } = render(<App />)
        const links = Array.from(
            container.querySelectorAll(`a[href="${href}"]`)
        )

        expect(links).toHaveLength(1)
        expect(links[0]).toHaveAttribute("target", "_blank")
        expect(
            within(links[0] as HTMLElement).getByRole("img")
        ).toHaveAttribute("alt", label)
    })

    it("exposes a mailto link", () => {
        render(<App />)

        expect(screen.getByAltText("Email").closest("a")).toHaveAttribute(
            "href",
            "mailto:aj@ajkneisl.dev"
        )
    })

    it("renders the timeline on the index route", () => {
        render(<App />)

        expect(
            screen.getByRole("heading", { name: "Experience" })
        ).toBeInTheDocument()
        expect(
            screen.getByRole("heading", { name: "Projects" })
        ).toBeInTheDocument()
    })

    it("renders the footer", () => {
        render(<App />)

        expect(
            within(screen.getByRole("contentinfo")).getByText(/AJ Kneisl ©/)
        ).toBeInTheDocument()
    })
})
