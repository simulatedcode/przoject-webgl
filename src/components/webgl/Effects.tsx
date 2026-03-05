import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'

export default function Effects() {
    return (
        <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={1.5} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
    )
}
