# PulseID — Architecture Decision Records (ADR)

This log documents all architectural and technical decisions made for PulseID.

---

## ADR-001: Next.js 16 with App Router and Turbopack

- **Status:** Accepted (Confirmed Requirement)
- **Context:** PulseID requires a modern, production-grade frontend framework supporting high performance, SEO optimization for public launch, and scalable routing for subsequent multi-portal healthcare applications.
- **Decision:** Adopt Next.js `16.4.3` with the App Router architecture and Turbopack build engine.
- **Consequences:**
  - Fast compiler speeds during development and production builds.
  - Native support for React Server Components (RSC) and streaming HTML.
  - Server-side metadata API for search engine and social preview optimization.
  - Consistent layout nesting and error/loading boundary handling.

---

## ADR-002: React 19 and Strict TypeScript

- **Status:** Accepted (Confirmed Requirement)
- **Context:** Healthcare applications demand high type safety to prevent runtime errors, unhandled states, and data type mismatches.
- **Decision:** Use React `19.3.0` paired with TypeScript `5.9.3` with `strict: true` strictly enforced.
- **Consequences:**
  - Zero tolerance for implicit `any`, untyped props, or unchecked null/undefined values.
  - Access to modern React 19 primitives (Actions, `useActionState`, improved async transitions).
  - High developer confidence during multi-developer refactoring.

---

## ADR-003: Tailwind CSS v4 for Utility-First Styling

- **Status:** Accepted (Confirmed Requirement)
- **Context:** Need a styling solution that ensures fast rendering, zero CSS-in-JS runtime overhead, consistent spacing/color tokens, and complete responsiveness.
- **Decision:** Standardize on Tailwind CSS `v4.3.3` with `@tailwindcss/turbopack` and CSS `@theme inline` configuration.
- **Consequences:**
  - Zero runtime footprint — all CSS compiled statically.
  - Native CSS variable-backed design tokens for easy theming and dark mode.
  - No separate `tailwind.config.js` file required; configuration resides in native CSS.

---

## ADR-004: Modular, Feature-Oriented Directory Architecture

- **Status:** Accepted (Confirmed Requirement)
- **Context:** The repository will eventually house distinct medical applications (Patient, Doctor, Pharmacist). A flat directory or traditional technical layer architecture (all components in one folder, all hooks in one folder) creates tight coupling and maintenance bottlenecks.
- **Decision:** Organize code into feature modules (`src/features/{feature_name}`) with shared domain-agnostic primitives in `src/components/ui/` and global configurations in `src/lib/`.
- **Consequences:**
  - Clear boundaries between features.
  - Landing page development (Phase 2) is entirely isolated in `src/features/landing`.
  - Future medical portals can be added independently without refactoring the core directory layout.

---

## ADR-005: pnpm with Explicit Build Script Approvals

- **Status:** Accepted (Confirmed Requirement)
- **Context:** Fast, reproducible, disk-efficient package management with strict dependency isolation is needed to prevent phantom dependency issues and supply-chain vulnerabilities.
- **Decision:** Standardize on `pnpm` (`v11.6.0`). Explicitly approve necessary build dependencies using `pnpm approve-builds`.
- **Consequences:**
  - Deterministic dependency resolution via `pnpm-lock.yaml`.
  - Protection against unreviewed arbitrary postinstall scripts from untrusted packages.

---

## ADR-006: Server Components by Default, Client Leaf Nodes for Interactivity

- **Status:** Accepted (Confirmed Requirement)
- **Context:** Minimizing client-side bundle size is critical for mobile health clients, low-bandwidth environments, and high Core Web Vitals scores.
- **Decision:** All components are React Server Components unless client state, effects, or browser DOM events are strictly required. Interactive elements must be isolated into leaf Client Components (`'use client'`).
- **Consequences:**
  - Optimal initial page load performance and SEO.
  - Zero hydration overhead for static sections.
  - Explicit architectural boundary for client interactivity.

---

## Proposed Decisions Under Review

1. **Waitlist Server Action vs External Webhook:**
   - Proposal: Use a Next.js Server Action in `src/features/landing/actions.ts` to validate email addresses with native Zod/TypeScript schema and dispatch to an external storage webhook.
2. **Iconography Solution:**
   - Proposal: Utilize lightweight, tree-shakable icons (`lucide-react`) when implementing Phase 2 UI primitives.

---

## Open Decisions Requiring Stakeholder Approval

1. **Authentication Architecture:**
   - Identity Provider selection for Phase 7 (Custom OIDC, Auth0, Clerk, or Supabase Auth).
2. **Deployment Infrastructure:**
   - Target production hosting environment (Vercel Enterprise vs Cloud Healthcare PaaS).
