# PulseID — Product Scope Specification

## 1. Executive Summary

**PulseID** is a next-generation healthcare technology platform designed to streamline, secure, and interconnect medical workflows between three core stakeholders: **Patients**, **Doctors**, and **Pharmacists**.

Phase 1 deliverable is the **public launch landing page targeting 20 November 2026**. The public landing page serves as an introduction to PulseID, showcases the team working to bring the platform to life, and features a live real-time launch countdown.

---

## 2. Confirmed Requirements (Landing Page Scope)

1. **Platform Identity:**
   - Name: `PulseID`.
   - Core Positioning: Connected, secure personal healthcare information.
   - Target Launch Date: **20 November 2026** at `00:00:00+02:00` (`Africa/Cairo` timezone).
2. **Page Architecture (Exactly Four Primary Sections):**
   - **Navigation:** Compact bar with custom SVG brand mark, navigation anchors (`#intro`, `#countdown`, `#team`), and launch CTA button scrolling to countdown.
   - **Hero / Introduction:** Eyebrow (`THE FUTURE OF CONNECTED HEALTHCARE`), headline (`Your health. Connected.`), supporting description (`A more connected approach to personal healthcare information.`), launch announcement, and scroll CTA (`COUNTDOWN TO LAUNCH`).
   - **Launch Countdown:** Real-time ticking client component calculating the exact delta to `2026-11-20T00:00:00+02:00`, displaying Days, Hours, Minutes, Seconds with expired state handling and screen reader support.
   - **Meet the Team:** Dedicated team roster populated from centralized typed data (`TEAM_MEMBERS`), supporting portrait/initials placeholders, role, biography, and verified social links.
   - **Footer:** Brand mark, mission statement, verified navigation anchors, and copyright notice.
3. **Explicit Non-Goals (Strictly Excluded):**
   - No login or registration.
   - No patient, doctor, or pharmacist portals or dashboards.
   - No medical records, PHI, or mock health data.
   - No waitlist or email collection forms.
   - No newsletter subscription inputs.
   - No contact or inquiry forms.
   - No fake product demonstrations or simulated UI screens.
   - No unrequested sections.

---

## 3. Implemented Decisions

1. **Neutral Team Data Placeholders:**
   - In accordance with the brief, no real human profiles, fake names, or AI-generated portraits are used.
   - Clean, neutral role placeholders (`Founding Engineer`, `Clinical Informatics Lead`, `Product & Operations Lead`) are utilized with initials-based badges pending official roster announcements.
2. **Temporary Visual Identity:**
   - A custom minimalist SVG logo combining an electrocardiogram pulse rhythm with clinical geometry is deployed across navigation and footer.
   - Clearly documented as a proposed temporary brand mark pending official corporate asset sign-off.
3. **Zero-Backend Requirement:**
   - The landing page is 100% frontend static prerendered with an isolated client leaf for the live countdown timer.

---

## 4. Open Questions & Next Milestones

1. **Official Brand Asset Pack:**
   - High-resolution vector SVGs for the approved PulseID logomark and favicon.
2. **Founding Team Public Roster:**
   - Official biographies, verified LinkedIn/GitHub profiles, and approved headshot photos to replace the role placeholders in `src/features/landing/data/team-members.ts`.
3. **Official Domain & Canonical URL:**
   - The production domain for canonical SEO tag insertion once DNS is delegated.
