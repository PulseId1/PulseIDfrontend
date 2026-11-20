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
    id: "PID-8924-EGY",
    role: "patient",
    typeId: 1,
    fullName: "Ahmed Hassan",
    fullNameAr: "أحمد حسن",
    email: "ahmed.hassan@pulseid-demo.eg",
    phone: "01012345678",
    userName: "ahmed.hassan",
    nationalId: "29209140108924",
    password: "Password123!",
    gender: "male",
    birthDate: "1992-09-14",
    createdAt: "2026-11-01T00:00:00.000Z",
    address: "Nasr City, Cairo, Egypt",
    state: "Cairo",
    city: "Nasr City",
    bloodType: "O+",
    bloodTypeId: 1,
    emergencyContactName: "Hassan Mohamed",
    emergencyContactPhone: "01001234567",
    emergencyContactRelation: "Father",
    initialCondition: "Mild Hypertension",
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
  {
    id: "PH-284",
    role: "pharmacist",
    typeId: 3,
    fullName: "Pharmacist Mohamed Ali",
    fullNameAr: "صيدلي محمد علي",
    email: "mohamed.ali@pulseid-demo.eg",
    phone: "01123456789",
    userName: "ph.mohamed",
    nationalId: "28807150104821",
    password: "Password123!",
    gender: "male",
    birthDate: "1988-07-15",
    createdAt: "2026-11-01T00:00:00.000Z",
    address: "Al Shifa Pharmacy, El Merghany St, Heliopolis, Cairo, Egypt",
    state: "Cairo",
    city: "Heliopolis",
    license: "PH-2841-EGY",
    specialty: "Clinical Pharmacy & Medication Safety Review",
    hospitalAffiliation: "Al Shifa Pharmacy Network",
    title: "PharmD — Lead Clinical Pharmacist",
    clinicAddress: "Al Shifa Pharmacy, Branch 12, Heliopolis, Cairo",
  },
];

/**
 * Primary Fictional Demo Patient: Ahmed Hassan (Matching Figma Node 299:1910 / 299:4931)
 * Authentic Egyptian patient profile with Mild Hypertension, Penicillin allergy,
 * verified prescriptions, lab records, and emergency contacts.
 */
export const INITIAL_DEMO_PATIENT: UIPatientProfile = {
  id: "PID-8924-EGY",
  nameEn: "Ahmed Hassan",
  nameAr: "أحمد حسن",
  nationalId: "29209140108924",
  birthDate: "1992-09-14T00:00:00.000Z",
  genderTypeId: 1, // Male
  bloodTypeId: 1, // O+
  phone: "01012345678",
  email: "ahmed.hassan@pulseid-demo.eg",
  address: "Nasr City, Cairo, Egypt",
  emergencyContacts: [
    {
      id: "ec-1",
      fullName: "Hassan Mohamed",
      phone: "01001234567",
      relationship: "Father",
    },
    {
      id: "ec-2",
      fullName: "Mariam Hassan",
      phone: "01123456789",
      relationship: "Sister",
    },
  ],
  chronicDiseases: [
    {
      id: 1,
      name: "Mild Hypertension",
      date: "Jan 2025",
      notes: "Essential hypertension. Monitored via Connected Omron Device Ecosystem.",
      status: "Active Follow-up",
      latestReading: "128/82 mmHg",
      connectedDevice: "Omron Evolv BP7000",
      assignedTherapy: "Lisinopril 10mg",
      physician: "Dr. Sherif Mansour",
    },
    {
      id: 2,
      name: "Asthma (Mild Intermittent)",
      date: "Nov 2024",
      notes: "Verified with Ministry of Health National Respiratory Registry.",
      status: "Seasonal Trigger",
      assignedTherapy: "Ventolin Inhaler (100mcg)",
      physician: "Al-Borg Diagnostic Center",
      triggers: ["Cold Weather", "Dust & Pollen", "Vigorous Cardio"],
      emergencyProtocol: "2 puffs as needed for wheezing or prior to heavy exercise.",
    },
  ],
  allergyMenu: [
    {
      id: 1,
      name: "Penicillin",
      severity: "Severe",
      reactionType: "Anaphylaxis risk",
      date: "Documented 2020",
    },
    {
      id: 2,
      name: "Dust Mites",
      severity: "Moderate",
      reactionType: "Respiratory allergy",
      date: "Documented 2022",
    },
  ],
  currentMedications: [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10 mg tablet",
      frequency: "1 tablet daily (Morning)",
      assignedBy: "Dr. Sherif Mansour",
      date: "2025-01-10",
      status: "Active",
    },
    {
      id: 2,
      name: "Ventolin Inhaler",
      dosage: "100 mcg inhaler",
      frequency: "2 puffs as needed",
      assignedBy: "Dr. Laila Mostafa",
      date: "2024-11-08",
      status: "Active",
    },
  ],
  pastMedicalHistory: [
    {
      id: 1,
      name: "Pneumonia",
      date: "Winter 2022",
      conditionDescription: "Treated as outpatient at Cleopatra Hospital. Full resolution.",
      recoveryStatus: "Fully Resolved",
    },
    {
      id: 2,
      name: "Concussion",
      date: "Summer 2019",
      conditionDescription: "Sports-related mild concussion. CT scan clear. Full recovery.",
      recoveryStatus: "Resolved",
    },
  ],
  previousSurgicalProcedures: [
    {
      id: 1,
      name: "Appendectomy (2018)",
      date: "June 2018",
      hospital: "Dar Al Fouad Hospital",
      surgeon: "Dr. Tarek Mansour",
      reason: "Acute appendicitis; uncomplicated laparoscopic procedure under general anesthesia.",
    },
  ],
};

/**
 * Fictional Demo Patient Medical Records
 */
export const DEMO_MEDICAL_RECORDS: MedicalRecordItem[] = [
  // --- 1. Medical History (Figma Node 299:3677) ---
  {
    id: "rec-his-1",
    category: "history",
    title: "Community-acquired pneumonia",
    subtitle: "Jun 18–25, 2023 • Dr. Omar Farouk • Internal Medicine",
    date: "Jun 18–25, 2023",
    facility: "Cairo University Hospital",
    doctor: "Dr. Omar Farouk",
    statusBadge: { label: "Recovered", variant: "normal" },
    description: "Condition: Right lower-lobe pneumonia, treated as an outpatient. Treatment: Seven-day antibiotic course, hydration and clinical follow-up. Recovery: Symptoms resolved; no ongoing respiratory limitations.",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-his-2",
    category: "history",
    title: "Mild concussion",
    subtitle: "Jun 03–17, 2024 • Dr. Mona El-Shazly • Neurology",
    date: "Jun 03–17, 2024",
    facility: "Al Borg Medical Center",
    doctor: "Dr. Mona El-Shazly",
    statusBadge: { label: "Recovered", variant: "normal" },
    description: "Condition: Headache and dizziness after a minor sports injury; no loss of consciousness. Treatment: Relative rest and a gradual return to normal activities. Recovery: Symptoms resolved at follow-up; no persistent neurological deficit.",
    pdfAvailable: true,
    isBackendSupported: false,
  },

  // --- 2. Lab Tests & Biomarkers (Figma Node 568:3272) ---
  {
    id: "rec-lab-1",
    category: "labs",
    title: "Fasting Blood Glucose",
    subtitle: "Requested by: Dr. Sherif Mansour • Laboratory: Al Borg Diagnostics, Maadi Branch• Date: Aug 14, 2024",
    date: "Aug 14, 2024",
    facility: "Al Borg Diagnostics, Maadi Branch",
    doctor: "Dr. Sherif Mansour",
    statusBadge: { label: "Normal (94 mg/dL)", variant: "normal" },
    metrics: [
      { label: "Fasting Baseline", value: "70 mg/dL" },
      { label: "Patient", value: "94 mg/dL" },
      { label: "Upper Normal", value: "99 mg/dL" },
    ],
    findings: "Optimal Clinical Range (70–99 mg/dL). Within safe physiological threshold.",
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
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-lab-3",
    category: "labs",
    title: "Complete Blood Count (CBC)",
    subtitle: "Requested by: Dr. Sherif Mansour • Laboratory: Al Borg Diagnostics • Verified through automated serum spectrometry • Ref: LP-90218",
    date: "14 Aug 2024",
    facility: "Al Borg Diagnostics",
    doctor: "Dr. Sherif Mansour",
    statusBadge: { label: "Within range", variant: "normal" },
    description: "Hemoglobin: 14.8 g/dL (13.5–17.5) • WBC: 6.4 ×10⁹/L (4.0–11.0) Platelets: 245 ×10⁹/L (150–450) • Hematocrit: 44% (41–53) Interpretation: No anemia, leukocytosis or platelet abnormality.",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-lab-4",
    category: "labs",
    title: "Chest PA Digital Radiograph (X-Ray)",
    subtitle: "Requested by: Dr. Tarek Ezzat • Imaging Center: Cairo Scan Diagnostic Imaging • Study ID: XR-2024-884 • Radiologist: Dr. Nader Fouad",
    date: "14 Aug 2024",
    facility: "Cairo Scan Diagnostic Imaging",
    doctor: "Dr. Nader Fouad",
    statusBadge: { label: "DICOM Ready", variant: "active" },
    findings: "Radiologist Impression: Lungs are clear of acute focal infiltrates, consolidation, or pleural effusion. Cardiothoracic ratio is normal. Skeletal thorax architecture intact.",
    dicomViewerUrl: "#dicom",
    downloadUrl: "#download",
    pdfAvailable: true,
    isBackendSupported: false,
  },

  // --- 3. Radiology & X-rays (Figma Node 299:3959) ---
  {
    id: "rec-rad-1",
    category: "radiology",
    title: "Chest PA Digital Radiograph",
    subtitle: "Aug 14, 2024 • XR-2024-884 • Dr. Nader Fouad",
    date: "Aug 14, 2024",
    facility: "Cairo Scan Diagnostic Imaging",
    doctor: "Dr. Nader Fouad",
    statusBadge: { label: "No acute findings", variant: "normal" },
    findings: "Cairo Scan Diagnostic Imaging Findings: Lungs clear; no focal infiltrates, consolidation or pleural effusion. Normal cardiothoracic ratio; skeletal thorax intact.",
    dicomViewerUrl: "#dicom",
    downloadUrl: "#download",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-rad-2",
    category: "radiology",
    title: "Brain MRI",
    subtitle: "Jun 04, 2024 • MRI-2024-1092 • Dr. Mona El-Shazly",
    date: "Jun 04, 2024",
    facility: "Al Borg Scan & Radiology Center",
    doctor: "Dr. Mona El-Shazly",
    statusBadge: { label: "Normal study", variant: "normal" },
    findings: "Al Borg Scan & Radiology Center Findings: No acute infarct, intracranial hemorrhage or mass effect. Normal ventricular size. No structural abnormality following the concussion.",
    dicomViewerUrl: "#dicom",
    downloadUrl: "#download",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-rad-3",
    category: "radiology",
    title: "Head CT without contrast",
    subtitle: "Jun 03, 2024 • CT-2024-615 • Dr. Nader Fouad",
    date: "Jun 03, 2024",
    facility: "Cairo Scan Diagnostic Imaging",
    doctor: "Dr. Nader Fouad",
    statusBadge: { label: "No acute findings", variant: "normal" },
    findings: "Cairo Scan Diagnostic Imaging Findings: No acute intracranial hemorrhage, skull fracture or midline shift. Clinical follow-up recommended for persistent symptoms.",
    dicomViewerUrl: "#dicom",
    downloadUrl: "#download",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-rad-4",
    category: "radiology",
    title: "Abdominal ultrasound",
    subtitle: "Jul 22, 2024 • US-2024-338 • Dr. Salma Adel",
    date: "Jul 22, 2024",
    facility: "Al Borg Scan & Radiology Center",
    doctor: "Dr. Salma Adel",
    statusBadge: { label: "Normal study", variant: "normal" },
    findings: "Al Borg Scan & Radiology Center Findings: Normal liver echogenicity; no gallstones or biliary dilatation. Kidneys normal in size with no hydronephrosis.",
    dicomViewerUrl: "#dicom",
    downloadUrl: "#download",
    pdfAvailable: true,
    isBackendSupported: false,
  },

  // --- 4. Medical Diagnoses (Figma Node 299:4299) ---
  {
    id: "rec-diag-1",
    category: "diagnoses",
    title: "Community-acquired pneumonia",
    subtitle: "Jun 18, 2023 • Dr. Omar Farouk • Internal Medicine",
    date: "Jun 18, 2023",
    facility: "Cairo University Hospital",
    doctor: "Dr. Omar Farouk",
    statusBadge: { label: "Moderate · resolved", variant: "normal" },
    description: "Description: Acute right lower-lobe respiratory infection with cough and fever. Treatment: Outpatient antibiotic course and supportive care. Follow-up: Full clinical recovery documented Jun 25, 2023.",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-diag-2",
    category: "diagnoses",
    title: "Concussion without loss of consciousness",
    subtitle: "Jun 03, 2024 • Dr. Mona El-Shazly • Neurology",
    date: "Jun 03, 2024",
    facility: "Al Borg Medical Center",
    doctor: "Dr. Mona El-Shazly",
    statusBadge: { label: "Mild · resolved", variant: "normal" },
    description: "Description: Transient headache and dizziness following a sports injury. Assessment: CT and subsequent MRI showed no acute structural injury. Follow-up: Symptoms resolved by Jun 17, 2024.",
    pdfAvailable: true,
    isBackendSupported: false,
  },
  {
    id: "rec-diag-3",
    category: "diagnoses",
    title: "Borderline LDL elevation",
    subtitle: "Aug 14, 2024 • Dr. Omar Farouk • Internal Medicine",
    date: "Aug 14, 2024",
    facility: "Cairo University Hospital",
    doctor: "Dr. Omar Farouk",
    statusBadge: { label: "Mild · monitored", variant: "normal" },
    description: "Description: LDL cholesterol 102 mg/dL, within the near-optimal range. Plan: Heart-healthy diet and regular physical activity; no medication initiated. Follow-up: Routine lipid reassessment at the next annual review.",
    pdfAvailable: true,
    isBackendSupported: false,
  },

  // --- 5. Prescriptions (Figma Node 564:1662) ---
  {
    id: "rec-rx-1",
    category: "prescriptions",
    title: "Amoxicillin + Paracetamol",
    subtitle: "RX-240814-01 • Issued Aug 14, 2024",
    date: "Aug 14, 2024",
    facility: "Mariam Adel · El Ezaby Pharmacy, Maadi",
    doctor: "Dr. Nader Fouad · Internal Medicine",
    statusBadge: { label: "DISPENSED", variant: "active" },
    description: "Amoxicillin 500 mg • Paracetamol 500 mg",
    findings: "Verified therapeutic prescription: Amoxicillin 500 mg (Three times daily) & Paracetamol 500 mg (As needed for pain/fever). Zero contraindications detected.",
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
    statusBadge: { label: "DISPENSED", variant: "active" },
    description: "Augmentin 625 mg • Cataflam 50 mg",
    findings: "Verified therapeutic prescription: Augmentin 625 mg (Twice daily after meals) & Cataflam 50 mg (Twice daily for inflammation). Zero drug interactions.",
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
    statusBadge: { label: "DISPENSED", variant: "active" },
    description: "Cholecalciferol 50,000 IU",
    findings: "Verified maintenance therapy: Cholecalciferol (Vitamin D3) 50,000 IU capsule once weekly with food for 8 weeks.",
    pdfAvailable: true,
    isBackendSupported: false,
  },

  // --- 6. OTC Dispensing (Figma Node 526:10081) ---
  {
    id: "rec-otc-preview",
    category: "otc",
    title: "Medication name & brand: Not provided",
    subtitle: "Record layout preview • No dispensing data supplied",
    date: "Historical Record",
    facility: "Pharmacy name: Not provided",
    doctor: "Dispensed by: Not provided",
    statusBadge: { label: "OTC · Read-only", variant: "normal" },
    description: "Historical dispensing records are read-only. No OTC transaction data supplied.",
    findings: "Active ingredient: Not provided • Strength & dosage form: Not provided • Dispensed quantity: Not provided • Dosage instructions: Not provided",
    pdfAvailable: false,
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
