"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AccessRequestItem } from "@/lib/api/types";
import { ShieldCheck, X, Eye, Clock3, Check } from "lucide-react";

interface ReviewApproveModalProps {
  readonly request: AccessRequestItem | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}

/**
 * Review & Approve Access Modal
 * EXACT implementation of Figma Node 583:5341 (600px wide, authentic layout, icons & typography)
 */
export function ReviewApproveModal({
  request,
  isOpen,
  onClose,
  onConfirm,
}: ReviewApproveModalProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!isOpen || !request) return null;

  const initials =
    request.doctorName
      ?.split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(-2)
      .join("") || "DR";

  const doctorShortName = request.doctorName.startsWith("Dr. ")
    ? request.doctorName.split(" ").slice(0, 2).join(" ")
    : request.doctorName;

  return (
    <div
      className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6 overflow-y-auto custom-scrollbar pt-6 sm:pt-10 pb-8 sm:pb-12"
      style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
    >
      <div
        className="relative w-full max-w-[600px] bg-white rounded-[16px] p-[24px] sm:p-[32px] shadow-[0px_3px_10px_0px_rgba(2,48,125,0.04)] border border-[#D8DFEB] text-left flex flex-col gap-[24px] animate-in fade-in zoom-in-95 duration-200"
        data-node-id="583:5341"
        data-name="Review and approve access"
      >
        {/* Dialog Header (Figma Node 583:5342) */}
        <div className="flex flex-col gap-[16px] items-start w-full" data-node-id="583:5342" data-name="Dialog header">
          <div className="flex items-center justify-between w-full" data-node-id="583:5343" data-name="Dialog controls">
            <div className="bg-[#EFF8FE] flex items-center justify-center rounded-[12px] size-[48px] shrink-0" data-node-id="583:5344" data-name="Purpose icon">
              <ShieldCheck className="size-[24px] text-[#078BDE]" data-node-id="583:5345" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="size-[28px] rounded-md flex items-center justify-center text-[#667085] hover:text-[#01091E] hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="583:5347"
              aria-label="Close dialog"
            >
              <X className="size-[20px]" />
            </button>
          </div>
          <div className="flex flex-col gap-[8px] items-start w-full" data-node-id="583:5349" data-name="Dialog introduction">
            <h3 className="font-heading font-bold text-[24px] sm:text-[26px] leading-[1.25] text-[#01091E] w-full" data-node-id="583:5350">
              Review &amp; Approve Access
            </h3>
            <p className="font-sans font-normal text-[14px] leading-[1.5] text-[#41474F] w-full" data-node-id="583:5351">
              Check exactly what you&apos;ll share with {request.doctorName} before giving permission.
            </p>
          </div>
        </div>

        {/* Request Summary (Figma Node 583:5352) */}
        <div className="bg-[#F5F8FC] flex flex-col gap-[16px] items-start p-[16px] rounded-[8px] w-full border border-[#E9EFF8]" data-node-id="583:5352" data-name="Request summary">
          <div className="flex gap-[12px] items-center w-full" data-node-id="583:5353" data-name="Doctor profile">
            <div className="rounded-[100px] size-[52px] relative overflow-hidden bg-[#EBF5FF] border border-[#D8DFEB] shrink-0 flex items-center justify-center" data-node-id="583:5354" data-name="Profile photo">
              {!imgFailed ? (
                <Image
                  src={request.avatarUrl || "/assets/doctor/dr-sara-ahmed.png"}
                  alt={request.doctorName}
                  fill
                  unoptimized
                  className="object-cover"
                  onError={() => setImgFailed(true)}
                />
              ) : null}
              {imgFailed && (
                <span className="text-sm font-bold text-[#078BDE] select-none">
                  {initials}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-[2px] items-start" data-node-id="583:5355" data-name="Professional identity">
              <p className="font-heading font-bold text-[18px] text-[#01091E] leading-normal" data-node-id="583:5356">
                {request.doctorName}
              </p>
              <p className="font-sans font-normal text-[12px] text-[#41474F] leading-normal" data-node-id="583:5357">
                {request.doctorSpecialty}
              </p>
              <p className="font-sans font-normal text-[12px] text-[#667085] leading-normal" data-node-id="583:5358">
                {request.hospitalClinic}
              </p>
            </div>
          </div>
          <div className="flex items-start justify-between w-full" data-node-id="583:5359" data-name="Request state">
            <div className="bg-[#EFF8FE] flex gap-[5px] items-center px-[9px] py-[5px] rounded-[4px]" data-node-id="583:5360" data-name="Permission">
              <Eye className="size-[14px] text-[#02307D]" data-node-id="583:5361" />
              <p className="font-sans font-semibold text-[12px] text-[#02307D] whitespace-nowrap leading-normal" data-node-id="583:5363">
                {request.permissionLevel || "View permission"}
              </p>
            </div>
            <div className="bg-[#FFF6DE] flex gap-[5px] items-center px-[10px] py-[5px] rounded-[100px]" data-node-id="583:5364" data-name="Request status">
              <Clock3 className="size-[13px] text-[#966000]" data-node-id="583:5365" />
              <p className="font-sans font-semibold text-[12px] text-[#966000] whitespace-nowrap leading-normal" data-node-id="583:5367">
                Pending
              </p>
            </div>
          </div>
          <p className="font-sans font-normal text-[12px] leading-[1.5] text-[#667085] w-full" data-node-id="583:5368">
            {request.requestId} · Requested {request.requestedDate || "3 Nov 2026"} · Patient: Ahmed Hassan
          </p>
        </div>

        {/* Reason (Figma Node 583:5369) */}
        <div className="flex flex-col gap-[4px] items-start leading-[1.5] w-full" data-node-id="583:5369" data-name="Reason">
          <p className="font-sans font-semibold text-[12px] text-[#667085] w-full uppercase tracking-wider" data-node-id="583:5370">
            ACCESS REASON
          </p>
          <p className="font-sans font-normal text-[13px] text-[#01091E] w-full" data-node-id="583:5371">
            {request.reasonForAccess || "Review cardiac risk factors before your cardiology consultation."}
          </p>
        </div>

        {/* Exact Sharing Scope (Figma Node 583:5372) */}
        <div className="flex flex-col gap-[12px] items-start w-full" data-node-id="583:5372" data-name="Exact sharing scope">
          <p className="font-heading font-bold text-[18px] leading-[1.25] text-[#01091E] w-full" data-node-id="583:5373">
            Information you will share
          </p>
          <p className="font-sans font-normal text-[12px] leading-[1.5] text-[#667085] w-full" data-node-id="583:5374">
            Only the 5 records listed below. Other records and future uploads are not included.
          </p>

          {/* Included Category 1: Medical History (Figma Node 583:5375) */}
          <div className="border border-[#D8DFEB] flex gap-[12px] items-start p-[14px] rounded-[8px] w-full bg-white shadow-xs" data-node-id="583:5375" data-name="Included category">
            <div className="size-[18px] rounded-full bg-[#078BDE] text-white flex items-center justify-center shrink-0 mt-0.5" data-node-id="583:5376">
              <Check className="size-[12px] stroke-[3]" />
            </div>
            <div className="flex flex-1 flex-col gap-[5px] items-start" data-node-id="583:5378" data-name="Included records">
              <div className="flex items-start justify-between w-full whitespace-nowrap leading-normal" data-node-id="583:5379" data-name="Category summary">
                <p className="font-sans font-bold text-[13px] text-[#02307D]" data-node-id="583:5380">
                  Medical History
                </p>
                <p className="font-sans font-normal text-[11px] text-[#667085]" data-node-id="583:5381">
                  2 records
                </p>
              </div>
              <div className="font-sans font-normal text-[12px] text-[#41474F] leading-[1.5] flex flex-col" data-node-id="583:5382">
                <p className="mb-0">Pneumonia · 12 Mar 2024</p>
                <p>Concussion · 6 Sep 2023</p>
              </div>
            </div>
          </div>

          {/* Included Category 2: Lab Tests (Figma Node 583:5383) */}
          <div className="border border-[#D8DFEB] flex gap-[12px] items-start p-[14px] rounded-[8px] w-full bg-white shadow-xs" data-node-id="583:5383" data-name="Included category">
            <div className="size-[18px] rounded-full bg-[#078BDE] text-white flex items-center justify-center shrink-0 mt-0.5" data-node-id="583:5384">
              <Check className="size-[12px] stroke-[3]" />
            </div>
            <div className="flex flex-1 flex-col gap-[5px] items-start" data-node-id="583:5386" data-name="Included records">
              <div className="flex items-start justify-between w-full whitespace-nowrap leading-normal" data-node-id="583:5387" data-name="Category summary">
                <p className="font-sans font-bold text-[13px] text-[#02307D]" data-node-id="583:5388">
                  Lab Tests
                </p>
                <p className="font-sans font-normal text-[11px] text-[#667085]" data-node-id="583:5389">
                  2 results
                </p>
              </div>
              <div className="font-sans font-normal text-[12px] text-[#41474F] leading-[1.5] flex flex-col" data-node-id="583:5390">
                <p className="mb-0">Fasting Blood Glucose · 14 Aug 2024</p>
                <p>Comprehensive Lipid Panel · 14 Aug 2024</p>
              </div>
            </div>
          </div>

          <p className="font-sans font-normal text-[12px] leading-[1.5] text-[#667085] w-full" data-node-id="583:5391">
            Not shared: Prescriptions, radiology, other medical records, or your Pulse ID biometric data.
          </p>
        </div>

        {/* Patient Control Notice (Figma Node 583:5392) */}
        <div className="bg-[#EFF8FE] flex gap-[12px] items-start p-[16px] rounded-[8px] w-full border border-[#D0DEFF]" data-node-id="583:5392" data-name="Patient control notice">
          <ShieldCheck className="size-[20px] text-[#078BDE] shrink-0 mt-0.5" data-node-id="583:5393" />
          <div className="flex flex-1 flex-col gap-[4px] items-start leading-[1.5]" data-node-id="583:5395" data-name="Notice content">
            <p className="font-sans font-semibold text-[13px] text-[#02307D] w-full" data-node-id="583:5396">
              View only · Ends 10 Nov 2026, 11:59 PM (Cairo)
            </p>
            <p className="font-sans font-normal text-[12px] text-[#41474F] w-full" data-node-id="583:5397">
              {doctorShortName} can read these records, but cannot edit them. Access begins when you approve. You can revoke it earlier from Active Access.
            </p>
          </div>
        </div>

        {/* Approval Actions (Figma Node 583:5398) */}
        <div className="border-t border-[#D8DFEB] flex flex-col gap-[16px] items-start pt-[20px] w-full" data-node-id="583:5398" data-name="Approval actions">
          <p className="font-sans font-normal text-[12px] leading-[1.5] text-[#41474F] w-full" data-node-id="583:5399">
            By approving, you allow {request.doctorName} to view only the information listed above until the stated expiration.
          </p>
          <div className="flex items-center justify-between w-full" data-node-id="583:5400" data-name="Confirm or cancel">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-[#D0DEFF] flex h-[40px] items-center justify-center px-[16px] rounded-[8px] text-[13px] font-bold text-[#02307D] hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
              data-node-id="583:5401"
              data-name="Action"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="bg-[#078BDE] hover:bg-[#0677BE] border border-transparent flex gap-[8px] h-[40px] items-center justify-center px-[16px] rounded-[8px] text-[13px] font-bold text-white transition-colors cursor-pointer shadow-sm"
              data-node-id="583:5403"
              data-name="Action"
            >
              <Check className="size-[16px]" data-node-id="583:5404" />
              <span>Approve Access</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
