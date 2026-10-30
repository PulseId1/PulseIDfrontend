# PulseID — Security & Compliance Architecture

## 1. Security Overview & Healthcare Responsibility

PulseID is designed from the ground up with the understanding that healthcare technology platforms manage mission-critical, highly sensitive personal and clinical data. Although Phases 1 and 2 focus exclusively on the public landing page and project foundation, all design and implementation choices lay the groundwork for strict regulatory compliance.

---

## 2. Confirmed Requirements

1. **Zero Client-Side PHI / PII Storage:**
   - No Protected Health Information (PHI) or Personally Identifiable Information (PII) may be stored in local storage, session storage, or client cookies.
   - Phases 1 and 2 deal purely with public presentation content; no user health data exists.
2. **Deterministic & Audited Dependencies:**
   - All external packages are pinned deterministically in `pnpm-lock.yaml`.
   - Explicit build script authorization required to prevent supply-chain injection attacks.
3. **Strict Type Safety:**
   - Full TypeScript strict mode prevents runtime memory leaks, prototype poisoning, and unhandled property mutations.

---

## 3. Proposed Decisions

### HTTP Security Headers Configuration (Next.js Config)

For production deployment, the following security headers are proposed in `next.config.ts`:

```typescript
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data:;`,
  },
];
```

### Phase 2 Landing Page Waitlist Protection
- **Input Sanitization:** Email inputs sanitized and validated via strict RFC 5322 regex / parser.
- **Rate Limiting:** IP-based submission throttling (e.g., maximum 5 submissions per IP per hour) to mitigate spam and bot abuse.
- **CSRF Protection:** Server Action CSRF tokens automatically enforced by Next.js App Router.

---

## 4. Open Questions

1. **Target Regulatory Jurisdictions:**
   - Does PulseID initially target US healthcare providers (HIPAA / HITECH), European providers (GDPR / EU AI Act / MDR), or Middle Eastern / regional compliance frameworks?
2. **Third-Party Analytics:**
   - Are privacy-first analytics (e.g., Plausible, Fathom, or privacy-preserving telemetry) approved for the Phase 2 launch page, or should it launch without any third-party tracking scripts?
3. **Cookie Consent & Banner:**
   - Is a formal cookie banner required for the Phase 2 launch page (necessary if analytics cookies are utilized)?
