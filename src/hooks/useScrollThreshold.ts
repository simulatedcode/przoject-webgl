import { useWebGLStore } from '../store/useWebGLStore'
import { NarrativeStage } from '../types'
import { useState, useEffect } from 'react'

const STAGES: { stage: NarrativeStage; threshold: number }[] = [
    { stage: 'HERO', threshold: 0.0 },
    { stage: 'LANDSCAPE', threshold: 0.4 },
    { stage: 'MEMORY', threshold: 0.7 },
    { stage: 'EPILOGUE', threshold: 0.9 },
]

export function useScrollThreshold(): NarrativeStage {
    const [currentStage, setCurrentStage] = useState<NarrativeStage>('PRELOAD')

    useEffect(() => {
        return useWebGLStore.subscribe((state) => {
            if (!state.isLoaded) return setCurrentStage('PRELOAD')

            const scroll = state.scrollProgress
            let active: NarrativeStage = 'HERO'

            for (let i = STAGES.length - 1; i >= 0; i--) {
                if (scroll >= STAGES[i].threshold) {
                    active = STAGES[i].stage
                    break
                }
            }

            setCurrentStage(active)
        })
    }, [])

    return currentStage
}
