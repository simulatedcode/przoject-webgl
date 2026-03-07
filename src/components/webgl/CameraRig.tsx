import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { useWebGLStore } from "../../store/useWebGLStore"

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
            new THREE.Vector3(0, 1, 4),    // 0.0: Wide, distant, very low angle tracking
            new THREE.Vector3(0, 1, 4),  // 0.25: Creeping forward, slight rise
            new THREE.Vector3(0, 1, 4),     // 0.5: Centering on the subject
            new THREE.Vector3(0, 0, 0),  // 0.75: Slow drift past the side
            new THREE.Vector3(0, 0, 4)   // 1.0: Final intimate, low-angle settle
        ]

        return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.3) // Tighter curve tension

    }, [])

    /* -------------------------------------------------- */
    /* FOCUS TARGETS                                      */
    /* -------------------------------------------------- */

    const targetPath = useMemo(() => {
        const points = [
            // Panning slowly down the monumental scale of the structure
            new THREE.Vector3(0, 0, 0),   // 0.0: Looking high up at the titan
            new THREE.Vector3(0, 0, 0),   // 0.25: Slowly panning down its chest
            new THREE.Vector3(0, 0, 0),   // 0.5: Revealing human scale
            new THREE.Vector3(0, 0, 0),   // 0.75: Nearing the base
            new THREE.Vector3(0, 0, 0)    // 1.0: Resting on the ground text / feet
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