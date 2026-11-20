"use client";

import React from "react";
import {
  PatientNavbar,
  PatientFooter,
  PatientInfoCard,
  mapProfileToPatientIdentity,
} from "@/features/patient";
import { useMedicalRecords } from "@/features/patient/hooks/use-medical-records";
import {
  RecordsSidebar,
  RecordsListPanel,
  DicomViewerModal,
  UploadReportModal,
} from "@/features/patient/components/records";

export default function MedicalRecordsPage() {
  const {
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
    profile,
    displayedRecords,
    handleShare,
  } = useMedicalRecords();

  const patientIdentity = mapProfileToPatientIdentity(profile, isDemo);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#0080DF]/30 selection:text-[#0080DF]">
      <PatientNavbar />

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

        {/* Unified Authoritative Patient Information Card (Desktop Figma 299:3287) */}
        <PatientInfoCard
          patient={patientIdentity}
          variant="general"
          isDemoPreview={isDemo}
          nodeId="299:3287"
        />

        {/* 2-Column Responsive Layout matching Figma Node 299:3288 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Column: Diagnostics Subcategories (4 cols) matching Node 299:3289 */}
          <RecordsSidebar activeTab={activeTab} onSelectTab={setActiveTab} />

          {/* Right Column: Records Content (8 cols) matching Figma Node 299:3330 */}
          <RecordsListPanel
            activeTab={activeTab}
            displayedRecords={displayedRecords}
            recordSearch={recordSearch}
            onSearchChange={setRecordSearch}
            onOpenUpload={() => setUploadModalOpen(true)}
            onOpenDicom={(item) => setDicomModalItem(item)}
          />
        </div>
      </main>

      {/* DICOM Radiographic Viewer Modal */}
      <DicomViewerModal
        item={dicomModalItem}
        onClose={() => setDicomModalItem(null)}
      />

      {/* Upload Report Modal */}
      <UploadReportModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />

      <PatientFooter />
    </div>
  );
}
