"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SolutionCardData {
  id: string;
  title: string;
  description: string;
  expandedDetail: string;
  accentStroke: string;
  iconSrc: string;
}

// Desktop cards (surround layout matching Figma node 233:502 & 233:506)
const DESKTOP_SOLUTIONS: SolutionCardData[] = [
  {
    id: "sol-01",
    title: "01. Unified Biometric Health Record",
    description:
      "Instant digital timeline uniting past hospital visits, labs, prescriptions, and diagnoses.",
    expandedDetail:
      "Connects disparate hospital EHR systems via zero-knowledge encrypted bridges, granting patients an immutable passport for global medical consultations.",
    accentStroke: "#00609B",
    iconSrc: "/assets/figma/icons/solution-card-01-biometric.svg",
  },
  {
    id: "sol-02",
    title: "02. Granular Patient-Owned Consent Control",
    description:
      "Patients can control or audit which clinics, third parties, or doctors access their data.",
    expandedDetail:
      "Every medical disclosure requires an explicit digital consent signature. Patients can revoke clinic or specialist access with one click at any time.",
    accentStroke: "#00AEC7",
    iconSrc: "/assets/figma/icons/solution-card-02-consent.svg",
  },
  {
    id: "sol-03",
    title: "03. AI-Powered Medical Assistant",
    description:
      "Get intelligent answers and summaries based on your medical records.",
    expandedDetail:
      "Summarizes 10+ years of dense clinical notes, highlighted abnormal laboratory lab values, and chronic condition progressions in seconds.",
    accentStroke: "#00609B",
    iconSrc: "/assets/figma/icons/solution-card-03-ai.svg",
  },
  {
    id: "sol-04",
    title: "04. Smart Prescription & OCR",
    description:
      "Turn prescription images into structured digital records.",
    expandedDetail:
      "Uses computer vision calibrated on handwritten doctor scripts to digitize prescriptions into interoperable FHIR format and standardized RxNorm codes.",
    accentStroke: "#3B5BA9",
    iconSrc: "/assets/figma/icons/solution-card-04-prescription.svg",
  },
  {
    id: "sol-05",
    title: "05. Drug Interaction Alerts",
    description:
      "Get notified about potential drug interactions and conflicts.",
    expandedDetail:
      "Simultaneously verifies contraindications against patient genetic flags, renal clearance rates, and active medications to prevent adverse events.",
    accentStroke: "#BA1A1A",
    iconSrc: "/assets/figma/icons/solution-card-05-drugs.svg",
  },
];

// Mobile cards (matching Figma node 218:515 & 218:524)
const MOBILE_SOLUTIONS: SolutionCardData[] = [
  {
    id: "m-sol-01",
    title: "1. Unified Biometric Health Record",
    description:
      "Instant digital timeline uniting past hospital visits, labs, prescriptions, and diagnostics in one verifiable identity hub.",
    expandedDetail:
      "Connects disparate hospital EHR systems via zero-knowledge encrypted bridges, granting patients an immutable passport for global medical consultations.",
    accentStroke: "#00609B",
    iconSrc: "/assets/figma/icons/solution-01-biometric-record.svg",
  },
  {
    id: "m-sol-02",
    title: "2. Patient-Owned Consent Control",
    description:
      "Patients can grant, inspect, or revoke doctor and clinic access in one tap from mobile with time- locked tokens.",
    expandedDetail:
      "Every medical disclosure requires an explicit digital consent signature. Patients can revoke clinic or specialist access with one click at any time.",
    accentStroke: "#00AEC7",
    iconSrc: "/assets/figma/icons/solution-02-consent-control.svg",
  },
  {
    id: "m-sol-03",
    title: "3. Digital Pharmacy Synchronization",
    description:
      "Verified e-prescriptions routed directly to partner pharmacies with automated dispensing and zero counterfeit risk.",
    expandedDetail:
      "Eliminates handwritten prescription misreads, duplicate dispensing, and fraudulent paper scripts.",
    accentStroke: "#3B5BA9",
    iconSrc: "/assets/figma/icons/solution-04-smart-prescription.svg",
  },
  {
    id: "m-sol-04",
    title: "4. Interoperable Diagnostic Hub",
    description:
      "Zero redundant lab tests—share certified DICOM imaging and blood results securely between independent centers.",
    expandedDetail:
      "Prevents duplicate patient billing and repeated diagnostic testing across siloed diagnostic providers.",
    accentStroke: "#00609B",
    iconSrc: "/assets/figma/icons/solution-03-ai-assistant.svg",
  },
  {
    id: "m-sol-05",
    title: "5. Accredited Clinical Directory",
    description:
      "Direct booking and tele-consultation with MOH- verified specialists, hospitals, and certified laboratory centers.",
    expandedDetail:
      "Simultaneously verifies provider clinical license credentials and insurance eligibility prior to appointments.",
    accentStroke: "#BA1A1A",
    iconSrc: "/assets/figma/icons/solution-05-drug-alerts.svg",
  },
];

export function SolutionsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const topCard = DESKTOP_SOLUTIONS[0];        // 01. Unified Biometric Health Record
  const leftTopCard = DESKTOP_SOLUTIONS[1];    // 02. Granular Patient-Owned Consent Control
  const leftBottomCard = DESKTOP_SOLUTIONS[3]; // 04. Smart Prescription & OCR
  const rightTopCard = DESKTOP_SOLUTIONS[2];   // 03. AI-Powered Medical Assistant
  const rightBottomCard = DESKTOP_SOLUTIONS[4];// 05. Drug Interaction Alerts

  return (
    <section id="solutions" className="w-full bg-[#FBFEFF] pt-8 pb-0 overflow-hidden">
      {/* 
        Section Heading (Figma Node 233:503):
        Left-aligned across all breakpoints as requested by user
      */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-[62px]">
        <div className="max-w-[770px] text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-[36px] font-bold text-[#078BDE] tracking-tight leading-tight text-left">
            How PulseID Makes a Difference
          </h2>
          <p className="mt-2 text-base sm:text-[16px] text-[#41474F] leading-relaxed text-left">
            We designed practical solutions to address these challenges and create
            a smoother, more accessible healthcare experience for everyone.
          </p>
        </div>
      </div>

      {/* 
        Background wrapper matching Figma Node 233:506:
        width: 100% full-width edge-to-edge (no space-x), height: 579px;
        Background: Wave mesh matrix from sec3-bg-clippath.svg, dual ambient radiance orbs, and connecting arcs
      */}
      <div className="w-full">
        <div className="w-full relative min-h-[579px] h-[579px] overflow-hidden bg-gradient-to-b from-[#E7F2FF] via-[#FAF8FF] via-[51.5%] to-[#F0F3FB] rounded-none border-y border-[#E1EAF5]">
          {/* Layer 1: Figma Node 233:507 / 233:510 Wave Mesh Background Layer from sec3-bg-clippath.svg */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0" aria-hidden="true">
            <div className="relative w-full max-w-[1280px] h-[579px]">
              <Image
                src="/sec3-bg-clippath.svg"
                alt=""
                fill
                priority
                unoptimized
                className="object-contain object-center w-full h-full"
              />
            </div>
          </div>

          {/* Layer 2: Figma Node 233:555 Soft Ambient Radiance Blurs */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[rgba(52,216,225,0.12)] blur-[64px]" />
            <div className="absolute left-1/2 top-[-40px] -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[rgba(7,139,222,0.12)] blur-[64px]" />
          </div>

          {/* Layer 3: Figma Node 233:554 Radial Connecting Arcs */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 flex items-center justify-center" aria-hidden="true">
            <div className="relative w-[1214px] h-[500px]">
              <Image
                src="/assets/figma/landing/solution-connecting-arcs.svg"
                alt=""
                fill
                priority
                unoptimized
                className="object-contain object-center w-full h-full"
              />
            </div>
          </div>

          {/* Desktop Surround Layout (matching 1280x579 frame) */}
          <div className="hidden lg:flex flex-col justify-between w-full max-w-[1214px] mx-auto min-h-[579px] lg:h-[579px] pt-10 pb-12 px-8 relative z-10 gap-8">
            {/* Top Card: 01. Unified Biometric Health Record */}
            <div className="flex justify-center">
              <div className="w-[448px]">
                <SolutionCardDesktop data={topCard} />
              </div>
            </div>

            {/* Middle Row with gap: 32px */}
            <div className="grid grid-cols-12 gap-8 xl:gap-10 items-center my-auto w-full">
              {/* Left Column: 02 & 04 */}
              <div className="col-span-4 flex flex-col gap-6 max-w-[383px]">
                <SolutionCardDesktop data={leftTopCard} />
                <SolutionCardDesktop data={leftBottomCard} />
              </div>

              {/* Center Column: Original Figma Physician with glowing cross shield and background ambient badge */}
              <div className="col-span-4 flex justify-center items-center relative">
                {/* Figma Node 233:602 Ambient ID Card behind doctor */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none z-0" aria-hidden="true">
                  <div className="-rotate-1 bg-white border border-[#B9D9F8] rounded-[16px] w-[288px] h-[176px] p-[13px] shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-[12px] bg-[#EBF1F9]" />
                      <div className="flex flex-col gap-1">
                        <div className="w-16 h-2 rounded-[2px] bg-[#DCE4F0]" />
                        <div className="w-10 h-1.5 rounded-[2px] bg-[#EBF1F9]" />
                      </div>
                    </div>
                    <div className="w-full h-1 rounded-[2px] bg-[#F4F8FC]" />
                  </div>
                </div>

                <div className="relative w-[340px] h-[340px] max-w-full aspect-square transition-transform hover:scale-105 duration-300 z-10">
                  <Image
                    src="/assets/figma/landing/solution-physician-cross.png"
                    alt="Doctor with unified digital healthcare solutions"
                    fill
                    unoptimized
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Right Column: 03 & 05 */}
              <div className="col-span-4 flex flex-col gap-6 max-w-[383px] ml-auto">
                <SolutionCardDesktop data={rightTopCard} />
                <SolutionCardDesktop data={rightBottomCard} />
              </div>
            </div>
          </div>
        </div>

        {/* 
          Mobile Version matching Figma lADING MOBAIL (Node 218:515 & 218:524):
          5 cards stacked in a single column, 358px wide, with Details ⌄ toggle
        */}
        <div className="block lg:hidden w-full max-w-[358px] sm:max-w-md mx-auto px-4 py-6 flex flex-col gap-3 relative z-10" data-node-id="218:523">
          {MOBILE_SOLUTIONS.map((card) => {
            const isExpanded = expandedId === card.id;
            return (
              <div
                key={card.id}
                className="bg-[#F8FAFC] rounded-[16px] p-4 border border-[#E1EAF5] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex flex-col gap-2 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-[12px] bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center shrink-0">
                      <Image
                        src={card.iconSrc}
                        alt=""
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-[#01091E] text-[12px] sm:text-[13px] truncate font-sans">
                      {card.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(card.id)}
                    className="text-[#078BDE] hover:text-[#0060A8] text-[11px] font-semibold flex items-center gap-1 shrink-0 px-1 py-0.5 rounded cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <span>Details</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>

                <p className="text-[11px] text-[#41474F] leading-normal pl-12">
                  {card.description}
                </p>

                {isExpanded && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-[#41474F] italic bg-slate-50 p-2.5 rounded-lg animate-in fade-in duration-200 ml-12">
                    <span className="font-semibold text-[#02307D] not-italic block mb-0.5">
                      Architecture & Benefit:
                    </span>
                    {card.expandedDetail}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SolutionCardDesktop({ data }: { readonly data: SolutionCardData }) {
  const isDrugAlerts = data.id === "sol-05";
  return (
    <div
      className="relative bg-white rounded-[16px] p-6 pl-7 border border-[#DCE4F0] border-l-4 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.06),0px_2px_4px_-2px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-md"
      style={{ borderLeftColor: data.accentStroke }}
    >
      <div className="relative z-10 flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-[8px] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] ${
            isDrugAlerts ? "bg-[#FFF0F1]" : "bg-[#EBF1F9]"
          }`}
        >
          <Image
            src={data.iconSrc}
            alt=""
            width={22}
            height={22}
            className="object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[18px] font-bold text-[#02307D] leading-normal tracking-tight font-heading">
            {data.title}
          </h3>
          <p className="mt-1.5 text-[14px] font-normal text-[#41474F] leading-normal">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
