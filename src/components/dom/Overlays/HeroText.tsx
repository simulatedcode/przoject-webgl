'use client'

export default function HeroText() {
    return (
        <div className="hero-text-container fixed inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="hero-text-content text-center text-white mix-blend-difference px-10">
                <h2 className="hero-title text-4xl md:text-6xl font-light tracking-tighter opacity-0 translate-y-10 uppercase">
                    Minimalism is not emptiness
                </h2>
                <p className="hero-subtitle text-xl md:text-2xl font-light tracking-wide opacity-0 translate-y-5 mt-4 italic">
                    It's essence.
                </p>
            </div>
        </div>
    )
}
