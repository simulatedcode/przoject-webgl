export default function LandscapeScene() {
    return (
        <group>
            <mesh position={[0, -2, -10]}>
                <boxGeometry args={[10, 1, 10]} />
                <meshStandardMaterial color="#3a4f41" />
            </mesh>
        </group>
    )
}
