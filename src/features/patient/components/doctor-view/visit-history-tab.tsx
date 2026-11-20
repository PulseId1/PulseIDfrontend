"use client";

import React from "react";
import { History, Calendar } from "lucide-react";

export function VisitHistoryTab() {
  const visits = [
    {
      id: "VIS-1028",
      date: "28 Oct 2026",
      type: "In-person follow-up",
      symptoms: "Periodic morning fatigue, elevated post-prandial blood glucose.",
      diagnosis: "Type 2 Diabetes Mellitus • Routine monitoring",
      clinicalNotes:
        "HbA1c levels remain elevated at 7.2%. Adjusted Metformin dosage to 500mg BID. Recommended dietary referral.",
      recommendations: "Repeat HbA1c in 3 months. Schedule dietary consultation.",
      nextAppointment: "28 Jan 2027 • 10:30 AM",
      status: "Upcoming Follow-up",
    },
    {
      id: "VIS-0715",
      date: "15 Jul 2026",
      type: "In-person follow-up",
      symptoms: "Mild neck swelling, routine annual wellness review.",
      diagnosis: "Thyroid Nodule Assessment • Benign appearance",
      clinicalNotes:
        "Thyroid ultrasound confirmed stable 1.1cm nodule. TSH within normal limits. Continue annual observation.",
      recommendations: "Annual routine endocrine check. Re-check ultrasound in 12 months.",
      nextAppointment: "Completed",
      status: "Completed",
    },
    {
      id: "VIS-0408",
      date: "8 Apr 2026",
      type: "Initial consultation",
      symptoms: "Initial referral from General Practice for metabolic assessment.",
      diagnosis: "Pre-diabetes / Early Type 2 Diabetes",
      clinicalNotes:
        "Initiated lifestyle modifications and baseline metabolic panel. Patient educated on carb counting and medication titration.",
      recommendations: "Follow up in 3 months with repeat labs and fasting blood sugar diary.",
      nextAppointment: "Completed",
      status: "Completed",
    },
  ];

  return (
    <div className="flex flex-col gap-[20px] text-left w-full" data-node-id="583:5639">
      {/* Section heading matching Figma Node 583:5640 */}
      <div className="flex items-start justify-between gap-[12px] min-h-[56px]" data-node-id="583:5640">
        <div className="flex items-start gap-[12px]">
          <div className="size-[23px] text-[#078BDE] shrink-0 mt-1" data-node-id="583:5641">
            <History className="size-[23px]" />
          </div>
          <div className="flex flex-col gap-[6px] text-left" data-node-id="583:5643">
            <h2 className="text-[24px] font-bold text-[#01091E] font-heading leading-[1.25]">
              Visit History
            </h2>
            <p className="text-[13px] font-normal text-[#41474F] font-sans leading-[1.5]">
              A chronological record of every in-person consultation and clinical follow-up.
            </p>
          </div>
        </div>
        <div className="bg-[#EFF8FE] px-[12px] py-[5px] rounded-[100px] shrink-0" data-node-id="583:5646">
          <span className="text-[13px] font-bold text-[#02307D] leading-normal">
            {visits.length}
          </span>
        </div>
      </div>

      {/* Chronological Visit Timeline (Figma Node 583:5648) */}
      <div className="flex flex-col gap-[20px] w-full" data-node-id="583:5648">
        {visits.map((v, idx) => (
          <div
            key={v.id}
            className="bg-white border border-[#D8DFEB] rounded-[8px] p-6 lg:p-[24px] shadow-[0px_3px_10px_0px_rgba(2,48,125,0.04)] flex flex-col gap-[16px] text-left w-full"
            data-node-id={`583:${5649 + idx * 29}`}
          >
            {/* Header: Date + Badge + Ref ID */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#D8DFEB]">
              <div className="flex items-center gap-[12px]">
                <span className="text-[16px] font-bold text-[#01091E] font-heading">
                  {v.date}
                </span>
                <span className="bg-[#EFF8FE] text-[#02307D] text-[12px] font-semibold px-[10px] py-[3px] rounded-[100px]">
                  {v.type}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#667085] font-medium">
                {v.id}
              </span>
            </div>

            {/* Symptoms & Diagnosis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              <div className="flex flex-col gap-[3px]">
                <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider font-sans">
                  RECORDED SYMPTOMS
                </span>
                <p className="text-[13px] text-[#41474F] font-normal leading-[1.5]">
                  {v.symptoms}
                </p>
              </div>

              <div className="flex flex-col gap-[3px]">
                <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider font-sans">
                  DIAGNOSIS
                </span>
                <p className="text-[13px] text-[#01091E] font-semibold leading-[1.5]">
                  {v.diagnosis}
                </p>
              </div>
            </div>

            {/* Clinical Notes */}
            <div className="flex flex-col gap-[3px] bg-[#F5F8FC] p-[14px] rounded-[6px] border border-[#D8DFEB]/60">
              <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider font-sans">
                CLINICAL NOTES
              </span>
              <p className="text-[13px] text-[#41474F] font-normal leading-[1.6]">
                {v.clinicalNotes}
              </p>
            </div>

            {/* Recommendations & Next Appointment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] pt-1">
              <div className="flex flex-col gap-[3px]">
                <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider font-sans">
                  FOLLOW-UP RECOMMENDATIONS
                </span>
                <p className="text-[13px] text-[#41474F] font-normal leading-[1.5]">
                  {v.recommendations}
                </p>
              </div>

              <div className="flex flex-col gap-[3px]">
                <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider font-sans">
                  NEXT APPOINTMENT
                </span>
                <div className="flex items-center gap-[6px] text-[13px] font-semibold text-[#02307D]">
                  <Calendar className="size-[14px] text-[#078BDE]" />
                  <span>{v.nextAppointment}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
