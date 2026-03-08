'use client'

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

interface LayerProps {
    active: boolean
    progress: number
}

export default function AnalysisLayer({ active, progress }: LayerProps) {
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
            {/* Corner Brackets Framing Terrain */}
            <div className="absolute inset-x-12 inset-y-12 border-[0.5px] border-amber/10 pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-amber"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-amber"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-amber"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-amber"></div>
            </div>

            {/* Terrain Metadata (Top Right) */}
            <div className="self-end text-right flex flex-col gap-1 items-end mt-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber">TERRAIN ANALYSIS</span>
                    <span className="w-1.5 h-1.5 bg-amber animate-pulse"></span>
                </div>
                <div className="text-[10px] leading-relaxed opacity-60">
                    <p>CLASSIFICATION: JAVA LANDSCAPE</p>
                    <p>ERA ESTIMATION: 1830–1890</p>
                    <p>GRID DENSITY: OPTIMAL</p>
                </div>
            </div>

            {/* Horizon Tracking Line */}
            <div className="absolute top-[60%] left-0 w-full flex items-center justify-center opacity-30">
                <div className="w-[80%] h-px bg-amber flex items-center justify-between px-4">
                    <span className="text-[8px] -translate-y-2">HORIZON_LOCK_01</span>
                    <span className="text-[8px] -translate-y-2">AZIMUTH: 182°</span>
                </div>
            </div>

            {/* Scanning Readout (Bottom Left) */}
            <div className="self-start text-[9px] opacity-40 uppercase tracking-widest mt-auto mb-4">
                Scanning coordinates...
                <br />
                Depth: 12.4m // Surface: Mapped
            </div>
        </div>
    )
}
