# PulseID — System Architecture Specification

## 1. Architectural Philosophy

PulseID is engineered around a **modular, feature-oriented frontend architecture** optimized for scalability, maintainability, and zero unnecessary complexity. 

The architecture strictly adheres to:
- **Server Components by default:** Render on the server for maximum performance, minimal client bundle size, and optimal SEO.
- **Client Components on demand:** Reserved exclusively for interactive leaf components requiring browser events or DOM state (`'use client'`).
- **Pragmatic SOLID principles:** High cohesion within feature boundaries, single responsibility per module, and explicit data contracts.
- **YAGNI & Zero Overengineering:** Avoid premature abstractions, gratuitous interfaces, speculative micro-frontends, or unnecessary third-party runtime dependencies.

---

## 2. Confirmed Requirements

1. **Framework & Engine:**
   - Next.js `16.4.3` utilizing the App Router (`src/app/`).
   - React `19.3.0` with React Server Components (RSC) and React Compiler compatibility.
   - TypeScript `5.9.3` with strict mode (`strict: true`) strictly enforced.
   - Tailwind CSS `4.3.3` with native `@theme inline` styling and `@tailwindcss/turbopack`.
   - pnpm `11.6.0` package manager.
2. **Structural Separation:**
   - Clear separation between:
     - **Routes & Pages:** `src/app/`
     - **Feature Modules:** `src/features/`
     - **Shared Components:** `src/components/`
     - **Core Utilities & Constants:** `src/lib/`
     - **Domain Type Contracts:** `src/types/`
3. **Medical Multi-Role Extensibility:**
   - The directory layout must support future additions of the Patient, Doctor, and Pharmacist portals without requiring upfront implementation or boilerplate bloat.

---

## 3. Directory Layout & Module Structure

```
src/
├── app/                        # App Router: Routing, layouts, metadata & loading boundaries
│   ├── favicon.ico
│   ├── globals.css             # Tailwind v4 import & CSS custom properties
│   ├── layout.tsx              # Root HTML wrapper with font loading & base metadata
│   └── page.tsx                # Entry point (currently minimal Phase 1 confirmation)
├── components/                 # Shared, domain-agnostic UI primitives
│   └── ui/                     # Primitives (e.g., Button, Card, Badge, Input)
├── features/                   # Feature-sliced modules (independent domain logic)
│   ├── landing/                # Public Launch Landing Page (Phase 2)
│   │   └── components/         # Landing-specific sections (Hero, Countdown, Waitlist)
│   ├── patient/                # Patient Portal (Phase 3 reserved)
│   ├── doctor/                 # Doctor Portal (Phase 4 reserved)
│   └── pharmacist/             # Pharmacist Portal (Phase 5 reserved)
├── lib/                        # Cross-cutting utilities, configs & immutable constants
│   ├── constants.ts            # Project-wide metadata, launch dates, roles
│   └── utils.ts                # Zero-dependency utilities (e.g., cn helper)
└── types/                      # Shared TypeScript definitions
    └── index.ts                # Core types and interfaces
```

---

## 4. Component Architecture Guidelines

### Server vs. Client Boundary Rules
- **Server Components (Default):**
  - Section layouts, static informational blocks, text typography, headers, footers, countdown targets, and initial data presentation.
  - No client-side JavaScript sent to the browser for these components.
- **Client Components (`'use client'`):**
  - Only leaf nodes requiring interactivity (e.g., interactive waitlist submission form, client-side time countdown tick, interactive navigation toggle).
  - Must never wrap entire pages in `'use client'`.

### Dependency Management Policy
- Native standard library before external packages.
- Zero dependencies added for operations natively supported by modern browsers and ES2022+ (e.g., native fetch, date calculations, class filtering).

---

## 5. Proposed Decisions

1. **Routing Strategy for Future Medical Applications:**
   - Use Next.js route groups `(public)`, `(patient)`, `(doctor)`, `(pharmacist)` when expanding beyond the landing page.
   - Keep root `/` mapped to the public landing page for Phase 2.
2. **State Management Strategy:**
   - Phase 2 landing page requires zero global state management (no Redux, Zustand, or Jotai needed).
   - Form state handled via React 19 `useActionState` or standard unmanaged inputs.
   - Future application state will evaluate lightweight store solutions when medical data flows are introduced.

---

## 6. Open Questions

1. **API Integration Strategy for Phase 7:**
   - Will the backend be a separate REST/GraphQL service (e.g., Go/NestJS/FastAPI), or Next.js Route Handlers / Server Actions with direct database drivers?
2. **Component Library Decision:**
   - Should future UI primitives be built directly with Tailwind CSS v4, or utilize headless primitives (e.g., Radix UI / shadcn patterns) for complex accessibility requirements (dialogs, tooltips, comboboxes)?
