'use client'

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"
import { useWebGLStore } from "@/store/useWebGLStore"

export default function HeroHUD() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isPreloaderDone = useWebGLStore((s) => s.isPreloaderDone)
    const scrollProgress = useWebGLStore((s) => s.scrollProgress)

    useGSAP(() => {
        if (!isPreloaderDone || !containerRef.current) return

        const tl = gsap.timeline()

        // 1. Scanline sweeps down slowly
        tl.fromTo('.scanline',
            { scaleY: 0, transformOrigin: 'top' },
            { scaleY: 1, duration: 2, ease: "power2.inOut" }
        )

        // 2. Text elements type/fade in
        tl.fromTo('.hud-text',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power1.out" },
            "-=1"
        )
    }, { dependencies: [isPreloaderDone], scope: containerRef })

    // Fade out based on global scroll (disappears entirely by 30% scroll as Prologue starts)
    // Progress 0.0 -> opacity 1.0. Progress 0.3 -> opacity 0.0
    const opacity = Math.max(0, 1 - (scrollProgress * 3.33))

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-10 p-4 md:p-8 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A6BAA9] mix-blend-difference"
            style={{ opacity }}
        >

            {/* Top Left */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 hud-text">
                <p>Archive System v4.0.2</p>
                <div className="h-2" />
                <p className="opacity-60">Landscape // Memory_Bank</p>
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-right hud-text">
                <p>Status: Initializing</p>
                <div className="h-2" />
                <p className="opacity-60 text-[9px]">COORD: 44.502°N 11.339°E</p>
            </div>

            {/* Subtle Vertical Scanning Line on the left edge */}
            <div className="absolute top-24 bottom-24 left-6 md:left-10 w-px bg-white/10 scanline overflow-hidden">
                {/* CSS animated laser pulse */}
                <div className="w-full h-1/4 bg-white/60 animate-[scan_4s_ease-in-out_infinite]" />
            </div>

        </div>
    )
}
