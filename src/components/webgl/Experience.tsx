import { useStore } from '../../store/useStore'
import GlobalLighting from './core/GlobalLighting'
import CameraRig from './CameraRig'
import HeroScene from './scenes/HeroScene'

function ProjectScene() {
    return (
        <mesh position={[2, 0, -5]}>
            <torusGeometry args={[1, 0.4, 16, 100]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}

export default function Experience() {
    // Read from the reactive store which scene we are currently viewing
    // (In a real app, this might be driven by scroll progress thresholds)
    const currentScene = useStore(state => state.progress < 50 ? 'hero' : 'project')

    return (
        <>
            <GlobalLighting />
            <CameraRig />

            {/* Route to the correct 3D chunk based on global app state */}
            {currentScene === 'hero' && <HeroScene />}
            {currentScene === 'project' && <ProjectScene />}
        </>
    )
}
