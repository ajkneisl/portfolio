import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it, vi } from "vitest"
import { Site } from "../../components/App"

vi.mock("./photos", () => ({
    photos: [
        { thumb: "/a.webp", thumbSet: "/a.webp 400w, /a2.webp 800w", full: "/A.webp", fullSet: "/A.webp 1200w", caption: "lake harriet" },
        { thumb: "/b.webp", thumbSet: "/b.webp 400w", full: "/B.webp", fullSet: "/B.webp 1200w", caption: "stone arch bridge" },
        { thumb: "/c.webp", thumbSet: "/c.webp 400w", full: "/C.webp", fullSet: "/C.webp 1200w", caption: "northrop" }
    ]
}))

const renderPhotos = () =>
    render(
        <MemoryRouter initialEntries={["/"]}>
            <Site />
        </MemoryRouter>
    )

const openCaption = () =>
    screen.getByRole("dialog").getAttribute("aria-label")

describe("photos on the home page", () => {
    it("sits on the home page, under the intro, with no separate tab", () => {
        renderPhotos()

        expect(screen.getByRole("region", { name: "Photos" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "aj@knei.sl" })).toBeInTheDocument()
        expect(screen.queryByRole("link", { name: "Photos" })).toBeNull()
    })

    it("shows every photo as a print", () => {
        renderPhotos()

        expect(screen.getByAltText("lake harriet")).toHaveAttribute("src", "/a.webp")
        expect(screen.getByAltText("stone arch bridge")).toHaveAttribute("src", "/b.webp")
        expect(screen.getByAltText("northrop")).toHaveAttribute("src", "/c.webp")
    })

    it("serves resized thumbnails to the prints and large images to the lightbox", () => {
        renderPhotos()

        const thumb = screen.getByAltText("lake harriet")
        expect(thumb).toHaveAttribute("srcset", "/a.webp 400w, /a2.webp 800w")
        expect(thumb).toHaveAttribute("sizes")

        fireEvent.click(screen.getByRole("button", { name: "Open photo 1: lake harriet" }))
        const full = screen.getByRole("dialog").querySelector("img")!
        expect(full).toHaveAttribute("src", "/A.webp")
        expect(full).toHaveAttribute("srcset", "/A.webp 1200w")
    })

    it("opens a photo full size and closes it", () => {
        renderPhotos()

        fireEvent.click(screen.getByRole("button", { name: "Open photo 2: stone arch bridge" }))
        expect(openCaption()).toBe("stone arch bridge")

        fireEvent.click(screen.getByRole("button", { name: "Close" }))
        expect(screen.queryByRole("dialog")).toBeNull()
    })

    it("steps through photos with the buttons and arrow keys, wrapping around", () => {
        renderPhotos()

        fireEvent.click(screen.getByRole("button", { name: "Open photo 3: northrop" }))
        fireEvent.click(screen.getByRole("button", { name: "Next photo" }))
        expect(openCaption()).toBe("lake harriet")

        fireEvent.keyDown(window, { key: "ArrowLeft" })
        expect(openCaption()).toBe("northrop")
    })

    it("closes on Escape and on a click outside the photo", () => {
        renderPhotos()

        fireEvent.click(screen.getByRole("button", { name: "Open photo 1: lake harriet" }))
        fireEvent.keyDown(window, { key: "Escape" })
        expect(screen.queryByRole("dialog")).toBeNull()

        fireEvent.click(screen.getByRole("button", { name: "Open photo 1: lake harriet" }))
        fireEvent.click(screen.getByRole("dialog"))
        expect(screen.queryByRole("dialog")).toBeNull()
    })
})
