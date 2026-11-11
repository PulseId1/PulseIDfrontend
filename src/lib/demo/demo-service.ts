/**
 * PulseID Demo Service
 *
 * Isolated demonstration service layer providing full CRUD, multi-account
 * registration, credentials validation, and state management for offline demo scenarios.
 *
 * Guarantees:
 * - ZERO network calls to backend APIs.
 * - Stores local state exclusively in localStorage keys prefixed with 'pulseid_demo_'.
 * - Supports registration, logout, and re-login with newly created demo accounts.
 * - Completely reset-able to initial pristine fixtures via resetDemoData().
 */

import {
  UIPatientProfile,
  MedicalRecordItem,
  AccessRequestItem,
  EmergencyContactDTO,
} from "@/lib/api/types";
import {
  INITIAL_DEMO_PATIENT,
  INITIAL_DEMO_DOCTOR,
  INITIAL_DEMO_ACCOUNTS,
  DEMO_APPOINTMENTS,
  DEMO_MEDICAL_RECORDS,
  DEMO_ACCESS_REQUESTS,
  DemoAppointment,
  DemoDoctorProfile,
  DemoAccount,
} from "./demo-data";

export const DEMO_STORAGE_KEYS = {
  ACCOUNTS: "pulseid_demo_accounts",
  ACTIVE_ACCOUNT_ID: "pulseid_demo_active_account_id",
  PATIENT_PROFILE: "pulseid_demo_patient_profile",
  DOCTOR_PROFILE: "pulseid_demo_doctor_profile",
  PATIENT_PROFILES_MAP: "pulseid_demo_patient_profiles_map",
  DOCTOR_PROFILES_MAP: "pulseid_demo_doctor_profiles_map",
  APPOINTMENTS: "pulseid_demo_appointments",
  RECORDS: "pulseid_demo_medical_records",
  ACCESS_REQUESTS: "pulseid_demo_access_requests",
  SESSION: "pulseid_demo_session",
};

export interface RegisterPatientInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  nationalId: string;
  birthDate: string;
  gender: "male" | "female";
  userName?: string;
  address?: string;
  state?: string;
  city?: string;
  bloodType?: string;
  bloodTypeId?: number;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  initialCondition?: string;
}

export interface RegisterDoctorInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  nationalId: string;
  birthDate: string;
  gender: "male" | "female";
  license: string;
  userName?: string;
  address?: string;
  state?: string;
  city?: string;
  specialty?: string;
  hospitalAffiliation?: string;
  clinicAddress?: string;
  title?: string;
  medicalLicenseName?: string;
  medicalLicenseSize?: number;
  professionalIdName?: string;
  professionalIdSize?: number;
}

export class DemoService {
  /**
   * Validates Egyptian mobile phone format (010, 011, 012, 015 + 8 digits).
   */
  static isEgyptianMobile(phone: string): boolean {
    const clean = phone.trim().replace(/^(\+20|0020)/, "").replace(/[\s-]/g, "");
    const formatted = clean.startsWith("0") ? clean : `0${clean}`;
    return /^01[0125][0-9]{8}$/.test(formatted);
  }

  /**
   * Fixed canonical demo OTP code.
   */
  static readonly DEMO_OTP = "1234";

  /**
   * Validates simulated prototype OTP. Accepts canonical 1234 or any 4 numeric digits.
   */
  static verifySimulatedOtp(otp: string): boolean {
    return /^\d{4}$/.test(otp.trim());
  }

  static isPhoneRegistered(phone: string): boolean {
    const accounts = this.getAccounts();
    const clean = phone.trim().replace(/^(\+20|0020)/, "").replace(/[\s-]/g, "");
    return accounts.some((a) => {
      const aClean = a.phone.trim().replace(/^(\+20|0020)/, "").replace(/[\s-]/g, "");
      return aClean === clean || aClean.replace(/^0+/, "") === clean.replace(/^0+/, "");
    });
  }

  static isNationalIdRegistered(nationalId: string): boolean {
    const accounts = this.getAccounts();
    return accounts.some((a) => a.nationalId === nationalId.trim());
  }

  static isEmailRegistered(email: string): boolean {
    const accounts = this.getAccounts();
    return accounts.some((a) => a.email.toLowerCase() === email.trim().toLowerCase());
  }
  // ==========================================================================
  // 1. DEMO ACCOUNT REGISTRY & AUTHENTICATION
  // ==========================================================================

  /**
   * Retrieves all demo accounts from local storage, falling back to initial fixtures.
   */
  static getAccounts(): DemoAccount[] {
    if (typeof window === "undefined") return INITIAL_DEMO_ACCOUNTS;
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEYS.ACCOUNTS);
      if (stored) {
        const parsed = JSON.parse(stored) as DemoAccount[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    // Initialize storage with initial fixtures if empty
    try {
      localStorage.setItem(
        DEMO_STORAGE_KEYS.ACCOUNTS,
        JSON.stringify(INITIAL_DEMO_ACCOUNTS)
      );
    } catch {}
    return INITIAL_DEMO_ACCOUNTS;
  }

  /**
   * Saves demo accounts to local storage.
   */
  static saveAccounts(accounts: DemoAccount[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(DEMO_STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
    } catch {}
  }

  /**
   * Finds an account by email, phone, username, or national ID.
   */
  static findAccountByIdentifier(identifier: string): DemoAccount | null {
    const raw = identifier.trim().toLowerCase();
    const cleanPhone = identifier.trim().replace(/^0+/, "");
    const accounts = this.getAccounts();

    return (
      accounts.find(
        (a) =>
          a.email.toLowerCase() === raw ||
          a.phone.toLowerCase() === raw ||
          a.phone.replace(/^0+/, "") === cleanPhone ||
          a.userName.toLowerCase() === raw ||
          a.nationalId === identifier.trim()
      ) || null
    );
  }

  /**
   * Authenticates against locally persisted demo accounts.
   */
  static authenticateDemo(
    identifier: string,
    password: string
  ): { success: boolean; account?: DemoAccount; error?: string } {
    const account = this.findAccountByIdentifier(identifier);
    if (!account) {
      return {
        success: false,
        error:
          "No demo account found with this phone or email. Please register or use the demo shortcuts.",
      };
    }

    if (account.password !== password) {
      return {
        success: false,
        error: "Incorrect password for this demo account.",
      };
    }

    this.setActiveAccount(account);
    return { success: true, account };
  }

  /**
   * Registers a new demo patient and initializes their personalized profile.
   */
  static registerDemoPatient(
    input: RegisterPatientInput
  ): { success: boolean; account?: DemoAccount; error?: string } {
    const accounts = this.getAccounts();

    // Check for duplicates
    const duplicate = accounts.find(
      (a) =>
        a.email.toLowerCase() === input.email.trim().toLowerCase() ||
        a.phone === input.phone.trim() ||
        a.nationalId === input.nationalId.trim()
    );

    if (duplicate) {
      return {
        success: false,
        error: "An account with this email, phone, or National ID already exists in demo storage.",
      };
    }

    const newId = `PT-DEMO-${Date.now().toString().slice(-6)}`;
    const newAccount: DemoAccount = {
      id: newId,
      role: "patient",
      typeId: 1,
      fullName: input.fullName.trim(),
      fullNameAr: input.fullName.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      password: input.password,
      userName: input.userName || input.email.trim().split("@")[0] || input.phone.trim(),
      nationalId: input.nationalId.trim(),
      gender: input.gender,
      birthDate: input.birthDate,
      createdAt: new Date().toISOString(),
      address: input.address || `${input.city || "Cairo"}, Egypt`,
      state: input.state || "Cairo",
      city: input.city || "New Cairo",
      bloodType: input.bloodType || "O+",
      bloodTypeId: input.bloodTypeId || 1,
      emergencyContactName: input.emergencyContactName,
      emergencyContactPhone: input.emergencyContactPhone,
      emergencyContactRelation: input.emergencyContactRelation,
      initialCondition: input.initialCondition,
    };

    // Initialize dedicated patient profile
    const newProfile: UIPatientProfile = {
      id: newId,
      nameEn: newAccount.fullName,
      nameAr: newAccount.fullName,
      nationalId: newAccount.nationalId,
      birthDate: `${newAccount.birthDate}T00:00:00.000Z`,
      genderTypeId: newAccount.gender === "male" ? 1 : 2,
      bloodTypeId: newAccount.bloodTypeId || 1,
      phone: newAccount.phone,
      email: newAccount.email,
      address: newAccount.address,
      emergencyContacts: newAccount.emergencyContactName
        ? [
            {
              id: `ec-${Date.now()}`,
              fullName: newAccount.emergencyContactName,
              phone: newAccount.emergencyContactPhone || "01000000000",
              relationship: newAccount.emergencyContactRelation || "Emergency Contact",
            },
          ]
        : [],
      chronicDiseases: newAccount.initialCondition
        ? [
            {
              id: 1,
              name: newAccount.initialCondition,
              date: new Date().toISOString().split("T")[0],
              notes: "Documented during patient portal registration.",
              status: "Active",
            },
          ]
        : [],
      allergyMenu: [],
      currentMedications: [],
      pastMedicalHistory: [],
      previousSurgicalProcedures: [],
    };

    const updatedAccounts = [...accounts, newAccount];
    this.saveAccounts(updatedAccounts);

    // Save profile in profile map & set active
    this.savePatientProfileMap(newId, newProfile);
    this.setActiveAccount(newAccount);

    // Add to clinic appointment list so doctors can find newly registered patients
    this.addPatientToAppointmentSchedule({
      id: `apt-${Date.now()}`,
      patientName: newAccount.fullName,
      patientNameAr: newAccount.fullName,
      nationalId: newAccount.nationalId,
      age: this.calculateAge(newAccount.birthDate),
      gender: newAccount.gender === "male" ? "Male" : "Female",
      time: "Pending Schedule",
      reason: newAccount.initialCondition || "Initial Healthcare Identity Registration",
      status: "Scheduled",
      accessGranted: true,
      bloodType: newAccount.bloodType || "O+",
      phone: newAccount.phone,
      keyConditions: newAccount.initialCondition ? [newAccount.initialCondition] : [],
      keyAllergies: [],
    });

    return { success: true, account: newAccount };
  }

  /**
   * Registers a new demo doctor and initializes their personalized credentials profile.
   */
  static registerDemoDoctor(
    input: RegisterDoctorInput
  ): { success: boolean; account?: DemoAccount; error?: string } {
    const accounts = this.getAccounts();

    // Check for duplicates
    const duplicate = accounts.find(
      (a) =>
        a.email.toLowerCase() === input.email.trim().toLowerCase() ||
        a.phone === input.phone.trim() ||
        a.nationalId === input.nationalId.trim() ||
        (input.license && a.license === input.license.trim())
    );

    if (duplicate) {
      return {
        success: false,
        error: "A doctor with this email, phone, National ID, or License already exists in demo storage.",
      };
    }

    const newId = `DOC-DEMO-${Date.now().toString().slice(-6)}`;
    const formattedName = input.fullName.trim().startsWith("Dr.")
      ? input.fullName.trim()
      : `Dr. ${input.fullName.trim()}`;

    const newAccount: DemoAccount = {
      id: newId,
      role: "doctor",
      typeId: 2,
      fullName: formattedName,
      fullNameAr: formattedName,
      email: input.email.trim(),
      phone: input.phone.trim(),
      password: input.password,
      userName: input.userName || input.email.trim().split("@")[0] || input.phone.trim(),
      nationalId: input.nationalId.trim(),
      gender: input.gender,
      birthDate: input.birthDate,
      createdAt: new Date().toISOString(),
      license: input.license.trim(),
      specialty: input.specialty || "General Medicine & Healthcare",
      hospitalAffiliation: input.hospitalAffiliation || "Cairo University Hospitals",
      clinicAddress: input.clinicAddress || `${input.city || "Cairo"}, Egypt`,
      title: input.title || `MD — Specialist ${input.specialty || "Physician"}`,
      address: input.address,
      state: input.state,
      city: input.city,
      medicalLicenseName: input.medicalLicenseName,
      medicalLicenseSize: input.medicalLicenseSize,
      professionalIdName: input.professionalIdName,
      professionalIdSize: input.professionalIdSize,
      verificationStatus: "verified",
    };

    // Initialize dedicated doctor profile
    const newProfile: DemoDoctorProfile = {
      id: newId,
      nameEn: newAccount.fullName,
      nameAr: newAccount.fullName,
      title: newAccount.title || "MD — Registered Healthcare Provider",
      specialty: newAccount.specialty || "General Medicine",
      licenseNumber: newAccount.license || "EG-MED-REG",
      nationalId: newAccount.nationalId,
      email: newAccount.email,
      phone: newAccount.phone,
      clinicAddress: newAccount.clinicAddress || "Cairo Medical Center, Egypt",
      hospitalAffiliations: [newAccount.hospitalAffiliation || "Cairo University Hospitals"],
      bio: "Clinician credentials verified under PulseID Egyptian Medical Syndicate protocols.",
      consultationHours: "09:00 AM - 05:00 PM (Daily)",
      rating: 5.0,
      totalPatients: 12,
      activeGrantsCount: 3,
      criticalReviewsCount: 0,
    };

    const updatedAccounts = [...accounts, newAccount];
    this.saveAccounts(updatedAccounts);

    // Save profile in profile map & set active
    this.saveDoctorProfileMap(newId, newProfile);
    this.setActiveAccount(newAccount);

    return { success: true, account: newAccount };
  }

  /**
   * Retrieves the currently active demo account.
   */
  static getActiveAccount(): DemoAccount | null {
    if (typeof window === "undefined") return INITIAL_DEMO_ACCOUNTS[0];
    try {
      const activeId = localStorage.getItem(DEMO_STORAGE_KEYS.ACTIVE_ACCOUNT_ID);
      if (activeId) {
        const found = this.getAccounts().find((a) => a.id === activeId);
        if (found) return found;
      }
      // Check session
      const sessionStr = localStorage.getItem(DEMO_STORAGE_KEYS.SESSION);
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        if (session.userId) {
          const found = this.getAccounts().find((a) => a.id === session.userId);
          if (found) return found;
        }
        if (session.role) {
          const found = this.getAccounts().find((a) => a.role === session.role);
          if (found) return found;
        }
      }
    } catch {}
    return INITIAL_DEMO_ACCOUNTS[0];
  }

  /**
   * Sets the active demo account and syncs active role profiles.
   */
  static setActiveAccount(account: DemoAccount): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(DEMO_STORAGE_KEYS.ACTIVE_ACCOUNT_ID, account.id);
      localStorage.setItem("pulseid_patient_profile_completed", "true");

      if (account.role === "patient") {
        const profile = this.getPatientProfile(account.id);
        localStorage.setItem(
          DEMO_STORAGE_KEYS.PATIENT_PROFILE,
          JSON.stringify(profile)
        );
      } else if (account.role === "doctor") {
        const docProfile = this.getDoctorProfile(account.id);
        localStorage.setItem(
          DEMO_STORAGE_KEYS.DOCTOR_PROFILE,
          JSON.stringify(docProfile)
        );
      }
    } catch {}
  }

  // ==========================================================================
  // 2. PATIENT PROFILE MANAGEMENT
  // ==========================================================================

  private static getPatientProfileMap(): Record<string, UIPatientProfile> {
    if (typeof window === "undefined") return {};
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEYS.PATIENT_PROFILES_MAP);
      if (stored) return JSON.parse(stored);
    } catch {}
    return {};
  }

  private static savePatientProfileMap(id: string, profile: UIPatientProfile): void {
    if (typeof window === "undefined") return;
    try {
      const map = this.getPatientProfileMap();
      map[id] = profile;
      localStorage.setItem(
        DEMO_STORAGE_KEYS.PATIENT_PROFILES_MAP,
        JSON.stringify(map)
      );
      localStorage.setItem(
        DEMO_STORAGE_KEYS.PATIENT_PROFILE,
        JSON.stringify(profile)
      );
    } catch {}
  }

  /**
   * Retrieves the demo patient profile for the active account or specified ID.
   */
  static getPatientProfile(accountId?: string): UIPatientProfile {
    if (typeof window === "undefined") return INITIAL_DEMO_PATIENT;
    try {
      const targetId =
        accountId ||
        localStorage.getItem(DEMO_STORAGE_KEYS.ACTIVE_ACCOUNT_ID) ||
        INITIAL_DEMO_PATIENT.id;

      // 1. Check profile map
      const map = this.getPatientProfileMap();
      if (targetId && map[targetId]) {
        return map[targetId];
      }

      // 2. Check active patient profile storage
      const stored = localStorage.getItem(DEMO_STORAGE_KEYS.PATIENT_PROFILE);
      if (stored) {
        const parsed = JSON.parse(stored) as UIPatientProfile;
        if (!accountId || parsed.id === accountId) return parsed;
      }
    } catch {}
    return INITIAL_DEMO_PATIENT;
  }

  /**
   * Updates the demo patient profile in local demo storage.
   */
  static updatePatientProfile(
    updated: Partial<UIPatientProfile>,
    accountId?: string
  ): UIPatientProfile {
    const current = this.getPatientProfile(accountId);
    const merged: UIPatientProfile = { ...current, ...updated };
    const id = merged.id || accountId || INITIAL_DEMO_PATIENT.id;

    if (id) {
      this.savePatientProfileMap(id, merged);
    }
    return merged;
  }

  /**
   * Adds an emergency contact to demo patient profile.
   */
  static addEmergencyContact(contact: EmergencyContactDTO): UIPatientProfile {
    const profile = this.getPatientProfile();
    const updatedContacts = [
      ...(profile.emergencyContacts || []),
      { ...contact, id: `ec-${Date.now()}` },
    ];
    return this.updatePatientProfile({ emergencyContacts: updatedContacts });
  }

  /**
   * Removes an emergency contact from demo patient profile.
   */
  static removeEmergencyContact(contactId: string): UIPatientProfile {
    const profile = this.getPatientProfile();
    const updatedContacts = (profile.emergencyContacts || []).filter(
      (c) => c.id !== contactId
    );
    return this.updatePatientProfile({ emergencyContacts: updatedContacts });
  }

  /**
   * Adds a clinical condition to demo patient profile.
   */
  static addChronicCondition(name: string, notes?: string): UIPatientProfile {
    const profile = this.getPatientProfile();
    const updated = [
      ...(profile.chronicDiseases || []),
      {
        id: Date.now(),
        name,
        date: new Date().toISOString().split("T")[0],
        notes: notes || "Recorded in demo clinical consultation",
        status: "Active",
      },
    ];
    return this.updatePatientProfile({ chronicDiseases: updated });
  }

  /**
   * Adds an allergy entry to demo patient profile.
   */
  static addAllergy(
    name: string,
    severity: "Moderate" | "Mild" | "Severe" = "Moderate",
    reaction?: string
  ): UIPatientProfile {
    const profile = this.getPatientProfile();
    const updated = [
      ...(profile.allergyMenu || []),
      {
        id: Date.now(),
        name,
        severity,
        reactionType: reaction || "Documented hypersensitivity reaction",
      },
    ];
    return this.updatePatientProfile({ allergyMenu: updated });
  }

  /**
   * Adds a medication entry to demo patient profile.
   */
  static addMedication(name: string, dosage: string, frequency = "Daily"): UIPatientProfile {
    const profile = this.getPatientProfile();
    const activeDoc = this.getDoctorProfile();
    const updated = [
      ...(profile.currentMedications || []),
      {
        id: Date.now(),
        name,
        dosage,
        frequency,
        assignedBy: activeDoc.nameEn || "Dr. Tarek Al-Husseini",
        date: new Date().toISOString().split("T")[0],
        status: "Active",
      },
    ];
    return this.updatePatientProfile({ currentMedications: updated });
  }

  // ==========================================================================
  // 3. DOCTOR PROFILE MANAGEMENT
  // ==========================================================================

  private static getDoctorProfileMap(): Record<string, DemoDoctorProfile> {
    if (typeof window === "undefined") return {};
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEYS.DOCTOR_PROFILES_MAP);
      if (stored) return JSON.parse(stored);
    } catch {}
    return {};
  }

  private static saveDoctorProfileMap(id: string, profile: DemoDoctorProfile): void {
    if (typeof window === "undefined") return;
    try {
      const map = this.getDoctorProfileMap();
      map[id] = profile;
      localStorage.setItem(
        DEMO_STORAGE_KEYS.DOCTOR_PROFILES_MAP,
        JSON.stringify(map)
      );
      localStorage.setItem(
        DEMO_STORAGE_KEYS.DOCTOR_PROFILE,
        JSON.stringify(profile)
      );
    } catch {}
  }

  /**
   * Retrieves demo doctor profile for the active account or specified ID.
   */
  static getDoctorProfile(accountId?: string): DemoDoctorProfile {
    if (typeof window === "undefined") return INITIAL_DEMO_DOCTOR;
    try {
      const targetId =
        accountId ||
        localStorage.getItem(DEMO_STORAGE_KEYS.ACTIVE_ACCOUNT_ID) ||
        INITIAL_DEMO_DOCTOR.id;

      // 1. Check profile map
      const map = this.getDoctorProfileMap();
      if (targetId && map[targetId]) {
        return map[targetId];
      }

      // 2. Check active doctor profile storage
      const stored = localStorage.getItem(DEMO_STORAGE_KEYS.DOCTOR_PROFILE);
      if (stored) {
        const parsed = JSON.parse(stored) as DemoDoctorProfile;
        if (!accountId || parsed.id === accountId) return parsed;
      }
    } catch {}
    return INITIAL_DEMO_DOCTOR;
  }

  /**
   * Updates demo doctor profile.
   */
  static updateDoctorProfile(
    updated: Partial<DemoDoctorProfile>,
    accountId?: string
  ): DemoDoctorProfile {
    const current = this.getDoctorProfile(accountId);
    const merged = { ...current, ...updated };
    const id = merged.id || accountId || INITIAL_DEMO_DOCTOR.id;

    if (id) {
      this.saveDoctorProfileMap(id, merged);
    }
    return merged;
  }

  // ==========================================================================
  // 4. RECORDS, APPOINTMENTS & CLINICAL ACCESS
  // ==========================================================================

  /**
   * Retrieves demo medical records.
   */
  static getMedicalRecords(): MedicalRecordItem[] {
    if (typeof window === "undefined") return DEMO_MEDICAL_RECORDS;
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEYS.RECORDS);
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEMO_MEDICAL_RECORDS;
  }

  /**
   * Adds a demo medical record locally.
   */
  static addMedicalRecord(record: Omit<MedicalRecordItem, "id">): MedicalRecordItem[] {
    const current = this.getMedicalRecords();
    const newRecord: MedicalRecordItem = {
      ...record,
      id: `rec-${Date.now()}`,
    };
    const updated = [newRecord, ...current];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(DEMO_STORAGE_KEYS.RECORDS, JSON.stringify(updated));
      } catch {}
    }
    return updated;
  }

  /**
   * Retrieves demo consultation appointments for today.
   */
  static getAppointments(): DemoAppointment[] {
    if (typeof window === "undefined") return DEMO_APPOINTMENTS;
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEYS.APPOINTMENTS);
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEMO_APPOINTMENTS;
  }

  /**
   * Adds a newly registered patient to doctor's consultation queue.
   */
  static addPatientToAppointmentSchedule(appointment: DemoAppointment): DemoAppointment[] {
    const current = this.getAppointments();
    const exists = current.some((a) => a.nationalId === appointment.nationalId);
    if (exists) return current;

    const updated = [appointment, ...current];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(DEMO_STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      } catch {}
    }
    return updated;
  }

  /**
   * Updates appointment status (e.g. Checked In -> In Progress -> Completed).
   */
  static updateAppointmentStatus(
    id: string,
    status: DemoAppointment["status"]
  ): DemoAppointment[] {
    const current = this.getAppointments();
    const updated = current.map((a) => (a.id === id ? { ...a, status } : a));
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(DEMO_STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      } catch {}
    }
    return updated;
  }

  /**
   * Searches demo patient directory by query (National ID or name).
   * Combines clinical appointments with all registered demo patients!
   */
  static searchPatientDirectory(query: string): DemoAppointment[] {
    const q = query.trim().toLowerCase();
    const appointments = this.getAppointments();
    const accounts = this.getAccounts().filter((a) => a.role === "patient");

    // Merge accounts that aren't in appointments yet
    const directory = [...appointments];
    for (const acc of accounts) {
      if (!directory.some((d) => d.nationalId === acc.nationalId)) {
        directory.push({
          id: `pt-dir-${acc.id}`,
          patientName: acc.fullName,
          patientNameAr: acc.fullNameAr || acc.fullName,
          nationalId: acc.nationalId,
          age: this.calculateAge(acc.birthDate),
          gender: acc.gender === "male" ? "Male" : "Female",
          time: "Registered Citizen",
          reason: acc.initialCondition || "General Consultation & Health Profile",
          status: "Scheduled",
          accessGranted: true,
          bloodType: acc.bloodType || "O+",
          phone: acc.phone,
          keyConditions: acc.initialCondition ? [acc.initialCondition] : [],
          keyAllergies: [],
        });
      }
    }

    if (!q) return directory;
    return directory.filter(
      (p) =>
        p.nationalId.includes(q) ||
        p.patientName.toLowerCase().includes(q) ||
        p.patientNameAr.includes(q)
    );
  }

  /**
   * Retrieves demo access requests.
   */
  static getAccessRequests(): AccessRequestItem[] {
    if (typeof window === "undefined") return DEMO_ACCESS_REQUESTS;
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEYS.ACCESS_REQUESTS);
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEMO_ACCESS_REQUESTS;
  }

  /**
   * Adds an access request created by the Doctor.
   */
  static createAccessRequest(
    patientNationalId: string,
    purpose: string,
    durationHours = 24
  ): AccessRequestItem {
    const current = this.getAccessRequests();
    const doc = this.getDoctorProfile();
    const patient = this.searchPatientDirectory(patientNationalId).find(
      (a) => a.nationalId === patientNationalId
    );

    const newReq: AccessRequestItem = {
      id: `ar-demo-${Date.now()}`,
      requestId: `AR-DEMO-${Date.now().toString().slice(-4)}`,
      doctorName: doc.nameEn,
      doctorSpecialty: doc.specialty,
      hospitalClinic: doc.clinicAddress || "PulseID Medical Network",
      avatarUrl: "/assets/figma/avatars/doctor-sara.png",
      requestedDate: "Just now",
      accessExpires: `In ${durationHours} Hours`,
      reasonForAccess: purpose || "Clinical consultation and diagnostics review",
      status: "pending",
      permissions: [
        {
          category: "Clinical Records",
          details: patient ? `Records for ${patient.patientName}` : "Diagnostic tests & clinical notes",
          recordsCount: 1,
        },
      ],
      viewOnly: false,
      expiresText: `Active Request • In ${durationHours} Hours`,
      isBackendSupported: false,
    };
    const updated = [newReq, ...current];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          DEMO_STORAGE_KEYS.ACCESS_REQUESTS,
          JSON.stringify(updated)
        );
      } catch {}
    }
    return newReq;
  }

  /**
   * Approves or rejects an access request from Patient perspective.
   */
  static respondToAccessRequest(
    requestId: string,
    action: "approve" | "reject"
  ): AccessRequestItem[] {
    const current = this.getAccessRequests();
    const updated: AccessRequestItem[] = current.map((req) => {
      if (req.id === requestId) {
        return {
          ...req,
          status: action === "approve" ? "approved" : "rejected",
        };
      }
      return req;
    });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          DEMO_STORAGE_KEYS.ACCESS_REQUESTS,
          JSON.stringify(updated)
        );
      } catch {}
    }
    return updated;
  }

  // ==========================================================================
  // 5. RESET DEMO DATA
  // ==========================================================================

  /**
   * Resets all demo data to pristine initial fixtures and accounts.
   */
  static resetDemoData(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(DEMO_STORAGE_KEYS.ACTIVE_ACCOUNT_ID);
      localStorage.removeItem(DEMO_STORAGE_KEYS.PATIENT_PROFILE);
      localStorage.removeItem(DEMO_STORAGE_KEYS.DOCTOR_PROFILE);
      localStorage.removeItem(DEMO_STORAGE_KEYS.PATIENT_PROFILES_MAP);
      localStorage.removeItem(DEMO_STORAGE_KEYS.DOCTOR_PROFILES_MAP);
      localStorage.removeItem(DEMO_STORAGE_KEYS.APPOINTMENTS);
      localStorage.removeItem(DEMO_STORAGE_KEYS.RECORDS);
      localStorage.removeItem(DEMO_STORAGE_KEYS.ACCESS_REQUESTS);

      // Re-seed initial accounts
      localStorage.setItem(
        DEMO_STORAGE_KEYS.ACCOUNTS,
        JSON.stringify(INITIAL_DEMO_ACCOUNTS)
      );

      // Ensure profile completion flag
      localStorage.setItem("pulseid_patient_profile_completed", "true");
    } catch {}
  }

  static calculateAge(birthDateStr?: string): number {
    if (!birthDateStr) return 30;
    try {
      const birth = new Date(birthDateStr);
      const now = new Date();
      let age = now.getFullYear() - birth.getFullYear();
      const m = now.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
        age--;
      }
      return age > 0 ? age : 28;
    } catch {
      return 28;
    }
  }
}
