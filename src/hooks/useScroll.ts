import { useEffect } from 'react'
import Lenis from 'lenis'
import { useWebGLStore } from '../store/useWebGLStore'
import { gsap, ScrollTrigger } from '../lib/gsap'

export function useScroll() {
    useEffect(() => {
        const lenis = new Lenis()

        lenis.on('scroll', (e: Lenis) => {
            // Force ScrollTrigger to update with Lenis
            ScrollTrigger.update()

            // Update the non-reactive store instead of triggering a React re-render
            useWebGLStore.getState().setScrollProgress(e.progress)
        })

        // Hook Lenis into GSAP's internal ticker for perfect sync
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove((time) => lenis.raf(time * 1000))
            lenis.destroy()
        }
    }, [])
}
