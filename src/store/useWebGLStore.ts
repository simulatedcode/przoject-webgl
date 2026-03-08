import { create } from 'zustand'

interface WebGLState {
    // High-frequency, non-reactive state for the WebGL loop
    scrollProgress: number
    mouse: { x: number; y: number }
    dpr: number

    // Preloader state
    // isLoaded: R3F assets have finished loading (useProgress hits 100%)
    // isPreloaderDone: The outro animation has finished, hero scene is fully visible
    // Both reset to false on every page reload (Zustand is in-memory only)
    isLoaded: boolean
    isPreloaderDone: boolean

    // Setters
    setScrollProgress: (progress: number) => void
    setMouse: (x: number, y: number) => void
    setDpr: (dpr: number) => void
    setIsLoaded: (loaded: boolean) => void
    setIsPreloaderDone: (done: boolean) => void
}

export const useWebGLStore = create<WebGLState>((set) => ({
    scrollProgress: 0,
    mouse: { x: 0, y: 0 },
    dpr: 1,
    isLoaded: false,
    isPreloaderDone: false,

    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setMouse: (x, y) => set({ mouse: { x, y } }),
    setDpr: (dpr) => set({ dpr }),
    setIsLoaded: (loaded) => set({ isLoaded: loaded }),
    setIsPreloaderDone: (done) => set({ isPreloaderDone: done }),
}))
