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

    })

    return (
        <group ref={groupRef}>

            {/* Atmosphere — void dark */}
            <color attach="background" args={['#080808']} />
            <fog attach="fog" args={['#080808', 8, 28]} />

            {/* Lighting */}
            <Environment preset="dawn" environmentIntensity={0.5} />

            {/* Ambient fill — keeps model readable against the dark background */}
            <ambientLight intensity={0.5} />

            {/* Back glow — behind and above the statue, creates the halo silhouette */}
            <directionalLight
                position={[0, 6, -10]}
                intensity={3.5}
                color="#c8d4ff"
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

            {/* Rim light — cool purple volumetric glow from behind */}
            <pointLight position={[0, 3, -8]} intensity={8} color="#6060ff" decay={2} />

            {/* Subtle warm fill from the front-left — strong enough to read the model clearly */}
            <spotLight position={[-4, 3, 3]} intensity={3.5} color="#ffe8c0" angle={0.5} penumbra={1} />

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