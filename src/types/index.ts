export type NarrativeStage =
    | 'PRELOAD'
    | 'HERO'
    | 'LANDSCAPE'
    | 'MEMORY'
    | 'EPILOGUE'

export interface SceneConfig {
    id: NarrativeStage
    scrollThreshold: [number, number] // [start, end] percentage
}
