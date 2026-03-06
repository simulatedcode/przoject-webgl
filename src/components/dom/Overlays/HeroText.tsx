'use client'

export default function HeroText() {
    const titleText = "SPECULATIVE FUTURES MEMORIES"
    const revealText = "REVEALING THE CORE"

    return (
        <div className="hero-text-container ">
            <div className="hero-text-content px-10 flex flex-col items-center justify-center gap-10">

                {/* Small intro line - SCRAMBLE TEXT TARGET */}
                <h2 className="hero-title uppercase text-sm md:text-base tracking-[0.2em] font-mono">
                    <span className="scramble-target" data-text={titleText}>
                        {titleText}
                    </span>
                </h2>

                {/* Main reveal text - FLIP TEXT TARGET */}
                <h1 className="hero-reveal-text uppercase" style={{ perspective: '800px' }}>
                    {revealText.split("").map((char, i) => (
                        <span
                            key={i}
                            className="flip-char inline-block"
                            style={{ willChange: 'transform, opacity' }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </h1>

            </div>
        </div>
    )
}