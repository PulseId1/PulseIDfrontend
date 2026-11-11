# PulseID — Figma Design Specification & Audit

> **Source of Truth:**
> - **Figma URL:** `https://www.figma.com/design/7apqJ0Hdd9iajliuGdw9jo/F-Pulse-ID--Copy---Copy-?node-id=233-46&m=dev`
> - **Canvas / Page:** `WEEB` (`115:627`)
> - **Target Desktop Node:** `landing` (`233:46`) — `1280px × 3378px`
> - **Target Mobile Node:** `lADING MOBAIL` (`218:419`) — `390px × 3212px`
> - **Audit Timestamp:** 2026-11-07
> - **Audited Via:** Local Figma Desktop MCP Server (`http://127.0.0.1:3845/mcp`)

---

## 1. Executive Summary & Canvas Architecture

The Figma file organizes the PulseID experience into distinct canvases:
1. **`WEEB` (Canvas `115:627`):** The official web launch and landing page canvas containing section `353:11440` ("landing").
   - **Desktop Landing (`233:46`):** Full 6-section responsive desktop specification (`1280px` canvas width, content max-width `1216px`).
   - **Mobile Landing (`218:419`):** Full 6-section responsive mobile specification (`390px` viewport width, content padding `16px` / `20px`).
2. **`APP` (Canvas `0:1`):** Native iOS / Android application screens (Onboarding, Account Types, Sign In, Patient Dashboard, Brov Doctor, Brov Pharmacy). Reserved for later phases.

---

## 2. Layout, Viewports & Grid Scale

| Viewport | Frame Name | Node ID | Canvas Width | Content Max Width | Horizontal Gutters | Section Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Desktop** | `landing` | `233:46` | `1280px` | `1216px` | `32px` | `64px – 96px` |
| **Mobile** | `lADING MOBAIL` | `218:419` | `390px` | `358px` | `16px` (header `20px`) | `40px – 48px` |

### Responsive Breakpoint Strategy
- **`Mobile (< 640px)`:** Matches `lADING MOBAIL` (`390px`). Collapsible navigation drawer, stacked vertical action buttons, accordion-style challenges cards with toggle details, stacked 1-column healthcare services, centered single-column footer form.
- **`Tablet (640px - 1024px)`:** Fluid transition: 2-column grid for services, auto-centered hero with proportional image scaling, 2-column orbital layout for challenges.
- **`Desktop (>= 1024px)`:** Matches `landing` (`1280px`). Sticky 81px navbar with pill nav and split CTAs, 2-column hero with surgical holographic doctor background, 5-card orbital network challenge layout, 5-card radial solution hub around central physician, 4-column healthcare services grid, and contained dark newsletter footer.

---

## 3. Verified Figma Variables & Design Tokens

Extracted directly via `get_variable_defs`:

### A. Color Palette & Semantics

| Token | Verified Figma Hex / Value | Semantic Role in PulseID |
| :--- | :--- | :--- |
| `primary/primary color` | `#078BDE` | Primary brand blue; headline emphasis, active tabs, primary CTAs, icon fills |
| `secondary/s 1` | `#02307D` | Deep navy primary; navigation bar background, dark section accents, headlines |
| `background/primary background` | `#FBFEFF` | Crisp clinical page surface for challenges and solutions sections |
| `background/box background` | `#FFFFFF` | Card surfaces, container backgrounds, white pills |
| `background/box background 2` | `#F9F9F9` | Secondary card background, subtle tinting |
| `Text/primary color` | `#078BDE` | Editorial blue text, active links |
| `Text/s 1` | `#02307D` | Section title text, high-contrast dark navy text |
| `Text/primary color dark 2` | `#41474F` | Standard body copy on light backgrounds |
| `Text/6` | `#727272` | Secondary body text, card descriptions, muted labels |
| `Text/6 1/6` | `#8B8B8B` | Tertiary muted text, icon default tints |
| `Text/6 2/6` | `#FFFFFF` | Pure white text on dark cards and navy headers |
| `Text/5` | `#EAEDF6` | Light lavender-gray subtle text, borders |
| `Text/3` | `#BACFD7` | Muted cyan-gray; "FOLLOW THE SUMMIT" label |
| `strok/sacan` | `#02307D` | Deep navy borders |
| `strok/strok gray` | `#E9EFFD` | Card borders, subtle input borders |
| `strok/strok gray 2` | `#DDE7FF` | Highlighted card borders, active borders |
| `icons/primary color` | `#078BDE` | Primary icon color |
| `icons/action 5` | `#C0CAE3` | Inactive step indicators, subtle icon rings |
| `icons/7` | `#FFFFFF` | White icon strokes |
| `icons/5` | `#8B8B8B` | Neutral icon strokes |

### B. Elevation & Glow Effects
- `effects/1 2/1`: `rgba(7, 139, 222, 0.20)` (`#078bde33`) — Soft primary blue glow / card elevation.
- `effects/3`: `rgba(142, 191, 222, 0.20)` (`#8ebfde33`) — Ambient background radial glow.
- `effects/3 2`: `rgba(45, 91, 168, 0.20)` (`#2d5ba833`) — Navy subtle shadow.
- `effects/4`: `rgba(192, 202, 227, 0.10)` (`#c0cae31a`) — Neutral card border shadow.
- `effects/6`: `rgba(255, 255, 255, 0.20)` (`#ffffff33`) — White inner rim light on buttons.

### C. Spacing & Radius Tokens
- `actachin 1`: `4px` (Fine gaps, indicator dot spacing)
- `actachin 2`: `6px` (Button padding, compact pill gaps)
- `actachin 3`: `8px` (Standard button radius, badge radius)
- `actachin 4`: `10px` (Input padding, card spacing)
- `reduse/acatin 6`: `20px` (Card corner radius, modal sheets)

### D. Typography Scale
- **Primary Families:**
  - `Inter`: UI components, buttons, navigation items, forms (`Inter:Regular`, `Inter:Semi_Bold`, `Inter:Bold`).
  - `Roboto`: Section headings, body paragraphs (`Roboto:Medium`, `Roboto:Regular`).
  - `SF Pro Text`: System/time indicators (`SF Pro Text:Semibold`).
- **Font Sizes:**
  - Headline 1 (Hero): `56px` (`font-extrabold`, leading `1.12`, tracking `-0.02em`)
  - Headline 2 (Sections): `44px` desktop / `28px – 32px` mobile (`font-bold`, leading `1.2`)
  - Headline 3 (Cards): `22px – 24px` desktop / `16px – 18px` mobile (`font-semibold`)
  - Body Large: `18px` (`font-normal`, leading `30px`)
  - Body Standard: `14px – 16px` (`leading-relaxed`)
  - Body Small / Captions: `12px – 13px`

---

## 4. Section-by-Section Design Inventory

### 1. Navigation Header
- **Desktop (`233:47`):**
  - Dimensions: `1280px × 81px` (sticky, `bg-[#02307D]`, border `#1B458A`).
  - Left: PulseID lockup.
  - Center: Pill-shaped navigation container (`420px × 47px`, `bg-[#153F87]`, border `#244B8F`, rounded `16px`).
    - Links: "Home" (active: `#0080DF` pill with 6px dot), "About", "Contact", "عربي" language toggle.
  - Right: "Log In" (secondary pill button `bg-[#153F87]`) + "Create Account" (primary CTA `#0080DF` with arrow icon).
- **Mobile (`218:765`):**
  - Dimensions: `390px × 69px` (sticky, `bg-[#02307D]`).
  - Left: PulseID logo mark.
  - Right: Hamburger drawer toggle button (`40px × 40px`, `218:789`).

### 2. Hero Section
- **Desktop (`233:91`):**
  - Dimensions: `1280px × 668px`, content max-width `1216px`.
  - Visual: Physician with biometric holographic medical interface + linear fade `rgba(1,9,30,0.95)` to `transparent`.
  - Headline: "Your Health Data. One Secure Identity."
  - Subtitle: 3-line paragraph (`max-width: 664px`, `18px` font size).
  - CTAs: "View my profile" (`#0080DF`, width `196px`) + "Discover PulseID" (glass border button, width `196px`).
  - Social Proof Strip: "FOLLOW THE SUMMIT:" with 4 social media icon buttons (Facebook, X, Instagram, LinkedIn).
- **Mobile (`218:609`):**
  - Dimensions: `390px × 514px`.
  - Scaled typography (`text-3xl`), stacked full-width buttons (`350px × 45px`), centered social row.

### 3. The Challenges Users Face
- **Desktop (`233:189`):**
  - Dimensions: `1280px × 769px`.
  - Section Header: "The Challenges Users Face" with introductory subtitle.
  - Layout: Orbital network layout around central stressed physician illustration (`sec2-mascot.svg`).
  - 5 Cards:
    1. Top Centered: "Fragmented Medical History"
    2. Left Top: "Time-Consuming Access"
    3. Left Bottom: "Safety & Medication Risks"
    4. Right Top: "Data Fragmentation & Privacy"
    5. Right Bottom: "Limited Medical Insights"
- **Mobile (`218:421`):**
  - Dimensions: `390px × 669px`.
  - Vertical accordion card stack (`358px` width each) with "Details" chevron button.

### 4. How PulseID Makes a Difference
- **Desktop (`233:502`):**
  - Dimensions: `1280px × 763px`.
  - Section Header: "How PulseID Makes a Difference" with subtitle.
  - Layout: Radial hub layout with physician illustration in center (`sec3-mascot.svg` / `solution.svg`).
  - 5 Solution Cards:
    1. Top Center: "Unified Biometric Health Record"
    2. Left Top: "Granular Patient-Owned Consent Control"
    3. Left Bottom: "Smart Prescription & OCR"
    4. Right Top: "AI-Powered Medical Assistant"
    5. Right Bottom: "Drug Interaction Alerts"
- **Mobile (`218:515`):**
  - Dimensions: `390px × 747px`.
  - 5 stacked mobile solution cards with details toggles.

### 5. Complete Healthcare, All in One Place
- **Desktop (`233:422`):**
  - Dimensions: `1280px × 591px`.
  - Header: Centered headline and subtitle.
  - 4-Column Grid:
    - Card 01: "Unified Medical Records"
    - Card 02: "AI Medical Assistant"
    - Card 03: "Smart Prescription & OCR"
    - Card 04: "Secure Data Sharing"
  - Card Structure: Top icon + badge number ("01"), title, 3-line description, "Learn More" footer link.
- **Mobile (`218:650`):**
  - Dimensions: `390px × 705px`.
  - 1-column stacked cards with full-width responsive padding.

### 6. Contained Footer
- **Desktop (`233:116`):**
  - Dimensions: `1280px × 508px`, background `#02307D`.
  - Centered PulseID logo lockup.
  - Horizontal Navigation Menu (Home, About Us, Contact Us, Privacy Policy, Terms & Conditions).
  - Centered Newsletter Subscription Box (`bg-[#021845]`, rounded 20px, work email input + "Subscribe" button).
  - Social media icon row (Facebook, X, Instagram, LinkedIn).
- **Mobile (`218:691`):**
  - Dimensions: `390px × 537px`.
  - 2-row wrapped footer links, stacked email input and full-width subscribe button.

---

## 5. Verified Assets Inventory

| Asset Name | Local File Path | Figma Node Reference |
| :--- | :--- | :--- |
| **Hero Doctor Backdrop** | `/landing/hero-image.svg` / `hero-doctor.jpg` | Node `233:92` (`Component 39`) |
| **Hero Gradient Overlay** | `/landing/hero-gradient.svg` | Node `233:92` layer |
| **Challenges Central Mascot** | `/landing/sec2-mascot.svg` / `sec2.png` | Node `233:397` |
| **Solutions Central Doctor** | `/landing/sec3-mascot.svg` / `solution.svg` | Node `233:600` |
| **PulseID Primary Mark** | `/logo.svg` / `/logo-full.svg` | Node `233:50` |
| **Desktop Full Screenshot** | `brain/.../media_0.png` (step 99) | Node `233:46` |
| **Mobile Full Screenshot** | `brain/.../media_0.png` (step 101) | Node `218:419` |

