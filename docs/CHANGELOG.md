# PulseID — Project Changelog

All notable changes to the PulseID platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-10-30

### Added
- **Project Foundation:** Initialized Next.js `16.4.3` application with App Router, Turbopack, and partial prefetching support.
- **Runtime & Language:** Configured React `19.3.0` and TypeScript `5.9.3` with `strict: true` compiler rules.
- **Styling Architecture:** Integrated Tailwind CSS `4.3.3` with `@tailwindcss/turbopack` and CSS `@theme inline` configuration.
- **Package Management:** Configured `pnpm` `11.6.0` with explicit build script approval (`pnpm approve-builds`).
- **Feature-Oriented Architecture:** Established modular structure separating routes (`src/app/`), features (`src/features/`), UI primitives (`src/components/`), utilities (`src/lib/`), and types (`src/types/`).
- **Shared Utilities & Constants:** Created `src/lib/constants.ts` with confirmed metadata (Launch target: 20 November 2026, user roles) and zero-dependency `src/lib/utils.ts` (`cn` helper).
- **Core Domain Types:** Created `src/types/index.ts` defining base contracts for navigation and user roles.
- **Documentation Suite:** Authored complete documentation library:
  - `AGENTS.md` (Operational guide for developers and AI agents)
  - `docs/PRODUCT_SCOPE.md` (Product goals, user personas, launch objectives)
  - `docs/ARCHITECTURE.md` (System design, component rules, folder layout)
  - `docs/ROADMAP.md` (8-phase delivery timeline and exit criteria)
  - `docs/DESIGN_SYSTEM.md` (Color tokens, typography, a11y specifications)
  - `docs/SCREEN_INVENTORY.md` (Screen breakdown from landing to medical portals)
  - `docs/DECISIONS.md` (ADR-001 through ADR-006 records)
  - `docs/TESTING.md` (Quality assurance strategy and testing pyramid)
  - `docs/SECURITY.md` (Healthcare security, compliance principles, CSP)
  - `docs/CONTRIBUTING.md` (Contribution workflow, PR checklist, conventional commits)
  - `docs/TECHNICAL_DEBT.md` (Technical debt ledger and deferred items)
  - `docs/CHANGELOG.md` (This changelog)

### Changed
- Refactored `src/app/layout.tsx` to include PulseID metadata title template and description.
- Set `src/app/page.tsx` to a clean Phase 1 foundation status indicator, cleanly separating Phase 1 completion from Phase 2 landing page implementation.

### Verified
- Static type checking: `pnpm run typecheck` passed (0 errors).
- ESLint: `pnpm run lint` passed (0 warnings, 0 errors).
- Production build: `pnpm run build` compiled successfully via Turbopack (0 errors).
