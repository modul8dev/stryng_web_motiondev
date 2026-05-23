# Stryng Web — Motiondev Marketing Site

A high-converting, deeply immersive marketing webpage for **stryng.io** built with Next.js, Tailwind CSS, and **motion.dev** (Framer Motion).

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router, Static Export) |
| Styling | Tailwind CSS |
| Animations | motion.dev (Framer Motion) |
| Deployment | GitHub Pages via Actions |

---

## Project Structure

```
src/
  app/
    layout.tsx        # Root layout, metadata, fonts
    page.tsx          # Main page — assembles all sections
    globals.css       # Base styles, Tailwind, custom utilities
  components/
    Nav.tsx           # Sticky transparent nav with scroll-aware blur
    Hero.tsx          # URL typer → particle explosion → social mockups
    SocialProof.tsx   # Old way vs. Stryng comparison + platform logos
    HowItWorks.tsx    # 4-step journey cards
    ContentShowcase.tsx  # Scroll-linked platform morph with layoutId
    Pricing.tsx       # Monthly/Annual toggle + spring pricing cards
    Testimonials.tsx  # Staggered review grid
    CTA.tsx           # Final conversion CTA
    Footer.tsx        # Full footer
    MagneticButton.tsx  # Springy magnetic hover CTA component
.github/
  workflows/
    deploy.yml        # GitHub Pages CI/CD
next.config.js        # Static export config
tailwind.config.ts    # Extended design tokens
```

---

## Setup

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build (static export to ./out)
npm run build
```

---

## GitHub Pages Deployment

### Option A — Apex domain (stryng.io)
The config in `next.config.js` is ready. Just enable GitHub Pages in your repo settings pointing to the `github-pages` environment.

### Option B — Subdirectory (username.github.io/repo-name)
Uncomment these lines in `next.config.js`:
```js
basePath: '/stryng_web_motiondev',
assetPrefix: '/stryng_web_motiondev/',
```

### Automatic Deploys
Every push to `main` triggers the GitHub Actions workflow:
1. Installs deps
2. Runs `next build` (outputs to `./out`)
3. Uploads artifact → deploys to GitHub Pages

---

## Animation Architecture (motion.dev)

| Section | Technique |
|---------|-----------|
| Hero URL Typer | `useEffect` character loop + `AnimatePresence` |
| Particle Explosion | Spring-based radial burst on submit |
| Social Mockups | `AnimatePresence` + spring scale-in with stagger |
| Platform Morph | `layoutId` shared layout transitions |
| Pricing Toggle | `motion.div` layout animation bubble slide |
| Pricing Numbers | Custom spring count-up animation |
| CTA Buttons | Magnetic physics via `onMouseMove` + spring `x/y` |
| Cards/Text | `whileInView` stagger fade-in on viewport enter |
| Nav | `useScroll` + `useTransform` background opacity |
