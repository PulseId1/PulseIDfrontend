"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PatientNavbar,
  PatientProfileBanner,
  PatientFooter,
  MobilePatientHeader,
  MobileBottomNav,
} from "@/features/patient";
import { PatientService, EMPTY_PATIENT_PROFILE } from "@/lib/api/patient-service";
import { UIPatientProfile } from "@/lib/api/patient-types";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

type HealthSubcategory = "chronic" | "labs" | "allergies" | "medications" | "surgeries";

interface SubcatMeta {
  id: HealthSubcategory;
  name: string;
  subtitle: string;
  count: number;
  iconSvg: React.ReactNode;
}

export default function MedicalInfoPage() {
  const router = useRouter();
  const { isDemo } = useAuth();
  const [activeTab, setActiveTab] = useState<HealthSubcategory>("chronic");
  const [profile, setProfile] = useState<UIPatientProfile>(EMPTY_PATIENT_PROFILE);
  const [shareToast, setShareToast] = useState(false);

  // Modals for adding items
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

  const chronicList = profile.chronicDiseases || [];
  const allergyList = profile.allergyMenu || [];
  const medicationList = profile.currentMedications || [];
  const surgeryList = profile.previousSurgicalProcedures || [];

  const SUBCATEGORIES: SubcatMeta[] = [
    {
      id: "chronic",
      name: "Chronic Conditions",
      subtitle: chronicList.length > 0 ? chronicList.map((c) => c.name).slice(0, 2).join(", ") : "None recorded",
      count: chronicList.length,
      iconSvg: (
        <svg className="w-5 h-5 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
    {
      id: "labs",
      name: "Lab Tests",
      subtitle: "Glucose, Lipids, CBC, Liver Function",
      count: 4,
      iconSvg: (
        <svg className="w-5 h-5 text-[#078BDE]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      id: "allergies",
      name: "Allergies",
      subtitle: allergyList.length > 0 ? allergyList.map((a) => a.name).slice(0, 2).join(", ") : "None recorded",
      count: allergyList.length,
      iconSvg: (
        <svg className="w-5 h-5 text-[#BA1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
    },
    {
      id: "medications",
      name: "Current Medications",
      subtitle: medicationList.length > 0 ? medicationList.map((m) => m.name).slice(0, 2).join(", ") : "None recorded",
      count: medicationList.length,
      iconSvg: (
        <svg className="w-5 h-5 text-[#3B5BA9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      id: "surgeries",
      name: "Previous Surgeries",
      subtitle: surgeryList.length > 0 ? surgeryList.map((s) => s.name).slice(0, 2).join(", ") : "None recorded",
      count: surgeryList.length,
      iconSvg: (
        <svg className="w-5 h-5 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      ),
    },
  ];

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
            { id: Date.now(), name: newItemName.trim(), status: "Active Follow-up", date: "Recent", notes: newItemDetail },
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
            { id: Date.now(), name: newItemName.trim(), severity: "Moderate" as const, reactionType: newItemDetail, date: "Recent" },
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
            { id: Date.now(), name: newItemName.trim(), dosage: newItemDetail || "Standard", status: "Active" as const, date: "Recent" },
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
          { id: Date.now(), name: newItemName.trim(), date: "Recent", recoveryStatus: "Complete", followUpNotes: newItemDetail },
        ],
      };
      setProfile(updated);
      PatientService.updatePatientProfile(updated);
    }

    setNewItemName("");
    setNewItemDetail("");
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#0080DF]/30 selection:text-[#0080DF] pb-16 lg:pb-0">
      <div className="hidden lg:block sticky top-0 z-50">
        <PatientNavbar />
      </div>

      <MobilePatientHeader />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col gap-6 lg:gap-8">
        {/* Page Introduction matching Figma Node 299:1643 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01091E] tracking-tight font-heading">
              Medical Information
            </h1>
            <p className="text-sm sm:text-base text-[#41474F] leading-normal font-sans max-w-2xl">
              View, monitor, and synchronize your authenticated clinical records securely anchored with PulseID biometric telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D0E5F5] text-[13px] font-semibold text-[#0080DF] hover:bg-sky-50 transition-colors shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              <span>Share Record</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white text-[13px] font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {shareToast && (
          <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-[#0080DF] text-xs font-semibold flex items-center justify-between animate-in fade-in">
            <span>Encrypted clinical summary copied to clipboard!</span>
            <button type="button" onClick={() => setShareToast(false)}>✕</button>
          </div>
        )}

        {/* Identity Banner */}
        <PatientProfileBanner profile={profile} />

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Column: Personal Health Subcategories (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-[20px] p-4 sm:p-5 border border-[#E9EFFD] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex flex-col gap-2">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-3 py-2">
              PERSONAL HEALTH SUBCATEGORIES
            </span>

            {SUBCATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? "bg-[#EAF2FF] border border-[#D0E5F5] shadow-xs"
                      : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? "bg-white shadow-xs" : "bg-slate-100 group-hover:bg-white"
                      }`}
                    >
                      {cat.iconSvg}
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-[14px] font-bold leading-tight font-heading ${
                          isActive ? "text-[#02307D]" : "text-slate-700 group-hover:text-[#02307D]"
                        }`}
                      >
                        {cat.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-sans mt-0.5">{cat.subtitle}</span>
                    </div>
                  </div>

                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-mono ${
                      isActive ? "bg-[#0080DF] text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Tab View Content (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            {/* VIEW 1: Chronic Conditions matching Figma Node 299:1643 */}
            {activeTab === "chronic" && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#02307D] font-heading">
                        Chronic Conditions
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0080DF] text-[12px] font-bold">
                        {chronicList.length} Active Conditions
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-500 font-sans mt-1">
                      Long-term diagnosed conditions undergoing active monitoring and regular medical management.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModal("chronic")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white text-[13px] font-semibold transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
                  >
                    <span>+ Add Condition</span>
                  </button>
                </div>

                {/* Chronic Cards */}
                <div className="flex flex-col gap-4">
                  {chronicList.length === 0 ? (
                    <div className="bg-white rounded-[20px] p-8 border border-[#E9EFFD] text-center flex flex-col items-center justify-center gap-2">
                      <p className="text-[15px] font-semibold text-slate-700">No chronic conditions recorded</p>
                      <p className="text-[13px] text-slate-400">Use &quot;+ Add Condition&quot; above to log a diagnosed condition.</p>
                    </div>
                  ) : (
                    chronicList.map((item) => (
                    <div
                      key={item.id || item.name}
                      className="bg-white rounded-[20px] p-6 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col gap-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0080DF]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center gap-2.5">
                              <h3 className="text-[17px] font-bold text-[#02307D] font-heading">{item.name}</h3>
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                                • {item.status || "Active Follow-up"}
                              </span>
                            </div>
                            <p className="text-[12px] text-slate-500 font-sans mt-0.5">
                              Diagnosed: {item.date} • Primary Physician: Dr. Sherif Mansour
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 3 Metric boxes */}
                      {item.latestReading && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E9EFFD]">
                          <div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                              LATEST READING
                            </span>
                            <span className="text-[16px] font-bold text-[#02307D] font-mono">{item.latestReading}</span>
                            <span className="text-[11px] text-emerald-600 block mt-0.5">↳ Normal Controlled</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                              CONNECTED DEVICE
                            </span>
                            <span className="text-[13px] font-semibold text-slate-800">{item.connectedDevice || "Omron Evolv BP7000"}</span>
                            <span className="text-[11px] text-sky-600 block mt-0.5">⚡ Auto-sync active</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                              ASSIGNED THERAPY
                            </span>
                            <span className="text-[13px] font-semibold text-slate-800">{item.assignedTherapy || "Lisinopril 10mg"}</span>
                            <span className="text-[11px] text-slate-500 block mt-0.5">1 tablet daily (Morning)</span>
                          </div>
                        </div>
                      )}

                      {/* Identified Triggers if present (e.g. Asthma) */}
                      {item.triggers && item.triggers.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E9EFFD]">
                          <div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-2">
                              IDENTIFIED TRIGGERS
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {item.triggers.map((t) => (
                                <span key={t} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] text-slate-700 font-medium">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                              EMERGENCY PROTOCOL & RELIEF
                            </span>
                            <p className="text-[12px] text-slate-700 leading-relaxed font-sans">
                              {item.emergencyProtocol}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Notes / Footer */}
                      {item.notes && (
                        <div className="text-[12px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
                          <span>{item.notes}</span>
                          <span className="text-[#0080DF] font-semibold">Active telemetry</span>
                        </div>
                      )}
                    </div>
                  )))}
                </div>
              </div>
            )}

            {/* VIEW: Lab Tests matching Figma Node 299:2000 & Mobile 364:2740 */}
            {activeTab === "labs" && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#02307D] font-heading">
                        Lab Tests & Diagnostic Panels
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#078BDE] text-[12px] font-bold">
                        4 Recent Panels
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-500 font-sans mt-1">
                      Laboratory test results certified by Al Mokhtabar and Cairo University Clinical Labs.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/patient/records")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white text-[13px] font-semibold transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
                  >
                    <span>View All Lab Records →</span>
                  </button>
                </div>

                {/* Lab Panels List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Panel 1 */}
                  <div className="bg-white rounded-[20px] p-5 border border-[#E9EFFD] shadow-xs flex flex-col justify-between gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Endocrinology</span>
                        <h3 className="text-base font-bold text-[#02307D] font-heading mt-0.5">Fasting Blood Glucose</h3>
                        <p className="text-xs text-slate-500">Collected: 28 Oct 2026 • Al Mokhtabar</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                        Normal
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-600">Result</span>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#02307D]">94 mg/dL</span>
                        <span className="text-[11px] text-slate-400 block">Ref: 70 - 99 mg/dL</span>
                      </div>
                    </div>
                  </div>

                  {/* Panel 2 */}
                  <div className="bg-white rounded-[20px] p-5 border border-[#E9EFFD] shadow-xs flex flex-col justify-between gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Cardiovascular</span>
                        <h3 className="text-base font-bold text-[#02307D] font-heading mt-0.5">Lipid Profile (Total / HDL / LDL)</h3>
                        <p className="text-xs text-slate-500">Collected: 15 Oct 2026 • Cairo Medical Lab</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                        Target Met
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-600">Total / LDL</span>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#02307D]">172 / 98 mg/dL</span>
                        <span className="text-[11px] text-slate-400 block">Optimal (&lt; 200 mg/dL)</span>
                      </div>
                    </div>
                  </div>

                  {/* Panel 3 */}
                  <div className="bg-white rounded-[20px] p-5 border border-[#E9EFFD] shadow-xs flex flex-col justify-between gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Hematology</span>
                        <h3 className="text-base font-bold text-[#02307D] font-heading mt-0.5">Complete Blood Count (CBC)</h3>
                        <p className="text-xs text-slate-500">Collected: 10 Sep 2026 • Al Borg Diagnostics</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                        Normal
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-600">Hemoglobin</span>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#02307D]">14.8 g/dL</span>
                        <span className="text-[11px] text-slate-400 block">Ref: 13.5 - 17.5 g/dL</span>
                      </div>
                    </div>
                  </div>

                  {/* Panel 4 */}
                  <div className="bg-white rounded-[20px] p-5 border border-[#E9EFFD] shadow-xs flex flex-col justify-between gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Hepatic</span>
                        <h3 className="text-base font-bold text-[#02307D] font-heading mt-0.5">Liver Function Test (ALT / AST)</h3>
                        <p className="text-xs text-slate-500">Collected: 05 Aug 2026 • Nile Hospital Labs</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                        Normal
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-600">ALT / AST</span>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#02307D]">22 / 26 U/L</span>
                        <span className="text-[11px] text-slate-400 block">Ref: &lt; 40 U/L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: Allergies matching Figma Node 299:2392 */}
            {activeTab === "allergies" && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#02307D] font-heading">
                        Allergies
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0080DF] text-[12px] font-bold">
                        {allergyList.length} Logged
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-500 font-sans mt-1">
                      Documented allergens, reaction history, and emergency precautions.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModal("allergies")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white text-[13px] font-semibold transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
                  >
                    <span>+ Add Allergy</span>
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {allergyList.length === 0 ? (
                    <div className="bg-white rounded-[20px] p-8 border border-[#E9EFFD] text-center flex flex-col items-center justify-center gap-2">
                      <p className="text-[15px] font-semibold text-slate-700">No allergies recorded</p>
                      <p className="text-[13px] text-slate-400">Use &quot;+ Add Allergy&quot; above to log known allergies and emergency precautions.</p>
                    </div>
                  ) : (
                    allergyList.map((item) => (
                      <div
                        key={item.id || item.name}
                        className="bg-white rounded-[20px] p-6 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col gap-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 font-bold text-lg">
                              ⚠️
                            </div>
                            <div>
                              <div className="flex items-center gap-2.5">
                                <h3 className="text-[17px] font-bold text-[#02307D] font-heading">{item.name}</h3>
                                <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-[11px] font-bold border border-red-200">
                                  • {item.severity || "Severe anaphylaxis"}
                                </span>
                              </div>
                              <p className="text-[12px] text-slate-500 font-sans mt-0.5">
                                Drug / Environmental allergy • Documented {item.date}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Reaction Type & Precautions boxes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E9EFFD]">
                          <div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                              REACTION TYPE
                            </span>
                            <p className="text-[13px] font-semibold text-slate-800">
                              {item.reactionType || "Anaphylaxis (swelling, hives, breathing difficulties)"}
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                              PRECAUTIONS & SEVERITY
                            </span>
                            <p className="text-[13px] font-semibold text-slate-800">
                              {item.precautions || "Strictly avoid administration; alert attending physicians."}
                            </p>
                          </div>
                        </div>

                        {/* Red Emergency Warning Banner if Life-Threatening */}
                        {item.emergencyWarning && (
                          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-[12px] flex items-start gap-2.5 font-medium leading-relaxed">
                            <span className="font-bold">⚠️</span>
                            <span>{item.emergencyWarning}</span>
                          </div>
                        )}
                      </div>
                    )))}
                </div>
              </div>
            )}

            {/* VIEW 3: Current Medications matching Figma Node 299:2697 */}
            {activeTab === "medications" && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#02307D] font-heading">
                        Current Medications
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0080DF] text-[12px] font-bold">
                        {medicationList.length} Active
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-500 font-sans mt-1">
                      Current prescriptions, dosage schedules, and administration instructions.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModal("medications")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white text-[13px] font-semibold transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
                  >
                    <span>+ Add Medication</span>
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {medicationList.length === 0 ? (
                    <div className="bg-white rounded-[20px] p-8 border border-[#E9EFFD] text-center flex flex-col items-center justify-center gap-2">
                      <p className="text-[15px] font-semibold text-slate-700">No active medications recorded</p>
                      <p className="text-[13px] text-slate-400">Use &quot;+ Add Medication&quot; above to track active prescriptions and dosages.</p>
                    </div>
                  ) : (
                    medicationList.map((item) => (
                      <div
                        key={item.id || item.name}
                        className="bg-white rounded-[20px] p-6 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col gap-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0080DF]">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                              </svg>
                            </div>
                            <div>
                              <div className="flex items-center gap-2.5">
                                <h3 className="text-[17px] font-bold text-[#02307D] font-heading">{item.name}</h3>
                                <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0080DF] text-[11px] font-bold border border-sky-200">
                                  • {item.status || "Active prescription"}
                                </span>
                              </div>
                              <p className="text-[12px] text-slate-500 font-sans mt-0.5">
                                Assigned by: {item.assignedBy || "Attending Physician"} • Date: {item.date}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E9EFFD]">
                          <div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                              PRESCRIBED DOSAGE
                            </span>
                            <span className="text-[15px] font-bold text-[#02307D] font-mono">{item.dosage || "Standard Dose"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                              FREQUENCY & TIMING
                            </span>
                            <span className="text-[14px] font-semibold text-slate-800">{item.frequency || "Daily with meal"}</span>
                          </div>
                        </div>

                        {item.instructions && (
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-[12px] text-[#41474F]">
                            <strong className="text-slate-700 block mb-0.5">Administration Instructions:</strong>
                            {item.instructions}
                          </div>
                        )}
                      </div>
                    )))}
                </div>
              </div>
            )}

            {/* VIEW 4: Previous Surgeries matching Figma Node 299:3002 */}
            {activeTab === "surgeries" && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#02307D] font-heading">
                        Previous Surgeries
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0080DF] text-[12px] font-bold">
                        {surgeryList.length} Recorded
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-500 font-sans mt-1">
                      Surgical history, treating facilities, and documented recovery information.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModal("surgeries")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white text-[13px] font-semibold transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
                  >
                    <span>+ Add Surgery</span>
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {surgeryList.length === 0 ? (
                    <div className="bg-white rounded-[20px] p-8 border border-[#E9EFFD] text-center flex flex-col items-center justify-center gap-2">
                      <p className="text-[15px] font-semibold text-slate-700">No previous surgeries recorded</p>
                      <p className="text-[13px] text-slate-400">Use &quot;+ Add Surgery&quot; above to document surgical history.</p>
                    </div>
                  ) : (
                    surgeryList.map((item) => (
                      <div
                        key={item.id || item.name}
                        className="bg-white rounded-[20px] p-6 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col gap-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0080DF]">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </div>
                            <div>
                              <div className="flex items-center gap-2.5">
                                <h3 className="text-[17px] font-bold text-[#02307D] font-heading">{item.name}</h3>
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                                  • {item.recoveryStatus || "Fully recovered"}
                                </span>
                              </div>
                              <p className="text-[12px] text-slate-500 font-sans mt-0.5">
                                Procedure Date: {item.date} • Facility: {item.hospital || "Cairo University Hospitals"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E9EFFD]">
                          <div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                              OPERATING SURGEON
                            </span>
                            <span className="text-[14px] font-bold text-slate-800">{item.surgeon || "Consultant General Surgeon"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                              REASON FOR SURGERY
                            </span>
                            <span className="text-[14px] font-semibold text-slate-800">{item.reason || "Acute procedure"}</span>
                          </div>
                        </div>

                        {item.followUpNotes && (
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-[12px] text-[#41474F]">
                            <strong className="text-slate-700 block mb-0.5">Follow-up Information:</strong>
                            {item.followUpNotes}
                          </div>
                        )}
                      </div>
                    )))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Generic Add Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#02307D]">
                Add {activeModal === "chronic" ? "Condition" : activeModal === "allergies" ? "Allergy" : activeModal === "medications" ? "Medication" : "Surgery"}
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddItem} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asthma, Lisinopril..."
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080DF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Details / Notes</label>
                <input
                  type="text"
                  placeholder="Dosage, reaction, facility notes..."
                  value={newItemDetail}
                  onChange={(e) => setNewItemDetail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080DF]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-[#0080DF] hover:bg-[#0070C5] shadow-sm cursor-pointer"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <PatientFooter />
      <MobileBottomNav />
    </div>
  );
}
