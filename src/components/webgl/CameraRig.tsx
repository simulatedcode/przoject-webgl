import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { useWebGLStore } from '../../store/useWebGLStore'
import { lerp } from '@/lib/math'

export default function CameraRig() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)

    useFrame((state, delta) => {
        if (!cameraRef.current) return

        // 1. Get high-frequency transient state without re-rendering the component
        const { scrollProgress, mouse } = useWebGLStore.getState()

        // 2. Parallax: slightly move camera based on mouse normalized coordinates
        const targetX = mouse.x * 0.08
        const targetY = mouse.y * 0.08

        // Smoothly interpolate current camera position towards target
        // Using simple lerp since delta dampings can be complex here depending on setup
        cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.18
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.18

        // 3. Scroll Driven Camera: Move deeper into the scene as they scroll
        // The model is at z = -4. To end "inside", we aim for z = -4.5
        const targetZ = lerp(5, -3.66, scrollProgress)
        cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.1

        // 4. Dynamic FoV (Optional Zoom Effect)
        // Narrow the fov as we get closer for a cinematic macro look
        const targetFov = lerp(30, 20, scrollProgress)
        cameraRef.current.fov = lerp(cameraRef.current.fov, targetFov, 0.01)
        cameraRef.current.updateProjectionMatrix()

        // Look at the model center (which is at [0, -0.48, -4])
        cameraRef.current.lookAt(0, -0.382, -3.86)
    })

    return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} fov={35} />
}
