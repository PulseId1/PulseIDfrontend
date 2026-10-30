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
2. **Page Architecture (Focused 2-Section Launch Experience):**
   - **Section A — Launch Countdown (Dominant Viewport):**
     - Minimal top PulseID logo.
     - Announcement eyebrow: `A NEW ERA OF CONNECTED HEALTHCARE`.
     - Main headline: `Something meaningful is coming.`.
     - Short supporting sentence: `A more connected approach to personal healthcare information.`.
     - **Interactive Mascot Face (`MascotFace`):** Smooth white capsule mascot looking directly down at the countdown timer, with pupils dynamically tracking mouse cursor position using spring physics (`useSpring`), random natural eye blinking, speech interaction, and integrated PulseID chin emblem (`public/logo.svg`).
     - **Dominant Countdown Timer:** Real-time ticking client component calculating delta to `2026-11-20T00:00:00+02:00` in `Africa/Cairo` (UTC+2) timezone, displaying Days, Hours, Minutes, Seconds with live `aria-live` accessibility and expired state handling.
     - Scroll invitation anchor: `Discover the team` pointing to `#team`.
   - **Section B — Meet the Team (ID Credential Badges):**
     - Themed as official **PulseID Access Badges** inspired by physical security badges (lanyard notch, category tags, corner reticles, initials badge, and digital barcode).
     - 4 interactive category tabs with animated indicator: `01. Technology & Engineering (5)`, `02. Pharmaceutical (1)`, `03. Clinical & Research (7)`, `04. Marketing (1)`.
     - Confirmed 14 team members with official LinkedIn profiles integrated for the Tech team.
   - **Minimal Footer:** Single-line copyright and launch date notice.
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

1. **Confirmed Founding Team Roster:**
   - 14 confirmed team members organized across 4 disciplines (`Technology & Engineering`, `Pharmaceutical`, `Clinical & Research`, `Marketing`).
   - Official professional roles and direct verified LinkedIn profile links integrated for all Tech Team members (`Ahmed Mohamed Albelasy`, `Mostafa Hussein`, `Mohamed Mahrous`, `Mohamed Mostafa Badr`, `Abdelrahman Ataa`).
2. **Interactive Mascot Companion:**
   - An interactive white capsule mascot looking down at the countdown counter, tracking cursor coordinates across the screen with spring-physics pupils and incorporating the PulseID SVG logo.
3. **PulseID Holographic ID Badge System:**
   - Visual presentation elevated to physical security ID badges with lanyard slots, tech reticles, and digital barcodes.
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
