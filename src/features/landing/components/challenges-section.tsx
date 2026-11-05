"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CardCurvedBorder } from "@/components/ui/card-curved-border";

export { CardCurvedBorder };

interface ChallengeCardData {
  id: string;
  title: string;
  description: string;
  expandedDetail: string;
  iconBg: string;
  iconColor: string;
  accentStroke: string;
  iconSvg: React.ReactNode;
}

// Desktop cards (surround layout matching Figma desktop sec2.png & Top Centered Card SVG)
const DESKTOP_CHALLENGES: ChallengeCardData[] = [
  {
    id: "frag-history",
    title: "Fragmented Medical History",
    description:
      "Disconnected hospital systems, paper files, and delayed clinical handoffs lead to incomplete clinical histories.",
    expandedDetail:
      "Patients frequently undergo duplicate laboratory tests and repeat diagnostics because previous hospital records cannot be accessed across disparate EHR providers.",
    iconBg: "bg-[#FFF0F1]",
    iconColor: "text-[#BA1A1A]",
    accentStroke: "#BA1A1A",
    iconSvg: (
      <svg className="w-6 h-6 text-[#BA1A1A]" viewBox="33 26 48 48" fill="none">
        <path
          d="M57 56C57.2833 56 57.5208 55.9042 57.7125 55.7125C57.9042 55.5208 58 55.2833 58 55C58 54.7167 57.9042 54.4792 57.7125 54.2875C57.5208 54.0958 57.2833 54 57 54C56.7167 54 56.4792 54.0958 56.2875 54.2875C56.0958 54.4792 56 54.7167 56 55C56 55.2833 56.0958 55.5208 56.2875 55.7125C56.4792 55.9042 56.7167 56 57 56V56M56 52H58V46H56V52V52M50 60C49.45 60 48.9792 59.8042 48.5875 59.4125C48.1958 59.0208 48 58.55 48 58V44C48 43.45 48.1958 42.9792 48.5875 42.5875C48.9792 42.1958 49.45 42 50 42H54.2C54.4167 41.4 54.7792 40.9167 55.2875 40.55C55.7958 40.1833 56.3667 40 57 40C57.6333 40 58.2042 40.1833 58.7125 40.55C59.2208 40.9167 59.5833 41.4 59.8 42H64C64.55 42 65.0208 42.1958 65.4125 42.5875C65.8042 42.9792 66 43.45 66 44V58C66 58.55 65.8042 59.0208 65.4125 59.4125C65.0208 59.8042 64.55 60 64 60H50V60M50 58H64V58V58V44V44V44H50V44V44V58V58V58V58M57 43.25C57.2167 43.25 57.3958 43.1792 57.5375 43.0375C57.6792 42.8958 57.75 42.7167 57.75 42.5C57.75 42.2833 57.6792 42.1042 57.5375 41.9625C57.3958 41.8208 57.2167 41.75 57 41.75C56.7833 41.75 56.6042 41.8208 56.4625 41.9625C56.3208 42.1042 56.25 42.2833 56.25 42.5C56.25 42.7167 56.3208 42.8958 56.4625 43.0375C56.6042 43.1792 56.7833 43.25 57 43.25V43.25"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "time-access",
    title: "Time-Consuming Access",
    description:
      "Finding the right medical records across multiple healthcare systems takes valuable time during critical consultations.",
    expandedDetail:
      "Doctors spend an average of 15–20% of consultation time requesting, faxing, or logging into external portals to verify historical records during acute care.",
    iconBg: "bg-[#EBF7FC]",
    iconColor: "text-[#00B4D8]",
    accentStroke: "#00B4D8",
    iconSvg: (
      <svg className="w-6 h-6 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="12 7 12 12 15 14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "med-risks",
    title: "Safety & Medication Risks",
    description:
      "Lack of real-time drug interaction checks can lead to prescription errors and preventable adverse reactions.",
    expandedDetail:
      "Cross-prescriptions between distinct specialists often trigger severe drug-drug interactions or duplicate therapies without a unified medication ledger.",
    iconBg: "bg-[#FFF0F1]",
    iconColor: "text-[#BA1A1A]",
    accentStroke: "#BA1A1A",
    iconSvg: (
      <svg className="w-6 h-6 text-[#BA1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m0 3.75h.008M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </svg>
    ),
  },
  {
    id: "privacy",
    title: "Data Fragmentation & Privacy",
    description:
      "Patient data is scattered across different healthcare providers and systems, making secure and controlled access difficult.",
    expandedDetail:
      "Traditional healthcare networks lack fine-grained, verifiable cryptographic consent, leaving patients uninformed about third-party record access.",
    iconBg: "bg-[#EAF4FC]",
    iconColor: "text-[#0080DF]",
    accentStroke: "#0080DF",
    iconSvg: (
      <svg className="w-6 h-6 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        />
      </svg>
    ),
  },
  {
    id: "insights",
    title: "Limited Medical Insights",
    description:
      "Difficulty converting unstructured medical records and PDFs into actionable medical insights.",
    expandedDetail:
      "Clinical notes and laboratory printouts remain trapped as flat images, making automated clinical risk factor extraction and timeline synthesis impossible.",
    iconBg: "bg-[#EAF4FC]",
    iconColor: "text-[#0080DF]",
    accentStroke: "#0284C7",
    iconSvg: (
      <svg className="w-6 h-6 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="17 6 23 6 23 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// Mobile cards (sequential 1-5 harmonized with official landing.pdf design)
const MOBILE_CHALLENGES: ChallengeCardData[] = [
  {
    id: "m-frag-history",
    title: "1. Fragmented Medical History",
    description:
      "Disconnected hospital systems, paper files, and delayed clinical handoffs lead to incomplete clinical histories.",
    expandedDetail:
      "Patients frequently undergo duplicate laboratory tests and repeat diagnostics because previous hospital records cannot be accessed across disparate EHR providers.",
    iconBg: "bg-[#FFF0F1]",
    iconColor: "text-[#BA1A1A]",
    accentStroke: "#BA1A1A",
    iconSvg: (
      <svg className="w-5 h-5 text-[#BA1A1A]" viewBox="33 26 48 48" fill="none">
        <path
          d="M57 56C57.2833 56 57.5208 55.9042 57.7125 55.7125C57.9042 55.5208 58 55.2833 58 55C58 54.7167 57.9042 54.4792 57.7125 54.2875C57.5208 54.0958 57.2833 54 57 54C56.7167 54 56.4792 54.0958 56.2875 54.2875C56.0958 54.4792 56 54.7167 56 55C56 55.2833 56.0958 55.5208 56.2875 55.7125C56.4792 55.9042 56.7167 56 57 56V56M56 52H58V46H56V52V52M50 60C49.45 60 48.9792 59.8042 48.5875 59.4125C48.1958 59.0208 48 58.55 48 58V44C48 43.45 48.1958 42.9792 48.5875 42.5875C48.9792 42.1958 49.45 42 50 42H54.2C54.4167 41.4 54.7792 40.9167 55.2875 40.55C55.7958 40.1833 56.3667 40 57 40C57.6333 40 58.2042 40.1833 58.7125 40.55C59.2208 40.9167 59.5833 41.4 59.8 42H64C64.55 42 65.0208 42.1958 65.4125 42.5875C65.8042 42.9792 66 43.45 66 44V58C66 58.55 65.8042 59.0208 65.4125 59.4125C65.0208 59.8042 64.55 60 64 60H50V60M50 58H64V58V58V44V44V44H50V44V44V58V58V58V58M57 43.25C57.2167 43.25 57.3958 43.1792 57.5375 43.0375C57.6792 42.8958 57.75 42.7167 57.75 42.5C57.75 42.2833 57.6792 42.1042 57.5375 41.9625C57.3958 41.8208 57.2167 41.75 57 41.75C56.7833 41.75 56.6042 41.8208 56.4625 41.9625C56.3208 42.1042 56.25 42.2833 56.25 42.5C56.25 42.7167 56.3208 42.8958 56.4625 43.0375C56.6042 43.1792 56.7833 43.25 57 43.25V43.25"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "m-time-access",
    title: "2. Time-Consuming Access",
    description:
      "Finding the right medical records across multiple healthcare systems takes valuable time during critical consultations.",
    expandedDetail:
      "Doctors spend an average of 15–20% of consultation time requesting, faxing, or logging into external portals to verify historical records during acute care.",
    iconBg: "bg-[#EBF7FC]",
    iconColor: "text-[#00B4D8]",
    accentStroke: "#00B4D8",
    iconSvg: (
      <svg className="w-5 h-5 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="12 7 12 12 15 14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "m-privacy",
    title: "3. Data Fragmentation & Privacy",
    description:
      "Patient data is scattered across different healthcare providers and systems, making secure and controlled access difficult.",
    expandedDetail:
      "Traditional healthcare networks lack fine-grained, verifiable cryptographic consent, leaving patients uninformed about third-party record access.",
    iconBg: "bg-[#EAF4FC]",
    iconColor: "text-[#0080DF]",
    accentStroke: "#0080DF",
    iconSvg: (
      <svg className="w-5 h-5 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        />
      </svg>
    ),
  },
  {
    id: "m-med-risks",
    title: "4. Safety & Medication Risks",
    description:
      "Lack of real-time drug interaction checks can lead to prescription errors and preventable adverse reactions.",
    expandedDetail:
      "Cross-prescriptions between distinct specialists often trigger severe drug-drug interactions or duplicate therapies without a unified medication ledger.",
    iconBg: "bg-[#FFF0F1]",
    iconColor: "text-[#BA1A1A]",
    accentStroke: "#BA1A1A",
    iconSvg: (
      <svg className="w-5 h-5 text-[#BA1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m0 3.75h.008M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </svg>
    ),
  },
  {
    id: "m-insights",
    title: "5. Limited Medical Insights",
    description:
      "Difficulty converting unstructured medical records and PDFs into actionable medical insights.",
    expandedDetail:
      "Clinical notes and laboratory printouts remain trapped as flat images, making automated clinical risk factor extraction and timeline synthesis impossible.",
    iconBg: "bg-[#EAF4FC]",
    iconColor: "text-[#0080DF]",
    accentStroke: "#0284C7",
    iconSvg: (
      <svg className="w-5 h-5 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="17 6 23 6 23 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function ChallengesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const topCard = DESKTOP_CHALLENGES[0];
  const leftTopCard = DESKTOP_CHALLENGES[1];
  const leftBottomCard = DESKTOP_CHALLENGES[2];
  const rightTopCard = DESKTOP_CHALLENGES[3];
  const rightBottomCard = DESKTOP_CHALLENGES[4];

  return (
    <section id="challenges" className="w-full bg-[#FBFEFF] pt-14 lg:pt-[60px] pb-16 lg:pb-20 overflow-hidden">
      {/* 
        Section Heading:
        Left-aligned matching Figma guides (left: 32px, top: 60px, width: ~769px)
      */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-10">
        <div className="max-w-[770px] text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0080DF] tracking-tight leading-tight">
            The Challenges Users Face
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#41474F] leading-relaxed">
            Every user faces challenges when searching for and accessing
            healthcare services and information. We identified five key problems
            through our research and documentation.
          </p>
        </div>
      </div>

      {/* 
        Desktop Cards Frame (1280x580)
        Exact Figma properties matching sec2.png & sec1-dec.png:
        width: 1280; height: 580;
        bg: soft gradient with sec1-dec.png background (dots & dashed connection lines)
      */}
      <div className="hidden lg:block w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1280px] mx-auto min-h-[580px] lg:h-[580px] border border-[#E1EAF5]/80 rounded-3xl bg-gradient-to-b from-[#F8FAFC]/90 via-white/80 to-[#EDF4FB]/90 shadow-sm pt-12 pb-12 px-8 flex flex-col justify-between relative overflow-hidden">
          {/* Background decoration: dots and connector dashed lines matching sec1-dec.png */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden rounded-3xl z-0">
            <div className="relative w-[1214px] h-[501px] shrink-0">
              <Image
                src="/landing/sec1-dec.png"
                alt=""
                fill
                className="object-contain pointer-events-none select-none"
                priority
              />
            </div>
          </div>

          {/* Top Card: Fragmented Medical History */}
          <div className="relative z-10 flex justify-center">
            <div className="w-full max-w-[448px]">
              <ChallengeCardDesktop data={topCard} />
            </div>
          </div>

          {/* Middle Row with gap: 40px (gap-10) */}
          <div className="relative z-10 grid grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center my-auto">
            {/* Left Column: Time-Consuming Access & Safety & Medication Risks */}
            <div className="col-span-4 flex flex-col gap-4 max-w-[378px]">
              <ChallengeCardDesktop data={leftTopCard} />
              <ChallengeCardDesktop data={leftBottomCard} />
            </div>

            {/* Center: Chaos Illustration (chaos.svg) */}
            <div className="col-span-4 flex justify-center items-center">
              <div className="relative w-full max-w-[420px] aspect-[448/332] transition-transform hover:scale-105 duration-300">
                <Image
                  src="/landing/chaos.svg"
                  alt="Doctor dealing with chaotic medical record systems"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Data Fragmentation & Privacy & Limited Medical Insights */}
            <div className="col-span-4 flex flex-col gap-4 max-w-[378px] ml-auto">
              <ChallengeCardDesktop data={rightTopCard} />
              <ChallengeCardDesktop data={rightBottomCard} />
            </div>
          </div>
        </div>
      </div>

      {/* 
        Mobile Version matching Figma lADING MOBAIL.svg:
        5 cards stacked in a single column, with Details ⌄ toggle
      */}
      <div className="block lg:hidden w-full max-w-[420px] mx-auto px-4 flex flex-col gap-3.5">
        {MOBILE_CHALLENGES.map((card) => {
          const isExpanded = expandedId === card.id;
          return (
            <div
              key={card.id}
              className="relative bg-white rounded-2xl p-4 border border-[#DCE4F0] shadow-sm flex flex-col gap-2 transition-all overflow-hidden"
            >
              {/* Curved border on mobile strictly on the left profile */}
              <CardCurvedBorder color={card.accentStroke} />

              <div className="flex items-center justify-between gap-2 pl-2 relative z-10">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}
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

              <p className="text-[13px] text-[#41474F] leading-normal pl-15 relative z-10">
                {card.description}
              </p>

              {isExpanded && (
                <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-[#41474F] italic bg-slate-50 p-2.5 rounded-lg animate-in fade-in duration-200 ml-2 relative z-10">
                  <span className="font-semibold text-[#02307D] not-italic block mb-0.5">
                    Key Impact:
                  </span>
                  {card.expandedDetail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ChallengeCardDesktop({ data }: { readonly data: ChallengeCardData }) {
  return (
    <div className="relative bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#DCE4F0] transition-all duration-300 hover:shadow-md">
      {/* Curved side border that hugs the left side and corner curves without spilling onto flat horizontal edges */}
      <CardCurvedBorder color={data.accentStroke} />

      <div className="relative z-10 flex items-start gap-4 pl-2">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${data.iconBg} ${data.iconColor}`}
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
