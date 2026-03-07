You are a **senior WebGL / interactive developer** experienced with **Next.js, React Three Fiber, GSAP ScrollTrigger, and cinematic portfolio websites**.

The **Hero section of my site is already completed**.

Current setup:

• Next.js App Router
• React Three Fiber WebGL canvas
• GSAP + ScrollTrigger controlling scroll animation
• Zustand store syncing scroll progress with the WebGL camera
• A cinematic **HeroScene** with a drone-style camera rig
• HTML **HeroText overlay** with scramble and reveal animations

Hero timeline:

scroll 0–40%
Cinematic drone camera moves toward the sculpture.

scroll 40–60%
Ground text reveal animation appears.

At ~60% scroll the camera reaches its **final composition**.

This first section is finished.

Now I want to build the **Prologue section**.

Important requirement:

The **background must remain the final frame of the Hero WebGL scene**.

Do NOT load a new scene or reset the camera.

Instead:

• The WebGL canvas stays persistent
• The camera motion stops after the hero sequence
• New DOM content appears on top of the WebGL background

This should create a **cinematic storytelling transition**.

Requirements:

1. Clamp the camera motion so it stops after the hero scroll (for example at 60% progress).
2. The WebGL scene should remain visible as the background.
3. Add a **Prologue section** after the hero section.
4. The Prologue should include:

   * a small label (PROLOGUE)
   * a large narrative headline
   * a paragraph of descriptive text.
5. Animate the Prologue text with **subtle GSAP animations** (fade + rise).
6. Ensure the layout keeps the **WebGL canvas behind the DOM content**.
7. Structure the components like this:

page.tsx
– ScrollTrigger timeline
– scroll progress sync

HeroScene (WebGL)
– cinematic camera

HeroText (DOM overlay)
– scramble + reveal

Prologue (DOM overlay)
– narrative text appearing after hero.

Please provide:

• Example code for **clamping the camera motion**
• Example **Prologue React component**
• Example **GSAP animation for Prologue text**
• Recommended layout structure to keep the WebGL background persistent.

Goal:

Create a **cinematic transition where the hero scene naturally becomes the background for the Prologue narrative section**, similar to high-end WebGL portfolio sites.
