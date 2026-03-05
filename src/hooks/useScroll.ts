import { useEffect } from 'react'
import Lenis from 'lenis'
import { useWebGLStore } from '../store/useWebGLStore'

export function useScroll() {
    useEffect(() => {
        const lenis = new Lenis()

        lenis.on('scroll', (e: any) => {
            // Update the non-reactive store instead of triggering a React re-render
            useWebGLStore.getState().setScrollProgress(e.progress)
        })

        // Using gsap ticker is preferred, but raw raf is okay for now
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])
}
