import { useGLTF, Text, Environment, Grid, ContactShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useWebGLStore } from '../../../store/useWebGLStore'
import { lerp } from '../../../lib/math'

export default function HeroScene() {
    const { scene } = useGLTF('/models/helas.glb')
    const groupRef = useRef<THREE.Group>(null)
    const gridRef = useRef<any>(null)

    // Stage thresholds (0.0 - 1.0)
    const FADE_START = 0.7
    const FADE_END = 1.0

    // Adjust material properties on the model if needed
    scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true
            child.receiveShadow = true
        }
    })

    useFrame(() => {
        if (!groupRef.current || !gridRef.current) return

        // 1. Fetch scroll progress directly from the non-reactive WebGL store
        const scroll = useWebGLStore.getState().scrollProgress

        // 2. Hero Fade Out / Transition (70% to 100% scroll)
        // We move the group away and fade it
        const fadeValue = 1 - THREE.MathUtils.smoothstep(scroll, FADE_START, FADE_END)

        // Move downward slightly as we fade out
        const targetY = lerp(0, -5, THREE.MathUtils.smoothstep(scroll, FADE_START, FADE_END))
        groupRef.current.position.y = targetY

        // Subtle scale-down and position shift
        const exitScale = lerp(1, 0.8, THREE.MathUtils.smoothstep(scroll, FADE_START, FADE_END))
        groupRef.current.scale.setScalar(exitScale)

        // Sync grid fade
        gridRef.current.material.opacity = fadeValue
    })

    return (
        <group ref={groupRef}>
            {/* Background & Atmosphere */}
            <color attach="background" args={['#8CA090']} />
            <fog attach="fog" args={['#8CA090', 10, 30]} />

            {/* Cinematic Lighting */}
            <Environment preset="dawn" environmentIntensity={0.6} />
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[15, 4, 3]}
                intensity={2.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={100}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
                shadow-bias={-0.0001}
            />

            {/* Main Model */}
            <primitive object={scene} position={[0, -0.48, -4]} scale={1.5} />

            {/* Grid line ground floor */}
            <Grid
                ref={gridRef}
                position={[0, -2, 0]}
                args={[100, 100]}
                cellSize={1}
                cellThickness={1}
                cellColor="#A6BAA9"
                sectionSize={5}
                sectionThickness={1.5}
                sectionColor="#6F8674"
                fadeDistance={30}
                fadeStrength={1}
            />

            {/* Accurate ground shadows */}
            <ContactShadows
                position={[0, -1.99, 0]}
                opacity={0.6}
                scale={40}
                blur={2}
                far={10}
                resolution={1024}
            />
        </group>
    )
}

// Preload the model
useGLTF.preload('/models/helas.glb')
