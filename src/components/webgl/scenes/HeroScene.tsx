import { useGLTF, Environment, Grid, ContactShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useWebGLStore } from '../../../store/useWebGLStore'
import { lerp } from '../../../lib/math'

export default function HeroScene() {

    const { scene } = useGLTF('/models/helas.glb')

    const groupRef = useRef<THREE.Group>(null)
    const gridRef = useRef<THREE.Mesh>(null)

    // Clone model so we don't mutate GLTF cache
    const model = useMemo(() => scene.clone(true), [scene])

    useLayoutEffect(() => {

        // Reset transforms
        model.position.set(0, 0, 0)
        model.scale.setScalar(1)
        model.rotation.set(0, 0, 0)

        model.updateMatrixWorld(true)

        // Measure bounds
        const box = new THREE.Box3().setFromObject(model)
        const size = new THREE.Vector3()
        const center = new THREE.Vector3()

        box.getSize(size)
        box.getCenter(center)

        // Normalize height
        const targetHeight = 3.8
        const scale = targetHeight / size.y
        model.scale.setScalar(scale)

        model.updateMatrixWorld(true)

        // Recalculate box after scale
        const scaledBox = new THREE.Box3().setFromObject(model)
        const scaledCenter = new THREE.Vector3()

        scaledBox.getCenter(scaledCenter)

        // Center pivot
        model.position.x = -scaledCenter.x
        model.position.z = -scaledCenter.z

        // Place bottom at Y=0
        model.position.y = -scaledBox.min.y

        // Enable shadows
        model.traverse((child) => {

            if ((child as THREE.Mesh).isMesh) {

                const mesh = child as THREE.Mesh

                mesh.castShadow = true
                mesh.receiveShadow = true

            }

        })

    }, [model])

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
            <group position={[0, -2, -4]}>
                <primitive object={model} />
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