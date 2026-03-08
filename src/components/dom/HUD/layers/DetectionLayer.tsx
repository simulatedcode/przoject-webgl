'use client'

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

interface LayerProps {
    active: boolean
    progress: number
}

export default function DetectionLayer({ active, progress }: LayerProps) {
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
            {/* Subject Detection Center Scan */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-[30vmax] h-[30vmax]">
                    {/* Outer Rotating Ring */}
                    <div className="absolute inset-0 border border-amber/20 rounded-full animate-rotate-slow"></div>
                    <div className="absolute inset-4 border border-dashed border-amber/40 rounded-full animate-[rotate-slow_15s_linear_infinite_reverse]"></div>

                    {/* Target Box */}
                    <div className="absolute inset-[25%] border border-amber flex items-center justify-center">
                        <div className="absolute top-0 left-0 w-2 h-2 bg-amber"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 bg-amber"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-amber"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-amber"></div>

                        {/* Target ID Label */}
                        <div className="text-[10px] font-bold text-amber absolute -top-4 left-0">
                            SUBJECT DETECTED
                        </div>
                    </div>
                </div>
            </div>

            {/* Subject Metadata (Top Left) */}
            <div className="self-start text-left flex flex-col gap-1 items-start mt-4">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber animate-pulse"></span>
                    <span className="text-xs font-bold text-amber">ID: HELAS</span>
                </div>
                <div className="text-[10px] leading-relaxed opacity-60">
                    <p>STATUS: UNKNOWN</p>
                    <p>MEMORY TRACE: ACTIVE</p>
                    <p>MATCH: 98.42%</p>
                </div>
            </div>

            {/* Data Stream Panel (Right Column) */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-end">
                <div className="flex flex-col gap-1 items-end opacity-40 text-[8px]">
                    <div className="flex gap-1 h-3 overflow-hidden">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="w-1 bg-amber animate-flicker" style={{ height: `${Math.random() * 100}%` }}></div>
                        ))}
                    </div>
                    <span>BITSTREAM_RECV...</span>
                </div>

                <div className="flex flex-col gap-1 text-[9px] text-right text-amber/60 max-w-48">
                    <p className="border-b border-amber/20 pb-1">ANALYZING FRAGMENTS...</p>
                    <p className="opacity-40">Segment: 0xA2-F1</p>
                    <p className="opacity-40">Segment: 0xB4-E7</p>
                    <p className="opacity-40">Segment: 0xC9-D0</p>
                </div>
            </div>
        </div>
    )
}
