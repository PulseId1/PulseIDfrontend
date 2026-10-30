# PulseID — Screen Inventory & Layout Specification

## 1. Overview

This document catalogs all implemented and planned screens for PulseID. The **Public Launch Landing Page** is fully implemented and live on the root route `/`.

---

## 2. Implemented Screen: Public Launch Landing Page

- **Route:** `/`
- **Page Component:** `src/app/page.tsx`
- **Primary Objective:** Introduce PulseID, present the team working on the platform, and display a live countdown to launch.
- **Target Launch Announcement:** **20 November 2026** (`Africa/Cairo`, `UTC+2`).

### Section Inventory

| Section Identifier | Component | Anchor / ID | Key Functional Elements | Rendering Mode |
| :--- | :--- | :--- | :--- | :--- |
| `SEC-01` | `LandingHeader` | Fixed header | Reusable `PulseLogo`, navigation anchors (`#intro`, `#countdown`, `#team`), launch CTA, responsive mobile drawer | Client Component (leaf state) |
| `SEC-02` | `HeroSection` | `#intro` | Eyebrow badge, headline (*Your health. Connected.*), supporting description, launch date badge, CTA buttons | Server Component |
| `SEC-03` | `CountdownSection` | `#countdown` | Section narrative, live 4-unit countdown grid (`CountdownTimer`), target specifications, expired state handler, aria-live region | Server Component wrapping Client Leaf |
| `SEC-04` | `TeamSection` | `#team` | Section narrative, responsive 3-column team grid, `TeamMemberCard` components, neutral initials avatars, advisory footnote | Server Component |
| `SEC-05` | `LandingFooter` | Footer | `PulseLogo`, brand mission statement, navigation quick-links, legal and copyright notice | Server Component |

---

## 3. Deliberately Excluded Features (Per Brief)

The following components were intentionally excluded from the public landing page to keep the launch focused:
- No login or registration forms.
- No patient, doctor, or pharmacist dashboards.
- No medical records or patient data displays.
- No waitlist or email collection forms.
- No newsletter subscription inputs.
- No contact forms.
- No simulated or fake product demonstrations.

---

## 4. Future Screen Inventory (Architectural Roadmap)

### Patient Application (Phase 2)
- `SCR-PAT-01`: Patient Biometric & Passwordless Authentication.
- `SCR-PAT-02`: Personal Health Dashboard & Vitals Overview.
- `SCR-PAT-03`: Digital Medical ID (Emergency contacts, blood group, allergies, QR code).
- `SCR-PAT-04`: Prescription History & Active Medication Dispense Status.

### Doctor Application (Phase 3)
- `SCR-DOC-01`: Provider Schedule & Clinical Worklist.
- `SCR-DOC-02`: Patient Chart Exploration & Longitudinal Diagnostic Timeline.
- `SCR-DOC-03`: Electronic Prescription (e-Rx) Authoring Station.
- `SCR-DOC-04`: Clinical Encounter Documentation & Notes.

### Pharmacist Application (Phase 4)
- `SCR-PHR-01`: Prescription Intake & Verification Worklist.
- `SCR-PHR-02`: Dispensing Station with Batch & Expiration Verification.
- `SCR-PHR-03`: Real-time Drug-Drug Interaction (DDI) & Allergy Conflict Alert Modal.
- `SCR-PHR-04`: Pharmacy Medication Inventory & Fulfillment Log.
