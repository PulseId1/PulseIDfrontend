"use client";

import React, { useState } from "react";
import { X, Send, Sparkles, ShieldCheck, ChevronDown, ChevronUp, Bot } from "lucide-react";

interface AiMedicalAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
  patientId?: string;
}

export function AiMedicalAssistantDrawer({
  isOpen,
  onClose,
  patientName = "Ahmed Hassan",
  patientId = "PT-10482",
}: AiMedicalAssistantDrawerProps) {
  const [query, setQuery] = useState("");
  const [showSources, setShowSources] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; text: string; citations?: string[] }[]
  >([
    {
      role: "user",
      text: "Summarize the patient’s medication history.",
    },
    {
      role: "assistant",
      text: `Current medicines: Metformin 500 mg twice daily and lisinopril 10 mg daily [1].\n\nAllergy: Ibuprofen — hives [2].\n\nHistory: Type 2 diabetes and hypertension [3].\n\nSelected potassium chloride may raise potassium with lisinopril. Confirm monitoring with the prescriber [1,4]. No recent laboratory results are in the authorized record set.`,
      citations: [
        "1. Active prescription record MR-10482-02 (Metformin & Lisinopril)",
        "2. Verified allergy record AL-10482-01 (Ibuprofen: moderate urticaria)",
        "3. Diagnostic history DH-10482-04 (Type 2 Diabetes & Hypertension)",
        "4. Dr. Farida Amin incoming prescription RX-2026-9042",
      ],
    },
  ]);

  const suggestedQuestions = [
    "Does this medication conflict with the patient’s current medications?",
    "Does the patient have any relevant drug allergies?",
    "Summarize the patient’s medication history.",
    "Are there any potential safety concerns?",
  ];

  if (!isOpen) return null;

  const handleSend = (questionToSend?: string) => {
    const text = questionToSend || query;
    if (!text.trim()) return;

    const newMsgs = [...chatMessages, { role: "user" as const, text }];
    setChatMessages(newMsgs);
    setQuery("");

    // Mock intelligent RAG response based on question
    setTimeout(() => {
      let reply = "";
      if (text.includes("conflict") || text.includes("current medications")) {
        reply = `Analysis for ${patientName}: Potassium chloride 10 mEq taken alongside Lisinopril 10 mg carries a MODERATE interaction risk for hyperkalemia. Paracetamol 500 mg has no known major contraindications with the current regimen. Regular potassium monitoring recommended.`;
      } else if (text.includes("allergies") || text.includes("allergy")) {
        reply = `Documented Allergies for ${patientName} (${patientId}):\n• Ibuprofen: Moderate allergic reaction (urticaria/hives). Cross-reactivity caution applies to NSAIDs. Avoid Ketoprofen, Naproxen, and Diclofenac without prior physician clearance.`;
      } else if (text.includes("safety") || text.includes("concerns")) {
        reply = `Potential Safety Alerts for ${patientName}:\n1. Concomitant ACE inhibitor (Lisinopril) and Potassium supplementation.\n2. Known severe NSAID allergy.\n3. Renal clearance should be periodically assessed due to Metformin and Lisinopril combination.`;
      } else {
        reply = `Summary based on verified records for ${patientName} (${patientId}):\nActive diagnoses include Type 2 Diabetes (2019) and Essential Hypertension (2020). Compliant with Metformin 500mg BID and Lisinopril 10mg daily. No active hospital admissions on file.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply,
          citations: [
            "1. Verified patient record PT-10482",
            "2. PulseID Drug-Drug Interaction Database v2.4",
          ],
        },
      ]);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[440px] h-full bg-[#FBFEFF] border-l border-[#DDE7FF] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
        data-node-id="652:2579"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#DDE7FF] bg-white flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#008FE5] flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] font-semibold text-[#07377F] leading-[26px]">
                AI Medical Assistant
              </h2>
            </div>
            <p className="text-[12px] font-semibold text-[#008FE5] leading-[20px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RAG • Authorized patient records only</span>
            </p>
            <p className="text-[11px] font-normal text-[#727272] leading-[16px] mt-1">
              AI-generated content is not a verified medical record. Responses below are illustrative prototype responses.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Conversation Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              {msg.role === "user" ? (
                <div className="bg-[#02307D] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-[13px] font-medium max-w-[85%] shadow-xs">
                  {msg.text}
                </div>
              ) : (
                <div className="w-full bg-white border border-[#DDE7FF] rounded-xl p-4 shadow-xs text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#008FE5] uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI-Generated Review</span>
                  </div>
                  <div className="text-[13px] text-[#41474F] leading-[22px] whitespace-pre-line font-sans">
                    {msg.text}
                  </div>

                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#DDE7FF]/60">
                      <button
                        type="button"
                        onClick={() => setShowSources(!showSources)}
                        className="text-[12px] font-semibold text-[#07377F] hover:text-[#008FE5] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>[1–4] View authorized record sources</span>
                        {showSources ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {showSources && (
                        <ul className="mt-2 space-y-1.5 pl-2 border-l-2 border-[#008FE5]/40 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-md">
                          {msg.citations.map((c, idx) => (
                            <li key={idx}>{c}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Suggested Questions Section */}
          <div className="pt-2">
            <p className="text-[13px] font-semibold text-[#07377F] mb-2.5">
              Suggested questions
            </p>
            <div className="space-y-2">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="w-full text-left p-3 rounded-lg bg-white border border-[#DDE7FF] hover:border-[#008FE5] hover:bg-sky-50/40 text-[12px] font-normal text-[#07377F] transition-all cursor-pointer shadow-2xs"
                  data-name={`@question${idx}`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input & Action Bar */}
        <div className="p-4 bg-white border-t border-[#DDE7FF] space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex flex-col gap-2.5"
          >
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about authorized medication records…"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7FF] bg-white text-[13px] text-slate-800 placeholder-[#727272] focus:outline-hidden focus:border-[#008FE5] focus:ring-1 focus:ring-[#008FE5] transition-all"
                data-name="@aiInput"
              />
            </div>
            <button
              type="submit"
              disabled={!query.trim()}
              className="w-full h-[40px] rounded-[8px] bg-[#008FE5] hover:bg-[#007ECB] disabled:opacity-50 text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:cursor-not-allowed"
              data-name="@aiSend"
            >
              <Send className="w-4 h-4" />
              <span>Send question</span>
            </button>
          </form>

          <p className="text-[11px] text-[#727272] text-center leading-[16px]">
            Supports professional judgment; does not replace clinical evaluation. Unshared records are never retrieved.
          </p>
        </div>
      </div>
    </div>
  );
}
