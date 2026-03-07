import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
// @ts-expect-error raw glsl import
import vertex from './vertex.glsl'
// @ts-expect-error raw glsl import
import fragment from './fragment.glsl'

export const CustomMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color(0.2, 0.0, 0.1)
    },
    vertex,
    fragment
)

export default CustomMaterial
