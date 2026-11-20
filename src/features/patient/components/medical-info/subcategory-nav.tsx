"use client";

import React from "react";
import Image from "next/image";
import { HealthSubcategory } from "../../hooks/use-medical-info";
import { UIPatientProfile } from "@/lib/api/patient-types";

interface SubcatMeta {
  id: HealthSubcategory;
  nodeId: string;
  name: string;
  nameNodeId: string;
  subtitle: string;
  subtitleNodeId: string;
  count: number;
  iconBg: string;
  iconSrc: string;
  iconW: number;
  iconH: number;
}

interface SubcategoryNavProps {
  readonly profile: UIPatientProfile;
  readonly activeTab: HealthSubcategory;
  readonly onSelectTab: (tab: HealthSubcategory) => void;
}

export function SubcategoryNav({
  profile,
  activeTab,
  onSelectTab,
}: SubcategoryNavProps) {
  const chronicList = profile.chronicDiseases || [];
  const allergyList = profile.allergyMenu || [];
  const medicationList = profile.currentMedications || [];
  const surgeryList = profile.previousSurgicalProcedures || [];

  const subcategories: SubcatMeta[] = [
    {
      id: "chronic",
      nodeId: "299:1725",
      name: "Chronic Conditions",
      nameNodeId: "299:1730",
      subtitle:
        chronicList.length > 0
          ? chronicList
              .map((c) =>
                c.name?.includes("Hypertension")
                  ? "Hypertension"
                  : c.name?.includes("Asthma")
                  ? "Asthma"
                  : c.name ?? ""
              )
              .slice(0, 2)
              .join(", ")
          : "Hypertension, Asthma",
      subtitleNodeId: "299:1731",
      count: chronicList.length > 0 ? chronicList.length : 2,
      iconBg: "bg-[#d0e4ff]",
      iconSrc: "/assets/medical-info/subcat-pulse.svg",
      iconW: 32,
      iconH: 32,
    },
    {
      id: "allergies",
      nodeId: "299:1746",
      name: "Allergies",
      nameNodeId: "299:1753",
      subtitle:
        allergyList.length > 0
          ? allergyList.map((a) => a.name).slice(0, 2).join(", ")
          : "Penicillin, Dust Mites",
      subtitleNodeId: "299:1755",
      count: allergyList.length > 0 ? allergyList.length : 2,
      iconBg: "bg-[rgba(255,218,214,0.3)]",
      iconSrc: "/assets/medical-info/subcat-allergy.svg",
      iconW: 12,
      iconH: 12,
    },
    {
      id: "medications",
      nodeId: "299:1758",
      name: "Current Medications",
      nameNodeId: "299:1765",
      subtitle:
        medicationList.length > 0
          ? medicationList.map((m) => m.name).slice(0, 2).join(", ")
          : "Lisinopril, Ventolin Inhaler",
      subtitleNodeId: "299:1767",
      count: medicationList.length > 0 ? medicationList.length : 2,
      iconBg: "bg-[#dae2ff]",
      iconSrc: "/assets/medical-info/subcat-medication.svg",
      iconW: 13,
      iconH: 15,
    },
    {
      id: "surgeries",
      nodeId: "299:1770",
      name: "Previous Surgeries",
      nameNodeId: "299:1777",
      subtitle:
        surgeryList.length > 0
          ? surgeryList.map((s) => s.name).slice(0, 2).join(", ")
          : "Appendectomy (2018)",
      subtitleNodeId: "299:1779",
      count: surgeryList.length > 0 ? surgeryList.length : 1,
      iconBg: "bg-[#b3ebff]",
      iconSrc: "/assets/medical-info/subcat-surgery.svg",
      iconW: 13,
      iconH: 13,
    },
  ];

  return (
    <div
      className="lg:col-span-4 content-stretch flex flex-col items-start relative w-full"
      data-node-id="299:1718"
      data-name="Personal health subcategories"
      style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
    >
      <div
        className="bg-white border border-[rgba(191,199,211,0.6)] border-solid drop-shadow-[0px_1px_1.5px_rgba(2,48,125,0.04),0px_4px_6px_rgba(2,48,125,0.03)] flex flex-col gap-[4px] items-start p-[10px] relative rounded-[8px] shrink-0 w-full"
        data-node-id="299:1719"
        data-name="Group 1 Subcategories List"
      >
        {/* Header Title with Filter Icon */}
        <div
          className="flex items-center justify-between px-[12px] py-[8px] relative shrink-0 w-full"
          data-node-id="299:1720"
          data-name="Container"
        >
          <span
            className="font-medium text-[12px] text-[#41474f] uppercase whitespace-nowrap leading-normal"
            data-node-id="299:1722"
          >
            PERSONAL HEALTH SUBCATEGORIES
          </span>
          <div className="relative shrink-0 size-[10.5px]" data-node-id="299:1723">
            <Image
              src="/assets/medical-info/subcat-filter.svg"
              alt=""
              width={11}
              height={11}
              unoptimized
              className="absolute block inset-0 max-w-none size-full"
            />
          </div>
        </div>

        {/* Subcategory List Items */}
        {subcategories.map((cat) => {
          const isActive = activeTab === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectTab(cat.id)}
              className={`w-full text-left transition-colors flex items-center justify-between cursor-pointer ${
                isActive
                  ? "bg-[rgba(192,202,227,0.1)] border border-[rgba(0,96,155,0.2)] border-solid p-[12px] rounded-[4px]"
                  : "border border-transparent hover:bg-slate-50 p-[12px] rounded-[4px]"
              }`}
              data-node-id={cat.nodeId}
              data-name={cat.name}
            >
              <div className="flex gap-[12px] items-center relative shrink-0 overflow-hidden">
                {/* Category Icon */}
                {cat.id === "chronic" ? (
                  <div
                    className="relative shrink-0 size-[32px] rounded-[4px] overflow-hidden"
                    data-node-id="299:1727"
                  >
                    <Image
                      src={cat.iconSrc}
                      alt=""
                      width={32}
                      height={32}
                      unoptimized
                      className="absolute block inset-0 max-w-none size-full"
                    />
                  </div>
                ) : (
                  <div
                    className={`${cat.iconBg} flex items-center justify-center relative rounded-[4px] shrink-0 size-[32px]`}
                  >
                    <div
                      className="relative shrink-0"
                      style={{ width: `${cat.iconW}px`, height: `${cat.iconH}px` }}
                    >
                      <Image
                        src={cat.iconSrc}
                        alt=""
                        width={cat.iconW}
                        height={cat.iconH}
                        unoptimized
                        className="absolute block inset-0 max-w-none size-full"
                      />
                    </div>
                  </div>
                )}

                {/* Category Labels */}
                <div className="flex flex-col items-start leading-normal whitespace-nowrap overflow-hidden">
                  <span
                    className="font-bold text-[14px] text-[#01091e] leading-normal"
                    data-node-id={cat.nameNodeId}
                  >
                    {cat.name}
                  </span>
                  <span
                    className="font-normal text-[12px] text-[#41474f] leading-normal whitespace-nowrap"
                    data-node-id={cat.subtitleNodeId}
                  >
                    {cat.subtitle}
                  </span>
                </div>
              </div>

              {/* Count Badge */}
              <div
                className={`px-[8px] py-[2px] rounded-[12px] shrink-0 flex items-center justify-center ${
                  isActive ? "bg-[#02307d]" : "bg-[#e9edff]"
                }`}
                data-node-id={isActive ? "299:1732" : undefined}
              >
                <span
                  className={`text-[12px] whitespace-nowrap leading-[16px] ${
                    isActive
                      ? "text-white font-normal font-sans"
                      : "text-[#404751] font-medium font-['Space_Grotesk']"
                  }`}
                  data-node-id={isActive ? "299:1733" : undefined}
                >
                  {cat.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
