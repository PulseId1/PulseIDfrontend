# PulseID — Backend API Specification & Integration Contract

## 1. Executive Summary & Specification Source of Truth

- **Backend Title:** Clincs Plus API V1
- **API Version:** `v1` (OpenAPI 3.0.1)
- **Base URL:** Defined via `NEXT_PUBLIC_API_BASE_URL` (e.g., `https://pulseid-api-566271518532.europe-west1.run.app`)
- **Environment Safety:** **Strictly required.** The silent fallback to production has been eliminated. The application fails fast with a configuration error if `NEXT_PUBLIC_API_BASE_URL` is omitted.
- **Swagger UI:** `https://pulseid-api-566271518532.europe-west1.run.app/swagger/index.html`
- **OpenAPI 3.0 JSON:** `https://pulseid-api-566271518532.europe-west1.run.app/swagger/v1/swagger.json`
- **Security Scheme:** Bearer Token via `Authorization` header (`Bearer <token>`).
- **Language Localization:** Supported across all endpoints via `lang` request header (`en` | `ar`).

---

## 2. Centralized API Client (`src/lib/api/client.ts`)

All HTTP communication with the backend is strictly channeled through the singleton `apiClient` instance of `ApiClient`. Direct `fetch()` calls inside UI components are forbidden.

### 2.1 Request Headers & Standards
- `lang`: Injected automatically (defaults to `en`, configurable per request via options).
- `Authorization: Bearer <token>`: Injected automatically by checking `TokenStorage.get()`. Omitted when `skipAuth: true` or when token is absent.
- `Content-Type: application/json`: Injected automatically for JSON request bodies.
- `FormData` / Multipart: Content-Type is **never** set manually, allowing the browser/runtime to configure boundary headers correctly.
- Timeout & Cancellation: Default timeout of 15,000ms managed via `AbortController` and `AbortSignal`.

### 2.2 Token Management (`TokenStorage`) & Session Verification
- **Key:** `pulseid_auth_token` (User ID: `pulseid_auth_user_id`, Role: `pulseid_auth_role`).
- **Opaque Token Guarantee:** The backend token is treated as completely opaque. No assumptions are made regarding token structure (JWT, GUID, hex, or opaque session string). Tokens are never decoded client-side or rejected for failing JWT formatting checks.
- **Legacy Simulation Purging:** Legacy simulation tokens (`pulseid_jwt_demo_`, `pulseid_jwt_offline_`, `pulseid_token_local_`, `mock_jwt_token_`, `pulseid_token_`, `demo`, `offline`) are detected and purged on sight.
- **Token Presence != Session Validity:** Stored token presence in `localStorage` is **never** treated as proof of a valid backend session. Restored sessions are marked `isTokenVerified: false` until an authentic backend response succeeds.
- **Unreliable `AuthenticatUser` Endpoint:** `/api/Patient/AuthenticatUser` and `/api/Users/AuthenticatUser` are **not** used for session validation because they return HTTP 200 `{ code: 200, data: true }` unconditionally, even for non-existent or dummy tokens.
- **Legacy Migration:** Automatically migrates authentic legacy tokens from `pulseid_patient_token` to `pulseid_auth_token` and deletes the old key.

### 2.3 Error Taxonomy (`ApiError`)
The client maps all HTTP responses to strongly typed `ApiError` instances:

| Kind | Trigger Conditions | Handling & Meaning |
|---|---|---|
| `VALIDATION_ERROR` | HTTP 400 with `errors` object | ASP.NET model validation failure. Exposes `validationErrors: Record<string, string[]>`. |
| `BUSINESS_ERROR` | HTTP 400 with `error` or `message` string | Application business rule failure (e.g., `{ code: 404, error: "user not found" }`). |
| `UNAUTHENTICATED` | HTTP 401 | Missing, malformed, or rejected Bearer token. |
| `FORBIDDEN` | HTTP 403 | Authenticated user lacks permission for the endpoint. |
| `NOT_FOUND` | HTTP 404 | Resource URL or entity not found. |
| `SERVER_ERROR` | HTTP 500+ | Backend runtime fault or unhandled exception. |
| `NETWORK_ERROR` | Fetch rejection | Connection failure, DNS resolution error, or CORS block. |
| `TIMEOUT_ERROR` | AbortSignal timeout | Request exceeded timeout threshold (default 15s). |

> [!IMPORTANT]
> **Known Backend Quirk — HTTP 500 on Unauthenticated Requests:**
> In the current Clincs Plus API v1 deployment, several authenticated endpoints return HTTP 500 (instead of HTTP 401) when called without an `Authorization` header. The frontend explicitly classifies HTTP 500 as `SERVER_ERROR` and does **not** assume an expired session or trigger an automatic logout.

---

## 3. Data Transfer Objects (DTO) Schema Catalog

### 3.1 Authentication & User Entities

#### `LoginParameterDTO`
| Field | Type | Required | Description |
|---|---|---|---|
| `userName` | `string` | Yes | Phone number (e.g. `01000000100000`) or Email |
| `password` | `string` | Yes | User account password |

#### `UserAddUpdateDTO` (Patient Profile)
| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | No | Unique identifier / Patient ID (e.g. `PID-8924-EGY`) |
| `nameEn` | `string` | Yes | Full Name in English |
| `nameAr` | `string` | No | Full Name in Arabic |
| `birthDate` | `string (ISO Date)` | Yes | Date of birth (`YYYY-MM-DD`) |
| `genderTypeId` | `integer` | Yes | 1 = Male, 2 = Female |
| `typeId` | `integer` | Yes | Role type: `1` = Patient |
| `email` | `string` | Yes | Email address |
| `phone` | `string` | Yes | Mobile telephone number |
| `nationalId` | `string` | Yes | Egyptian National ID (14 digits) |
| `address` | `string` | No | Residential address |
| `bloodTypeId` | `integer` | No | Foreign key to `BloodTypeDTO` (omitted if unverified) |
| `userName` | `string` | Yes | User handle / username |
| `password` | `string` | Yes (Create) | Account password |
| `allergyMenu` | `Array<AllergyMenuDTO>` | No | Embedded allergies list |
| `chronicDiseases` | `Array<ChronicDiseasesDTO>` | No | Embedded chronic conditions list |
| `currentMedications`| `Array<CurrentMedicationsDTO>` | No | Embedded medications list |
| `pastMedicalHistory`| `Array<PastMedicalHistoryDTO>` | No | Embedded past conditions list |
| `previousSurgicalProcedures` | `Array<PreviousSurgicalProceduresDTO>` | No | Embedded surgeries list |

#### `UserAddUpdateDoctorDTO` (Doctor / Clinician Profile)
| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | No | Unique Doctor UUID |
| `nameEn` | `string` | Yes | Doctor full name (English) |
| `nameAr` | `string` | No | Doctor full name (Arabic) |
| `birthDate` | `string` | Yes | Date of birth |
| `genderTypeId` | `integer` | Yes | 1 = Male, 2 = Female |
| `typeId` | `integer` | Yes | Role type: `2` = Doctor, `3` = Pharmacist |
| `email` | `string` | Yes | Professional email |
| `phone` | `string` | Yes | Mobile contact number |
| `nationalId` | `string` | Yes | National ID |
| `address` | `string` | No | Clinic or hospital address |
| `bloodTypeId` | `integer` | No | Blood group ID |
| `userName` | `string` | Yes | Username |
| `password` | `string` | Yes (Create) | Account password |
| `stateId` | `integer` | Yes | Governorate / State ID |
| `cityId` | `integer` | Yes | District / City ID |
| `license` | `string` | Yes | Medical or Pharmacy license registration code |
| `medicalLicense`| `string (base64/URL)` | No | Uploaded license documentation |
| `medicalLicenseName` | `string` | No | Document file name |
| `professionalID` | `string (base64/URL)` | No | Syndicated Syndicate card |
| `professionalIDName` | `string` | No | Syndicate file name |

---

### 3.2 Clinical Entities & Reference Fallback Boundaries

> [!WARNING]
> **OpenAPI Schema Constraint:** The backend's clinical entity DTOs strictly accept only `{ id, name, patientId/userId, date }`. Any attempt to send extended clinical properties (such as `severity`, `dosage`, `frequency`, `hospital`, `surgeon`, or `emergencyProtocol`) results in backend serialization failure. Extended properties are managed strictly as UI presentation models (`UIAllergyItem`, `UICurrentMedicationItem`, etc.) and stripped before sending to the backend.

- **`BloodTypeDTO`**: `{ id: number, nameAr: string, nameEn: string }`
  - **Live Database Status:** `GET /api/v1/BloodType/GetAll` returns `{ result: [] }` (0 seeded records).
  - **Fallback Separation:** `ReferenceService.PRESENTATION_ONLY_BLOOD_TYPES` provides static mockup records (IDs 1-8).
  - **Foreign Key Safety:** These fallback IDs are **never** submitted to `Patient/Update` or `Patient/Create` as foreign keys. When the backend table is empty, `bloodTypeId` remains `undefined` and the UI renders an explicit unavailable-data state (`"Blood types unavailable from server (Reference data unseeded)"`).
- **`AllergyMenuDTO`**: `{ id: number, name: string, patientId: string, date: string }`
- **`ChronicDiseasesDTO`**: `{ id: number, name: string, patientId: string, date: string }`
- **`CurrentMedicationsDTO`**: `{ id: number, name: string, patientId: string, date: string }`
- **`PastMedicalHistoryDTO`**: `{ id: number, name: string, userId: string, date: string }`
- **`PreviousSurgicalProceduresDTO`**: `{ id: number, name: string, patientId: string, date: string }`
- **`StatesDTO`**: `{ id: number, nameAr: string, nameEn: string }`
- **`CitysDTO`**: `{ id: number, nameAr: string, nameEn: string, stateId: number }`

---

## 4. Role Identification & Verification Architecture

In Clincs Plus API v1, the successful 200 response schema for both `/api/v1/Patient/Login` and `/api/v1/Users/Login` is completely undocumented (`"200": { "description": "OK" }`).

### 4.1 Strict Role Ground Rules
1. **Centralized Login Endpoint:** All user types (Patient, Doctor, Pharmacist) authenticate strictly through `POST /api/v1/Users/Login`. There are no fragmented or role-specific login endpoints.
2. **Never Trust Frontend Selection:** The role chosen on the login screen (`?role=...` query param or tab switch) is **never** treated as proof of the authenticated user's role.
3. **Backend Role Extraction:** The application extracts the role from the response payload (`typeId: 1` -> patient, `typeId: 2` -> doctor, `typeId: 3` -> pharmacist) as confirmed by the server.
4. **Unconfirmed Role Handling:** If the backend login response omits role information, `userRole` remains `null` (unconfirmed role). Portal routing defaults to safe patient paths and does **not** grant doctor or pharmacist access based on user input.
5. **Route Protection (RoleGuard):** Frontend routes (`/patient`, `/doctor`, `/pharmacist`) are protected by `<RoleGuard>`. Patients cannot access Doctor/Pharmacist portals; Doctors cannot access Patient/Pharmacist portals; Pharmacists cannot access Patient/Doctor portals. Unauthenticated users are redirected to `/auth/login`.

### 4.2 Role-Specific Registration Mappings
Registration is intentionally not centralized:
- **Patient Registration:** `POST /api/v1/Patient/Create` with `UserAddUpdateDTO` (`typeId: 1`, application/json). Required clinical collections are passed as empty arrays `[]` to satisfy backend validation. `bloodTypeId` remains undefined when reference table is unseeded.
- **Doctor Registration:** `POST /api/v1/Doctor/Create` with `multipart/form-data` under tag `DoctorAndPharmacy` (`TypeId: 2`, `License`, optional `MedicalLicense` file, optional `ProfessionalID` file, `StateId`, `CityId`).
- **Pharmacist Registration:** `POST /api/v1/Doctor/Create` with `multipart/form-data` under tag `DoctorAndPharmacy` (`TypeId: 3`, `License`, optional `MedicalLicense` file, optional `ProfessionalID` file, `StateId`, `CityId`).

### 4.3 ASP.NET Core EF Core Serialization Safety Rule
When issuing requests to pagination/filter endpoints (`States/GetAll`, `Citys/GetAll`, `AllergyMenu/GetAll`, `CurrentMedications/GetAll`, etc.):
- **Never send empty arrays or empty objects** (`orderByValue: []`, `filter: {}`). The ASP.NET Core EF Core backend throws unhandled `NullReferenceException` / HTTP 500 when empty arrays are deserialized for these parameters.
- Sending clean `{ pageNumber: 1, pageSize: 100 }` (or `{ pageNumber, pageSize, filter: { patientId } }`) succeeds with HTTP 200.

---

## 5. Security Architecture & Interim Limitations

### 5.1 Current Architecture: Client-Side Bearer Token in `localStorage`
- **Status:** **Interim limitation.**
- **Risk Assessment:** Storing bearer tokens in `localStorage` is vulnerable to extraction if a Cross-Site Scripting (XSS) vulnerability exists.
- **Why It Is Used:** The Clincs Plus API v1 backend is an external Cloud Run service configured strictly for Bearer authentication (`Authorization: Bearer <token>`). It does not emit `Set-Cookie` headers or manage session cookies.

### 5.2 Cookie Sessions & Next.js BFF Feasibility Assessment
- **Direct Backend Cookies:** The backend currently does **not** support HttpOnly cookie sessions. Adopting cookie-based authentication directly with the backend would require backend changes to set `Set-Cookie: ...; HttpOnly; SameSite=Lax; Secure` and enable `Access-Control-Allow-Credentials: true` with an explicit origin.
- **Next.js BFF (Backend-For-Frontend) Route Proxy:** A standard BFF architecture would require all API requests to route through Next.js App Router Route Handlers (`/api/proxy/*`), which store the JWT in an encrypted HttpOnly session cookie on the Next.js server and inject the `Authorization: Bearer` header before forwarding requests to Cloud Run. This is documented for future production hardening and will not be invented prematurely without backend alignment.

---

## 6. Complete Endpoint Inventory (73 Operations)

| Endpoint | Method | Tag | Request Body | Query Params | Auth | Frontend Feature | Integration Status |
|---|---|---|---|---|---|---|---|
| `/api/v1/Patient/Login` | `POST` | Patient | `LoginParameterDTO` | None | None | Auth (Patient Login) | **Integrated** |
| `/api/v1/Patient/Create` | `POST` | Patient | `UserAddUpdateDTO` | None | None | Auth (Patient Register) | **Integrated** |
| `/api/v1/Patient/getById` | `GET` | Patient | None | `id` | Bearer | Patient Profile & Portal | **Integrated** |
| `/api/v1/Patient/Update` | `POST` | Patient | `UserAddUpdateDTO` | None | Bearer | Patient Profile Edit | **Integrated** |
| `/api/v1/Patient/GetAll` | `POST` | Patient | `UsersFilterBaseParam` | None | Bearer | Patient Directory | **Integrated** |
| `/api/v1/Patient/delete` | `POST` | Patient | None | `id` | Bearer | Account Termination | Deferred |
| `/api/v1/Patient/DeleteList` | `POST` | Patient | `array` | None | Bearer | Admin Batch Delete | Deferred |
| `/api/Patient` | `POST` | Patient | `LoginParameterDTO` | None | None | Auth Fallback | **Integrated** |
| `/api/Patient/AuthenticatUser` | `POST` | Patient | None | None | Bearer | Session Verification | Unreliable (Bypassed) |
| `/api/v1/Users/Login` | `POST` | Users | `LoginParameterDTO` | None | None | Doctor / Pharmacy Login | **Integrated** |
| `/api/v1/Users/Create` | `POST` | Users | `UserAddUpdateDTO` | None | None | Generic Staff Registration | Integrated (Staff Only) |
| `/api/v1/Users/getById` | `GET` | Users | None | `id` | Bearer | Staff Profile | Planned M4 |
| `/api/v1/Users/Update` | `POST` | Users | `UserAddUpdateDTO` | None | Bearer | Staff Profile Update | Planned M4 |
| `/api/v1/Users/GetAll` | `POST` | Users | `UsersFilterBaseParam` | None | Bearer | Staff Directory | Deferred |
| `/api/v1/Users/delete` | `POST` | Users | None | `id` | Bearer | User Deletion | Deferred |
| `/api/v1/Users/DeleteList` | `POST` | Users | `array` | None | Bearer | Batch Deletion | Deferred |
| `/api/Users` | `POST` | Users | `LoginParameterDTO` | None | None | User Login Fallback | **Integrated** |
| `/api/Users/AuthenticatUser` | `POST` | Users | None | None | Bearer | User Session Refresh | Unreliable (Bypassed) |
| `/api/v1/Doctor/Create` | `POST` | DoctorAndPharmacy | `UserAddUpdateDoctorDTO` (Multipart) | None | None | Professional Registration | Scheduled (M4/M5) |
| `/api/v1/Doctor/Update` | `POST` | DoctorAndPharmacy | `UserAddUpdateDoctorDTO` | None | Bearer | Doctor Profile Edit | Planned M4 |
| `/api/v1/Doctor/getById` | `GET` | DoctorAndPharmacy | None | `id` | Bearer | Doctor Details | Planned M4 |
| `/api/v1/Doctor/GetAll` | `POST` | DoctorAndPharmacy | `UsersFilterBaseParam` | None | Bearer | Doctor Directory | Planned M4 |
| `/api/v1/Doctor/delete` | `POST` | DoctorAndPharmacy | None | `id` | Bearer | Doctor Revocation | Deferred |
| `/api/v1/Doctor/DeleteList` | `POST` | DoctorAndPharmacy | `array` | None | Bearer | Doctor Batch Delete | Deferred |
| `/api/v1/BloodType/GetAll` | `GET` | BloodType | None | None | None | Dropdowns & Medical ID | **Integrated (Empty DB)** |
| `/api/v1/BloodType/GetAll` | `POST` | BloodType | `BloodTypeFilterBaseParam` | None | Bearer | Filtered Blood Types | Integrated |
| `/api/v1/BloodType/getById` | `GET` | BloodType | None | `id` | Bearer | Single Blood Type | Integrated |
| `/api/v1/AllergyMenu/GetAll` | `POST` | AllergyMenu | `AllergyMenuFilterBaseParam` | None | Bearer | Patient Allergy Timeline | **Integrated** |
| `/api/v1/AllergyMenu/getById` | `GET` | AllergyMenu | None | `id` | Bearer | Allergy Detail | **Integrated** |
| `/api/v1/AllergyMenu/Create` | `POST` | AllergyMenu | `AllergyMenuDTO` | None | Bearer | Add Allergy Record | **Integrated** |
| `/api/v1/AllergyMenu/Update` | `POST` | AllergyMenu | `AllergyMenuDTO` | None | Bearer | Update Allergy Record | **Integrated** |
| `/api/v1/AllergyMenu/delete` | `POST` | AllergyMenu | None | `id` | Bearer | Remove Allergy Record | **Integrated** |
| `/api/v1/ChronicDiseases/GetAll` | `POST` | ChronicDiseases | `ChronicDiseasesFilterBaseParam` | None | Bearer | Chronic Conditions List | **Integrated** |
| `/api/v1/ChronicDiseases/getById` | `GET` | ChronicDiseases | None | `id` | Bearer | Condition Detail | **Integrated** |
| `/api/v1/ChronicDiseases/Create` | `POST` | ChronicDiseases | `ChronicDiseasesDTO` | None | Bearer | Add Chronic Condition | **Integrated** |
| `/api/v1/ChronicDiseases/Update` | `POST` | ChronicDiseases | `ChronicDiseasesDTO` | None | Bearer | Update Chronic Condition| **Integrated** |
| `/api/v1/ChronicDiseases/delete` | `POST` | ChronicDiseases | None | `id` | Bearer | Delete Chronic Condition| **Integrated** |
| `/api/v1/CurrentMedications/GetAll` | `POST` | CurrentMedications | `CurrentMedicationsFilterBaseParam` | None | Bearer | Active Medications List | **Integrated** |
| `/api/v1/CurrentMedications/getById` | `GET` | CurrentMedications | None | `id` | Bearer | Medication Detail | **Integrated** |
| `/api/v1/CurrentMedications/Create` | `POST` | CurrentMedications | `CurrentMedicationsDTO` | None | Bearer | Prescribe / Add Drug | **Integrated** |
| `/api/v1/CurrentMedications/Update` | `POST` | CurrentMedications | `CurrentMedicationsDTO` | None | Bearer | Modify Medication | **Integrated** |
| `/api/v1/CurrentMedications/delete` | `POST` | CurrentMedications | None | `id` | Bearer | Cease Medication | **Integrated** |
| `/api/v1/PastMedicalHistory/GetAll` | `POST` | PastMedicalHistory | `PastMedicalHistoryDTOFilterBaseParam` | None | Bearer | Medical History List | **Integrated** |
| `/api/v1/PastMedicalHistory/getById` | `GET` | PastMedicalHistory | None | `id` | Bearer | History Item Detail | **Integrated** |
| `/api/v1/PastMedicalHistory/Create` | `POST` | PastMedicalHistory | `PastMedicalHistoryDTO` | None | Bearer | Add History Entry | **Integrated** |
| `/api/v1/PastMedicalHistory/Update` | `POST` | PastMedicalHistory | `PastMedicalHistoryDTO` | None | Bearer | Update History Entry | **Integrated** |
| `/api/v1/PastMedicalHistory/delete` | `POST` | PastMedicalHistory | None | `id` | Bearer | Delete History Entry | **Integrated** |
| `/api/v1/PreviousSurgicalProcedures/GetAll` | `POST` | PreviousSurgicalProcedures | `PreviousSurgicalProceduresFilterBaseParam` | None | Bearer | Surgeries & Procedures | **Integrated** |
| `/api/v1/PreviousSurgicalProcedures/getById` | `GET` | PreviousSurgicalProcedures | None | `id` | Bearer | Surgery Detail | **Integrated** |
| `/api/v1/PreviousSurgicalProcedures/Create` | `POST` | PreviousSurgicalProcedures | `PreviousSurgicalProceduresDTO` | None | Bearer | Add Surgical Procedure | **Integrated** |
| `/api/v1/PreviousSurgicalProcedures/Update` | `POST` | PreviousSurgicalProcedures | `PreviousSurgicalProceduresDTO` | None | Bearer | Edit Surgical Procedure | **Integrated** |
| `/api/v1/PreviousSurgicalProcedures/delete` | `POST` | PreviousSurgicalProcedures | None | `id` | Bearer | Delete Procedure | **Integrated** |
| `/api/v1/States/GetAll` | `POST` | States | `StatesFilterBaseParam` | None | None | Geographic Selectors | **Integrated** |
| `/api/v1/Citys/GetAll` | `POST` | Citys | `CitysFilterBaseParam` | None | None | Geographic Selectors | **Integrated** |

---

## 7. Browser Integration & CORS Compatibility Audit

Live HTTP testing from actual browser origins (`http://localhost:3000`) against Cloud Run revealed a critical backend infrastructure constraint:

### 7.1 Detailed Multi-Endpoint CORS Audit Matrix

Preflight `OPTIONS` requests were dispatched with exact required headers:
- `Origin: http://localhost:3000`
- `Access-Control-Request-Method: POST` (or `GET`)
- `Access-Control-Request-Headers: authorization,content-type,lang`

| Target Endpoint | Method | Preflight Status | Preflight ACAO | Preflight ACAM | Preflight ACAH | Actual Status | Actual ACAO | Browser Result |
|---|---|---|---|---|---|---|---|---|
| `/api/v1/Patient/Login` | `POST` | `415 Unsupported Media Type` | `null` (absent) | `null` (absent) | `null` (absent) | `400 Bad Request` | `null` (absent) | **BLOCKED (Preflight failure)** |
| `/api/v1/Patient/getById?id=PID-TEST` | `GET` | `500 Internal Server Error` | `null` (absent) | `null` (absent) | `null` (absent) | `500 Internal Server Error` | `null` (absent) | **BLOCKED (Preflight failure)** |
| `/api/v1/Patient/Update` | `POST` | `415 Unsupported Media Type` | `null` (absent) | `null` (absent) | `null` (absent) | `400 Bad Request` | `null` (absent) | **BLOCKED (Preflight failure)** |
| `/swagger/v1/swagger.json` | `GET` | `404 Not Found` | `null` (absent) | `null` (absent) | `null` (absent) | `200 OK` | `null` (absent) | **BLOCKED (Preflight failure)** |

### 7.2 Headless Browser Origin Verification Evidence

An empirical browser verification was conducted by launching headless Microsoft Edge (`msedge.exe`) loading an origin document served from `http://localhost:3001` executing `window.fetch()` against `https://pulseid-api-566271518532.europe-west1.run.app/api/v1/Patient/Login`:

```text
DOM Result: "CORS_BLOCKED: TypeError - Failed to fetch"
Browser Console: Access to fetch at 'https://pulseid-api-566271518532.europe-west1.run.app/api/v1/Patient/Login'
from origin 'http://localhost:3001' has been blocked by CORS policy: Response to preflight request doesn't
pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

### 7.3 Required Backend ASP.NET Core Middleware Configuration

To resolve the preflight failure and permit browser frontend integration, the ASP.NET Core API on Cloud Run must configure CORS middleware in `Program.cs`:

```csharp
// 1. In Program.cs (Service Registration)
builder.Services.AddCors(options =>
{
    options.AddPolicy("PulseIDCorsPolicy", policy =>
    {
        policy.WithOrigins(
                  "http://localhost:3000",
                  "http://localhost:3001",
                  "https://*.pulseid.eg"
              )
              .AllowAnyMethod()
              .WithHeaders("authorization", "content-type", "lang")
              .AllowCredentials();
    });
});

// 2. In Program.cs (Middleware Pipeline)
// MANDATORY ORDER: UseCors MUST be placed strictly between UseRouting() and UseAuthentication()
app.UseRouting();

app.UseCors("PulseIDCorsPolicy");

app.UseAuthentication();
app.UseAuthorization();
```

---

## 8. Milestone 2 Preparation: Safe Patient Persistence Protocol

A dedicated, non-destructive automated test suite is located at [`scratch/test_patient_persistence.mjs`](file:///e:/Technology/GitHub%20REPOS/PulseID/scratch/test_patient_persistence.mjs).

### 8.1 Safety Rules & Guards
1. **Guaranteed Cleanup via `try ... finally`:** Field updates are wrapped in a `try ... finally` block ensuring restoration of original patient data executes even if assertions or subsequent fetches throw errors.
2. **Explicit Fallback Log:** If restoration encounters a network or server failure, the original record state is dumped to standard error for immediate manual recovery.
3. **Synthetic Demo Protection:** `PatientService.updatePatientProfile()` strictly intercepts and rejects synthetic IDs (`DEMO-PID-8924`, `PID-8924-EGY`, `PID-8924`, National ID `29801011234567`, `29203150101234`) with an `ApiError` (`VALIDATION_ERROR`, HTTP 400).
4. **Clean Profile Separation:**
   - `EMPTY_PATIENT_PROFILE`: Safe initial state containing blank strings and empty collections. Used by all production views.
   - `DEMO_PATIENT_PROFILE`: Figma reference mockup. Accessible only when explicitly opted in (`allowDemoPreview: true`) in non-production environments.

### 8.2 Token Verification & Invalidation Semantics
- **HTTP 401 Unauthorized:** Authoritative authentication rejection. Purges stored token via `TokenStorage.clear()` and throws.
- **HTTP 403 Forbidden:** Authorization denial. User is authenticated but lacks access. Does **NOT** clear token.
- **HTTP 500 Internal Server Error:** Server-side fault. Does **NOT** clear token and is **NEVER** counted as verified invalid-token rejection.

### 8.3 Current Execution Status
- **STATUS: BLOCKED: TEST CREDENTIALS REQUIRED.**
- Zero dedicated test accounts exist on the remote Cloud Run instance. Full roundtrip execution is safely deferred until valid credentials are provided in the environment:
  ```powershell
  $env:TEST_PATIENT_USERNAME = "dedicated_test_patient"
  $env:TEST_PATIENT_PASSWORD = "dedicated_password"
  node scratch/test_patient_persistence.mjs
  ```
