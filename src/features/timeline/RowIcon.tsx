/** A row's picture, or an empty slot of the same size so names stay lined up. */
export default function RowIcon({ src }: { src?: string }) {
    return (
        <span className="row-icon" aria-hidden="true">
            {src && <img src={src} alt="" decoding="async" />}
        </span>
    )
}
