"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  RobotIcon,
  MessageChatIcon,
  StethoscopeIcon,
  AlertTriangleIcon,
} from "./icons";

export function RagSystemTab() {
  const [ragMode, setRagMode] = useState<"patient" | "doctor">("patient");
  const [ragPatientQuery, setRagPatientQuery] = useState(
    "Can I take ibuprofen with my asthma?"
  );
  const [ragDoctorQuery, setRagDoctorQuery] = useState(
    "Summarize relevant history for asthma follow-up"
  );
  const [isRagThinking, setIsRagThinking] = useState(false);
  const [ragHasAnswered, setRagHasAnswered] = useState(true);

  const triggerRagQuery = (query: string, isPatient: boolean) => {
    if (isPatient) {
      setRagPatientQuery(query);
    } else {
      setRagDoctorQuery(query);
    }
    setIsRagThinking(true);
    setRagHasAnswered(false);
    setTimeout(() => {
      setIsRagThinking(false);
      setRagHasAnswered(true);
    }, 380);
  };

  return (
    <div className="w-full">
      {/* Mode Selector Toggle */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setRagMode("patient");
              triggerRagQuery("Can I take ibuprofen with my asthma?", true);
            }}
            className={`py-1.5 px-4 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
              ragMode === "patient"
                ? "bg-[#078bde] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Patient mode
          </button>
          <button
            type="button"
            onClick={() => {
              setRagMode("doctor");
              triggerRagQuery("Summarize relevant history for asthma follow-up", false);
            }}
            className={`py-1.5 px-4 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
              ragMode === "doctor"
                ? "bg-[#02307d] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Doctor mode
          </button>
        </div>
        <span className="text-[12px] text-slate-400 hidden sm:inline">
          Click any sample prompt to ask
        </span>
      </div>

      {/* Clickable Sample Questions */}
      <div className="mb-5 flex flex-wrap gap-2 text-[12px]">
        {ragMode === "patient" ? (
          <>
            <button
              type="button"
              onClick={() => triggerRagQuery("Can I take ibuprofen with my asthma?", true)}
              className={`px-3 py-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                ragPatientQuery === "Can I take ibuprofen with my asthma?"
                  ? "bg-blue-50 border-[#078bde] text-[#078bde] font-semibold"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <MessageChatIcon className="size-3.5 inline mr-1.5 text-[#078bde]" />
              &quot;Can I take ibuprofen with my asthma?&quot;
            </button>
            <button
              type="button"
              onClick={() => triggerRagQuery("What are the side effects of Uniloxam 750mg?", true)}
              className={`px-3 py-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                ragPatientQuery === "What are the side effects of Uniloxam 750mg?"
                  ? "bg-blue-50 border-[#078bde] text-[#078bde] font-semibold"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <MessageChatIcon className="size-3.5 inline mr-1.5 text-[#078bde]" />
              &quot;What are the side effects of Uniloxam?&quot;
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => triggerRagQuery("Summarize relevant history for asthma follow-up", false)}
              className={`px-3 py-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                ragDoctorQuery === "Summarize relevant history for asthma follow-up"
                  ? "bg-blue-50 border-[#02307d] text-[#02307d] font-semibold"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <StethoscopeIcon className="size-3.5 inline mr-1.5 text-[#02307d]" />
              &quot;Summarize asthma follow-up history&quot;
            </button>
            <button
              type="button"
              onClick={() => triggerRagQuery("Screen active medications for drug-drug interactions", false)}
              className={`px-3 py-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                ragDoctorQuery === "Screen active medications for drug-drug interactions"
                  ? "bg-blue-50 border-[#02307d] text-[#02307d] font-semibold"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <StethoscopeIcon className="size-3.5 inline mr-1.5 text-[#02307d]" />
              &quot;Screen drug-drug interactions&quot;
            </button>
          </>
        )}
      </div>

      {/* 1. User Question Bubble with Subtle Natural Chat Transition */}
      <div className="flex justify-end mb-4">
        <motion.div
          key={ragMode === "patient" ? ragPatientQuery : ragDoctorQuery}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={`text-white px-5 py-2.5 rounded-2xl rounded-tr-none text-[14px] font-medium shadow-sm ${
            ragMode === "patient" ? "bg-[#078bde]" : "bg-[#02307d]"
          }`}
        >
          {ragMode === "patient" ? ragPatientQuery : ragDoctorQuery}
        </motion.div>
      </div>

      {/* 2. AI Thinking State (Bouncing Dots) */}
      {isRagThinking && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#f8fbfe] border border-[#dde7ff] rounded-[14px] p-4 flex items-center gap-3 mb-4"
        >
          <RobotIcon className="size-5 text-[#078bde] animate-pulse" />
          <div className="flex items-center gap-1.5 text-[13px] text-slate-600 font-medium">
            <span>PulseID Clinical AI is analyzing verified records</span>
            <span className="flex gap-1 ml-1.5">
              <span className="size-1.5 rounded-full bg-[#078bde] animate-bounce [animation-delay:-0.3s]" />
              <span className="size-1.5 rounded-full bg-[#078bde] animate-bounce [animation-delay:-0.15s]" />
              <span className="size-1.5 rounded-full bg-[#078bde] animate-bounce" />
            </span>
          </div>
        </motion.div>
      )}

      {/* 3. Rendered Answer Card */}
      {ragHasAnswered && !isRagThinking && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-[#f8fbfe] border border-[#dde7ff] rounded-[16px] p-5 sm:p-6 space-y-4 text-slate-800 shadow-sm"
        >
          {ragMode === "patient" ? (
            <>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#078bde] block mb-1">
                  SHORT ANSWER
                </span>
                <p className="font-bold text-[15px] text-[#02307d] leading-snug">
                  {ragPatientQuery.includes("ibuprofen")
                    ? "Not without checking first. Ibuprofen can trigger breathing problems in some people with asthma."
                    : "Common side effects include mild nausea, headache, or dizziness. Stop and call your doctor if you develop joint or tendon pain."}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  WHY
                </span>
                <p className="text-[13px] text-slate-700 leading-relaxed">
                  {ragPatientQuery.includes("ibuprofen")
                    ? "Ibuprofen is an NSAID. In a subset of people with asthma, especially those who react to aspirin, NSAIDs can cause wheezing or bronchospasm."
                    : "Uniloxam is levofloxacin, a broad-spectrum fluoroquinolone antibacterial. Take with a full glass of water and complete the full prescribed course."}
                </p>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  FROM YOUR RECORD
                </span>
                <ul className="text-[12px] space-y-1 text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-amber-500" />
                    <span>Allergy list: aspirin / NSAID sensitivity (unverified)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span>Condition: Bronchial asthma (Verified by Dr. Mona Amin)</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-[12px] text-amber-900">
                <AlertTriangleIcon className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>WHAT TO DO:</strong> Ask your pharmacist for an asthma-safe alternative like paracetamol, unless your doctor advised otherwise.
                </span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#02307d] block mb-1">
                  CLINICAL SYNTHESIS &middot; ASTHMA COHORT TIMELINE
                </span>
                <p className="font-bold text-[14.5px] text-[#02307d] leading-snug">
                  28-year-old female with moderate persistent asthma. Maintenance: Symbicort Turbuhaler 160/4.5 mcg.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-1">Medication History</span>
                  <p className="text-slate-600 text-[11.5px]">
                    Good adherence reported. Ventolin inhaler used &le; 2x/week for acute relief.
                  </p>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-1">Recent Diagnostics</span>
                  <p className="text-slate-600 text-[11.5px]">
                    Normal chest radiograph (Sep 2026). Spirometry: FEV1 84% predicted.
                  </p>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-1">Risk Alerts</span>
                  <p className="text-amber-800 text-[11.5px] font-medium">
                    Reported NSAID cross-sensitivity. Avoid ketorolac, diclofenac &amp; ibuprofen.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl text-[12px] text-[#02307d] flex items-center justify-between">
                <span>Verified across 3 institutions (Clinic, Radiology, Pharmacy) via PulseID FHIR</span>
                <span className="font-bold text-[#078bde] hover:underline cursor-pointer">
                  Export clinical note &rarr;
                </span>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
