"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface QuickActionItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly iconSrc: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
  readonly href: string;
  readonly nodeId: string;
}

const QUICK_ACTIONS: readonly QuickActionItem[] = [
  {
    id: "action-records",
    title: "Medical Records",
    description:
      "View medical history, diagnoses, prescriptions, lab results, and medical imaging.",
    iconSrc: "/assets/patient-home/quick-medical-records.svg",
    iconWidth: 19,
    iconHeight: 23,
    href: "/patient/records",
    nodeId: "299:4966",
  },
  {
    id: "action-prescription",
    title: "Upload Prescription",
    description:
      "Scan and upload a prescription image to automatically extract and verify clinical details using OCR.",
    iconSrc: "/assets/patient-home/quick-upload-prescription.svg",
    iconWidth: 23,
    iconHeight: 21,
    href: "/patient/records",
    nodeId: "299:4979",
  },
  {
    id: "action-ai",
    title: "AI Health Assistant",
    description:
      "Ask questions and receive instant, personalized clinical guidance based on your verified medical records.",
    iconSrc: "/assets/patient-home/quick-ai-assistant.svg",
    iconWidth: 26,
    iconHeight: 22,
    href: "/patient/medical-info",
    nodeId: "299:4992",
  },
  {
    id: "action-access",
    title: "Access Requests",
    description:
      "Review, approve, or revoke medical professionals' and hospital access permissions anytime.",
    iconSrc: "/assets/patient-home/quick-access-requests.svg",
    iconWidth: 19,
    iconHeight: 23,
    href: "/patient/access-requests",
    nodeId: "299:5005",
  },
];

export function QuickActions() {
  return (
    <section
      id="quick-actions"
      className="w-full bg-[#FBFEFF] py-[80px]"
      data-node-id="299:4957"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8" data-node-id="299:4958">
        {/* Section Heading matching Figma Node 299:4959 */}
        <div className="flex flex-col gap-[8px] items-start max-w-[672px] mb-[48px]" data-node-id="299:4960">
          <h2
            className="font-heading font-bold text-[30px] sm:text-[36px] text-[#078BDE] leading-normal"
            data-node-id="299:4962"
          >
            Quick Actions
          </h2>
          <p
            className="font-sans font-normal text-[15px] sm:text-[16px] text-[#41474F] leading-normal"
            data-node-id="299:4964"
          >
            Direct access to essential healthcare workflows, identity verification, and patient intelligence tools.
          </p>
        </div>

        {/* 4 Cards Grid matching Figma Node 299:4965 */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] items-stretch justify-center w-full"
          data-node-id="299:4965"
        >
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              className="bg-white border border-[#DDE7FF] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[25px] flex flex-col justify-between hover:border-[#078BDE] hover:shadow-md transition-all transform hover:-translate-y-1 group"
              data-node-id={action.nodeId}
            >
              {/* Top Row: Icon Badge + Card Arrow */}
              <div className="flex items-center justify-between pb-[24px] w-full">
                <div
                  className="bg-[rgba(142,191,222,0.2)] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] size-[56px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                >
                  <div
                    className="relative shrink-0"
                    style={{ width: `${action.iconWidth}px`, height: `${action.iconHeight}px` }}
                  >
                    <Image
                      src={action.iconSrc}
                      alt=""
                      width={action.iconWidth}
                      height={action.iconHeight}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="size-[13px] relative shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <Image
                    src="/assets/patient-home/quick-card-arrow.svg"
                    alt=""
                    width={13}
                    height={13}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Bottom: Title + Description */}
              <div className="flex flex-col gap-[6px] items-start w-full">
                <h3 className="font-heading font-bold text-[18px] text-[#02307D] leading-[28px] w-full">
                  {action.title}
                </h3>
                <p className="font-sans font-normal text-[12px] text-[#41474F] leading-[19.5px] w-full">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
