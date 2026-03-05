import { useGLTF, Text, Environment, Grid, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

export default function HeroScene() {
    const { scene } = useGLTF('/models/helas.glb')

    // Adjust material properties on the model if needed
    scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true
            child.receiveShadow = true
        }
    })

    return (
        <group>
            {/* Background & Atmosphere (similar to the screenshot's soft green hues) */}
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

            {/* Text Overlay */}
            <Text
                position={[0, 0, 1.5]}
                fontSize={0.1}
                color="#333333"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
            >
                Speculative{"\n"}Futures{"\n"}Landscape.
            </Text>

            {/* Grid line ground floor */}
            <Grid
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

// Preload the model to prevent stutter when mounted
useGLTF.preload('/models/helas.glb')
