import { useGLTF, Environment, Grid, ContactShadows, Center } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useWebGLStore } from '../../../store/useWebGLStore'
import { lerp } from '../../../lib/math'

export default function HeroScene() {

    const { scene } = useGLTF('/models/helas.glb')

    const groupRef = useRef<THREE.Group>(null)
    const gridRef = useRef<THREE.Mesh>(null)

    // Clone model and calculate uniform scale safely
    const { model, uniformScale } = useMemo(() => {
        const m = scene.clone(true)

        // Measure true original bounds for uniform scaling
        m.updateMatrixWorld(true)
        const box = new THREE.Box3().setFromObject(m)
        const size = new THREE.Vector3()
        box.getSize(size)

        // Normalize height
        const targetHeight = 3.8
        const s = targetHeight / size.y

        // Enable shadows without mutating transforms
        m.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                mesh.castShadow = true
                mesh.receiveShadow = true
            }
        })

        return { model: m, uniformScale: s }
    }, [scene])

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
            {/* Center component guarantees pivot is bottom-center, placing it perfectly on the floor */}
            <group position={[0, -2, -4]}>
                <Center bottom>
                    <primitive object={model} scale={uniformScale} />
                </Center>
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