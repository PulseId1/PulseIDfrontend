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
    id: "ar-1048",
    requestId: "AR-1048",
    doctorName: "Dr. Sara Ahmed",
    doctorSpecialty: "Cardiologist",
    hospitalClinic: "Cairo Heart Clinic",
    avatarUrl: "/assets/doctor/dr-sara-ahmed.png",
    status: "pending",
    requestedDate: "3 Nov 2026",
    accessExpires: "10 Nov 2026",
    permissionLevel: "View permission",
    reasonForAccess: "Review cardiac risk factors before your cardiology consultation.",
    permissions: [
      { category: "Medical History", details: "Pneumonia, Concussion", recordsCount: 2, items: ["Pneumonia · 12 Mar 2024", "Concussion · 6 Sep 2023"] },
      { category: "Lab Tests", details: "Fasting Blood Glucose, Comprehensive Lipid Panel", recordsCount: 2, items: ["Fasting Blood Glucose · 14 Aug 2024", "Comprehensive Lipid Panel · 14 Aug 2024"] },
      { category: "Allergies", details: "Documented seasonal & medicinal allergies", recordsCount: 1, items: ["Penicillin · Documented 2021"] },
    ],
    viewOnly: true,
    expiresText: "Pending Approval · Requested 3 Nov 2026",
    isBackendSupported: false,
  },
  {
    id: "ar-1047",
    requestId: "AR-1047",
    doctorName: "Dr. Omar Farouk",
    doctorSpecialty: "Internal Medicine",
    hospitalClinic: "Al Salam International Hospital",
    avatarUrl: "/assets/doctor/dr-omar-farouk.png",
    status: "pending",
    requestedDate: "2 Nov 2026",
    accessExpires: "17 Nov 2026",
    permissionLevel: "Edit permission",
    reasonForAccess: "Reconcile your medication list and update documented allergies.",
    permissions: [
      { category: "Allergies", details: "Update documented drug and food allergies", recordsCount: 1, items: ["Penicillin allergy updates"] },
      { category: "Prescriptions", details: "Active therapeutic dosages and schedules", recordsCount: 2, items: ["Metformin 500mg", "Cholecalciferol 50,000 IU"] },
    ],
    viewOnly: false,
    expiresText: "Pending Approval · Requested 2 Nov 2026",
    isBackendSupported: false,
  },
  {
    id: "ar-1042",
    requestId: "AR-1042",
    doctorName: "Dr. Laila Mostafa",
    doctorSpecialty: "Endocrinologist",
    hospitalClinic: "Dar Al Fouad Hospital",
    avatarUrl: "/assets/doctor/dr-laila-mostafa.png",
    status: "approved",
    requestedDate: "28 Oct 2026",
    accessExpires: "28 Nov 2026",
    approvedDate: "29 Oct 2026",
    permissionLevel: "View permission",
    reasonForAccess: "Monitor glucose levels and review your current treatment plan.",
    permissions: [
      { category: "Medical History", details: "Type 2 diabetes & endocrine assessments", recordsCount: 2, items: ["Type 2 Diabetes Review", "Endocrine Consultation"] },
      { category: "Lab Tests", details: "HbA1c & metabolic blood panels", recordsCount: 2, items: ["HbA1c test 6.8%", "Fast blood panel"] },
      { category: "Allergies", details: "Documented seasonal & medicinal allergies", recordsCount: 1, items: ["Penicillin"] },
      { category: "Prescriptions", details: "Metformin 500mg, Vitamin D3 50,000 IU", recordsCount: 2, items: ["Metformin 500mg", "Cholecalciferol"] },
    ],
    viewOnly: true,
    expiresText: "Active Access · Scheduled to expire 28 Nov 2026",
    isBackendSupported: false,
  },
  {
    id: "ar-1043",
    requestId: "AR-1043",
    doctorName: "Dr. Hany Nabil",
    doctorSpecialty: "Orthopedic Surgeon",
    hospitalClinic: "Nile Orthopedic Center",
    avatarUrl: "/assets/doctor/dr-hany-nabil.png",
    status: "rejected",
    requestedDate: "29 Oct 2026",
    accessExpires: "Not granted",
    permissionLevel: "View permission",
    reasonForAccess: "Review previous injuries and test results for a second opinion.",
    permissions: [
      { category: "Medical History", details: "Trauma history and clinical consults", recordsCount: 2 },
      { category: "Lab Tests", details: "Imaging and orthopedic diagnostic reports", recordsCount: 1 },
    ],
    decisionNote: "Rejected 30 Oct 2026 · No records shared",
    statusFooter: "No access was granted",
    viewOnly: true,
    expiresText: "Rejected 30 Oct 2026 · No records shared",
    isBackendSupported: false,
  },
  {
    id: "ar-1032",
    requestId: "AR-1032",
    doctorName: "Dr. Mona Samir",
    doctorSpecialty: "Dermatologist",
    hospitalClinic: "Cleopatra Hospital",
    avatarUrl: "/assets/doctor/dr-mona-samir.png",
    status: "revoked",
    requestedDate: "20 Oct 2026",
    accessExpires: "20 Nov 2026",
    approvedDate: "21 Oct 2026",
    permissionLevel: "View permission",
    reasonForAccess: "Check medication allergies before starting skin treatment.",
    permissions: [
      { category: "Allergies", details: "Contact and medication allergen profile", recordsCount: 1 },
      { category: "Prescriptions", details: "Topical and systemic treatments", recordsCount: 1 },
    ],
    decisionNote: "Revoked 1 Nov 2026 · Approved 21 Oct 2026",
    statusFooter: "Access ended immediately on 1 Nov 2026",
    viewOnly: true,
    expiresText: "Revoked 1 Nov 2026 · Approved 21 Oct 2026",
    isBackendSupported: false,
  },
];

export const DEFAULT_ACCESS_REQUESTS = DEMO_ACCESS_REQUESTS;

export const DEMO_MEDICAL_RECORDS: MedicalRecordItem[] = [
  {
    id: "rec-rx-1",
    category: "prescriptions",
    title: "Amoxicillin + Paracetamol",
    subtitle: "RX-240814-01 • Issued Aug 14, 2024",
    date: "Aug 14, 2024",
    facility: "Mariam Adel · El Ezaby Pharmacy, Maadi",
    doctor: "Dr. Nader Fouad · Internal Medicine",
    statusBadge: { label: "DISPENSED", variant: "normal" },
    description: "Amoxicillin 500 mg • Paracetamol 500 mg",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-rx-2",
    category: "prescriptions",
    title: "Augmentin + Cataflam",
    subtitle: "RX-240702-02 • Issued Jul 02, 2024",
    date: "Jul 02, 2024",
    facility: "Karim Emad · Misr Pharmacy, New Cairo",
    doctor: "Dr. Hala Youssef · Family Medicine",
    statusBadge: { label: "DISPENSED", variant: "normal" },
    description: "Augmentin 625 mg • Cataflam 50 mg",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-rx-3",
    category: "prescriptions",
    title: "Vitamin D3",
    subtitle: "RX-240618-03 • Issued Jun 18, 2024",
    date: "Jun 18, 2024",
    facility: "Nada Fathy · El Ezaby Pharmacy, Heliopolis",
    doctor: "Dr. Karim Samir · Endocrinology",
    statusBadge: { label: "DISPENSED", variant: "normal" },
    description: "Cholecalciferol 50,000 IU",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-lab-1",
    category: "labs",
    title: "Fasting Blood Glucose",
    subtitle: "Requested by: Dr. Sherif Mansour • Laboratory: Al Borg Diagnostics, Maadi Branch • Date: Aug 14, 2024",
    date: "Aug 14, 2024",
    facility: "Al Borg Diagnostics, Maadi Branch",
    doctor: "Dr. Sherif Mansour",
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
    id: "rec-lab-2",
    category: "labs",
    title: "Comprehensive Lipid Panel",
    subtitle: "Requested by: Dr. Mona El-Shazly • Assigned Laboratory: Al Borg Diagnostics, Maadi Branch • Ordered: Today, 08:30 AM",
    date: "Today, 08:30 AM",
    facility: "Al Borg Diagnostics, Maadi Branch",
    doctor: "Dr. Mona El-Shazly",
    statusBadge: { label: "Total Cholesterol: 178 mg/dL", variant: "normal" },
    metrics: [
      { label: "HDL (GOOD)", value: "54 mg/dL", note: "Optimal (>40)" },
      { label: "LDL (CALCULATED)", value: "102 mg/dL", note: "Near Optimal" },
      { label: "TRIGLYCERIDES", value: "110 mg/dL", note: "Normal (<150)" },
      { label: "NON-HDL", value: "124 mg/dL", note: "Low Risk" },
    ],
    findings: "Total Cholesterol: 178 mg/dL. All lipid fractions within acceptable thresholds.",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-lab-3",
    category: "labs",
    title: "Complete Blood Count (CBC)",
    subtitle: "Requested by: Dr. Sherif Mansour • Laboratory: Al Borg Diagnostics • Verified through automated serum spectrometry • Ref: LP-90218",
    date: "Aug 14, 2024",
    facility: "Al Borg Diagnostics",
    doctor: "Dr. Sherif Mansour",
    statusBadge: { label: "Within range", variant: "normal" },
    findings: "Hemoglobin: 14.8 g/dL (13.5–17.5) • WBC: 6.4 ×10⁹/L (4.0–11.0)\nPlatelets: 245 ×10⁹/L (150–450) • Hematocrit: 44% (41–53)\nInterpretation: No anemia, leukocytosis or platelet abnormality.",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-lab-4",
    category: "labs",
    title: "Chest PA Digital Radiograph (X-Ray)",
    subtitle: "Requested by: Dr. Tarek Ezzat • Imaging Center: Cairo Scan Diagnostic Imaging • Study ID: XR-2024-884 • Radiologist: Dr. Nader Fouad",
    date: "Aug 14, 2024",
    facility: "Cairo Scan Diagnostic Imaging",
    doctor: "Dr. Tarek Ezzat",
    statusBadge: { label: "DICOM Ready", variant: "normal" },
    findings: "Radiologist Impression: Lungs are clear of acute focal infiltrates, consolidation, or pleural effusion. Cardiothoracic ratio is normal. Skeletal thorax architecture intact.",
    dicomViewerUrl: "#dicom",
    downloadUrl: "#download",
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
  {
    id: "rec-otc-1",
    category: "otc",
    title: "Panadol Extra (Paracetamol 500mg + Caffeine 65mg)",
    subtitle: "Dispensing Pharmacy: El Ezaby Pharmacy — Nasr City Branch",
    date: "28 Oct 2026",
    facility: "El Ezaby Pharmacy",
    doctor: "Pharmacist: Dr. Nader Samir (Lic #48201)",
    statusBadge: { label: "Dispensed • OTC Log", variant: "normal" },
    findings: "Dispensed for acute tension headache relief. Advised max 2 tablets every 6 hours.",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-otc-2",
    category: "otc",
    title: "Otrivin Adult Nasal Spray 0.1% (Xylometazoline)",
    subtitle: "Dispensing Pharmacy: Seif Pharmacy — Abbas El Akkad Branch",
    date: "14 Oct 2026",
    facility: "Seif Pharmacy",
    doctor: "Pharmacist: Dr. Rania Ezzat (Lic #51904)",
    statusBadge: { label: "Dispensed • OTC Log", variant: "normal" },
    findings: "Dispensed for seasonal nasal congestion. Recommended continuous use limited to 3-5 days.",
    pdfAvailable: true,
    isBackendSupported: false,
  },
];

export const DEFAULT_MEDICAL_RECORDS = DEMO_MEDICAL_RECORDS;
