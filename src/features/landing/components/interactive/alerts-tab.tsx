"use client";

import React, { useState } from "react";
import { AlertTriangleIcon, CheckIcon } from "./icons";

export function AlertsTab() {
  const [dispenseReviewed, setDispenseReviewed] = useState(false);
  const [allergyAcknowledged, setAllergyAcknowledged] = useState(false);

  return (
    <div className="w-full">
      <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#078bde] block mb-3">
        WHERE IT APPEARS IN THE SYSTEM
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Panel: Pharmacist - Dispensing */}
        <div className="bg-white border border-[#dde7ff] rounded-[18px] overflow-hidden shadow-sm">
          <div className="bg-[#02307d] text-white px-5 py-3 flex items-center justify-between text-[13px] font-bold">
            <span>Pharmacist &middot; Dispensing Screen</span>
            <span className="text-cyan-300 font-mono text-[12px]">Rx #4471</span>
          </div>

          <div className="p-5 space-y-3.5">
            <div className="p-3 bg-[#f8fbfe] border border-slate-200 rounded-xl text-[13px]">
              <span className="font-bold text-slate-900">Uniloxam 750 mg tabs</span>
              <span className="text-slate-500 ml-1.5 font-medium">levofloxacin</span>
            </div>

            {/* Moderate Interaction Alert */}
            <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-xl">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-[13px]">
                <AlertTriangleIcon className="size-4 text-amber-700 shrink-0" />
                <span>Interaction &middot; Moderate</span>
              </div>
              <p className="mt-1.5 text-[12.5px] text-amber-900 leading-relaxed">
                Patient takes warfarin. Fluoroquinolones can raise INR and potentiate bleeding risk. Pharmacist or prescriber review required prior to dispense.
              </p>
              <button
                type="button"
                onClick={() => setDispenseReviewed(!dispenseReviewed)}
                className={`mt-3 px-3.5 py-1.5 rounded-lg font-bold text-[11.5px] cursor-pointer transition-all ${
                  dispenseReviewed
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-amber-200/80 hover:bg-amber-200 text-amber-900"
                }`}
              >
                {dispenseReviewed ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CheckIcon className="size-3.5" />
                    <span>Clinical consultation documented</span>
                  </span>
                ) : (
                  "Review before dispensing"
                )}
              </button>
            </div>

            <div className="p-3 bg-[#f8fbfe] border border-slate-200 rounded-xl text-[13px]">
              <span className="font-bold text-slate-900">Tebofortin 120</span>
              <span className="text-slate-500 ml-1.5 font-medium">Ginkgo biloba extract</span>
            </div>
          </div>
        </div>

        {/* Right Panel: PULSEID - Medical Information / Allergies */}
        <div className="bg-white border border-[#dde7ff] rounded-[18px] overflow-hidden shadow-sm">
          <div className="bg-[#02307d] text-white px-5 py-3 flex items-center justify-between text-[13px] font-bold">
            <span>PULSEID &middot; Medical Information</span>
            <span className="text-cyan-300 text-[12px]">Allergy Registry</span>
          </div>

          <div className="p-5 space-y-3.5">
            <div className="p-3 bg-[#f8fbfe] border border-slate-200 rounded-xl text-[13px] flex items-center justify-between">
              <span className="font-bold text-slate-900">Penicillin (Amoxicillin / Ampicillin)</span>
              <span className="text-[10.5px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-bold">
                Unverified
              </span>
            </div>

            <div className="p-3 bg-[#f8fbfe] border border-slate-200 rounded-xl text-[13px] flex items-center justify-between">
              <span className="font-bold text-slate-900">Aspirin &amp; NSAIDs</span>
              <span className="text-[10.5px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-bold">
                Unverified
              </span>
            </div>

            {/* Danger Allergy Conflict */}
            <div className="p-4 bg-rose-50/90 border border-rose-300 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-[13px]">
                  <AlertTriangleIcon className="size-4 text-rose-700 shrink-0" />
                  <span>Allergy conflict flagged</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAllergyAcknowledged(!allergyAcknowledged)}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer transition-all ${
                    allergyAcknowledged
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-200 text-rose-900 hover:bg-rose-300"
                  }`}
                >
                  {allergyAcknowledged ? "Acknowledged" : "Dismiss warning"}
                </button>
              </div>
              <p className="mt-1.5 text-[12.5px] text-rose-900 leading-relaxed">
                New pending Rx item: Amoxicillin (penicillin beta-lactam class). Active documented patient hypersensitivity reaction. Consult prescribing clinician immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
