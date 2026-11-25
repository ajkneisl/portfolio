import { useCallback, useEffect, useState } from 'react'
import { photos, type Photo } from './photos'

/** Rendered widths, so the browser picks the smallest file that still looks sharp. */
const THUMB_SIZES = '(max-width: 560px) 45vw, 190px'
const FULL_SIZES = 'min(1100px, 100vw)'

/** Start downloading a photo's full-size version (e.g. on hover) so the lightbox opens instantly. */
const preload = (photo: Photo) => {
    const img = new Image()
    img.sizes = FULL_SIZES
    img.srcset = photo.fullSet
}

/** A small, fixed tilt per print so the pile looks hand-placed but stays the same between visits. */
const tilt = (i: number) => [-2.2, 1.6, -0.8, 2.4, -1.6, 0.9][i % 6]

/** Photos as tilted prints that open full size, with arrow-key and Esc support. Renders nothing without photos. */
export default function PhotoGallery() {
    const [open, setOpen] = useState<number | null>(null)

    const close = useCallback(() => setOpen(null), [])
    const step = useCallback(
        (by: number) => setOpen((i) => (i === null ? i : (i + by + photos.length) % photos.length)),
        []
    )

    useEffect(() => {
        if (open === null) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
            if (e.key === 'ArrowRight') step(1)
            if (e.key === 'ArrowLeft') step(-1)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, close, step])

    if (photos.length === 0) return null

    return (
        <section className="gallery" aria-label="Photos">
            <ul className="prints">
                {photos.map((photo, i) => (
                    <li key={photo.thumb}>
                        <button
                            type="button"
                            className="print"
                            style={{ '--tilt': `${tilt(i)}deg` } as React.CSSProperties}
                            onClick={() => setOpen(i)}
                            onPointerEnter={() => preload(photo)}
                            onFocus={() => preload(photo)}
                            aria-label={`Open photo ${i + 1}${photo.caption ? `: ${photo.caption}` : ''}`}
                        >
                            <img
                                src={photo.thumb}
                                srcSet={photo.thumbSet}
                                sizes={THUMB_SIZES}
                                alt={photo.caption}
                                width={400}
                                height={500}
                                decoding="async"
                            />
                        </button>
                    </li>
                ))}
            </ul>

            {open !== null && (
                <div
                    className="lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label={photos[open].caption || `Photo ${open + 1} of ${photos.length}`}
                    onClick={close}
                >
                    <figure onClick={(e) => e.stopPropagation()}>
                        <img
                            src={photos[open].full}
                            srcSet={photos[open].fullSet}
                            sizes={FULL_SIZES}
                            alt={photos[open].caption}
                            decoding="async"
                        />
                        <figcaption>
                            <span>{photos[open].caption}</span>
                            {photos.length > 1 && (
                                <span className="lightbox-nav">
                                    <button type="button" onClick={() => step(-1)} aria-label="Previous photo">←</button>
                                    <button type="button" onClick={() => step(1)} aria-label="Next photo">→</button>
                                </span>
                            )}
                            <button type="button" onClick={close}>Close</button>
                        </figcaption>
                    </figure>
                </div>
            )}
        </section>
    )
}
