/**
 * Photos for the home page. Drop image files into src/content/photos/ and they show up,
 * sorted by filename. The filename doubles as the caption: "01-lake-harriet.jpg" → "lake harriet".
 * Straight-from-the-camera names like "DSCF1205_preview.jpeg" or "IMG_0412.jpg" get no caption.
 *
 * Originals can be any size: at build time each one is resized and re-encoded as WebP
 * (vite-imagetools), so visitors only download what they need.
 *   - thumbnails for the prints: 400px and 800px wide
 *   - full size for the lightbox: 1200px and 2000px wide
 * Smaller originals are never upscaled.
 */
const thumbFiles = import.meta.glob('../../content/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
    query: '?w=400;800&format=webp&quality=75&withoutEnlargement&as=srcset',
    import: 'default',
    eager: true
}) as Record<string, string>

const fullFiles = import.meta.glob('../../content/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
    query: '?w=1200;2000&format=webp&quality=80&withoutEnlargement&as=srcset',
    import: 'default',
    eager: true
}) as Record<string, string>

export type Photo = {
    /** Small fallback image for the print. */
    thumb: string
    /** Responsive thumbnail candidates for the print. */
    thumbSet: string
    /** Large fallback image for the lightbox. */
    full: string
    /** Responsive full-size candidates for the lightbox. */
    fullSet: string
    caption: string
}

/** The first URL in a srcset string, used as the plain src fallback. */
const firstUrl = (srcset: string) => srcset.split(',')[0].trim().split(' ')[0]

/** Camera default names: DSCF1205, DSC_0042, IMG_0412, PXL_20260101_123456, etc. */
const CAMERA_NAME = /^(dscf?|img|pxl|dji|gopr|_?mg)[-_ ]?\d[\d_-]*$/i

/**
 * Turns a filename into a caption, dropping the extension, any leading number used for ordering,
 * and a trailing "preview"/"edit"/"export". Camera default names give an empty caption.
 */
export const captionFromPath = (path: string): string => {
    const name = path
        .split('/')
        .pop()!
        .replace(/\.[^.]+$/, '')
        .replace(/[-_ ](preview|edit(ed)?|export(ed)?|final)$/i, '')
        .replace(/^\d+[-_ ]+/, '')

    return CAMERA_NAME.test(name) ? '' : name.replace(/[-_]+/g, ' ').trim()
}

export const photos: Photo[] = Object.keys(thumbFiles)
    .sort((a, b) => a.localeCompare(b))
    .map((path) => ({
        thumb: firstUrl(thumbFiles[path]),
        thumbSet: thumbFiles[path],
        full: firstUrl(fullFiles[path]),
        fullSet: fullFiles[path],
        caption: captionFromPath(path)
    }))
