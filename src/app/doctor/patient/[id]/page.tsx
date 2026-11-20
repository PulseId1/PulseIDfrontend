"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/common/Header";
import { PatientFooter } from "@/features/patient/components/patient-footer";
import { PatientInfoCard } from "@/features/patient/components/patient-info-card";
import { VisitHistoryTab } from "@/features/patient/components/doctor-view/visit-history-tab";
import { PrescriptionsTestsTab } from "@/features/patient/components/doctor-view/prescriptions-tests-tab";
import { ClinicalFollowupTab } from "@/features/patient/components/doctor-view/clinical-followup-tab";
import { DICOMViewerModal } from "@/features/patient/components/dicom-viewer-modal";
import { CreateNewPrescriptionForm } from "@/features/doctor";
import {
  ChevronLeft,
  Share2,
  Plus,
  Clock3,
  ShieldCheck,
  CheckCircle2,
  Pill,
  History,
  Activity,
  Sparkles,
  Send,
  Eye,
  X,
  Stethoscope,
  FlaskConical,
} from "lucide-react";

type DoctorPatientTab = "overview" | "records" | "followup" | "medical-info" | "ai-assistant";

export default function DoctorPatientDetailPage() {
  const params = useParams();
  const patientId = (params?.id as string) || "PID-8924-EGY";

  const [activeTab, setActiveTab] = useState<DoctorPatientTab>("overview");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("conditions");
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showLabOrderModal, setShowLabOrderModal] = useState(false);
  const [showDicomModal, setShowDicomModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AI Assistant Chat State
  const [aiQuery, setAiQuery] = useState("");
  const [aiChatHistory, setAiChatHistory] = useState([
    {
      role: "assistant",
      text: "Hello Dr. Mohamed. I am PulseID's Clinical Assistant. I can summarize Ahmed Hassan's glycemic trends, check drug-drug interactions for Metformin, or draft diagnostic notes under Law 151/2020.",
    },
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSendAiPrompt = (promptText?: string) => {
    const q = promptText || aiQuery;
    if (!q.trim()) return;

    setAiChatHistory((prev) => [
      ...prev,
      { role: "user", text: q },
      {
        role: "assistant",
        text: `Based on patient Ahmed Hassan's record (PID-8924-EGY): Latest HbA1c is 7.2% (down from 7.6%), fasting blood glucose is 126 mg/dL. Renal function (eGFR 92 mL/min) is within safe limits for Metformin 500mg BID. No contraindications detected with Cholecalciferol Vitamin D3.`,
      },
    ]);
    setAiQuery("");
  };

  const patientIdentity = {
    name: "Ahmed Hassan",
    id: patientId.startsWith("PID-") ? patientId : `PID-${patientId}-EGY`,
    birthDate: "1992-05-14",
    bloodType: "Blood O+",
    avatarUrl: "/assets/figma/avatars/patient-ahmed-hassan.png",
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#F8FAFD] text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
    >
      {/* 1. Header with Doctor Role matching Figma Node 600:4073 / 423:4192 */}
      <Header role="doctor" />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1360px] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col gap-6 lg:gap-8">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="w-full p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center justify-between shadow-xs animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-emerald-600">✓</span>
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-emerald-700 hover:text-emerald-900 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* 2. Breadcrumb Navigation & Top Action Heading (Figma Node 600:4153) */}
        <div className="flex flex-col gap-4 text-left">
          {/* Breadcrumb link */}
          <Link
            href="/doctor/find-patient"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#078BDE] hover:text-[#0070C5] transition-colors w-fit"
            data-node-id="600:4154"
          >
            <ChevronLeft className="size-4" />
            <span>Back to my patients</span>
          </Link>

          {/* Heading and Action Buttons (Figma Node 600:4158) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5 max-w-[850px]">
              <h1
                className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01091E] tracking-tight font-heading"
                data-node-id="600:4161"
              >
                Patient Medical Profile
              </h1>
              <p
                className="text-sm sm:text-base text-[#41474F] font-sans leading-relaxed"
                data-node-id="600:4163"
              >
                Review and manage patient-authorized health information and medical records.
              </p>
            </div>

            {/* Action buttons cluster */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => triggerToast("Patient clinical record export link generated.")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] border border-[#D0DEFF] bg-white text-[#02307D] text-[13px] font-bold hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                data-node-id="600:4164"
              >
                <Share2 className="size-4 text-[#078BDE]" />
                <span>Share Record</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPrescriptionModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#EAF2FF] text-[#0080DF] hover:bg-[#D8E7FF] text-[13px] font-bold transition-colors shadow-xs cursor-pointer"
              >
                <Pill className="size-4" />
                <span>+ Issue Prescription</span>
              </button>

              <button
                type="button"
                onClick={() => setShowLabOrderModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#EAF2FF] text-[#0080DF] hover:bg-[#D8E7FF] text-[13px] font-bold transition-colors shadow-xs cursor-pointer"
              >
                <FlaskConical className="size-4" />
                <span>+ Order Lab Test</span>
              </button>

              <button
                type="button"
                onClick={() => setShowConsultationModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#078BDE] hover:bg-[#0070C5] text-white text-[13px] font-bold transition-colors shadow-xs cursor-pointer"
                data-node-id="600:4169"
              >
                <Plus className="size-4" />
                <span>New Consultation</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Patient Identity Banner (Figma Node 600:4174 & 299:1910) */}
        <PatientInfoCard
          patient={patientIdentity}
          variant="general"
          syncText="Today, 10:45 AM"
          nodeId="600:4174"
        />

        {/* 4. 5 Visit Statistics Cards (Figma Node 600:4209) */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 lg:gap-4 w-full"
          data-node-id="600:4209"
        >
          {/* Card 1: Total Visits */}
          <div
            className="bg-white border border-[#D0DEFF] rounded-[8px] p-5 flex flex-col justify-between shadow-xs text-left"
            data-node-id="600:4210"
          >
            <div className="flex items-center gap-2 text-[#078BDE]">
              <Clock3 className="size-4" />
              <span className="text-[12px] font-bold text-[#02307D] font-heading">
                Total Visits
              </span>
            </div>
            <div className="my-2">
              <span className="text-[28px] font-bold text-[#02307D] font-mono leading-none">
                03
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] font-sans">
              Recorded consultations
            </span>
          </div>

          {/* Card 2: First Visit */}
          <div
            className="bg-white border border-[#D0DEFF] rounded-[8px] p-5 flex flex-col justify-between shadow-xs text-left"
            data-node-id="600:4217"
          >
            <div className="flex items-center gap-2 text-[#078BDE]">
              <Clock3 className="size-4" />
              <span className="text-[12px] font-bold text-[#02307D] font-heading">
                First Visit
              </span>
            </div>
            <div className="my-2">
              <span className="text-[16px] sm:text-[18px] font-bold text-[#02307D] font-sans leading-tight">
                8 Apr 2026
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] font-sans">
              Care journey began
            </span>
          </div>

          {/* Card 3: Last Visit */}
          <div
            className="bg-white border border-[#D0DEFF] rounded-[8px] p-5 flex flex-col justify-between shadow-xs text-left"
            data-node-id="600:4224"
          >
            <div className="flex items-center gap-2 text-[#078BDE]">
              <Clock3 className="size-4" />
              <span className="text-[12px] font-bold text-[#02307D] font-heading">
                Last Visit
              </span>
            </div>
            <div className="my-2">
              <span className="text-[16px] sm:text-[18px] font-bold text-[#02307D] font-sans leading-tight">
                28 Oct 2026
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] font-sans">
              Most recent consultation
            </span>
          </div>

          {/* Card 4: Total Prescriptions */}
          <div
            className="bg-white border border-[#D0DEFF] rounded-[8px] p-5 flex flex-col justify-between shadow-xs text-left"
            data-node-id="600:4231"
          >
            <div className="flex items-center gap-2 text-[#16734E]">
              <ShieldCheck className="size-4" />
              <span className="text-[12px] font-bold text-[#02307D] font-heading">
                Total Prescriptions
              </span>
            </div>
            <div className="my-2">
              <span className="text-[28px] font-bold text-[#02307D] font-mono leading-none">
                02
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] font-sans">
              Across all visits
            </span>
          </div>

          {/* Card 5: Total Diagnoses */}
          <div
            className="bg-white border border-[#D0DEFF] rounded-[8px] p-5 flex flex-col justify-between shadow-xs text-left col-span-2 sm:col-span-1"
            data-node-id="600:4238"
          >
            <div className="flex items-center gap-2 text-[#16734E]">
              <ShieldCheck className="size-4" />
              <span className="text-[12px] font-bold text-[#02307D] font-heading">
                Total Diagnoses
              </span>
            </div>
            <div className="my-2">
              <span className="text-[28px] font-bold text-[#02307D] font-mono leading-none">
                02
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] font-sans">
              Unique diagnoses
            </span>
          </div>
        </div>

        {/* 5. Patient Medical Profile Tabs (Figma Node 600:4245) */}
        <div
          className="flex items-center gap-2 p-1.5 bg-white border border-[#D8DFEB] rounded-[10px] shadow-xs w-full overflow-x-auto custom-scrollbar"
          data-node-id="600:4245"
        >
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-[8px] px-4 py-2.5 rounded-[8px] text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "overview"
                ? "bg-[#078BDE] text-white shadow-xs"
                : "text-[#41474F] hover:bg-[#F5F8FC] hover:text-[#02307D]"
            }`}
            data-node-id="600:4247"
          >
            <History className="size-4" />
            <span>Doctor Overview</span>
            <span
              className={`text-[11px] px-[8px] py-[2px] rounded-full font-mono ${
                activeTab === "overview" ? "bg-white/20 text-white" : "bg-[#EFF8FE] text-[#02307D]"
              }`}
            >
              3
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("records")}
            className={`flex items-center gap-[8px] px-4 py-2.5 rounded-[8px] text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "records"
                ? "bg-[#078BDE] text-white shadow-xs"
                : "text-[#41474F] hover:bg-[#F5F8FC] hover:text-[#02307D]"
            }`}
            data-node-id="600:4250"
          >
            <Pill className="size-4" />
            <span>Medical Records</span>
            <span
              className={`text-[11px] px-[8px] py-[2px] rounded-full font-mono ${
                activeTab === "records" ? "bg-white/20 text-white" : "bg-[#EFF8FE] text-[#02307D]"
              }`}
            >
              5
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("followup")}
            className={`flex items-center gap-[8px] px-4 py-2.5 rounded-[8px] text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "followup"
                ? "bg-[#078BDE] text-white shadow-xs"
                : "text-[#41474F] hover:bg-[#F5F8FC] hover:text-[#02307D]"
            }`}
            data-node-id="600:4253"
          >
            <CheckCircle2 className="size-4" />
            <span>Follow-up</span>
            <span
              className={`text-[11px] px-[8px] py-[2px] rounded-full font-mono ${
                activeTab === "followup" ? "bg-white/20 text-white" : "bg-[#EFF8FE] text-[#02307D]"
              }`}
            >
              4
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("medical-info")}
            className={`flex items-center gap-[8px] px-4 py-2.5 rounded-[8px] text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "medical-info"
                ? "bg-[#078BDE] text-white shadow-xs"
                : "text-[#41474F] hover:bg-[#F5F8FC] hover:text-[#02307D]"
            }`}
            data-node-id="423:5500"
          >
            <Activity className="size-4" />
            <span>Medical Information</span>
            <span
              className={`text-[11px] px-[8px] py-[2px] rounded-full font-mono ${
                activeTab === "medical-info" ? "bg-white/20 text-white" : "bg-[#EFF8FE] text-[#02307D]"
              }`}
            >
              6
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ai-assistant")}
            className={`flex items-center gap-[8px] px-4 py-2.5 rounded-[8px] text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "ai-assistant"
                ? "bg-gradient-to-r from-[#0080DF] to-[#02307D] text-white shadow-xs"
                : "text-[#41474F] hover:bg-[#F5F8FC] hover:text-[#02307D]"
            }`}
            data-node-id="423:6415"
          >
            <Sparkles className="size-4 text-sky-400" />
            <span>AI Medical Assistant</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                activeTab === "ai-assistant" ? "bg-white/20 text-white" : "bg-sky-100 text-[#0080DF]"
              }`}
            >
              Clinical
            </span>
          </button>
        </div>

        {/* 6. Consent & Audit Banner (Figma Node 600:4256) */}
        <div
          className="bg-[#EFF8FE] border border-[#D0DEFF] rounded-[8px] px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-left shadow-xs"
          data-node-id="600:4256"
        >
          <div className="flex items-center gap-2.5 text-[12px] sm:text-[13px] font-medium text-[#02307D]">
            <ShieldCheck className="size-4 text-[#078BDE] shrink-0" />
            <span>
              Patient-authorized clinical workspace. Read &amp; write access granted under Law 151/2020 Data Protection.
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#64748B] font-sans shrink-0">
            Patient: {patientIdentity.name} • Last synchronized today at 10:45 AM
          </span>
        </div>

        {/* 7. Tab Content Rendering */}
        <div className="w-full">
          {/* TAB 1: Doctor Overview (Figma Node 600:4072) */}
          {activeTab === "overview" && <VisitHistoryTab />}

          {/* TAB 2: Medical Records (Figma Node 600:4428 & 550:1659) */}
          {activeTab === "records" && (
            <div className="flex flex-col gap-6 w-full text-left">
              {/* Trigger for DICOM viewer demo */}
              <div className="bg-white border border-[#D0DEFF] rounded-[8px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3.5">
                  <div className="size-11 rounded-lg bg-sky-50 text-[#078BDE] flex items-center justify-center font-bold">
                    DICOM
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px] text-[#01091E]">
                      High-Resolution Diagnostic Radiology Viewer
                    </h4>
                    <p className="text-[12px] text-[#41474F]">
                      Inspect multi-frame DICOM studies with WW/WL contrast adjustments and radiological measurements.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDicomModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#078BDE] text-white text-[13px] font-bold hover:bg-[#0070C5] transition-colors shadow-xs cursor-pointer shrink-0"
                >
                  <Eye className="size-4" />
                  <span>Launch DICOM Viewer</span>
                </button>
              </div>

              {/* Standard Prescriptions & Tests Tab */}
              <PrescriptionsTestsTab />
            </div>
          )}

          {/* TAB 3: Clinical Follow-up (Figma Node 600:4817) */}
          {activeTab === "followup" && <ClinicalFollowupTab />}

          {/* TAB 4: Medical Information (Figma Node 423:5499) */}
          {activeTab === "medical-info" && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-left w-full" data-node-id="423:5499">
              {/* Left Subcategory Navigation (Figma Node 423:5560) */}
              <aside className="lg:col-span-1 bg-white border border-[#D8DFEB] rounded-[10px] p-3 shadow-xs flex flex-col gap-1.5 h-fit">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider px-3 py-2">
                  Health Categories
                </span>
                {[
                  { id: "conditions", label: "Chronic Conditions", count: 2 },
                  { id: "allergies", label: "Allergies & Intolerances", count: 2 },
                  { id: "medications", label: "Current Medications", count: 3 },
                  { id: "surgeries", label: "Surgical History", count: 1 },
                  { id: "activity", label: "Medical Activity History", count: 4 },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSubcategory(item.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer ${
                      activeSubcategory === item.id
                        ? "bg-[#EFF8FE] text-[#078BDE] font-bold"
                        : "text-[#41474F] hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                      {item.count}
                    </span>
                  </button>
                ))}
              </aside>

              {/* Right Details Panel */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                {activeSubcategory === "conditions" && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[18px] font-bold text-[#01091E]">Chronic Conditions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white border border-[#D0DEFF] rounded-[8px] p-5 shadow-xs flex flex-col gap-2">
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full w-fit">
                          Active Monitoring
                        </span>
                        <h4 className="font-bold text-[16px] text-[#02307D]">Mild Essential Hypertension</h4>
                        <p className="text-[12px] text-[#41474F]">
                          Diagnosed Oct 2024. Maintained with regular aerobic exercise, sodium reduction, and quarterly BP logging.
                        </p>
                      </div>
                      <div className="bg-white border border-[#D0DEFF] rounded-[8px] p-5 shadow-xs flex flex-col gap-2">
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
                          Well Controlled
                        </span>
                        <h4 className="font-bold text-[16px] text-[#02307D]">Type 2 Diabetes Mellitus</h4>
                        <p className="text-[12px] text-[#41474F]">
                          Managed via oral Metformin 500mg BID and clinical nutrition guidance.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSubcategory === "allergies" && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[18px] font-bold text-[#01091E]">Allergies &amp; Intolerances</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white border border-rose-200 rounded-[8px] p-5 shadow-xs flex flex-col gap-2">
                        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full w-fit">
                          Severe Alert
                        </span>
                        <h4 className="font-bold text-[16px] text-rose-900">Penicillin &amp; Beta-Lactams</h4>
                        <p className="text-[12px] text-[#41474F]">
                          Urticaria and acute angioedema reported in 2018. Strictly avoid amoxicillin, augmentin, and cephalosporins.
                        </p>
                      </div>
                      <div className="bg-white border border-amber-200 rounded-[8px] p-5 shadow-xs flex flex-col gap-2">
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full w-fit">
                          Moderate
                        </span>
                        <h4 className="font-bold text-[16px] text-[#02307D]">Seasonal Allergic Rhinitis</h4>
                        <p className="text-[12px] text-[#41474F]">
                          Spring pollen and dust mite flare-ups. Managed with over-the-counter Cetirizine 10mg PRN.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSubcategory === "medications" && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[18px] font-bold text-[#01091E]">Current Active Medications</h3>
                    <div className="bg-white border border-[#D0DEFF] rounded-[8px] divide-y divide-[#E2E8F0] shadow-xs">
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-[14px] text-[#02307D]">Metformin HCl • 500 mg</p>
                          <p className="text-[12px] text-[#64748B]">1 tablet twice daily with meals • Prescribed by Dr. Laila Mostafa</p>
                        </div>
                        <span className="text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-[14px] text-[#02307D]">Cholecalciferol (Vitamin D3) • 50,000 IU</p>
                          <p className="text-[12px] text-[#64748B]">1 capsule weekly for 8 weeks • Prescribed by Dr. Laila Mostafa</p>
                        </div>
                        <span className="text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-[14px] text-[#02307D]">Omega-3 Fish Oil • 1,000 mg</p>
                          <p className="text-[12px] text-[#64748B]">1 softgel daily • Patient self-administered dietary supplement</p>
                        </div>
                        <span className="text-[12px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                          OTC Supplement
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeSubcategory === "surgeries" && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[18px] font-bold text-[#01091E]">Surgical History</h3>
                    <div className="bg-white border border-[#D0DEFF] rounded-[8px] p-5 shadow-xs flex flex-col gap-2">
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full w-fit">
                        Completed • 2016
                      </span>
                      <h4 className="font-bold text-[16px] text-[#02307D]">Appendectomy (Laparoscopic)</h4>
                      <p className="text-[12px] text-[#41474F]">
                        Performed at Cairo Specialized Hospital. Uneventful recovery with zero postoperative complications.
                      </p>
                    </div>
                  </div>
                )}

                {activeSubcategory === "activity" && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[18px] font-bold text-[#01091E]">Medical Activity History (Audit Log)</h3>
                    <div className="bg-white border border-[#D0DEFF] rounded-[8px] overflow-hidden shadow-xs">
                      <table className="w-full text-left text-[13px]">
                        <thead className="bg-[#F8FAFD] border-b border-[#D8DFEB] text-[#41474F] font-bold">
                          <tr>
                            <th className="p-3.5">Timestamp</th>
                            <th className="p-3.5">Action Event</th>
                            <th className="p-3.5">Healthcare Provider</th>
                            <th className="p-3.5">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2E8F0]">
                          <tr>
                            <td className="p-3.5 font-mono text-[12px] text-slate-500">28 Oct 2026, 10:45 AM</td>
                            <td className="p-3.5 font-semibold text-[#02307D]">Consultation Summary &amp; RX Issue</td>
                            <td className="p-3.5">Dr. Laila Mostafa (Dar Al Fouad)</td>
                            <td className="p-3.5"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] font-bold">Signed</span></td>
                          </tr>
                          <tr>
                            <td className="p-3.5 font-mono text-[12px] text-slate-500">15 Jul 2026, 11:20 AM</td>
                            <td className="p-3.5 font-semibold text-[#02307D]">Thyroid Ultrasound Report Attached</td>
                            <td className="p-3.5">Dr. Omar Farouk (Radiology Center)</td>
                            <td className="p-3.5"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] font-bold">Verified</span></td>
                          </tr>
                          <tr>
                            <td className="p-3.5 font-mono text-[12px] text-slate-500">8 Apr 2026, 09:15 AM</td>
                            <td className="p-3.5 font-semibold text-[#02307D]">Initial Care Plan Onboarded</td>
                            <td className="p-3.5">Dr. Laila Mostafa (Dar Al Fouad)</td>
                            <td className="p-3.5"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] font-bold">Approved</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: AI Medical Assistant (Figma Node 423:6415) */}
          {activeTab === "ai-assistant" && (
            <div
              className="bg-white border border-[#D0DEFF] rounded-[16px] shadow-sm p-6 lg:p-8 flex flex-col gap-6 text-left"
              data-node-id="423:6415"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-xl bg-gradient-to-tr from-[#0080DF] to-[#02307D] text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="size-6 text-sky-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#02307D]">AI Medical Assistant · Doctor Copilot</h3>
                    <p className="text-xs text-[#64748B]">
                      Secure real-time clinical summarization and telemetry differential analysis under HIPAA &amp; Law 151/2020.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  Model: Med-Gemini Clinical 2.5
                </span>
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Quick Clinical Inquiries:</span>
                {[
                  "Summarize 6-month glycemic trajectory",
                  "Check Metformin & Vitamin D3 interactions",
                  "Generate dietary referral clinical memo",
                  "Review thyroid nodule follow-up protocol",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSendAiPrompt(prompt)}
                    className="px-3 py-1.5 rounded-lg bg-[#F5F8FC] hover:bg-[#EAF2FF] border border-[#D8DFEB] text-[12px] font-medium text-[#02307D] transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Log */}
              <div className="flex flex-col gap-4 min-h-[240px] max-h-[380px] overflow-y-auto p-4 rounded-xl bg-[#F8FAFD] border border-[#E2E8F0] custom-scrollbar">
                {aiChatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 max-w-[85%] ${
                      msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    }`}
                  >
                    <div
                      className={`size-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                        msg.role === "user" ? "bg-[#078BDE] text-white" : "bg-[#02307D] text-white"
                      }`}
                    >
                      {msg.role === "user" ? "Dr" : "AI"}
                    </div>
                    <div
                      className={`p-3.5 rounded-xl text-xs sm:text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#078BDE] text-white"
                          : "bg-white text-slate-800 border border-[#D8DFEB] shadow-xs"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendAiPrompt()}
                  placeholder="Ask a clinical question about Ahmed Hassan's history, tests, or telemetry..."
                  className="flex-1 bg-white border border-[#D8DFEB] rounded-xl px-4 py-3 text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#078BDE]"
                />
                <button
                  type="button"
                  onClick={() => handleSendAiPrompt()}
                  className="px-5 py-3 rounded-xl bg-[#078BDE] hover:bg-[#0070C5] text-white font-bold text-[13px] transition-colors shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Send className="size-4" />
                  <span>Analyze</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <PatientFooter />

      {/* MODAL 1: New Clinical Consultation (Figma Node 550:1659 / 666:3403) */}
      {showConsultationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 bg-[#02307D] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Stethoscope className="size-6 text-sky-300" />
                <div>
                  <h3 className="text-lg font-bold">New Clinical Consultation</h3>
                  <p className="text-xs text-sky-200">Patient: {patientIdentity.name} ({patientIdentity.id})</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConsultationModal(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4 text-left max-h-[75vh] overflow-y-auto">
              <div>
                <label className="text-xs font-bold text-[#02307D] block mb-1">Consultation Type</label>
                <select className="w-full p-2.5 rounded-lg border border-[#D8DFEB] text-sm bg-white">
                  <option>In-person Follow-up Visit</option>
                  <option>Initial Comprehensive Consultation</option>
                  <option>Telehealth Diagnostic Review</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#02307D] block mb-1">Chief Complaint &amp; Symptoms</label>
                <input
                  type="text"
                  placeholder="e.g. Periodic fatigue, elevated morning blood sugar..."
                  className="w-full p-2.5 rounded-lg border border-[#D8DFEB] text-sm"
                  defaultValue="Routine diabetic follow-up and prescription review."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#02307D] block mb-1">Clinical Diagnosis &amp; ICD-10 Code</label>
                <input
                  type="text"
                  placeholder="e.g. E11.9 Type 2 Diabetes Mellitus"
                  className="w-full p-2.5 rounded-lg border border-[#D8DFEB] text-sm"
                  defaultValue="E11.9 Type 2 Diabetes Mellitus without complications"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#02307D] block mb-1">Clinical Assessment &amp; Action Plan</label>
                <textarea
                  rows={3}
                  placeholder="Enter clinical assessment, titration rationale, and lifestyle guidance..."
                  className="w-full p-2.5 rounded-lg border border-[#D8DFEB] text-sm"
                  defaultValue="Glycemic control stable. Continue Metformin 500mg BID. Recommended quarterly HbA1c testing."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#02307D] block mb-1">Next Follow-up Appointment</label>
                <input
                  type="date"
                  className="w-full p-2.5 rounded-lg border border-[#D8DFEB] text-sm"
                  defaultValue="2027-01-28"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConsultationModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConsultationModal(false);
                  triggerToast("New clinical consultation saved and securely signed under Law 151/2020.");
                }}
                className="px-5 py-2 rounded-lg bg-[#078BDE] hover:bg-[#0070C5] text-white text-sm font-bold shadow-xs transition-colors cursor-pointer"
              >
                Sign &amp; Save Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Issue Prescription (Figma Node 652:2498 Section - CreateNewPrescriptionForm) */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-2xl my-8 relative">
            <button
              type="button"
              onClick={() => setShowPrescriptionModal(false)}
              className="absolute right-4 top-4 z-10 text-slate-400 hover:text-slate-700 bg-white/80 rounded-full p-1 cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
            <CreateNewPrescriptionForm
              doctorName="Dr. Sherif Mansour (Current signed-in doctor)"
              defaultDate="12 Nov 2026"
              onSave={() => {
                setShowPrescriptionModal(false);
                triggerToast("Prescription issued, cryptographically signed, and transmitted to patient wallet.");
              }}
              onCancel={() => setShowPrescriptionModal(false)}
              onClear={() => {}}
            />
          </div>
        </div>
      )}

      {/* MODAL 3: Order Lab Test (Figma Node 550:1659 / 652:2496) */}
      {showLabOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 bg-[#02307D] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FlaskConical className="size-6 text-sky-300" />
                <div>
                  <h3 className="text-lg font-bold">Order Diagnostic Lab / Imaging Test</h3>
                  <p className="text-xs text-sky-200">Patient: {patientIdentity.name} ({patientIdentity.id})</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLabOrderModal(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4 text-left max-h-[75vh] overflow-y-auto">
              <div>
                <label className="text-xs font-bold text-[#02307D] block mb-1">Diagnostic Test Name</label>
                <select className="w-full p-2.5 rounded-lg border border-[#D8DFEB] text-sm bg-white">
                  <option>Glycated Hemoglobin (HbA1c) Venous Blood Test</option>
                  <option>Comprehensive Metabolic Panel (CMP)</option>
                  <option>Lipid Profile (Total, HDL, LDL, Triglycerides)</option>
                  <option>Thyroid Ultrasound with Doppler</option>
                  <option>Serum 25-Hydroxyvitamin D</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#02307D] block mb-1">Urgency</label>
                  <select className="w-full p-2.5 rounded-lg border border-[#D8DFEB] text-sm bg-white">
                    <option>Routine (Within 30 Days)</option>
                    <option>Priority (Within 7 Days)</option>
                    <option>Stat / Urgent (24 Hours)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#02307D] block mb-1">Target Fulfillment Window</label>
                  <input
                    type="date"
                    className="w-full p-2.5 rounded-lg border border-[#D8DFEB] text-sm"
                    defaultValue="2027-01-20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#02307D] block mb-1">Clinical Indication &amp; Instructions</label>
                <textarea
                  rows={3}
                  className="w-full p-2.5 rounded-lg border border-[#D8DFEB] text-sm"
                  defaultValue="Quarterly glycemic monitoring. Fasting not required for HbA1c. Please transmit results to PulseID provider network before next consultation."
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLabOrderModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLabOrderModal(false);
                  triggerToast("Lab order requisition created and routed to partner diagnostic centers.");
                }}
                className="px-5 py-2 rounded-lg bg-[#078BDE] hover:bg-[#0070C5] text-white text-sm font-bold shadow-xs transition-colors cursor-pointer"
              >
                Submit Lab Requisition
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Full DICOM Chest X-Ray / Radiology Viewer (Figma Node 550:1659 / 666:3126) */}
      <DICOMViewerModal
        isOpen={showDicomModal}
        onClose={() => setShowDicomModal(false)}
        studyId="XR-2026-884"
      />
    </div>
  );
}
