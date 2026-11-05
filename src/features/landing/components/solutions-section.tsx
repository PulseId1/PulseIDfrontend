"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CardCurvedBorder } from "@/components/ui/card-curved-border";

interface SolutionCardData {
  id: string;
  title: string;
  description: string;
  expandedDetail: string;
  iconBg: string;
  iconColor: string;
  accentStroke?: string;
  iconSvg: React.ReactNode;
}

// Desktop cards (surround layout matching Figma desktop landing.png)
const DESKTOP_SOLUTIONS: SolutionCardData[] = [
  {
    id: "sol-01",
    title: "01. Unified Biometric Health Record",
    description:
      "Instant digital timeline uniting past hospital visits, labs, prescriptions, and diagnoses.",
    expandedDetail:
      "Connects disparate hospital EHR systems via zero-knowledge encrypted bridges, granting patients an immutable passport for global medical consultations.",
    iconBg: "bg-[#E8F3FF]",
    iconColor: "text-[#0080DF]",
    iconSvg: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11m0 0a8.003 8.003 0 001.21 4.258"
        />
      </svg>
    ),
  },
  {
    id: "sol-02",
    title: "02. Granular Patient-Owned Consent Control",
    description:
      "Patients can control or audit which clinics, third parties, or doctors access their data.",
    expandedDetail:
      "Every medical disclosure requires an explicit digital consent signature. Patients can revoke clinic or specialist access with one click at any time.",
    iconBg: "bg-[#E8F3FF]",
    iconColor: "text-[#0080DF]",
    iconSvg: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    id: "sol-03",
    title: "03. AI-Powered Medical Assistant",
    description:
      "Get intelligent answers and summaries based on your medical records.",
    expandedDetail:
      "Summarizes 10+ years of dense clinical notes, highlighted abnormal laboratory lab values, and chronic condition progressions in seconds.",
    iconBg: "bg-[#E8F3FF]",
    iconColor: "text-[#0080DF]",
    iconSvg: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    id: "sol-04",
    title: "04. Smart Prescription & OCR",
    description:
      "Turn prescription images into structured digital records.",
    expandedDetail:
      "Uses computer vision calibrated on handwritten doctor scripts to digitize prescriptions into interoperable FHIR format and standardized RxNorm codes.",
    iconBg: "bg-[#E8F3FF]",
    iconColor: "text-[#0080DF]",
    iconSvg: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "sol-05",
    title: "05. Drug Interaction Alerts",
    description:
      "Get notified about potential drug interactions and conflicts.",
    expandedDetail:
      "Simultaneously verifies contraindications against patient genetic flags, renal clearance rates, and active medications to prevent adverse events.",
    iconBg: "bg-[#FFF0F1]",
    iconColor: "text-[#BA1A1A]",
    accentStroke: "#BA1A1A",
    iconSvg: (
      <svg className="w-6 h-6 text-[#BA1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
  },
];

// Mobile cards (sequential 1-5 harmonized with official landing.pdf design)
const MOBILE_SOLUTIONS: SolutionCardData[] = [
  {
    id: "m-sol-01",
    title: "01. Unified Biometric Health Record",
    description:
      "Instant digital timeline uniting past hospital visits, labs, prescriptions, and diagnoses.",
    expandedDetail:
      "Connects disparate hospital EHR systems via zero-knowledge encrypted bridges, granting patients an immutable passport for global medical consultations.",
    iconBg: "bg-[#E8F3FF]",
    iconColor: "text-[#0080DF]",
    iconSvg: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11m0 0a8.003 8.003 0 001.21 4.258"
        />
      </svg>
    ),
  },
  {
    id: "m-sol-02",
    title: "02. Granular Patient-Owned Consent Control",
    description:
      "Patients can control or audit which clinics, third parties, or doctors access their data.",
    expandedDetail:
      "Every medical disclosure requires an explicit digital consent signature. Patients can revoke clinic or specialist access with one click at any time.",
    iconBg: "bg-[#E8F3FF]",
    iconColor: "text-[#0080DF]",
    iconSvg: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    id: "m-sol-03",
    title: "03. AI-Powered Medical Assistant",
    description:
      "Get intelligent answers and summaries based on your medical records.",
    expandedDetail:
      "Summarizes 10+ years of dense clinical notes, highlighted abnormal laboratory lab values, and chronic condition progressions in seconds.",
    iconBg: "bg-[#E8F3FF]",
    iconColor: "text-[#0080DF]",
    iconSvg: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    id: "m-sol-04",
    title: "04. Smart Prescription & OCR",
    description:
      "Turn prescription images into structured digital records.",
    expandedDetail:
      "Uses computer vision calibrated on handwritten doctor scripts to digitize prescriptions into interoperable FHIR format and standardized RxNorm codes.",
    iconBg: "bg-[#E8F3FF]",
    iconColor: "text-[#0080DF]",
    iconSvg: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "m-sol-05",
    title: "05. Drug Interaction Alerts",
    description:
      "Get notified about potential drug interactions and conflicts.",
    expandedDetail:
      "Simultaneously verifies contraindications against patient genetic flags, renal clearance rates, and active medications to prevent adverse events.",
    iconBg: "bg-[#FFF0F1]",
    iconColor: "text-[#BA1A1A]",
    accentStroke: "#BA1A1A",
    iconSvg: (
      <svg className="w-6 h-6 text-[#BA1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
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
    <section id="solutions" className="w-full bg-white pt-16 lg:pt-20 pb-16 lg:pb-0 overflow-hidden">
      {/* 
        Section Heading:
        Centered in top 190px on clean white background
      */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 lg:mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0080DF] tracking-tight">
          How PulseID Makes a Difference jef
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          We designed practical solutions to address these challenges and create
          a smoother, more accessible healthcare experience for everyone.
        </p>
      </div>

      {/* 
        Full-bleed background wrapper taking 100% width of the screen:
        Background: 3rd-bg.svg (1280x579) scaled edge-to-edge
        Inner frame: width: 1280; height: 579; gap: 40px; padding: 48px 32px;
      */}
      <div className="w-full relative min-h-[579px] overflow-hidden">
        {/* Full-bleed background graphic edge-to-edge */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <Image
            src="/landing/3rd-bg.svg"
            alt=""
            fill
            priority
            unoptimized
            aria-hidden="true"
            className="object-cover object-center w-full h-full"
          />
        </div>

        {/* Desktop Surround Layout (matching 1280x579 frame) */}
        <div className="hidden lg:flex flex-col justify-between w-full max-w-[1280px] mx-auto min-h-[579px] lg:h-[579px] pt-12 pb-12 px-8 relative z-10 gap-10">
          {/* Top Card: 01. Unified Biometric Health Record */}
          <div className="flex justify-center">
            <div className="w-full max-w-[440px]">
              <SolutionCardDesktop data={topCard} />
            </div>
          </div>

          {/* Middle Row with gap: 40px (gap-10) */}
          <div className="grid grid-cols-12 gap-10 items-center my-auto">
            {/* Left Column: 02 & 04 */}
            <div className="col-span-4 flex flex-col gap-6 max-w-[370px]">
              <SolutionCardDesktop data={leftTopCard} />
              <SolutionCardDesktop data={leftBottomCard} />
            </div>

            {/* Center Column: Solution Illustration (solution.svg) */}
            <div className="col-span-4 flex justify-center items-center">
              <div className="relative w-full max-w-[440px] aspect-[455/351] transition-transform hover:scale-105 duration-300">
                <Image
                  src="/landing/solution.svg"
                  alt="Doctor with unified digital healthcare solutions"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Column: 03 & 05 */}
            <div className="col-span-4 flex flex-col gap-6 max-w-[370px] ml-auto">
              <SolutionCardDesktop data={rightTopCard} />
              <SolutionCardDesktop data={rightBottomCard} />
            </div>
          </div>
        </div>

        {/* 
          Mobile Version matching Figma lADING MOBAIL.svg:
          5 cards stacked in a single column, no center illustration, with Details ⌄ toggle
        */}
        <div className="block lg:hidden w-full max-w-[420px] mx-auto px-4 py-8 flex flex-col gap-3.5 relative z-10">
          {MOBILE_SOLUTIONS.map((card) => {
            const isExpanded = expandedId === card.id;
            return (
              <div
                key={card.id}
                className="relative bg-white rounded-2xl p-4 border border-[#DCE4F0] shadow-sm flex flex-col gap-2 transition-all overflow-hidden"
              >
                {card.accentStroke && <CardCurvedBorder color={card.accentStroke} />}

                <div className="flex items-center justify-between gap-2 relative z-10">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}
                    >
                      {card.iconSvg}
                    </div>
                    <h3 className="font-bold text-[#02307D] text-[15px] sm:text-[16px] truncate">
                      {card.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(card.id)}
                    className="text-[#0080DF] hover:text-[#0060A8] text-xs font-semibold flex items-center gap-1 shrink-0 px-1 py-0.5 rounded cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <span>Details</span>
                    <span
                      className={`inline-block transition-transform duration-200 text-xs ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      ⌄
                    </span>
                  </button>
                </div>

                <p className="text-[13px] text-[#41474F] leading-normal pl-13 relative z-10">
                  {card.description}
                </p>

                {isExpanded && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-[#41474F] italic bg-slate-50 p-2.5 rounded-lg animate-in fade-in duration-200 relative z-10">
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
  return (
    <div className="relative bg-white rounded-2xl p-5 border border-[#DCE4F0] shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-md">
      {data.accentStroke && <CardCurvedBorder color={data.accentStroke} />}

      <div className="relative z-10 flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${data.iconBg} ${data.iconColor}`}
        >
          {data.iconSvg}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[18px] font-bold text-[#02307D] leading-normal tracking-[-0.01em]">
            {data.title}
          </h3>
          <p className="mt-1 text-[14px] font-normal text-[#41474F] leading-normal">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
