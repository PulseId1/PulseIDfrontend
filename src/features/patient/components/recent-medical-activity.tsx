"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ActivityItem {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly time: string;
  readonly provider: string;
  readonly iconSrc: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
  readonly href: string;
  readonly nodeId: string;
}

const RECENT_ACTIVITIES: readonly ActivityItem[] = [
  {
    id: "act-prescription",
    title: "Prescription",
    subtitle: "Prescription Refill & Dosage Details",
    time: "Today, 10:30 AM",
    provider: "Verified by Dr. Hassan",
    iconSrc: "/assets/patient-home/activity-prescription.svg",
    iconWidth: 21,
    iconHeight: 23,
    href: "/patient/records?tab=prescriptions",
    nodeId: "299:5032",
  },
  {
    id: "act-lab",
    title: "Lab Results",
    subtitle: "Comprehensive Metabolic Panel & CBC",
    time: "Yesterday, 04:15 PM",
    provider: "Cairo Clinical Labs",
    iconSrc: "/assets/patient-home/activity-lab-results.svg",
    iconWidth: 21,
    iconHeight: 21,
    href: "/patient/records?tab=labs",
    nodeId: "299:5051",
  },
  {
    id: "act-diagnosis",
    title: "Diagnosis",
    subtitle: "Routine Cardiology & Vitals Consultation",
    time: "Oct 24, 2026",
    provider: "Cardiology Dept.",
    iconSrc: "/assets/patient-home/activity-diagnosis.svg",
    iconWidth: 23,
    iconHeight: 23,
    href: "/patient/records?tab=diagnoses",
    nodeId: "299:5070",
  },
  {
    id: "act-imaging",
    title: "Radiology",
    subtitle: "Chest X-Ray & Digital Radiology Scan",
    time: "Oct 20, 2026",
    provider: "Al Borg Scan Center",
    iconSrc: "/assets/patient-home/activity-imaging.svg",
    iconWidth: 21,
    iconHeight: 21,
    href: "/patient/records?tab=radiology",
    nodeId: "299:5089",
  },
];

export function RecentMedicalActivity() {
  return (
    <section
      id="recent-activity"
      className="w-full bg-white py-[80px]"
      data-node-id="299:5018"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8" data-node-id="299:5019">
        {/* Section Heading matching Figma Node 299:5020 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-[48px] w-full" data-node-id="299:5020">
          <div className="flex flex-col gap-[8px] items-start max-w-[683px]" data-node-id="299:5021">
            <h2
              className="font-heading font-bold text-[30px] sm:text-[36px] text-[#02307D] leading-normal"
              data-node-id="299:5023"
            >
              Recent Medical Activity
            </h2>
            <p
              className="font-sans font-normal text-[15px] sm:text-[16px] text-[#41474F] leading-normal"
              data-node-id="299:5025"
            >
              Seamlessly synchronizing diagnostic evaluations, digital lab releases, and clinical consults.
            </p>
          </div>

          <Link
            href="/patient/records"
            className="flex items-center gap-[6px] text-[#078BDE] hover:text-[#056AA8] font-bold text-[14px] leading-normal transition-colors group shrink-0"
            data-node-id="299:5026"
          >
            <span data-node-id="299:5028">See All Activity</span>
            <div className="size-[12px] relative shrink-0 group-hover:translate-x-1 transition-transform" data-node-id="299:5029">
              <Image
                src="/assets/patient-home/activity-see-all-arrow.svg"
                alt=""
                width={12}
                height={12}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
        </div>

        {/* 4 Cards Grid matching Figma Node 299:5031 */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] items-stretch justify-center w-full"
          data-node-id="299:5031"
        >
          {RECENT_ACTIVITIES.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="bg-white border border-[#D0DEFF] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[25px] flex flex-col justify-between hover:border-[#078BDE] hover:shadow-md transition-all transform hover:-translate-y-1 group"
              data-node-id={item.nodeId}
            >
              {/* Top Row: Icon Badge + Time Badge */}
              <div className="flex items-center justify-between pb-[24px] w-full">
                <div className="bg-[rgba(142,191,222,0.2)] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] size-[56px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <div
                    className="relative shrink-0"
                    style={{ width: `${item.iconWidth}px`, height: `${item.iconHeight}px` }}
                  >
                    <Image
                      src={item.iconSrc}
                      alt=""
                      width={item.iconWidth}
                      height={item.iconHeight}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="bg-[#EAEDF6] border border-[#D0DEFF] rounded-[12px] px-[11px] py-[5px] shrink-0">
                  <span className="font-sans font-semibold text-[12px] text-[#02307D] leading-normal whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
              </div>

              {/* Middle: Title + Subtitle */}
              <div className="flex flex-col gap-[4px] items-start w-full">
                <h3 className="font-heading font-bold text-[16px] text-[#02307D] leading-normal w-full">
                  {item.title}
                </h3>
                <p className="font-sans font-normal text-[12px] text-[#41474F] leading-normal w-full">
                  {item.subtitle}
                </p>
              </div>

              {/* Bottom: Provider Link + Chevron */}
              <div className="pt-[16px] w-full">
                <div className="border-t border-[#DDE7FF] pt-[17px] flex items-center justify-between w-full">
                  <span className="font-sans font-semibold text-[12px] text-[#078BDE] leading-normal whitespace-nowrap group-hover:underline">
                    {item.provider}
                  </span>
                  <div className="w-[5px] h-[8px] relative shrink-0 group-hover:translate-x-1 transition-transform">
                    <Image
                      src="/assets/patient-home/activity-chevron.svg"
                      alt=""
                      width={5}
                      height={8}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
