"use client";

import { useState, useEffect } from "react";
import { DEFAULT_MEDICAL_RECORDS, PatientService } from "@/lib/api/patient-service";
import { MedicalRecordItem, UIPatientProfile } from "@/lib/api/patient-types";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

export type RecordCategory =
  | "labs"
  | "radiology"
  | "history"
  | "diagnoses"
  | "prescriptions"
  | "otc";

export function useMedicalRecords() {
  const { isDemo } = useAuth();
  const [activeTab, setActiveTab] = useState<RecordCategory>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as RecordCategory;
      if (
        tabParam &&
        ["labs", "radiology", "history", "diagnoses", "prescriptions", "otc"].includes(tabParam)
      ) {
        return tabParam;
      }
    }
    return "history";
  });
  const [dicomModalItem, setDicomModalItem] = useState<MedicalRecordItem | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [recordSearch, setRecordSearch] = useState("");
  const [records, setRecords] = useState<MedicalRecordItem[]>(DEFAULT_MEDICAL_RECORDS);
  const [profile, setProfile] = useState<UIPatientProfile | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const p = await PatientService.getPatientProfile();
        if (p) setProfile(p);
      } catch {
        if (isDemo) setProfile(DemoService.getPatientProfile());
      }
    }
    loadData();

    if (isDemo) {
      const timer = setTimeout(() => {
        setRecords(DemoService.getMedicalRecords());
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isDemo]);

  const displayedRecords = records.filter((r) => {
    const matchesCat = r.category === activeTab;
    if (!recordSearch.trim()) return matchesCat;
    const q = recordSearch.toLowerCase();
    return (
      matchesCat &&
      (r.title.toLowerCase().includes(q) ||
        r.facility.toLowerCase().includes(q) ||
        (r.doctor ? r.doctor.toLowerCase().includes(q) : false) ||
        (r.description ? r.description.toLowerCase().includes(q) : false) ||
        (r.findings ? r.findings.toLowerCase().includes(q) : false))
    );
  });

  const handleShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 3000);
  };

  return {
    isDemo,
    activeTab,
    setActiveTab,
    dicomModalItem,
    setDicomModalItem,
    uploadModalOpen,
    setUploadModalOpen,
    shareToast,
    setShareToast,
    recordSearch,
    setRecordSearch,
    records,
    setRecords,
    profile,
    displayedRecords,
    handleShare,
  };
}
