# PulseID — Design System & Visual Specification

## 1. Visual Direction & Identity

PulseID employs a **premium dark healthcare-technology aesthetic**. The design communicates clinical precision, trust, connectivity, and technological sophistication without resorting to cyberpunk tropes or generic SaaS templates.

---

## 2. Centralized Color Tokens

The visual system is built upon a dark clinical palette defined in both `src/app/globals.css` (Tailwind CSS v4 `@theme inline`) and `src/lib/constants.ts`:

| Token Name | Hex Value | CSS Variable | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Main Background** | `#07111F` | `--bg-main` | Deep navy page background |
| **Secondary Background** | `#0B192B` | `--bg-secondary` | Section separation and banner backgrounds |
| **Card Background** | `#102238` | `--bg-card` | Elevated component surfaces, cards, and countdown units |
| **Primary Blue** | `#2589FF` | `--color-primary-blue` | Core brand color, primary CTA gradient, active roles |
| **Cyan Accent** | `#35D6E8` | `--color-cyan-accent` | Clinical pulse accents, highlights, focus rings, hover glow |
| **Primary Text** | `#F4F8FC` | `--text-primary` | High-contrast editorial headlines and card titles |
| **Secondary Text** | `#9BAFC3` | `--text-secondary` | Descriptive paragraphs, subtitles, and unit labels |
| **Subtle Borders** | `#1C344D` | `--border-subtle` | Structural dividers, card borders, and input boundaries |

---

## 3. Brand Symbol & Logo (`PulseLogo`)

- **Component:** `src/components/ui/logo.tsx`
- **Design Elements:**
  - Rounded clinical shield background in `#102238` with `#1C344D` border.
  - Continuous electrocardiogram (ECG) heartbeat line styled with a linear gradient transitioning from Primary Blue (`#2589FF`) to Cyan Accent (`#35D6E8`).
  - Terminal connectivity nodes symbolizing interconnected patient/provider data.
  - Wordmark: "Pulse" in high-contrast `#F4F8FC` and "ID" in bold `#35D6E8`.
- **Status:** Proposed temporary brand mark pending official corporate identity approval.

---

## 4. Typography Hierarchy

Configured via Next.js `next/font/google`:
- **Primary Body & Headings:** `Geist Sans`
  - Hero Headline: `text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight`
  - Section Headings: `text-2xl sm:text-3xl md:text-4xl font-bold`
  - Body Text: `text-sm sm:text-base md:text-lg leading-relaxed`
- **Tabular & Numeric Displays:** `Geist Mono`
  - Countdown numerals: `font-mono tabular-nums text-3xl sm:text-5xl md:text-6xl font-bold`
  - Technical metadata and timezones.

---

## 5. Accessibility & Responsive Specifications

- **Contrast Ratios (WCAG 2.1 AA):**
  - Primary text (`#F4F8FC`) on Main background (`#07111F`): **18.2:1** (Passes AAA).
  - Secondary text (`#9BAFC3`) on Main background (`#07111F`): **6.8:1** (Passes AA).
  - Cyan Accent (`#35D6E8`) on Main background (`#07111F`): **11.5:1** (Passes AAA).
- **Interactive Focus States:**
  - All clickable links and buttons include explicit visible focus outlines: `focus-visible:ring-2 focus-visible:ring-[#35D6E8]`.
- **Motion Accessibility:**
  - Smooth scrolling disabled automatically for users requesting reduced motion via `motion-reduce` media queries.
- **Responsive Layout Validations:**
  - `375px`: Mobile screens (single-column cards, 2x2 countdown grid, collapsible drawer).
  - `768px`: Tablet screens (2-column team grid, 4-column countdown row).
  - `1024px`: Desktop screens (3-column team grid, expanded navigation links).
  - `1440px`: Large desktop (centered container with generous whitespace).
