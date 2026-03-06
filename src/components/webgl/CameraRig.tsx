import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { useWebGLStore } from "../../store/useWebGLStore"

export default function CameraRig() {

    const cameraRef = useRef<THREE.PerspectiveCamera>(null)
    const targetRef = useRef(new THREE.Vector3())

    /* -------------------------------------------------- */
    /* CINEMATIC CAMERA PATH                              */
    /* -------------------------------------------------- */

    const cameraPath = useMemo(() => {

        const points = [
            new THREE.Vector3(2, 0, -7),   // start (sky)
            new THREE.Vector3(-2, -3, 4),  // wide drift
            new THREE.Vector3(2, 3, 4),  // approach sculpture
            new THREE.Vector3(0, 0, -5)   // final ground reveal
        ]

        return new THREE.CatmullRomCurve3(points)

    }, [])

    /* -------------------------------------------------- */
    /* FOCUS TARGETS                                      */
    /* -------------------------------------------------- */

    const sculptureTarget = new THREE.Vector3(0, 1, -5)
    const groundTarget = new THREE.Vector3(0, -0.2, -5)

    useFrame((state, delta) => {

        if (!cameraRef.current) return

        const { scrollProgress } = useWebGLStore.getState()

        // Smooth scroll
        const scroll = THREE.MathUtils.smoothstep(scrollProgress, 0, 1)

        /* -------------------------------------------------- */
        /* MOVE CAMERA ALONG SPLINE                           */
        /* -------------------------------------------------- */

        const position = cameraPath.getPoint(scroll)

        cameraRef.current.position.lerp(position, 0.1)

        /* -------------------------------------------------- */
        /* FOCUS TARGET                                       */
        /* -------------------------------------------------- */

        const focus = new THREE.Vector3().lerpVectors(
            sculptureTarget,
            groundTarget,
            scroll
        )

        targetRef.current.lerp(focus, 0.1)

        cameraRef.current.lookAt(targetRef.current)

        /* -------------------------------------------------- */
        /* CINEMATIC LENS                                     */
        /* -------------------------------------------------- */

        const targetFov = THREE.MathUtils.lerp(35, 18, scroll)

        cameraRef.current.fov = THREE.MathUtils.damp(
            cameraRef.current.fov,
            targetFov,
            3,
            delta
        )

        cameraRef.current.updateProjectionMatrix()

    })

    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 3, 8]}
            fov={35}
        />
    )
}