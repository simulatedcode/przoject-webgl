'use client'

import React from 'react'

interface FlipTextProps {
    text: string
    className?: string
    style?: React.CSSProperties
}

/**
 * Renders a string of text split into individual spans for the GSAP Flip Text Timeline.
 * Gives each character the expected .flip-char class.
 */
export default function FlipText({ text, className = "", style }: FlipTextProps) {
    return (
        <span className={className} style={{ ...style, perspective: '800px', display: 'inline-block' }}>
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="flip-char inline-block"
                    style={{ willChange: 'transform, opacity' }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    )
}
