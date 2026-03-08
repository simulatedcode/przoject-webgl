'use client'

import { useRef } from "react"
import { useMouse } from "@/hooks/useMouse"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"
import { useWebGLStore } from "@/store/useWebGLStore"

import HeroText from "@/components/dom/Overlays/HeroText"
import CinematicHUD from "@/components/dom/HUD/CinematicHUD"
import NoSSR from "@/components/dom/NoSSR"
import PrologueText from "@/components/dom/Overlays/PrologueText"
import ScrollHint from "@/components/dom/ScrollHint"
import ChapterText from "@/components/dom/Overlays/ChapterText"
import EpilogueText from "@/components/dom/Overlays/EpilogueText"

export default function Home() {
  const containerRef = useRef<HTMLElement>(null)

  // Mouse parallax system
  useMouse()

  useGSAP(() => {
    // 1. Master WebGL Scrubber
    // Reads the entire document scroll to scrub the 3D CameraRig and SceneController
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // Smooth dampening
      onUpdate: (self) => {
        useWebGLStore.getState().setScrollProgress(self.progress)
      }
    })

    // 2. Local DOM Fades
    // Each section animates in naturally when it enters the viewport
    const fadeSections = gsap.utils.toArray('.anim-section')

    fadeSections.forEach((sec) => {
      gsap.fromTo(
        sec as Element,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec as Element,
            start: "top 80%", // Trigger when top of section is at 80% viewport height
            end: "top 30%",
            scrub: true,
          }
        }
      )
    })

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

  }, { scope: containerRef })


  return (
    <>
      {/* 
        Cinematic HUD overlay for the entire narrative sequence. 
        Fixed positioned, mode shifts on scroll.
        Placed outside the blended main container to ensure visual clarity.
        Wrapped in NoSSR to ensure it only renders on the client.
      */}
      <NoSSR>
        <CinematicHUD />
      </NoSSR>

      <main ref={containerRef} className="relative z-10 w-full text-white mix-blend-difference overflow-hidden">

        {/* 
        Hero is visible immediately (no .anim-section fade).
        Fills screen, content pushed to edges.
      */}
        <section className="relative w-full h-screen flex flex-col justify-between p-8 md:p-12 pointer-events-none">
          <HeroText />
          <ScrollHint />
        </section>

        {/* Spacer for pacing */}
        <div className="h-[20vh] pointer-events-none" />

        {/* Prologue: Centered, philosophical pause */}
        <section className="anim-section relative w-full min-h-screen flex items-center justify-center pointer-events-none">
          <PrologueText />
        </section>

        {/* Spacer for pacing */}
        <div className="h-[50vh] pointer-events-none" />

        {/* Chapter 1: Align Left */}
        <section className="anim-section relative w-full h-screen flex items-center justify-start pl-8 md:pl-24 pointer-events-none">
          <ChapterText
            number="01"
            title="The Architect's Folly"
            text="They built monuments to outlast the data. Concrete and stone to hold the memory of servers long since decayed. We walk among the wreckage of their permanence."
          />
        </section>

        {/* Spacer for pacing */}
        <div className="h-[30vh] pointer-events-none" />

        {/* Chapter 2: Align Right */}
        <section className="anim-section relative w-full h-screen flex items-center justify-end pr-8 md:pr-24 pointer-events-none text-right">
          <ChapterText
            number="02"
            title="Data Erosion"
            text="Bit logic yields to weathering. The geometry fragments, leaving only wireframes where histories were once stored. A speculative grid holding nothing but silence."
          />
        </section>

        {/* Spacer for pacing */}
        <div className="h-[50vh] pointer-events-none" />

        {/* Epilogue: Centered, final resting place */}
        <section className="anim-section relative w-full h-screen flex items-center justify-center pb-24 pointer-events-none">
          <EpilogueText />
        </section>

      </main>
    </>
  )
}