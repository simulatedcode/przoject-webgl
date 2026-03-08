import { Environment, Lightformer } from '@react-three/drei'

export default function GlobalLighting() {
    return (
        <>
            <ambientLight intensity={0.5} />
            {/* 
        The Environment component is crucial for PBR materials (metals, glass).
        It provides image-based lighting and reflections.
      */}
            <Environment resolution={256}>
                <group rotation={[-Math.PI / 4, -0.3, 0]}>
                    <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                    <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
                    <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
                    <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 11, 1]} />
                </group>
            </Environment>
        </>
    )
}
