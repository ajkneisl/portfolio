import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

type Crumb = {
    fullUrl: string
    name: string
}

const Breadcrumbs = () => {
    const [crumbs, setCrumbs] = useState([
        { fullUrl: '/', name: 'home' },
    ] as Crumb[])
    const router = useRouter()

    useEffect(() => {
        router.route.split('/').filter(ex => ex.trim() !== "").forEach((crumb) =>
            setCrumbs((cr) => [
                ...cr,
                {
                    name: crumb,
                    fullUrl: cr.join('/') + crumb,
                },
            ])
        )
    }, [])

    return (
        <BreadcrumbDisplay>
            {crumbs.map((cr, i) => (
                <>
                <p>
                    <Link href={cr.fullUrl}>{cr.name}</Link>
                </p>
                {i !== crumbs.length - 1 && <p>/</p>}
                </>
            ))}
        </BreadcrumbDisplay>
    )
}

const BreadcrumbDisplay = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
`

export default Breadcrumbs
