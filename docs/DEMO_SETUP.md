# PulseID — Role-Based Onboarding & End-to-End Demo Architecture Guide

## Branch: `demo/patient-doctor`

This document details the complete end-to-end demonstration environment for **PulseID**, supporting role-based onboarding, authentication, cross-role workflows, and local offline persistence across **Patients**, **Doctors**, and **Pharmacists**.

---

## 1. Executive Summary & Capabilities

The `demo/patient-doctor` branch provides a **complete, realistic application demonstration environment** that replicates the entire user journey:

1. **Role Selection (`/auth/role`)**: Explicit choice between Patient (`typeId: 1`), Pharmacist (`typeId: 3`), and Doctor (`typeId: 2`) strictly following Figma Node `238:665` / `238:668`.
2. **Egyptian Phone Entry (`/auth/register?role=...`)**: Egyptian mobile number validation (`010`, `011`, `012`, `015`), duplicate detection, and international prefix handling.
3. **Simulated OTP Verification (`/auth/verify?role=...`)**: 4-digit verification code with canonical demo OTP `1234` and clear user guidance.
4. **Role-Specific Onboarding & Registration (`/auth/register/info?role=...`)**:
   - **Patient (`typeId: 1`)**: Full personal information, demographics, Egyptian National ID validation (14 digits), emergency contacts, initial health conditions, terms acceptance, and Patient Registration Success Modal.
   - **Doctor (`typeId: 2`)**: Clinician information, medical license number, clinical specialty selection, hospital/clinic affiliation, medical license PDF upload, syndicate card upload, credential verification status, and Clinician Credentialing Success Modal.
   - **Pharmacist (`typeId: 3`)**: Shared phone and OTP verification, followed by an intentional, honest onboarding specification status communicating pending dispensary screen designs and syndicate requirements (zero fake doctor documents).
5. **Dual-Environment Authentication (`/auth/login`)**:
   - **Demo Sandbox (Local Offline)**: Validates against locally persisted demo accounts (initial fixtures + dynamic registrations) with zero network calls.
   - **Live Cloud Run API**: Direct `POST /api/v1/Users/Login` with strict fail-closed security guarantees (zero synthetic token generation or fallback).
6. **Multi-Account State Isolation**: Newly registered patients and doctors maintain their own unique profiles, clinical records, consultation queues, and directory listings, completely separate from default fixtures.
7. **Doctor Patient Lookup & Access Requests**: Doctors can search for newly registered patients by 14-digit National ID and dispatch clinical record access requests.
8. **Automated Verification Suite (`scripts/test-demo-e2e.mjs`)**: 21 automated unit and integration tests verifying all validation, authentication, and cross-role contracts.

---

## 2. Git Branch Architecture & Safety

PulseID maintains strict separation across Git branches:

| Branch | Status | Operational Role |
| :--- | :--- | :--- |
| `main` | **Untouched** | Protected production baseline containing the public countdown landing page. |
| `app` | **Clean & Verified** | Houses the real API-driven frontend implementation committed at `07372e2` (`feat: implement patient and doctor experiences`). Contains NO mock data fallbacks, NO demo authentication shortcuts, and strict fail-closed API services. |
| `demo/patient-doctor` | **Demo Branch** | Branched directly from `07372e2` on `app`. Adds isolated demo authentication, local demo fixtures, role-based onboarding journeys, and the interactive demo control banner. **Never merged into `app` or `main`.** |

---

## 3. How to Run the Demo Locally

### Prerequisites
- Node.js `v20+` (tested on `v24.14.1`)
- pnpm `v11.6+`

### Step-by-Step Execution

```bash
# 1. Ensure you are on the demo branch
git checkout demo/patient-doctor

# 2. Verify dependencies
pnpm install

# 3. Run automated verification suite
node scripts/test-demo-e2e.mjs

# 4. Run TypeScript and ESLint checks
pnpm run typecheck
pnpm run lint

# 5. Start local Next.js development server (Turbopack)
pnpm dev

# 6. Open in browser
# Direct Role Selection: http://localhost:3000/auth/role
# Direct Login:          http://localhost:3000/auth/login
```

---

## 4. Complete End-to-End User Journeys

### Journey 1: Patient Registration & Portal Experience
1. Navigate to `/auth/role` and select **Patient** (`typeId: 1`).
2. Enter an Egyptian mobile number (e.g. `01099887766`).
3. On the OTP screen, enter canonical code `1234`.
4. On the registration form, enter personal details:
   - Name: `Mona Youssef El-Sayed`
   - National ID: `29501010101234`
   - Email: `mona.youssef@test.eg`
   - Password: `Password123!`
   - Medical condition: `Type 1 Diabetes Mellitus`
5. On submit, the **Patient Registration Success Modal** appears.
6. Click **"Launch Patient Portal Directly"** to enter `/patient`.
7. The navbar dynamically displays Mona's initials (`MY`) and name.
8. Updating emergency contacts or profile fields persists in local demo storage.
9. Logging out redirects to `/auth/login`, where Mona can log back in using `01099887766` or `mona.youssef@test.eg`.

### Journey 2: Doctor Registration & Cross-Role Verification
1. Navigate to `/auth/role` and select **Doctor** (`typeId: 2`).
2. Enter phone (e.g. `01233445566`) and verify with OTP `1234`.
3. Complete clinician onboarding:
   - Name: `Dr. Karim Fouad`
   - License: `LIC-EGY-99887`
   - Specialty: `Pediatrics & Neonatology`
   - Hospital: `Kasr Al-Ainy Pediatric Hospital`
   - Upload sample medical license & syndicate card documents.
4. On submit, the **Clinician Credentialing Success Modal** appears.
5. Click **"Enter Doctor Portal Directly"** to enter `/doctor`.
6. Navigate to `/doctor/find-patient`, search `29501010101234`:
   - Mona Youssef's clinical record appears with Verified Citizen badge, emergency contacts, and conditions.
7. Navigate to `/doctor/access-requests`:
   - Enter `29501010101234` and submit an access request.
   - The request table lists `Mona Youssef El-Sayed` with pending status.

### Journey 3: Pharmacist Intentional Specification Notice
1. Navigate to `/auth/role` and select **Pharmacist** (`typeId: 3`).
2. Enter phone and verify with OTP `1234`.
3. The page renders `PharmacistOnboardingState`:
   - Confirms role `typeId: 3` and verified Egyptian phone.
   - Communicates that pharmacy dispensary UI is pending Figma design finalization.
   - Provides clear options to explore Patient or Doctor experiences or return to Role Selection.

---

## 5. Security & Isolation Guarantees

1. **Zero Mock Fallback on Real Auth**: Submitting credentials on the Live Cloud Run API path sends a genuine `POST /api/v1/Users/Login` request. If the backend rejects the request, an honest error is shown. The system **never** silently falls back to demo mode.
2. **Zero Backend Pollution**: Demo registrations, profile edits, emergency contacts, appointments, and access requests are stored strictly in `localStorage` under keys prefixed with `pulseid_demo_*`. No synthetic payloads are ever sent to Cloud Run.
3. **Pristine Reset Guarantee**: Clicking "Reset Demo Data" in the demo banner or calling `DemoService.resetDemoData()` purges all dynamically registered accounts and restores the pristine initial fixtures.

---

## 6. Pre-Configured Baseline Fixtures

- **Sara Mahmoud Ibrahim** (Patient, `typeId: 1`):
  - National ID: `29804120108924`
  - Phone: `01098765432` | Email: `sara.mahmoud@pulseid-demo.eg` | Password: `Password123!`
  - Clinical Conditions: Bronchial Asthma, Allergic Rhinitis, Penicillin Allergy.
- **Dr. Tarek Al-Husseini** (Doctor, `typeId: 2`):
  - National ID: `27508150103456` | License: `EGY-DOC-44821`
  - Phone: `01123456789` | Email: `dr.tarek@pulseid-demo.eg` | Password: `Password123!`
  - Specialty: Consultant Pulmonologist & Critical Care (Kasr Al-Ainy).
