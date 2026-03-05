import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
// @ts-ignore
import vertex from './vertex.glsl'
// @ts-ignore
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
