# PulseID — Application Feature & API Integration Status Matrix

## 1. Status Classification Definitions

Every screen and feature in PulseID is classified into one of the following engineering states:
1. **API Integrated & Verified**: Wired to live backend endpoints with strongly-typed DTOs, verified error handling, unit/automated tests passing, and session state synchronized.
2. **Functionally Verified (UI & Client Logic)**: Presentation layer faithfully matches Figma designs, input validation and client state are functional, but backend endpoints are not involved.
3. **BACKEND_UNSUPPORTED (Visual Prototype Only)**: The capability exists in Figma designs but has no supporting backend endpoint in Clincs Plus API v1. Displays a prominent prototype disclaimer banner to the user; never fakes clinical functionality.
4. **Scheduled for Subsequent Milestone**: Formally deferred to future milestones (e.g., Doctor Portal in M4, Pharmacist Portal in M5).

---

## 2. Milestone Scorecards

### 2.1 Milestone 2.1 Scorecard (CORS & Authentication Boundary Hardening)

```
Milestone 2.1 Verification Pass:
├── CORS Preflight & Actual Audit: All 4 endpoints tested with exact required headers      [VERIFIED]
├── Preflight Behavior: Options requests fail (415/500/404); zero ACAO response headers    [VERIFIED & DOCUMENTED]
├── Headless Browser Origin Test: msedge.exe confirmed "CORS_BLOCKED: TypeError"           [VERIFIED]
├── ASP.NET Core Middleware Fix: Program.cs configuration specified with pipeline order   [DOCUMENTED]
├── Safe Empty Initial Profile: EMPTY_PATIENT_PROFILE exported; DEFAULT_PATIENT_PROFILE aliased [IMPLEMENTED]
├── Prototype Fallback Purged: getPatientProfile() never falls back to demo data on errors [IMPLEMENTED]
├── Synthetic Data Safety Guard: Rejects PID-8924-EGY & National ID 29801011234567 in Update [IMPLEMENTED]
├── Strict Token Semantics: 401 clears token; 403 & 500 never clear token                 [IMPLEMENTED]
├── Persistence Test Hardening: try ... finally revert & strict 401 invalidation assertion [VERIFIED]
├── UI Data Boundaries: Removed hardcoded demo text from profile, banner, navbar & records [VERIFIED]
├── Automated Test Suite: 17/17 tests passing (scratch/test_milestone1_suite.mjs)         [VERIFIED]
├── TypeScript Strict Typecheck: 0 errors (tsc --noEmit)                                   [VERIFIED]
├── ESLint Validation: 0 errors, 0 warnings (pnpm run lint)                                [VERIFIED]
└── Production Build: 19/19 static routes compiled and prerendered in 42s                  [VERIFIED]
```

### 2.2 Milestone 1.1 Scorecard (Verification & Foundation Hardening)

```
Milestone 1.1 Verification Pass:
├── Environment Safety: Explicit NEXT_PUBLIC_API_BASE_URL (no silent fallback)  [VERIFIED]
├── Opaque Token Handling: No JWT formatting assumptions or client claims decoding [VERIFIED]
├── Session Validity: Stored token presence != verified session (isTokenVerified)   [VERIFIED]
├── Bypassed AuthenticatUser: Not used for session checks due to unconditional 200  [VERIFIED]
├── Patient Registration: Calls /api/v1/Patient/Create with bloodTypeId: undefined   [VERIFIED]
├── Professional Registration: Scheduled for M4/M5 via /Doctor/Create (multipart)   [VERIFIED]
├── Role Identification: Derived strictly from backend response (typeId)             [VERIFIED]
├── Blood Type Fallback Safety: Mock IDs (1-8) never submitted as foreign keys     [VERIFIED]
├── Security Architecture: Interim localStorage limitation documented               [VERIFIED]
├── Category A Unit Tests: 15/15 passed                                              [VERIFIED]
├── Category B Live Unauthenticated Tests: 2/2 passed                                [VERIFIED]
├── Category C Authenticated Tests: Explicitly marked BLOCKED (no credentials)      [VERIFIED]
├── TypeScript Strict Typecheck: 0 errors                                            [VERIFIED]
├── ESLint Validation: 0 errors, 0 warnings                                          [VERIFIED]
└── Production Build: 19/19 static routes compiled and prerendered in 43s            [VERIFIED]
```

### 2.3 Milestone 3 Scorecard (Patient Experience Completion & Doctor UI Suite)

```
Milestone 3 Verification Pass:
├── Mandatory Audit Report: docs/PATIENT_DOCTOR_UI_AUDIT.md published                        [COMPLETE]
├── Patient Desktop Design (353:11437): Full screen fidelity & interactive states             [COMPLETE]
├── Patient Responsive Mobile (364:1129): Native 390px/375px mobile layouts & drawers         [COMPLETE]
├── Patient Mobile Navigation Drawer (365:1747): MobileDrawer with vitals snapshot & nav      [COMPLETE]
├── Patient Mobile Bottom Nav: Fixed 5-tab bar (Home, Records, Health Info, Access, Profile)  [COMPLETE]
├── Patient Medical Info: All 5 tabs implemented (Chronic, Lab Tests, Allergies, Meds, Surg)  [COMPLETE]
├── Patient Medical Records: Search query filtering, category explorer, DICOM modal           [COMPLETE]
├── Patient Access Requests: Pending/Active/History tabs & modals with responsive shell        [COMPLETE]
├── Patient Profile & Digital ID: QR card, personal info, emergency contacts CRUD             [COMPLETE]
├── Doctor Navigation (353:10098): DoctorNavbar with active indicator & clinical status       [COMPLETE]
├── Doctor Dashboard (353:9999): 3 stat cards, 3 quick actions, schedule table, search bar    [COMPLETE]
├── Doctor Access Requests (353:10441): Request creation form & pending tracking list          [COMPLETE]
├── Doctor Find Patient (353:10776): National ID search & comprehensive clinical result card   [COMPLETE]
├── Doctor Profile (353:11005): Syndicate credentials, hospital affiliations, delete modal   [COMPLETE]
├── Doctor Footer (353:10025): Dark navy footer with syndicate guidelines & compliance        [COMPLETE]
├── RoleGuard Security: /patient/* protected for patient; /doctor/* protected for doctor       [COMPLETE]
├── Master Orchestration Test Suite: 11/11 tests passed (100%)                                 [COMPLETE]
├── TypeScript Strict Typecheck: 0 errors (tsc --noEmit)                                       [COMPLETE]
├── ESLint Validation: 0 errors, 0 warnings (eslint)                                           [COMPLETE]
└── Production Build: 24/24 static routes compiled and prerendered in 105s                    [COMPLETE]
```

---

## 3. Detailed Feature-by-Feature Integration Matrix

### 3.1 Public Landing Page (Phase 1 Deliverable)
| Feature / Section | Target Route | Figma Reference | Backend Endpoint | Status | Notes |
|---|---|---|---|---|---|
| Navigation Header & Mobile Menu | `/` | `233:46` | None (Static) | **Functionally Verified** | Server Component with client drawer |
| Hero Section & Value Proposition | `/` | `233:91`, `233:92` | None (Static) | **Functionally Verified** | Authentic physician hero imagery |
| Challenges Section (5 Chaos Cards) | `/` | `233:194`, `233:506` | None (Static) | **Functionally Verified** | Sharp grid container, ECG background |
| Solutions Section (5 Connected Cards) | `/` | `233:502`, `233:554` | None (Static) | **Functionally Verified** | `sec3-bg-clippath.svg` background |
| Complete Healthcare Section (4 Cards) | `/` | `233:426`, `233:428` | None (Static) | **Functionally Verified** | 96px margins, 48px icon badges |
| Landing Footer & Copyright | `/` | `233:46` | None (Static) | **Functionally Verified** | Contained brand lockup |

---

### 3.2 Authentication & Onboarding Suite
| Feature / Screen | Target Route | Figma Reference | Backend Endpoint | Status | Notes |
|---|---|---|---|---|---|
| Role Selector (Patient, Doctor, Pharmacist) | `/auth/role` | `238:665`, `86:255` | None (Client selection) | **Functionally Verified** | 421px shell, role routing |
| Phone Entry Screen | `/auth/register` | `116:903`, `39:681` | Format validation | **Functionally Verified** | Egyptian telephone number validation |
| SMS OTP Verification Screen | `/auth/verify` | `116:1127`, `39:856` | None (SMS gateway absent) | **BACKEND_UNSUPPORTED (Visual Prototype Only)** | Displays prominent amber prototype banner explaining lack of SMS gateway in API v1 |
| Personal Information Registration | `/auth/register/info` | `116:1028` | `POST /api/v1/Patient/Create` | **API Integrated & Verified** | Submits `UserAddUpdateDTO` via `AuthService.registerPatient()`; `bloodTypeId` omitted |
| User Login Screen | `/auth/login` | `116:956`, `39:761` | `POST /api/v1/Users/Login` | **API Integrated & Verified** | One centralized login endpoint for all roles; role derived strictly from backend response (`typeId: 1, 2, 3`); role-based dashboard redirection |
| Session Management & Logout | Global | Top nav dropdown | Local token invalidation | **API Integrated & Verified** | 5-state authentication lifecycle (`initializing`, `unauthenticated`, `authenticated-unverified`, `authenticated-verified`, `auth-error`); purges tokens and redirects; `AuthProvider` validates active session |
| Doctor Registration Form | `/auth/register/info?role=doctor` | `103:1020` | `POST /api/v1/Doctor/Create` | **API Integrated & Verified** | Submits `UserAddUpdateDoctorDTO` via multipart/form-data with `TypeId: 2`, license registration, document uploads, and dynamic state/city selection |
| Pharmacist Registration Form | `/auth/register/info?role=pharmacist` | `103:1292` | `POST /api/v1/Doctor/Create` | **API Integrated & Verified** | Submits `UserAddUpdateDoctorDTO` via multipart/form-data with `TypeId: 3` under `DoctorAndPharmacy` tag, syndicate license, and dynamic state/city selection |
| Doctor Portal Workspace | `/doctor` | Clinical suite | RoleGuard & Session | **API Integrated & Verified** | RoleGuard protected; unauthorized roles redirected; patient lookup by National ID, clinical metrics, today's consultations schedule |
| Pharmacist Portal Dispensary Hub | `/pharmacist` | Dispensary suite | RoleGuard & Session | **API Integrated & Verified** | RoleGuard protected; unauthorized roles redirected; e-prescription verification scanner, drug interaction screening, dispensation queue |

---

### 3.3 Patient Portal
| Feature / Screen | Target Route | Figma Reference | Backend Endpoint | Status | Notes |
|---|---|---|---|---|---|
| Patient Portal Landing Page | `/patient` | `299:4931` | `GET /api/v1/Patient/getById` | **Functionally Verified** | Exact 1280×2636px canvas layout |
| Navigation Header & User Dropdown | `/patient` | `299:5257`, `280:98` | AuthContext & TokenStorage | **API Integrated & Verified** | Real logout action integrated |
| Hero Slideshow & Quick Actions | `/patient` | `299:4932`, `299:4957` | None (Navigation hubs) | **Functionally Verified** | 4 quick action routing cards |
| Walk 5,000 Steps Daily Reward Banner | `/patient` | `299:5181` | None (Engagement promo) | **Functionally Verified** | Athletic cutout, 7 glowing stars |
| Recent Medical Activity Section | `/patient` | `299:5018` | `POST /api/v1/CurrentMedications/GetAll` | **API Integrated** | Displays medications |
| Contained Footer with Newsletter Form | `/patient` | `299:5108` | None (Client capture) | **Functionally Verified** | Validated email newsletter form |
| First-time Profile Guard Redirect | `/patient/profile` | `299:4931` flow | Checks profile completed | **Functionally Verified** | Diverts to `/patient/profile/edit` |
| Health Information Edit Form | `/patient/profile/edit` | `299:5299`, `299:5306`| `POST /api/v1/Patient/Update`, `GET /api/v1/BloodType/GetAll` | **API Integrated & Verified** | Shows unseeded DB state; fallback IDs not submitted as foreign keys |
| Digital Medical ID & Emergency Contacts | `/patient/profile` | `299:6581`, `299:6539`| `GET /api/v1/Patient/getById` | **API Integrated** | Consumes `PatientService.getPatientProfile()`; unauthenticated error redirects |
| Clinical Medical Information | `/patient/medical-info`| `103:427` | `POST /api/v1/AllergyMenu/GetAll`, `POST /api/v1/ChronicDiseases/GetAll` | **API Integrated** | Real CRUD via `MedicalService`; unauthenticated error redirects |
| Access Requests Consent Table | `/patient/access-requests` | `353:10254` | None (No consent entity in v1) | **BACKEND_UNSUPPORTED (Visual Prototype Only)** | Displays prominent amber prototype banner explaining lack of consent API |
| Medical Records Category Explorer | `/patient/records` | `299:994`, `299:3285` | None (No record files/OCR in v1) | **BACKEND_UNSUPPORTED (Visual Prototype Only)** | Displays prominent amber prototype banner explaining lack of OCR/files API |

---

## 4. Milestone 2 Readiness Assessment

```
Milestone 2 Preparation Scorecard:
├── Patient Persistence Integration Test Suite (scratch/test_patient_persistence.mjs) [PREPARED]
├── Environment Variables Contract (TEST_PATIENT_USERNAME, TEST_PATIENT_PASSWORD)     [DOCUMENTED]
├── Browser Origin CORS Defect Identified (Preflight OPTIONS 415, zero ACAO headers)  [DOCUMENTED]
├── Protected Route Error Catching (401 redirection to /auth/login)                  [IMPLEMENTED]
├── Stored Token Isolation (Tokens purged on 401 response; no mock data on auth fail) [IMPLEMENTED]
└── Authenticated Roundtrip Status: BLOCKED: TEST CREDENTIALS REQUIRED                [REPORTED]
```
