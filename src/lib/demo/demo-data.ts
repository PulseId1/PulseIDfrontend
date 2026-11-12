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

import {
  UIPatientProfile,
  MedicalRecordItem,
  AccessRequestItem,
  StatesDTO,
  CitysDTO,
} from "@/lib/api/types";

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

export interface DemoAccount {
  id: string;
  role: "patient" | "doctor" | "pharmacist";
  typeId: 1 | 2 | 3;
  fullName: string;
  fullNameAr?: string;
  email: string;
  phone: string;
  nationalId: string;
  password: string;
  userName: string;
  gender: "male" | "female";
  birthDate: string;
  createdAt: string;
  address?: string;
  state?: string;
  city?: string;
  // Patient specific
  bloodType?: string;
  bloodTypeId?: number;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  initialCondition?: string;
  // Doctor specific
  license?: string;
  specialty?: string;
  hospitalAffiliation?: string;
  title?: string;
  clinicAddress?: string;
  medicalLicenseName?: string;
  medicalLicenseSize?: number;
  professionalIdName?: string;
  professionalIdSize?: number;
  verificationStatus?: "verified" | "pending";
}

/**
 * Predefined Demonstration Accounts
 * Includes default Egyptian fixtures for Sara Mahmoud Ibrahim (Patient)
 * and Dr. Tarek Al-Husseini (Doctor), alongside accounts dynamically
 * registered during the user session.
 */
export const INITIAL_DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "PT-DEMO-2026-01",
    role: "patient",
    typeId: 1,
    fullName: "Sara Mahmoud Ibrahim",
    fullNameAr: "سارة محمود إبراهيم",
    email: "sara.mahmoud@pulseid-demo.eg",
    phone: "01098765432",
    userName: "sara.mahmoud",
    nationalId: "29804120108924",
    password: "Password123!",
    gender: "female",
    birthDate: "1998-04-12",
    createdAt: "2026-11-01T00:00:00.000Z",
    address: "5th Settlement, New Cairo, Egypt",
    state: "Cairo",
    city: "New Cairo",
    bloodType: "A+",
    bloodTypeId: 1,
    emergencyContactName: "Mahmoud Ibrahim",
    emergencyContactPhone: "01001234567",
    emergencyContactRelation: "Father",
    initialCondition: "Bronchial Asthma",
  },
  {
    id: "DOC-DEMO-8842",
    role: "doctor",
    typeId: 2,
    fullName: "Dr. Tarek Al-Husseini",
    fullNameAr: "د. طارق الحسيني",
    email: "dr.tarek.husseini@pulseid-demo.eg",
    phone: "01223456789",
    userName: "dr.tarek",
    nationalId: "28405160109988",
    password: "Password123!",
    gender: "male",
    birthDate: "1984-05-16",
    createdAt: "2026-11-01T00:00:00.000Z",
    address: "Suite 402, Elite Medical Tower, Road 90, New Cairo, Egypt",
    state: "Cairo",
    city: "New Cairo",
    license: "EG-MED-491028",
    specialty: "Pulmonology, Allergy & Critical Care Medicine",
    hospitalAffiliation: "Kasr Al Ainy University Hospitals & New Cairo Specialized Hospital",
    title: "MD, FCCP — Senior Consultant Pulmonologist",
    clinicAddress: "Suite 402, Elite Medical Tower, Road 90, New Cairo, Egypt",
  },
];

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

/**
 * Demo Egyptian Governorates (States)
 * Complete reference dataset representing all 27 Egyptian governorates.
 */
export const DEMO_EGYPTIAN_STATES: StatesDTO[] = [
  { id: 1, nameEn: "Cairo", nameAr: "القاهرة" },
  { id: 2, nameEn: "Giza", nameAr: "الجيزة" },
  { id: 3, nameEn: "Alexandria", nameAr: "الإسكندرية" },
  { id: 4, nameEn: "Qalyubia", nameAr: "القليوبية" },
  { id: 5, nameEn: "Sharqia", nameAr: "الشرقية" },
  { id: 6, nameEn: "Dakahlia", nameAr: "الدقهلية" },
  { id: 7, nameEn: "Gharbia", nameAr: "الغربية" },
  { id: 8, nameEn: "Monufia", nameAr: "المنوفية" },
  { id: 9, nameEn: "Beheira", nameAr: "البحيرة" },
  { id: 10, nameEn: "Kafr El Sheikh", nameAr: "كفر الشيخ" },
  { id: 11, nameEn: "Damietta", nameAr: "دمياط" },
  { id: 12, nameEn: "Port Said", nameAr: "بورسعيد" },
  { id: 13, nameEn: "Ismailia", nameAr: "الإسماعيلية" },
  { id: 14, nameEn: "Suez", nameAr: "السويس" },
  { id: 15, nameEn: "Red Sea", nameAr: "البحر الأحمر" },
  { id: 16, nameEn: "South Sinai", nameAr: "جنوب سيناء" },
  { id: 17, nameEn: "North Sinai", nameAr: "شمال سيناء" },
  { id: 18, nameEn: "Faiyum", nameAr: "الفيوم" },
  { id: 19, nameEn: "Beni Suef", nameAr: "بني سويف" },
  { id: 20, nameEn: "Minya", nameAr: "المنيا" },
  { id: 21, nameEn: "Asyut", nameAr: "أسيوط" },
  { id: 22, nameEn: "Sohag", nameAr: "سوهاج" },
  { id: 23, nameEn: "Qena", nameAr: "قنا" },
  { id: 24, nameEn: "Luxor", nameAr: "الأقصر" },
  { id: 25, nameEn: "Aswan", nameAr: "أسوان" },
  { id: 26, nameEn: "Matrouh", nameAr: "مطروح" },
  { id: 27, nameEn: "New Valley", nameAr: "الوادي الجديد" },
];

/**
 * Demo Egyptian Cities & Districts
 * Structured with foreign-key stateId referencing DEMO_EGYPTIAN_STATES.
 */
export const DEMO_EGYPTIAN_CITIES: CitysDTO[] = [
  // Cairo (stateId: 1)
  { id: 101, stateId: 1, nameEn: "New Cairo (Tagamoa)", nameAr: "القاهرة الجديدة" },
  { id: 102, stateId: 1, nameEn: "Nasr City", nameAr: "مدينة نصر" },
  { id: 103, stateId: 1, nameEn: "Maadi", nameAr: "المعادي" },
  { id: 104, stateId: 1, nameEn: "Heliopolis (Masr El Gedida)", nameAr: "مصر الجديدة" },
  { id: 105, stateId: 1, nameEn: "Zamalek", nameAr: "الزمالك" },
  { id: 106, stateId: 1, nameEn: "Downtown Cairo", nameAr: "وسط البلد" },
  { id: 107, stateId: 1, nameEn: "Shorouk City", nameAr: "مدينة الشروق" },
  { id: 108, stateId: 1, nameEn: "Madinaty", nameAr: "مدينتي" },
  { id: 109, stateId: 1, nameEn: "Mokattam", nameAr: "المقطم" },
  { id: 110, stateId: 1, nameEn: "Rehab City", nameAr: "مدينة الرحاب" },

  // Giza (stateId: 2)
  { id: 201, stateId: 2, nameEn: "6th of October City", nameAr: "مدينة 6 أكتوبر" },
  { id: 202, stateId: 2, nameEn: "Sheikh Zayed City", nameAr: "مدينة الشيخ زايد" },
  { id: 203, stateId: 2, nameEn: "Dokki", nameAr: "الدقي" },
  { id: 204, stateId: 2, nameEn: "Mohandessin", nameAr: "المهندسين" },
  { id: 205, stateId: 2, nameEn: "Haram", nameAr: "الهرم" },
  { id: 206, stateId: 2, nameEn: "Faisal", nameAr: "فيصل" },
  { id: 207, stateId: 2, nameEn: "Agouza", nameAr: "العجوزة" },
  { id: 208, stateId: 2, nameEn: "Giza City", nameAr: "مدينة الجيزة" },

  // Alexandria (stateId: 3)
  { id: 301, stateId: 3, nameEn: "Smouha", nameAr: "سموحة" },
  { id: 302, stateId: 3, nameEn: "Sidi Gaber", nameAr: "سيدي جابر" },
  { id: 303, stateId: 3, nameEn: "Montaza", nameAr: "المنتزه" },
  { id: 304, stateId: 3, nameEn: "Gleem", nameAr: "جليم" },
  { id: 305, stateId: 3, nameEn: "Stanly", nameAr: "ستانلي" },
  { id: 306, stateId: 3, nameEn: "Miami", nameAr: "ميامي" },
  { id: 307, stateId: 3, nameEn: "Borg El Arab", nameAr: "برج العرب" },

  // Qalyubia (stateId: 4)
  { id: 401, stateId: 4, nameEn: "Banha", nameAr: "بنها" },
  { id: 402, stateId: 4, nameEn: "Shubra El Kheima", nameAr: "شبرا الخيمة" },
  { id: 403, stateId: 4, nameEn: "Obour City", nameAr: "مدينة العبور" },

  // Sharqia (stateId: 5)
  { id: 501, stateId: 5, nameEn: "Zagazig", nameAr: "الزقازيق" },
  { id: 502, stateId: 5, nameEn: "10th of Ramadan", nameAr: "العاشر من رمضان" },

  // Dakahlia (stateId: 6)
  { id: 601, stateId: 6, nameEn: "Mansoura", nameAr: "المنصورة" },
  { id: 602, stateId: 6, nameEn: "Mit Ghamr", nameAr: "ميت غمر" },

  // Gharbia (stateId: 7)
  { id: 701, stateId: 7, nameEn: "Tanta", nameAr: "طنطا" },
  { id: 702, stateId: 7, nameEn: "El Mahalla El Kubra", nameAr: "المحلة الكبرى" },

  // Monufia (stateId: 8)
  { id: 801, stateId: 8, nameEn: "Shibin El Kom", nameAr: "شبين الكوم" },
  { id: 802, stateId: 8, nameEn: "Sadat City", nameAr: "مدينة السادات" },

  // Beheira (stateId: 9)
  { id: 901, stateId: 9, nameEn: "Damanhour", nameAr: "دمنهور" },

  // Kafr El Sheikh (stateId: 10)
  { id: 1001, stateId: 10, nameEn: "Kafr El Sheikh City", nameAr: "كفر الشيخ" },

  // Damietta (stateId: 11)
  { id: 1101, stateId: 11, nameEn: "Damietta City", nameAr: "دمياط" },
  { id: 1102, stateId: 11, nameEn: "New Damietta", nameAr: "دمياط الجديدة" },

  // Port Said (stateId: 12)
  { id: 1201, stateId: 12, nameEn: "Port Said City", nameAr: "مدينة بورسعيد" },
  { id: 1202, stateId: 12, nameEn: "Port Fouad", nameAr: "بورفؤاد" },

  // Ismailia (stateId: 13)
  { id: 1301, stateId: 13, nameEn: "Ismailia City", nameAr: "الإسماعيلية" },

  // Suez (stateId: 14)
  { id: 1401, stateId: 14, nameEn: "Suez City", nameAr: "السويس" },
  { id: 1402, stateId: 14, nameEn: "Ain Sokhna", nameAr: "العين السخنة" },

  // Red Sea (stateId: 15)
  { id: 1501, stateId: 15, nameEn: "Hurghada", nameAr: "الغردقة" },
  { id: 1502, stateId: 15, nameEn: "El Gouna", nameAr: "الجونة" },

  // South Sinai (stateId: 16)
  { id: 1601, stateId: 16, nameEn: "Sharm El Sheikh", nameAr: "شرم الشيخ" },
  { id: 1602, stateId: 16, nameEn: "Dahab", nameAr: "دهب" },

  // North Sinai (stateId: 17)
  { id: 1701, stateId: 17, nameEn: "Arish", nameAr: "العريش" },

  // Faiyum (stateId: 18)
  { id: 1801, stateId: 18, nameEn: "Faiyum City", nameAr: "مدينة الفيوم" },

  // Beni Suef (stateId: 19)
  { id: 1901, stateId: 19, nameEn: "Beni Suef City", nameAr: "مدينة بني سويف" },

  // Minya (stateId: 20)
  { id: 2001, stateId: 20, nameEn: "Minya City", nameAr: "مدينة المنيا" },

  // Asyut (stateId: 21)
  { id: 2101, stateId: 21, nameEn: "Asyut City", nameAr: "مدينة أسيوط" },

  // Sohag (stateId: 22)
  { id: 2201, stateId: 22, nameEn: "Sohag City", nameAr: "مدينة سوهاج" },

  // Qena (stateId: 23)
  { id: 2301, stateId: 23, nameEn: "Qena City", nameAr: "مدينة قنا" },

  // Luxor (stateId: 24)
  { id: 2401, stateId: 24, nameEn: "Luxor City", nameAr: "مدينة الأقصر" },

  // Aswan (stateId: 25)
  { id: 2501, stateId: 25, nameEn: "Aswan City", nameAr: "مدينة أسوان" },

  // Matrouh (stateId: 26)
  { id: 2601, stateId: 26, nameEn: "Marsa Matrouh", nameAr: "مرسى مطروح" },
  { id: 2602, stateId: 26, nameEn: "North Coast / Sahel", nameAr: "الساحل الشمالي" },

  // New Valley (stateId: 27)
  { id: 2701, stateId: 27, nameEn: "Kharga", nameAr: "الخارجة" },
];
