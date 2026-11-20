"use client";

import React from "react";
import Image from "next/image";
import { UIPatientProfile } from "@/lib/api/patient-types";

interface ChronicConditionsPanelProps {
  readonly conditions?: UIPatientProfile["chronicDiseases"];
  readonly onAddClick: () => void;
  readonly onEditClick?: (conditionName: string) => void;
  readonly onHistoryClick?: (conditionName: string) => void;
}

export function ChronicConditionsPanel({
  onAddClick,
  onEditClick,
  onHistoryClick,
}: ChronicConditionsPanelProps) {
  return (
    <div
      className="content-stretch flex flex-col gap-[24px] items-start relative size-full text-left"
      data-node-id="299:1782"
      data-name="Category details"
      style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
    >
      {/* Category Header matching Figma Node 299:1783 */}
      <div
        className="content-stretch flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden relative shrink-0 w-full"
        data-node-id="299:1783"
        data-name="Category header"
      >
        <div
          className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-hidden relative"
          data-node-id="299:1784"
          data-name="Category introduction"
        >
          <div
            className="content-stretch flex gap-[8px] items-center overflow-hidden relative shrink-0"
            data-node-id="299:1785"
            data-name="Category title"
          >
            <h2
              className="font-bold text-[22px] text-[#01091e] leading-normal font-sans"
              data-node-id="299:1786"
            >
              Chronic Conditions
            </h2>
            <div
              className="bg-[#e2eff6] content-stretch flex items-start overflow-hidden px-[10px] py-[2px] relative rounded-[12px] shrink-0"
              data-node-id="299:1787"
              data-name="Record count"
            >
              <span
                className="font-semibold text-[12px] text-[#078bde] leading-normal whitespace-nowrap font-sans"
                data-node-id="299:1788"
              >
                2 Active Conditions
              </span>
            </div>
          </div>
          <p
            className="font-normal text-[13px] text-[#41474f] leading-normal font-sans"
            data-node-id="299:1789"
          >
            Long-term diagnosed conditions undergoing active monitoring and regular medical management.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddClick}
          className="border border-[#bfc7d3] border-solid content-stretch flex gap-[6px] items-center overflow-hidden px-[12px] py-[6px] relative rounded-[4px] shrink-0 bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          data-node-id="299:1790"
          data-name="Category action"
        >
          <div className="relative shrink-0 size-[12px]" data-node-id="299:1791" data-name="plus">
            <Image
              src="/assets/medical-info/plus-black.svg"
              alt=""
              width={12}
              height={12}
              unoptimized
              className="absolute block inset-0 max-w-none size-full"
            />
          </div>
          <span
            className="font-bold text-[13px] text-[#01091e] whitespace-nowrap leading-normal font-sans"
            data-node-id="299:1793"
          >
            Add Condition
          </span>
        </button>
      </div>

      {/* Card 1: Mild Hypertension matching Figma Node 299:1794 */}
      <div
        className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[20px] items-start overflow-hidden p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
        data-node-id="299:1794"
        data-name="Hypertension record"
      >
        {/* Top Accent Strip */}
        <div
          className="absolute bg-[#078bde] h-[4px] left-0 right-0 top-0"
          data-node-id="299:1852"
          data-name="Background"
        />

        {/* Record Header */}
        <div
          className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-start justify-between pb-[16px] relative shrink-0 w-full"
          data-node-id="299:1795"
          data-name="HorizontalBorder"
        >
          <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-node-id="299:1796">
            <div
              className="bg-[#d0e4ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]"
              data-node-id="299:1797"
              data-name="Background"
            >
              <div className="h-[16px] relative shrink-0 w-[22px]" data-node-id="299:1798">
                <Image
                  src="/assets/medical-info/ecg-pulse.svg"
                  alt=""
                  width={22}
                  height={16}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative" data-node-id="299:1800">
              <div className="content-stretch flex flex-wrap gap-[12px] items-center relative" data-node-id="299:1801">
                <h3
                  className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal font-sans"
                  data-node-id="299:1803"
                >
                  Mild Hypertension
                </h3>
                <div
                  className="bg-[#b3ebff] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[12px] shrink-0"
                  data-node-id="299:1804"
                  data-name="Background"
                >
                  <div
                    className="bg-[#00657a] relative rounded-full shrink-0 size-[6px]"
                    data-node-id="299:1805"
                  />
                  <span
                    className="font-medium text-[#001f27] text-[12px] whitespace-nowrap leading-[16px] font-['Space_Grotesk']"
                    data-node-id="299:1806"
                  >
                    Active Follow-up
                  </span>
                </div>
              </div>
              <p
                className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
                data-node-id="299:1808"
              >
                <span>Diagnosed: </span>
                <span className="font-semibold text-[#01091e]">Jan 2025</span>
                <span> • Primary Physician: Dr. Sherif Mansour</span>
              </p>
            </div>
          </div>

          {/* Action Buttons: Edit & History */}
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="299:1809">
            <button
              type="button"
              onClick={() => onEditClick?.("Mild Hypertension")}
              className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="299:1810"
              data-name="Button - Edit"
              title="Edit Condition"
            >
              <div className="relative shrink-0 size-[13.5px]" data-node-id="299:1811">
                <Image
                  src="/assets/medical-info/pencil-edit.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </button>
            <button
              type="button"
              onClick={() => onHistoryClick?.("Mild Hypertension")}
              className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="299:1813"
              data-name="Button - History"
              title="View History"
            >
              <div className="relative shrink-0 size-[13.5px]" data-node-id="299:1814">
                <Image
                  src="/assets/medical-info/clock-history.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Telemetry & Metrics Segment (3 Columns) */}
        <div
          className="content-stretch grid grid-cols-1 md:grid-cols-3 gap-[16px] items-start justify-center relative shrink-0 w-full"
          data-node-id="299:1816"
          data-name="Telemetry & Metrics Segment"
        >
          {/* Latest Reading */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]"
            data-node-id="299:1817"
            data-name="Background+Border"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:1819"
            >
              LATEST READING
            </span>
            <div className="flex items-baseline gap-[4px] leading-normal" data-node-id="299:1820">
              <span
                className="font-bold text-[20px] text-[#01091e] font-sans leading-normal"
                data-node-id="299:1821"
              >
                128/82
              </span>
              <span
                className="font-medium text-[#404751] text-[12px] leading-[16px] font-['Space_Grotesk']"
                data-node-id="299:1822"
              >
                mmHg
              </span>
            </div>
            <div
              className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full pt-[2px]"
              data-node-id="299:1823"
            >
              <div className="h-[6px] relative shrink-0 w-[10px]" data-node-id="299:1824">
                <Image
                  src="/assets/medical-info/trend-down.svg"
                  alt=""
                  width={10}
                  height={6}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
              <span
                className="font-normal text-[11px] text-[#727272] whitespace-nowrap leading-normal font-sans"
                data-node-id="299:1826"
              >
                Normal Controlled
              </span>
            </div>
          </div>

          {/* Connected Device */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start pb-[22px] pt-[14px] px-[14px] relative rounded-[8px]"
            data-node-id="299:1827"
            data-name="Background+Border"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:1829"
            >
              CONNECTED DEVICE
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans truncate"
              data-node-id="299:1831"
            >
              Omron Evolv BP7000
            </span>
            <div
              className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full pt-[2px]"
              data-node-id="299:1832"
            >
              <div className="h-[10px] relative shrink-0 w-[8.5px]" data-node-id="299:1833">
                <Image
                  src="/assets/medical-info/bluetooth-sync.svg"
                  alt=""
                  width={9}
                  height={10}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
              <span
                className="font-normal text-[11px] text-[#41474f] whitespace-nowrap leading-normal font-sans"
                data-node-id="299:1835"
              >
                Auto-sync active
              </span>
            </div>
          </div>

          {/* Assigned Therapy */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start pb-[22px] pt-[14px] px-[14px] relative rounded-[8px]"
            data-node-id="299:1836"
            data-name="Background+Border"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:1838"
            >
              ASSIGNED THERAPY
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans truncate"
              data-node-id="299:1840"
            >
              Lisinopril 10mg
            </span>
            <div
              className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full pt-[2px]"
              data-node-id="299:1841"
            >
              <div className="relative shrink-0 size-[10px]" data-node-id="299:1842">
                <Image
                  src="/assets/medical-info/time-clock.svg"
                  alt=""
                  width={10}
                  height={10}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
              <span
                className="font-normal text-[11px] text-[#41474f] whitespace-nowrap leading-normal font-sans"
                data-node-id="299:1844"
              >
                1 tablet daily (Morning)
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Note & Metadata Row */}
        <div
          className="content-stretch flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-[8px] relative shrink-0 w-full border-t border-[rgba(191,199,211,0.2)]"
          data-node-id="299:1845"
          data-name="Container"
        >
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-node-id="299:1846">
            <div className="h-[10.67px] relative shrink-0 w-[13.33px]" data-node-id="299:1847">
              <Image
                src="/assets/medical-info/device-tablet.svg"
                alt=""
                width={13}
                height={11}
                unoptimized
                className="absolute block inset-0 max-w-none size-full"
              />
            </div>
            <span
              className="font-normal text-[12px] text-[#41474f] whitespace-nowrap leading-normal font-sans"
              data-node-id="299:1849"
            >
              Monitored via Connected Omron Device Ecosystem
            </span>
          </div>
          <span
            className="font-normal text-[12px] text-[#078bde] whitespace-nowrap leading-normal font-sans"
            data-node-id="299:1851"
          >
            Last reading recorded: Today at 08:30 AM
          </span>
        </div>
      </div>

      {/* Card 2: Asthma (Mild Intermittent) matching Figma Node 299:1853 */}
      <div
        className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[20px] items-start overflow-hidden p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
        data-node-id="299:1853"
        data-name="Asthma record"
      >
        {/* Top Accent Strip */}
        <div
          className="absolute bg-[#02307d] h-[4px] left-0 right-0 top-0"
          data-node-id="299:1900"
          data-name="Background"
        />

        {/* Record Header */}
        <div
          className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-start justify-between pb-[16px] relative shrink-0 w-full"
          data-node-id="299:1854"
          data-name="HorizontalBorder"
        >
          <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-node-id="299:1855">
            <div
              className="bg-[#dae2ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]"
              data-node-id="299:1856"
              data-name="Background"
            >
              <div className="h-[19px] relative shrink-0 w-[20px]" data-node-id="299:1857">
                <Image
                  src="/assets/medical-info/lungs.svg"
                  alt=""
                  width={20}
                  height={19}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative" data-node-id="299:1859">
              <div className="content-stretch flex flex-wrap gap-[12px] items-center relative" data-node-id="299:1860">
                <h3
                  className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal font-sans"
                  data-node-id="299:1862"
                >
                  Asthma (Mild Intermittent)
                </h3>
                <div
                  className="bg-[#e9edff] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[12px] shrink-0"
                  data-node-id="299:1863"
                  data-name="Background"
                >
                  <div
                    className="bg-[#707883] relative rounded-full shrink-0 size-[6px]"
                    data-node-id="299:1864"
                  />
                  <span
                    className="font-medium text-[#41474f] text-[12px] whitespace-nowrap leading-normal font-sans"
                    data-node-id="299:1865"
                  >
                    Seasonal Trigger
                  </span>
                </div>
              </div>
              <p
                className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
                data-node-id="299:1867"
              >
                <span>Verified through: </span>
                <span className="font-semibold text-[#01091e]">Spirometry Test</span>
                <span> • Al-Borg Diagnostic Center</span>
              </p>
            </div>
          </div>

          {/* Action Buttons: Edit & History */}
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="299:1868">
            <button
              type="button"
              onClick={() => onEditClick?.("Asthma (Mild Intermittent)")}
              className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="299:1869"
              data-name="Button - Edit"
              title="Edit Condition"
            >
              <div className="relative shrink-0 size-[13.5px]" data-node-id="299:1870">
                <Image
                  src="/assets/medical-info/pencil-edit.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </button>
            <button
              type="button"
              onClick={() => onHistoryClick?.("Asthma (Mild Intermittent)")}
              className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="299:1872"
              data-name="Button - History"
              title="View History"
            >
              <div className="relative shrink-0 size-[13.5px]" data-node-id="299:1873">
                <Image
                  src="/assets/medical-info/clock-history.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Asthma Details & Action Plan (2 Columns) */}
        <div
          className="content-stretch grid grid-cols-1 md:grid-cols-2 gap-[16px] items-start justify-center relative shrink-0 w-full"
          data-node-id="299:1875"
          data-name="Asthma Details & Action Plan"
        >
          {/* Identified Triggers */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[8px] items-start pb-[26px] pt-[14px] px-[14px] relative rounded-[8px]"
            data-node-id="299:1876"
            data-name="Background+Border"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:1878"
            >
              IDENTIFIED TRIGGERS
            </span>
            <div
              className="content-stretch flex flex-wrap gap-[6px] items-start relative shrink-0 w-full"
              data-node-id="299:1879"
            >
              <div
                className="bg-white border border-[#bfc7d3] border-solid content-stretch flex flex-col items-start px-[10px] py-[2px] relative rounded-[6px] shrink-0"
                data-node-id="299:1880"
              >
                <span className="font-normal text-[12px] text-[#01091e] whitespace-nowrap leading-normal font-sans">
                  Cold Weather
                </span>
              </div>
              <div
                className="bg-white border border-[#bfc7d3] border-solid content-stretch flex flex-col items-start px-[10px] py-[2px] relative rounded-[6px] shrink-0"
                data-node-id="299:1882"
              >
                <span className="font-normal text-[12px] text-[#01091e] whitespace-nowrap leading-normal font-sans">
                  Dust & Pollen
                </span>
              </div>
              <div
                className="bg-white border border-[#bfc7d3] border-solid content-stretch flex flex-col items-start px-[10px] py-[2px] relative rounded-[6px] shrink-0"
                data-node-id="299:1884"
              >
                <span className="font-normal text-[12px] text-[#01091e] whitespace-nowrap leading-normal font-sans">
                  Vigorous Cardio
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Protocol & Relief */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[2px] items-start p-[14px] relative rounded-[8px]"
            data-node-id="299:1886"
            data-name="Background+Border"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:1888"
            >
              EMERGENCY PROTOCOL & RELIEF
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full pt-[2px] leading-normal font-sans"
              data-node-id="299:1890"
            >
              Ventolin Inhaler (100mcg)
            </span>
            <p
              className="font-normal text-[12px] text-[#41474f] w-full leading-normal font-sans"
              data-node-id="299:1892"
            >
              2 puffs as needed for wheezing or prior to heavy exercise.
            </p>
          </div>
        </div>

        {/* Bottom Note & Metadata Row */}
        <div
          className="content-stretch flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-[8px] relative shrink-0 w-full border-t border-[rgba(191,199,211,0.2)]"
          data-node-id="299:1893"
          data-name="Container"
        >
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-node-id="299:1894">
            <div className="h-[13.33px] relative shrink-0 w-[10.67px]" data-node-id="299:1895">
              <Image
                src="/assets/medical-info/shield-verify.svg"
                alt=""
                width={11}
                height={13}
                unoptimized
                className="absolute block inset-0 max-w-none size-full"
              />
            </div>
            <span
              className="font-normal text-[12px] text-[#41474f] whitespace-nowrap leading-normal font-sans"
              data-node-id="299:1897"
            >
              Verified with Ministry of Health National Respiratory Registry
            </span>
          </div>
          <span
            className="font-normal text-[12px] text-[#078bde] whitespace-nowrap leading-normal font-sans"
            data-node-id="299:1899"
          >
            Last consultation: Nov 2024
          </span>
        </div>
      </div>

      {/* Follow-up Information Segment (2 Columns) matching Figma Node 299:1901 */}
      <div
        className="content-stretch grid grid-cols-1 md:grid-cols-2 gap-[16px] items-start overflow-hidden relative shrink-0 w-full"
        data-node-id="299:1901"
        data-name="Follow-up information"
      >
        {/* Hypertension Follow-up Box */}
        <div
          className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[5px] items-start overflow-hidden p-[14px] relative rounded-[8px]"
          data-node-id="299:1902"
          data-name="Medical detail"
        >
          <span
            className="font-normal text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
            data-node-id="299:1903"
          >
            HYPERTENSION FOLLOW-UP
          </span>
          <span
            className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
            data-node-id="299:1904"
          >
            Mild • Routine monitoring
          </span>
          <p
            className="font-normal text-[12px] text-[#41474f] w-full leading-[1.3] font-sans"
            data-node-id="299:1905"
          >
            Continue daily morning readings. Review with Dr. Sherif Mansour in 3 months.
          </p>
        </div>

        {/* Asthma Follow-up Box */}
        <div
          className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[5px] items-start overflow-hidden p-[14px] relative rounded-[8px]"
          data-node-id="299:1906"
          data-name="Medical detail"
        >
          <span
            className="font-normal text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
            data-node-id="299:1907"
          >
            ASTHMA FOLLOW-UP
          </span>
          <span
            className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
            data-node-id="299:1908"
          >
            Mild intermittent • Stable
          </span>
          <p
            className="font-normal text-[12px] text-[#41474f] w-full leading-[1.3] font-sans"
            data-node-id="299:1909"
          >
            Diagnosed Nov 2024. Review inhaler technique and symptom control in 6 months.
          </p>
        </div>
      </div>
    </div>
  );
}

interface AllergiesPanelProps {
  readonly allergies?: UIPatientProfile["allergyMenu"];
  readonly onAddClick: () => void;
  readonly onEditClick?: (allergyName: string) => void;
  readonly onHistoryClick?: (allergyName: string) => void;
}

export function AllergiesPanel({
  allergies,
  onAddClick,
  onEditClick,
  onHistoryClick,
}: AllergiesPanelProps) {
  const list = allergies ?? [];
  const displayCount = Math.max(list.length, 2);

  // Check for custom non-default items added by user
  const customItems = list.filter(
    (item) => item.name && item.name !== "Penicillin" && item.name !== "Dust Mites"
  );

  return (
    <div
      className="content-stretch flex flex-col gap-[24px] items-start relative size-full text-left"
      data-node-id="299:2531"
      data-name="Category details"
      style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
    >
      {/* Category Header matching Figma Node 299:2532 */}
      <div
        className="content-stretch flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden relative shrink-0 w-full"
        data-node-id="299:2532"
        data-name="Category header"
      >
        <div
          className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-hidden relative"
          data-node-id="299:2533"
          data-name="Category introduction"
        >
          <div
            className="content-stretch flex gap-[8px] items-center overflow-hidden relative shrink-0"
            data-node-id="299:2534"
            data-name="Category title"
          >
            <h2
              className="font-bold text-[22px] text-[#01091e] leading-normal font-sans"
              data-node-id="299:2535"
            >
              Allergies
            </h2>
            <div
              className="bg-[#e2eff6] content-stretch flex items-start overflow-hidden px-[10px] py-[2px] relative rounded-[12px] shrink-0"
              data-node-id="299:2536"
              data-name="Record count"
            >
              <span
                className="font-semibold text-[#078bde] text-[12px] whitespace-nowrap leading-normal font-sans"
                data-node-id="299:2537"
              >
                {displayCount} Logged
              </span>
            </div>
          </div>
          <p
            className="font-normal text-[13px] text-[#41474f] leading-normal font-sans"
            data-node-id="299:2538"
          >
            Documented allergens, reaction history, and emergency precautions.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddClick}
          className="border border-[#bfc7d3] border-solid content-stretch flex gap-[6px] items-center overflow-hidden px-[12px] py-[6px] relative rounded-[4px] shrink-0 bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          data-node-id="299:2539"
          data-name="Category action"
        >
          <div className="relative shrink-0 size-[12px]" data-node-id="299:2540" data-name="plus">
            <Image
              src="/assets/medical-info/plus-black.svg"
              alt=""
              width={12}
              height={12}
              unoptimized
              className="absolute block inset-0 max-w-none size-full"
            />
          </div>
          <span
            className="font-bold text-[13px] text-[#01091e] whitespace-nowrap leading-normal font-sans"
            data-node-id="299:2542"
          >
            Add Allergy
          </span>
        </button>
      </div>

      {/* Card 1: Penicillin matching Figma Node 299:2543 */}
      <div
        className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[20px] items-start overflow-hidden p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
        data-node-id="299:2543"
        data-name="Clinical record"
      >
        {/* Top Accent Strip */}
        <div
          className="absolute bg-[#078bde] h-[4px] left-0 right-0 top-0"
          data-node-id="299:2576"
          data-name="Card accent"
        />

        {/* Record Heading */}
        <div
          className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-start justify-between pb-[16px] relative shrink-0 w-full"
          data-node-id="299:2544"
          data-name="Record heading"
        >
          <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-node-id="299:2547">
            <div
              className="bg-[rgba(255,218,214,0.3)] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]"
              data-node-id="299:2545"
              data-name="Category icon"
            >
              <div className="relative shrink-0 size-[14px]" data-node-id="299:2546">
                <Image
                  src="/assets/medical-info/subcat-allergy.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative" data-node-id="299:2548">
              <div className="content-stretch flex flex-wrap gap-[12px] items-center relative">
                <h3
                  className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal font-sans"
                  data-node-id="299:2549"
                >
                  Penicillin
                </h3>
                <div
                  className="bg-[#ffe8e6] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[12px] shrink-0"
                  data-node-id="299:2550"
                  data-name="Status"
                >
                  <div
                    className="bg-[#ba1a1a] relative rounded-full shrink-0 size-[6px]"
                  />
                  <span
                    className="font-medium text-[#ba1a1a] text-[12px] whitespace-nowrap leading-normal font-sans"
                    data-node-id="299:2551"
                  >
                    Severe anaphylaxis
                  </span>
                </div>
              </div>
              <p
                className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
                data-node-id="299:2552"
              >
                Drug allergy • Confirmed in clinical record
              </p>
            </div>
          </div>

          {/* Action Buttons: Edit & History */}
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <button
              type="button"
              onClick={() => onEditClick?.("Penicillin")}
              className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="299:2553"
              data-name="Edit record"
              title="Edit Allergy"
            >
              <div className="relative shrink-0 size-[13.5px]">
                <Image
                  src="/assets/medical-info/pencil-edit.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </button>
            <button
              type="button"
              onClick={() => onHistoryClick?.("Penicillin")}
              className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="299:2554"
              data-name="Record history"
              title="View History"
            >
              <div className="relative shrink-0 size-[13.5px]">
                <Image
                  src="/assets/medical-info/clock-history.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Allergy Details Grid (2 Columns) matching Node 299:2555 */}
        <div
          className="content-stretch grid grid-cols-1 md:grid-cols-2 gap-[16px] items-start justify-center relative shrink-0 w-full"
          data-node-id="299:2555"
          data-name="Allergy details"
        >
          {/* Reaction Type Box */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]"
            data-node-id="299:2556"
            data-name="Medical detail"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:2557"
            >
              REACTION TYPE
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
              data-node-id="299:2558"
            >
              Anaphylaxis
            </span>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans pt-[2px]"
              data-node-id="299:2559"
            >
              Breathing difficulty, swelling and hives.
            </span>
          </div>

          {/* Severity Box */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]"
            data-node-id="299:2560"
            data-name="Medical detail"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:2561"
            >
              SEVERITY
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
              data-node-id="299:2562"
            >
              Severe • Life-threatening
            </span>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans pt-[2px]"
              data-node-id="299:2563"
            >
              Avoid penicillin and penicillin-class antibiotics.
            </span>
          </div>
        </div>

        {/* Emergency Warning Callout matching Node 299:2564 */}
        <div
          className="bg-[#fff1f0] border border-[#ffccc7] border-solid content-stretch flex gap-[12px] items-start p-[14px] relative rounded-[8px] shrink-0 w-full"
          data-node-id="299:2564"
          data-name="Emergency warning"
        >
          <div className="relative shrink-0 size-[18px] mt-[1px]" data-node-id="299:2565">
            <Image
              src="/assets/medical-info/triangle-alert.svg"
              alt=""
              width={18}
              height={18}
              unoptimized
              className="absolute block inset-0 max-w-none size-full"
            />
          </div>
          <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full" data-node-id="299:2567">
            <h4
              className="font-bold text-[13px] text-[#cf1322] leading-normal font-sans"
              data-node-id="299:2568"
            >
              EMERGENCY WARNING — Do not administer penicillin
            </h4>
            <p
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
              data-node-id="299:2569"
            >
              Tell every treating clinician about this allergy. For breathing difficulty or throat swelling, seek emergency medical care immediately.
            </p>
          </div>
        </div>

        {/* Card Footer matching Node 299:2570 */}
        <div
          className="border-[rgba(191,199,211,0.3)] border-t border-solid content-stretch flex flex-wrap items-center justify-between pt-[12px] relative shrink-0 w-full gap-2"
          data-node-id="299:2570"
          data-name="Record footer"
        >
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-node-id="299:2571">
            <div className="relative shrink-0 size-[13px]" data-node-id="299:2572">
              <Image
                src="/assets/medical-info/shield-verify.svg"
                alt=""
                width={13}
                height={13}
                unoptimized
                className="absolute block inset-0 max-w-none size-full"
              />
            </div>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
              data-node-id="299:2574"
            >
              Allergy documented in patient record
            </span>
          </div>
          <span
            className="font-medium text-[12px] text-[#078bde] leading-normal font-sans"
            data-node-id="299:2575"
          >
            Status: Active
          </span>
        </div>
      </div>

      {/* Card 2: Dust Mites matching Figma Node 299:2577 */}
      <div
        className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[20px] items-start overflow-hidden p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
        data-node-id="299:2577"
        data-name="Clinical record"
      >
        {/* Top Accent Strip */}
        <div
          className="absolute bg-[#078bde] h-[4px] left-0 right-0 top-0"
          data-node-id="299:2606"
          data-name="Card accent"
        />

        {/* Record Heading */}
        <div
          className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-start justify-between pb-[16px] relative shrink-0 w-full"
          data-node-id="299:2578"
          data-name="Record heading"
        >
          <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-node-id="299:2582">
            <div
              className="bg-[#d0e4ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]"
              data-node-id="299:2579"
              data-name="Category icon"
            >
              <div className="relative shrink-0 size-[20px]" data-node-id="299:2580">
                <Image
                  src="/assets/medical-info/wind.svg"
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative" data-node-id="299:2583">
              <div className="content-stretch flex flex-wrap gap-[12px] items-center relative">
                <h3
                  className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal font-sans"
                  data-node-id="299:2584"
                >
                  Dust Mites
                </h3>
                <div
                  className="bg-[#b3ebff] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[12px] shrink-0"
                  data-node-id="299:2585"
                  data-name="Status"
                >
                  <div
                    className="bg-[#00657a] relative rounded-full shrink-0 size-[6px]"
                  />
                  <span
                    className="font-medium text-[#00657a] text-[12px] whitespace-nowrap leading-normal font-sans"
                    data-node-id="299:2586"
                  >
                    Mild respiratory
                  </span>
                </div>
              </div>
              <p
                className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
                data-node-id="299:2587"
              >
                Environmental allergy • Associated with intermittent asthma
              </p>
            </div>
          </div>

          {/* Action Buttons: Edit & History */}
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <button
              type="button"
              onClick={() => onEditClick?.("Dust Mites")}
              className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="299:2588"
              data-name="Edit record"
              title="Edit Allergy"
            >
              <div className="relative shrink-0 size-[13.5px]">
                <Image
                  src="/assets/medical-info/pencil-edit.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </button>
            <button
              type="button"
              onClick={() => onHistoryClick?.("Dust Mites")}
              className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="299:2589"
              data-name="Record history"
              title="View History"
            >
              <div className="relative shrink-0 size-[13.5px]">
                <Image
                  src="/assets/medical-info/clock-history.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Allergy Details Grid (2 Columns) matching Node 299:2590 */}
        <div
          className="content-stretch grid grid-cols-1 md:grid-cols-2 gap-[16px] items-start justify-center relative shrink-0 w-full"
          data-node-id="299:2590"
          data-name="Allergy details"
        >
          {/* Reaction Type Box */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]"
            data-node-id="299:2591"
            data-name="Medical detail"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:2592"
            >
              REACTION TYPE
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
              data-node-id="299:2593"
            >
              Sneezing &amp; respiratory irritation
            </span>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans pt-[2px]"
              data-node-id="299:2594"
            >
              May trigger wheezing with dust exposure.
            </span>
          </div>

          {/* Precautions Box */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]"
            data-node-id="299:2595"
            data-name="Medical detail"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:2596"
            >
              PRECAUTIONS
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
              data-node-id="299:2597"
            >
              Reduce dust exposure
            </span>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans pt-[2px]"
              data-node-id="299:2598"
            >
              Use allergen-proof bedding; follow the existing asthma relief plan.
            </span>
          </div>
        </div>

        {/* Escalation Guidance matching Node 299:2599 */}
        <p
          className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
          data-node-id="299:2599"
        >
          Seek urgent care for severe wheezing or breathing difficulty not relieved by the prescribed inhaler.
        </p>

        {/* Card Footer matching Node 299:2600 */}
        <div
          className="border-[rgba(191,199,211,0.3)] border-t border-solid content-stretch flex flex-wrap items-center justify-between pt-[12px] relative shrink-0 w-full gap-2"
          data-node-id="299:2600"
          data-name="Record footer"
        >
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-node-id="299:2601">
            <div className="relative shrink-0 size-[13px]" data-node-id="299:2602">
              <Image
                src="/assets/medical-info/shield-verify.svg"
                alt=""
                width={13}
                height={13}
                unoptimized
                className="absolute block inset-0 max-w-none size-full"
              />
            </div>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
              data-node-id="299:2604"
            >
              Recorded with respiratory care history
            </span>
          </div>
          <span
            className="font-medium text-[12px] text-[#078bde] leading-normal font-sans"
            data-node-id="299:2605"
          >
            Status: Active
          </span>
        </div>
      </div>

      {/* Dynamic Additional Items */}
      {customItems.map((item) => (
        <div
          key={item.id || item.name}
          className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[20px] items-start overflow-hidden p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
        >
          <div className="absolute bg-[#078bde] h-[4px] left-0 right-0 top-0" />
          <div className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-start justify-between pb-[16px] relative shrink-0 w-full">
            <div className="content-stretch flex gap-[14px] items-start relative shrink-0">
              <div className="bg-[rgba(255,218,214,0.3)] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
                <div className="relative shrink-0 size-[14px]">
                  <Image
                    src="/assets/medical-info/subcat-allergy.svg"
                    alt=""
                    width={14}
                    height={14}
                    unoptimized
                    className="absolute block inset-0 max-w-none size-full"
                  />
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] items-start relative">
                <div className="content-stretch flex flex-wrap gap-[12px] items-center relative">
                  <h3 className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal font-sans">
                    {item.name}
                  </h3>
                  <div className="bg-[#ffe8e6] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[12px] shrink-0">
                    <div className="bg-[#ba1a1a] relative rounded-full shrink-0 size-[6px]" />
                    <span className="font-medium text-[#ba1a1a] text-[12px] whitespace-nowrap leading-normal font-sans">
                      {item.severity || "Documented"}
                    </span>
                  </div>
                </div>
                <p className="font-normal text-[12px] text-[#41474f] leading-normal font-sans">
                  Clinical allergy record • {item.date || "Active"}
                </p>
              </div>
            </div>
          </div>

          <div className="content-stretch grid grid-cols-1 md:grid-cols-2 gap-[16px] items-start justify-center relative shrink-0 w-full">
            <div className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]">
              <span className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider">
                REACTION TYPE
              </span>
              <span className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans">
                {item.reactionType || "Documented sensitivity"}
              </span>
            </div>
            <div className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]">
              <span className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider">
                PRECAUTIONS
              </span>
              <span className="font-normal text-[12px] text-[#41474f] leading-normal font-sans">
                {item.precautions || "Strict avoidance recommended"}
              </span>
            </div>
          </div>

          <div className="border-[rgba(191,199,211,0.3)] border-t border-solid content-stretch flex flex-wrap items-center justify-between pt-[12px] relative shrink-0 w-full gap-2">
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[13px]">
                <Image
                  src="/assets/medical-info/shield-verify.svg"
                  alt=""
                  width={13}
                  height={13}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
              <span className="font-normal text-[12px] text-[#41474f] leading-normal font-sans">
                Allergy documented in patient record
              </span>
            </div>
            <span className="font-medium text-[12px] text-[#078bde] leading-normal font-sans">
              Status: Active
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

interface MedicationsPanelProps {
  readonly medications?: UIPatientProfile["currentMedications"];
  readonly onAddClick: () => void;
  readonly onEditClick?: (medicationName: string) => void;
  readonly onHistoryClick?: (medicationName: string) => void;
}

export function MedicationsPanel({
  medications,
  onAddClick,
  onEditClick,
}: MedicationsPanelProps) {
  const list = medications ?? [];
  const displayCount = Math.max(list.length, 2);

  const customItems = list.filter(
    (item) => item.name && item.name !== "Lisinopril" && item.name !== "Ventolin Inhaler"
  );

  return (
    <div
      className="content-stretch flex flex-col gap-[24px] items-start relative size-full text-left"
      data-node-id="567:2348"
      data-name="Section - MedicationsContentArea"
      style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
    >
      {/* Section Header matching Figma Node 567:2349 */}
      <div
        className="content-stretch flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden relative shrink-0 w-full"
        data-node-id="567:2349"
        data-name="Header of Section with Actions"
      >
        <div
          className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-hidden relative"
          data-node-id="567:2350"
          data-name="Container"
        >
          <div
            className="content-stretch flex gap-[8px] items-center overflow-hidden relative shrink-0"
            data-node-id="567:2351"
            data-name="Container"
          >
            <h2
              className="font-bold text-[22px] text-[#01091e] leading-normal font-sans"
              data-node-id="567:2353"
            >
              Current Medications
            </h2>
            <div
              className="bg-[#e2eff6] content-stretch flex items-start overflow-hidden px-[10px] py-[2px] relative rounded-[12px] shrink-0"
              data-node-id="567:2354"
              data-name="Overlay"
            >
              <span
                className="font-semibold text-[#078bde] text-[12px] whitespace-nowrap leading-normal font-sans"
                data-node-id="567:2355"
              >
                {displayCount} Active
              </span>
            </div>
          </div>
          <p
            className="font-normal text-[13px] text-[#41474f] leading-normal font-sans"
            data-node-id="567:2357"
          >
            Current prescriptions, dosage schedules, automated dispensing telemetry, and administration instructions.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddClick}
          className="border border-[#bfc7d3] border-solid content-stretch flex gap-[6px] items-center overflow-hidden px-[12px] py-[6px] relative rounded-[4px] shrink-0 bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          data-node-id="567:2358"
          data-name="Button"
        >
          <div className="relative shrink-0 size-[12px]" data-node-id="567:2359" data-name="SVG">
            <Image
              src="/assets/medical-info/plus-black.svg"
              alt=""
              width={12}
              height={12}
              unoptimized
              className="absolute block inset-0 max-w-none size-full"
            />
          </div>
          <span
            className="font-bold text-[13px] text-[#01091e] whitespace-nowrap leading-normal font-sans"
            data-node-id="567:2361"
          >
            Add Medication
          </span>
        </button>
      </div>

      {/* Card 1: Lisinopril matching Figma Node 567:2362 */}
      <div
        className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
        data-node-id="567:2362"
        data-name="Article - MEDICATION CARD 1: Lisinopril (Long-Term Maintenance)"
      >
        {/* Card Header matching Node 567:2364 */}
        <div
          className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-start justify-between pb-[16px] relative shrink-0 w-full"
          data-node-id="567:2364"
          data-name="Card Header"
        >
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="567:2365">
            <div
              className="bg-[#dae2ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]"
              data-node-id="567:2367"
              data-name="Category icon"
            >
              <div className="relative shrink-0 size-[15px]" data-node-id="567:2368">
                <Image
                  src="/assets/medical-info/subcat-medication.svg"
                  alt=""
                  width={15}
                  height={15}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[3px] items-start relative" data-node-id="567:2369">
              <div className="content-stretch flex flex-wrap gap-[10px] items-center relative" data-node-id="567:2370">
                <h3
                  className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal font-sans"
                  data-node-id="567:2372"
                >
                  Lisinopril
                </h3>
                <div
                  className="bg-[#e2eff6] content-stretch flex gap-[6px] items-center px-[10px] py-[2px] relative rounded-[12px] shrink-0"
                  data-node-id="567:2373"
                  data-name="Long-Term Maintenance Indicator"
                >
                  <div
                    className="bg-[#00609b] relative rounded-full shrink-0 size-[6px]"
                    data-node-id="567:2374"
                  />
                  <span
                    className="font-medium text-[#00609b] text-[12px] whitespace-nowrap leading-normal font-sans"
                    data-node-id="567:2375"
                  >
                    Active prescription • Long-Term Maintenance
                  </span>
                </div>
              </div>
              <p
                className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
                data-node-id="567:2377"
              >
                Mild hypertension • Oral medication
              </p>
            </div>
          </div>

          {/* Action Button: Edit */}
          <button
            type="button"
            onClick={() => onEditClick?.("Lisinopril")}
            className="content-stretch flex flex-col items-center justify-center p-[6px] relative rounded-[4px] shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
            data-node-id="567:2379"
            data-name="Button - Edit prescription"
            title="Edit Prescription"
          >
            <div className="relative shrink-0 size-[14px]" data-node-id="567:2380">
              <Image
                src="/assets/medical-info/pencil-edit.svg"
                alt=""
                width={14}
                height={14}
                unoptimized
                className="absolute block inset-0 max-w-none size-full"
              />
            </div>
          </button>
        </div>

        {/* Dosage and Frequency Grid (2 Columns) matching Node 567:2382 */}
        <div
          className="content-stretch grid grid-cols-1 md:grid-cols-2 gap-[14px] items-start justify-center relative shrink-0 w-full"
          data-node-id="567:2382"
          data-name="Dosage and Frequency Grid"
        >
          {/* Prescribed Dosage Box */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[3px] items-start p-[13px] relative rounded-[8px]"
            data-node-id="567:2383"
            data-name="Background+Border"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="567:2385"
            >
              PRESCRIBED DOSAGE
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
              data-node-id="567:2387"
            >
              10 mg tablet
            </span>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
              data-node-id="567:2389"
            >
              1 tablet per dose
            </span>
          </div>

          {/* Frequency Box */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[3px] items-start p-[13px] relative rounded-[8px]"
            data-node-id="567:2390"
            data-name="Background+Border"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="567:2392"
            >
              FREQUENCY
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
              data-node-id="567:2394"
            >
              Once daily • Morning
            </span>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
              data-node-id="567:2396"
            >
              Daily maintenance therapy
            </span>
          </div>
        </div>

        {/* Administration Instructions Box matching Node 567:2397 */}
        <div
          className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[13px] relative rounded-[8px] shrink-0 w-full"
          data-node-id="567:2397"
          data-name="Administration Instructions Box"
        >
          <span
            className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
            data-node-id="567:2399"
          >
            ADMINISTRATION INSTRUCTIONS
          </span>
          <h4
            className="font-bold text-[13px] text-[#01091e] leading-normal font-sans"
            data-node-id="567:2401"
          >
            Take 1 tablet daily with a meal.
          </h4>
          <p
            className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
            data-node-id="567:2403"
          >
            Continue home blood pressure monitoring as recorded in the care plan.
          </p>
        </div>

        {/* Card Footer: Verification & Automated Dispensing Sync matching Node 567:2404 */}
        <div
          className="border-[rgba(191,199,211,0.3)] border-t border-solid content-stretch flex items-center justify-between pt-[12px] relative shrink-0 w-full gap-2"
          data-node-id="567:2404"
          data-name="Card Footer: Verification & Automated Dispensing Sync"
        >
          <div className="content-stretch flex items-center gap-[6px] relative min-w-0" data-node-id="567:2405">
            <div className="relative shrink-0 size-[13px]" data-node-id="567:2406">
              <Image
                src="/assets/medical-info/shield-verify.svg"
                alt=""
                width={13}
                height={13}
                unoptimized
                className="absolute block inset-0 max-w-none size-full"
              />
            </div>
            <p className="font-normal text-[12px] text-[#41474f] leading-normal font-sans truncate">
              <span>Assigned therapy: </span>
              <span className="font-semibold text-[#01091e]">Dr. Sherif Mansour</span>
              <span> • Dispensed: El-Ezaby Pharmacy (Synced)</span>
            </p>
          </div>
          <span
            className="font-medium text-[12px] text-[#078bde] leading-normal font-sans shrink-0"
            data-node-id="567:2415"
          >
            Prescription: Ongoing • Auto-Renewing
          </span>
        </div>
      </div>

      {/* Card 2: Ventolin Inhaler matching Figma Node 567:2416 */}
      <div
        className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
        data-node-id="567:2416"
        data-name="Article - MEDICATION CARD 2: Ventolin Inhaler (PRN / As-Needed Course)"
      >
        {/* Card Header */}
        <div
          className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-start justify-between pb-[16px] relative shrink-0 w-full"
          data-node-id="567:2418"
          data-name="Card Header"
        >
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="567:2419">
            <div
              className="bg-[#dae2ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]"
              data-node-id="567:2420"
              data-name="Category icon"
            >
              <div className="relative shrink-0 size-[15px]" data-node-id="567:2421">
                <Image
                  src="/assets/medical-info/subcat-medication.svg"
                  alt=""
                  width={15}
                  height={15}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[3px] items-start relative" data-node-id="567:2422">
              <div className="content-stretch flex flex-wrap gap-[10px] items-center relative" data-node-id="567:2423">
                <h3
                  className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal font-sans"
                  data-node-id="567:2425"
                >
                  Ventolin Inhaler
                </h3>
                <div
                  className="bg-[#e6f4ea] content-stretch flex gap-[6px] items-center px-[10px] py-[2px] relative rounded-[12px] shrink-0"
                  data-node-id="567:2426"
                  data-name="Overlay"
                >
                  <div
                    className="bg-[#137333] relative rounded-full shrink-0 size-[6px]"
                    data-node-id="567:2427"
                  />
                  <span
                    className="font-medium text-[#137333] text-[12px] whitespace-nowrap leading-normal font-sans"
                    data-node-id="567:2428"
                  >
                    Active • PRN (As Needed)
                  </span>
                </div>
              </div>
              <p
                className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
                data-node-id="567:2430"
              >
                Mild intermittent asthma • Inhaled salbutamol
              </p>
            </div>
          </div>

          {/* Action Button: Edit */}
          <button
            type="button"
            onClick={() => onEditClick?.("Ventolin Inhaler")}
            className="content-stretch flex flex-col items-center justify-center p-[6px] relative rounded-[4px] shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
            data-node-id="567:2432"
            data-name="Button"
            title="Edit Prescription"
          >
            <div className="relative shrink-0 size-[14px]">
              <Image
                src="/assets/medical-info/pencil-edit.svg"
                alt=""
                width={14}
                height={14}
                unoptimized
                className="absolute block inset-0 max-w-none size-full"
              />
            </div>
          </button>
        </div>

        {/* Dosage and Frequency Grid (2 Columns) */}
        <div
          className="content-stretch grid grid-cols-1 md:grid-cols-2 gap-[14px] items-start justify-center relative shrink-0 w-full"
          data-node-id="567:2436"
        >
          {/* Prescribed Dosage Box */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[3px] items-start p-[13px] relative rounded-[8px]"
            data-node-id="567:2437"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="567:2439"
            >
              PRESCRIBED DOSAGE
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
              data-node-id="567:2441"
            >
              100 mcg per puff
            </span>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
              data-node-id="567:2443"
            >
              2 puffs per dose
            </span>
          </div>

          {/* Frequency Box */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[3px] items-start p-[13px] relative rounded-[8px]"
            data-node-id="567:2444"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="567:2446"
            >
              FREQUENCY
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
              data-node-id="567:2448"
            >
              PRN • As needed
            </span>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
              data-node-id="567:2450"
            >
              Relief inhaler; not scheduled daily
            </span>
          </div>
        </div>

        {/* Administration Instructions Box */}
        <div
          className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[13px] relative rounded-[8px] shrink-0 w-full"
          data-node-id="567:2451"
        >
          <span
            className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
            data-node-id="567:2453"
          >
            ADMINISTRATION INSTRUCTIONS
          </span>
          <h4
            className="font-bold text-[13px] text-[#01091e] leading-normal font-sans"
            data-node-id="567:2455"
          >
            2 puffs as needed for wheezing or prior to heavy exercise.
          </h4>
          <p
            className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
            data-node-id="567:2457"
          >
            Follow the asthma action plan. Seek urgent care if breathing difficulty persists.
          </p>
        </div>

        {/* Card Footer */}
        <div
          className="border-[rgba(191,199,211,0.3)] border-t border-solid content-stretch flex items-center justify-between pt-[12px] relative shrink-0 w-full gap-4"
          data-node-id="567:2457"
          data-name="Card Footer: Verification & Automated Dispensing Sync"
        >
          <div className="content-stretch flex items-center gap-[6px] relative" data-node-id="567:2458">
            <div className="relative shrink-0 size-[13px]">
              <Image
                src="/assets/medical-info/shield-verify.svg"
                alt=""
                width={13}
                height={13}
                unoptimized
                className="absolute block inset-0 max-w-none size-full"
              />
            </div>
            <p className="font-normal text-[12px] text-[#41474f] leading-normal font-sans">
              <span>Verified through respiratory care record</span>
              <span className="mx-1 text-[#707883]">•</span>
              <span>Dispensed: Al-Borg Pharmacy Network</span>
            </p>
          </div>
          <span
            className="font-medium text-[12px] text-[#078bde] leading-normal font-sans shrink-0 whitespace-nowrap"
            data-node-id="567:2468"
          >
            Prescription: Ongoing (Active through Dec2026)
          </span>
        </div>
      </div>

      {/* Dynamic Additional Items */}
      {customItems.map((item) => (
        <div
          key={item.id || item.name}
          className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[16px] items-start p-[20px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
        >
          <div className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-start justify-between pb-[16px] relative shrink-0 w-full">
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
              <div className="bg-[#dae2ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
                <div className="relative shrink-0 size-[15px]">
                  <Image
                    src="/assets/medical-info/subcat-medication.svg"
                    alt=""
                    width={15}
                    height={15}
                    unoptimized
                    className="absolute block inset-0 max-w-none size-full"
                  />
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[3px] items-start relative">
                <div className="content-stretch flex flex-wrap gap-[10px] items-center relative">
                  <h3 className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal font-sans">
                    {item.name}
                  </h3>
                  <div className="bg-[#e2eff6] content-stretch flex gap-[6px] items-center px-[10px] py-[2px] relative rounded-[12px] shrink-0">
                    <div className="bg-[#00609b] relative rounded-full shrink-0 size-[6px]" />
                    <span className="font-medium text-[#00609b] text-[12px] whitespace-nowrap leading-normal font-sans">
                      {item.status || "Active"}
                    </span>
                  </div>
                </div>
                <p className="font-normal text-[12px] text-[#41474f] leading-normal font-sans">
                  Assigned by: {item.assignedBy || "Physician"} • Date: {item.date || "Recorded"}
                </p>
              </div>
            </div>
          </div>

          <div className="content-stretch grid grid-cols-1 md:grid-cols-2 gap-[14px] items-start justify-center relative shrink-0 w-full">
            <div className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[3px] items-start p-[13px] relative rounded-[8px]">
              <span className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider">
                PRESCRIBED DOSAGE
              </span>
              <span className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans">
                {item.dosage || "Standard Dose"}
              </span>
            </div>
            <div className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[3px] items-start p-[13px] relative rounded-[8px]">
              <span className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider">
                FREQUENCY
              </span>
              <span className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans">
                {item.frequency || "As prescribed"}
              </span>
            </div>
          </div>

          {item.instructions && (
            <div className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[13px] relative rounded-[8px] shrink-0 w-full">
              <span className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider">
                ADMINISTRATION INSTRUCTIONS
              </span>
              <p className="font-normal text-[12px] text-[#41474f] leading-normal font-sans">
                {item.instructions}
              </p>
            </div>
          )}

          <div className="border-[rgba(191,199,211,0.3)] border-t border-solid content-stretch flex flex-wrap items-center justify-between pt-[12px] relative shrink-0 w-full gap-2">
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[13px]">
                <Image
                  src="/assets/medical-info/shield-verify.svg"
                  alt=""
                  width={13}
                  height={13}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
              <span className="font-normal text-[12px] text-[#41474f] leading-normal font-sans">
                Verified through patient prescription registry
              </span>
            </div>
            <span className="font-medium text-[12px] text-[#078bde] leading-normal font-sans">
              Prescription: Active
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

interface SurgeriesPanelProps {
  readonly surgeries?: UIPatientProfile["previousSurgicalProcedures"];
  readonly onAddClick: () => void;
  readonly onEditClick?: (surgeryName: string) => void;
  readonly onHistoryClick?: (surgeryName: string) => void;
}

export function SurgeriesPanel({
  surgeries,
  onAddClick,
  onEditClick,
  onHistoryClick,
}: SurgeriesPanelProps) {
  const list = surgeries ?? [];
  const displayCount = Math.max(list.length, 1);

  const customItems = list.filter(
    (item) => item.name && !item.name.includes("Appendectomy")
  );

  return (
    <div
      className="content-stretch flex flex-col gap-[24px] items-start relative size-full text-left"
      data-node-id="299:3141"
      data-name="Category details"
      style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
    >
      {/* Category Header matching Figma Node 299:3142 */}
      <div
        className="content-stretch flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden relative shrink-0 w-full"
        data-node-id="299:3142"
        data-name="Category header"
      >
        <div
          className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-hidden relative"
          data-node-id="299:3143"
          data-name="Category introduction"
        >
          <div
            className="content-stretch flex gap-[8px] items-center overflow-hidden relative shrink-0"
            data-node-id="299:3144"
            data-name="Category title"
          >
            <h2
              className="font-bold text-[22px] text-[#01091e] leading-normal font-sans"
              data-node-id="299:3145"
            >
              Previous Surgeries
            </h2>
            <div
              className="bg-[#e2eff6] content-stretch flex items-start overflow-hidden px-[10px] py-[2px] relative rounded-[12px] shrink-0"
              data-node-id="299:3146"
              data-name="Record count"
            >
              <span
                className="font-semibold text-[#078bde] text-[12px] whitespace-nowrap leading-normal font-sans"
                data-node-id="299:3147"
              >
                {displayCount} Recorded
              </span>
            </div>
          </div>
          <p
            className="font-normal text-[13px] text-[#41474f] leading-normal font-sans"
            data-node-id="299:3148"
          >
            Surgical history, treating facilities, and documented recovery information.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddClick}
          className="border border-[#bfc7d3] border-solid content-stretch flex gap-[6px] items-center overflow-hidden px-[12px] py-[6px] relative rounded-[4px] shrink-0 bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          data-node-id="299:3149"
          data-name="Category action"
        >
          <div className="relative shrink-0 size-[12px]" data-node-id="299:3150" data-name="plus">
            <Image
              src="/assets/medical-info/plus-black.svg"
              alt=""
              width={12}
              height={12}
              unoptimized
              className="absolute block inset-0 max-w-none size-full"
            />
          </div>
          <span
            className="font-bold text-[13px] text-[#01091e] whitespace-nowrap leading-normal font-sans"
            data-node-id="299:3152"
          >
            Add Surgery
          </span>
        </button>
      </div>

      {/* Card 1: Appendectomy matching Figma Node 299:3153 */}
      <div
        className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[20px] items-start overflow-hidden p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
        data-node-id="299:3153"
        data-name="Clinical record"
      >
        {/* Top Accent Strip */}
        <div
          className="absolute bg-[#078bde] h-[4px] left-0 right-0 top-0"
          data-node-id="299:3193"
          data-name="Card accent"
        />

        {/* Record Heading matching Node 299:3154 */}
        <div
          className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-start justify-between pb-[16px] relative shrink-0 w-full"
          data-node-id="299:3154"
          data-name="Record heading"
        >
          <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-node-id="299:3157">
            <div
              className="bg-[#d0e4ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]"
              data-node-id="299:3155"
              data-name="Category icon"
            >
              <div className="relative shrink-0 size-[16px]" data-node-id="299:3156">
                <Image
                  src="/assets/medical-info/subcat-surgery.svg"
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative" data-node-id="299:3158">
              <div className="content-stretch flex flex-wrap gap-[12px] items-center relative">
                <h3
                  className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal font-sans"
                  data-node-id="299:3159"
                >
                  Appendectomy
                </h3>
                <div
                  className="bg-[#b3ebff] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[12px] shrink-0"
                  data-node-id="299:3160"
                  data-name="Status"
                >
                  <div
                    className="bg-[#00657a] relative rounded-full shrink-0 size-[6px]"
                  />
                  <span
                    className="font-medium text-[#00657a] text-[12px] whitespace-nowrap leading-normal font-sans"
                    data-node-id="299:3161"
                  >
                    Fully recovered
                  </span>
                </div>
              </div>
              <p
                className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
                data-node-id="299:3162"
              >
                Procedure date: 18 Jun 2018 • Laparoscopic surgery
              </p>
            </div>
          </div>

          {/* Action Buttons: Edit & History */}
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <button
              type="button"
              onClick={() => onEditClick?.("Appendectomy")}
              className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="299:3163"
              data-name="Edit record"
              title="Edit Surgery"
            >
              <div className="relative shrink-0 size-[13.5px]">
                <Image
                  src="/assets/medical-info/pencil-edit.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </button>
            <button
              type="button"
              onClick={() => onHistoryClick?.("Appendectomy")}
              className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="299:3164"
              data-name="Record history"
              title="View History"
            >
              <div className="relative shrink-0 size-[13.5px]">
                <Image
                  src="/assets/medical-info/clock-history.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Surgical Team Grid (2 Columns) matching Node 299:3165 */}
        <div
          className="content-stretch grid grid-cols-1 md:grid-cols-2 gap-[16px] items-start justify-center relative shrink-0 w-full"
          data-node-id="299:3165"
          data-name="Surgical team"
        >
          {/* Hospital Box */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]"
            data-node-id="299:3166"
            data-name="Medical detail"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:3167"
            >
              HOSPITAL
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
              data-node-id="299:3168"
            >
              Cairo University Hospitals
            </span>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans pt-[2px]"
              data-node-id="299:3169"
            >
              Cairo, Egypt • General Surgery
            </span>
          </div>

          {/* Operating Surgeon Box */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]"
            data-node-id="299:3170"
            data-name="Medical detail"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:3171"
            >
              OPERATING SURGEON
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
              data-node-id="299:3172"
            >
              Dr. Mohamed Adel
            </span>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans pt-[2px]"
              data-node-id="299:3173"
            >
              Consultant General Surgeon
            </span>
          </div>
        </div>

        {/* Recovery Details Grid (2 Columns) matching Node 299:3174 */}
        <div
          className="content-stretch grid grid-cols-1 md:grid-cols-2 gap-[16px] items-start justify-center relative shrink-0 w-full"
          data-node-id="299:3174"
          data-name="Recovery details"
        >
          {/* Reason for Surgery Box */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]"
            data-node-id="299:3175"
            data-name="Medical detail"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:3176"
            >
              REASON FOR SURGERY
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
              data-node-id="299:3177"
            >
              Acute appendicitis
            </span>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans pt-[2px]"
              data-node-id="299:3178"
            >
              Appendix removed laparoscopically.
            </span>
          </div>

          {/* Recovery Status Box */}
          <div
            className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]"
            data-node-id="299:3179"
            data-name="Medical detail"
          >
            <span
              className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
              data-node-id="299:3180"
            >
              RECOVERY STATUS
            </span>
            <span
              className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans"
              data-node-id="299:3181"
            >
              Complete • No complications
            </span>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans pt-[2px]"
              data-node-id="299:3182"
            >
              Returned to normal daily activities.
            </span>
          </div>
        </div>

        {/* Follow-up Information Box matching Node 299:3183 */}
        <div
          className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px] shrink-0 w-full"
          data-node-id="299:3183"
          data-name="Medical detail"
        >
          <span
            className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider"
            data-node-id="299:3184"
          >
            FOLLOW-UP INFORMATION
          </span>
          <span
            className="font-bold text-[13px] text-[#01091e] w-full leading-normal font-sans"
            data-node-id="299:3185"
          >
            Post-operative review completed
          </span>
          <p
            className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
            data-node-id="299:3186"
          >
            Wounds healed. No ongoing surgical treatment or additional follow-up required for this procedure.
          </p>
        </div>

        {/* Card Footer matching Node 299:3187 */}
        <div
          className="border-[rgba(191,199,211,0.3)] border-t border-solid content-stretch flex flex-wrap items-center justify-between pt-[12px] relative shrink-0 w-full gap-2"
          data-node-id="299:3187"
          data-name="Record footer"
        >
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-node-id="299:3188">
            <div className="relative shrink-0 size-[13px]" data-node-id="299:3189">
              <Image
                src="/assets/medical-info/shield-verify.svg"
                alt=""
                width={13}
                height={13}
                unoptimized
                className="absolute block inset-0 max-w-none size-full"
              />
            </div>
            <span
              className="font-normal text-[12px] text-[#41474f] leading-normal font-sans"
              data-node-id="299:3191"
            >
              Surgical history recorded in patient record
            </span>
          </div>
          <span
            className="font-medium text-[12px] text-[#078bde] leading-normal font-sans"
            data-node-id="299:3192"
          >
            Recovery: Complete
          </span>
        </div>
      </div>

      {/* Dynamic Additional Items */}
      {customItems.map((item) => (
        <div
          key={item.id || item.name}
          className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[20px] items-start overflow-hidden p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
        >
          <div className="absolute bg-[#078bde] h-[4px] left-0 right-0 top-0" />
          <div className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-start justify-between pb-[16px] relative shrink-0 w-full">
            <div className="content-stretch flex gap-[14px] items-start relative shrink-0">
              <div className="bg-[#d0e4ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
                <div className="relative shrink-0 size-[16px]">
                  <Image
                    src="/assets/medical-info/subcat-surgery.svg"
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    className="absolute block inset-0 max-w-none size-full"
                  />
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] items-start relative">
                <div className="content-stretch flex flex-wrap gap-[12px] items-center relative">
                  <h3 className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal font-sans">
                    {item.name}
                  </h3>
                  <div className="bg-[#b3ebff] content-stretch flex gap-[4px] items-center px-[10px] py-[2px] relative rounded-[12px] shrink-0">
                    <div className="bg-[#00657a] relative rounded-full shrink-0 size-[6px]" />
                    <span className="font-medium text-[#00657a] text-[12px] whitespace-nowrap leading-normal font-sans">
                      {item.recoveryStatus || "Documented"}
                    </span>
                  </div>
                </div>
                <p className="font-normal text-[12px] text-[#41474f] leading-normal font-sans">
                  Procedure date: {item.date || "Past"} • Hospital: {item.hospital || "Recorded"}
                </p>
              </div>
            </div>
          </div>

          <div className="content-stretch grid grid-cols-1 md:grid-cols-2 gap-[16px] items-start justify-center relative shrink-0 w-full">
            <div className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]">
              <span className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider">
                SURGEON / TEAM
              </span>
              <span className="font-bold text-[14px] text-[#01091e] w-full leading-normal font-sans">
                {item.surgeon || "Attending Surgical Team"}
              </span>
            </div>
            <div className="bg-[#f1f3ff] border border-[rgba(191,199,211,0.4)] border-solid content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[8px]">
              <span className="font-medium text-[11px] text-[#41474f] uppercase w-full leading-normal font-sans tracking-wider">
                FOLLOW-UP STATUS
              </span>
              <span className="font-normal text-[12px] text-[#41474f] leading-normal font-sans">
                {item.followUpNotes || "Discharged without complications"}
              </span>
            </div>
          </div>

          <div className="border-[rgba(191,199,211,0.3)] border-t border-solid content-stretch flex flex-wrap items-center justify-between pt-[12px] relative shrink-0 w-full gap-2">
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[13px]">
                <Image
                  src="/assets/medical-info/shield-verify.svg"
                  alt=""
                  width={13}
                  height={13}
                  unoptimized
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
              <span className="font-normal text-[12px] text-[#41474f] leading-normal font-sans">
                Surgical history recorded in patient record
              </span>
            </div>
            <span className="font-medium text-[12px] text-[#078bde] leading-normal font-sans">
              Recovery: {item.recoveryStatus || "Recorded"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
