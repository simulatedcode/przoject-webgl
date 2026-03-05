'use client'

export default function HeroText() {
    return (
        <div className="hero-text-container fixed inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="hero-text-content text-center text-white mix-blend-difference px-10">
                <h2 className="hero-title text-sm md:text-base font-medium tracking-[0.2em] opacity-0 translate-y-5 uppercase leading-relaxed">
                    MINIMALISM IS NOT EMPTINESS,<br />
                    IT'S ESSENCE.
                </h2>

                {/* The Final Reveal Text */}
                <h3 className="hero-reveal-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg md:text-xl font-light tracking-[0.5em] opacity-0 uppercase whitespace-nowrap">
                    REVEALING THE CORE
                </h3>
            </div>
        </div>
    )
}
