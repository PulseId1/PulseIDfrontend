# PulseID — Technical Debt & Deferred Work Ledger

## 1. Overview & Policy

This document provides a transparent, auditable record of all known technical debt, temporary configurations, and deferred decisions in PulseID. Tracking technical shortcuts prevents architecture decay and ensures high code health across all roadmap phases.

---

## 2. Confirmed Requirements

1. **Explicit Tracking:**
   - Every shortcut, deferred optimization, or temporary mock must be logged in this ledger with rationale, impact, and target resolution phase.
2. **Zero Hidden Bloat:**
   - No temporary dependencies may be silently abandoned in `package.json`.

---

## 3. Current Technical Debt Ledger

### Item 1: ESLint v9 Deprecation Warning
- **Status:** Monitored
- **Context:** `create-next-app` installed ESLint `9.39.5` with `eslint-config-next 16.4.3`. ESLint outputs an informational warning that v9 will reach end-of-life and v10 is available.
- **Rationale:** `eslint-config-next` 16.4.3 is peer-dependent on ESLint 9 flat configs. Forcing ESLint 10 prematurely causes peer dependency conflicts in Next.js flat config presets.
- **Resolution Plan:** Upgrade to ESLint 10 when Next.js releases an officially validated `eslint-config-next` update.
- **Target Phase:** Phase 2 / Phase 8.

### Item 2: Native Class Names Helper (`cn`)
- **Status:** Accepted by Design
- **Context:** In `src/lib/utils.ts`, a lightweight `cn(...classes)` function using native array filtering was implemented instead of adding `clsx` and `tailwind-merge`.
- **Rationale:** YAGNI constraint. For simple landing page layouts and atomic UI primitives, class collisions are avoided by design. Installing two external dependencies with hundreds of lines of code is unnecessary overhead at this stage.
- **Resolution Plan:** Evaluate whether `tailwind-merge` is needed only when advanced dynamic variant overrides arise in complex medical dashboard components (Phase 3).
- **Target Phase:** Phase 3.

### Item 3: Root Page Placeholder
- **Status:** Temporary
- **Context:** `src/app/page.tsx` currently contains a minimal status confirmation page rather than the full public landing page.
- **Rationale:** Strict project constraint: *"Do not implement the landing page yet. Stop after completing the foundation. Wait for my approval before implementing the landing page."*
- **Resolution Plan:** Replace placeholder with full modular landing page once the user approves Phase 2 execution.
- **Target Phase:** Phase 2.

### Item 4: Single-Package Setup vs. Monorepo
- **Status:** Deferred
- **Context:** PulseID is currently structured as a clean single Next.js project.
- **Rationale:** Monorepos (Turborepo/Nx) introduce significant initial configuration overhead. Current scope is purely frontend web.
- **Resolution Plan:** Re-evaluate monorepo architecture if mobile applications (iOS/Android via React Native) or standalone microservice backends are added in Phase 7.
- **Target Phase:** Phase 7.

---

## 4. Open Questions

1. Should automated technical debt auditing (e.g., SonarQube, Knip for unused code) be introduced in Phase 8?

