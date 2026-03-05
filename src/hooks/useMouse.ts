import { useEffect } from 'react'
import { useWebGLStore } from '../store/useWebGLStore'

export function useMouse() {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Update non-reactive store
            useWebGLStore.getState().setMouse(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            )
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])
}
