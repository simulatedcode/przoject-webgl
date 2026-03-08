import GlobalLighting from './environment/GlobalLighting'
import CameraRig from './camera/CameraRig'
import SceneController from './SceneController'

export default function Experience() {
    return (
        <>
            <GlobalLighting />
            <CameraRig />

            {/* Route to the correct 3D chunk based on global app state */}
            <SceneController />
        </>
    )
}
