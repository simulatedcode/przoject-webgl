You are a **senior WebGL + Next.js architecture engineer** with experience building **Awwwards-level interactive portfolios** similar to Max Milkin, Bruno Simon, and Studio Freight.

Analyze the following **Next.js + React Three Fiber portfolio architecture** and suggest **structural improvements for scalability, performance, and maintainability**.

Focus on:

1. Separation of DOM and WebGL layers
2. Scene architecture for large WebGL worlds
3. Global animation loop design
4. Scroll-driven animation systems
5. Shader and asset management
6. State management (Zustand)
7. Performance optimizations for interactive portfolios
8. Folder structure best practices for long-term projects
9. Loading pipeline for assets (textures, models, shaders)
10. Future scalability (adding more scenes or interactions)

Here is the current structure:

/src
├── app/                  # Next.js routing (Pages, Layouts)
│    ├── layout.tsx       # Contains globally wrapped  and 
│    └── page.tsx         # The main scrolling landing page
│
├── components/
│    ├── dom/             # 2D HTML/Tailwind Elements
│    │    ├── Loader.tsx      # High-end percentage loader (HTML)
│    │    ├── Navbar.tsx      # Fixed Navigation
│    │    ├── Typography.tsx  # Split text, titles, descriptions
│    │    └── Overlays/       # HTML sections overlaying the 3D space
│    │
│    └── webgl/           # 3D Elements (Everything inside )
│         ├── CanvasRig.tsx   # The Global R3F Canvas setup
│         ├── Effects.tsx     # Post-processing pipeline (Bloom, Vignette)
│         ├── Camera.tsx      # Cinematic animated camera rig
│         ├── scenes/         # Chunks of your 3D world
│         │    ├── HeroScene.tsx
│         │    ├── ProjectScene.tsx
│         │    └── FooterScene.tsx
│         └── shaders/        # Custom GLSL Shaders
│              ├── materials/
│              └── templates/
│
├── hooks/                # Custom utility hooks
│    ├── useScroll.ts     # Hook to get current Lenis scroll progress globally
│    └── useMouse.ts      # Normalized mouse coordinates for parallax
│
├── store/                # Zustand State Machine
│    └── useStore.ts      # Tracks loading %, current section, active project
│
└── lib/                  # Utilities
├── gsap.ts          # GSAP configuration & custom easing
└── math.ts          # Lerp, damp, interpolation functions

Please:

1. Identify **missing architectural layers** needed for large WebGL applications.
2. Suggest **improvements to the folder structure**.
3. Recommend **patterns used by professional WebGL portfolios**.
4. Explain how to implement a **central Experience/World manager** if necessary.
5. Suggest how to handle **global animation loops (RAF)**.
6. Suggest improvements for **shader organization**.
7. Suggest how to manage **assets and loading pipelines**.
8. Suggest performance optimizations for **WebGL + React Three Fiber**.

Return:

1. A **revised folder architecture**
2. A **clear explanation of the improvements**
3. Optional code patterns used by **Awwwards-level portfolios**
