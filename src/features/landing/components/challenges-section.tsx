"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ChallengeCardData {
  id: string;
  title: string;
  description: string;
  expandedDetail: string;
  accentStroke: string;
  iconSrc: string;
}

// Desktop cards (surround layout matching Figma node 233:189)
const DESKTOP_CHALLENGES: ChallengeCardData[] = [
  {
    id: "frag-history",
    title: "Fragmented Medical History",
    description:
      "Disconnected hospital systems, paper files, and delayed clinical handoffs lead to incomplete clinical histories.",
    expandedDetail:
      "Patients frequently undergo duplicate laboratory tests and repeat diagnostics because previous hospital records cannot be accessed across disparate EHR providers.",
    accentStroke: "#BA1A1A",
    iconSrc: "/assets/figma/icons/challenge-01-fragmented-history.svg",
  },
  {
    id: "time-access",
    title: "Time-Consuming Access",
    description:
      "Finding the right medical records across multiple healthcare systems takes valuable time during critical consultations.",
    expandedDetail:
      "Doctors spend an average of 15–20% of consultation time requesting, faxing, or logging into external portals to verify historical records during acute care.",
    accentStroke: "#00AEC7",
    iconSrc: "/assets/figma/icons/challenge-02-time-access.svg",
  },
  {
    id: "med-risks",
    title: "Safety & Medication Risks",
    description:
      "Lack of real-time drug interaction checks can lead to prescription errors and preventable adverse reactions.",
    expandedDetail:
      "Cross-prescriptions between distinct specialists often trigger severe drug-drug interactions or duplicate therapies without a unified medication ledger.",
    accentStroke: "#BA1A1A",
    iconSrc: "/assets/figma/icons/challenge-03-medication-risks.svg",
  },
  {
    id: "privacy",
    title: "Data Fragmentation & Privacy",
    description:
      "Patient data is scattered across different healthcare providers and systems, making secure and controlled access difficult.",
    expandedDetail:
      "Traditional healthcare networks lack fine-grained, verifiable cryptographic consent, leaving patients uninformed about third-party record access.",
    accentStroke: "#0080DF",
    iconSrc: "/assets/figma/icons/challenge-04-data-privacy.svg",
  },
  {
    id: "insights",
    title: "Limited Medical Insights",
    description:
      "Difficulty converting unstructured medical records and PDFs into actionable medical insights.",
    expandedDetail:
      "Clinical notes and laboratory printouts remain trapped as flat images, making automated clinical risk factor extraction and timeline synthesis impossible.",
    accentStroke: "#0080DF",
    iconSrc: "/assets/figma/icons/challenge-05-medical-insights.svg",
  },
];

// Mobile cards (sequential 1-5 matching Figma node 218:421 & 218:430)
const MOBILE_CHALLENGES: ChallengeCardData[] = [
  {
    id: "m-frag-history",
    title: "1. Fragmented Medical History",
    description:
      "Disconnected hospital silos, paper files, and delayed clinical handoffs lead to incomplete clinical histories.",
    expandedDetail:
      "Patients frequently undergo duplicate laboratory tests and repeat diagnostics because previous hospital records cannot be accessed across disparate EHR providers.",
    accentStroke: "#BA1A1A",
    iconSrc: "/assets/figma/mobile/challenge-1-database.svg",
  },
  {
    id: "m-time-access",
    title: "2. Compromised Privacy & Consent",
    description:
      "Patients cannot control or audit which clinics, third parties, or doctors access their sensitive diagnoses.",
    expandedDetail:
      "Traditional healthcare networks lack fine-grained, verifiable cryptographic consent, leaving patients uninformed about third-party record access.",
    accentStroke: "#00AEC7",
    iconSrc: "/assets/figma/mobile/challenge-2-padlock.svg",
  },
  {
    id: "m-privacy",
    title: "3. Prescription Loss & Verification Lag",
    description:
      "Paper prescriptions get misplaced, forged, or misread, resulting in severe dispensing delays and hazards.",
    expandedDetail:
      "Handwritten paper scripts lack cryptographic authentication, causing pharmacist verification phone tags and medication delays.",
    accentStroke: "#0080DF",
    iconSrc: "/assets/figma/mobile/challenge-3-prescription.svg",
  },
  {
    id: "m-med-risks",
    title: "4. Redundant Diagnostic Testing",
    description:
      "Patients repeatedly pay out-of-pocket for duplicate blood panels and imaging scans because labs don't communicate.",
    expandedDetail:
      "Lack of real-time clinical sharing forces emergency clinicians to re-order standard MRI, CT, and laboratory panels.",
    accentStroke: "#BA1A1A",
    iconSrc: "/assets/figma/mobile/challenge-4-sync.svg",
  },
  {
    id: "m-insights",
    title: "5. Finding Verified Specialists",
    description:
      "Patients struggle to identify credentialed clinics and schedule timely consultations with verified medical providers.",
    expandedDetail:
      "Clinical registries and referral networks are fragmented across hospital groups, leaving patients uncertain of physician qualifications.",
    accentStroke: "#0080DF",
    iconSrc: "/assets/figma/mobile/challenge-5-users.svg",
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
    <section
      id="challenges"
      className="scroll-mt-20 w-full bg-[#f8fafc] lg:bg-[#FBFEFF] py-10 lg:pt-[60px] lg:pb-0 overflow-hidden"
      data-node-id="218:421"
      data-name="ChallengesSection"
    >
      {/* 
        Section Heading:
        Mobile (Figma Node 218:422): 24px Bold, #02307D, 12px subtitle
        Desktop (Figma Node 233:189): 36px Bold, #078BDE, 16px subtitle
      */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 lg:mb-10">
        <div className="max-w-[770px] text-left">
          <h2 className="text-[24px] lg:text-[36px] font-bold text-[#02307D] lg:text-[#078BDE] tracking-tight leading-normal font-sans">
            The Challenges Users Face
          </h2>
          <p className="mt-1 lg:mt-2 text-[12px] lg:text-[16px] text-[#41474F] leading-normal font-sans">
            Every user faces challenges when searching for and accessing
            healthcare services and information. We identified five key problems
            through our research and documentation.
          </p>
        </div>
      </div>

      {/* 
        Desktop Cards Frame (Full-width edge-to-edge container, NO space-x)
        Exact Figma properties matching node 233:193 & 233:195:
        width: 100% full-width (no space-x / no outer horizontal inset), height: 579px;
        Sharp container (rounded-none, border-y border-[#D6E2F0]) with authentic sec2-bg-gradient.svg
        Outer container has NO space-x (spans edge-to-edge full viewport width)
      */}
      <div className="hidden lg:block w-full">
        <div
          className="w-full min-h-[579px] h-[579px] border-y border-[#D6E2F0] rounded-none bg-gradient-to-b from-[#F4F8FC] via-[#FAF8FF] via-1/2 to-[#EBF1F9] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] relative overflow-hidden py-[49px]"
          data-node-id="233:193"
        >
          {/* Layer 1: Figma Node 233:194 Background ECG grid & hospital silhouette styling */}
          <div
            className="absolute inset-0 pointer-events-none select-none z-0"
            style={{
              opacity: 0.25,
              backgroundImage:
                "linear-gradient(90deg, rgba(191, 199, 211, 0.22) 3.5714%, rgba(191, 199, 211, 0.00) 3.5714%), linear-gradient(180deg, rgba(191, 199, 211, 0.22) 3.5714%, rgba(191, 199, 211, 0.00) 3.5714%)",
              backgroundSize: "28px 28px",
            }}
            data-node-id="233:194"
          />

          {/* Layer 2: Figma Node 233:196 sec2-bg-gradient.svg (Authentic gradients, blurs, and concentric boundaries) */}
          <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden z-0" aria-hidden="true">
            <div className="relative w-[1214px] h-[501px] shrink-0">
              <Image
                src="/sec2-bg-gradient.svg"
                alt=""
                fill
                priority
                unoptimized
                className="object-contain pointer-events-none select-none"
              />
            </div>
          </div>

          {/* Layer 3: Background decoration: authentic orbital stage connecting arcs and dot matrix */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden rounded-none z-0">
            <div className="relative w-[1214px] h-[501px] shrink-0">
              <Image
                src="/assets/figma/landing/challenges-orbital-stage.svg"
                alt=""
                fill
                className="object-contain pointer-events-none select-none"
                priority
              />
            </div>
          </div>

          {/* Inner content wrapper max-w-[1214px] mx-auto matching node 233:195 */}
          <div className="w-full max-w-[1214px] mx-auto h-full flex flex-col justify-between relative z-10" data-node-id="233:195">
            {/* Top Card: Fragmented Medical History */}
            <div className="relative z-10 flex justify-center">
              <div className="w-[448px]">
                <ChallengeCardDesktop data={topCard} />
              </div>
            </div>

            {/* Middle Row with gap: 32px */}
            <div className="relative z-10 grid grid-cols-12 gap-8 items-center my-auto w-full">
              {/* Left Column: Time-Consuming Access & Safety & Medication Risks */}
              <div className="col-span-4 flex flex-col gap-6 max-w-[383px]">
                <ChallengeCardDesktop data={leftTopCard} />
                <ChallengeCardDesktop data={leftBottomCard} />
              </div>

              {/* Center: Authentic Figma Chaos Doctor Illustration (challenges-chaos-physician.png) */}
              <div className="col-span-4 flex justify-center items-center">
                <div className="relative w-[448px] h-[332px] transition-transform hover:scale-105 duration-300">
                  <Image
                    src="/assets/figma/landing/challenges-chaos-physician.png"
                    alt="Doctor dealing with chaotic medical record systems"
                    fill
                    unoptimized
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Data Fragmentation & Privacy & Limited Medical Insights */}
              <div className="col-span-4 flex flex-col gap-6 max-w-[383px] ml-auto">
                <ChallengeCardDesktop data={rightTopCard} />
                <ChallengeCardDesktop data={rightBottomCard} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        Mobile Version matching Figma lADING MOBAIL (Node 218:421 & 218:430):
        5 cards stacked in a single column, 358px wide with 16px side margin, with Details ⌄ toggle
      */}
      <div className="block lg:hidden w-full max-w-[420px] mx-auto px-4 pb-10 flex flex-col gap-[12px] relative z-10" data-node-id="218:429">
        {MOBILE_CHALLENGES.map((card) => {
          const isExpanded = expandedId === card.id;
          return (
            <div
              key={card.id}
              className="w-full bg-white rounded-[16px] p-3.5 sm:p-4 border border-[#e1eaf5] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex gap-2.5 sm:gap-3 items-start transition-all"
            >
              {/* Left: 36x36 Icon Container matching Figma 218:432 */}
              <div className="size-[36px] rounded-[12px] bg-[#fff1f2] border border-[#ffe4e6] flex items-center justify-center shrink-0 p-px">
                <Image
                  src={card.iconSrc}
                  alt=""
                  width={16}
                  height={16}
                  priority
                  unoptimized
                  className="size-[16px] object-contain"
                />
              </div>

              {/* Right: Content Column matching Figma 218:435 */}
              <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
                {/* Header Row: Title + Details Button */}
                <div className="flex items-center justify-between gap-1.5 w-full">
                  <h3 className="font-bold text-[#01091e] text-[12px] leading-tight font-sans whitespace-nowrap">
                    {card.title}
                  </h3>

                  <button
                    type="button"
                    onClick={() => toggleExpand(card.id)}
                    className="text-[#078bde] hover:text-[#0060a8] text-[11px] font-semibold flex items-center gap-[2px] shrink-0 cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <span>Details</span>
                    <div className={`size-[14px] flex items-center justify-center transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                      <Image
                        src="/assets/figma/mobile/chevron-down.svg"
                        alt=""
                        width={14}
                        height={14}
                        unoptimized
                      />
                    </div>
                  </button>
                </div>

                {/* Description alongside the icon */}
                <p className="font-normal text-[11px] text-[#41474f] leading-[15px] font-sans">
                  {card.description}
                </p>

                {/* Accordion detail if expanded */}
                {isExpanded && (
                  <div className="mt-2 pt-2 border-t border-[#e1eaf5] text-[11px] text-[#41474f] italic bg-[#f8fafc] p-2 rounded-lg animate-in fade-in duration-200">
                    <span className="font-semibold text-[#02307d] not-italic block mb-0.5">
                      Key Impact:
                    </span>
                    {card.expandedDetail}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ChallengeCardDesktop({ data }: { readonly data: ChallengeCardData }) {
  return (
    <div
      className="relative bg-white rounded-[16px] p-6 pl-7 border border-[#DCE4F0] border-l-4 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.06),0px_2px_4px_-2px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-md"
      style={{ borderLeftColor: data.accentStroke }}
    >
      <div className="relative z-10 flex items-start gap-4">
        <div className="w-12 h-12 rounded-[8px] bg-[#F0F4FA] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
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
