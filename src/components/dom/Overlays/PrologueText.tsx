'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import { useWebGLStore } from '@/store/useWebGLStore'
import WordRevealText from '../effects/WordRevealText'

export default function PrologueText() {
    const containerRef = useRef<HTMLDivElement>(null)
    const tl = useRef<gsap.core.Timeline | null>(null)

    useGSAP(() => {
        // Create a paused timeline tracking the overall scroll progress (0 to 1)
        tl.current = gsap.timeline({ paused: true })

        // --------------------------------------------------
        // STAGE 4: PROLOGUE NARRATIVE (0.6 to 1.0)
        // --------------------------------------------------
        // We wait until 0.6 to start fading in, because 0 to 0.6 is reserved for the Hero text/camera

        tl.current.fromTo(".prologue-label",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
            0.65
        )

        tl.current.fromTo(".prologue-headline",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
            0.7
        )

        tl.current.fromTo(".prologue-headline .word-reveal-child",
            { y: "120%", rotateZ: 4 },
            { y: "0%", rotateZ: 0, duration: 0.2, stagger: 0.05, ease: "power3.out" },
            0.7
        )

        tl.current.fromTo(".prologue-paragraph",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
            0.75
        )

    }, { scope: containerRef })

    useEffect(() => {
        return useWebGLStore.subscribe((state) => {
            if (tl.current) {
                // Scrub the timeline matching perfect 1:1 scroll progress 
                tl.current.progress(state.scrollProgress)
            }
        })
    }, [])

    return (
        <div ref={containerRef} className="hero-text-container z-20 pointer-events-auto">
            <div className="flex flex-col items-center justify-center max-w-3xl px-10 text-center gap-6">

                <h3 className="prologue-label opacity-0 uppercase text-xs tracking-[0.3em] font-mono text-white/50">
                    Prologue
                </h3>

                <h2 className="prologue-headline opacity-0 text-3xl md:text-5xl font-medium tracking-wide">
                    <WordRevealText text="The silent observers of a discarded epoch." className="justify-center" />
                </h2>

                <p className="prologue-paragraph opacity-0 text-white/70 text-sm md:text-base max-w-xl leading-relaxed mt-4">
                    In the ruins of digital memories, massive monuments linger as quiet testimonies to architectures of the past. These fragmented structures do not speak, they simply wait for a new horizon to reconstruct their meaning.
                </p>

            </div>
        </div>
    )
}
