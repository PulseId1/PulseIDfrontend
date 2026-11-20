"use client";

import React from "react";
import Image from "next/image";
import { MedicalRecordItem } from "@/lib/api/patient-types";
import { RecordCategory } from "../../hooks/use-medical-records";

interface RecordsListPanelProps {
  readonly activeTab: RecordCategory;
  readonly displayedRecords: MedicalRecordItem[];
  readonly recordSearch: string;
  readonly onSearchChange: (query: string) => void;
  readonly onOpenUpload: () => void;
  readonly onOpenDicom: (item: MedicalRecordItem) => void;
}

export function RecordsListPanel({
  activeTab,
  displayedRecords,
  recordSearch,
  onSearchChange,
  onOpenUpload,
  onOpenDicom,
}: RecordsListPanelProps) {
  const [otcDetailsExpanded, setOtcDetailsExpanded] = React.useState(true);

  // Category headers matching exact Figma nodes
  const getCategoryHeader = () => {
    switch (activeTab) {
      case "history":
        return {
          title: "Medical History",
          badge: `${displayedRecords.length} Sample Records`,
          subtitle: "Sample records • Previous illnesses, treatment and recovery.",
          buttonLabel: "Upload Report",
          nodeId: "299:3911",
        };
      case "labs":
        return {
          title: "Lab Tests & Biomarkers",
          badge: "4 Authenticated Results",
          subtitle: "Diagnostic laboratory work, lipid panels, pathology analysis, and automated biometrics.",
          buttonLabel: "Upload Report",
          nodeId: "568:3521",
        };
      case "radiology":
        return {
          title: "Radiology & X-rays",
          badge: "4 Sample Records",
          subtitle: "Sample records • Imaging findings and study documents.",
          buttonLabel: "Upload Report",
          nodeId: "299:4193",
        };
      case "diagnoses":
        return {
          title: "Medical Diagnoses",
          badge: "3 Sample Records",
          subtitle: "Sample records • Physician assessments and clinical status.",
          buttonLabel: "Upload Report",
          nodeId: "299:4535",
        };
      case "prescriptions":
        return {
          title: "Prescriptions",
          badge: "3 saved prescriptions",
          subtitle: "Past prescriptions with the prescribing doctor and dispensing pharmacist.",
          buttonLabel: "＋ Add Prescription",
          nodeId: "564:1914",
        };
      case "otc":
      default:
        return {
          title: "OTC Dispensing History",
          badge: "OTC Dispensing Logs",
          subtitle: "Your OTC records only • Separate from prescribed medications",
          buttonLabel: "Upload Report",
          nodeId: "526:10331",
        };
    }
  };

  const header = getCategoryHeader();

  return (
    <div
      className="lg:col-span-8 flex flex-col gap-6 w-full"
      style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
    >
      {/* 1. Category Header Row matching Figma Nodes */}
      {activeTab === "otc" ? (
        <div
          className="flex flex-col gap-[2px] items-start text-left w-full"
          data-node-id="526:10330"
          data-name="OTC history heading"
        >
          <h2
            className="text-[22px] font-bold text-[#01091e] leading-[27px] font-sans"
            data-node-id="526:10331"
          >
            OTC Dispensing History
          </h2>
          <p
            className="text-[13px] font-normal text-[#41474f] leading-[20px] font-sans"
            data-node-id="526:10332"
          >
            Your OTC records only • Separate from prescribed medications
          </p>
        </div>
      ) : (
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left w-full"
          data-node-id={header.nodeId}
          data-name="Category Header"
        >
          <div className="flex flex-col gap-[2px]">
            <div className="flex items-center gap-[8px]">
              <h2 className="text-[22px] font-bold text-[#01091E] font-heading leading-normal">
                {header.title}
              </h2>
              <div
                className={`px-[10px] py-[2px] rounded-[12px] shrink-0 ${
                  activeTab === "prescriptions" ? "bg-[#dbe8fa]" : "bg-[#B3EBFF]"
                }`}
              >
                <span
                  className={`text-[11px] sm:text-[12px] font-bold leading-normal whitespace-nowrap ${
                    activeTab === "prescriptions" ? "text-[#0752a4]" : "text-[#02307D]"
                  }`}
                >
                  {header.badge}
                </span>
              </div>
            </div>
            <p className="text-[13px] font-normal text-[#41474F] font-sans leading-normal">
              {header.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenUpload}
            className={`${
              activeTab === "prescriptions"
                ? "bg-[#078bde] hover:bg-[#0070c5] px-[16px] py-[7px]"
                : "bg-[#00609B] hover:bg-[#004E7E] px-[12px] py-[6px]"
            } rounded-[4px] text-[12px] sm:text-[13px] font-bold text-white transition-colors flex items-center gap-[6px] self-start sm:self-auto cursor-pointer shadow-xs shrink-0`}
          >
            {activeTab === "prescriptions" ? (
              <span>＋ Add Prescription</span>
            ) : (
              <>
                <Image
                  src="/assets/records/upload-cloud.svg"
                  alt=""
                  width={15}
                  height={11}
                  unoptimized
                  className="w-[14.67px] h-[10.67px]"
                />
                <span>{header.buttonLabel}</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* 2. Tab-Specific Notice & Filters (OTC Dispensing Figma Node 526:10329) */}
      {activeTab === "otc" && (
        <div className="flex flex-col gap-[16px] w-full" data-node-id="526:10329">
          <div className="flex flex-wrap gap-[12px] items-center w-full" data-node-id="526:10333" data-name="Search and date filters">
            <div className="bg-white border border-[#DDE7FF] rounded-[8px] h-[44px] px-[16px] flex items-center gap-[12px] flex-1 min-w-[280px]">
              <div className="relative shrink-0 size-[20px]">
                <Image
                  src="/assets/records/otc-search.svg"
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                  className="w-5 h-5 text-[#727272] shrink-0"
                />
              </div>
              <input
                type="text"
                value={recordSearch}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search medications or pharmacy"
                className="w-full bg-transparent text-[14px] font-semibold text-[#01091E] placeholder-[#727272] focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="bg-white border border-[#DDE7FF] rounded-[8px] h-[40px] px-[16px] w-[204px] flex items-center justify-center text-[14px] font-semibold text-[#02307D] hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
              data-node-id="526:10335"
            >
              From: Any date
            </button>
            <button
              type="button"
              className="bg-white border border-[#DDE7FF] rounded-[8px] h-[40px] px-[16px] w-[204px] flex items-center justify-center text-[14px] font-semibold text-[#02307D] hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
              data-node-id="526:10336"
            >
              To: Any date
            </button>
          </div>

          <div
            className="bg-[#F1F3FF] p-[12px] rounded-[4px] text-[13px] text-[#41474F] leading-[20px] w-full"
            data-node-id="526:10337"
            data-name="Unavailable transaction data notice"
          >
            No OTC transaction data supplied. The card below is a layout preview, not a patient record.
          </div>
        </div>
      )}

      {/* 4. List of Records Cards matching exact Figma Nodes */}
      <div className="flex flex-col gap-[16px] w-full text-left">
        {activeTab === "labs" ? (
          <>
            {/* Lab Test Card 1: Fasting Blood Glucose (Figma Node 568:3535) */}
            <div
              className="bg-white border border-[rgba(191,199,211,0.7)] border-solid drop-shadow-[0px_1px_1.5px_rgba(2,48,125,0.04),0px_4px_6px_rgba(2,48,125,0.03)] flex flex-col gap-[16px] items-start pb-[41px] pt-[25px] px-[25px] relative rounded-[8px] shrink-0 w-full"
              data-node-id="568:3535"
              data-name="Lab Test Card 1: Fasting Blood Glucose"
            >
              <div
                className="border-[rgba(191,199,211,0.3)] border-b border-solid relative shrink-0 w-full"
                data-node-id="568:3536"
                data-name="HorizontalBorder"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between pb-[17px] relative w-full gap-3">
                  <div className="flex gap-[12px] items-start relative" data-node-id="568:3537">
                    <div
                      className="bg-[#b3ebff] flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]"
                      data-node-id="568:3538"
                      data-name="Background"
                    >
                      <div className="h-[20px] relative shrink-0 w-[16px]" data-node-id="568:3539">
                        <Image
                          src="/assets/records/lab-beaker.svg"
                          alt=""
                          width={16}
                          height={20}
                          unoptimized
                          className="absolute block inset-0 max-w-none size-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[4px] items-start relative" data-node-id="568:3541">
                      <div className="flex flex-col items-start relative shrink-0 w-full" data-node-id="568:3542">
                        <h3
                          className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal"
                          data-node-id="568:3543"
                        >
                          Fasting Blood Glucose
                        </h3>
                      </div>
                      <div className="flex flex-col items-start relative shrink-0" data-node-id="568:3544">
                        <div
                          className="text-[12px] text-[#41474f] leading-[16px]"
                          data-node-id="568:3545"
                        >
                          <span className="font-normal text-[#404751]">Requested by: </span>
                          <span className="font-bold text-[#0a1a3a]">Dr. Sherif Mansour</span>
                          <span className="font-normal text-[#404751]">{` • Laboratory: `}</span>
                          <span className="font-bold text-[#0a1a3a]">Al Borg Diagnostics, Maadi Branch</span>
                          <span className="font-normal text-[#404751]">{` • `}</span>
                          <span className="font-normal text-[#404751]">Date: Aug 14, 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[4px] items-center relative shrink-0" data-node-id="568:3546">
                    <div
                      className="bg-[rgba(142,191,222,0.2)] flex flex-col items-start px-[10px] py-[4px] relative rounded-[12px] shrink-0"
                      data-node-id="568:3547"
                      data-name="Background"
                    >
                      <span
                        className="font-bold text-[12px] text-[#41474f] whitespace-nowrap leading-normal"
                        data-node-id="568:3548"
                      >
                        Normal (94 mg/dL)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="border border-[rgba(0,96,155,0.3)] border-solid hover:bg-slate-50 flex gap-[4px] items-center px-[11px] py-[5px] relative rounded-[4px] shrink-0 cursor-pointer transition-colors"
                      data-node-id="568:3549"
                      data-name="Button"
                    >
                      <div className="relative shrink-0 size-[11.667px]" data-node-id="568:3550">
                        <Image
                          src="/assets/records/card-pdf.svg"
                          alt=""
                          width={12}
                          height={12}
                          unoptimized
                          className="absolute block inset-0 max-w-none size-full"
                        />
                      </div>
                      <span
                        className="font-medium text-[12px] text-[#078bde] text-center whitespace-nowrap leading-normal"
                        data-node-id="568:3552"
                      >
                        PDF
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Biomarker Visual Range (Figma Node 568:3553) */}
              <div
                className="flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                data-node-id="568:3553"
                data-name="Biomarker Visual Range"
              >
                <div
                  className="flex h-[15px] items-start justify-between relative shrink-0 w-full"
                  data-node-id="568:3554"
                >
                  <span
                    className="font-medium text-[12px] text-[#41474f] whitespace-nowrap leading-normal"
                    data-node-id="568:3556"
                  >
                    Fasting Baseline: 70 mg/dL
                  </span>
                  <span
                    className="font-bold text-[12px] text-[#01091e] whitespace-nowrap leading-normal"
                    data-node-id="568:3558"
                  >
                    Patient: 94 mg/dL
                  </span>
                  <span
                    className="font-medium text-[12px] text-[#41474f] whitespace-nowrap leading-normal"
                    data-node-id="568:3560"
                  >
                    Upper Normal: 99 mg/dL
                  </span>
                </div>

                {/* Exact Range Bar */}
                <div
                  className="bg-[#e9edff] h-[10px] overflow-hidden relative rounded-[12px] shrink-0 w-full"
                  data-node-id="568:3561"
                  data-name="Background"
                >
                  <div
                    className="absolute bg-[rgba(45,91,168,0.2)] inset-[0_40%_0_0]"
                    data-node-id="568:3562"
                    data-name="Overlay"
                  />
                  <div
                    className="absolute bg-[rgba(239,68,68,0.2)] inset-[0_0_0_90%]"
                    data-node-id="568:3563"
                    data-name="Overlay"
                  />
                  <div
                    className="absolute bg-[#078bde] flex flex-col inset-[0_10%_0_60%] items-end justify-center pr-0"
                    data-node-id="568:3564"
                    data-name="Background"
                  >
                    <div
                      className="bg-white h-full w-[6px]"
                      data-node-id="568:3565"
                      data-name="Background"
                    />
                  </div>
                </div>

                <div
                  className="flex h-[18.5px] items-start justify-between pt-[2px] relative shrink-0 w-full"
                  data-node-id="568:3566"
                >
                  <span
                    className="font-normal text-[11px] text-[#41474f] whitespace-nowrap leading-normal"
                    data-node-id="568:3568"
                  >
                    Optimal Clinical Range
                  </span>
                  <span
                    className="font-medium text-[11px] text-[#727272] whitespace-nowrap leading-normal"
                    data-node-id="568:3570"
                  >
                    Within safe physiological threshold
                  </span>
                </div>
              </div>
            </div>

            {/* Lab Test Card 2: Comprehensive Lipid Profile (Figma Node 568:3571) */}
            <div
              className="bg-white border border-[rgba(191,199,211,0.7)] border-solid drop-shadow-[0px_1px_1.5px_rgba(2,48,125,0.04),0px_4px_6px_rgba(2,48,125,0.03)] flex flex-col gap-[16px] items-start p-[25px] relative rounded-[8px] shrink-0 w-full"
              data-node-id="568:3571"
              data-name="Lab Test Card 2: Comprehensive Lipid Profile"
            >
              <div
                className="border-[rgba(191,199,211,0.3)] border-b border-solid relative shrink-0 w-full"
                data-node-id="568:3572"
                data-name="HorizontalBorder"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between pb-[17px] relative w-full gap-3">
                  <div className="flex gap-[12px] items-start relative" data-node-id="568:3573">
                    <div
                      className="bg-[#d0e4ff] flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]"
                      data-node-id="568:3574"
                      data-name="Background"
                    >
                      <div className="h-[19px] relative shrink-0 w-[14px]" data-node-id="568:3575">
                        <Image
                          src="/assets/records/card-microscope.svg"
                          alt=""
                          width={14}
                          height={19}
                          unoptimized
                          className="absolute block inset-0 max-w-none size-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-start relative" data-node-id="568:3577">
                      <div className="flex flex-col items-start relative shrink-0 w-full" data-node-id="568:3578">
                        <h3
                          className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal"
                          data-node-id="568:3579"
                        >
                          Comprehensive Lipid Panel
                        </h3>
                      </div>
                      <div className="flex flex-col items-start relative shrink-0" data-node-id="568:3580">
                        <div
                          className="text-[10px] text-[#41474f] leading-[16px]"
                          data-node-id="568:3581"
                        >
                          <span className="font-normal text-[#404751]">Requested by: </span>
                          <span className="font-bold text-[#0a1a3a]">Dr. Mona El-Shazly</span>
                          <span className="font-normal text-[#404751]">{` • Assigned Laboratory: `}</span>
                          <span className="font-bold text-[#0a1a3a]">Al Borg Diagnostics, Maadi Branch</span>
                          <span className="font-normal text-[#404751]">{` • `}</span>
                          <span className="font-normal text-[#404751]">Ordered: Today, 08:30 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[12px] items-center relative shrink-0" data-node-id="568:3582">
                    <div
                      className="bg-[#d0e4ff] flex flex-col items-start px-[10px] py-[4px] relative rounded-[12px] shrink-0"
                      data-node-id="568:3583"
                      data-name="Background"
                    >
                      <span
                        className="font-bold text-[12px] text-[#02307d] whitespace-nowrap leading-normal"
                        data-node-id="568:3584"
                      >
                        Total Cholesterol: 178 mg/dL
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="border border-[rgba(0,96,155,0.3)] border-solid hover:bg-slate-50 flex gap-[4px] items-center px-[11px] py-[5px] relative rounded-[4px] shrink-0 cursor-pointer transition-colors"
                      data-node-id="568:3585"
                      data-name="Button"
                    >
                      <div className="relative shrink-0 size-[11.667px]" data-node-id="568:3586">
                        <Image
                          src="/assets/records/card-pdf-navy.svg"
                          alt=""
                          width={12}
                          height={12}
                          unoptimized
                          className="absolute block inset-0 max-w-none size-full"
                        />
                      </div>
                      <span
                        className="font-medium text-[12px] text-[#02307d] text-center whitespace-nowrap leading-normal"
                        data-node-id="568:3588"
                      >
                        PDF
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Segmented Sub-indicators (Figma Node 568:3589) */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-[12px] items-start justify-center relative shrink-0 w-full"
                data-node-id="568:3589"
                data-name="Segmented Sub-indicators"
              >
                <div
                  className="bg-[#f1f3ff] flex flex-col gap-[2px] items-center p-[12px] relative rounded-[4px] w-full"
                  data-node-id="568:3590"
                  data-name="Background"
                >
                  <span
                    className="font-medium text-[10px] text-[#41474f] text-center uppercase whitespace-nowrap leading-normal"
                    data-node-id="568:3592"
                  >
                    HDL (GOOD)
                  </span>
                  <span
                    className="font-normal text-[16px] text-[#01091e] text-center whitespace-nowrap leading-normal"
                    data-node-id="568:3594"
                  >
                    54 mg/dL
                  </span>
                  <span
                    className="font-normal text-[10px] text-[#727272] text-center whitespace-nowrap leading-normal"
                    data-node-id="568:3596"
                  >
                    {`Optimal (>40)`}
                  </span>
                </div>

                <div
                  className="bg-[#f1f3ff] flex flex-col gap-[2px] items-center p-[12px] relative rounded-[4px] w-full"
                  data-node-id="568:3597"
                  data-name="Background"
                >
                  <span
                    className="font-medium text-[10px] text-[#41474f] text-center uppercase whitespace-nowrap leading-normal"
                    data-node-id="568:3599"
                  >
                    LDL (CALCULATED)
                  </span>
                  <span
                    className="font-normal text-[16px] text-[#01091e] text-center whitespace-nowrap leading-normal"
                    data-node-id="568:3601"
                  >
                    102 mg/dL
                  </span>
                  <span
                    className="font-normal text-[10px] text-[#02307d] text-center whitespace-nowrap leading-normal"
                    data-node-id="568:3603"
                  >
                    Near Optimal
                  </span>
                </div>

                <div
                  className="bg-[#f1f3ff] flex flex-col gap-[2px] items-center p-[12px] relative rounded-[4px] w-full"
                  data-node-id="568:3604"
                  data-name="Background"
                >
                  <span
                    className="font-medium text-[10px] text-[#41474f] text-center uppercase whitespace-nowrap leading-normal"
                    data-node-id="568:3606"
                  >
                    TRIGLYCERIDES
                  </span>
                  <span
                    className="font-normal text-[16px] text-[#01091e] text-center whitespace-nowrap leading-normal"
                    data-node-id="568:3608"
                  >
                    110 mg/dL
                  </span>
                  <span
                    className="font-normal text-[10px] text-[#727272] text-center whitespace-nowrap leading-normal"
                    data-node-id="568:3610"
                  >
                    {`Normal (<150)`}
                  </span>
                </div>

                <div
                  className="bg-[#f1f3ff] flex flex-col gap-[2px] items-center p-[12px] relative rounded-[4px] w-full"
                  data-node-id="568:3611"
                  data-name="Background"
                >
                  <span
                    className="font-medium text-[10px] text-[#41474f] text-center uppercase whitespace-nowrap leading-normal"
                    data-node-id="568:3613"
                  >
                    NON-HDL
                  </span>
                  <span
                    className="font-normal text-[16px] text-[#01091e] text-center whitespace-nowrap leading-normal"
                    data-node-id="568:3615"
                  >
                    124 mg/dL
                  </span>
                  <span
                    className="font-normal text-[10px] text-[#727272] text-center whitespace-nowrap leading-normal"
                    data-node-id="568:3617"
                  >
                    Low Risk
                  </span>
                </div>
              </div>
            </div>

            {/* Lab Test Card 3: Complete Blood Count (CBC) (Figma Node 568:3618) */}
            <div
              className="bg-white border border-[rgba(191,199,211,0.7)] border-solid drop-shadow-[0px_1px_1.5px_rgba(2,48,125,0.04),0px_4px_6px_rgba(2,48,125,0.03)] flex flex-col gap-[16px] items-start p-[25px] relative rounded-[8px] shrink-0 w-full"
              data-node-id="568:3618"
              data-name="Complete Blood Count (CBC)"
            >
              <div className="flex flex-col sm:flex-row gap-[12px] items-start relative shrink-0 w-full justify-between" data-node-id="568:3619">
                <div className="flex gap-[12px] items-start">
                  <div
                    className="bg-[#d0e4ff] flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]"
                    data-node-id="568:3620"
                    data-name="Background"
                  >
                    <div className="h-[19px] relative shrink-0 w-[14px]" data-node-id="568:3621">
                      <Image
                        src="/assets/records/card-microscope.svg"
                        alt=""
                        width={14}
                        height={19}
                        unoptimized
                        className="absolute block inset-0 max-w-none size-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[4px] items-start relative" data-node-id="568:3623">
                    <h3
                      className="font-bold text-[18px] text-[#01091e] leading-normal"
                      data-node-id="568:3624"
                    >
                      Complete Blood Count (CBC)
                    </h3>
                    <div
                      className="text-[12px] text-[#41474f] leading-[16px]"
                      data-node-id="568:3625"
                    >
                      <span className="font-normal text-[#404751]">Requested by: </span>
                      <span className="font-bold text-[#0a1a3a]">Dr. Sherif Mansour</span>
                      <span className="font-normal text-[#404751]">{` • Laboratory: `}</span>
                      <span className="font-bold text-[#0a1a3a]">Al Borg Diagnostics</span>
                      <span className="font-normal text-[#404751]">{` • Verified through automated serum spectrometry • Ref: LP-90218`}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-[#d0e4ff] flex flex-col items-start px-[10px] py-[4px] relative rounded-[12px] shrink-0 self-start"
                  data-node-id="568:3626"
                  data-name="Background"
                >
                  <span
                    className="font-bold text-[12px] text-[#02307d] whitespace-nowrap leading-normal"
                    data-node-id="568:3627"
                  >
                    Within range
                  </span>
                </div>
              </div>

              {/* Clinical summary */}
              <div
                className="bg-[#f1f3ff] relative rounded-[4px] shrink-0 w-full p-[12px]"
                data-node-id="568:3628"
                data-name="Clinical summary"
              >
                <div
                  className="text-[13px] text-[#41474f] leading-[1.55] flex flex-col"
                  data-node-id="568:3629"
                >
                  <p className="leading-[1.55] mb-0">Hemoglobin: 14.8 g/dL (13.5–17.5) • WBC: 6.4 ×10⁹/L (4.0–11.0)</p>
                  <p className="leading-[1.55] mb-0">Platelets: 245 ×10⁹/L (150–450) • Hematocrit: 44% (41–53)</p>
                  <p className="leading-[1.55]">Interpretation: No anemia, leukocytosis or platelet abnormality.</p>
                </div>
              </div>

              {/* Record actions */}
              <div className="flex items-start relative shrink-0 w-full" data-node-id="568:3630">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="border border-[rgba(0,96,155,0.3)] border-solid hover:bg-slate-50 flex gap-[4px] items-center px-[11px] py-[5px] relative rounded-[4px] shrink-0 cursor-pointer transition-colors"
                  data-node-id="568:3631"
                  data-name="Button"
                >
                  <div className="relative shrink-0 size-[11.667px]" data-node-id="568:3632">
                    <Image
                      src="/assets/records/card-pdf-navy.svg"
                      alt=""
                      width={12}
                      height={12}
                      unoptimized
                      className="absolute block inset-0 max-w-none size-full"
                    />
                  </div>
                  <span
                    className="font-medium text-[12px] text-[#02307d] text-center whitespace-nowrap leading-normal"
                    data-node-id="568:3634"
                  >
                    PDF
                  </span>
                </button>
              </div>
            </div>

            {/* Lab Test Card 4: Chest PA Digital Radiograph (X-Ray) (Figma Node 568:3635) */}
            <div
              className="bg-white border border-[rgba(191,199,211,0.7)] border-solid drop-shadow-[0px_1px_1.5px_rgba(2,48,125,0.04),0px_4px_6px_rgba(2,48,125,0.03)] flex flex-col items-start p-[25px] relative rounded-[8px] shrink-0 w-full"
              data-node-id="568:3635"
              data-name="Radiology & Imaging Card: Chest X-Ray Digital Imaging"
            >
              <div
                className="flex flex-col lg:flex-row items-start justify-between gap-[26px] relative shrink-0 w-full"
                data-node-id="568:3636"
              >
                <div className="flex gap-[14px] items-start relative flex-1" data-node-id="568:3637">
                  <div
                    className="bg-[#dae2ff] flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]"
                    data-node-id="568:3638"
                    data-name="Background"
                  >
                    <div className="h-[20px] relative shrink-0 w-[18px]" data-node-id="568:3639">
                      <Image
                        src="/assets/records/lab-xray-card.svg"
                        alt=""
                        width={18}
                        height={20}
                        unoptimized
                        className="absolute block inset-0 max-w-none size-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[4px] items-start relative flex-1" data-node-id="568:3641">
                    <div className="flex gap-[8px] items-center relative w-full" data-node-id="568:3642">
                      <h3
                        className="font-bold text-[18px] text-[#01091e] whitespace-nowrap leading-normal"
                        data-node-id="568:3644"
                      >
                        Chest PA Digital Radiograph (X-Ray)
                      </h3>
                      <div
                        className="bg-[#e9edff] flex flex-col items-start px-[8px] py-[2px] relative rounded-[2px] shrink-0"
                        data-node-id="568:3645"
                        data-name="Background"
                      >
                        <span
                          className="font-medium text-[12px] text-[#41474f] whitespace-nowrap leading-normal"
                          data-node-id="568:3646"
                        >
                          DICOM Ready
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex flex-col items-start pb-[8px] relative w-full"
                      data-node-id="568:3647"
                    >
                      <div
                        className="text-[12px] text-[#41474f] leading-[16px]"
                        data-node-id="568:3648"
                      >
                        <span className="font-normal text-[#404751]">Requested by: </span>
                        <span className="font-bold text-[#0a1a3a]">Dr. Tarek Ezzat</span>
                        <span className="font-normal text-[#404751]">{` • Imaging Center: Cairo Scan Diagnostic Imaging •`}</span>
                        <br />
                        <span className="font-normal text-[#404751]">Study ID: XR-2024-884 • Radiologist: Dr. Nader Fouad</span>
                      </div>
                    </div>
                    <div
                      className="bg-[#f1f3ff] flex flex-col items-start p-[12px] relative rounded-[4px] shrink-0 w-full"
                      data-node-id="568:3649"
                      data-name="Background"
                    >
                      <div
                        className="text-[12px] text-[#41474f] leading-normal"
                        data-node-id="568:3650"
                      >
                        <p className="mb-0">
                          <span className="font-bold text-[#41474f]">Radiologist Impression:</span>
                          <span className="font-normal text-[#41474f]">{` Lungs are clear of acute focal infiltrates, consolidation, or pleural effusion. Cardiothoracic ratio is normal. Skeletal thorax architecture intact.`}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="flex flex-col gap-[8px] items-start relative shrink-0 w-full sm:w-auto"
                  data-node-id="568:3651"
                >
                  <button
                    type="button"
                    onClick={() => onOpenDicom({
                      id: "rec-rad-1",
                      category: "radiology",
                      title: "Chest PA Digital Radiograph (X-Ray)",
                      subtitle: "Cairo Scan Diagnostic Imaging",
                      date: "Aug 14, 2024",
                      facility: "Cairo Scan Diagnostic Imaging",
                      statusBadge: { label: "DICOM Ready", variant: "normal" },
                      dicomViewerUrl: "#dicom",
                    })}
                    className="bg-[#078bde] hover:bg-[#0070c5] transition-colors drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[6px] items-center justify-center px-[25.5px] py-[8px] relative rounded-[4px] shrink-0 cursor-pointer w-full"
                    data-node-id="568:3652"
                    data-name="Button"
                  >
                    <div className="h-[8.75px] relative shrink-0 w-[12.833px]" data-node-id="568:3653">
                      <Image
                        src="/assets/records/dicom-eye.svg"
                        alt=""
                        width={13}
                        height={9}
                        unoptimized
                        className="absolute block inset-0 max-w-none size-full"
                      />
                    </div>
                    <span
                      className="font-medium text-[12px] text-white text-center whitespace-nowrap leading-normal"
                      data-node-id="568:3656"
                    >
                      Open DICOM Viewer
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="border border-[#bfc7d3] hover:bg-slate-50 transition-colors flex gap-[6px] items-center justify-center px-[13px] py-[7px] relative rounded-[4px] shrink-0 cursor-pointer w-full"
                    data-node-id="568:3657"
                    data-name="Button"
                  >
                    <div className="relative shrink-0 size-[9.333px]" data-node-id="568:3658">
                      <Image
                        src="/assets/records/download-scan.svg"
                        alt=""
                        width={9}
                        height={9}
                        unoptimized
                        className="absolute block inset-0 max-w-none size-full"
                      />
                    </div>
                    <span
                      className="font-medium text-[12px] text-[#01091e] text-center whitespace-nowrap leading-normal"
                      data-node-id="568:3661"
                    >
                      Download Scan (42 MB)
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : activeTab === "otc" ? (
          /* OTC Dispensing History: Layout Preview Card (Figma Node 526:10339) */
          <div
            className="bg-white border border-[rgba(191,199,211,0.7)] border-solid drop-shadow-[0px_1px_1.5px_rgba(2,48,125,0.04),0px_4px_6px_rgba(2,48,125,0.03)] flex flex-col gap-[16px] items-start p-[25px] relative rounded-[8px] shrink-0 w-full text-left"
            data-node-id="526:10339"
            data-name="OTC dispensing card — unavailable-data preview"
          >
            {/* Dispensing card header */}
            <div className="flex items-center justify-between gap-3 w-full" data-node-id="526:10340" data-name="Dispensing card header">
              <div className="flex items-center gap-[12px]">
                <div
                  className="bg-[#d9e2ff] flex items-center justify-center relative rounded-[4px] shrink-0 size-[40px]"
                  data-node-id="526:10341"
                  data-name="OTC medication document icon"
                >
                  <div className="relative shrink-0 size-[20px]" data-node-id="526:10342">
                    <Image
                      src="/assets/records/otc-rx-doc.svg"
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                      className="absolute block inset-0 max-w-none size-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[2px] items-start" data-node-id="526:10347" data-name="Medication identity">
                  <h3
                    className="font-bold text-[18px] text-[#01091e] font-sans leading-[20px]"
                    data-node-id="526:10348"
                  >
                    Medication name &amp; brand: Not provided
                  </h3>
                  <p
                    className="font-normal text-[12px] text-[#41474f] font-sans leading-[20px]"
                    data-node-id="526:10349"
                  >
                    Record layout preview • No dispensing data supplied
                  </p>
                </div>
              </div>

              <div
                className="bg-[#d0e4ff] px-[10px] py-[4px] rounded-[12px] shrink-0 self-start"
                data-node-id="526:10350"
                data-name="OTC read-only badge"
              >
                <span
                  className="font-bold text-[12px] text-[#02307d] leading-[20px] whitespace-nowrap"
                  data-node-id="526:10351"
                >
                  OTC · Read-only
                </span>
              </div>
            </div>

            {/* Section 1: Medication Information */}
            <div
              className="bg-[#f1f3ff] rounded-[4px] p-[12px] flex flex-col gap-[6px] w-full"
              data-node-id="526:10352"
              data-name="Medication Information"
            >
              <h4
                className="font-bold text-[14px] text-[#01091e] leading-[20px]"
                data-node-id="526:10353"
              >
                Medication Information
              </h4>
              <div
                className="flex flex-col sm:flex-row gap-[10px] sm:gap-[20px] text-[13px] text-[#41474f] w-full"
                data-node-id="526:10354"
                data-name="Dispensing detail row"
              >
                <p className="flex-1 min-w-0" data-node-id="526:10355">
                  Active ingredient: Not provided
                </p>
                <p className="flex-1 min-w-0" data-node-id="526:10356">
                  Strength &amp; dosage form: Not provided
                </p>
              </div>
              <div
                className="flex flex-col sm:flex-row gap-[10px] sm:gap-[20px] text-[13px] text-[#41474f] w-full"
                data-node-id="526:10357"
                data-name="Dispensing detail row"
              >
                <p className="flex-1 min-w-0" data-node-id="526:10358">
                  Dispensed quantity: Not provided
                </p>
                <p className="flex-1 min-w-0" data-node-id="526:10359">
                  Dosage instructions: Not provided
                </p>
              </div>
            </div>

            {/* Complete dispensing details: Sections 2, 3, and 4 */}
            {otcDetailsExpanded && (
              <div
                className="flex flex-col gap-[14px] w-full"
                data-node-id="526:10360"
                data-name="Complete dispensing details"
              >
                {/* Section 2: Pharmacy Information */}
                <div
                  className="flex flex-col gap-[6px] w-full"
                  data-node-id="526:10361"
                  data-name="Pharmacy Information"
                >
                  <h4
                    className="font-bold text-[14px] text-[#01091e] leading-[20px]"
                    data-node-id="526:10362"
                  >
                    Pharmacy Information
                  </h4>
                  <div
                    className="flex flex-col sm:flex-row gap-[10px] sm:gap-[20px] text-[13px] text-[#41474f] w-full"
                    data-node-id="526:10363"
                    data-name="Dispensing detail row"
                  >
                    <p className="flex-1 min-w-0" data-node-id="526:10364">
                      Pharmacy name: Not provided
                    </p>
                    <p className="flex-1 min-w-0" data-node-id="526:10365">
                      Address / location: Not provided
                    </p>
                  </div>
                  <div
                    className="flex flex-col sm:flex-row gap-[10px] sm:gap-[20px] text-[13px] text-[#41474f] w-full"
                    data-node-id="526:10366"
                    data-name="Dispensing detail row"
                  >
                    <p className="flex-1 min-w-0" data-node-id="526:10367">
                      Dispensing date: Not provided
                    </p>
                    <p className="flex-1 min-w-0" data-node-id="526:10368">
                      Dispensing time: Not provided
                    </p>
                  </div>
                </div>

                {/* Section 3: Staff Information */}
                <div
                  className="flex flex-col gap-[6px] w-full"
                  data-node-id="526:10369"
                  data-name="Staff Information"
                >
                  <h4
                    className="font-bold text-[14px] text-[#01091e] leading-[20px]"
                    data-node-id="526:10370"
                  >
                    Staff Information
                  </h4>
                  <div
                    className="flex flex-col sm:flex-row gap-[10px] sm:gap-[20px] text-[13px] text-[#41474f] w-full"
                    data-node-id="526:10371"
                    data-name="Dispensing detail row"
                  >
                    <p className="flex-1 min-w-0" data-node-id="526:10372">
                      Dispensed by: Not provided
                    </p>
                    <p className="flex-1 min-w-0" data-node-id="526:10373">
                      Staff role: Not provided
                    </p>
                  </div>
                  <p
                    className="text-[13px] text-[#41474f] leading-[20px]"
                    data-node-id="526:10375"
                  >
                    Verification status: Not provided
                  </p>
                </div>

                {/* Section 4: Additional Details */}
                <div
                  className="flex flex-col gap-[6px] w-full"
                  data-node-id="526:10376"
                  data-name="Additional Details"
                >
                  <h4
                    className="font-bold text-[14px] text-[#01091e] leading-[20px]"
                    data-node-id="526:10377"
                  >
                    Additional Details
                  </h4>
                  <div
                    className="flex flex-col sm:flex-row gap-[10px] sm:gap-[20px] text-[13px] text-[#41474f] w-full"
                    data-node-id="526:10378"
                    data-name="Dispensing detail row"
                  >
                    <p className="flex-1 min-w-0" data-node-id="526:10379">
                      Reason for dispensing: Not provided
                    </p>
                    <p className="flex-1 min-w-0" data-node-id="526:10380">
                      Patient symptoms: Not provided
                    </p>
                  </div>
                  <p
                    className="text-[13px] text-[#41474f] leading-[20px]"
                    data-node-id="526:10382"
                  >
                    Counseling &amp; usage instructions: Not provided
                  </p>
                  <p
                    className="text-[13px] text-[#41474f] leading-[20px]"
                    data-node-id="526:10384"
                  >
                    Transaction reference number: Not provided
                  </p>
                </div>
              </div>
            )}

            {/* Dispensing record actions */}
            <div
              className="flex items-center gap-[12px] w-full pt-[4px]"
              data-node-id="526:10385"
              data-name="Dispensing record actions"
            >
              <button
                type="button"
                onClick={() => setOtcDetailsExpanded(!otcDetailsExpanded)}
                className="bg-white border border-[#dde7ff] rounded-[8px] h-[40px] w-[142px] flex items-center justify-center text-[14px] font-semibold text-[#02307d] hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                data-node-id="526:10387"
                data-name="Hide Details"
              >
                {otcDetailsExpanded ? "Hide Details" : "Show Details"}
              </button>
              <p
                className="text-[12px] font-normal text-[#41474f] leading-[20px]"
                data-node-id="526:10388"
              >
                Historical dispensing records are read-only.
              </p>
            </div>
          </div>
        ) : displayedRecords.length === 0 ? (
          <div className="bg-white rounded-[8px] p-8 border border-[rgba(191,199,211,0.7)] text-center text-slate-500 text-sm">
            No records found matching your search.
          </div>
        ) : (
          displayedRecords.map((item) => {

            // Case B: Prescriptions Card Layout (Figma Node 564:1910 & 564:1922)
            if (activeTab === "prescriptions") {
              return (
                <div
                  key={item.id}
                  className="bg-white border border-[rgba(191,199,211,0.7)] drop-shadow-[0px_1px_1.5px_rgba(2,48,125,0.04),0px_4px_6px_rgba(2,48,125,0.03)] rounded-[8px] p-[20px_25px] flex flex-col gap-[14px] w-full"
                  data-node-id="564:1922"
                  data-name="Prescription Card"
                >
                  {/* Top card row: Title, Subtitle and DISPENSED badge */}
                  <div className="flex items-start justify-between gap-3 w-full">
                    <div className="flex flex-col gap-[4px] items-start">
                      <h3 className="text-[17px] font-bold text-[#081021] font-sans leading-normal">
                        {item.title}
                      </h3>
                      <p className="text-[12px] font-normal text-[#414750] font-sans">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="bg-[#e9effd] px-[12px] py-[4px] rounded-[12px] shrink-0 self-start">
                      <span className="text-[10px] font-bold text-[#084d99] uppercase tracking-wider leading-normal whitespace-nowrap">
                        {item.statusBadge.label}
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Divider */}
                  <div className="border-b border-[#e9effd] w-full" />

                  {/* Two-row details: Prescribed by & Dispensed by */}
                  <div className="flex flex-col gap-[8px] text-[13px] w-full">
                    <div className="flex items-center gap-[16px]">
                      <span className="text-[11px] font-normal text-[#59616c] w-[95px] shrink-0 font-sans">
                        Prescribed by
                      </span>
                      <span className="text-[13px] font-bold text-[#081021] font-sans">
                        {item.doctor}
                      </span>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <span className="text-[11px] font-normal text-[#59616c] w-[95px] shrink-0 font-sans">
                        Dispensed by
                      </span>
                      <span className="text-[13px] font-bold text-[#081021] font-sans">
                        {item.facility}
                      </span>
                    </div>
                  </div>

                  {/* Dosage / Medication Items strip */}
                  {item.description && (
                    <div className="bg-[#f0f5ff] rounded-[4px] px-[14px] py-[8px] text-[12px] font-normal text-[#174f98] font-sans w-full mt-[2px]">
                      {item.description}
                    </div>
                  )}
                </div>
              );
            }

            // Case C: Standard Records (Medical History, Labs, Radiology, Diagnoses)
            return (
              <div
                key={item.id}
                className="bg-white border border-[rgba(191,199,211,0.7)] drop-shadow-[0px_1px_1.5px_rgba(2,48,125,0.04),0px_4px_6px_rgba(2,48,125,0.03)] rounded-[8px] p-[25px] flex flex-col gap-[16px] w-full"
                data-node-id="299:3925"
              >
                {/* Top card row: Title & Badges */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div
                      className="size-[40px] rounded-[8px] bg-[#D0E4FF] flex items-center justify-center shrink-0 mt-0.5"
                      data-node-id="299:3927"
                    >
                      <Image
                        src="/assets/records/card-microscope.svg"
                        alt=""
                        width={14}
                        height={19}
                        unoptimized
                        className="w-[14px] h-[19px]"
                      />
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-[18px] font-bold text-[#01091E] font-heading leading-normal">
                        {item.title}
                      </h3>
                      <p className="text-[12px] font-normal text-[#41474F] font-sans mt-0.5">
                        {item.subtitle || `${item.facility} • Date: ${item.date}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <div
                      className={`px-[10px] py-[4px] rounded-[12px] ${
                        item.statusBadge.label.toLowerCase().includes("recovered") ||
                        item.statusBadge.label.toLowerCase().includes("normal") ||
                        item.statusBadge.label.toLowerCase().includes("within") ||
                        item.statusBadge.label.toLowerCase().includes("no acute")
                          ? "bg-[#D0E4FF] text-[#02307D]"
                          : "bg-[#B3EBFF] text-[#02307D]"
                      }`}
                    >
                      <span className="text-[12px] font-bold leading-normal whitespace-nowrap">
                        {item.statusBadge.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Segmented Sub-indicators for Metrics if available */}
                {item.metrics && item.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-[4px] bg-[#F1F3FF] border border-[#E9EFFD]">
                    {item.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className="text-[11px] font-medium text-[#667085] uppercase">{m.label}</span>
                        <span className="text-[14px] font-bold text-[#01091E] mt-0.5">{m.value}</span>
                        <span className="text-[11px] font-semibold text-[#16734E]">{m.note || (m.isAbnormal ? "Flagged" : "Normal")}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Clinical Findings Box matching Figma Node 299:3935 */}
                {(item.findings || item.description) && (
                  <div className="bg-[#F1F3FF] rounded-[4px] p-[12px] text-[13px] text-[#41474F] leading-[1.55] flex flex-col">
                    {(item.findings || item.description)!.split("\n").map((line, idx) => (
                      <p key={idx} className="mb-0 leading-[1.55]">{line}</p>
                    ))}
                  </div>
                )}

                {/* Actions row: Figma Node 299:3937, 299:4219 & 299:4559 */}
                {activeTab === "radiology" ? (
                  <div className="flex flex-wrap items-center gap-[12px] pt-1" data-node-id="299:4219">
                    {item.dicomViewerUrl && (
                      <button
                        type="button"
                        onClick={() => onOpenDicom(item)}
                        className="bg-[#078BDE] hover:bg-[#0070C5] text-white px-[25px] py-[8px] rounded-[4px] text-[12px] font-medium transition-colors flex items-center gap-[6px] shadow-xs cursor-pointer"
                        data-node-id="299:4220"
                      >
                        <Image
                          src="/assets/records/dicom-eye.svg"
                          alt=""
                          width={13}
                          height={9}
                          unoptimized
                          className="w-[13px] h-[9px]"
                        />
                        <span>Open DICOM Viewer</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="border border-[#BFC7D3] bg-white text-[#01091E] hover:bg-slate-50 px-[13px] py-[7px] rounded-[4px] text-[12px] font-medium transition-colors flex items-center gap-[6px] cursor-pointer"
                      data-node-id="299:4225"
                    >
                      <Image
                        src="/assets/records/download-scan.svg"
                        alt=""
                        width={9}
                        height={9}
                        unoptimized
                        className="w-[9px] h-[9px]"
                      />
                      <span>Download Scan (42 MB)</span>
                    </button>
                  </div>
                ) : (activeTab === "history" || activeTab === "diagnoses") && item.pdfAvailable ? (
                  <div className="flex items-center gap-[8px] pt-1" data-node-id="299:3937">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="border border-[rgba(0,96,155,0.3)] rounded-[4px] px-[11px] py-[5px] text-[12px] font-medium text-[#02307D] hover:bg-slate-50 flex items-center gap-[4px] cursor-pointer"
                      data-node-id="299:3938"
                    >
                      <Image
                        src="/assets/records/card-pdf.svg"
                        alt=""
                        width={12}
                        height={12}
                        unoptimized
                        className="w-[11.67px] h-[11.67px]"
                      />
                      <span>PDF</span>
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
