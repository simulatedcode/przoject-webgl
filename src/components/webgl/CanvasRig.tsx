'use client'

import { Canvas } from '@react-three/fiber'
import { ReactNode } from 'react'

export default function CanvasRig({ children }: { children: ReactNode }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: false, alpha: false }}
        >
            {/* Post-processing and global effects go here */}
            {children}
        </Canvas>
    )
}
