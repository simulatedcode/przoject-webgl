'use client'

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

interface ElementProps {
    mode: string
}

export default function ScanInterface({ mode }: ElementProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!containerRef.current) return

        // Reset animations on mode change
        gsap.killTweensOf(containerRef.current.querySelectorAll('.scan-element'))

        if (mode === "BOOT") {
            gsap.fromTo('.scan-line', { scaleY: 0 }, { scaleY: 1, duration: 2, ease: "power2.inOut" })
        }
    }, { dependencies: [mode], scope: containerRef })

    return (
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center transition-all duration-1000">

            {/* BOOT: Subtle Grid & Scanline */}
            {mode === "BOOT" && (
                <div className="absolute inset-x-24 inset-y-24 border border-amber/10 scan-element">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-amber shadow-[0_0_10px_#ff8a3c] opacity-20 animate-scan" />
                </div>
            )}

            {/* LANDSCAPE_ANALYSIS: Horizon & Brackets */}
            {mode === "LANDSCAPE_ANALYSIS" && (
                <div className="absolute inset-x-12 inset-y-12 border-[0.5px] border-amber/5 scan-element">
                    <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-amber/60 shadow-[0_0_6px_#ff8a3c]" />
                    <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-amber/60 shadow-[0_0_6px_#ff8a3c]" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-amber/60 shadow-[0_0_6px_#ff8a3c]" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-amber/60 shadow-[0_0_6px_#ff8a3c]" />

                    <div className="absolute top-[60%] left-0 w-full flex items-center justify-center opacity-30">
                        <div className="w-[80%] h-px bg-amber flex px-4">
                            <span className="text-[8px] -translate-y-2">HORIZON_LOCK_01 // 182° AZIMUTH</span>
                        </div>
                    </div>
                </div>
            )}

            {/* SUBJECT_DETECTION: Scan Circle */}
            {mode === "SUBJECT_DETECTION" && (
                <div className="relative w-[30vmax] h-[30vmax] scan-element">
                    <div className="absolute inset-0 border border-amber/20 rounded-full animate-rotate-slow" />
                    <div className="absolute inset-4 border border-dashed border-amber/40 rounded-full animate-[rotate-slow_15s_linear_infinite_reverse]" />

                    <div className="absolute inset-[25%] border border-amber shadow-[0_0_10px_#ff8a3c]">
                        <div className="absolute top-0 left-0 w-2 h-2 bg-amber" />
                        <div className="absolute top-0 right-0 w-2 h-2 bg-amber" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-amber" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-amber" />
                        <span className="absolute -top-6 left-0 text-[10px] font-bold text-amber animate-pulse">SUBJECT_LOCKED</span>
                    </div>
                </div>
            )}

            {/* MEMORY_RECONSTRUCTION: Fragmented Panels */}
            {mode === "MEMORY_RECONSTRUCTION" && (
                <div className="absolute inset-0 flex items-center justify-center scan-element">
                    <svg width="400" height="400" viewBox="0 0 400 400" className="opacity-20 animate-rotate-slow">
                        <circle cx="200" cy="200" r="160" stroke="#FF8A3C" strokeWidth="0.5" fill="none" strokeDasharray="5 10" />
                        <rect x="120" y="120" width="160" height="160" stroke="#FF8A3C" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                    </svg>

                    <div className="absolute top-1/4 left-1/4 p-4 border border-amber/30 bg-amber/5 backdrop-blur-sm animate-glitch">
                        <div className="text-[10px] font-bold pb-2 border-b border-amber/20">RECOVERING_FRAGMENT_01</div>
                        <div className="text-[8px] opacity-40 mt-2">DENSITY: 12.8 PB/CM3</div>
                    </div>
                </div>
            )}

            {/* SYSTEM_COLLAPSE: Glitch & Fade */}
            {mode === "SYSTEM_COLLAPSE" && (
                <div className="absolute inset-0 bg-amber/5 animate-glitch scan-element">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold tracking-[0.5em] animate-flicker">
                        SIGNAL_LOST
                    </div>
                </div>
            )}

        </div>
    )
}
