'use client'

import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { Suspense, ReactNode } from 'react'
import { useWebGLStore } from '../../store/useWebGLStore'
import Experience from './Experience'
import Effects from './Effects'

export default function CanvasRig({ children }: { children: ReactNode }) {
    const setDpr = useWebGLStore(state => state.setDpr)
    const dpr = useWebGLStore(state => state.dpr)

    return (
        <Canvas
            dpr={dpr}
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        >
            <PerformanceMonitor
                onIncline={() => setDpr(2)}
                onDecline={() => setDpr(1)}
            />
            <Suspense fallback={null}>
                <Experience />
                {/* Post-processing and global effects go here */}
                <Effects />
                {children}
            </Suspense>
        </Canvas>
    )
}
