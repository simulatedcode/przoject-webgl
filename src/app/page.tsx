'use client'

import { useScroll } from "@/hooks/useScroll"
import { useMouse } from "@/hooks/useMouse"

export default function Home() {
  // Initialize global non-reactive event listeners
  useScroll()
  useMouse()

  return (
    <div className="w-full h-[300vh] pointer-events-none">
      {/* 
        This div's only purpose is to force a 300vh scroll height 
        so that Lenis can record scroll progress and R3F can respond.
        The actual visuals happen in the Canvas behind this layout.
      */}
      <div className="pointer-events-auto flex items-center justify-between p-8 text-white mix-blend-difference z-50">
        <h1 className="text-xl font-medium uppercase tracking-widest">Przoject</h1>
        <p className="text-sm uppercase">SCROLL TO EXPLORE</p>
      </div>
    </div>
  )
}
