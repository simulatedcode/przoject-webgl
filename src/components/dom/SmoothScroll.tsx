'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {

    // We get the lenis instance, but don't let it auto-raf.
    // We will manually raf it via gsap.ticker to ensure ScrollTrigger syncs perfectly.
    const lenisRef = useRef<any>(null)

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000)
        }

        gsap.ticker.add(update)
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(update)
        }
    }, [])

    return (
        <ReactLenis
            root
            ref={lenisRef}
            autoRaf={false}
            options={{
                lerp: 0.1,
                duration: 1.5,
                smoothWheel: true,
            }}
        >
            {children}
        </ReactLenis>
    )
}
