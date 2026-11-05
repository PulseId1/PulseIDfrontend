import React from "react";
import Link from "next/link";

interface ActivityItem {
  id: string;
  category: string;
  datetimeDesktop: string;
  datetimeMobile: string;
  title: string;
  provider: string;
  iconPath: string;
  badgeBg: string;
  badgeText: string;
  href: string;
  iconSvg: React.ReactNode;
}

const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    category: "Prescription",
    datetimeDesktop: "Today, 10:30 AM",
    datetimeMobile: "Today, 10:30 AM",
    title: "Prescription Refill & Dosage Details",
    provider: "Verified by Dr. Hassan",
    iconPath: "/patient/activity-icon-1.png",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    href: "/patient/records/prescription-1",
    iconSvg: (
      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "act-2",
    category: "Lab Results",
    datetimeDesktop: "Yesterday, 04:15 PM",
    datetimeMobile: "Yesterday",
    title: "Comprehensive Metabolic Panel & CBC",
    provider: "Cairo Clinical Labs",
    iconPath: "/patient/activity-icon-2.png",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    href: "/patient/records/lab-2",
    iconSvg: (
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    id: "act-3",
    category: "Diagnosis",
    datetimeDesktop: "Oct 24, 2026",
    datetimeMobile: "Oct 24, 2023",
    title: "Routine Cardiology & Vitals Consultation",
    provider: "Cardiology Dept.",
    iconPath: "/patient/activity-icon-3.png",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    href: "/patient/records/diagnosis-3",
    iconSvg: (
      <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: "act-4",
    category: "Medical Imaging",
    datetimeDesktop: "Oct 20, 2026",
    datetimeMobile: "Oct 20, 2023",
    title: "Chest X-Ray & Digital Radiology Scan",
    provider: "Al Borg Scan Center",
    iconPath: "/patient/activity-icon-4.png",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    href: "/patient/records/imaging-4",
    iconSvg: (
      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export function RecentMedicalActivity() {
  return (
    <section id="recent-activity" className="w-full bg-[#FBFEFF] pt-8 sm:pt-12 pb-14 sm:pb-20 overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Figma Home Patient (y=1696) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#0080DF] tracking-tight leading-tight">
              Recent Medical Activity
            </h2>
            <p className="mt-2 text-xs sm:text-base text-[#41474F] leading-relaxed max-w-2xl">
              Seamlessly synchronizing diagnostic evaluations, digital lab releases, and clinical consults.
            </p>
          </div>

          <Link
            href="/patient/activity"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0080DF] hover:text-[#0060A8] transition-colors shrink-0 group py-1"
          >
            <span className="hidden sm:inline">See All Activity</span>
            <span className="sm:hidden">See All</span>
            <span className="transform group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* 
          Grid Layout:
          - Desktop (1280px): 4 columns side by side
          - Tablet: 2 columns
          - Mobile: 2x2 grid (matching Home-patient-mobile.pdf)
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {RECENT_ACTIVITIES.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-[#DCE4F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#0080DF]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header row: Category & Date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-md ${item.badgeBg} ${item.badgeText}`}>
                    {item.category}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    <span className="hidden sm:inline">{item.datetimeDesktop}</span>
                    <span className="sm:hidden">{item.datetimeMobile}</span>
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-[14px] sm:text-[16px] font-bold text-[#02307D] group-hover:text-[#0080DF] transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>

                {/* Provider / Doctor info */}
                <div className="mt-3 flex items-center gap-2 text-xs text-[#41474F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.provider}</span>
                </div>
              </div>

              {/* View detail footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-[#0080DF] transition-colors">
                <span>View Details</span>
                <span className="transform group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

