"use client";

import React from "react";
import Image from "next/image";
import { RecordCategory } from "../../hooks/use-medical-records";

export interface CategoryMeta {
  readonly id: RecordCategory;
  readonly name: string;
  readonly subtitle: string;
  readonly count: number | string;
  readonly iconSrc: string;
  readonly iconActiveBg: string;
  readonly iconInactiveBg: string;
}

export const RECORD_CATEGORIES: readonly CategoryMeta[] = [
  {
    id: "history",
    name: "Medical History",
    subtitle: "Pneumonia, Concussion",
    count: 2,
    iconSrc: "/assets/records/sidebar-medical-history.svg",
    iconActiveBg: "bg-[#d9e2ff]",
    iconInactiveBg: "bg-[#e9edff]",
  },
  {
    id: "labs",
    name: "Lab Tests",
    subtitle: "Glucose, Lipid Panel, CBC",
    count: 4,
    iconSrc: "/assets/records/sidebar-lab-tests.svg",
    iconActiveBg: "bg-[#ffe082]",
    iconInactiveBg: "bg-[rgba(235,160,0,0.15)]",
  },
  {
    id: "radiology",
    name: "Radiology & X-rays",
    subtitle: "Chest Digital Scan, MRI",
    count: 4,
    iconSrc: "/assets/records/sidebar-radiology.svg",
    iconActiveBg: "bg-[#b3ebff]",
    iconInactiveBg: "bg-[rgba(0,121,195,0.15)]",
  },
  {
    id: "diagnoses",
    name: "Medical Diagnoses",
    subtitle: "Physician Certified Records",
    count: 3,
    iconSrc: "/assets/records/sidebar-diagnoses.svg",
    iconActiveBg: "bg-[#b3ebff]",
    iconInactiveBg: "bg-[#e9edff]",
  },
  {
    id: "prescriptions",
    name: "Prescriptions",
    subtitle: "Past prescriptions",
    count: 3,
    iconSrc: "/assets/records/sidebar-prescriptions.svg",
    iconActiveBg: "bg-[#c5d5f5]",
    iconInactiveBg: "bg-[rgba(45,91,168,0.15)]",
  },
  {
    id: "otc",
    name: "OTC Dispensing",
    subtitle: "Dispensed OTC medicines",
    count: 1,
    iconSrc: "/assets/records/sidebar-otc.svg",
    iconActiveBg: "bg-[#d9e2ff]",
    iconInactiveBg: "bg-[#e9edff]",
  },
];

interface RecordsSidebarProps {
  readonly activeTab: RecordCategory;
  readonly onSelectTab: (tab: RecordCategory) => void;
}

/**
 * Master Subcategory Selector (Sidebar)
 * EXACT implementation of Figma Node 299:3843 & 299:3844
 */
export function RecordsSidebar({
  activeTab,
  onSelectTab,
}: RecordsSidebarProps) {
  return (
    <aside
      className="lg:col-span-4 bg-white border border-[rgba(191,199,211,0.6)] rounded-[8px] p-[11px] drop-shadow-[0px_1px_1.5px_rgba(2,48,125,0.04),0px_4px_6px_rgba(2,48,125,0.03)] flex flex-col gap-[4px] w-full"
      data-node-id="299:3843"
      data-name="Aside - Left Column: Master Subcategory Selector"
      style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
    >
      {/* Header (Figma Node 299:3845) */}
      <div className="flex items-center justify-between px-[12px] py-[8px] w-full" data-node-id="299:3845">
        <span
          className="text-[12px] font-medium text-[#41474F] uppercase tracking-wider font-sans select-none"
          data-node-id="299:3847"
        >
          DIAGNOSTICS SUBCATEGORIES
        </span>
        <div className="h-[11px] w-[8.17px] relative shrink-0" data-node-id="299:3848" title="Diagnostics">
          <Image
            src="/assets/records/aside-top-diagnostics.svg"
            alt=""
            width={8}
            height={11}
            unoptimized
            className="w-[8.17px] h-[11.08px] block"
          />
        </div>
      </div>

      {/* Categories List (Figma Nodes 299:3850 to 526:10115) */}
      <div className="flex flex-col gap-[4px] w-full">
        {RECORD_CATEGORIES.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectTab(cat.id)}
              className={`w-full text-left p-[12px] rounded-[4px] transition-all flex items-center justify-between cursor-pointer ${
                isActive
                  ? "bg-[#F1F3FF] border border-[rgba(0,96,155,0.2)]"
                  : "hover:bg-slate-50 border border-transparent"
              }`}
              data-node-id={isActive ? "299:3850" : undefined}
            >
              <div className="flex items-center gap-[12px]">
                <div
                  className={`size-[32px] rounded-[4px] flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? cat.iconActiveBg : cat.iconInactiveBg
                  }`}
                >
                  <Image
                    src={cat.iconSrc}
                    alt=""
                    width={18}
                    height={18}
                    unoptimized
                    className="w-4 h-4 object-contain"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span
                    className={`text-[14px] font-bold leading-normal ${
                      isActive ? "text-[#02307D]" : "text-[#01091E]"
                    }`}
                  >
                    {cat.name}
                  </span>
                  <span
                    className={`text-[12px] font-normal leading-normal ${
                      isActive ? "text-[#41474F]" : "text-[#404751]"
                    }`}
                  >
                    {cat.subtitle}
                  </span>
                </div>
              </div>

              <div
                className={`px-[8px] py-[2px] rounded-[12px] shrink-0 ${
                  isActive
                    ? "bg-[#00609B] text-white"
                    : "bg-[#E9EDFF] text-[#404751]"
                }`}
              >
                <span className="text-[12px] font-medium leading-normal">
                  {cat.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
