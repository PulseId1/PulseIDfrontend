"use client";

import React, { useState } from "react";
import { CheckIcon } from "./icons";

export function EcosystemTab() {
  const [ecoSelectedParty, setEcoSelectedParty] = useState<"doctor" | "pharmacy" | "lab" | "hospital">("doctor");
  const [ecoApproved, setEcoApproved] = useState(false);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Modern Alive Ecosystem Mesh */}
        <div className="lg:col-span-5 bg-[#f8fbfe] border border-[#dde7ff] rounded-[18px] p-5 relative min-h-[440px] flex flex-col justify-between shadow-inner overflow-hidden">
          <div className="flex justify-between items-center text-[11px] font-mono text-[#078bde] font-bold z-10">
            <span>LIVE INTEROPERABILITY MESH</span>
            <span className="text-slate-400">Click a node to inspect</span>
          </div>

          {/* Dynamic SVG Connecting lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" stroke="#078bde" strokeWidth="1.5" strokeDasharray="4 4">
              <line x1="90" y1="90" x2="200" y2="200" />
              <line x1="310" y1="90" x2="200" y2="200" />
              <line x1="90" y1="310" x2="200" y2="200" />
              <line x1="310" y1="310" x2="200" y2="200" />
            </svg>
          </div>

          {/* Top Nodes */}
          <div className="flex justify-between z-10">
            <button
              type="button"
              onClick={() => setEcoSelectedParty("doctor")}
              className={`p-3 rounded-xl border text-center w-[130px] cursor-pointer transition-all ${
                ecoSelectedParty === "doctor"
                  ? "bg-white border-[#078bde] shadow-md ring-2 ring-[#078bde]/30 scale-105"
                  : "bg-white/80 border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className="font-bold text-[12.5px] text-[#02307d] block">Doctor / Clinic</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">&bull; Connected</span>
            </button>

            <button
              type="button"
              onClick={() => setEcoSelectedParty("pharmacy")}
              className={`p-3 rounded-xl border text-center w-[130px] cursor-pointer transition-all ${
                ecoSelectedParty === "pharmacy"
                  ? "bg-white border-[#078bde] shadow-md ring-2 ring-[#078bde]/30 scale-105"
                  : "bg-white/80 border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className="font-bold text-[12.5px] text-[#02307d] block">Pharmacy</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">&bull; e-Rx sync</span>
            </button>
          </div>

          {/* Pulsing Central Hub */}
          <div className="self-center z-10 size-28 rounded-full bg-gradient-to-b from-[#02307d] to-[#078bde] text-white flex flex-col items-center justify-center text-center p-2 shadow-xl ring-4 ring-blue-100">
            <span className="font-bold text-[13px] uppercase tracking-wider">PATIENT</span>
            <span className="text-[11px] text-cyan-200">Consent Root</span>
          </div>

          {/* Bottom Nodes */}
          <div className="flex justify-between z-10">
            <button
              type="button"
              onClick={() => setEcoSelectedParty("lab")}
              className={`p-3 rounded-xl border text-center w-[130px] cursor-pointer transition-all ${
                ecoSelectedParty === "lab"
                  ? "bg-white border-[#078bde] shadow-md ring-2 ring-[#078bde]/30 scale-105"
                  : "bg-white/80 border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className="font-bold text-[12.5px] text-[#02307d] block">Laboratory</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">&bull; HL7 ingest</span>
            </button>

            <button
              type="button"
              onClick={() => setEcoSelectedParty("hospital")}
              className={`p-3 rounded-xl border text-center w-[130px] cursor-pointer transition-all ${
                ecoSelectedParty === "hospital"
                  ? "bg-white border-[#078bde] shadow-md ring-2 ring-[#078bde]/30 scale-105"
                  : "bg-white/80 border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className="font-bold text-[12.5px] text-[#02307d] block">Hospital</span>
              <span className="text-[10px] text-cyan-600 font-semibold block mt-0.5">&bull; EHR bridge</span>
            </button>
          </div>
        </div>

        {/* Right: Live Interactive Facility Console */}
        <div className="lg:col-span-7 bg-white border border-[#dde7ff] rounded-[18px] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="font-bold text-[16px] text-[#02307d] capitalize">
                {ecoSelectedParty === "doctor" && "Doctor / Clinic Gateway"}
                {ecoSelectedParty === "pharmacy" && "Pharmacy Dispense Network"}
                {ecoSelectedParty === "lab" && "Diagnostic Laboratory Pipeline"}
                {ecoSelectedParty === "hospital" && "Hospital Inpatient EHR Bridge"}
              </span>
              <span className="text-[12px] text-slate-500 block">
                FHIR &middot; HL7 Interoperability Protocol v4.0
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Session (12h lease)
            </span>
          </div>

          {/* Pending Request Card */}
          <div className="border border-[#078bde]/30 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-[#02307d] text-white px-4 py-2 flex items-center justify-between text-[12px] font-bold">
              <span>Access Request &middot; Granular Scope</span>
              <span className="bg-amber-400 text-slate-900 px-2 py-0.2 rounded text-[10px]">
                Pending 1
              </span>
            </div>

            <div className="p-4 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-[15px] text-slate-900 block">
                    Dr. Tarek Al-Husseini
                  </span>
                  <span className="text-[12px] text-slate-500">Consultant Pulmonologist</span>
                </div>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded border ${
                    ecoApproved
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  {ecoApproved ? (
                    <span className="inline-flex items-center gap-1">
                      <CheckIcon className="size-3 text-emerald-600" />
                      <span>Approved</span>
                    </span>
                  ) : (
                    "Pending Approval"
                  )}
                </span>
              </div>

              <div className="flex gap-2 text-[11px]">
                <span className="bg-blue-50 text-[#078bde] px-2 py-0.5 rounded font-medium">Medical Records</span>
                <span className="bg-blue-50 text-[#078bde] px-2 py-0.5 rounded font-medium">Prescriptions</span>
                <span className="bg-blue-50 text-[#078bde] px-2 py-0.5 rounded font-medium">Allergies</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg text-[12px] text-slate-700">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">REASON FOR ACCESS</span>
                Clinical consultation, asthma management, and spirometry test review.
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  Expires today at 09:15 PM (12 hours)
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEcoApproved(true)}
                    className="px-4 py-1.5 rounded-lg bg-[#078bde] hover:bg-[#0070bc] text-white text-[12px] font-bold cursor-pointer transition-all"
                  >
                    {ecoApproved ? (
                      <span className="inline-flex items-center gap-1">
                        <CheckIcon className="size-3 text-white" />
                        <span>Approved</span>
                      </span>
                    ) : (
                      "Review & Approve"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEcoApproved(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-[12px] font-medium cursor-pointer"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
