import { create } from 'zustand'

interface AppState {
    progress: number
    setProgress: (progress: number) => void
}

export const useStore = create<AppState>((set) => ({
    progress: 0,
    setProgress: (progress: number) => set({ progress }),
}))
