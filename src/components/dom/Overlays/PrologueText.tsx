'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import { useWebGLStore } from '@/store/useWebGLStore'
import WordRevealText from '../effects/WordRevealText'

export default function PrologueText() {

    const containerRef = useRef<HTMLDivElement>(null)

    const tlRef = useRef<gsap.core.Timeline | null>(null)

    useGSAP(() => {

        if (!containerRef.current) return

        const tl = gsap.timeline({ paused: true })
        tlRef.current = tl

        // Prologue sequence sits perfectly on the back-half of the master scroll (0.6 to 1.0)
        tl.fromTo(".prologue-label",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
            0.6
        )

        tl.fromTo(".prologue-headline",
            { opacity: 0 },
            { opacity: 1, duration: 0.1, ease: "power2.out" },
            0.65
        )

        tl.fromTo(".prologue-headline .word-reveal-child",
            { y: "120%", rotateZ: 4 },
            { y: "0%", rotateZ: 0, duration: 0.15, stagger: 0.015, ease: "power3.out" },
            0.65
        )

        tl.fromTo(".prologue-paragraph",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
            0.8
        )

        // Stretch timeline to exactly 1.0 sec to mathematically align with scrollProgress ratio
        tl.set({}, {}, 1.0)

    }, { scope: containerRef })

    useEffect(() => {
        return useWebGLStore.subscribe((state) => {
            if (tlRef.current) {
                // Instantly scrub through timeline matching the global scroll progression
                tlRef.current.progress(state.scrollProgress)
            }
        })
    }, [])


    return (

        <div
            ref={containerRef}
            className="prologue-container min-h-screen flex items-center justify-center overflow-hidden px-8"
        >

            <div className="prologue-content max-w-3xl text-center  ">

                <h3 className="prologue-label uppercase tracking-widest text-xs mb-6">
                    Prologue
                </h3>

                <h2 className="prologue-headline text-3xl md:text-5xl uppercase leading-tight mb-8">
                    <WordRevealText
                        text="The silent observers of a discarded epoch."
                        className="justify-center"
                    />
                </h2>

                <p className="prologue-paragraph text-sm md:text-base opacity-80 leading-relaxed">
                    In the ruins of digital memories, massive monuments linger as quiet testimonies
                    to architectures of the past. These fragmented structures do not speak,
                    they simply wait for a new horizon to reconstruct their meaning.
                </p>

            </div>

        </div>

    )
}   