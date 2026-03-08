You are a senior **UI/UX architect and front-end system designer** with deep expertise in **Next.js, Tailwind CSS, WebGL storytelling interfaces, and modern design systems**.

Your task is to design and explain the **best styling architecture for a Next.js project that uses Tailwind CSS together with global CSS**.

The project is a **cinematic WebGL storytelling website** built with:

* Next.js (App Router)
* React Three Fiber (R3F)
* GSAP ScrollTrigger
* Tailwind CSS

The website contains:

* a **fixed WebGL canvas background**
* **DOM overlay sections** (Hero, Prologue, Chapters)
* **scroll-driven animations**
* **cinematic typography and transitions**

Explain clearly and professionally:

1. **The role of Tailwind CSS vs Global CSS**

   * when to use Tailwind utilities
   * when to use global CSS
   * when to create reusable Tailwind component classes

2. **Recommended file structure**
   Example:

   * `app/layout.tsx`
   * `app/page.tsx`
   * `app/globals.css`
   * `components/dom`
   * `components/webgl`
   * `styles/`

3. **How Tailwind layers work**

   * `@tailwind base`
   * `@tailwind components`
   * `@tailwind utilities`

4. **How to define reusable UI components using `@layer components`**

5. **Best practices for WebGL websites**

   * fixed canvas background
   * DOM overlay structure
   * preventing horizontal scroll
   * typography styling
   * performance considerations

6. Provide **example code snippets** including:

   * a clean `globals.css`
   * Tailwind component layers
   * a DOM overlay layout example
   * styling rules for a fixed WebGL canvas

7. Explain **common mistakes developers make when mixing Tailwind and global CSS**, and how to avoid them.

Write the explanation in a **clear educational tone**, as if guiding a professional developer building a cinematic storytelling site.
