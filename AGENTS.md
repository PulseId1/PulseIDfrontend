# AGENTS.md — Agent & Developer Operational Guide for PulseID

Welcome to **PulseID**. This repository is configured for collaborative development between human software engineers and AI coding assistants. This document defines ground rules, tech stack constraints, architectural standards, and workflow procedures that all agents must strictly follow.

---

## 1. Project Overview

- **Project Name:** PulseID
- **Domain:** Healthcare Technology Platform
- **Long-term Scope:** Comprehensive platform serving three primary user roles:
  1. Patients
  2. Doctors
  3. Pharmacists
- **Immediate Milestone:** Public one-page launch landing page targeting **20 November 2026** (COMPLETED).
- **Current Phase:** Phase 1 (Foundation & Public Launch Landing Page) completed. Awaiting user authorization for subsequent portal phases.

---

## 2. Technology Stack & Tooling

| Layer | Technology | Version | Notes |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.4.3` | Turbo-enabled, Cache Components, Partial Prefetching |
| **Runtime / Library** | React / React DOM | `19.3.0` | React Server Components by default |
| **Language** | TypeScript | `5.9.3` | `strict: true` enabled in `tsconfig.json` |
| **Styling** | Tailwind CSS | `4.3.3` | Native CSS `@theme inline`, zero runtime |
| **CSS Turbopack** | `@tailwindcss/turbopack` | `4.3.3` | Optimized build-time loader |
| **Linter** | ESLint | `9.39.5` | Configured with `eslint-config-next 16.4.3` |
| **Package Manager**| pnpm | `11.6.0` | Explicit approved build scripts policy |

---

## 3. Strict Operating Constraints for Agents

1. **Do NOT implement medical application screens yet.**
   - No patient, doctor, or pharmacist dashboards or portals may be built until scheduled roadmap phases.
2. **Do NOT implement the landing page until user approval is given.**
   - The root page currently contains a minimal foundation status indicator. Keep it until Phase 2 is greenlit.
3. **Do NOT introduce backends, databases, or mock APIs in early phases.**
   - PulseID is purely frontend-focused during Phases 1 and 2.
4. **Do NOT add unnecessary dependencies.**
   - Do not install helper libraries (e.g., lodash, axios, moment, heavy component UI kits) unless explicitly approved.
5. **Do NOT invent brand assets, team rosters, or unconfirmed clinical claims.**
   - Rely strictly on confirmed facts and constants defined in `src/lib/constants.ts`.
6. **Server Components by default.**
   - Every component is a Server Component unless interactive event listeners (`onClick`, `onChange`), browser APIs, or React client hooks (`useState`, `useEffect`) are strictly necessary. In that case, add `'use client'` at the top of the specific leaf component.

---

## 4. Repository Structure & Conventions

```
PulseID/
├── docs/                      # Architectural, regulatory & project documentation
├── public/                    # Static public assets (SVGs, icons)
├── src/
│   ├── app/                   # Next.js App Router (layouts, route pages)
│   ├── components/            # Reusable domain-agnostic UI primitives
│   │   └── ui/                # Atomic UI building blocks (Button, Card, etc.)
│   ├── features/              # Feature-oriented modules (encapsulated)
│   │   ├── landing/           # Landing page components & sections (Phase 2)
│   │   ├── patient/           # Reserved for Phase 3
│   │   ├── doctor/            # Reserved for Phase 4
│   │   └── pharmacist/        # Reserved for Phase 5
│   ├── lib/                   # Project constants, helpers, and utilities
│   │   ├── constants.ts       # Global immutable constants (launch date, app name)
│   │   └── utils.ts           # Shared utilities (e.g., cn helper)
│   └── types/                 # Shared TypeScript interfaces & types
│       └── index.ts           # Central type contracts
├── .gitignore                 # Standard git exclusions
├── AGENTS.md                  # This document
├── eslint.config.mjs          # Flat ESLint configuration
├── next.config.ts             # Next.js compiler & turbopack configuration
├── package.json               # Package manifests & scripts
├── pnpm-lock.yaml             # Pnpm deterministic lockfile
└── tsconfig.json              # Strict TypeScript compiler options
```

---

## 5. Development Workflows & Commands

All commands must be executed using `pnpm`.

```bash
# Start local development server (with Turbopack)
pnpm dev

# Run TypeScript compiler check (zero emit)
pnpm run typecheck

# Run ESLint validation
pnpm run lint

# Compile production build
pnpm run build

# Start production server
pnpm start
```

---

## 6. Project Status Classification

### Confirmed Requirements
- Next.js 16.4.3 App Router frontend setup.
- Strict TypeScript configuration.
- Tailwind CSS v4 styling.
- Feature-driven modular layout.
- One-page public launch landing page targeting 20 November 2026 as the immediate deliverable.
- Medical features (Patient, Doctor, Pharmacist) deferred to subsequent phases.

### Proposed Decisions
- Atomic UI primitives in `src/components/ui/` with zero heavy component libraries.
- Form submissions on landing page handled via lightweight Server Actions or static waitlist endpoint.

### Open Questions
- Specific visual identity (brand palette, typography, official logo SVG).
- Target email capture / waitlist service integration.


<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
