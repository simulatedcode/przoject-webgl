'use client'

interface ElementProps {
    mode: string
}

export default function SystemInfo({ mode }: ElementProps) {
    let label = "ARCHIVE SYSTEM // LANDSCAPE MEMORY"
    let subLabel = "System: Initializing"

    if (mode === "LANDSCAPE_ANALYSIS") {
        label = "TERRAIN ANALYSIS"
        subLabel = "Sector: Java Landscape"
    } else if (mode === "SUBJECT_DETECTION") {
        label = "SUBJECT DETECTED"
        subLabel = "ID: Helas // Status: Unknown"
    } else if (mode === "MEMORY_RECONSTRUCTION") {
        label = "MEMORY FRAGMENT 01"
        subLabel = "Status: Corrupted"
    } else if (mode === "SYSTEM_COLLAPSE") {
        label = "ARCHIVE UNSTABLE"
        subLabel = "Signal: Lost"
    }

    return (
        <div className="absolute top-8 left-8 flex flex-col gap-1 transition-all duration-700 ease-cinematic">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-amber animate-flicker shadow-[0_0_8px_#ff8a3c]" />
                <h2 className="text-xs font-bold tracking-[0.3em] drop-shadow-[0_0_6px_#ff8a3c]">{label}</h2>
            </div>
            <div className="h-px w-32 bg-amber/30 mt-1" />
            <p className="text-[10px] opacity-60 tracking-widest mt-1 ml-4">{subLabel}</p>
        </div>
    )
}
