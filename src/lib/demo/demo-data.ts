/**
 * PulseID Demo Data Fixtures
 *
 * Provides realistic, internally consistent, and completely fictional
 * Egyptian healthcare demo fixtures for offline demonstration of the
 * Patient and Doctor portals.
 *
 * Operational Rules:
 * - Completely isolated from production API services.
 * - ZERO real patient or clinician data.
 * - NEVER submitted to the live backend database.
 */

import { UIPatientProfile, MedicalRecordItem, AccessRequestItem } from "@/lib/api/types";

export interface DemoAppointment {
  id: string;
  patientName: string;
  patientNameAr: string;
  nationalId: string;
  age: number;
  gender: "Female" | "Male";
  time: string;
  reason: string;
  status: "Checked In" | "In Progress" | "Scheduled" | "Completed";
  accessGranted: boolean;
  bloodType: string;
  phone: string;
  keyConditions: string[];
  keyAllergies: string[];
}

export interface DemoDoctorProfile {
  id: string;
  nameEn: string;
  nameAr: string;
  title: string;
  specialty: string;
  licenseNumber: string;
  nationalId: string;
  email: string;
  phone: string;
  clinicAddress: string;
  hospitalAffiliations: string[];
  bio: string;
  consultationHours: string;
  avatarUrl?: string;
  rating: number;
  totalPatients: number;
  activeGrantsCount: number;
  criticalReviewsCount: number;
}

/**
 * Primary Fictional Demo Patient: Sara Mahmoud Ibrahim
 * Realistic Egyptian patient profile with chronic asthma, penicillin allergy,
 * verified prescriptions, lab records, and emergency contacts.
 */
export const INITIAL_DEMO_PATIENT: UIPatientProfile = {
  id: "PT-DEMO-2026-01",
  nameEn: "Sara Mahmoud Ibrahim",
  nameAr: "سارة محمود إبراهيم",
  nationalId: "29804120108924",
  birthDate: "1998-04-12T00:00:00.000Z",
  genderTypeId: 2, // Female
  bloodTypeId: 1, // A+
  phone: "01098765432",
  email: "sara.mahmoud@pulseid-demo.eg",
  address: "5th Settlement, New Cairo, Egypt",
  emergencyContacts: [
    {
      id: "ec-1",
      fullName: "Mahmoud Ibrahim",
      phone: "01001234567",
      relationship: "Father",
    },
    {
      id: "ec-2",
      fullName: "Nour Mahmoud",
      phone: "01123456789",
      relationship: "Sister",
    },
  ],
  chronicDiseases: [
    {
      id: 1,
      name: "Bronchial Asthma",
      date: "2018-05-14",
      notes: "Moderate persistent asthma. Controlled with combination corticosteroid/LABA inhaler.",
      status: "Active",
    },
    {
      id: 2,
      name: "Seasonal Allergic Rhinitis",
      date: "2020-03-22",
      notes: "Triggered by spring dust storms (Khamasin) and olive pollen.",
      status: "Monitored",
    },
  ],
  allergyMenu: [
    {
      id: 1,
      name: "Penicillin (Amoxicillin / Ampicillin)",
      severity: "Severe",
      reactionType: "Anaphylaxis & Generalized Urticaria",
    },
    {
      id: 2,
      name: "Aspirin & NSAIDs",
      severity: "Moderate",
      reactionType: "Bronchospasm & Facial Angioedema",
    },
    {
      id: 3,
      name: "Tree Nuts & Hazelnuts",
      severity: "Mild",
      reactionType: "Oral pruritus and mild rash",
    },
  ],
  currentMedications: [
    {
      id: 1,
      name: "Symbicort Turbuhaler (Budesonide / Formoterol 160/4.5mcg)",
      dosage: "1 inhalation twice daily",
      frequency: "Every 12 hours",
      assignedBy: "Dr. Tarek Al-Husseini",
      date: "2024-01-10",
      status: "Active",
    },
    {
      id: 2,
      name: "Ventolin Inhaler (Salbutamol 100mcg)",
      dosage: "1-2 puffs as needed for acute shortness of breath",
      frequency: "PRN (Max 4 times daily)",
      assignedBy: "Dr. Tarek Al-Husseini",
      date: "2018-05-14",
      status: "Active",
    },
    {
      id: 3,
      name: "Claritin (Loratadine 10mg)",
      dosage: "1 tablet once daily in the evening",
      frequency: "Daily during seasonal flare-ups",
      assignedBy: "Dr. Hany Farid",
      date: "2025-03-01",
      status: "Seasonal",
    },
  ],
  pastMedicalHistory: [
    {
      id: 1,
      name: "Acute Viral Bronchitis",
      date: "2021-11-04",
      conditionDescription: "Treated as outpatient at New Cairo Specialized Hospital. Full resolution.",
      recoveryStatus: "Fully Resolved",
    },
    {
      id: 2,
      name: "Grade II Left Ankle Sprain",
      date: "2023-07-19",
      conditionDescription: "Physical therapy completed at Al-Galaa Orthopedic Center; normal gait.",
      recoveryStatus: "Resolved",
    },
  ],
  previousSurgicalProcedures: [
    {
      id: 1,
      name: "Bilateral Tonsillectomy & Adenoidectomy",
      date: "2012-08-16",
      hospital: "Kasr Al Ainy University Hospital",
      surgeon: "Prof. Dr. Medhat Kamal",
      reason: "Elective pediatric procedure under general anesthesia. No postoperative bleeding.",
    },
  ],
};

/**
 * Fictional Demo Patient Medical Records
 */
export const DEMO_MEDICAL_RECORDS: MedicalRecordItem[] = [
  {
    id: "rec-lab-1",
    category: "labs",
    title: "Complete Blood Count (CBC) & Serum IgE Panel",
    subtitle: "Lab: Al Mokhtabar Medical Laboratories — New Cairo",
    date: "15 Oct 2026",
    facility: "Al Mokhtabar Medical Laboratories",
    doctor: "Dr. Tarek Al-Husseini",
    statusBadge: { label: "Elevated IgE (380 IU/mL)", variant: "active" },
    metrics: [
      { label: "Hemoglobin", value: "13.2 g/dL" },
      { label: "Absolute Eosinophils", value: "480 /mcL", isAbnormal: true },
      { label: "Total Serum IgE", value: "380 IU/mL", isAbnormal: true },
    ],
    findings: "Elevated absolute eosinophil count and serum IgE consistent with allergic asthma phenotype.",
    downloadUrl: "#download",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-rep-1",
    category: "reports",
    title: "Pulmonary Function Test (Spirometry & Post-Bronchodilator)",
    subtitle: "Diagnostic Center: Cairo Chest Diagnostics",
    date: "02 Aug 2026",
    facility: "Cairo Chest & Respiratory Diagnostic Center",
    doctor: "Dr. Tarek Al-Husseini",
    statusBadge: { label: "Reversible Obstruction", variant: "monitored" },
    metrics: [
      { label: "FEV1 Baseline", value: "2.10 L (71%)" },
      { label: "FEV1 Post-Salbutamol", value: "2.38 L (81%)" },
      { label: "Reversibility", value: "+14% (+280ml)" },
    ],
    findings: "Baseline FEV1/FVC ratio 72%. FEV1 improved by 14% (280ml) post-salbutamol inhalation, confirming reversible airway obstruction.",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-rad-1",
    category: "radiology",
    title: "Digital Chest Radiograph (PA & Lateral Views)",
    subtitle: "Radiologist: Dr. Nader Mostafa",
    date: "14 Jan 2026",
    facility: "Misr Radiology Scan Center — Tagamoa",
    doctor: "Dr. Nader Mostafa",
    statusBadge: { label: "Bronchial Wall Thickening", variant: "normal" },
    findings: "Clear lung parenchyma with no focal consolidations, pleural effusions, or pneumothorax. Mild bronchial wall thickening consistent with chronic asthma.",
    dicomViewerUrl: "#dicom",
    downloadUrl: "#download",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-his-1",
    category: "history",
    title: "Skin Prick Allergy Test (24 Common Aeroallergens)",
    subtitle: "Immunologist: Dr. Hany Farid",
    date: "22 Nov 2025",
    facility: "Egyptian Allergy & Immunology Research Institute",
    doctor: "Dr. Hany Farid",
    statusBadge: { label: "Positive Dust Mites & Pollen", variant: "active" },
    description: "3+ Wheal-and-flare reaction to House Dust Mites (D. pteronyssinus) and Olive Tree Pollen. Negative for mold spores.",
    pdfAvailable: true,
    isBackendSupported: false,
  },
];

/**
 * Fictional Demo Doctor Profile: Dr. Tarek Al-Husseini
 */
export const INITIAL_DEMO_DOCTOR: DemoDoctorProfile = {
  id: "DOC-DEMO-8842",
  nameEn: "Dr. Tarek Al-Husseini",
  nameAr: "د. طارق الحسيني",
  title: "MD, FCCP — Consultant Pulmonologist",
  specialty: "Pulmonology, Allergy & Critical Care Medicine",
  licenseNumber: "EG-MED-491028",
  nationalId: "28405160109988",
  email: "dr.tarek.husseini@pulseid-demo.eg",
  phone: "01223456789",
  clinicAddress: "Suite 402, Elite Medical Tower, Road 90, New Cairo, Egypt",
  hospitalAffiliations: [
    "Faculty of Medicine, Kasr Al Ainy Hospitals (Associate Professor)",
    "New Cairo Specialized Hospital (Head of Pulmonary Division)",
    "Air Force Specialized Hospital (Visiting Consultant)",
  ],
  bio: "Fellow of the American College of Chest Physicians (FCCP) with 18+ years of clinical experience in adult asthma management, COPD intervention, and pulmonary diagnostics.",
  consultationHours: "Sunday to Thursday: 09:00 AM – 03:00 PM",
  rating: 4.9,
  totalPatients: 1420,
  activeGrantsCount: 14,
  criticalReviewsCount: 3,
};

/**
 * Fictional Consultation Queue for Doctor Dashboard
 */
export const DEMO_APPOINTMENTS: DemoAppointment[] = [
  {
    id: "apt-101",
    patientName: "Sara Mahmoud Ibrahim",
    patientNameAr: "سارة محمود إبراهيم",
    nationalId: "29804120108924",
    age: 28,
    gender: "Female",
    time: "09:30 AM",
    reason: "Asthma Follow-up & Spirometry Assessment",
    status: "In Progress",
    accessGranted: true,
    bloodType: "A+",
    phone: "01098765432",
    keyConditions: ["Bronchial Asthma"],
    keyAllergies: ["Penicillin (Severe)", "Aspirin"],
  },
  {
    id: "apt-102",
    patientName: "Mohamed El-Sayed Gad",
    patientNameAr: "محمد السيد جاد",
    nationalId: "28509120104455",
    age: 41,
    gender: "Male",
    time: "10:15 AM",
    reason: "Post-COVID Chronic Cough & CT Evaluation",
    status: "Checked In",
    accessGranted: true,
    bloodType: "O+",
    phone: "01011223344",
    keyConditions: ["Hypertension", "Post-Viral Cough"],
    keyAllergies: ["Sulfa Drugs"],
  },
  {
    id: "apt-103",
    patientName: "Hoda Abdel-Rahman",
    patientNameAr: "هدى عبد الرحمن",
    nationalId: "29107180106677",
    age: 35,
    gender: "Female",
    time: "11:00 AM",
    reason: "Severe Allergic Rhinitis & Sinusitis Flare",
    status: "Scheduled",
    accessGranted: false,
    bloodType: "B+",
    phone: "01144556677",
    keyConditions: ["Chronic Sinusitis"],
    keyAllergies: ["Latex"],
  },
  {
    id: "apt-104",
    patientName: "Youssef Mansour Ali",
    patientNameAr: "يوسف منصور علي",
    nationalId: "27803040101122",
    age: 48,
    gender: "Male",
    time: "11:45 AM",
    reason: "Pre-Operative Pulmonary Clearance (Hernia Repair)",
    status: "Scheduled",
    accessGranted: true,
    bloodType: "AB+",
    phone: "01233445566",
    keyConditions: ["Mild COPD", "Ex-Smoker"],
    keyAllergies: ["None known"],
  },
  {
    id: "apt-105",
    patientName: "Layla Karim Helmy",
    patientNameAr: "ليلى كريم حلمي",
    nationalId: "29512080103399",
    age: 30,
    gender: "Female",
    time: "01:00 PM",
    reason: "Nocturnal Cough & Suspected Cough-Variant Asthma",
    status: "Scheduled",
    accessGranted: false,
    bloodType: "A-",
    phone: "01099887766",
    keyConditions: ["GERD"],
    keyAllergies: ["Erythromycin"],
  },
  {
    id: "apt-106",
    patientName: "Ahmed Mostafa Fawzy",
    patientNameAr: "أحمد مصطفى فوزي",
    nationalId: "28206250102288",
    age: 44,
    gender: "Male",
    time: "01:45 PM",
    reason: "Sleep Study Review (Obstructive Sleep Apnea)",
    status: "Scheduled",
    accessGranted: true,
    bloodType: "O-",
    phone: "01188776655",
    keyConditions: ["Severe OSA", "Hypertension"],
    keyAllergies: ["Iodinated Contrast"],
  },
];

/**
 * Fictional Access Requests for Patient & Doctor Portals
 */
export const DEMO_ACCESS_REQUESTS: AccessRequestItem[] = [
  {
    id: "ar-demo-1",
    requestId: "AR-DEMO-2026-01",
    doctorName: "Dr. Tarek Al-Husseini",
    doctorSpecialty: "Consultant Pulmonologist",
    hospitalClinic: "New Cairo Chest Clinic & Kasr Al Ainy",
    avatarUrl: "/assets/figma/avatars/doctor-sara.png",
    status: "pending",
    requestedDate: "Today, 09:15 AM",
    accessExpires: "Today, 09:15 PM (12 Hours)",
    reasonForAccess: "Clinical consultation, asthma management, and spirometry test review.",
    permissions: [
      { category: "Medical Records", details: "Diagnostic tests, spirometry & pulmonary exams", recordsCount: 2 },
      { category: "Prescriptions", details: "Current inhaled corticosteroids & bronchodilators", recordsCount: 2 },
      { category: "Allergies", details: "Penicillin & NSAID allergy profile", recordsCount: 2 },
    ],
    viewOnly: false,
    expiresText: "Active Request • Expires in 12 Hours",
    isBackendSupported: false,
  },
  {
    id: "ar-demo-2",
    requestId: "AR-DEMO-2026-02",
    doctorName: "Dr. Nader Mostafa",
    doctorSpecialty: "Radiology Specialist",
    hospitalClinic: "Misr Radiology Scan Center — Tagamoa",
    avatarUrl: "/assets/figma/avatars/doctor-omar.png",
    status: "approved",
    requestedDate: "Yesterday, 04:30 PM",
    accessExpires: "In 6 Days",
    reasonForAccess: "Upload and verified digital signing of chest PA radiographic DICOM scan.",
    permissions: [
      { category: "Radiology", details: "Chest imaging & DICOM telemetry", recordsCount: 1 },
    ],
    viewOnly: true,
    expiresText: "View Only • Active Grant",
    isBackendSupported: false,
  },
  {
    id: "ar-demo-3",
    requestId: "AR-DEMO-2026-03",
    doctorName: "Dr. Mona Ezzat",
    doctorSpecialty: "Clinical Pathologist",
    hospitalClinic: "Al Mokhtabar Diagnostics — New Cairo",
    avatarUrl: "/assets/figma/avatars/doctor-sara.png",
    status: "rejected",
    requestedDate: "10 Nov 2026, 11:00 AM",
    accessExpires: "Expired",
    reasonForAccess: "Automated laboratory data sync for complete blood count panel.",
    permissions: [
      { category: "Lab Tests", details: "Complete metabolic panel and CBC results", recordsCount: 1 },
    ],
    viewOnly: true,
    expiresText: "Declined by Patient",
    isBackendSupported: false,
  },
];
