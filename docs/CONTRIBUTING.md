# PulseID — Engineering Contribution Guide

## 1. Introduction

Thank you for contributing to **PulseID**. This guide outlines development practices, workflow standards, and quality gates required for all contributions.

---

## 2. Confirmed Requirements

1. **Package Manager:**
   - Always use `pnpm` (`v11.6.0+`). Never use `npm` or `yarn`.
   - Never commit `package-lock.json` or `yarn.lock`.
2. **Quality Verification Gates:**
   - Every contribution must pass all three baseline checks before merging:
     ```bash
     pnpm run typecheck   # TypeScript compiler check
     pnpm run lint        # ESLint check
     pnpm run build       # Next.js production build
     ```
3. **Component Architecture Rules:**
   - Default to Server Components.
   - Use `'use client'` only on leaf components where interactivity is strictly required.
   - Do not install external dependencies without prior design review.

---

## 3. Proposed Decisions

### Git Workflow & Branch Strategy
- Main branch: `main` (production-ready code).
- Feature branches: `feat/<feature-name>` (e.g., `feat/landing-hero-section`).
- Bug fixes: `fix/<issue-name>` (e.g., `fix/waitlist-validation`).
- Documentation: `docs/<topic>` (e.g., `docs/architecture-update`).

### Commit Message Standards (Conventional Commits)
All commit messages should follow the Conventional Commits specification:
```
<type>(<scope>): <short description>

[optional body]
```
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
- Example: `feat(landing): implement hero countdown section targeting Nov 20 2026`

### Pull Request Checklist
Before submitting a PR for review:
- [ ] Code compiles with `pnpm run typecheck` without warnings or errors.
- [ ] Code passes `pnpm run lint`.
- [ ] Production build succeeds with `pnpm run build`.
- [ ] Responsive design verified on mobile (375px), tablet (768px), and desktop (1280px+).
- [ ] WCAG 2.1 AA accessibility contrast and keyboard navigation verified.
- [ ] Documentation updated if architecture or constants were modified.

---

## 4. Open Questions

1. **Automated CI Enforcement:**
   - Will pre-commit hooks (e.g., simple git hooks or lint-staged) be configured in Phase 2?
2. **Review & Approval Hierarchy:**
   - Does merging to `main` require single or dual peer approval?
