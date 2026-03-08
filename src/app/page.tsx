'use client'

import { useRef } from "react"
import { useMouse } from "@/hooks/useMouse"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"
import { useWebGLStore } from "@/store/useWebGLStore"

import HeroText from "@/components/dom/Overlays/HeroText"
import PrologueText from "@/components/dom/Overlays/PrologueText"

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
          <HeroText />
        </section>

        {/* Prologue sits on top in the same container, faded in by its own timeline scrub */}
        <section className="prologue-section absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <PrologueText />
        </section>

      </div>

    </div>

  )

}