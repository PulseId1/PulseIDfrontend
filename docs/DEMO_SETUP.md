# PulseID — Patient & Doctor Demo Setup & Architecture Guide

## Branch: `demo/patient-doctor`

This document outlines the setup, architecture, operational procedures, and testing flows for the isolated **PulseID Patient & Doctor Demonstration Environment**.

---

## 1. Executive Summary & Purpose

The `demo/patient-doctor` branch provides a **complete, interactive, and offline-capable demonstration** of the verified Figma Patient and Doctor experiences.

While backend authentication and certain endpoints (e.g., electronic access requests, EHR appointment scheduling, DICOM upload endpoints) are pending backend team deployment, this demo branch allows stakeholders, software engineers, and product designers to explore the entire UI journey with **zero backend dependencies**, **zero synthetic data pollution of production**, and **strict fail-closed security guarantees**.

---

## 2. Git Branch Isolation Guarantee

PulseID maintains strict separation across Git branches:

| Branch | Status | Operational Role |
| :--- | :--- | :--- |
| `main` | **Untouched** | Protected production baseline. |
| `app` | **Clean & Verified** | Houses the real API-driven frontend implementation committed at `07372e2` (`feat: implement patient and doctor experiences`). Contains NO mock data fallbacks, NO demo authentication shortcuts, and strict fail-closed API services. |
| `demo/patient-doctor` | **Demo Branch** | Branched directly from `07372e2` on `app`. Adds isolated demo authentication, local demo fixtures, and the interactive demo control banner. **Never merged into `app` or `main`.** |

---

## 3. How to Run the Demo Locally

### Prerequisites
- Node.js `v20+`
- pnpm `v11.6+`

### Step-by-Step Execution

```bash
# 1. Ensure you are on the demo branch
git checkout demo/patient-doctor

# 2. Verify dependencies
pnpm install

# 3. Start local Next.js development server (Turbopack)
pnpm dev

# 4. Open in browser
# Navigate to: http://localhost:3000/auth/login
```

---

## 4. Dual-Path Authentication Architecture

The login screen (`/auth/login`) features two distinctly partitioned options:

```
+-------------------------------------------------------------------------+
|                                                                         |
|  [ Option A: Real Backend Login ]                                       |
|  - Phone / Email toggle                                                 |
|  - Real password entry                                                  |
|  - Submits to POST /api/v1/Users/Login on live Cloud Run API            |
|  - Requires valid backend database credentials                          |
|  - Fails closed: Invalid credentials display real backend error         |
|  - NEVER automatically falls back to demo mode                          |
|                                                                         |
|-------------------------------------------------------------------------|
|                                                                         |
|  [ Option B: Explore in Demo Mode ] (Isolated Offline Prototype)        |
|  * Amber DEMO MODE badge with zero network requests                     |
|                                                                         |
|  +---------------------------------+ +--------------------------------+ |
|  | [1] Explore as Patient          | | [2] Explore as Doctor          | |
|  | Sara Mahmoud Ibrahim            | | Dr. Tarek Al-Husseini          | |
|  | Chronic asthma, allergies,      | | Pulmonology consultant, 6-pt   | |
|  | prescriptions, lab & radiology  | | queue, directory search,       | |
|  | records, health rewards.        | | access dispatch.               | |
|  +---------------------------------+ +--------------------------------+ |
|                                                                         |
+-------------------------------------------------------------------------+
```

### Security & Isolation Guarantees:
1. **Zero Mock Fallback on Real Auth**: Attempting to sign in via Option A with invalid credentials returns a genuine API rejection (`"Invalid username or password."`). It will **never** silently fall back to demo mode.
2. **Fail-Closed Header Protection**: In demo mode, `TokenStorage.get()` returns `null`. The application never sends an `Authorization: Bearer` header with fake tokens to the real API.
3. **Dedicated Session Storage**: Demo sessions are tracked in `pulseid_demo_session`. When a real login occurs, `pulseid_demo_session` is purged.

---

## 5. Pre-Configured Demo Healthcare Fixtures

All demo data is realistic, clinically consistent, and localized to Egypt's healthcare system, while being **entirely fictional**:

### A. Demo Patient — Sara Mahmoud Ibrahim
- **National ID**: `29804120108924` (14-digit Egyptian National ID format: Born 12 Apr 1998 in Cairo)
- **PulseID Patient ID**: `PT-DEMO-2026-01`
- **Demographics**: 28 years old, Female, Blood Group `A+ (Positive)`
- **Chronic Conditions**:
  - *Bronchial Asthma* (Diagnosed 2018; moderate persistent; controlled with combination inhaler).
  - *Seasonal Allergic Rhinitis* (Diagnosed 2020; spring pollen & dust triggers).
- **Allergies**:
  - *Penicillin (Amoxicillin/Ampicillin)*: Severe (Anaphylaxis & generalized urticaria).
  - *Aspirin & NSAIDs*: Moderate (Bronchospasm & facial angioedema).
  - *Tree Nuts & Hazelnuts*: Mild (Oral pruritus).
- **Active Medications**:
  - *Symbicort Turbuhaler 160/4.5mcg* (1 inhalation every 12 hours).
  - *Ventolin Inhaler 100mcg* (1-2 puffs PRN for acute bronchospasm).
  - *Claritin 10mg* (Daily during seasonal flare-ups).
- **Medical Records**:
  - *Complete Blood Count (CBC) & Total IgE Panel* (Al Mokhtabar Medical Labs, New Cairo).
  - *Pulmonary Function Test (Spirometry)* (Cairo Chest Diagnostics — FEV1 reversibility +14%).
  - *Digital Chest Radiograph (PA & Lateral)* (Misr Radiology Scan Center, Tagamoa).
  - *Skin Prick Allergy Test (24 Aeroallergens)* (Egyptian Allergy & Immunology Research Institute).
- **Emergency Contacts**:
  - Mahmoud Ibrahim (Father) — `01001234567`
  - Nour Mahmoud (Sister) — `01123456789`

### B. Demo Doctor — Dr. Tarek Al-Husseini
- **Syndicate ID / License**: `#EG-MED-491028` (Active license through Dec 2028)
- **Title**: MD, FCCP — Senior Consultant Pulmonologist & Respiratory Specialist
- **Fellowship**: Fellow of the American College of Chest Physicians (FCCP)
- **National ID**: `28405160109988`
- **Affiliations**:
  - *Academic Hospital*: Kasr Al Ainy University Hospital, Cairo University (Pulmonology & Bronchoscopy Suite).
  - *Private Clinic*: New Cairo Chest & Allergy Clinic (Medical Park Premier, North 90th St, New Cairo).
- **Today's Consultation Schedule (Interactive Queue)**:
  1. *Sara Mahmoud Ibrahim* (`29804120108924`): Bronchial Asthma Follow-up & Spirometry. Status: `Checked In` (Access Granted).
  2. *Ahmed Hassan* (`28809140102345`): Severe Chronic Cough & Post-COVID Evaluation. Status: `Checked In` (Access Granted).
  3. *Mariam Adel* (`29204150109876`): COPD Telemetry & Oxygen Saturation Review. Status: `In Progress` (Access Granted).
  4. *Omar Farouk* (`27911220104321`): Post-Pneumonia Radiologic Follow-up. Status: `Scheduled` (Access Required).
  5. *Fatima Mahmoud* (`29506180108765`): Pre-operative Pulmonary Clearance. Status: `Completed` (Access Granted).
  6. *Ahmed Mostafa Fawzy* (`28206250102288`): Obstructive Sleep Apnea (OSA) Review. Status: `Scheduled` (Access Granted).

---

## 6. Interactive Demo Features & State Management

The demo environment provides full client-side state manipulation without touching backend databases:

1. **Persistent Demo Mode Banner (`DemoModeBanner`)**:
   - Docks persistently at the top of all Patient and Doctor pages (`sticky top-0 z-[100]`).
   - Displays the active role and demo user name.
   - **Switch to Doctor / Switch to Patient**: 1-click role toggle immediately switching portals.
   - **Reset Demo Data**: Restores all profiles, appointments, records, and access requests back to pristine initial fixtures.
   - **Exit Demo**: Ends the demo session and redirects back to `/auth/login`.
2. **Interactive Consultation Queue**:
   - On `/doctor`, clicking any appointment status pill cycles through `Scheduled` → `Checked In` → `In Progress` → `Completed`.
   - Real-time KPI counters (`Patients Today`, `Completed`, `Pending`) update dynamically.
3. **Interactive Patient Directory Search**:
   - On `/doctor/find-patient`, search `29804120108924` or click the **Sara Mahmoud** chip to inspect Sara's full clinical records, vitals, asthma history, and penicillin allergy alert.
4. **Access Request Dispatch & Approval**:
   - On `/doctor/access-requests`, submitting an access request for `29804120108924` saves it to demo storage.
   - Switching to `/patient/access-requests` allows the patient to approve or reject the request.
5. **Interactive Medical Info & Profile Editing**:
   - In `/patient/medical-info`, adding a new condition, allergy, or medication persists in local demo storage.
   - In `/patient/profile`, adding or deleting emergency contacts persists in local demo storage.

---

## 7. Quality Checks & Verification Status

The `demo/patient-doctor` branch passes all build and lint verifications:

```bash
# 1. Strict TypeScript check (0 errors)
pnpm run typecheck

# 2. Strict ESLint check (0 errors, 0 warnings)
pnpm run lint

# 3. Next.js App Router Turbopack production build (24/24 static routes generated)
pnpm run build
```

---

## 8. Summary of Files Changed on Demo Branch

- `src/lib/demo/demo-data.ts`: Fictional Egyptian healthcare data fixtures.
- `src/lib/demo/demo-service.ts`: LocalStorage-backed demo service (`pulseid_demo_*`) with full CRUD and reset functionality.
- `src/lib/auth/auth-context.tsx`: Added `authMode`, `isDemo`, and `loginDemo()` with strict isolation from real authentication.
- `src/components/demo/DemoModeBanner.tsx`: Persistent, responsive amber demo mode control panel.
- `src/components/auth/role-guard.tsx`: Mounted `<DemoModeBanner />` across protected dashboards.
- `src/features/auth/components/LoginForm.tsx`: Added Option B ("Explore in Demo Mode") with Patient and Doctor cards.
- `src/app/patient/*`: Connected demo patient profile, medical info, records, and access requests.
- `src/app/doctor/*`: Connected demo doctor profile, consultation queue, directory search, and permissions.
- `docs/DEMO_SETUP.md`: This architecture and operational guide.
