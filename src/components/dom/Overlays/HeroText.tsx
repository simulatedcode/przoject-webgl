'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import { useWebGLStore } from '@/store/useWebGLStore'
import ScrambleText from '../effects/ScrambleText'
import WordRevealText from '../effects/WordRevealText'

export default function HeroText() {
    const containerRef = useRef<HTMLDivElement>(null)
    const tl = useRef<gsap.core.Timeline | null>(null)

    useGSAP(() => {
        // Create a paused timeline matching the scroll duration (0 to 1) mapped 1:1
        tl.current = gsap.timeline({ paused: true })

        // --------------------------------------------------
        // STAGE 1: INTRO SCRAMBLE (0.0 to 0.3)
        // --------------------------------------------------
        const scrambleTarget = document.querySelector('.scramble-target') as HTMLElement
        if (scrambleTarget) {
            const targetText = scrambleTarget.dataset.text || ""
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\\\/[]{}—=+*^?#________"
            const scrambleObj = { val: 0 }

            scrambleTarget.innerText = chars.substring(0, targetText.length)

            // Fade in wrapper (blur reveal)
            tl.current.fromTo(".hero-title",
                { opacity: 0, y: 10, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.05, ease: "power2.out" },
                0.05
            )

            // Scramble decoding
            tl.current.to(scrambleObj, {
                val: 1,
                duration: 0.25,
                ease: "none",
                onUpdate: () => {
                    const p = scrambleObj.val
                    const revealed = Math.floor(p * targetText.length)
                    let newText = ""
                    for (let i = 0; i < targetText.length; i++) {
                        if (i < revealed) newText += targetText[i]
                        else newText += chars[Math.floor(Math.random() * chars.length)]
                    }
                    scrambleTarget.innerText = newText
                }
            }, 0.05)
        }

        // Fade out intro text
        tl.current.to(".hero-title", { opacity: 0, y: -10, filter: "blur(8px)", duration: 0.1, ease: "power2.inOut" }, 0.3)

        // --------------------------------------------------
        // STAGE 2: WORD REVEAL (0.4 to 0.7)
        // --------------------------------------------------
        // Synchronized with the camera tilting down to the ground text
        tl.current.fromTo(".word-reveal-child",
            {
                y: "120%",
                rotateZ: 4
            },
            {
                y: "0%",
                rotateZ: 0,
                duration: 0.2,
                stagger: 0.05,
                ease: "power3.out"
            },
            0.4
        )

        // --------------------------------------------------
        // STAGE 3: EXPANSION (0.7 to 1.0)
        // --------------------------------------------------
        tl.current.to(".hero-reveal-text", {
            scale: 1.05,
            letterSpacing: "0.25em",
            duration: 0.3,
            ease: "power2.inOut"
        }, 0.7)

    }, { scope: containerRef })

    // Link WebGL scroll progress directly to this GSAP timeline
    useEffect(() => {
        return useWebGLStore.subscribe((state) => {
            if (tl.current) {
                tl.current.progress(state.scrollProgress)
            }
        })
    }, [])

    return (
        <div ref={containerRef} className="hero-text-container">
            <div className="hero-text-content px-10 flex flex-col items-center justify-center gap-10">

                {/* Small intro line - SCRAMBLE TEXT TARGET */}
                <h2 className="hero-title opacity-0 translate-y-6 uppercase text-sm md:text-base tracking-[0.2em] font-mono">
                    <ScrambleText text="SPECULATIVE FUTURES MEMORIES" />
                </h2>

                {/* Main reveal text - WORD REVEAL TARGET */}
                <h1 className="hero-reveal-text uppercase">
                    <WordRevealText text="REVEALING THE CORE" className="justify-center" />
                </h1>

            </div>
        </div>
    )
}