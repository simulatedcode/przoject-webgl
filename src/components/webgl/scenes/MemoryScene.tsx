export default function MemoryScene() {
    return (
        <group>
            <mesh position={[0, 0, -5]}>
                <octahedronGeometry args={[2, 0]} />
                <meshStandardMaterial color="#4a4a4a" wireframe />
            </mesh>
        </group>
    )
}
