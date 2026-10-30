# PulseID — Project Changelog

All notable changes to the PulseID platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
