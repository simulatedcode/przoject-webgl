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

    // 1. SCRAMBLE TEXT EFFECT
    const scrambleTarget = containerRef.current.querySelector('.scramble-target') as HTMLElement
    if (scrambleTarget) {
      const targetText = scrambleTarget.dataset.text || "SPECULATIVE FUTURES MEMORIES"
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\\\/[]{}—=+*^?#________"
      const scrambleObj = { val: 0 }

      // Initialize with gibberish
      scrambleTarget.innerText = chars.substring(0, targetText.length)

      // Fade in the wrapper while scrambling!
      tl.to(".hero-title", { opacity: 1, y: 0, duration: 1 }, 0.2)

      tl.to(scrambleObj, {
        val: 1,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          const p = scrambleObj.val
          const revealed = Math.floor(p * targetText.length)
          let newText = ""
          for (let i = 0; i < targetText.length; i++) {
            if (i < revealed) {
              newText += targetText[i]
            } else {
              newText += chars[Math.floor(Math.random() * chars.length)]
            }
          }
          scrambleTarget.innerText = newText
        }
      }, 0.2)
    }

    // Fade out scramble text as drone drifts down
    tl.to(".hero-title", { opacity: 0, y: -20, duration: 0.8 }, 1.5)

    // 2. FLIP TEXT EFFECT
    tl.fromTo(".flip-char",
      {
        opacity: 0,
        rotateX: -90,
        z: -50
      },
      {
        opacity: 1,
        rotateX: 0,
        z: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "back.out(1.7)"
      },
      2.0
    )

    // Epic letter spacing expansion at the end
    tl.to(".hero-reveal-text", { letterSpacing: "0.25em", duration: 1.5, ease: "power2.inOut" }, 2.5)

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden mix-blend-difference text-white">
      {/* 
        The Hero Section being pinned.
        Inside this, we place our DOM Overlays.
      */}
      <section className="hero-section relative w-full h-screen flex flex-col justify-between p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium uppercase tracking-widest">Przoject</h1>
          <p className="text-sm uppercase">SCROLL TO EXPLORE</p>
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
