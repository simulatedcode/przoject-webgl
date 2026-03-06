'use client'

import ScrambleText from './effects/ScrambleText'
import FlipText from './effects/FlipText'

export default function HeroText() {
    return (
        <div className="hero-text-container ">
            <div className="hero-text-content px-10 flex flex-col items-center justify-center gap-10">

                {/* Small intro line - SCRAMBLE TEXT TARGET */}
                <h2 className="hero-title uppercase text-sm md:text-base tracking-[0.2em] font-mono">
                    <ScrambleText text="SPECULATIVE FUTURES MEMORIES" />
                </h2>

                {/* Main reveal text - FLIP TEXT TARGET */}
                <h1 className="hero-reveal-text uppercase">
                    <FlipText text="REVEALING THE CORE" />
                </h1>

            </div>
        </div>
    )
}