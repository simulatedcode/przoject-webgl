import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * Normalizes any imported GLTF model so it behaves predictably in the scene.
 * 
 * 1. Scales it to a precise target height.
 * 2. Centers its X and Z pivot symmetrically.
 * 3. Sets its Y pivot exactly to the lowest vertex (bottom = 0).
 * 4. Enables shadows across all meshes.
 */
export function useNormalizedModel(scene: THREE.Group, targetHeight: number = 3.8) {
    return useMemo(() => {
        // 1. Deep clone so we don't mutate the cached GLTF scene directly
        const model = scene.clone(true)

        // Ensure world matrices are fully updated before measurement
        // We temporarily reset local position/scale to measure the raw geometry
        model.updateMatrixWorld(true)

        // 2. Measure the raw bounding box of the imported model
        const box = new THREE.Box3().setFromObject(model)
        const size = new THREE.Vector3()
        const center = new THREE.Vector3()

        box.getSize(size)
        box.getCenter(center)

        // 3. Prevent division by zero if an empty model is passed
        if (size.y === 0) return new THREE.Group()

        // 4. Calculate the uniform scale needed to reach the target height
        const scale = targetHeight / size.y

        // 5. Create a clean wrapper group that will act as the new normalized root
        const normalizedGroup = new THREE.Group()

        // We apply the scale to the wrapper, NOT the model, to preserve any intrinsic 
        // non-uniform scales the 3D artist might have exported inside the node hierarchy.
        normalizedGroup.scale.setScalar(scale)

        // 6. Shift the model's position inversely to its measured center and bottom.
        // This math guarantees that relative to normalizedGroup:
        // - X is visually centered
        // - Z is visually centered
        // - Y min vertex physically touches 0
        model.position.set(
            model.position.x - center.x,
            model.position.y - box.min.y,
            model.position.z - center.z
        )

        // 7. Force shadows physically
        model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                mesh.castShadow = true
                mesh.receiveShadow = true
            }
        })

        // 8. Nest the offset model inside the cleanly scaled wrapper
        normalizedGroup.add(model)

        return normalizedGroup

    }, [scene, targetHeight])
}
