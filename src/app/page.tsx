'use client'

import { useEffect, useRef } from "react"
import { useMouse } from "@/hooks/useMouse"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
import { useWebGLStore } from "@/store/useWebGLStore"
import HeroText from "@/components/dom/Overlays/HeroText"

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
        end: "+=300%", // Scroll for 3 screens worth of distance
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
    <div ref={containerRef} className="relative w-full overflow-hidden mix-blend-difference text-white">
      {/* 
        The Hero Section being pinned.
        Inside this, we place our DOM Overlays.
      */}
      <section className="hero-section relative w-full h-screen flex flex-col justify-between p-8 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium uppercase tracking-widest">Przoject</h1>
          <p className="text-[10px] uppercase">SCROLL TO EXPLORE</p>
        </div>

        {/* The revealed text overlays */}
        <HeroText />

        <div className="flex justify-between items-end">
          <p className="text-[10px] opacity-50 uppercase tracking-widest">© 2026 Landscape Fiction</p>
          <p className="text-[10px] opacity-50 uppercase tracking-widest">Built with R3F + GSAP</p>
        </div>
      </section>

      {/* 
        Future Content Sections go here. 
        ScrollTrigger pinning will create a spacer so they appear after the hero.
      */}
      <section className="h-screen bg-transparent pointer-events-none" />
    </div>
  )
}
