import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { useWebGLStore } from "../../../store/useWebGLStore"
export default function CameraRig() {

    const rigRef = useRef<THREE.Group>(null)
    const dollyRef = useRef<THREE.Group>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)

    const targetRef = useRef(new THREE.Vector3())

    /* -------------------------------------------------- */
    /* CINEMATIC CAMERA PATH                              */
    /* -------------------------------------------------- */

    const cameraPath = useMemo(() => {

        const points = [
            // BLADE RUNNER 2049 STYLE:
            // Low, monumental, creeping slowly forward with subtle lateral drift
            new THREE.Vector3(0.5, 1.0, 5.0),   // 0.0: Wide, slight left offset, low angle
            new THREE.Vector3(0.3, 0.8, 3.8),   // 0.25: Creeping in, dropping slightly
            new THREE.Vector3(0.0, 0.6, 2.8),   // 0.5: Centering on the subject
            new THREE.Vector3(-0.4, 0.4, 2.0),  // 0.75: Subtle right drift, getting intimate
            new THREE.Vector3(-0.2, 0.25, 1.5)  // 1.0: Very close, low, final settle
        ]

        return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5)

    }, [])

    /* -------------------------------------------------- */
    /* FOCUS TARGETS                                      */
    /* -------------------------------------------------- */

    const targetPath = useMemo(() => {
        const points = [
            // Slowly panning down the monumental scale of the structure
            new THREE.Vector3(0, 1.5, -5),  // 0.0: Looking above the statue's head
            new THREE.Vector3(0, 0.8, -5),  // 0.25: Panning down to its chest
            new THREE.Vector3(0, 0.3, -5),  // 0.5: Stomach / torso
            new THREE.Vector3(0, -0.2, -5), // 0.75: Revealing the base
            new THREE.Vector3(0, -0.5, -5)  // 1.0: Resting near ground
        ]
        return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5)
    }, [])

    useFrame((state, delta) => {

        if (!cameraRef.current || !rigRef.current) return

        const { scrollProgress } = useWebGLStore.getState()

        // Apply a custom easing curve to the scroll parameter itself for more dynamic temporal pacing
        // (pow 1.5 gives a slow start, fast middle, slow end feel across the spline)
        const scroll = THREE.MathUtils.smoothstep(scrollProgress, 0, 1)
        const easedScroll = Math.pow(scroll, 1.5)

        /* -------------------------------------------------- */
        /* MOVE RIG ALONG SPLINE                             */
        /* -------------------------------------------------- */

        const position = cameraPath.getPoint(easedScroll)

        // Fluid tripod movement - heavily dampened 
        rigRef.current.position.lerp(position, 0.05)

        /* -------------------------------------------------- */
        /* FOCUS TARGET                                      */
        /* -------------------------------------------------- */

        const focusTarget = targetPath.getPoint(easedScroll)

        // Even heavier dampening on the focus creates a "dragging" cinematic lookAt
        targetRef.current.lerp(focusTarget, 0.03)

        cameraRef.current.lookAt(targetRef.current)

        /* -------------------------------------------------- */
        /* DOLLY PUSH IN                                     */
        /* -------------------------------------------------- */

        if (dollyRef.current) {
            // Blade Runner macro push. Start tight at z=2 and push agonizingly close to z=0.5
            const dollyTargetZ = THREE.MathUtils.lerp(2, 0.5, easedScroll)

            // Heavy, slow dampening for the dolly
            dollyRef.current.position.z = THREE.MathUtils.damp(
                dollyRef.current.position.z,
                dollyTargetZ,
                1.5,
                delta
            )
        }

        /* -------------------------------------------------- */
        /* CINEMATIC LENS                                    */
        /* -------------------------------------------------- */

        // Start with a tighter Anamorphic feel (28), punch in even closer on the subject (18)
        const targetFov = THREE.MathUtils.lerp(30, 18, easedScroll)

        // Heavy, smooth dampening for the lens ring
        cameraRef.current.fov = THREE.MathUtils.damp(
            cameraRef.current.fov,
            targetFov,
            1.5,
            delta
        )

        cameraRef.current.updateProjectionMatrix()

    })

    return (

        <group ref={rigRef}>

            <group ref={dollyRef} position={[0, 0, 2]}>

                <PerspectiveCamera
                    ref={cameraRef}
                    makeDefault
                    fov={35}
                />

            </group>

        </group>

    )

}