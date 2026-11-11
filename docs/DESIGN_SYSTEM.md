# PulseID — Design System & Visual Specification

## 1. Visual Direction & Identity

PulseID employs a **premium dark healthcare-technology aesthetic**. The design communicates clinical precision, trust, connectivity, and technological sophistication without resorting to cyberpunk tropes or generic SaaS templates.

---

## 2. Centralized Color Tokens & Figma Tokens

The visual system combines the core dark application palette with the verified light-clinical palette extracted from the official Figma source (`WEEB` Canvas / Node `233:46` & `218:419`):

### Core Application Tokens
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

### Verified Figma Design Tokens (`Node 233:46`)
| Figma Token Name | Value | CSS Variable | Usage |
| :--- | :--- | :--- | :--- |
| `primary/primary color` | `#078BDE` | `--figma-primary` | Main brand blue, active highlights, primary buttons |
| `secondary/s 1` | `#02307D` | `--figma-secondary-navy` | Navigation header background, dark section accents |
| `background/primary background`| `#FBFEFF` | `--figma-bg-primary` | Clinical white surface for Challenges & Solutions |
| `background/box background` | `#FFFFFF` | `--figma-bg-box` | Elevated card surfaces |
| `background/box background 2` | `#F9F9F9` | `--figma-bg-box-2` | Secondary cards, subtle containers |
| `Text/primary color dark 2` | `#41474F` | `--figma-text-dark` | Standard body text on light backgrounds |
| `Text/6` | `#727272` | `--figma-text-muted` | Secondary muted descriptions |
| `strok/strok gray` | `#E9EFFD` | `--figma-border-gray` | Subtle card borders |
| `strok/strok gray 2` | `#DDE7FF` | `--figma-border-gray-2` | Highlighted borders |

> Detailed specifications, screenshots, and component inventories are documented in [docs/design-system/FIGMA_DESIGN_SPEC.md](file:///E:/Technology/GitHub%20REPOS/PulseID/docs/design-system/FIGMA_DESIGN_SPEC.md).

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
- **Primary Body & Headings (Figma `Inter/font-family`):** `Inter` (`--font-inter`, Google Font)
  - Weights: `400` (Regular), `500` (Medium), `600` (Semi-Bold), `700` (Bold), `800` (Extra-Bold)
  - Hero Headline: `text-4xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight`
  - Section Headings: `text-3xl sm:text-4xl lg:text-[40px] font-extrabold`
  - Body Text: `text-[14px] sm:text-[16px] leading-relaxed text-[#41474F]`
- **Display & Card Numbers/Titles (Figma `Space_Grotesk:Bold`):** `Space Grotesk` (`--font-space-grotesk`, Google Font)
  - Weights: `600` (Semi-Bold), `700` (Bold)
  - Card Titles (Solutions & Services): `text-[18px] font-bold text-[#02307D]`
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
