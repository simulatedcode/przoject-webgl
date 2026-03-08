You are a **senior UI/UX architect and interactive storytelling designer** specializing in cinematic websites built with **Next.js, React Three Fiber, GSAP ScrollTrigger, and Tailwind CSS**.

Your task is to help plan and architect a **WebGL cinematic storytelling website**.

The website presents a speculative narrative about landscapes, monuments, and memory. It should feel like a **film sequence rather than a traditional webpage**, with smooth camera movement, atmospheric environments, and synchronized typography animations.

Design a **complete project structure and narrative system** for this website.

The project uses the following technologies:

* Next.js (App Router)
* React Three Fiber (WebGL scenes)
* GSAP + ScrollTrigger (scroll-driven animation)
* Tailwind CSS (layout and typography)
* Global CSS (canvas behavior and global styles)

The site contains a **fixed WebGL canvas background** with **DOM narrative overlays** that appear as the user scrolls.

Structure the planning around the following narrative stages:

1. **Preload Stage**

   * loading screen
   * asset preparation
   * transition into hero scene

2. **Hero Section**

   * cinematic opening environment
   * introduction of the landscape and Helas statue
   * animated hero text
   * scramble text intro
   * scroll hint

3. **Hero Reveal**

   * headline reveal animation
   * camera begins cinematic movement
   * environment atmosphere introduced

4. **Prologue Section**

   * philosophical narrative introduction
   * word-reveal typography animation
   * subtle environment shift

5. **Landscape Chapter**

   * camera pushes deeper into terrain
   * ruins and monuments appear
   * narrative chapter introduction

6. **Memory Chapter**

   * speculative reconstruction of history
   * fragmented architecture
   * surreal landscape evolution

7. **Epilogue Section**

   * camera slowly pulls away
   * final narrative text
   * environmental closure

For each stage explain:

* its **narrative purpose**
* the **WebGL scene elements**
* the **camera movement**
* the **DOM text animations**
* the **scroll interaction behavior**

Also design the **project folder architecture** for scalability.

Include recommended folders such as:

* WebGL scene components
* camera systems
* environment systems
* DOM overlay components
* animation effects
* global state management
* hooks for scroll and interaction

Explain how these systems should work together:

ScrollTrigger
→ Global Scroll Store
→ CameraRig movement
→ SceneController transitions
→ DOM narrative overlays

The final goal is to create a **cinematic storytelling experience where camera motion, environment, and typography evolve together as the user scrolls through the narrative.**
