# PulseID — Project Changelog

All notable changes to the PulseID platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.9.0] - 2026-10-30

### Fixed
- **Founders Card Ratio & Uniform Bento Spacing (`team-section.tsx`):**
  - Removed accidental vertical `desktopY` offset that caused Maryam and Youssef to be practically touching (2px gap) while Helmy and Mahmoud had an exaggerated 22px gap on mobile.
  - Aligned all 4 cards to the exact same horizontal level across all breakpoints (`y: 0`), guaranteeing identical, uniform 12px gutters both horizontally and vertically.
  - Refined card aspect ratio from rigid 340px vertical towers to balanced Pinterest/Bento proportions (`h-[280px] xs:h-[305px] sm:h-[365px] lg:h-[420px]`).
  - Added Bento monospace index tagging (`01 • PID-EXE-01`, `02 • PID-EXE-02`, etc.) and streamlined glass nameplates.
  - Reduced section padding from `py-14 sm:py-20 lg:py-26` to `py-10 sm:py-16 lg:py-22` to eliminate excess blank space between hero and team.
- **Hero Watermark Positioning Behind Mascot (`hero-countdown-section.tsx`):**
  - Relocated the architectural vector `COMING SOON` background watermark directly behind the Mascot Face container.
  - Guarantees the watermark is 100% visible on both mobile and desktop, perfectly framed by the mascot eyes, and never covered by the countdown boxes below.
  - Enhanced contrast and readability (`text-white/[0.11]` on mobile, `text-white/[0.07]` on desktop).

### Verified
- `pnpm run typecheck`: Passed with 0 errors.
- `pnpm run lint`: Passed with 0 errors and 0 warnings.
- `pnpm run build`: Production build compiled cleanly.
- Visual verification across Desktop (1440x950) and Mobile (390x844).

---

## [0.8.0] - 2026-10-30

### Fixed
- **Mobile Clock Removal (`hero-clock-arc.tsx`):**
  - Completely hid the clock arc on mobile and tablet (`hidden lg:flex`), retaining the right-border clock dial only on desktop viewports.
- **Minimized Vertical Spacing in Hero (`hero-countdown-section.tsx`):**
  - Removed `justify-between` and `my-auto` extremes that created 150px+ dead voids above and below the hero content.
  - Reduced the gap between the centered PulseID brand logo and the headline to a tight, minimal margin.
  - Repositioned the "Meet the team" scroll indicator closely beneath the countdown timer, removing the large empty blank void.
- **Close-Up Face Framing for Founders (`team-section.tsx`):**
  - Calibrated tailored portrait zooms (`scale-[1.85]` for Mohamed Helmy, `scale-[1.80]` for Youssef Elgendy, `scale-[1.28]` for Maryam Ebrahim, `scale-[1.32]` for Mahmoud Ibrahim) with matched `origin-[center_24%]` focal points.
  - Eliminated full-body background clutter (floor, pots, bags, stairs), bringing their faces and suit collars front and center without being obscured by the bottom nameplate.
- **Ultra-Clean Single-Capsule Category Bar (`team-section.tsx`):**
  - Replaced the scattered multi-line pills with a sleek, unified, continuous segmented pill capsule.
  - Displayed cleanly in a single row across all screen sizes (`All 14`, `Tech 5`, `Clinical 7`, `Pharma 1`, `Mktg 1` on mobile; full labels on desktop) with zero overflow, zero jagged line wraps, and zero messy appearance.

### Verified
- `pnpm run typecheck`: Passed with 0 errors.
- `pnpm run lint`: Passed with 0 errors and 0 warnings.
- `pnpm run build`: Production build compiled cleanly.
- Visual verification across Desktop (1440x950) and Mobile (390x844).

---

## [0.7.0] - 2026-10-30

### Changed
- **Removed "Coming Soon" Foreground Tag (`hero-countdown-section.tsx`):**
  - Removed the pill badge above the headline per user request.
  - Kept only the expansive architectural background vector watermark (`COMING SOON`), rendered with clean typography and unclipped letterforms.
- **Simultaneous All-4 Founders Display (`team-section.tsx`):**
  - Removed the mobile carousel/swapping mechanism entirely.
  - Arranged all 4 founders simultaneously at all times:
    - **Mobile & Tablet:** 2x2 grid (Row 1: Maryam Ebrahim CEO & Mohamed Helmy CTO; Row 2: Youssef Elgendy CBO & Mahmoud Ibrahim CMO).
    - **Desktop:** 4-column unified horizontal row side-by-side at the same level.
  - Each card flips independently in place to reveal full bio and direct LinkedIn CTA.
- **Redesigned Discipline Categories Hub (`team-section.tsx`):**
  - Replaced the cramped, horizontally clipped single-line scroll capsule with a responsive interactive discipline matrix.
  - Integrated dedicated department iconography (`Layers` for All, `Cpu` for Technology, `Activity` for Clinical & Research, `Pill` for Pharmaceutical, `TrendingUp` for Marketing).
  - Enhanced visual hierarchy with frosted glassmorphic pills, department glow accents, and illuminated count badges.
  - Guaranteed 100% visibility on all screen sizes with natural responsive wrap—no more chopped text (`Clini...`) or awkward overflow.

### Verified
- `pnpm run typecheck`: Passed with 0 errors.
- `pnpm run lint`: Passed with 0 errors and 0 warnings.
- `pnpm run build`: Production build compiled cleanly.
- Visual verification across Desktop (1440x950) and Mobile (390x844).

---

## [0.6.0] - 2026-10-30

### Fixed
- **Mobile Clock Arc Visibility (`hero-clock-arc.tsx`):**
  - Removed `hidden sm:flex` constraint and enabled responsive right-border positioning across all viewport sizes.
  - Added SVG `vectorEffect="non-scaling-stroke"` and calibrated tick geometry (`cx: 620, cy: 400, rOuter: 590, rInner: 515`) so the 9 ticks render crisply on mobile screens without clipping or subpixel thinning.
- **"COMING SOON" Mobile Visibility (`hero-countdown-section.tsx`):**
  - Added a prominent glowing status pill (`• COMING SOON`) centered directly above the main headline matching `inspire/1.jpeg` and `inspire/2.jpeg`.
  - Elevated the architectural vector watermark so it frames the headline and mascot rather than being obscured behind the opaque mobile countdown digit boxes.
- **LinkedIn Link Click & Card Flip Bug (`team-section.tsx`):**
  - Completely decoupled 3D card flip triggers from the card back and child interactive elements.
  - Isolated pointer, touch, and click events (`onPointerDown`, `onTouchStart`, `onTouchEnd`, `onClick`) with `e.stopPropagation()` and explicit `window.open(..., '_blank', 'noopener,noreferrer')` execution.
  - Prevented bio touch-scrolling from accidentally flipping the card.
  - Added dedicated "Tap to flip back" controls on the back face.

### Changed
- **Mobile Founding Leadership Presentation (`team-section.tsx`):**
  - Replaced the cumbersome 1700px vertical block stack on mobile (`< 1024px`) with an interactive, fluid swipeable slider featuring leader indexing (`01 / 04 • Name`), Prev/Next arrow controls, and dot indicators.
  - Retained the side-by-side 4-column unified grid on desktop (`lg:grid-cols-4`) in strict order: **CEO $\to$ CTO $\to$ Business $\to$ Marketing**.
- **Specialists Arched Carousel Motion Dynamics:**
  - Upgraded spring physics to snappy, responsive parameters (`stiffness: 350, damping: 28, mass: 0.5`).
  - Added direct mobile touch gesture swipe support with a responsive 25px flick threshold.
  - Tuned 3D coverflow geometry to provide prominent, elegant peeking cards on both mobile and desktop.

### Verified
- `pnpm run typecheck`: Passed with 0 errors.
- `pnpm run lint`: Passed with 0 errors and 0 warnings.
- `pnpm run build`: Production build compiled cleanly in Turbopack.
- Verified in headless browser test with automated LinkedIn navigation interception and visual screenshot captures.

---

## [0.5.0] - 2026-10-30

### Added
- **Dedicated Founding Leadership Section:**
  - Extracted the 4 executive founders into a dedicated top section above the rest of the team.
  - Displayed side-by-side on the same level (no carousel navigation needed) in strict order:
    1. **Maryam Ebrahim:** Founder & CEO (`PID-EXE-01`)
    2. **Mohamed Helmy:** Co-founder & CTO (`PID-EXE-02`)
    3. **Youssef Elgendy:** Co-founder & CBO (`PID-EXE-03`)
    4. **Mahmoud Ibrahim:** Chief Marketing Officer (`PID-EXE-04`)
  - Each card supports independent 180° 3D flip to view 100% full, untruncated bios and direct LinkedIn connect button.
- **Multidisciplinary Team Carousel:**
  - Placed the 14 specialized team members in an independent 3D coverflow arc carousel below leadership.
  - Discipline filter tabs: `01. All Specialists (14)`, `02. Technology (5)`, `03. Clinical & Research (7)`, `04. Pharmaceutical (1)`, `05. Marketing (1)`.
- **Right-Border Clock Arc (`hero-clock-arc.tsx`):**
  - Minimalist 9-line clock dial arc anchored flush against the right browser border with grand architectural radius.
  - Subdued opacity with live active tick indicator tracking real-time seconds, inspired by `inspire/2.jpeg`.
- **Responsive Vector "COMING SOON" Watermark:**
  - Centered SVG vector typography across the hero background ensuring the letter 'C' and 'N' are completely unclipped across all screen sizes.

### Changed
- Centered the PulseID brand mark in the hero header.
- Removed the top-right coming soon pill and announcement eyebrow tag per user request.
- Removed lateral margin and padding from the hero container for an edge-to-edge layout.

### Verified
- `pnpm run typecheck`: Passed with 0 errors.
- `pnpm run lint`: Passed with 0 errors and 0 warnings.
- `pnpm run build`: Production build compiled cleanly.
- Visual verification across Desktop (1440x950) and Mobile (390x844).

---

## [0.4.0] - 2026-10-30

### Added
- **Co-founder & CTO Mohamed Helmy Integration:**
  - Added **Mohamed Helmy: Co-founder & Chief Technology Officer (CTO)** (`PID-EXE-02`) leading the technical vision, platform architecture, cybersecurity, scientific research, and AI technology integration.
  - Added real high-resolution studio portrait photo (`/team/MohamedHelmy.jpg`).
  - Integrated direct LinkedIn profile: `https://www.linkedin.com/in/mohahelmy7`.
  - Added to both `Leadership` and `Technology` discipline rosters.
- **Card Flip Backside Redesign (Maximized Untruncated Text):**
  - Completely redesigned the 180° flipped card face per user specification:
    - Removed redundant barcode SVG and verification code.
    - Removed duplicate member name, role, and badge ID from the back since they are already prominently displayed on the front face.
    - Dedicated the entire card interior to 100% full, untruncated bio text with whitespace preservation and smooth slim cyan scrollbar (`[scrollbar-width:thin]`).
    - Added clean category badge, interactive `Flip back ↻` button, and direct `Connect on LinkedIn` CTA.
- **Executive Leadership & Founders Integration (`public/team` & `public/refrence/g.txt`):**
  - Integrated confirmed executive co-founders into the official roster (18 multidisciplinary members total):
    - **Maryam Ebrahim:** Founder & CEO (`PID-EXE-01`) — Researcher behind the original clinical study; recognized at PASID 2026 and Startup Grind MNU win.
    - **Mohamed Helmy:** Co-founder & CTO (`PID-EXE-02`) — Technical team lead, AI systems architect, cybersecurity & research lead.
    - **Youssef Elgendy:** Co-founder & CBO (`PID-EXE-03`) — Financial business modeling, commercial GTM framework, Delta region pharmacy partnerships.
    - **Mahmoud Ibrahim:** Chief Marketing Officer (`PID-EXE-04`) — Brand identity, growth strategies, commercial partnerships.
  - Added real studio portrait photographs for all 4 co-founders with cinematic gradient overlays.
- **Untitled UI Symmetrical Parabolic Arc 3D Coverflow Carousel:**
  - 3D coverflow geometry with cyclic wrap-around calculation, producing a symmetrical parabolic arc on both sides of the center card.
  - Frosted floating glass nameplate at the bottom of each card with full, untruncated names.

### Changed
- Reordered founding roster so **Maryam Ebrahim, Founder & CEO** holds the initial spotlight on page load, with **Mohamed Helmy (CTO)**, **Youssef Elgendy (CBO)**, and **Mahmoud Ibrahim (CMO)** completing the executive suite.
- Updated category tabs: `01. All Team (18)`, `02. Leadership (4)`, `03. Pharmaceutical (1)`, `04. Marketing (3)`, `05. Clinical & Research (8)`, `06. Technology (6)`.

### Verified
- `pnpm run typecheck`: Passed with 0 errors.
- `pnpm run lint`: Passed with 0 errors and 0 warnings.
- `pnpm run build`: Production build compiled cleanly.
- Visual verification across Desktop (1440x950) and Mobile (375x812) confirmed flawless photo framing, full bio display, and flip card mechanics.

---

## [0.3.0] - 2026-10-30

### Added
- **Technology & Engineering Team:**
  - Expanded team roster to 14 members across 4 disciplines (`01. Technology & Engineering`, `02. Pharmaceutical`, `03. Clinical & Research`, `04. Marketing`).
  - Added confirmed Tech Team members:
    - **Ahmed Mohamed Albelasy:** Backend Developer (`PID-ENG-01`)
    - **Mostafa Hussein:** UI/UX Designer (`PID-DSN-02`)
    - **Mohamed Mahrous:** Cybersecurity Specialist (`PID-SEC-03`)
    - **Mohamed Mostafa Badr:** AI Engineer (`PID-AIM-04`)
    - **Abdelrahman Ataa:** Frontend Developer (`PID-ENG-05`)
  - Direct LinkedIn profile integrations with custom SVG icon buttons.
- **Interactive PulseID Mascot (`MascotFace`):**
  - Interactive white pill mascot inspired by user brief, positioned directly above the countdown timer.
  - Smooth spring-driven vector calculation (`useSpring` via `motion`) so pupils dynamically track cursor position across the screen.
  - Idle timeout behavior: eyes smoothly tilt downward to look at the countdown timer when mouse is idle or off-screen.
  - Clean, unadorned white capsule face per user specification (removed chest/chin badge).
  - Random natural eye blink loop (every 2.5s–6s) and speech bubble interaction on click.
- **Official Brand Mark Integration:**
  - Integrated `public/logo.svg` as the official brand logo in the hero header.
- **Viewport Calibration & Countdown Visibility:**
  - Recalibrated vertical rhythm using `min-h-[100dvh]` with balanced typography and container padding.
  - Ensured the countdown timer, digits, labels, and launch date metadata are 100% visible immediately above the fold across all screen sizes (laptops with 650–700px height, 1080p desktop, and mobile viewports) without requiring any scrolling.
- **3D Flip Card Architecture & Mobile Swipe Carousel:**
  - Redesigned team cards into interactive 3D flip cards inspired by Untitled UI and BlockJoy references.
  - **Front Face:** Minimalist dark luxury card with glowing monogram portrait, badge ID, and frosted-glass nameplate.
  - **Back Face:** 180° 3D flip revealing verified credentials, specialization details, direct "Connect on LinkedIn" button, and digital security barcode.
  - **Desktop Layout:** Max 3 cards in view at a time with previous/next chevron navigation controls and pagination dots.
  - **Mobile Layout:** High-performance horizontal snap-scroll track with peek-through cards, eliminating vertical clutter on phones.

### Changed
- Refactored landing page into a focused 2-section launch experience:
  1. **Section A:** Hero Launch Countdown (Top logo, Eyebrow, Editorial headline, Subtitle, Interactive Mascot, Giant Countdown numerals, Scroll invitation).
  2. **Section B:** Meet the Team (ID Credential Badges with 4 animated category tabs).
- Set `Technology & Engineering` as the default active discipline tab.

### Verified
- `pnpm run typecheck`: Passed with 0 errors.
- `pnpm run lint`: Passed with 0 errors and 0 warnings.
- `pnpm run build`: Production build completed successfully.
- Cross-browser verified on Desktop (1440px) and Mobile (375px) via headless Edge with zero layout blowout or font clipping.

---

## [0.2.0] - 2026-10-30

### Added
- **Public Launch Landing Page (`/`):**
  - **Navigation (`LandingHeader`):** Responsive top bar with `PulseLogo`, anchor navigation links (`#intro`, `#countdown`, `#team`), launch CTA, and mobile hamburger drawer.
  - **Hero Section (`HeroSection`):** High-impact editorial headline ("Your health. Connected."), eyebrow badge, supporting copy, launch date pill, and smooth-scroll CTA button.
  - **Live Countdown (`CountdownTimer` & `CountdownSection`):** Real-time client component targeting `2026-11-20T00:00:00+02:00` in `Africa/Cairo` (UTC+2) timezone. Implemented using React 19's `useSyncExternalStore` for zero hydration mismatch, graceful expired state handling, and `aria-live` screen reader accessibility.
  - **Meet the Team (`TeamSection` & `TeamMemberCard`):** Dedicated team section consuming typed centralized data (`TEAM_MEMBERS`), neutral initials-based avatars, and conditional social link rendering.
  - **Footer (`LandingFooter`):** Reusable `PulseLogo`, brand mission statement, quick navigation links, and 2026 copyright notice.
- **Brand Identity (`PulseLogo`):** Minimalist custom SVG logo combining clinical ECG pulse geometry with the PulseID wordmark.
- **Iconography (`lucide-react` & `icons.tsx`):** Installed approved `lucide-react` library for general UI icons; created custom zero-dependency SVG components for LinkedIn and GitHub icons.
- **Dark Healthcare Color System:** Centralized Tailwind CSS v4 color tokens (`#07111F`, `#0B192B`, `#102238`, `#2589FF`, `#35D6E8`, `#F4F8FC`, `#9BAFC3`, `#1C344D`) in `globals.css` and `constants.ts`.
- **SEO & Social Metadata:** Configured Open Graph, Twitter card, description, viewport, and keywords in `src/app/layout.tsx`.

### Changed
- Replaced the initial placeholder in `src/app/page.tsx` with the composed Server Component landing page.
- Updated `docs/PRODUCT_SCOPE.md`, `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, `docs/DESIGN_SYSTEM.md`, and `docs/SCREEN_INVENTORY.md` to reflect the completed Phase 1 landing page.

### Verified
- `pnpm run typecheck`: Passed with 0 TypeScript errors.
- `pnpm run lint`: Passed with 0 ESLint errors and 0 warnings.
- `pnpm run build`: Production build compiled successfully with Turbopack (4/4 static routes generated).
- Smoke test: Production server responded with `HTTP 200 OK` and verified all landing page sections.

---

## [0.1.0] - 2026-10-30

### Added
- **Project Foundation:** Initialized Next.js `16.4.3` application with App Router, Turbopack, and partial prefetching.
- **Runtime & Language:** Configured React `19.3.0` and TypeScript `5.9.3` with `strict: true` compiler rules.
- **Styling Architecture:** Integrated Tailwind CSS `4.3.3` with `@tailwindcss/turbopack`.
- **Package Management:** Configured `pnpm` `11.6.0` with explicit build script approval (`pnpm approve-builds`).
- **Feature-Oriented Architecture:** Established modular structure (`src/features/`, `src/components/`, `src/lib/`, `src/types/`).
- **Documentation Suite:** Authored initial documentation library (`AGENTS.md` and `docs/*`).
