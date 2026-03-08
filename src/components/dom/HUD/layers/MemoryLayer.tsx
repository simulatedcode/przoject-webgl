'use client'

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

interface LayerProps {
    active: boolean
    progress: number
}

export default function MemoryLayer({ active, progress }: LayerProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (active) {
            gsap.to(containerRef.current, { opacity: 1, duration: 1, ease: "power2.out" })
        } else {
            gsap.to(containerRef.current, { opacity: 0, duration: 0.5, ease: "power2.in" })
        }
    }, { dependencies: [active], scope: containerRef })

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 transition-opacity"
            style={{ pointerEvents: active ? 'auto' : 'none' }}
        >
            {/* Fragmented Data Panels (Scattered) */}
            <div className="absolute top-1/4 left-12 flex flex-col gap-2 p-4 border border-amber/30 bg-amber/5 backdrop-blur-sm hud-panel">
                <div className="text-[10px] font-bold text-amber border-b border-amber/40 pb-1 mb-2">MEMORY FRAGMENT 01</div>
                <div className="text-[8px] opacity-60 leading-tight">
                    <p>TYPE: COLONIAL LANDSCAPE</p>
                    <p>STATUS: CORRUPTED</p>
                    <p>RECONSTRUCTING...</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-amber/10 mt-2 overflow-hidden">
                    <div className="w-1/2 h-full bg-amber animate-pulse"></div>
                </div>
            </div>

            <div className="absolute bottom-1/4 right-12 flex flex-col gap-2 p-4 border border-amber/30 bg-amber/5 backdrop-blur-sm hud-panel">
                <div className="text-[10px] font-bold text-amber border-b border-amber/40 pb-1 mb-2">FRAGMENT_ANALYSIS_0B</div>
                <div className="text-[8px] opacity-60 leading-tight">
                    <p>DEPTH: 24-BIT</p>
                    <p>RECOVERY: ACTIVE</p>
                    <p>CACHE: OVERFLOW</p>
                </div>
            </div>

            {/* Rotating Diagram Placeholder (SVG) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                <svg width="200" height="200" viewBox="0 0 200 200" className="animate-rotate-slow">
                    <circle cx="100" cy="100" r="80" stroke="#FF8A3C" strokeWidth="0.5" fill="none" strokeDasharray="5 10" />
                    <rect x="60" y="60" width="80" height="80" stroke="#FF8A3C" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                    <line x1="100" y1="20" x2="100" y2="180" stroke="#FF8A3C" strokeWidth="0.5" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke="#FF8A3C" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Large Data Readout (Bottom Right) */}
            <div className="self-end text-right flex flex-col gap-1 items-end mb-4">
                <div className="text-[11px] font-bold text-amber tracking-widest animate-glitch">RECOVERY_IN_PROGRESS</div>
                <div className="w-48 h-px bg-amber/40"></div>
                <div className="text-[8px] opacity-30 mt-2">
                    BIT_DENSITY: 12.8 PB/CM3
                    <br />
                    SIGNAL_STRENGTH: NOMINAL
                </div>
            </div>
        </div>
    )
}
