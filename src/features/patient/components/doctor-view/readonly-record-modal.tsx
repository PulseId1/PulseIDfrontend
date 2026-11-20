"use client";

import React from "react";
import { Eye, X, ShieldAlert } from "lucide-react";

export interface ReadonlyRecordItem {
  id: string;
  title: string;
  status: "Active" | "Pending" | "Completed";
  type: "prescription" | "test";
  dosage?: string;
  prescribedDate?: string;
  duration?: string;
  relatedVisit?: string;
  requestType?: string;
  followUpDate?: string;
  instructions: string;
  authorText: string;
}

interface ReadonlyRecordModalProps {
  item: ReadonlyRecordItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReadonlyRecordModal({
  item,
  isOpen,
  onClose,
}: ReadonlyRecordModalProps) {
  if (!isOpen || !item) return null;

  const isPrescription = item.type === "prescription";

  return (
    <div
      className="fixed inset-0 z-[150] bg-slate-900/60 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6 overflow-y-auto custom-scrollbar pt-16 sm:pt-20 pb-12"
      style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
    >
      <div
        className="relative w-full max-w-[560px] bg-white rounded-[16px] p-6 sm:p-[28px] shadow-2xl border border-[#D8DFEB] animate-in fade-in zoom-in-95 duration-200 my-auto text-left flex flex-col gap-[20px]"
        data-node-id="583:6370"
      >
        {/* Top Header: Badge + Close */}
        <div className="flex items-center justify-between">
          <div className="bg-[#EFF8FE] px-[10px] py-[4px] rounded-[4px] flex items-center gap-[6px]">
            <ShieldAlert className="size-[14px] text-[#02307D]" />
            <span className="text-[11px] font-bold text-[#02307D] tracking-wider uppercase">
              CLINICAL RECORD • READ ONLY
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-[32px] rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="size-[18px]" />
          </button>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-[8px]">
          <h2 className="text-[22px] sm:text-[24px] font-bold text-[#01091E] font-heading leading-snug">
            {item.title}
          </h2>

          <div className="flex items-center gap-[12px]">
            <span className="text-[13px] font-mono font-medium text-[#41474F]">
              {item.id}
            </span>
            <span
              className={`px-[10px] py-[2px] rounded-[100px] text-[12px] font-semibold ${
                item.status === "Active"
                  ? "bg-[#EAF7EF] text-[#16734E]"
                  : item.status === "Pending"
                  ? "bg-[#FFF6DE] text-[#966000]"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {item.status}
            </span>
          </div>
        </div>

        {/* 4 Metadata Grid (Figma Node 583:6377) */}
        <div className="grid grid-cols-2 gap-[16px] p-[16px] rounded-[8px] bg-[#F5F8FC] border border-[#D8DFEB]">
          {isPrescription ? (
            <>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                  DOSAGE &amp; FREQUENCY
                </span>
                <span className="text-[12px] font-semibold text-[#01091E]">
                  {item.dosage || "1 tablet twice daily"}
                </span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                  PRESCRIPTION DATE
                </span>
                <span className="text-[12px] font-semibold text-[#01091E]">
                  {item.prescribedDate || "8 Apr 2026"}
                </span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                  DURATION
                </span>
                <span className="text-[12px] font-semibold text-[#01091E]">
                  {item.duration || "Ongoing"}
                </span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                  RELATED VISIT
                </span>
                <span className="text-[12px] font-semibold text-[#01091E]">
                  {item.relatedVisit || "VIS-0408"}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                  REQUEST TYPE
                </span>
                <span className="text-[12px] font-semibold text-[#01091E]">
                  {item.requestType || "Laboratory Test"}
                </span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                  REQUEST DATE
                </span>
                <span className="text-[12px] font-semibold text-[#01091E]">
                  {item.prescribedDate || "28 Oct 2026"}
                </span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                  FOLLOW-UP DATE
                </span>
                <span className="text-[12px] font-semibold text-[#01091E]">
                  {item.followUpDate || "Before next visit"}
                </span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                  RELATED VISIT
                </span>
                <span className="text-[12px] font-semibold text-[#01091E]">
                  {item.relatedVisit || "VIS-1028"}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Clinical instructions box (Figma Node 583:6390) */}
        <div className="flex flex-col gap-[6px]">
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
            CLINICAL INSTRUCTIONS
          </span>
          <p className="text-[13px] text-[#41474F] leading-[1.6] bg-slate-50 p-[14px] rounded-[8px] border border-slate-100">
            {item.instructions}
          </p>
        </div>

        {/* Provenance note */}
        <div className="flex flex-col gap-[4px] pt-1 text-[12px] text-[#667085]">
          <p className="font-medium text-[#02307D]">{item.authorText}</p>
          <p className="text-[11px] text-slate-400">
            This record cannot be edited or deleted in the Patient App. It represents an authenticated clinical order from the treating provider.
          </p>
        </div>

        {/* Close button (Figma Node 583:6395) */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-[40px] px-[20px] rounded-[8px] bg-[#078BDE] hover:bg-[#0070C5] text-white text-[13px] font-bold transition-colors flex items-center justify-center gap-[8px] cursor-pointer shadow-xs"
          >
            <Eye className="size-[16px]" />
            Close record
          </button>
        </div>
      </div>
    </div>
  );
}
