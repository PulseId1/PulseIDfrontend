/**
 * PulseID Demo Service
 *
 * Isolated demonstration service layer providing full CRUD and state
 * management for offline demo scenarios.
 *
 * Guarantees:
 * - ZERO network calls to backend APIs.
 * - Stores local state exclusively in localStorage keys prefixed with 'pulseid_demo_'.
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
  DEMO_APPOINTMENTS,
  DEMO_MEDICAL_RECORDS,
  DEMO_ACCESS_REQUESTS,
  DemoAppointment,
  DemoDoctorProfile,
} from "./demo-data";

export const DEMO_STORAGE_KEYS = {
  PATIENT_PROFILE: "pulseid_demo_patient_profile",
  DOCTOR_PROFILE: "pulseid_demo_doctor_profile",
  APPOINTMENTS: "pulseid_demo_appointments",
  RECORDS: "pulseid_demo_medical_records",
  ACCESS_REQUESTS: "pulseid_demo_access_requests",
  SESSION: "pulseid_demo_session",
};

export class DemoService {
  /**
   * Retrieves the demo patient profile from local storage, falling back to initial fixtures.
   */
  static getPatientProfile(): UIPatientProfile {
    if (typeof window === "undefined") return INITIAL_DEMO_PATIENT;
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEYS.PATIENT_PROFILE);
      if (stored) {
        return JSON.parse(stored) as UIPatientProfile;
      }
    } catch {
      // Ignore JSON parse errors
    }
    return INITIAL_DEMO_PATIENT;
  }

  /**
   * Updates the demo patient profile in local demo storage.
   */
  static updatePatientProfile(updated: Partial<UIPatientProfile>): UIPatientProfile {
    const current = this.getPatientProfile();
    const merged: UIPatientProfile = { ...current, ...updated };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          DEMO_STORAGE_KEYS.PATIENT_PROFILE,
          JSON.stringify(merged)
        );
      } catch {}
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
        diagnosedDate: new Date().toISOString().split("T")[0],
        notes: notes || "Recorded in demo clinical consultation",
        severity: "Moderate",
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
        reaction: reaction || "Documented hypersensitivity reaction",
      },
    ];
    return this.updatePatientProfile({ allergyMenu: updated });
  }

  /**
   * Adds a medication entry to demo patient profile.
   */
  static addMedication(name: string, dosage: string, frequency = "Daily"): UIPatientProfile {
    const profile = this.getPatientProfile();
    const updated = [
      ...(profile.currentMedications || []),
      {
        id: Date.now(),
        name,
        dosage,
        frequency,
        prescribedBy: "Dr. Tarek Al-Husseini",
        startDate: new Date().toISOString().split("T")[0],
        status: "Active",
      },
    ];
    return this.updatePatientProfile({ currentMedications: updated });
  }

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
   * Retrieves demo doctor profile.
   */
  static getDoctorProfile(): DemoDoctorProfile {
    if (typeof window === "undefined") return INITIAL_DEMO_DOCTOR;
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEYS.DOCTOR_PROFILE);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_DEMO_DOCTOR;
  }

  /**
   * Updates demo doctor profile.
   */
  static updateDoctorProfile(updated: Partial<DemoDoctorProfile>): DemoDoctorProfile {
    const current = this.getDoctorProfile();
    const merged = { ...current, ...updated };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(DEMO_STORAGE_KEYS.DOCTOR_PROFILE, JSON.stringify(merged));
      } catch {}
    }
    return merged;
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
   */
  static searchPatientDirectory(query: string): DemoAppointment[] {
    const q = query.trim().toLowerCase();
    if (!q) return this.getAppointments();
    return this.getAppointments().filter(
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
    const patient = this.getAppointments().find(
      (a) => a.nationalId === patientNationalId
    );
    const newReq: AccessRequestItem = {
      id: `ar-demo-${Date.now()}`,
      requestId: `AR-DEMO-${Date.now()}`,
      doctorName: INITIAL_DEMO_DOCTOR.nameEn,
      doctorSpecialty: INITIAL_DEMO_DOCTOR.specialty,
      hospitalClinic: "New Cairo Chest Clinic & Kasr Al Ainy",
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

  /**
   * Resets all demo data to pristine initial fixtures.
   */
  static resetDemoData(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(DEMO_STORAGE_KEYS.PATIENT_PROFILE);
      localStorage.removeItem(DEMO_STORAGE_KEYS.DOCTOR_PROFILE);
      localStorage.removeItem(DEMO_STORAGE_KEYS.APPOINTMENTS);
      localStorage.removeItem(DEMO_STORAGE_KEYS.RECORDS);
      localStorage.removeItem(DEMO_STORAGE_KEYS.ACCESS_REQUESTS);
      // Ensure patient profile completed flag is true for smooth demo viewing
      localStorage.setItem("pulseid_patient_profile_completed", "true");
    } catch {}
  }
}
