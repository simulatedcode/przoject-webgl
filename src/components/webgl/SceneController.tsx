import { useScrollThreshold } from '../../hooks/useScrollThreshold'
import HeroScene from './scenes/HeroScene'
import LandscapeScene from './scenes/LandscapeScene'
import MemoryScene from './scenes/MemoryScene'
import EpilogueScene from './scenes/EpilogueScene'

export default function SceneController() {
    // Determine which narrative stage we are in based on scroll depth
    const currentStage = useScrollThreshold()

    return (
        <>
            {/* 
                We keep scenes mounted if they need to animate out slowly,
                but for now we mount explicitly based on active stage.
            */}
            {(currentStage === 'PRELOAD' || currentStage === 'HERO') && <HeroScene />}
            {currentStage === 'LANDSCAPE' && <LandscapeScene />}
            {currentStage === 'MEMORY' && <MemoryScene />}
            {currentStage === 'EPILOGUE' && <EpilogueScene />}
        </>
    )
}
