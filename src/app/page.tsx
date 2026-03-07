'use client'

import { useRef } from "react"
import { useMouse } from "@/hooks/useMouse"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"
import { useWebGLStore } from "@/store/useWebGLStore"

import HeroText from "@/components/dom/Overlays/HeroText"
import PrologueText from "@/components/dom/Overlays/PrologueText"

import WordRevealText from "@/components/dom/effects/WordRevealText"
import ScrambleText from "@/components/dom/effects/ScrambleText"

export default function Home() {

  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse parallax system
  useMouse()

  useGSAP(() => {

    if (!containerRef.current) return

    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=500%", // 5 screen heights of scrolling sequence
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Sync WebGL camera and component timelines
          useWebGLStore.getState().setScrollProgress(self.progress)
        }
      }
    })

    // Force a GSAP recalculation so the pin renders properly
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

  }, { scope: containerRef })


  return (

    <div className="canvas relative w-full text-white mix-blend-difference">

      {/* SINGLE MASTER PINNED CONTAINER TO SEQUENCE EVERYTHING */}
      <div ref={containerRef} className="master-sequence-container relative h-screen w-full overflow-hidden">

        <section className="hero-section absolute inset-0 flex flex-col justify-between p-8 z-10 pointer-events-none">

          <div className="flex items-center justify-between">

            <ScrambleText
              text="PRZROJECT"
              className="text-xl font-medium uppercase tracking-widest"
            />

            <WordRevealText
              text="SCROLL TO EXPLORE"
              className="text-[10px] uppercase"
            />

          </div>

          <HeroText />

          <div className="flex justify-between items-end">

            <WordRevealText
              text="© 2026 Landscape Fiction"
              className="text-[10px] opacity-50 uppercase tracking-widest"
            />

            <WordRevealText
              text="Built with R3F + GSAP"
              className="text-[10px] opacity-50 uppercase tracking-widest"
            />

          </div>

        </section>

        {/* Prologue sits on top in the same container, faded in by its own timeline scrub */}
        <section className="prologue-section absolute inset-0 flex items-center justify-center pointer-events-none z-20">

          <PrologueText />

        </section>

      </div>

    </div>

  )

}