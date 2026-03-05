import {
    EffectComposer,
    Bloom,
    Vignette,
    Noise,
    Scanline,
    ChromaticAberration
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

export default function Effects() {
    return (
        <EffectComposer>
            <Bloom
                luminanceThreshold={0.5}
                luminanceSmoothing={0.9}
                intensity={1.2}
                blendFunction={BlendFunction.SCREEN}
            />

            {/* Cinematic Scanline / Monitor effect */}
            <Scanline
                density={2.5}
                opacity={0.15}
                blendFunction={BlendFunction.OVERLAY}
            />

            {/* Subtle chromatic edges for a real lens feel */}
            <ChromaticAberration
                offset={new THREE.Vector2(0.0015, 0.0015)}
                radialModulation={true}
                modulationOffset={0.5}
            />

            <Noise opacity={0.03} blendFunction={BlendFunction.SOFT_LIGHT} />

            <Vignette eskil={false} offset={0.3} darkness={0.9} />
        </EffectComposer>
    )
}

