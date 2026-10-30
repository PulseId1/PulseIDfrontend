# PulseID — Screen Inventory & Layout Specification

## 1. Overview

This document catalogs all confirmed and anticipated screens across PulseID's lifecycle. In adherence to project constraints, **only the Phase 2 Public Landing Page is slated for immediate implementation**, while medical application screens are cataloged for architectural planning.

---

## 2. Confirmed Requirements

1. **Immediate Screen Scope (Phase 2):**
   - **Route:** `/`
   - **Type:** Single-Page Public Launch Landing Page.
   - **Target Date Announcement:** **20 November 2026**.
   - **Primary Goal:** Present the PulseID platform vision, educate visitors on the 3 core roles, provide a countdown, and capture waitlist inquiries.
2. **Medical Application Screens (Deferred to Phases 3–6):**
   - No clinical screens, dashboards, or portals are to be implemented during Phases 1 and 2.

---

## 3. Screen Breakdown

### Screen 1: Public Launch Landing Page (Phase 2 Immediate Deliverable)

| Section Identifier | Section Name | Key Content / Functional Elements | Rendering Mode |
| :--- | :--- | :--- | :--- |
| `SEC-01` | **Navbar** | PulseID brand logo, role navigation anchors, "Join Waitlist" quick-action button | Server Component |
| `SEC-02` | **Hero Section** | High-impact headline, mission tagline, launch date announcement pill, primary CTA | Server Component |
| `SEC-03` | **Launch Countdown** | Dynamic or static time-to-launch counter targeting 20 November 2026 | Client Component (leaf) |
| `SEC-04` | **Role Showcase: Patients** | Focus on Patient Medical ID, personal records security, prescription clarity | Server Component |
| `SEC-05` | **Role Showcase: Doctors** | Clinical record review, streamlined e-Prescribing, diagnostic collaboration | Server Component |
| `SEC-06` | **Role Showcase: Pharmacists** | Rapid prescription verification, dispensing safety, inventory synchronization | Server Component |
| `SEC-07` | **Security & Compliance** | Trust messaging regarding patient data encryption and healthcare compliance | Server Component |
| `SEC-08` | **Waitlist Registration** | Early-access interest form with email validation, role selector, and submit state | Client Component (leaf) |
| `SEC-09` | **Footer** | Copyright, privacy policy link, contact information, disclaimers | Server Component |

---

### Future Screen Inventory (Architectural Preview)

#### Patient Application (Phase 3)
- `SCR-PAT-01`: Patient Authentication & Biometric/MFA Login.
- `SCR-PAT-02`: Personal Health Dashboard (Vitals overview, upcoming appointments).
- `SCR-PAT-03`: Digital Medical ID (Emergency contacts, blood group, allergies, QR code).
- `SCR-PAT-04`: Prescription History & Active Medication Tracker.
- `SCR-PAT-05`: Telehealth & Consultation Booking.

#### Doctor Application (Phase 4)
- `SCR-DOC-01`: Clinical Provider Dashboard (Patient roster, daily appointment queue).
- `SCR-DOC-02`: Comprehensive Patient Chart & Diagnostic Timeline.
- `SCR-DOC-03`: Electronic Prescription (e-Rx) Composer & Dosage Calculator.
- `SCR-DOC-04`: Clinical Notes & Encounter Documentation.

#### Pharmacist Application (Phase 5)
- `SCR-PHR-01`: Prescription Intake & Verification Worklist.
- `SCR-PHR-02`: Dispensing Station & Batch/Expiration Verification.
- `SCR-PHR-03`: Real-time Drug Interaction & Allergy Alert Modal.
- `SCR-PHR-04`: Medication Inventory & Fulfilment Log.

#### Advanced Medical Feature Screens (Phase 6)
- `SCR-ADV-01`: OCR Prescription Digitization Scanner & Correction Interface.
- `SCR-ADV-02`: AI Clinical Diagnostic Assistant & Summary Panel.
- `SCR-ADV-03`: Drug-Drug Interaction Matrix & Contraindication Analyzer.

---

## 4. Proposed Decisions

1. Keep the landing page strictly on a single continuous scrolling route (`/`) using anchor links (`#patients`, `#doctors`, `#pharmacists`, `#waitlist`) to maintain lightning-fast navigation.
2. Structure the landing page code in `src/features/landing/components/` as clean, isolated section components.

---

## 5. Open Questions

1. Should the waitlist form allow selecting multiple roles (e.g., a doctor who is also an individual patient)?
2. Will there be a dedicated "Thank You / Registration Confirmed" page or an inline status toast?
