'use client'

interface ElementProps {
    mode: string
}

export default function Coordinates({ mode }: ElementProps) {
    let latLong = "44.502°N 11.339°E"
    let sector = "Archive // Sector: 01"

    if (mode === "LANDSCAPE_ANALYSIS") {
        latLong = "45.105°N 12.440°E"
        sector = "Java Region // Sector: 04"
    } else if (mode === "SUBJECT_DETECTION") {
        latLong = "44.920°N 11.890°E"
        sector = "Detection // Target: 02"
    } else if (mode === "MEMORY_RECONSTRUCTION") {
        latLong = "44.750°N 11.550°E"
        sector = "Reconstruction // Cache: 0B"
    } else if (mode === "SYSTEM_COLLAPSE") {
        latLong = "ERR: NULL"
        sector = "Signal: Unstable"
    }

    return (
        <div className="absolute top-8 right-8 flex flex-col gap-1 text-right transition-all duration-700 ease-cinematic">
            <div className="flex items-center gap-2 justify-end">
                <span className="text-xs font-bold drop-shadow-[0_0_6px_#ff8a3c]">{latLong}</span>
                <span className="w-1.5 h-1.5 bg-amber/40 animate-pulse" />
            </div>
            <div className="h-px w-24 bg-amber/30 self-end mt-1" />
            <p className="text-[10px] opacity-40 tracking-widest mt-1 uppercase mr-2">{sector}</p>
        </div>
    )
}
