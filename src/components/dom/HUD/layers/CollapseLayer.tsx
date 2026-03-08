'use client'

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

interface LayerProps {
    active: boolean
    progress: number
}

export default function CollapseLayer({ active, progress }: LayerProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (active) {
            gsap.to(containerRef.current, { opacity: 1, duration: 0.2, ease: "none" })
        } else {
            gsap.to(containerRef.current, { opacity: 0, duration: 0.5, ease: "power2.in" })
        }
    }, { dependencies: [active], scope: containerRef })

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 p-8 flex flex-col items-center justify-center opacity-0 transition-opacity"
            style={{ pointerEvents: active ? 'auto' : 'none' }}
        >
            {/* Center Error Message */}
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="text-2xl font-bold text-amber animate-glitch tracking-[0.5em] mb-4">ARCHIVE UNSTABLE</div>

                <div className="flex flex-col gap-1 items-center opacity-60 text-xs">
                    <p className="animate-flicker">CRITICAL_MEMORY_FAILURE</p>
                    <p className="animate-flicker" style={{ animationDelay: '0.2s' }}>SIGNAL_DENSITY_DROPPING</p>
                    <p className="animate-flicker" style={{ animationDelay: '0.4s' }}>RECOVERY_ABORTED</p>
                </div>

                <div className="mt-12 text-[10px] font-bold text-amber border border-amber/50 px-4 py-1 animate-pulse">
                    SIGNAL LOST // END OF SESSION
                </div>
            </div>

            {/* Random Glitch Elements (Scattered) */}
            <div className="absolute top-1/4 left-1/4 w-32 h-px bg-amber animate-glitch opacity-30"></div>
            <div className="absolute bottom-1/3 right-1/4 w-1 h-24 bg-amber animate-glitch opacity-30"></div>

            {/* Rapidly changing coordinate numbers */}
            <div className="absolute top-10 right-10 text-[9px] font-mono opacity-40 animate-flicker">
                ERR: 0x{Math.floor(Math.random() * 10000).toString(16).toUpperCase()}
            </div>
        </div>
    )
}
