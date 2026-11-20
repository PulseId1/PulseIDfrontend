"use client";

import React, { useState } from "react";
import { Pill, FlaskConical, Eye } from "lucide-react";
import { ReadonlyRecordModal, ReadonlyRecordItem } from "./readonly-record-modal";

export function PrescriptionsTestsTab() {
  const [selectedRecord, setSelectedRecord] = useState<ReadonlyRecordItem | null>(null);

  const prescriptions: ReadonlyRecordItem[] = [
    {
      id: "RX-0408-01",
      title: "Metformin • 500 mg tablet",
      status: "Active",
      type: "prescription",
      dosage: "1 tablet twice daily with meals",
      prescribedDate: "8 Apr 2026",
      duration: "Ongoing (6 months review)",
      relatedVisit: "VIS-0408",
      instructions:
        "Take with meals to minimize gastrointestinal discomfort. Continue regular fasting glucose monitoring. Do not discontinue without consulting your physician.",
      authorText: "Recorded by Dr. Laila Mostafa • Dar Al Fouad Hospital",
    },
    {
      id: "RX-1028-02",
      title: "Cholecalciferol (Vitamin D3) • 50,000 IU capsule",
      status: "Active",
      type: "prescription",
      dosage: "1 capsule weekly for 8 weeks",
      prescribedDate: "28 Oct 2026",
      duration: "8 weeks",
      relatedVisit: "VIS-1028",
      instructions:
        "Take once per week with the largest meal of the day containing healthy fats. Follow up with repeat serum 25-hydroxyvitamin D test upon completion.",
      authorText: "Recorded by Dr. Laila Mostafa • Dar Al Fouad Hospital",
    },
  ];

  const requests: ReadonlyRecordItem[] = [
    {
      id: "REQ-1028-01",
      title: "HbA1c blood test",
      status: "Pending",
      type: "test",
      requestType: "Laboratory Diagnostic Panel",
      prescribedDate: "28 Oct 2026",
      followUpDate: "Before 28 Jan 2027",
      relatedVisit: "VIS-1028",
      instructions:
        "Standard venous blood draw for Glycated Hemoglobin (HbA1c). Fasting is not strictly required. Please complete at least 3 days prior to your next scheduled clinic consultation.",
      authorText: "Recorded by Dr. Laila Mostafa • Dar Al Fouad Hospital",
    },
    {
      id: "REQ-1028-02",
      title: "Nutrition & dietetics referral",
      status: "Pending",
      type: "test",
      requestType: "Specialist Care Referral",
      prescribedDate: "28 Oct 2026",
      followUpDate: "Within 30 days",
      relatedVisit: "VIS-1028",
      instructions:
        "Referral to Clinical Nutrition department for medical nutrition therapy in Type 2 Diabetes management. Focus on low glycemic load meal planning.",
      authorText: "Recorded by Dr. Laila Mostafa • Dar Al Fouad Hospital",
    },
    {
      id: "REQ-0715-01",
      title: "Thyroid ultrasound",
      status: "Completed",
      type: "test",
      requestType: "Diagnostic Ultrasound Imaging",
      prescribedDate: "15 Jul 2026",
      followUpDate: "15 Jul 2027 (Annual)",
      relatedVisit: "VIS-0715",
      instructions:
        "High-resolution neck ultrasound focusing on the right thyroid lobe. Confirmed 1.1cm nodule with benign features (TI-RADS 2). Repeat in 1 year.",
      authorText: "Recorded by Dr. Laila Mostafa • Dar Al Fouad Hospital",
    },
  ];

  return (
    <div className="flex flex-col gap-[36px] text-left w-full">
      {/* SECTION 1: PRESCRIPTIONS (Figma Node 583:5935) */}
      <div className="flex flex-col gap-[20px] w-full" data-node-id="583:5935">
        <div className="flex items-start justify-between gap-[12px] min-h-[56px]" data-node-id="583:5936">
          <div className="flex items-start gap-[12px]">
            <div className="size-[23px] text-[#078BDE] shrink-0 mt-1">
              <Pill className="size-[23px]" />
            </div>
            <div className="flex flex-col gap-[6px] text-left">
              <h2 className="text-[24px] font-bold text-[#01091E] font-heading leading-[1.25]">
                Prescriptions
              </h2>
              <p className="text-[13px] font-normal text-[#41474F] font-sans leading-[1.5]">
                Active and completed medications authored by Dr. Laila Mostafa.
              </p>
            </div>
          </div>
          <div className="bg-[#EFF8FE] px-[12px] py-[5px] rounded-[100px] shrink-0">
            <span className="text-[13px] font-bold text-[#02307D] leading-normal">
              {prescriptions.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] w-full">
          {prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-white border border-[#D8DFEB] rounded-[8px] p-6 lg:p-[24px] shadow-[0px_3px_10px_0px_rgba(2,48,125,0.04)] flex flex-col justify-between gap-[16px] text-left w-full"
            >
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-[#667085]">
                    {rx.id}
                  </span>
                  <span className="bg-[#EAF7EF] text-[#16734E] text-[12px] font-semibold px-[10px] py-[3px] rounded-[100px]">
                    {rx.status}
                  </span>
                </div>

                <h3 className="text-[18px] font-bold text-[#01091E] font-heading leading-snug">
                  {rx.title}
                </h3>

                <div className="p-[12px] rounded-[6px] bg-[#F5F8FC] border border-[#D8DFEB]/60 flex flex-col gap-[4px]">
                  <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                    DOSAGE &amp; FREQUENCY
                  </span>
                  <span className="text-[12px] text-[#41474F] font-medium">
                    {rx.dosage}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[12px] text-[#667085] pt-1">
                  <span>Prescribed: {rx.prescribedDate}</span>
                  <span>Duration: {rx.duration}</span>
                </div>
              </div>

              <div className="pt-[16px] border-t border-[#D8DFEB] flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedRecord(rx)}
                  className="h-[36px] px-[16px] rounded-[6px] bg-[#EFF8FE] hover:bg-[#D8EDFA] text-[#02307D] text-[12px] font-bold transition-colors flex items-center gap-[6px] cursor-pointer"
                >
                  <Eye className="size-[14px]" />
                  View prescription
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: MEDICAL TESTS & REQUESTS (Figma Node 583:5989) */}
      <div className="flex flex-col gap-[20px] w-full" data-node-id="583:5989">
        <div className="flex items-start justify-between gap-[12px] min-h-[56px]">
          <div className="flex items-start gap-[12px]">
            <div className="size-[23px] text-[#078BDE] shrink-0 mt-1">
              <FlaskConical className="size-[23px]" />
            </div>
            <div className="flex flex-col gap-[6px] text-left">
              <h2 className="text-[24px] font-bold text-[#01091E] font-heading leading-[1.25]">
                Medical Tests &amp; Requests
              </h2>
              <p className="text-[13px] font-normal text-[#41474F] font-sans leading-[1.5]">
                Diagnostic laboratory work and clinical referrals ordered for your care plan.
              </p>
            </div>
          </div>
          <div className="bg-[#EFF8FE] px-[12px] py-[5px] rounded-[100px] shrink-0">
            <span className="text-[13px] font-bold text-[#02307D] leading-normal">
              {requests.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] w-full">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white border border-[#D8DFEB] rounded-[8px] p-6 lg:p-[24px] shadow-[0px_3px_10px_0px_rgba(2,48,125,0.04)] flex flex-col justify-between gap-[16px] text-left w-full"
            >
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-[#667085]">
                    {req.id}
                  </span>
                  <span
                    className={`text-[12px] font-semibold px-[10px] py-[3px] rounded-[100px] ${
                      req.status === "Pending"
                        ? "bg-[#FFF6DE] text-[#966000]"
                        : "bg-[#EAF7EF] text-[#16734E]"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <h3 className="text-[16px] font-bold text-[#01091E] font-heading leading-snug">
                  {req.title}
                </h3>

                <div className="p-[12px] rounded-[6px] bg-[#F5F8FC] border border-[#D8DFEB]/60 flex flex-col gap-[4px]">
                  <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                    REQUEST TYPE
                  </span>
                  <span className="text-[12px] text-[#41474F] font-medium">
                    {req.requestType}
                  </span>
                </div>

                <div className="flex flex-col gap-[2px] text-[11px] text-[#667085] pt-1">
                  <span>Ordered: {req.prescribedDate}</span>
                  <span>Follow-up: {req.followUpDate}</span>
                </div>
              </div>

              <div className="pt-[16px] border-t border-[#D8DFEB] flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedRecord(req)}
                  className="h-[36px] px-[16px] rounded-[6px] bg-[#EFF8FE] hover:bg-[#D8EDFA] text-[#02307D] text-[12px] font-bold transition-colors flex items-center gap-[6px] cursor-pointer"
                >
                  <Eye className="size-[14px]" />
                  View request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Read-Only Modal */}
      <ReadonlyRecordModal
        item={selectedRecord}
        isOpen={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
}
