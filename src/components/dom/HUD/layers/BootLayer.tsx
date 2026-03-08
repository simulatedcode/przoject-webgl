'use client'

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

interface LayerProps {
    active: boolean
    progress: number
}

export default function BootLayer({ active, progress }: LayerProps) {
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
            {/* Top Left: System Label */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                    <span className="w-2 h-2 bg-amber animate-flicker"></span>
                    <h2 className="text-xs tracking-[0.3em] font-bold">ARCHIVE SYSTEM // LANDSCAPE MEMORY</h2>
                </div>
                <div className="w-32 h-px bg-amber/30 mt-1"></div>
            </div>

            {/* Scanning Line Sweep */}
            <div className="absolute top-0 left-0 w-full h-px bg-amber animate-scan shadow-[0_0_10px_#ff8a3c] mix-blend-screen opacity-20"></div>

            {/* Bottom Right: Status */}
            <div className="self-end text-right flex flex-col gap-1 items-end">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] opacity-60">ACCESSING BANK...</span>
                    <span className="text-xs font-bold">STATUS: INITIALIZING</span>
                </div>
                <div className="text-[9px] opacity-40 uppercase tracking-tighter">
                    COORD: 44.502°N 11.339°E // BUILT: PRE-COLLAPSE
                </div>
            </div>

            {/* Corner Decorative Grids */}
            <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-amber/20"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-amber/20"></div>
        </div>
    )
}
