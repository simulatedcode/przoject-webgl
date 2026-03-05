import { create } from 'zustand'

interface WebGLState {
    // High-frequency, non-reactive state for the WebGL loop
    scrollProgress: number
    mouse: { x: number; y: number }
    dpr: number

    // Setters
    setScrollProgress: (progress: number) => void
    setMouse: (x: number, y: number) => void
    setDpr: (dpr: number) => void
}

export const useWebGLStore = create<WebGLState>((set) => ({
    scrollProgress: 0,
    mouse: { x: 0, y: 0 },
    dpr: 1, // Default Device Pixel Ratio

    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setMouse: (x, y) => set({ mouse: { x, y } }),
    setDpr: (dpr) => set({ dpr }),
}))
