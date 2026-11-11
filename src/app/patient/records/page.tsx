"use client";

import React, { useState } from "react";
import {
  PatientNavbar,
  PatientProfileBanner,
  PatientFooter,
  MobilePatientHeader,
  MobileBottomNav,
} from "@/features/patient";
import { DEFAULT_MEDICAL_RECORDS } from "@/lib/api/patient-service";
import { MedicalRecordItem } from "@/lib/api/patient-types";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

type RecordCategory = "labs" | "radiology" | "history" | "diagnoses" | "reports";

interface CategoryMeta {
  id: RecordCategory;
  name: string;
  subtitle: string;
  count: number;
  iconSvg: React.ReactNode;
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: "history",
    name: "Medical History",
    subtitle: "Pneumonia, Concussion",
    count: 2,
    iconSvg: (
      <svg className="w-5 h-5 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    id: "labs",
    name: "Lab Tests",
    subtitle: "Glucose, Lipid Panel, CBC",
    count: 4,
    iconSvg: (
      <svg className="w-5 h-5 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "radiology",
    name: "Radiology & X-rays",
    subtitle: "Chest Digital Scan, MRI",
    count: 4,
    iconSvg: (
      <svg className="w-5 h-5 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "diagnoses",
    name: "Medical Diagnoses",
    subtitle: "Physician Certified Records",
    count: 3,
    iconSvg: (
      <svg className="w-5 h-5 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "reports",
    name: "Medical Reports",
    subtitle: "Hospital summaries & notes",
    count: 5,
    iconSvg: (
      <svg className="w-5 h-5 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
];

export default function MedicalRecordsPage() {
  const { isDemo } = useAuth();
  const [activeTab, setActiveTab] = useState<RecordCategory>("labs");
  const [dicomModalItem, setDicomModalItem] = useState<MedicalRecordItem | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [recordSearch, setRecordSearch] = useState("");
  const [records, setRecords] = useState<MedicalRecordItem[]>(DEFAULT_MEDICAL_RECORDS);

  React.useEffect(() => {
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#0080DF]/30 selection:text-[#0080DF] pb-16 lg:pb-0">
      <div className="hidden lg:block sticky top-0 z-50">
        <PatientNavbar />
      </div>

      <MobilePatientHeader />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col gap-6 lg:gap-8">
        {/* Page Introduction matching Figma Node 299:3286 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01091E] tracking-tight font-heading">
              Medical Records
            </h1>
            <p className="text-sm sm:text-base text-[#41474F] leading-normal font-sans max-w-2xl">
              Review and manage your authenticated personal health data and diagnostic reports securely anchored with PulseID biometric telemetry.
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

        {/* Share toast */}
        {shareToast && (
          <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-[#0080DF] text-xs font-semibold flex items-center justify-between animate-in fade-in">
            <span>Encrypted QR link copied to clipboard for authorized doctor consultation!</span>
            <button type="button" onClick={() => setShareToast(false)}>✕</button>
          </div>
        )}

        {/* Prototype Demonstration Banner */}
        <div className="w-full p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
          <span className="font-bold text-amber-600 mt-0.5">ℹ</span>
          <div>
            <strong>Demonstration Prototype:</strong> Diagnostic imaging (DICOM), lab panels, and hospital discharge PDFs are not supported in backend API v1 (classified as <code className="font-mono bg-amber-100 px-1 rounded text-[11px]">BACKEND_UNSUPPORTED</code>). This screen demonstrates the intended Figma diagnostic repository UX using prototype records.
          </div>
        </div>

        {/* Identity Banner matching Node 299:3287 */}
        <PatientProfileBanner />

        {/* 2-Column Responsive Layout matching Figma Node 299:3288 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Column: Diagnostics Subcategories (4 cols) matching Node 299:3289 */}
          <div className="lg:col-span-4 bg-white rounded-[20px] p-4 sm:p-5 border border-[#E9EFFD] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex flex-col gap-2">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-3 py-2">
              DIAGNOSTICS SUBCATEGORIES
            </span>

            {CATEGORIES.map((cat) => {
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
                        isActive ? "bg-white shadow-xs text-[#0080DF]" : "bg-slate-100 text-slate-500 group-hover:text-[#0080DF]"
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

          {/* Right Column: Records Content (8 cols) matching Figma Node 299:3330 */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            {/* Header row with Upload Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#02307D] font-heading">
                    {activeTab === "labs"
                      ? "Lab Tests & Biomarkers"
                      : activeTab === "radiology"
                      ? "Radiology & X-rays"
                      : activeTab === "history"
                      ? "Medical History"
                      : activeTab === "diagnoses"
                      ? "Medical Diagnoses"
                      : "Medical Reports"}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0080DF] text-[12px] font-bold">
                    {displayedRecords.length} {activeTab === "labs" ? "Authenticated Results" : "Sample Records"}
                  </span>
                </div>
                <p className="text-[12px] text-slate-500 font-sans mt-1">
                  {activeTab === "labs"
                    ? "Diagnostic laboratory work, lipid panels, pathology analysis, and automated biometrics."
                    : activeTab === "radiology"
                    ? "Sample records • Imaging findings and study documents."
                    : activeTab === "history"
                    ? "Sample records • Previous illnesses, treatment and recovery."
                    : activeTab === "diagnoses"
                    ? "Sample records • Physician assessments and clinical status."
                    : "Sample records • Hospital summaries and clinical documents."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setUploadModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white text-[13px] font-semibold transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span>Upload Report</span>
              </button>
            </div>

            {/* Filter / Search Bar */}
            <div className="relative w-full">
              <input
                type="text"
                value={recordSearch}
                onChange={(e) => setRecordSearch(e.target.value)}
                placeholder="Search records by title, doctor, clinic, findings..."
                className="w-full h-11 pl-10 pr-4 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-[#078BDE] focus:outline-none focus:ring-1 focus:ring-[#078BDE] transition-all"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* List of Records Cards matching Figma Nodes */}
            <div className="flex flex-col gap-4">
              {displayedRecords.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[20px] p-6 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col gap-4"
                >
                  {/* Top card row: Title & Badges */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F3FF] flex items-center justify-center text-[#0080DF] shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </div>

                      <div className="flex flex-col">
                        <h3 className="text-[17px] font-bold text-[#02307D] font-heading leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-[12px] text-slate-500 font-sans mt-0.5">
                          {item.subtitle || `${item.facility} • Date: ${item.date}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-3 py-1 rounded-full bg-sky-50 text-[#0080DF] text-[12px] font-bold border border-sky-200">
                        {item.statusBadge.label}
                      </span>
                      {item.pdfAvailable && (
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0080DF] text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>📄 PDF</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Metrics grid if present (e.g. Lipid Panel, Blood Glucose) */}
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E9EFFD]">
                      {item.metrics.map((m) => (
                        <div key={m.label} className="flex flex-col">
                          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            {m.label}
                          </span>
                          <span className="text-[16px] font-bold text-[#02307D] font-mono mt-0.5">
                            {m.value}
                          </span>
                          {m.note && (
                            <span className="text-[11px] text-slate-500 font-sans mt-0.5">{m.note}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Visual slider bar if present (e.g. Fasting Glucose) */}
                  {item.id === "rec-lab-1" && (
                    <div className="flex flex-col gap-1.5 pt-1">
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden relative">
                        <div className="absolute left-[30%] right-[30%] h-full bg-emerald-400/80 rounded-full" />
                        <div className="absolute left-[55%] top-0 bottom-0 w-3 -ml-1.5 bg-[#0080DF] rounded-full ring-2 ring-white shadow-xs" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Optimal Clinical Range (70–99 mg/dL)</span>
                        <span className="text-emerald-700 font-semibold">Safe physiological threshold</span>
                      </div>
                    </div>
                  )}

                  {/* Description or Findings */}
                  {item.description && (
                    <p className="text-[13px] text-[#41474F] leading-relaxed font-sans bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                      {item.description}
                    </p>
                  )}
                  {item.findings && (
                    <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 text-[13px] text-[#41474F] leading-relaxed">
                      <strong className="text-slate-700 block mb-1">Radiologist Impression:</strong>
                      {item.findings}
                    </div>
                  )}

                  {/* Action buttons (DICOM viewer, download scan) */}
                  {item.dicomViewerUrl && (
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setDicomModalItem(item)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white text-[12px] font-semibold transition-colors shadow-sm cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Open DICOM Viewer</span>
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-semibold transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        <span>Download Study (42 MB)</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* DICOM Radiographic Viewer Modal */}
      {dicomModalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A101D] text-white rounded-[24px] max-w-4xl w-full p-6 shadow-2xl border border-slate-700 flex flex-col gap-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 text-xs font-mono font-bold border border-cyan-700">
                  DICOM READY
                </span>
                <h3 className="text-lg font-bold text-white font-heading">{dicomModalItem.title}</h3>
                <span className="text-xs text-slate-400 font-mono">PulseID Diagnostic Imaging</span>
              </div>
              <button
                type="button"
                onClick={() => setDicomModalItem(null)}
                className="text-slate-400 hover:text-white text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Diagnostic viewer canvas preview */}
            <div className="w-full h-96 rounded-xl bg-black border border-slate-800 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/30 via-slate-900/50 to-black" />
              <div className="relative z-10 text-center flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-2xl bg-cyan-950/60 border border-cyan-800 flex items-center justify-center text-cyan-400 shadow-inner">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-cyan-200">High-Fidelity PACS Radiographic Viewer</p>
                  <p className="text-xs text-slate-400 mt-1">Multi-planar DICOM reconstructed slice: Axial / Coronal / Sagittal</p>
                </div>
              </div>

              {/* HUD Telemetry corners */}
              <div className="absolute top-3 left-4 text-[10px] font-mono text-cyan-400/80">
                kVp: 120 • mA: 250 • Window: Lung (W:1500 L:-600)
              </div>
              <div className="absolute top-3 right-4 text-[10px] font-mono text-cyan-400/80">
                Zoom: 100% • Slice: 14/48
              </div>
              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-500">
                Cairo Scan PACS Server • Zero-loss uncompressed DICOM
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>Patient consent verified • Audit logging active</span>
              <button
                type="button"
                onClick={() => setDicomModalItem(null)}
                className="px-5 py-2 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white font-semibold cursor-pointer"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Report Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#02307D]">Upload Diagnostic Report</h3>
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

              {/* Limitation notice */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left">
                <strong>Unsupported in Backend v1:</strong> Diagnostic document and DICOM uploads are not implemented in OpenAPI v1 (<code className="font-mono text-[11px] bg-amber-100 px-1 rounded">BACKEND_UNSUPPORTED</code>). File storage will activate upon backend imaging service deployment.
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center flex flex-col items-center gap-3 bg-slate-50 w-full">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-[#0080DF]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#02307D]">Click or drag & drop diagnostic file</p>
                <p className="text-xs text-slate-500 mt-1">PDF, DICOM (.dcm), JPG, PNG up to 50MB</p>
              </div>
              <input type="file" className="hidden" id="report-upload-input" />
              <label
                htmlFor="report-upload-input"
                className="px-4 py-2 rounded-xl bg-[#0080DF] text-white text-xs font-semibold cursor-pointer shadow-sm hover:bg-[#0070C5]"
              >
                Select File
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <PatientFooter />
      <MobileBottomNav />
    </div>
  );
}
