'use client'

import React from 'react'

interface ScrambleTextProps {
    text: string
    className?: string
}

/**
 * Renders a span suitable for the GSAP Scramble Text Timeline.
 * Gives it the expected class name and data-text attribute.
 */
export default function ScrambleText({ text, className = "" }: ScrambleTextProps) {
    return (
        <span className={`scramble-target ${className}`} data-text={text}>
            {text}
        </span>
    )
}
