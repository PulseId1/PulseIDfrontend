"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PharmacistNavbar } from "@/features/pharmacist/pharmacist-navbar";
import { AiMedicalAssistantDrawer } from "@/features/pharmacist/ai-medical-assistant-drawer";
import { Footer } from "@/components/common";
import { X, ChevronDown, CheckCircle2 } from "lucide-react";

export default function PharmacistOtcDispensingPage() {
  const router = useRouter();
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("Paracetamol 500 mg");
  const [dosage, setDosage] = useState("500 mg");
  const [quantity, setQuantity] = useState("12");
  const [isAlertReviewed, setIsAlertReviewed] = useState(false);
  const [instructions, setInstructions] = useState(
    "Up to 3 times daily as needed for 3 days. Do not combine with other paracetamol products."
  );
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [medRemoved, setMedRemoved] = useState(false);

  const handleReviewSafety = () => {
    if (!isAlertReviewed) {
      alert("Please acknowledge that you reviewed the alerts and verified clinical suitability before proceeding.");
      return;
    }
    setReviewModalOpen(true);
  };

  return (
    <div
      className="min-h-screen bg-white text-[#41474f] flex flex-col font-sans selection:bg-[#078bde]/30 selection:text-[#078bde]"
      data-node-id="609:10742"
      data-name="04 • OTC Dispensing"
    >
      <PharmacistNavbar onOpenAiAssistant={() => setAiAssistantOpen(true)} />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-6">
        <div
          className="flex flex-col gap-[20px] items-start w-full max-w-[1216px] mx-auto"
          data-node-id="609:10785"
          data-name="Workflow body"
        >
          {/* Breadcrumb Navigation */}
          <div
            className="font-semibold text-sm leading-[20px] text-[#01091e] w-full"
            data-node-id="609:10786"
          >
            <Link
              href="/pharmacist"
              className="hover:text-[#078bde] transition-colors"
            >
              Home
            </Link>{" "}
            &nbsp;/&nbsp;{" "}
            <span className="text-[#01091e]">OTC Dispensing</span>
          </div>

          {/* Heading */}
          <h1
            className="font-semibold text-[28px] leading-[36px] text-[#02307d] w-full"
            data-node-id="609:10787"
          >
            OTC Medication Entry
          </h1>

          {/* Subtitle */}
          <p
            className="font-normal text-sm leading-[20px] text-[#727272] w-full -mt-2"
            data-node-id="609:10788"
          >
            Record over-the-counter medication dispensing and review patient safety information.
          </p>

          {/* Selected patient (Figma 609:10789) */}
          <div
            className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col items-start p-[24px] rounded-[16px] w-full"
            data-node-id="609:10789"
            data-name="Selected patient"
          >
            <div
              className="flex flex-col sm:flex-row gap-[16px] items-start sm:items-center w-full justify-between"
              data-node-id="609:10790"
              data-name="Patient identity"
            >
              <div className="flex gap-[16px] items-center">
                <div
                  className="relative rounded-[12px] size-[56px] shrink-0 overflow-hidden bg-slate-100 border border-slate-200"
                  data-node-id="463:1133"
                  data-name="Pulse / Patient avatar"
                >
                  <img
                    alt="Ahmed Hassan"
                    className="absolute inset-0 object-cover rounded-[12px] size-full"
                    src="/assets/pharmacist/e36177f193c85b45ffc5c98695a3a33c15facbf4.png"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/pharmacist/aa824485f5de52e1131d4a4b59799f31d35747b1.png";
                    }}
                  />
                </div>

                <div
                  className="flex flex-col gap-[4px] items-start"
                  data-node-id="609:10792"
                  data-name="Patient details"
                >
                  <p
                    className="font-semibold text-[18px] leading-[26px] text-[#02307d] w-full"
                    data-node-id="609:10793"
                  >
                    Ahmed Hassan
                  </p>
                  <p
                    className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                    data-node-id="609:10794"
                  >
                    PT-10482 • Male, 48 years • National ID: ••••••••••4821
                  </p>
                  <p
                    className="font-normal text-xs leading-[20px] text-[#ef4444] w-full"
                    data-node-id="609:10795"
                  >
                    Authorized pharmacy access • Ibuprofen allergy: hives
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPatientModalOpen(true)}
                className="bg-white border border-[#dde7ff] text-[#02307d] hover:bg-slate-50 font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[256px] rounded-[8px] flex items-center justify-center cursor-pointer transition-colors shrink-0"
                data-name="Pulse / Button / Secondary"
              >
                Change Patient
              </button>
            </div>
          </div>

          {/* Medication lookup (Figma 609:10797) */}
          <div
            className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[16px] items-start p-[24px] rounded-[16px] w-full"
            data-node-id="609:10797"
            data-name="Medication lookup"
          >
            <p
              className="font-semibold text-sm leading-[20px] text-[#02307d] w-full"
              data-node-id="609:10798"
            >
              Search Medication
            </p>

            <div
              className="flex flex-col sm:flex-row gap-[16px] items-center w-full"
              data-node-id="609:10799"
              data-name="Medication search controls"
            >
              {/* Pulse Search field */}
              <div
                className="bg-white border border-[#dde7ff] flex gap-[12px] h-[44px] items-center px-[16px] rounded-[8px] w-full sm:w-[894px] shrink-0"
                data-node-id="463:1229"
                data-name="Pulse / Search field"
              >
                <div
                  className="relative shrink-0 size-[24px]"
                  data-name="ant-design:search-outlined"
                >
                  <img
                    alt="Search"
                    className="absolute block inset-0 size-full"
                    src="/assets/pharmacist/38aeaad45a8148c71049cb40bfd845ffe5e101d0.svg"
                  />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Patient full name or National ID or medication name"
                  className="font-semibold text-sm leading-[20px] text-[#727272] w-full bg-transparent focus:outline-none"
                />
              </div>

              {/* Add Another Medication Button */}
              <button
                type="button"
                onClick={() => {
                  setMedRemoved(false);
                  alert(`Added ${searchQuery} to current OTC dispense order.`);
                }}
                className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#02307d] font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[256px] rounded-[8px] flex items-center justify-center cursor-pointer transition-colors shrink-0"
                data-name="Pulse / Button / Secondary"
              >
                + Add Another Medication
              </button>
            </div>
          </div>

          {/* Selected OTC medications (Figma 609:10802) */}
          {!medRemoved ? (
            <div
              className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[16px] items-start p-[24px] rounded-[16px] w-full"
              data-node-id="609:10802"
              data-name="Selected OTC medications"
            >
              <p
                className="font-semibold text-[18px] leading-[26px] text-[#02307d] w-full"
                data-node-id="609:10803"
              >
                Selected Medications
              </p>

              <p
                className="font-semibold text-base leading-[26px] text-[#02307d] w-full"
                data-node-id="609:10804"
              >
                Paracetamol 500 mg
              </p>

              <div
                className="font-normal text-sm leading-[20px] text-[#41474f] w-full space-y-0.5"
                data-node-id="609:10805"
              >
                <p className="mb-0">
                  Dosage: 1 tablet • Quantity: {quantity} tablets
                </p>
                <p className="mb-0">Instructions: {instructions}</p>
              </div>

              {/* Controls row */}
              <div
                className="flex flex-col sm:flex-row gap-[16px] items-center w-full"
                data-node-id="609:10806"
                data-name="Paracetamol controls"
              >
                {/* Dosage dropdown button */}
                <div className="relative w-full sm:w-[256px]">
                  <select
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full bg-white border border-[#dde7ff] text-[#02307d] font-semibold text-sm h-[40px] px-4 rounded-[8px] appearance-none cursor-pointer focus:outline-none focus:border-[#078bde] text-center"
                  >
                    <option value="500 mg">Dosage: 500 mg</option>
                    <option value="1000 mg">Dosage: 1000 mg</option>
                    <option value="250 mg">Dosage: 250 mg</option>
                  </select>
                  <ChevronDown className="size-4 text-[#02307d] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Quantity dropdown button */}
                <div className="relative w-full sm:w-[256px]">
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-white border border-[#dde7ff] text-[#02307d] font-semibold text-sm h-[40px] px-4 rounded-[8px] appearance-none cursor-pointer focus:outline-none focus:border-[#078bde] text-center"
                  >
                    <option value="12">Quantity: 12</option>
                    <option value="20">Quantity: 20</option>
                    <option value="24">Quantity: 24</option>
                    <option value="30">Quantity: 30</option>
                  </select>
                  <ChevronDown className="size-4 text-[#02307d] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => setMedRemoved(true)}
                  className="bg-white border border-[#ef4444] text-[#ef4444] hover:bg-red-50 font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[256px] rounded-[8px] flex items-center justify-center cursor-pointer transition-colors"
                  data-name="Pulse / Button / Danger"
                >
                  Remove
                </button>
              </div>

              {/* Edit instructions */}
              {isEditingInstructions ? (
                <div className="w-full space-y-2 pt-1">
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#dde7ff] text-xs text-[#41474f] focus:outline-none focus:border-[#078bde]"
                    rows={2}
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditingInstructions(false)}
                    className="text-xs font-semibold text-[#078bde] hover:underline cursor-pointer"
                  >
                    Done editing
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingInstructions(true)}
                  className="font-semibold text-sm leading-[20px] text-[#01091e] hover:underline cursor-pointer text-left"
                  data-node-id="609:10810"
                >
                  Edit usage instructions
                </button>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-[16px] p-6 text-center w-full">
              <p className="text-sm text-slate-500 mb-2">No medication selected for dispensing.</p>
              <button
                type="button"
                onClick={() => setMedRemoved(false)}
                className="text-xs font-semibold text-[#078bde] hover:underline cursor-pointer"
              >
                Restore Paracetamol 500 mg
              </button>
            </div>
          )}

          {/* Drug interactions and allergies (Figma 652:2605) */}
          <div
            className="bg-[#fbfeff] border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[12px] items-start p-[24px] rounded-[16px] w-full max-w-[808px]"
            data-node-id="652:2605"
            data-name="Drug interactions and allergies"
          >
            <p
              className="font-semibold text-[18px] leading-[26px] text-[#078bde] w-full"
              data-node-id="652:2606"
            >
              Drug interactions &amp; allergy review
            </p>

            <div
              className="font-normal text-sm leading-[20px] text-[#41474f] w-full space-y-0"
              data-node-id="652:2607"
            >
              <p className="leading-[20px] m-0">
                Verified record • Ibuprofen allergy: hives [AL-10482-01].
              </p>
              <p className="leading-[20px] m-0">
                Current medicines: Metformin 500 mg twice daily; lisinopril 10 mg daily [MR-10482-02].
              </p>
            </div>

            <div
              className="flex flex-col gap-[4px] items-start w-full leading-[20px] text-sm"
              data-node-id="652:2611"
              data-name="Potential interaction detected"
            >
              <p
                className="font-semibold text-[#ab4a05] w-full"
                data-node-id="652:2612"
              >
                MODERATE • Potassium chloride + lisinopril
              </p>
              <p
                className="font-normal text-[#41474f] w-full"
                data-node-id="652:2613"
              >
                Concurrent potassium supplementation and lisinopril may raise serum potassium. Verify recent potassium and renal function, and clarify monitoring with the prescriber before dispensing.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAiAssistantOpen(true)}
              className="font-semibold text-sm leading-[20px] text-[#078bde] hover:underline cursor-pointer text-left"
              data-node-id="652:2618"
            >
              View alert details &amp; sources
            </button>

            {/* Acknowledge button */}
            <button
              type="button"
              onClick={() => setIsAlertReviewed(!isAlertReviewed)}
              className={`border border-[#dde7ff] rounded-[8px] h-[40px] px-4 flex items-center justify-center cursor-pointer transition-all w-full max-w-[752px] ${
                isAlertReviewed
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : "bg-white hover:bg-slate-50 text-[#41474f]"
              }`}
              data-node-id="652:2622"
              data-name="@acknowledge"
            >
              <span className="font-semibold text-sm leading-[20px] flex items-center gap-2">
                <span className="text-base font-mono">
                  {isAlertReviewed ? "☑" : "□"}
                </span>
                <span>I reviewed the alerts and verified clinical suitability</span>
              </span>
            </button>
          </div>

          {/* Entry actions (Figma 609:10811) */}
          <div
            className="flex flex-col sm:flex-row gap-[16px] items-center w-full pt-1"
            data-node-id="609:10811"
            data-name="Entry actions"
          >
            <button
              type="button"
              onClick={handleReviewSafety}
              className="bg-[#078bde] hover:bg-[#0070c5] text-white font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[256px] rounded-[8px] flex items-center justify-center cursor-pointer shadow-xs transition-colors"
              data-name="Pulse / Button / Primary"
            >
              Review Medication Safety
            </button>

            <button
              type="button"
              onClick={() => router.push("/pharmacist")}
              className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#02307d] font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[256px] rounded-[8px] flex items-center justify-center cursor-pointer transition-colors"
              data-name="Pulse / Button / Secondary"
            >
              Cancel
            </button>
          </div>

          {/* Footer disclaimer (Figma 609:10814) */}
          <p
            className="font-normal text-xs leading-[20px] text-[#727272] w-full pt-1"
            data-node-id="609:10814"
          >
            Pulse ID • Al Shifa Pharmacy • Illustrative patient data
          </p>
        </div>
      </main>

      {/* Safety Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 bg-[#02307d] text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">OTC Safety Clearance</h3>
                <p className="text-xs text-sky-200">Patient: Ahmed Hassan (PT-10482)</p>
              </div>
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-left">
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs font-semibold">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>Paracetamol 500 mg has no severe contraindications with Lisinopril or Metformin.</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Confirming OTC dispensing records the event in the unified patient history without requiring a physician Rx code.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setReviewModalOpen(false);
                  alert("OTC dispensing authorized and recorded successfully!");
                  router.push("/pharmacist");
                }}
                className="px-5 py-2 rounded-lg bg-[#078bde] hover:bg-[#0070c5] text-white text-sm font-bold shadow-xs cursor-pointer"
              >
                Authorize &amp; Dispense
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Patient Modal */}
      {patientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 bg-[#02307d] text-white flex items-center justify-between">
              <h3 className="text-base font-bold">Select Active Patient</h3>
              <button
                type="button"
                onClick={() => setPatientModalOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="p-3 border border-[#078bde] bg-sky-50 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-[#02307d]">Ahmed Hassan</p>
                  <p className="text-xs text-slate-500">PT-10482 • Male, 48 years</p>
                </div>
                <span className="text-xs font-bold text-[#078bde]">Active</span>
              </div>
              <div
                onClick={() => {
                  setPatientModalOpen(false);
                  alert("Switched to Salma Adel (PT-10635).");
                }}
                className="p-3 border border-slate-200 hover:border-slate-300 rounded-xl flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="font-bold text-sm text-slate-800">Salma Adel</p>
                  <p className="text-xs text-slate-500">PT-10635 • Female, 42 years</p>
                </div>
                <span className="text-xs text-slate-400">Select</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Drawer */}
      <AiMedicalAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        patientName="Ahmed Hassan"
      />

      <Footer />
    </div>
  );
}
