'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import { useWebGLStore } from '@/store/useWebGLStore'
import ScrambleText from '../effects/ScrambleText'
import WordRevealText from '../effects/WordRevealText'

export default function HeroText() {

    const containerRef = useRef<HTMLDivElement>(null)

    const introTl = useRef<gsap.core.Timeline | null>(null)
    const scrollTl = useRef<gsap.core.Timeline | null>(null)

    useGSAP(() => {

        /* -------------------------------------------------- */
        /* INTRO TIMELINE (PLAY ONCE)                         */
        /* -------------------------------------------------- */

        introTl.current = gsap.timeline()

        const scrambleTarget = document.querySelector('.scramble-target') as HTMLElement

        if (scrambleTarget) {

            const targetText = scrambleTarget.dataset.text || ""
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\\\/[]{}—=+*^?#________"
            const scrambleObj = { val: 0 }

            scrambleTarget.innerText = chars.substring(0, targetText.length)

            introTl.current.fromTo(".hero-title",
                { opacity: 0, y: 10, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
            )

            introTl.current.to(scrambleObj, {
                val: 1,
                duration: 1,
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
            }, 0)

        }

        /* -------------------------------------------------- */
        /* SCROLL TIMELINE                                    */
        /* -------------------------------------------------- */

        scrollTl.current = gsap.timeline({ paused: true })

        // Fade out intro
        scrollTl.current.to(".hero-title",
            { opacity: 0, y: -10, filter: "blur(8px)", duration: 0.05 },
            0.3
        )

        // --------------------------------------------------
        // STAGE 2: WORD REVEAL (0.3 to 0.5)
        // --------------------------------------------------
        // Translate the whole H1 upwards
        scrollTl.current.fromTo(".hero-reveal-text",
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.2, ease: "power3.out" },
            0.3
        )

        scrollTl.current.fromTo(".word-reveal-child",
            { y: "120%", rotateZ: 4 },
            {
                y: "0%",
                rotateZ: 0,
                duration: 0.15,
                stagger: 0.05,
                ease: "power3.out"
            },
            0.3
        )

        // Fade hero away as it reaches the end of its sequence (before Prologue at 0.6)
        scrollTl.current.to(".hero-reveal-text", {
            scale: 1.05,
            opacity: 0,
            letterSpacing: "0.25em",
            duration: 0.15,
            ease: "power2.inOut"
        }, 0.55)

        // Force exactly 1.0 timeline duration for mathematically perfect scrubbing
        scrollTl.current.set({}, {}, 1.0)

    }, { scope: containerRef })


    /* -------------------------------------------------- */
    /* CONNECT SCROLL TO GSAP                             */
    /* -------------------------------------------------- */

    useEffect(() => {

        return useWebGLStore.subscribe((state) => {

            if (scrollTl.current) {
                scrollTl.current.progress(state.scrollProgress)
            }

        })

    }, [])


    return (

        <div ref={containerRef} className="hero-text-container">
            <div className="hero-text-content px-10 flex flex-col items-center justify-center gap-10">


                <h1 className="hero-reveal-text uppercase">
                    <WordRevealText
                        text="SPECULATIVE FUTURES MEMORIES"
                        className="justify-center"
                    />
                </h1>
            </div>
        </div>

    )

}