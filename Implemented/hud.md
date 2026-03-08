Goal:
Integrate a cinematic **Blade Runner 2049–inspired HUD interface** into the WebGL storytelling website. The HUD should function as a **memory-analysis system** observing the landscape and the character Helas. It should enhance the narrative without covering the cinematic visuals.

Project Context:
The website is a **scroll-driven cinematic WebGL experience** using a camera rig. The story explores colonial landscapes inspired by Mooi Indie paintings and introduces a character named **Helas**. The HUD represents a speculative future system analyzing historical memory.

General HUD Design Language:

* Minimal futuristic interface inspired by Blade Runner 2049
* Thin geometric lines, scanning circles, grids
* Transparent floating panels
* Amber/orange primary color (#FF8A3C range)
* Subtle glow and blur
* Slow, calm motion (rotations, scans, pulse highlights)
* HUD should be rendered as **HTML/SVG overlay**, not inside the WebGL scene

Architecture:

* WebGL canvas renders the 3D scene
* A separate HTML overlay layer renders the HUD
* Use SVG elements for lines, circles, and frames
* Use GSAP for animations
* Maintain responsiveness across screen sizes

Scene-by-Scene HUD Behavior:

1. Hero Scene — System Boot
   The HUD appears minimally to introduce the interface.

Elements:

* small system label in top-left
* subtle grid or scanning line
* faint coordinates

Example text:
ARCHIVE SYSTEM // LANDSCAPE MEMORY
STATUS: INITIALIZING

Animation:

* slow fade-in
* grid lines appearing gradually
* scanning line sweep

Intensity level: 10%

---

2. Landscape Prologue — Terrain Analysis
   As the camera rig moves across the landscape, the HUD begins analyzing the environment.

Elements:

* horizon tracking line
* corner brackets framing the terrain
* landscape classification text

Example text:
TERRAIN ANALYSIS
JAVA LANDSCAPE

ERA ESTIMATION:
1830–1890

Animation:

* subtle scanning lines
* horizon detection movement

Intensity level: 25%

---

3. Character Reveal — Subject Detection
   When the character Helas appears on the horizon, the HUD activates strongly.

Elements:

* circular scan interface around the character
* subject detection box
* data stream panel

Example text:
SUBJECT DETECTED

ID: HELAS
STATUS: UNKNOWN
MEMORY TRACE: ACTIVE

Animation:

* rotating scan circle
* pulsing target marker
* data lines streaming vertically

Intensity level: 80%

---

4. Memory Reconstruction Section
   As the camera moves closer to the character, the HUD becomes layered and analytical.

Elements:

* floating data panels
* fragmented text blocks
* rotating diagrams

Example text:
MEMORY FRAGMENT 01
COLONIAL LANDSCAPE

STATUS: CORRUPTED
RECONSTRUCTING...

Animation:

* slow rotations
* glitch flicker
* loading bars or progress indicators

Intensity level: 60%

---

5. Final Section — System Collapse
   Near the end of the narrative, the HUD begins fading and losing signal.

Elements:

* disappearing grid
* broken system messages
* fading UI elements

Example text:
ARCHIVE UNSTABLE
SIGNAL LOST

Animation:

* flicker
* opacity fade
* gradual disappearance

Intensity level: 20%

---

HUD Layout Rules:

* Top-left: system information
* Top-right: coordinates or metadata
* Center: scanning circles or subject detection
* Left vertical column: data streams
* Bottom center: narrative system text

Avoid blocking the main cinematic composition.

---

Animation Style:

* slow motion
* elegant transitions
* avoid fast or aggressive UI motion
* emphasize atmosphere and mystery

---

Outcome:
The HUD should feel like a **future machine analyzing colonial memory**, guiding the viewer through the narrative without overwhelming the visuals.
