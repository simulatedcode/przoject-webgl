import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export function useScroll() {
    const [scroll, setScroll] = useState(0)

    useEffect(() => {
        const lenis = new Lenis()

        lenis.on('scroll', (e: any) => {
            setScroll(e.progress)
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    return scroll
}
