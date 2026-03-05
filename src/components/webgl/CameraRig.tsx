import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { useWebGLStore } from '../../store/useWebGLStore'

export default function CameraRig() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)

    useFrame((state, delta) => {
        if (!cameraRef.current) return

        // 1. Get high-frequency transient state without re-rendering the component
        const { scrollProgress, mouse } = useWebGLStore.getState()

        // 2. Parallax: slightly move camera based on mouse normalized coordinates
        const targetX = mouse.x * 0.5
        const targetY = mouse.y * 0.5

        // Smoothly interpolate current camera position towards target
        // Using simple lerp since delta dampings can be complex here depending on setup
        cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.1
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.1

        // 3. Scroll Driven Camera: Move deeper into the scene as they scroll
        // z starts at 5, moves to -10 at 100% scroll
        const targetZ = 5 - (scrollProgress * 15)
        cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05

        // Look always at center
        cameraRef.current.lookAt(0, 0, -5)
    })

    return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} fov={35} />
}
