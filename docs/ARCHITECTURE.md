# PulseID — System Architecture Specification

## 1. Architectural Philosophy

PulseID is engineered around a **modular, feature-oriented frontend architecture** optimized for scalability, maintainability, and zero unnecessary runtime complexity.

Key architectural pillars:
- **Server Components by default:** Sections, static copy, headings, and layouts are React Server Components rendered at build time with zero client JavaScript payload.
- **Strict Client Leaf Isolation:** Client state (`'use client'`) is restricted exclusively to interactive leaves:
  1. `CountdownTimer`: Live 1-second interval timer using React 19's `useSyncExternalStore` to prevent hydration mismatches and cascading re-renders.
  2. `LandingHeader`: Mobile drawer state toggle.
- **Feature-Sliced Encapsulation:** All landing page domain code resides in `src/features/landing/`, completely isolating Phase 1 from future medical portal modules.
- **Zero Overengineering:** Native CSS `@theme inline` tokens, standard SVG icons, and typed data files with zero external state management or animation bloat.

---

## 2. Implemented Component Organization

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css                       # Centralized theme tokens & custom scrollbar
│   ├── layout.tsx                        # Root layout, Geist typography & Open Graph SEO
│   └── page.tsx                          # Server Component composition of landing page
├── components/
│   └── ui/
│       ├── icons.tsx                     # Zero-dependency SVG icons (LinkedIn, GitHub)
│       └── logo.tsx                      # Reusable PulseLogo component (temporary brand mark)
├── features/
│   ├── landing/                          # Phase 1 Public Launch Landing Page
│   │   ├── components/
│   │   │   ├── countdown-section.tsx     # Server Component section wrapper
│   │   │   ├── countdown-timer.tsx       # Isolated Client Component timer
│   │   │   ├── hero-section.tsx          # Server Component hero introduction
│   │   │   ├── landing-footer.tsx        # Server Component footer
│   │   │   ├── landing-header.tsx        # Client Component navigation bar with mobile menu
│   │   │   ├── team-member-card.tsx      # Reusable member card with conditional socials
│   │   │   └── team-section.tsx          # Responsive team grid section
│   │   ├── data/
│   │   │   └── team-members.ts           # Centralized typed team roster data
│   │   ├── types/
│   │   │   └── team-member.ts            # TeamMember and TeamMemberSocials contracts
│   │   └── index.ts                      # Barrel export for landing feature
│   ├── doctor/                           # Reserved for Phase 4
│   ├── patient/                          # Reserved for Phase 3
│   └── pharmacist/                       # Reserved for Phase 5
├── lib/
│   ├── constants.ts                      # Immutable constants (dates, ISO, color tokens, links)
│   └── utils.ts                          # Lightweight cn utility
└── types/
    └── index.ts                          # Shared core type definitions
```

---

## 3. Countdown Architecture & Timezone Handling

- **Target Timestamp:** `2026-11-20T00:00:00+02:00` (`Africa/Cairo`, UTC+2).
- **Time Calculation:** `diffMs = targetTimestamp - Date.now()`.
- **Hydration Safe Pattern:** Utilizes `useSyncExternalStore` with:
  - `serverSnapshot`: Initialized to empty/zero state for deterministic server rendering.
  - `calculateTimeRemaining`: Client snapshot calculating exact remaining Days, Hours, Minutes, Seconds.
  - `subscribeTimer`: Attaches a single 1000ms `window.setInterval` and cleans it up on component unmount.
- **Accessibility:** An isolated live region (`aria-live="polite"`) delivers regular screen reader updates without visual disruption.
- **Expired State:** When `diffMs <= 0`, the component transitions to an active rollout banner.

---

## 4. Team Data Architecture

- Data is stored in `src/features/landing/data/team-members.ts` adhering to the `TeamMember` interface.
- To update the team roster, developers only update `team-members.ts` without touching `team-member-card.tsx` or `team-section.tsx`.
- Missing photos fall back to neutral, initials-based typographic avatars with styled gradients.
- Social links render conditionally — missing links produce zero broken UI elements.

---

## 5. Technology Stack Summary

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `16.4.3` | App Router, Turbopack, Prerendering |
| **React** | `19.3.0` | React Server Components & `useSyncExternalStore` |
| **TypeScript** | `5.9.3` | Strict type validation (`strict: true`) |
| **Tailwind CSS** | `4.3.3` | Native CSS variable theme tokens |
| **lucide-react** | `1.64.0` | Approved iconography (Clock, ArrowDown, Calendar, Menu, X, Globe) |
| **pnpm** | `11.6.0` | Deterministic package management |
