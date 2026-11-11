/**
 * PulseID Patient API Service
 *
 * Consumes the centralized ApiClient for Patient profile operations.
 *
 * Operational rules:
 * - NO hardcoded patient IDs in production requests.
 * - NO duplicate token management (delegated to TokenStorage in client.ts).
 * - Real backend calls only; failures throw or return explicit errors.
 * - Seed data for Figma UI demonstration is explicitly isolated and marked.
 */

import { apiClient, AUTH_USER_ID_KEY, TokenStorage, ApiError } from "./client";
import { ReferenceService } from "./reference-service";
import { DemoService } from "@/lib/demo/demo-service";
import {
  UserAddUpdateDTO,
  UIPatientProfile,
  UsersFilterBaseParam,
  PaginatedResult,
  AccessRequestItem,
  MedicalRecordItem,
  BloodTypeDTO,
} from "./types";

export class PatientService {
  /**
   * Retrieves a patient profile by ID from the real backend.
   * Endpoint: GET /api/v1/Patient/getById?id={patientId}
   *
   * Operational rules:
   * - If an active token and patient ID are present, attempts real backend fetch.
   * - If the backend returns 401 UNAUTHENTICATED, purges the invalid token and rethrows.
   * - If the backend returns 403 FORBIDDEN or 500 SERVER_ERROR, does NOT clear token and rethrows.
   * - An unverified or rejected token NEVER silently masks auth failures or falls back to demo data.
   * - If completely unauthenticated, returns DEMO_PATIENT_PROFILE only when explicitly opted in during non-production development; otherwise returns EMPTY_PATIENT_PROFILE.
   */
  static async getPatientProfile(
    patientId?: string,
    options?: { allowDemoPreview?: boolean }
  ): Promise<UIPatientProfile> {
    // 1. Isolated Demo Session: If demo session is active, read from DemoService
    if (typeof window !== "undefined" && localStorage.getItem("pulseid_demo_session")) {
      return DemoService.getPatientProfile(patientId);
    }

    const token = TokenStorage.get();
    const id =
      patientId ||
      (typeof window !== "undefined" ? localStorage.getItem(AUTH_USER_ID_KEY) : null);

    if (token && id && id.trim()) {
      try {
        const response = await apiClient.get<UserAddUpdateDTO>(
          `/api/v1/Patient/getById?id=${encodeURIComponent(id)}`
        );
        if (response.data) return response.data as UIPatientProfile;
      } catch (err) {
        if (err instanceof ApiError) {
          // Rule: 401 UNAUTHENTICATED is an authoritative auth rejection: clear stored token
          if (err.statusCode === 401) {
            TokenStorage.clear();
          }
          // Rule: 403 FORBIDDEN and 500 SERVER_ERROR must NOT clear the token
        }
        // Never mask an authenticated failure with synthetic prototype data
        throw err;
      }
    }

    // Unauthenticated access: Only return demo preview if explicitly opted in and NOT in production
    if (options?.allowDemoPreview && process.env.NODE_ENV !== "production") {
      return DEMO_PATIENT_PROFILE;
    }

    // Default safe empty profile for initial page state and unauthenticated views
    return EMPTY_PATIENT_PROFILE;
  }

  /**
   * Updates a patient profile on the real backend.
   * Endpoint: POST /api/v1/Patient/Update
   *
   * Operational rules:
   * - In demo mode, delegates directly to DemoService.
   * - Rejects synthetic prototype demo profiles (e.g. PID-8924-EGY or National ID 29801011234567).
   * - Filters out frontend-only presentation properties before sending.
   */
  static async updatePatientProfile(
    profile: UIPatientProfile | UserAddUpdateDTO
  ): Promise<UIPatientProfile> {
    // 1. Isolated Demo Session: If demo session is active, update in DemoService
    if (typeof window !== "undefined" && localStorage.getItem("pulseid_demo_session")) {
      return DemoService.updatePatientProfile(profile as Partial<UIPatientProfile>);
    }

    // Safety Guard: Prevent submitting synthetic prototype demo data to real backend
    const syntheticIds = ["DEMO-PID-8924", "PID-8924-EGY", "PID-8924"];
    const syntheticNationalIds = ["29203150101234", "29801011234567"];
    if (
      (profile.id && syntheticIds.includes(profile.id)) ||
      (profile.nationalId && syntheticNationalIds.includes(profile.nationalId))
    ) {
      throw new ApiError({
        message: "Safety Error: Cannot submit synthetic prototype demo data to real backend endpoints.",
        kind: "VALIDATION_ERROR",
        statusCode: 400,
      });
    }

    // Sanitize payload to match OpenAPI UserAddUpdateDTO strictly
    const payload: UserAddUpdateDTO = {
      id: profile.id,
      nameAr: profile.nameAr,
      nameEn: profile.nameEn,
      birthDate: profile.birthDate,
      genderTypeId: profile.genderTypeId,
      typeId: profile.typeId ?? 1,
      email: profile.email,
      nationalId: profile.nationalId,
      address: profile.address,
      phone: profile.phone,
      bloodTypeId:
        typeof profile.bloodTypeId === "number" && profile.bloodTypeId > 0
          ? profile.bloodTypeId
          : undefined,
      userName: profile.userName,
      password: profile.password,
      allergyMenu: profile.allergyMenu?.map((a) => ({
        id: a.id,
        name: a.name,
        patientId: a.patientId,
        date: a.date,
      })),
      chronicDiseases: profile.chronicDiseases?.map((c) => ({
        id: c.id,
        name: c.name,
        patientId: c.patientId,
        date: c.date,
      })),
      currentMedications: profile.currentMedications?.map((m) => ({
        id: m.id,
        patientId: m.patientId,
        name: m.name,
        date: m.date,
      })),
      pastMedicalHistory: profile.pastMedicalHistory?.map((h) => ({
        id: h.id,
        name: h.name,
        userId: h.userId,
        date: h.date,
      })),
      previousSurgicalProcedures: profile.previousSurgicalProcedures?.map((s) => ({
        id: s.id,
        name: s.name,
        patientId: s.patientId,
        date: s.date,
      })),
    };

    const response = await apiClient.post<UserAddUpdateDTO>(
      "/api/v1/Patient/Update",
      payload
    );

    return (response.data || profile) as UIPatientProfile;
  }

  /**
   * Retrieves blood types reference list from backend.
   * Ground Rule: Never silently substitutes fallback items into backend return values.
   */
  static async getBloodTypes(): Promise<BloodTypeDTO[]> {
    return await ReferenceService.getBloodTypes();
  }

  /**
   * Lists patients with pagination (Staff / Provider role).
   * Endpoint: POST /api/v1/Patient/GetAll
   */
  static async getAllPatients(
    params: UsersFilterBaseParam = { pageNumber: 1, pageSize: 10 }
  ): Promise<PaginatedResult<UserAddUpdateDTO>> {
    const response = await apiClient.post<PaginatedResult<UserAddUpdateDTO>>(
      "/api/v1/Patient/GetAll",
      params
    );

    return (
      response.data || {
        pageNumber: params.pageNumber || 1,
        pageSize: params.pageSize || 10,
        totalCount: 0,
        result: [],
      }
    );
  }

  // ==========================================================================
  // DEMONSTRATION & PROTOTYPE UI DATA (EXPLICITLY MARKED — NOT PERSISTED BY BACKEND)
  // Used only when rendering Figma designs for unauthenticated demo preview.
  // ==========================================================================

  /**
   * Figma Node 353:11438 Reference Profile
   * Explicitly labeled as prototype demo data.
   */
  static getDemoProfile(): UserAddUpdateDTO {
    return DEMO_PATIENT_PROFILE;
  }

  /**
   * Prototype Access Requests (BACKEND_UNSUPPORTED in API v1)
   */
  static getDemoAccessRequests(): AccessRequestItem[] {
    if (typeof window !== "undefined" && localStorage.getItem("pulseid_demo_session")) {
      return DemoService.getAccessRequests();
    }
    return DEMO_ACCESS_REQUESTS;
  }

  static getAccessRequests(): AccessRequestItem[] {
    if (typeof window !== "undefined" && localStorage.getItem("pulseid_demo_session")) {
      return DemoService.getAccessRequests();
    }
    return DEMO_ACCESS_REQUESTS;
  }

  static updateAccessRequestStatus(
    id: string,
    status: "approved" | "rejected" | "revoked"
  ): AccessRequestItem[] {
    if (typeof window !== "undefined" && localStorage.getItem("pulseid_demo_session")) {
      return DemoService.respondToAccessRequest(id, status === "approved" ? "approve" : "reject");
    }
    return DEMO_ACCESS_REQUESTS.map((req) =>
      req.id === id ? { ...req, status } : req
    );
  }

  /**
   * Prototype Medical Records (BACKEND_UNSUPPORTED in API v1)
   */
  static getDemoMedicalRecords(category?: string): MedicalRecordItem[] {
    let records = DEMO_MEDICAL_RECORDS;
    if (typeof window !== "undefined" && localStorage.getItem("pulseid_demo_session")) {
      records = DemoService.getMedicalRecords();
    }
    if (!category || category === "all") return records;
    return records.filter((r) => r.category === category);
  }

  static getMedicalRecords(category?: string): MedicalRecordItem[] {
    return PatientService.getDemoMedicalRecords(category);
  }
}

// ============================================================================
// ISOLATED DEMO CONSTANTS (Figma visual reference only)
// ============================================================================

export const DEMO_PATIENT_PROFILE: UIPatientProfile = {
  id: "DEMO-PID-8924",
  nameEn: "Ahmed Hassan",
  nameAr: "أحمد حسن",
  birthDate: "1988-09-14",
  genderTypeId: 1,
  typeId: 1,
  email: "ahmed.hassan@example.com",
  phone: "+20 100 123 4567",
  nationalId: "29203150101234",
  address: "24 El Nozha Street, Heliopolis, Cairo, Egypt",
  bloodTypeId: 1,
  userName: "ahmed.hassan",
  emergencyContacts: [
    {
      id: "ec-1",
      fullName: "Mahmoud Hassan",
      phone: "+20 122 345 6789",
      relationship: "Father",
    },
  ],
  chronicDiseases: [
    {
      id: 1,
      name: "Mild Hypertension",
      patientId: "DEMO-PID-8924",
      date: "Jan 2025",
      status: "Active Follow-up",
      latestReading: "128/82 mmHg",
      connectedDevice: "Omron Evolv BP7000",
      assignedTherapy: "Lisinopril 10mg",
      notes: "Continue daily morning readings. Review with Dr. Sherif Mansour in 3 months.",
    },
    {
      id: 2,
      name: "Asthma (Mild Intermittent)",
      patientId: "DEMO-PID-8924",
      date: "Nov 2024",
      status: "Seasonal Trigger",
      triggers: ["Cold Weather", "Dust & Pollen", "Vigorous Cardio"],
      emergencyProtocol: "Ventolin Inhaler (100mcg) - 2 puffs as needed for wheezing or prior to heavy exercise.",
      notes: "Diagnosed Nov 2024. Review inhaler technique and symptom control in 6 months.",
    },
  ],
  allergyMenu: [
    {
      id: 1,
      name: "Penicillin",
      patientId: "DEMO-PID-8924",
      date: "18 Feb 2024",
      severity: "Life-threatening",
      reactionType: "Anaphylaxis (Breathing difficulty, swelling and hives)",
      precautions: "Avoid penicillin and penicillin-class antibiotics.",
      emergencyWarning: "EMERGENCY WARNING — Do not administer penicillin. Tell every treating clinician about this allergy.",
    },
    {
      id: 2,
      name: "Dust Mites",
      patientId: "DEMO-PID-8924",
      date: "12 Mar 2024",
      severity: "Mild",
      reactionType: "Sneezing & respiratory irritation",
      precautions: "Reduce dust exposure. Use allergen-proof bedding; follow the existing asthma relief plan.",
    },
  ],
  currentMedications: [
    {
      id: 1,
      name: "Lisinopril",
      patientId: "DEMO-PID-8924",
      date: "Jan 2025",
      dosage: "10 mg tablet",
      frequency: "Once daily • Morning",
      instructions: "Take 1 tablet daily with a meal. Continue home blood pressure monitoring as recorded in the care plan.",
      assignedBy: "Dr. Sherif Mansour",
      status: "Active",
    },
    {
      id: 2,
      name: "Ventolin Inhaler",
      patientId: "DEMO-PID-8924",
      date: "Nov 2024",
      dosage: "100 mcg per puff",
      frequency: "PRN • As needed",
      instructions: "2 puffs as needed for wheezing or prior to heavy exercise. Follow the asthma action plan. Seek urgent care if breathing difficulty persists.",
      assignedBy: "Respiratory Care Team",
      status: "Active",
    },
  ],
  previousSurgicalProcedures: [
    {
      id: 1,
      name: "Appendectomy",
      patientId: "DEMO-PID-8924",
      date: "18 Jun 2018",
      hospital: "Cairo University Hospitals",
      surgeon: "Dr. Mohamed Adel",
      reason: "Acute appendicitis",
      recoveryStatus: "Complete • No complications",
      followUpNotes: "Post-operative review completed. Wounds healed. No ongoing surgical treatment or additional follow-up required for this procedure.",
    },
  ],
  pastMedicalHistory: [
    {
      id: 1,
      name: "Community-acquired pneumonia",
      userId: "DEMO-PID-8924",
      date: "Jun 18-25, 2023",
      conditionDescription: "Right lower-lobe pneumonia, treated as an outpatient.",
      treatment: "Seven-day antibiotic course, hydration and clinical follow-up.",
      recoveryStatus: "Symptoms resolved; no ongoing respiratory limitations.",
    },
    {
      id: 2,
      name: "Mild concussion",
      userId: "DEMO-PID-8924",
      date: "Jun 03-17, 2024",
      conditionDescription: "Headache and dizziness after a minor sports injury; no loss of consciousness.",
      treatment: "Relative rest and a gradual return to normal activities.",
      recoveryStatus: "Symptoms resolved at follow-up; no persistent neurological deficit.",
    },
  ],
};

// ============================================================================
// SAFE EMPTY INITIAL PROFILE (Default initial state for all profile screens)
// ============================================================================

export const EMPTY_PATIENT_PROFILE: UIPatientProfile = {
  id: "",
  nameEn: "",
  nameAr: "",
  birthDate: "",
  genderTypeId: 1,
  typeId: 1,
  email: "",
  phone: "",
  nationalId: "",
  address: "",
  bloodTypeId: undefined,
  userName: "",
  emergencyContacts: [],
  chronicDiseases: [],
  allergyMenu: [],
  currentMedications: [],
  pastMedicalHistory: [],
  previousSurgicalProcedures: [],
};

// Aliased for backward compatibility: screens defaulting to DEFAULT_PATIENT_PROFILE
// safely start with empty fields rather than synthetic medical records
export const DEFAULT_PATIENT_PROFILE = EMPTY_PATIENT_PROFILE;

export const DEMO_ACCESS_REQUESTS: AccessRequestItem[] = [
  {
    id: "ar-1",
    requestId: "AR-1048",
    doctorName: "Dr. Sara Ahmed",
    doctorSpecialty: "Cardiologist",
    hospitalClinic: "Cairo Heart Clinic",
    avatarUrl: "/assets/figma/avatars/doctor-sara.png",
    status: "pending",
    requestedDate: "3 Nov 2026",
    accessExpires: "10 Nov 2026",
    reasonForAccess: "Review cardiac risk factors before your cardiology consultation.",
    permissions: [
      { category: "Medical History", details: "Pneumonia, Concussion", recordsCount: 2 },
      { category: "Lab Tests", details: "Glucose, Lipid Panel", recordsCount: 2 },
      { category: "Allergies", details: "Penicillin", recordsCount: 1 },
    ],
    viewOnly: true,
    expiresText: "View only • Ends 10 Nov 2026, 11:59 PM (Cairo)",
    isBackendSupported: false,
  },
  {
    id: "ar-2",
    requestId: "AR-1047",
    doctorName: "Dr. Omar Farouk",
    doctorSpecialty: "Internal Medicine",
    hospitalClinic: "Al Salam International Hospital",
    avatarUrl: "/assets/figma/avatars/doctor-omar.png",
    status: "pending",
    requestedDate: "2 Nov 2026",
    accessExpires: "17 Nov 2026",
    reasonForAccess: "Reconcile your medication list and update documented allergies.",
    permissions: [
      { category: "Allergies", details: "Documented sensitivities", recordsCount: 2 },
      { category: "Prescriptions", details: "Active therapeutic scripts", recordsCount: 2 },
    ],
    viewOnly: true,
    expiresText: "View only • Ends 17 Nov 2026, 11:59 PM (Cairo)",
    isBackendSupported: false,
  },
];

export const DEFAULT_ACCESS_REQUESTS = DEMO_ACCESS_REQUESTS;

export const DEMO_MEDICAL_RECORDS: MedicalRecordItem[] = [
  {
    id: "rec-lab-1",
    category: "labs",
    title: "Fasting Blood Glucose",
    subtitle: "Lab: Al Borg Diagnostics",
    date: "Aug 14, 2024",
    facility: "Al Borg Diagnostics",
    statusBadge: { label: "Normal (94 mg/dL)", variant: "normal" },
    metrics: [
      { label: "Fasting Baseline", value: "70 mg/dL" },
      { label: "Patient", value: "94 mg/dL" },
      { label: "Upper Normal", value: "99 mg/dL" },
    ],
    findings: "Optimal Clinical Range. Within safe physiological threshold.",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-rad-1",
    category: "radiology",
    title: "Chest PA Digital Radiograph",
    subtitle: "Radiologist: Dr. Nader Fouad",
    date: "Aug 14, 2024",
    facility: "Cairo Scan Diagnostic Imaging",
    statusBadge: { label: "No acute findings", variant: "normal" },
    findings: "Lungs clear; normal cardiothoracic ratio.",
    dicomViewerUrl: "#dicom",
    downloadUrl: "#download",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-his-1",
    category: "history",
    title: "Community-acquired pneumonia",
    subtitle: "Dr. Omar Farouk • Internal Medicine",
    date: "Jun 18–25, 2023",
    facility: "Cairo General Hospital",
    statusBadge: { label: "Recovered", variant: "resolved" },
    description: "Treated as outpatient with antibiotic course. Full recovery.",
    pdfAvailable: true,
    isBackendSupported: false,
  },
];

export const DEFAULT_MEDICAL_RECORDS = DEMO_MEDICAL_RECORDS;
