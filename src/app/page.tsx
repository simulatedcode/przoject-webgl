'use client'

import { useEffect, useRef } from "react"
import { useMouse } from "@/hooks/useMouse"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
import { useWebGLStore } from "@/store/useWebGLStore"
import HeroText from "@/components/dom/Overlays/HeroText"
import PrologueText from "@/components/dom/Overlays/PrologueText"
import WordRevealText from "@/components/dom/effects/WordRevealText"
import ScrambleText from "@/components/dom/effects/ScrambleText"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize global events (mouse parallax)
  useMouse()

  useGSAP(() => {
    if (!containerRef.current) return

    // Cinematic Scroll Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=500%", // Extended scrolling distance for Hero + Prologue narrative
        pin: true,     // Pin the entire hero block
        scrub: 1,      // Smooth scrubbing
        onUpdate: (self) => {
          // Sync with WebGL loop
          useWebGLStore.getState().setScrollProgress(self.progress)
        }
      }
    })

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="absolute w-full overflow-hidden mix-blend-difference text-white">
      {/* 
        The Hero Section being pinned.
        Inside this, we place our DOM Overlays.
      */}
      <section className="hero-section relative w-full h-screen flex flex-col justify-between p-8 z-10">

        <div className="flex items-center justify-between">
          <ScrambleText text="Przoject" className="text-xl font-medium uppercase tracking-widest" />
          <WordRevealText text="SCROLL TO EXPLORE" className="text-[10px] uppercase" />
        </div>

        {/* The revealed text overlays */}
        <HeroText />

        <div className="flex justify-between items-end">
          <WordRevealText text="© 2026 Landscape Fiction" className="text-[10px] opacity-50 uppercase tracking-widest" />
          <WordRevealText text="Built with R3F + GSAP" className="text-[10px] opacity-50 uppercase tracking-widest" />
        </div>
      </section>

      {/* 
        The Prologue Section overlay (renders natively over the fixed WebGL canvas)
      */}
      <PrologueText />

      {/* 
        Future Content Sections go here. 
        ScrollTrigger pinning will create a spacer so they appear after the hero.
      */}
      <section className="h-screen bg-transparent pointer-events-none" />
    </div>
  )
}
