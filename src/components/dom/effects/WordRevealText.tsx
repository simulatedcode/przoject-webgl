'use client'

import React from 'react'

interface WordRevealTextProps {
    text: string
    className?: string
    style?: React.CSSProperties
}

/**
 * Splits text into words, masking them so they can be animated from bottom to top.
 */
export default function WordRevealText({ text, className = "", style }: WordRevealTextProps) {
    return (
        <span className={className} style={{ ...style, display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}>
            {text.split(" ").map((word, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden"
                    style={{ verticalAlign: 'bottom', paddingBottom: '0.1em' }}
                >
                    <span
                        className="word-reveal-child inline-block"
                        style={{ willChange: 'transform' }}
                    >
                        {word}
                    </span>
                </span>
            ))}
        </span>
    )
}
