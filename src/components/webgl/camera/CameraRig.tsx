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
            /* 0.0 - Hero Intro     */ new THREE.Vector3(0.0, 2.0, 8.0),   // High, distant, emerging from dark
            /* 0.2 - Hero Reveal    */ new THREE.Vector3(-1.0, 1.0, 4.0),  // Dropping down, orbiting left slightly
            /* 0.4 - Prologue       */ new THREE.Vector3(-0.5, 0.0, 2.5),  // Low-angle, close, heroic
            /* 0.6 - Landscape      */ new THREE.Vector3(3.0, 0.5, 3.0),   // Lateral side track (parallax on grid)
            /* 0.8 - Memory         */ new THREE.Vector3(-1.5, 1.5, 2.0),  // High angle, close orbit, introspective
            /* 1.0 - Epilogue       */ new THREE.Vector3(0.0, 4.0, 10.0),  // High crane pull-away
        ]

        return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5)

    }, [])

    /* -------------------------------------------------- */
    /* FOCUS TARGETS                                      */
    /* -------------------------------------------------- */

    const targetPath = useMemo(() => {
        const points = [
            /* 0.0 - Hero Intro     */ new THREE.Vector3(0, 0.5, -5),      // Center of torso
            /* 0.2 - Hero Reveal    */ new THREE.Vector3(0, 1.0, -5),      // Upper chest/face
            /* 0.4 - Prologue       */ new THREE.Vector3(0, 2.0, -5),      // Head (emphasizing scale)
            /* 0.6 - Landscape      */ new THREE.Vector3(0, 0.5, -5),      // Center mass for tracking shot
            /* 0.8 - Memory         */ new THREE.Vector3(0, 1.5, -5),      // Face/introspection
            /* 1.0 - Epilogue       */ new THREE.Vector3(0, -2.0, -5),     // Entire monument/base
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
        /* MICRO-DRIFT (BREATHING)                           */
        /* -------------------------------------------------- */

        if (dollyRef.current) {
            const time = state.clock.elapsedTime

            // Slow figure-8 breathing motion for that handheld/drone float
            const driftX = Math.sin(time * 0.5) * 0.05
            const driftY = Math.cos(time * 0.4) * 0.05

            // Apply drift to the dolly (child layer) so it doesn't fight the rig lerp
            dollyRef.current.position.x = THREE.MathUtils.damp(dollyRef.current.position.x, driftX, 2, delta)
            dollyRef.current.position.y = THREE.MathUtils.damp(dollyRef.current.position.y, driftY, 2, delta)
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

            <group ref={dollyRef}>

                <PerspectiveCamera
                    ref={cameraRef}
                    makeDefault
                    fov={35}
                />

            </group>

        </group>

    )

}