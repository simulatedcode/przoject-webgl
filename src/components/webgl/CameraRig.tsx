import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { useWebGLStore } from "../../store/useWebGLStore"

export default function CameraRig() {

    const parallaxGroupRef = useRef<THREE.Group>(null)
    const rotationGroupRef = useRef<THREE.Group>(null)
    const dollyGroupRef = useRef<THREE.Group>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)

    // Focus target
    const targetRef = useRef(new THREE.Vector3())

    // Center of sculpture and ground
    const focusPos = useRef(new THREE.Vector3(0, -0.1, -4))

    // Cached head position of sculpture
    const headPos = useRef(new THREE.Vector3(0, 1.8, -4))

    useFrame((state, delta) => {

        if (
            !parallaxGroupRef.current ||
            !rotationGroupRef.current ||
            !dollyGroupRef.current ||
            !cameraRef.current
        ) return

        const { scrollProgress, mouse } = useWebGLStore.getState()
        const time = state.clock.elapsedTime

        /* -------------------------------------------------- */
        /* 1. IDLE BREATHING                                  */
        /* -------------------------------------------------- */

        const breathIntensity = THREE.MathUtils.lerp(1, 0.1, scrollProgress)

        const breathX = Math.sin(time * 0.5) * 0.03 * breathIntensity
        const breathY = Math.cos(time * 0.4) * 0.03 * breathIntensity

        /* -------------------------------------------------- */
        /* 2. MOUSE PARALLAX                                  */
        /* -------------------------------------------------- */

        const clampedMouseX = THREE.MathUtils.clamp(mouse.x, -0.5, 0.5)
        const clampedMouseY = THREE.MathUtils.clamp(mouse.y, -0.5, 0.5)

        const targetParallaxX = clampedMouseX * 0.08 + breathX
        const targetParallaxY = clampedMouseY * 0.08 + breathY

        parallaxGroupRef.current.position.x = THREE.MathUtils.damp(
            parallaxGroupRef.current.position.x,
            targetParallaxX,
            3,
            delta
        )

        parallaxGroupRef.current.position.y = THREE.MathUtils.damp(
            parallaxGroupRef.current.position.y,
            targetParallaxY,
            3,
            delta
        )

        /* -------------------------------------------------- */
        /* 3. CINEMATIC ORBIT ROTATION                        */
        /* -------------------------------------------------- */

        const idleRotation = Math.sin(time * 0.15) * 0.02
        const scrollRotation = scrollProgress * 0.25

        const targetRotationY = idleRotation + scrollRotation

        rotationGroupRef.current.rotation.y = THREE.MathUtils.damp(
            rotationGroupRef.current.rotation.y,
            targetRotationY,
            2,
            delta
        )

        /* -------------------------------------------------- */
        /* 4. SCROLL DOLLY                                    */
        /* -------------------------------------------------- */

        // Camera starts far and enters the sculpture
        const targetZ = THREE.MathUtils.lerp(5, -3.48, scrollProgress)

        dollyGroupRef.current.position.z = THREE.MathUtils.damp(
            dollyGroupRef.current.position.z,
            targetZ,
            4,
            delta
        )

        /* -------------------------------------------------- */
        /* 5. CINEMATIC FOV                                   */
        /* -------------------------------------------------- */

        const targetFov = THREE.MathUtils.lerp(30, 12, scrollProgress)

        cameraRef.current.fov = THREE.MathUtils.damp(
            cameraRef.current.fov,
            targetFov,
            3,
            delta
        )

        cameraRef.current.updateProjectionMatrix()

        /* -------------------------------------------------- */
        /* 6. FOCUS TARGET                                    */
        /* -------------------------------------------------- */

        const currentTargetX = THREE.MathUtils.lerp(focusPos.current.x, headPos.current.x, scrollProgress)
        const currentTargetY = THREE.MathUtils.lerp(focusPos.current.y, headPos.current.y, scrollProgress)
        const currentTargetZ = THREE.MathUtils.lerp(focusPos.current.z, headPos.current.z, scrollProgress)

        targetRef.current.x = THREE.MathUtils.damp(
            targetRef.current.x,
            currentTargetX,
            3,
            delta
        )

        targetRef.current.y = THREE.MathUtils.damp(
            targetRef.current.y,
            currentTargetY,
            3,
            delta
        )

        targetRef.current.z = THREE.MathUtils.damp(
            targetRef.current.z,
            currentTargetZ,
            3,
            delta
        )

        cameraRef.current.lookAt(targetRef.current)

    })

    return (
        <group ref={parallaxGroupRef}>

            {/* Layer 1: Parallax */}
            <group ref={rotationGroupRef}>

                {/* Layer 2: Rotation */}
                <group ref={dollyGroupRef} position={[0, 0, 5]}>

                    {/* Layer 3: Dolly + Camera */}
                    <PerspectiveCamera
                        ref={cameraRef}
                        makeDefault
                        position={[0, -0.2, 0]}
                        fov={30}
                    />

                </group>
            </group>
        </group>
    )
}