"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UIPatientProfile } from "@/lib/api/patient-types";
import { PatientService, EMPTY_PATIENT_PROFILE } from "@/lib/api/patient-service";
import { DemoService } from "@/lib/demo/demo-service";
import { useAuth } from "@/lib/auth/auth-context";

export type HealthSubcategory = "chronic" | "allergies" | "medications" | "surgeries";

export function useMedicalInfo() {
  const router = useRouter();
  const { isDemo } = useAuth();
  const [activeTab, setActiveTab] = useState<HealthSubcategory>("chronic");
  const [profile, setProfile] = useState<UIPatientProfile>(EMPTY_PATIENT_PROFILE);
  const [shareToast, setShareToast] = useState(false);
  const [activeModal, setActiveModal] = useState<HealthSubcategory | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDetail, setNewItemDetail] = useState("");

  useEffect(() => {
    if (isDemo) {
      const timer = setTimeout(() => {
        setProfile(DemoService.getPatientProfile());
      }, 0);
      return () => clearTimeout(timer);
    }

    PatientService.getPatientProfile()
      .then(setProfile)
      .catch((err) => {
        if (err?.kind === "UNAUTHENTICATED" || err?.statusCode === 401) {
          router.replace("/auth/login?role=patient&expired=true");
        }
      });
  }, [router, isDemo]);

  const handleShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 3000);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    if (activeModal === "chronic") {
      if (isDemo) {
        const updated = DemoService.addChronicCondition(newItemName.trim(), newItemDetail);
        setProfile(updated);
      } else {
        const updated = {
          ...profile,
          chronicDiseases: [
            ...(profile.chronicDiseases || []),
            {
              id: Date.now(),
              name: newItemName.trim(),
              status: "Active Follow-up",
              date: "Recent",
              notes: newItemDetail,
            },
          ],
        };
        setProfile(updated);
        PatientService.updatePatientProfile(updated);
      }
    } else if (activeModal === "allergies") {
      if (isDemo) {
        const updated = DemoService.addAllergy(newItemName.trim(), "Moderate", newItemDetail);
        setProfile(updated);
      } else {
        const updated = {
          ...profile,
          allergyMenu: [
            ...(profile.allergyMenu || []),
            {
              id: Date.now(),
              name: newItemName.trim(),
              severity: "Moderate" as const,
              reactionType: newItemDetail,
              date: "Recent",
            },
          ],
        };
        setProfile(updated);
        PatientService.updatePatientProfile(updated);
      }
    } else if (activeModal === "medications") {
      if (isDemo) {
        const updated = DemoService.addMedication(newItemName.trim(), newItemDetail || "Standard");
        setProfile(updated);
      } else {
        const updated = {
          ...profile,
          currentMedications: [
            ...(profile.currentMedications || []),
            {
              id: Date.now(),
              name: newItemName.trim(),
              dosage: newItemDetail || "Standard",
              status: "Active" as const,
              date: "Recent",
            },
          ],
        };
        setProfile(updated);
        PatientService.updatePatientProfile(updated);
      }
    } else if (activeModal === "surgeries") {
      const updated = {
        ...profile,
        previousSurgicalProcedures: [
          ...(profile.previousSurgicalProcedures || []),
          {
            id: Date.now(),
            name: newItemName.trim(),
            date: "Recent",
            recoveryStatus: "Complete",
            followUpNotes: newItemDetail,
          },
        ],
      };
      setProfile(updated);
      PatientService.updatePatientProfile(updated);
    }

    setNewItemName("");
    setNewItemDetail("");
    setActiveModal(null);
  };

  return {
    isDemo,
    profile,
    activeTab,
    setActiveTab,
    shareToast,
    setShareToast,
    activeModal,
    setActiveModal,
    newItemName,
    setNewItemName,
    newItemDetail,
    setNewItemDetail,
    handleShare,
    handleAddItem,
  };
}
