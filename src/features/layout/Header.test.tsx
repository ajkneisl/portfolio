import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Header from "./Header"

describe("<Header />", () => {
    it("renders the site name", () => {
        render(<Header />)

        expect(screen.getByText("AJ Kneisl")).toBeInTheDocument()
    })

    it("links to the resume in a new tab", () => {
        render(<Header />)
        const resume = screen.getByRole("link", { name: "resume" })

        expect(resume).toHaveAttribute("href", "/resume.pdf")
        expect(resume).toHaveAttribute("target", "_blank")
    })

    it.each([
        ["GitHub", "https://github.com/ajkneisl"],
        ["LinkedIn", "https://linkedin.com/in/ajkn"]
    ])("links to %s", (label, href) => {
        render(<Header />)

        expect(screen.getByAltText(label).closest("a")).toHaveAttribute(
            "href",
            href
        )
    })
})
