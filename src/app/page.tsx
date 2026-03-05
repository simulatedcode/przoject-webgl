'use client'

import { useEffect, useRef } from "react"
import { useScroll } from "@/hooks/useScroll"
import { useMouse } from "@/hooks/useMouse"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
import { useWebGLStore } from "@/store/useWebGLStore"
import HeroText from "@/components/dom/Overlays/HeroText"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize global events (mouse parallax)
  useMouse()
  // Note: We might want to disable the default useScroll hook 
  // if we let GSAP drive the WebGL progress exclusively for this page.
  // For now, let's let GSAP drive the store.

  useGSAP(() => {
    if (!containerRef.current) return

    // Cinematic Scroll Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // Scroll for 3 screens worth of distance
        pin: true,     // UNLOCKS THE PINNING MAGIC
        scrub: 1,      // Smooth scrubbing
        onUpdate: (self) => {
          // Sync with WebGL loop
          useWebGLStore.getState().setScrollProgress(self.progress)
        }
      }
    })

    // DOM Text Choreography
    tl.to(".hero-title", { opacity: 1, y: 0, duration: 1 }, 0.2)
      .to(".hero-title", { opacity: 0, y: -20, duration: 0.8 }, 1.5)
      .to(".hero-reveal-text", { opacity: 1, scale: 1.2, duration: 1.5, ease: "power4.out" }, 2.5)
      .to(".hero-reveal-text", { letterSpacing: "1em", duration: 2 }, 2.5)

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* 
        The Hero Section being pinned.
        Inside this, we place our DOM Overlays.
      */}
      <section className="hero-section relative w-full h-screen flex flex-col justify-between p-8">
        <div className="flex items-center justify-between text-white mix-blend-difference z-50">
          <h1 className="text-xl font-medium uppercase tracking-widest">Przoject</h1>
          <p className="text-sm uppercase">SCROLL TO EXPLORE</p>
        </div>

        {/* The revealed text overlays */}
        <HeroText />

        <div className="flex justify-between items-end text-white mix-blend-difference z-50">
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
