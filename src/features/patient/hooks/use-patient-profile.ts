"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PatientService, EMPTY_PATIENT_PROFILE } from "@/lib/api/patient-service";
import { UIPatientProfile, EmergencyContactDTO } from "@/lib/api/patient-types";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

export function formatDateOfBirth(dateStr?: string | null): string {
  if (!dateStr) return "Not recorded";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isMedicalProfileComplete(p: UIPatientProfile): boolean {
  return Boolean(p.birthDate && p.bloodTypeId);
}

export function usePatientProfile() {
  const router = useRouter();
  const { isDemo } = useAuth();
  const [profile, setProfile] = useState<UIPatientProfile>(EMPTY_PATIENT_PROFILE);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContactDTO | null>(null);
  const [newContact, setNewContact] = useState<EmergencyContactDTO>({
    fullName: "",
    phone: "",
    relationship: "Father",
  });

  useEffect(() => {
    if (isDemo) {
      const timer = setTimeout(() => {
        setProfile(DemoService.getPatientProfile());
      }, 0);
      return () => clearTimeout(timer);
    }

    if (typeof window !== "undefined") {
      const isCompleted = localStorage.getItem("pulseid_patient_profile_completed") === "true";
      if (!isCompleted) {
        router.replace("/patient/profile/edit?first_time=true");
        return;
      }
    }

    PatientService.getPatientProfile()
      .then((p) => {
        setProfile(p);
        if (!isMedicalProfileComplete(p)) {
          router.replace("/patient/profile/edit?first_time=true");
        }
      })
      .catch((err) => {
        if (err?.kind === "UNAUTHENTICATED" || err?.statusCode === 401) {
          router.replace("/auth/login?role=patient&expired=true");
        }
      });
  }, [router, isDemo]);

  const handleAddEmergencyContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.fullName || !newContact.phone) return;

    if (isDemo) {
      const updated = DemoService.addEmergencyContact(newContact);
      setProfile(updated);
    } else {
      const updated = {
        ...profile,
        emergencyContacts: [
          ...(profile.emergencyContacts || []),
          { ...newContact, id: `ec-${Date.now()}` },
        ],
      };
      setProfile(updated);
      PatientService.updatePatientProfile(updated);
    }

    setIsAddContactModalOpen(false);
    setNewContact({ fullName: "", phone: "", relationship: "Father" });
  };

  const handleUpdateEmergencyContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContact || !editingContact.fullName || !editingContact.phone) return;

    if (isDemo) {
      const current = DemoService.getPatientProfile();
      const updatedContacts = (current.emergencyContacts || []).map((c) =>
        c.id === editingContact.id ? editingContact : c
      );
      const updated = DemoService.updatePatientProfile({ emergencyContacts: updatedContacts });
      setProfile(updated);
    } else {
      const updated = {
        ...profile,
        emergencyContacts: (profile.emergencyContacts || []).map((c) =>
          c.id === editingContact.id ? editingContact : c
        ),
      };
      setProfile(updated);
      PatientService.updatePatientProfile(updated);
    }

    setEditingContact(null);
  };

  const handleDeleteEmergencyContact = (id?: string) => {
    if (!id) return;

    if (isDemo) {
      const updated = DemoService.removeEmergencyContact(id);
      setProfile(updated);
    } else {
      const updated = {
        ...profile,
        emergencyContacts: (profile.emergencyContacts || []).filter((c) => c.id !== id),
      };
      setProfile(updated);
      PatientService.updatePatientProfile(updated);
    }
  };

  return {
    isDemo,
    profile,
    isAddContactModalOpen,
    setIsAddContactModalOpen,
    editingContact,
    setEditingContact,
    newContact,
    setNewContact,
    handleAddEmergencyContact,
    handleUpdateEmergencyContact,
    handleDeleteEmergencyContact,
  };
}
