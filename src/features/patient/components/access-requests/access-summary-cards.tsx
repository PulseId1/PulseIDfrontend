"use client";

import React from "react";
import { Clock3, ShieldCheck, History } from "lucide-react";

interface AccessSummaryCardsProps {
  readonly pendingCount: number;
  readonly activeCount: number;
  readonly historyCount: number;
}

export function AccessSummaryCards({
  pendingCount,
  activeCount,
  historyCount,
}: AccessSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-4 w-full" data-node-id="583:5053">
      {/* Card 1: Pending Requests (Figma Node 583:5054) */}
      <div className="bg-white border border-[#D0DEFF] rounded-[8px] p-[20px] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-[16px]">
          <div className="size-[44px] rounded-[12px] bg-[#F5F8FC] flex items-center justify-center text-[#02307D] shrink-0">
            <Clock3 className="size-[22px]" />
          </div>
          <div className="flex flex-col gap-[4px] text-left">
            <span className="text-[16px] font-bold text-[#02307D] font-heading leading-normal whitespace-nowrap">
              Pending Requests
            </span>
            <span className="text-[12px] font-normal text-[#667085] font-sans leading-[1.5]">
              Waiting for your decision
            </span>
          </div>
        </div>
        <span className="text-[28px] font-bold text-[#02307D] font-mono leading-normal ml-2">
          {String(pendingCount).padStart(2, "0")}
        </span>
      </div>

      {/* Card 2: Active Access (Figma Node 583:5062) */}
      <div className="bg-white border border-[#D0DEFF] rounded-[8px] p-[20px] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-[16px]">
          <div className="size-[44px] rounded-[12px] bg-[#F5F8FC] flex items-center justify-center text-[#02307D] shrink-0">
            <ShieldCheck className="size-[22px]" />
          </div>
          <div className="flex flex-col gap-[4px] text-left">
            <span className="text-[16px] font-bold text-[#02307D] font-heading leading-normal whitespace-nowrap">
              Active Access
            </span>
            <span className="text-[12px] font-normal text-[#667085] font-sans leading-[1.5]">
              Approved by you
            </span>
          </div>
        </div>
        <span className="text-[28px] font-bold text-[#02307D] font-mono leading-normal ml-2">
          {String(activeCount).padStart(2, "0")}
        </span>
      </div>

      {/* Card 3: Request History (Figma Node 583:5070) */}
      <div className="bg-white border border-[#D0DEFF] rounded-[8px] p-[20px] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-[16px]">
          <div className="size-[44px] rounded-[12px] bg-[#F5F8FC] flex items-center justify-center text-[#02307D] shrink-0">
            <History className="size-[22px]" />
          </div>
          <div className="flex flex-col gap-[4px] text-left">
            <span className="text-[16px] font-bold text-[#02307D] font-heading leading-normal whitespace-nowrap">
              Request History
            </span>
            <span className="text-[12px] font-normal text-[#667085] font-sans leading-[1.5]">
              Rejected or revoked
            </span>
          </div>
        </div>
        <span className="text-[28px] font-bold text-[#02307D] font-mono leading-normal ml-2">
          {String(historyCount).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
