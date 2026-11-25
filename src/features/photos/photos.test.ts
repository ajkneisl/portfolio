import { describe, expect, it } from "vitest"
import { captionFromPath, photos } from "./photos"

describe("photos", () => {
    it.each([
        ["../../content/photos/01-lake-harriet.jpg", "lake harriet"],
        ["../../content/photos/stone_arch_bridge.webp", "stone arch bridge"],
        ["../../content/photos/2026 northrop.JPG", "northrop"],
        ["../../content/photos/minneapolis.png", "minneapolis"],
        ["../../content/photos/DSCF1205_preview.jpeg", ""],
        ["../../content/photos/IMG_0412.JPG", ""],
        ["../../content/photos/DSC_0042.jpg", ""],
        ["../../content/photos/PXL_20260101_123456.jpg", ""],
        ["../../content/photos/03-sunset-preview.jpg", "sunset"]
    ])("captions %s as %s", (path, caption) => {
        expect(captionFromPath(path)).toBe(caption)
    })

    it("finds the photos in the folder, each with resized thumbnail and full-size versions", () => {
        expect(photos.length).toBeGreaterThan(0)
        photos.forEach((photo) => {
            expect(photo.thumb).not.toBe("")
            expect(photo.full).not.toBe("")
            expect(photo.thumbSet).toMatch(/ \d+w/)
            expect(photo.fullSet).toMatch(/ \d+w/)
        })
    })
})
