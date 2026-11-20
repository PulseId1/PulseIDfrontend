"use client";

import React from "react";
import { CheckCircle2, Calendar, FileText, Lock } from "lucide-react";

export function ClinicalFollowupTab() {
  return (
    <div className="flex flex-col gap-[28px] text-left w-full" data-node-id="583:6260">
      {/* Section heading (Figma Node 583:6261) */}
      <div className="flex items-start justify-between gap-[12px] min-h-[56px]" data-node-id="583:6261">
        <div className="flex items-start gap-[12px]">
          <div className="size-[23px] text-[#078BDE] shrink-0 mt-1" data-node-id="583:6262">
            <CheckCircle2 className="size-[23px]" />
          </div>
          <div className="flex flex-col gap-[6px] text-left" data-node-id="583:6264">
            <h2 className="text-[24px] font-bold text-[#01091E] font-heading leading-[1.25]">
              Clinical Follow-up
            </h2>
            <p className="text-[13px] font-normal text-[#41474F] font-sans leading-[1.5]">
              Review upcoming steps, lifestyle recommendations, and historical care guidance.
            </p>
          </div>
        </div>
        <div className="bg-[#EFF8FE] px-[12px] py-[5px] rounded-[100px] shrink-0" data-node-id="583:6267">
          <span className="text-[13px] font-bold text-[#02307D] leading-normal">
            4
          </span>
        </div>
      </div>

      {/* Plan Cards 2-Columns (Figma Node 583:6269) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] w-full" data-node-id="583:6269">
        {/* Card Column 1: Recommended Next Steps (Figma Node 583:6270) */}
        <div className="bg-white border border-[#D8DFEB] rounded-[8px] p-6 lg:p-[24px] shadow-[0px_3px_10px_0px_rgba(2,48,125,0.04)] flex flex-col gap-[16px] text-left" data-node-id="583:6270">
          <div className="flex items-center gap-[10px] pb-3 border-b border-[#D8DFEB]">
            <Calendar className="size-[18px] text-[#078BDE]" />
            <h3 className="text-[16px] font-bold text-[#01091E] font-heading">
              Recommended Next Steps
            </h3>
          </div>

          <div className="flex flex-col gap-[12px]">
            {/* Step 1 */}
            <div className="p-[14px] rounded-[6px] bg-[#F5F8FC] border border-[#D8DFEB]/60 flex flex-col gap-[4px]" data-node-id="583:6272">
              <span className="text-[11px] font-bold text-[#02307D] uppercase tracking-wider">
                NEXT CLINIC CONSULTATION
              </span>
              <p className="text-[13px] font-semibold text-[#01091E]">
                28 Jan 2027 • 10:30 AM
              </p>
              <p className="text-[12px] text-[#41474F]">
                Endocrinology Outpatient Clinic, Dar Al Fouad Hospital. Bring current glucose log.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-[14px] rounded-[6px] bg-[#F5F8FC] border border-[#D8DFEB]/60 flex flex-col gap-[4px]" data-node-id="583:6276">
              <span className="text-[11px] font-bold text-[#966000] uppercase tracking-wider">
                PENDING LABORATORY TEST
              </span>
              <p className="text-[13px] font-semibold text-[#01091E]">
                Complete HbA1c Blood Panel
              </p>
              <p className="text-[12px] text-[#41474F]">
                Fasting venous draw ordered on 28 Oct 2026. Must be completed at least 3 days before next visit.
              </p>
            </div>
          </div>
        </div>

        {/* Card Column 2: Previous Follow-up Instructions (Figma Node 583:6280) */}
        <div className="bg-white border border-[#D8DFEB] rounded-[8px] p-6 lg:p-[24px] shadow-[0px_3px_10px_0px_rgba(2,48,125,0.04)] flex flex-col gap-[16px] text-left" data-node-id="583:6280">
          <div className="flex items-center gap-[10px] pb-3 border-b border-[#D8DFEB]">
            <FileText className="size-[18px] text-[#078BDE]" />
            <h3 className="text-[16px] font-bold text-[#01091E] font-heading">
              Previous Follow-up Instructions
            </h3>
          </div>

          <div className="flex flex-col gap-[12px]">
            {/* Instruction 1 */}
            <div className="p-[14px] rounded-[6px] bg-[#F5F8FC] border border-[#D8DFEB]/60 flex flex-col gap-[4px]" data-node-id="583:6282">
              <span className="text-[11px] font-bold text-[#02307D] uppercase tracking-wider">
                DAILY GLUCOSE MONITORING
              </span>
              <p className="text-[13px] font-semibold text-[#01091E]">
                Log fasting glucose 3 mornings per week
              </p>
              <p className="text-[12px] text-[#41474F]">
                Target fasting range: 90–130 mg/dL. Contact clinic if consecutive readings exceed 180 mg/dL.
              </p>
            </div>

            {/* Instruction 2 */}
            <div className="p-[14px] rounded-[6px] bg-[#F5F8FC] border border-[#D8DFEB]/60 flex flex-col gap-[4px]" data-node-id="583:6286">
              <span className="text-[11px] font-bold text-[#16734E] uppercase tracking-wider">
                ANNUAL THYROID OBSERVATION
              </span>
              <p className="text-[13px] font-semibold text-[#01091E]">
                Ultrasound surveillance in Jul 2027
              </p>
              <p className="text-[12px] text-[#41474F]">
                Nodule remains stable and asymptomatic. Continue annual observation with TSH and ultrasound.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Record Provenance Notice (Figma Node 583:6290) */}
      <div
        className="p-[16px] rounded-[8px] bg-[#EFF8FE] border border-[#BAE6FD] flex items-start gap-[12px] text-left"
        data-node-id="583:6290"
      >
        <div className="size-[20px] text-[#02307D] shrink-0 mt-0.5" data-node-id="583:6291">
          <Lock className="size-[20px]" />
        </div>
        <div className="flex flex-col gap-[3px] text-left" data-node-id="583:6293">
          <span className="text-[13px] font-semibold text-[#02307D]">
            Source and correction guidance
          </span>
          <p className="text-[12px] text-[#41474F] leading-[1.5]">
            These clinical records are anchored cryptographically to PulseID and authored by Dr. Laila Mostafa. To request a correction or update to clinical notes, contact the clinic directly at +20 2 3824 7200.
          </p>
        </div>
      </div>
    </div>
  );
}
