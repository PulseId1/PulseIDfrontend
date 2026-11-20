"use client";

import React, { useState } from "react";
import {
  PatientNavbar,
  PatientProfileBanner,
  PatientFooter,
  PatientHealthInfoModal,
} from "@/features/patient";
import { PatientService } from "@/lib/api/patient-service";
import { DemoService } from "@/lib/demo/demo-service";
import { useMedicalInfo } from "@/features/patient/hooks/use-medical-info";
import { SubcategoryNav } from "@/features/patient/components/medical-info/subcategory-nav";
import {
  ChronicConditionsPanel,
  AllergiesPanel,
  MedicationsPanel,
  SurgeriesPanel,
} from "@/features/patient/components/medical-info/medical-info-panels";
import { AddMedicalItemModal } from "@/features/patient/components/medical-info/add-medical-item-modal";

export default function MedicalInfoPage() {
  const {
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
  } = useMedicalInfo();

  const [isHealthInfoModalOpen, setIsHealthInfoModalOpen] = useState(false);

  const chronicList = profile.chronicDiseases || [];
  const allergyList = profile.allergyMenu || [];
  const medicationList = profile.currentMedications || [];
  const surgeryList = profile.previousSurgicalProcedures || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#0080DF]/30 selection:text-[#0080DF]">
      <PatientNavbar />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col gap-6 lg:gap-8">
        {/* Page Introduction matching Figma Node 299:1643 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01091E] tracking-tight font-heading">
              Medical Information
            </h1>
            <p className="text-sm sm:text-base text-[#41474F] leading-normal font-sans whitespace-normal lg:whitespace-nowrap">
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

        {/* Identity Banner delegating to unified PatientInfoCard */}
        <PatientProfileBanner profile={profile} isDemoPreview={isDemo} />

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Column: Personal Health Subcategories (4 cols) */}
          <SubcategoryNav
            profile={profile}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />

          {/* Right Column: Tab View Content (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            {activeTab === "chronic" && (
              <ChronicConditionsPanel
                conditions={chronicList}
                onAddClick={() => setIsHealthInfoModalOpen(true)}
                onEditClick={() => setIsHealthInfoModalOpen(true)}
              />
            )}

            {activeTab === "allergies" && (
              <AllergiesPanel
                allergies={allergyList}
                onAddClick={() => setActiveModal("allergies")}
              />
            )}

            {activeTab === "medications" && (
              <MedicationsPanel
                medications={medicationList}
                onAddClick={() => setActiveModal("medications")}
              />
            )}

            {activeTab === "surgeries" && (
              <SurgeriesPanel
                surgeries={surgeryList}
                onAddClick={() => setActiveModal("surgeries")}
              />
            )}
          </div>
        </div>
      </main>

      {/* Add Item Modal */}
      <AddMedicalItemModal
        activeModal={activeModal}
        newItemName={newItemName}
        newItemDetail={newItemDetail}
        onNameChange={setNewItemName}
        onDetailChange={setNewItemDetail}
        onClose={() => setActiveModal(null)}
        onSubmit={handleAddItem}
      />

      {/* Authentic Figma Patient Health Information Modal (Node 299:5297 / 365:1747) */}
      <PatientHealthInfoModal
        isOpen={isHealthInfoModalOpen}
        onClose={() => setIsHealthInfoModalOpen(false)}
        initialData={{
          dateOfBirth: "1988-09-14",
          bloodType: "O+ (Positive)",
          chronicConditions: chronicList.map((c) => c.name || "").filter(Boolean),
          allergies: allergyList.map((a) => a.name || "").filter(Boolean),
          medications: medicationList.map((m) => m.name || "").filter(Boolean),
        }}
        onSave={(updated) => {
          if (isDemo) {
            if (updated.chronicDiseases) {
              updated.chronicDiseases.forEach((c) => {
                if (c.name) DemoService.addChronicCondition(c.name, "");
              });
            }
            // re-fetch demo data
          } else {
            const merged = { ...profile, ...updated };
            PatientService.updatePatientProfile(merged);
          }
        }}
      />

      <PatientFooter />
    </div>
  );
}
