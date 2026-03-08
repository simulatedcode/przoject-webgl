export default function EpilogueScene() {
    return (
        <group>
            <mesh position={[0, -5, -20]}>
                <sphereGeometry args={[10, 32, 32]} />
                <meshStandardMaterial color="#2a2a2a" />
            </mesh>
        </group>
    )
}
