"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UploadPrescriptionModal } from "./upload-prescription-modal";

interface QuickActionItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly iconSrc: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
  readonly href?: string;
  readonly modalTrigger?: "upload";
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
    modalTrigger: "upload",
    nodeId: "299:4979",
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
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <>
      <section
        id="quick-actions"
        className="w-full bg-[#FBFEFF] py-8 lg:py-[64px]"
        data-node-id="299:4957"
      >
        <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8" data-node-id="299:4958">
          {/* Section Heading matching Figma Node 299:4959 (Desktop) & 364:4495 (Mobile) */}
          <div className="flex flex-col gap-2 items-start max-w-[672px] mb-6 lg:mb-[40px] text-left" data-node-id="299:4960">
            <h2
              className="font-heading font-bold text-[24px] lg:text-[36px] text-[#078BDE] leading-tight"
              data-node-id="299:4962"
            >
              Quick Actions
            </h2>
            <p
              className="font-sans font-normal text-[12px] lg:text-[16px] text-[#41474F] leading-normal"
              data-node-id="299:4964"
            >
              Direct access to essential healthcare workflows, identity verification, and patient intelligence tools.
            </p>
          </div>

          {/* 3 Approved Action Cards (AI Health Assistant removed per Figma feedback) */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-[24px] items-stretch justify-center w-full max-w-[390px] md:max-w-none mx-auto"
            data-node-id="299:4965"
          >
            {QUICK_ACTIONS.map((action) => {
              const cardContent = (
                <>
                  {/* Top Row: Icon Badge + Card Arrow */}
                  <div className="flex items-center justify-between pb-4 lg:pb-[24px] w-full">
                    <div className="bg-[rgba(142,191,222,0.2)] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] size-[48px] lg:size-[56px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
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
                  <div className="flex flex-col gap-1 lg:gap-[6px] items-start w-full text-left">
                    <h3 className="font-heading font-bold text-[16px] lg:text-[18px] text-[#02307D] leading-tight lg:leading-[28px] w-full">
                      {action.title}
                    </h3>
                    <p className="font-sans font-normal text-[12px] text-[#41474F] leading-[19.5px] w-full">
                      {action.description}
                    </p>
                  </div>
                </>
              );

              const cardClasses =
                "bg-white border border-[#DDE7FF] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[16px] p-5 lg:p-[25px] flex flex-col justify-between hover:border-[#078BDE] hover:shadow-md transition-all transform hover:-translate-y-0.5 group cursor-pointer w-full";

              if (action.modalTrigger === "upload") {
                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => setIsUploadOpen(true)}
                    className={cardClasses}
                    data-node-id={action.nodeId}
                  >
                    {cardContent}
                  </button>
                );
              }

              return (
                <Link
                  key={action.id}
                  href={action.href || "#"}
                  className={cardClasses}
                  data-node-id={action.nodeId}
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Modal */}
      <UploadPrescriptionModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSaveSuccess={() => {
          alert("Prescription scanned and saved to your verified medical records.");
        }}
      />
    </>
  );
}
