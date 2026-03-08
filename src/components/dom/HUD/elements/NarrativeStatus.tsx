'use client'

interface ElementProps {
    mode: string
}

export default function NarrativeStatus({ mode }: ElementProps) {
    let status = "System_Initializing..."
    let description = "Establishing secure connection to memory archive. Sector 01/05."

    if (mode === "LANDSCAPE_ANALYSIS") {
        status = "Terrain_Scan_Active"
        description = "Mapping speculative geography. Landscape resolution 82%."
    } else if (mode === "SUBJECT_DETECTION") {
        status = "Subject_Identified"
        description = "Humanoid silhouette detected. ID: Helas. Accessing profile."
    } else if (mode === "MEMORY_RECONSTRUCTION") {
        status = "Memory_Recovery"
        description = "Synthesizing fragment 0xA2. Colonial landscape reconstruction 44%."
    } else if (mode === "SYSTEM_COLLAPSE") {
        status = "Signal_Failure"
        description = "Data stream unstable. Connection terminating. Session end."
    }

    return (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-center transition-all duration-700 ease-cinematic max-w-sm">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full border border-amber/50 flex items-center justify-center p-0.5 animate-pulse">
                    <div className="w-full h-full bg-amber rounded-full" />
                </div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber/80 drop-shadow-[0_0_4px_#ff8a3c]">{status}</span>
            </div>

            <p className="text-[10px] leading-relaxed opacity-40 uppercase tracking-widest px-4 border-l border-r border-amber/20 italic">
                {description}
            </p>

            {/* Subtle Progress Bar */}
            {mode !== "SYSTEM_COLLAPSE" && (
                <div className="w-48 h-[1px] bg-amber/10 mt-4 overflow-hidden relative">
                    <div
                        className="absolute top-0 h-full bg-amber/40 transition-all duration-1000"
                        style={{
                            width: mode === "BOOT" ? "20%" :
                                mode === "LANDSCAPE_ANALYSIS" ? "45%" :
                                    mode === "SUBJECT_DETECTION" ? "70%" : "90%"
                        }}
                    />
                </div>
            )}
        </div>
    )
}
