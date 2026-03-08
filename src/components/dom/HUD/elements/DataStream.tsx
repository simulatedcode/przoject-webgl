'use client'

interface ElementProps {
    mode: string
}

export default function DataStream({ mode }: ElementProps) {
    const segments = [
        "0xA2-F1", "0xB4-E7", "0xC9-D0", "0xD5-B2", "0xE1-A1"
    ]

    return (
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-start transition-all duration-700 ease-cinematic">

            {/* Bitrate / Signal pulses */}
            <div className="flex flex-col gap-1 items-start opacity-40 text-[8px] tracking-tighter">
                <div className="flex gap-1 h-4 overflow-hidden items-end">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="w-1 bg-amber animate-flicker"
                            style={{
                                height: `${20 + Math.random() * 80}%`,
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>
                <span className="uppercase tracking-widest leading-none">Bitstream_Recv</span>
            </div>

            {/* Mode-specific data ticker */}
            <div className="flex flex-col gap-2 text-[9px] text-amber/60 uppercase tracking-widest">
                <p className="border-b border-amber/20 pb-1 mb-1 font-bold">
                    {mode === "BOOT" ? "System_INIT" :
                        mode === "LANDSCAPE_ANALYSIS" ? "Terrain_SCAN" :
                            mode === "SUBJECT_DETECTION" ? "Target_ID" :
                                mode === "MEMORY_RECONSTRUCTION" ? "Fragment_RECV" : "Signal_LOSS"}
                </p>

                {mode !== "SYSTEM_COLLAPSE" ? (
                    segments.map((seg, i) => (
                        <p key={i} className="opacity-40 hover:opacity-100 transition-opacity">
                            Segment: {seg} // OK
                        </p>
                    ))
                ) : (
                    <p className="text-red-500 animate-glitch">ERROR: SECTION_FAULT</p>
                )}
            </div>

        </div>
    )
}
