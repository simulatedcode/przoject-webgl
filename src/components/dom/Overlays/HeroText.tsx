'use client'

export default function HeroText() {
    return (
        <div className="hero-text-container fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="hero-text-content text-center text-white mix-blend-exclusion px-10">
                <h2 className="hero-title text-sm md:text-base pb-12font-medium tracking-[0.2em] opacity-0 translate-y-6 uppercase leading-relaxed">
                    SPECULATIVE FUTURES MEMORIES
                </h2>

                {/* The Final Reveal Text */}
                <h3 className="hero-reveal-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg md:text-xl font-light tracking-[0.5em] opacity-0 uppercase whitespace-nowrap">
                    REVEALING THE CORE
                </h3>
            </div>
        </div>
    )
}
