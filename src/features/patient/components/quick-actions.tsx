import React from "react";
import Image from "next/image";
import Link from "next/link";

interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  mobileBrief: string;
  iconPath: string;
  href: string;
  accentColor: string;
  iconSvg: React.ReactNode;
}

const QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: "action-records",
    title: "Medical Records",
    description:
      "View medical history, diagnoses, prescriptions, lab results, and medical imaging.",
    mobileBrief: "View medical history",
    iconPath: "/patient/action-icon-1.png",
    href: "/patient/records",
    accentColor: "#0080DF",
    iconSvg: (
      <svg className="w-6 h-6 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "action-prescription",
    title: "Upload Prescription",
    description:
      "Scan and upload a prescription image to automatically extract and verify clinical details using OCR.",
    mobileBrief: "Scan and upload a prescription using OCR",
    iconPath: "/patient/action-icon-2.png",
    href: "/patient/upload",
    accentColor: "#00B4D8",
    iconSvg: (
      <svg className="w-6 h-6 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    id: "action-ai",
    title: "AI Health Assistant",
    description:
      "Ask questions and receive instant, personalized clinical guidance based on your verified medical records.",
    mobileBrief: "Ask questions about personal health records",
    iconPath: "/patient/action-icon-3.png",
    href: "/patient/assistant",
    accentColor: "#0284C7",
    iconSvg: (
      <svg className="w-6 h-6 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "action-access",
    title: "Access Requests",
    description:
      "Review, approve, or revoke medical professionals' and hospital access permissions anytime.",
    mobileBrief: "Manage doctors' access permissions",
    iconPath: "/patient/action-icon-4.png",
    href: "/patient/access",
    accentColor: "#0080DF",
    iconSvg: (
      <svg className="w-6 h-6 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export function QuickActions() {
  return (
    <section id="quick-actions" className="w-full bg-[#FBFEFF] pt-12 sm:pt-16 pb-12 sm:pb-16 overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Figma Home Patient (y=820, x=32) */}
        <div className="max-w-[770px] text-left mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#0080DF] tracking-tight leading-tight">
            Quick Actions
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#41474F] leading-relaxed">
            Direct access to essential healthcare workflows, identity verification, and patient intelligence tools.
          </p>
        </div>

        {/* 
          Grid Layout:
          - Desktop (1280px): 4 columns side by side
          - Tablet: 2 columns
          - Mobile: 2x2 grid (matching Home-patient-mobile.pdf)
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              className="group relative bg-white rounded-2xl p-4 sm:p-6 border border-[#DCE4F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#0080DF]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E8F3FF] flex items-center justify-center shrink-0 mb-3.5 sm:mb-5 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                  <Image
                    src={action.iconPath}
                    alt=""
                    width={48}
                    height={48}
                    className="object-contain p-1"
                  />
                  <span className="sr-only">{action.title}</span>
                </div>

                {/* Card Title */}
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#02307D] group-hover:text-[#0080DF] transition-colors leading-snug">
                  {action.title}
                </h3>

                {/* Desktop Description */}
                <p className="hidden sm:block mt-2 text-[14px] text-[#41474F] leading-normal font-normal">
                  {action.description}
                </p>

                {/* Mobile Brief Description */}
                <p className="block sm:hidden mt-1 text-[12px] text-[#41474F] leading-normal font-normal line-clamp-2">
                  {action.mobileBrief}
                </p>
              </div>

              {/* Action indicator arrow */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0080DF]">
                <span>Open Workflow</span>
                <span className="transform group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

