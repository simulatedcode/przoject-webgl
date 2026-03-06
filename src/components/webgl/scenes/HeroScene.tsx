import { useGLTF, Environment, Grid, ContactShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useWebGLStore } from '../../../store/useWebGLStore'
import { lerp } from '../../../lib/math'
import { useNormalizedModel } from '../../../hooks/useNormalizedModel'

export default function HeroScene() {

    const { scene } = useGLTF('/models/helas.glb')
    const groupRef = useRef<THREE.Group>(null)
    const gridRef = useRef<THREE.Mesh>(null)
    const textRef = useRef<any>(null)

    // Robustly calculate the pivot, center, and ground alignment for any GLTF model
    const normalizedModel = useNormalizedModel(scene, 3.8)

    useFrame(() => {

        if (!groupRef.current || !gridRef.current) return

        const scroll = useWebGLStore.getState().scrollProgress

        const FADE_START = 0.85
        const FADE_END = 1.0

        const fadeValue = 1 - THREE.MathUtils.smoothstep(scroll, FADE_START, FADE_END)

        const targetY = lerp(0, -1, THREE.MathUtils.smoothstep(scroll, FADE_START, FADE_END))
        groupRef.current.position.y = targetY

        const exitScale = lerp(1, 0.95, THREE.MathUtils.smoothstep(scroll, FADE_START, FADE_END))
        groupRef.current.scale.setScalar(exitScale)

        const material = gridRef.current.material

        if (!Array.isArray(material)) {
            material.transparent = true
            material.opacity = fadeValue
        }

        // TEXT REVEAL: Fade in at 0.3, hold till 0.6, fade out at 0.8
        if (textRef.current) {
            const fadeIn = THREE.MathUtils.smoothstep(scroll, 0.3, 0.5)
            const fadeOut = THREE.MathUtils.smoothstep(scroll, 0.6, 0.8)
            const opacity = Math.max(0, fadeIn - fadeOut) * 0.25 // max opacity 0.25
            textRef.current.fillOpacity = opacity
        }

    })

    return (
        <group ref={groupRef}>

            {/* Atmosphere */}
            <color attach="background" args={['#8CA090']} />
            <fog attach="fog" args={['#8CA090', 10, 30]} />

            {/* Lighting */}
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

            {/* Sculpture */}
            {/* The model's Y=0 is physically grounded, X/Z are mathematically centered.
                We push it onto the floor (-2) and back (-4) */}
            <group position={[0, -2, -5]}>
                <primitive object={normalizedModel} />
            </group>

            {/* Ground grid */}
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

            {/* Shadows */}
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

useGLTF.preload('/models/helas.glb')