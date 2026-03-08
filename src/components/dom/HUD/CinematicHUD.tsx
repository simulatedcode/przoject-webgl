import { useWebGLStore } from "@/store/useWebGLStore"
import SystemInfo from "./elements/SystemInfo"
import Coordinates from "./elements/Coordinates"
import ScanInterface from "./elements/ScanInterface"
import DataStream from "./elements/DataStream"
import NarrativeStatus from "./elements/NarrativeStatus"

export default function CinematicHUD() {
    const scrollProgress = useWebGLStore((s) => s.scrollProgress)
    const isPreloaderDone = useWebGLStore((s) => s.isPreloaderDone)

    if (!isPreloaderDone) return null

    // Determine Narrative Mode based on scroll thresholds
    let mode = "BOOT"
    if (scrollProgress > 0.15) mode = "LANDSCAPE_ANALYSIS"
    if (scrollProgress > 0.35) mode = "SUBJECT_DETECTION"
    if (scrollProgress > 0.60) mode = "MEMORY_RECONSTRUCTION"
    if (scrollProgress > 0.85) mode = "SYSTEM_COLLAPSE"

    return (
        <div className="fixed inset-0 pointer-events-none z-50 font-mono text-amber select-none overflow-hidden">

            <SystemInfo mode={mode} />

            <Coordinates mode={mode} />

            <ScanInterface mode={mode} />

            <DataStream mode={mode} />

            <NarrativeStatus mode={mode} />

        </div>
    )
}
