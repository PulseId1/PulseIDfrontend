"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckIcon, PlayIcon, RefreshIcon } from "./icons";

interface ExtractedMed {
  id: number;
  name: string;
  badge: "Read" | "Best guess";
  active: string;
  directionsEn: string;
  directionsAr: string;
  topPct: string;
  heightPct: string;
}

const EXTRACTED_MEDS: readonly ExtractedMed[] = [
  {
    id: 1,
    name: "Dugozim tabs",
    badge: "Read",
    active: "trypsin + chymotrypsin + serrapeptidase + bromelain (Dugozim Plus)",
    directionsEn: "1 tablet every 12 hours",
    directionsAr: "قرص كل ١٢ ساعة",
    topPct: "7.3%",
    heightPct: "11.3%",
  },
  {
    id: 2,
    name: "Tebofortin 120",
    badge: "Read",
    active: "Ginkgo biloba extract 120 mg · 120 mg",
    directionsEn: "1 tablet in the evening, 1 strip",
    directionsAr: "قرص مساءً · شريط",
    topPct: "20.3%",
    heightPct: "16.6%",
  },
  {
    id: 3,
    name: "Care lyte eff",
    badge: "Read",
    active: "potassium sodium hydrogen citrate (Carelyte)",
    directionsEn: "effervescent, every 12 hours",
    directionsAr: "فوار كل ١٢ ساعة",
    topPct: "41.5%",
    heightPct: "16.5%",
  },
  {
    id: 4,
    name: "Rowatinex",
    badge: "Best guess",
    active: "terpene combination: pinene, camphene, borneol, anethole, fenchone, cineole",
    directionsEn: "2 capsules before breakfast",
    directionsAr: "٢ حبة · قبل الفطار",
    topPct: "59.8%",
    heightPct: "16.8%",
  },
  {
    id: 5,
    name: "Uniloxam 750 mg tabs",
    badge: "Read",
    active: "levofloxacin · 750 mg",
    directionsEn: "1 tablet after the meal",
    directionsAr: "قرص بعد الغذاء",
    topPct: "78.2%",
    heightPct: "17.0%",
  },
];

export function PulseNlpTab() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "done">("done");
  const [activeScanStep, setActiveScanStep] = useState<number>(5);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startSequentialScan = () => {
    if (scanTimerRef.current) clearInterval(scanTimerRef.current);
    setSavedSuccess(false);
    setScanState("scanning");
    setActiveScanStep(0);

    let step = 0;
    scanTimerRef.current = setInterval(() => {
      step += 1;
      if (step < EXTRACTED_MEDS.length) {
        setActiveScanStep(step);
      } else {
        if (scanTimerRef.current) clearInterval(scanTimerRef.current);
        setActiveScanStep(EXTRACTED_MEDS.length);
        setScanState("done");
      }
    }, 700);
  };

  useEffect(() => {
    return () => {
      if (scanTimerRef.current) clearInterval(scanTimerRef.current);
    };
  }, []);

  const handleConfirmSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2400);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
        {/* =========================================================
            COLUMN 1: ORIGINAL PRESCRIPTION (100% Fully Displayed, Zero Cropping)
            ========================================================= */}
        <div className="lg:col-span-5 bg-white border border-[#dde7ff] rounded-[18px] p-4 sm:p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3 text-[13px] font-bold text-[#02307d]">
            <span className="tracking-wide">1 &middot; PRESCRIPTION</span>
            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Original Rx
            </span>
          </div>

          {/* Full Prescription Image Container with natural image height: ZERO CROPPING, PROPORTIONALLY CONSTRAINED */}
          <div className="w-full max-w-[310px] sm:max-w-[330px] mx-auto">
            <div className="relative w-full rounded-[10px] overflow-hidden bg-white border border-slate-200 shadow-sm">
              {/* Next.js Image with exact natural dimensions: zero cropping, 100% visible */}
              <Image
                src="/IMG-20261120-WA0013.jpg"
                alt="Handwritten prescription"
                width={1128}
                height={1505}
                priority
                unoptimized
                className="w-full h-auto block select-none pointer-events-none"
              />

              {/* Bounding boxes that precisely cover each handwritten line */}
              <div className="absolute inset-0 pointer-events-auto">
                {EXTRACTED_MEDS.map((med, idx) => {
                  const isDiscovered = idx <= activeScanStep && scanState !== "idle";
                  const isCurrentlyScanning = scanState === "scanning" && idx === activeScanStep;
                  const isHovered = hoveredIndex === idx;

                  if (!isDiscovered) return null;

                  return (
                    <div
                      key={med.id}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{
                        top: med.topPct,
                        height: med.heightPct,
                        left: "2%",
                        width: "96%",
                      }}
                      className={`absolute rounded-[6px] border-2 cursor-pointer transition-all duration-200 ${
                        isCurrentlyScanning
                          ? "border-[#00d2ff] bg-[#00d2ff]/20 shadow-[0_0_12px_rgba(0,210,255,0.7)] ring-2 ring-[#00d2ff]/50"
                          : isHovered
                          ? "border-[#00d2ff] bg-[#00d2ff]/22 shadow-md ring-1 ring-[#00d2ff]/40"
                          : "border-[#00d2ff] bg-[#00d2ff]/12 hover:bg-[#00d2ff]/18 shadow-[0_0_6px_rgba(0,210,255,0.3)]"
                      }`}
                    >
                      {/* Active laser scan beam */}
                      {isCurrentlyScanning && (
                        <div className="absolute inset-x-0 h-1 bg-[#00d2ff] shadow-[0_0_12px_#00d2ff] animate-[scanLaser_0.7s_ease-in-out_infinite]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Button: Read prescription */}
            <div className="mt-4 flex items-center gap-2.5">
              <button
                type="button"
                onClick={startSequentialScan}
                disabled={scanState === "scanning"}
                className="flex-1 py-2.5 px-4 rounded-[10px] bg-[#078bde] hover:bg-[#0070bc] disabled:bg-slate-300 text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                {scanState === "scanning" ? (
                  <>
                    <span className="size-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Scanning {activeScanStep + 1} of 5...</span>
                  </>
                ) : (
                  <>
                    <PlayIcon className="size-3.5" />
                    <span>Read prescription</span>
                  </>
                )}
              </button>
              {scanState === "done" && (
                <button
                  type="button"
                  onClick={startSequentialScan}
                  className="py-2.5 px-3 rounded-[10px] border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12.5px] font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                  title="Scan again"
                >
                  <RefreshIcon className="size-3.5" />
                  <span className="hidden sm:inline">Re-scan</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================
            COLUMN 2: EXTRACTED TEXT (Matching Image 3 Reference in Pure Light Mode)
            ========================================================= */}
        <div className="lg:col-span-7 bg-white border border-[#dde7ff] rounded-[18px] p-4 sm:p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 text-[13px] font-bold text-[#02307d]">
              <div className="flex items-center gap-2">
                <span>2 &middot; EXTRACTED TEXT</span>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded">
                  AI draft
                </span>
              </div>
              <span className="text-[11.5px] font-semibold text-emerald-600">
                {activeScanStep === 0 && scanState === "scanning"
                  ? "Analyzing handwriting..."
                  : `${Math.min(activeScanStep, 5)} / 5 identified`}
              </span>
            </div>

            {/* Extracted Fields Subhead */}
            <div className="mb-3 flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#078bde]">
                EXTRACTED FIELDS
              </span>
              <span className="text-[11px] text-slate-400">
                PulseNLP Clinical OCR Engine
              </span>
            </div>

            {/* Medication Cards List matching Image 3 */}
            <div className="space-y-3">
              {EXTRACTED_MEDS.map((med, idx) => {
                const isRevealed = idx < activeScanStep || scanState === "done";
                const isCurrentlyScanning = scanState === "scanning" && idx === activeScanStep;
                const isHovered = hoveredIndex === idx;

                if (!isRevealed && !isCurrentlyScanning) {
                  return (
                    <div
                      key={med.id}
                      className="p-3 rounded-[10px] border border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-between text-slate-400 text-[12px]"
                    >
                      <span>Line #{idx + 1} &middot; Pending optical scan</span>
                      <span className="text-[10px] uppercase font-mono">Waiting</span>
                    </div>
                  );
                }

                if (isCurrentlyScanning) {
                  return (
                    <div
                      key={med.id}
                      className="p-3.5 rounded-[10px] border border-[#078bde] bg-blue-50/70 flex items-center gap-2.5 text-[#078bde] text-[13px] font-semibold animate-pulse"
                    >
                      <span className="size-2 rounded-full bg-[#078bde]" />
                      <span>Transcribing section #{idx + 1} with PulseNLP...</span>
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={med.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`p-3.5 rounded-[10px] border transition-all duration-200 cursor-pointer ${
                      isHovered
                        ? "bg-blue-50/80 border-[#078bde] shadow-sm ring-1 ring-[#078bde]/30"
                        : "bg-[#f8fbfe] border-slate-200/90 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[14.5px] text-[#02307d]">
                        {med.name}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded ${
                          med.badge === "Read"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {med.badge === "Read" && <CheckIcon className="size-3" />}
                        {med.badge === "Best guess" && <span className="font-mono">&asymp;</span>}
                        {med.badge}
                      </span>
                    </div>

                    <p className="text-[12px] text-slate-600 line-clamp-1 mb-1.5 font-medium">
                      {med.active}
                    </p>

                    <div className="text-[12px] text-[#078bde] flex items-center justify-between pt-1.5 border-t border-slate-100 font-medium">
                      <span>Directions: {med.directionsEn}</span>
                      <span className="text-slate-700 font-sans font-semibold" dir="rtl">
                        {med.directionsAr}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Confirm & Save Button */}
          <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleConfirmSave}
              className="py-2.5 px-6 rounded-[10px] bg-[#078bde] hover:bg-[#0070bc] text-white font-bold text-[13px] flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              {savedSuccess ? (
                <>
                  <CheckIcon className="size-3.5 text-white" />
                  <span>Saved to patient profile!</span>
                </>
              ) : (
                <span>Confirm &amp; save</span>
              )}
            </button>
            <span className="text-[11.5px] text-slate-400 font-medium">
              Verified by Clinical NLP Pipeline
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
