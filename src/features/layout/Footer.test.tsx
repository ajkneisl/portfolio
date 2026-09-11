import { render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import Footer from "./Footer"

afterEach(() => {
    vi.useRealTimers()
})

describe("<Footer />", () => {
    it("renders a contentinfo landmark", () => {
        render(<Footer />)

        expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    })

    it("shows the current year", () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date("2031-06-15T12:00:00Z"))

        render(<Footer />)

        expect(screen.getByText("AJ Kneisl ©2031")).toBeInTheDocument()
    })
})
