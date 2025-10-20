import React, { useEffect, useState } from 'react'

export default function useInView(ref: React.RefObject<HTMLDivElement>) {
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true)
            },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [ref])
    return isVisible
}
