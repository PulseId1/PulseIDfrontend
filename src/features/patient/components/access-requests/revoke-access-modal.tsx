"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AccessRequestItem } from "@/lib/api/types";
import { ShieldOff, X, Eye, Check, AlertTriangle } from "lucide-react";

interface RevokeAccessModalProps {
  readonly request: AccessRequestItem | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}

/**
 * Revoke Access Confirmation Modal
 * EXACT implementation of Figma Node 583:5457 (600px wide, authentic layout, icons & typography)
 */
export function RevokeAccessModal({
  request,
  isOpen,
  onClose,
  onConfirm,
}: RevokeAccessModalProps) {
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
        data-node-id="583:5457"
        data-name="Revoke access confirmation"
      >
        {/* Dialog Header (Figma Node 583:5458) */}
        <div className="flex flex-col gap-[16px] items-start w-full" data-node-id="583:5458" data-name="Dialog header">
          <div className="flex items-center justify-between w-full" data-node-id="583:5459" data-name="Dialog controls">
            <div className="bg-[#FFF0F0] flex items-center justify-center rounded-[12px] size-[48px] shrink-0" data-node-id="583:5460" data-name="Purpose icon">
              <ShieldOff className="size-[24px] text-[#B93838]" data-node-id="583:5461" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="size-[28px] rounded-md flex items-center justify-center text-[#667085] hover:text-[#01091E] hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="583:5463"
              aria-label="Close dialog"
            >
              <X className="size-[20px]" />
            </button>
          </div>
          <div className="flex flex-col gap-[8px] items-start w-full" data-node-id="583:5465" data-name="Dialog introduction">
            <h3 className="font-heading font-bold text-[24px] sm:text-[26px] leading-[1.25] text-[#01091E] w-full" data-node-id="583:5466">
              Revoke {doctorShortName}&apos;s access?
            </h3>
            <p className="font-sans font-normal text-[14px] leading-[1.5] text-[#41474F] w-full" data-node-id="583:5467">
              End this doctor&apos;s permission to view your shared health information.
            </p>
          </div>
        </div>

        {/* Request Summary (Figma Node 583:5468) */}
        <div className="bg-[#F5F8FC] flex flex-col gap-[16px] items-start p-[16px] rounded-[8px] w-full border border-[#E9EFF8]" data-node-id="583:5468" data-name="Request summary">
          <div className="flex gap-[12px] items-center w-full" data-node-id="583:5469" data-name="Doctor profile">
            <div className="rounded-[100px] size-[52px] relative overflow-hidden bg-[#EFF6FF] border border-[#D8DFEB] shrink-0 flex items-center justify-center" data-node-id="583:5470" data-name="Profile photo">
              {!imgFailed ? (
                <Image
                  src={request.avatarUrl || "/assets/doctor/dr-laila-mostafa.png"}
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
            <div className="flex flex-1 flex-col gap-[2px] items-start" data-node-id="583:5471" data-name="Professional identity">
              <p className="font-heading font-bold text-[18px] text-[#01091E] leading-normal" data-node-id="583:5472">
                {request.doctorName}
              </p>
              <p className="font-sans font-normal text-[12px] text-[#41474F] leading-normal" data-node-id="583:5473">
                {request.doctorSpecialty}
              </p>
              <p className="font-sans font-normal text-[12px] text-[#667085] leading-normal" data-node-id="583:5474">
                {request.hospitalClinic}
              </p>
            </div>
          </div>
          <div className="flex items-start justify-between w-full" data-node-id="583:5475" data-name="Request state">
            <div className="bg-[#EFF8FE] flex gap-[5px] items-center px-[9px] py-[5px] rounded-[4px]" data-node-id="583:5476" data-name="Permission">
              <Eye className="size-[14px] text-[#02307D]" data-node-id="583:5477" />
              <p className="font-sans font-semibold text-[12px] text-[#02307D] whitespace-nowrap leading-normal" data-node-id="583:5479">
                {request.permissionLevel || "View permission"}
              </p>
            </div>
            <div className="bg-[#EAF7EF] flex gap-[5px] items-center px-[10px] py-[5px] rounded-[100px]" data-node-id="583:5480" data-name="Request status">
              <Check className="size-[13px] text-[#16734E]" data-node-id="583:5481" />
              <p className="font-sans font-semibold text-[12px] text-[#16734E] whitespace-nowrap leading-normal" data-node-id="583:5483">
                Active
              </p>
            </div>
          </div>
          <p className="font-sans font-normal text-[12px] leading-[1.5] text-[#667085] w-full" data-node-id="583:5484">
            {request.requestId} · Approved {request.requestedDate || "8 Apr 2026"} · Patient: Ahmed Hassan
          </p>
        </div>

        {/* Active Sharing Scope (Figma Node 583:5485) */}
        <div className="flex flex-col gap-[8px] items-start leading-[1.5] w-full" data-node-id="583:5485" data-name="Active sharing scope">
          <p className="font-heading font-bold text-[14px] text-[#01091E] w-full" data-node-id="583:5486">
            Active sharing scope
          </p>
          <p className="font-sans font-normal text-[12px] text-[#667085] w-full" data-node-id="583:5487">
            Access will end for all 4 currently shared categories:
          </p>
          <div className="flex flex-wrap items-center gap-[6px] w-full" data-node-id="583:5488">
            <span className="bg-[#F0F2F6] px-[8px] py-[3px] rounded-[4px] text-[12px] font-semibold text-[#02307D]" data-node-id="583:5489">
              Medical History
            </span>
            <span className="bg-[#F0F2F6] px-[8px] py-[3px] rounded-[4px] text-[12px] font-semibold text-[#02307D]" data-node-id="583:5491">
              Lab Tests
            </span>
            <span className="bg-[#F0F2F6] px-[8px] py-[3px] rounded-[4px] text-[12px] font-semibold text-[#02307D]" data-node-id="583:5493">
              Prescriptions
            </span>
            <span className="bg-[#F0F2F6] px-[8px] py-[3px] rounded-[4px] text-[12px] font-semibold text-[#02307D]" data-node-id="583:5495">
              Diagnoses
            </span>
          </div>
          <p className="font-sans font-normal text-[12px] text-[#667085] w-full" data-node-id="583:5497">
            Reason: {request.reasonForAccess || "Monitor glucose levels and review your current treatment plan."}
          </p>
        </div>

        {/* Patient Control Notice (Figma Node 583:5498) */}
        <div className="bg-[#FFF0F0] flex gap-[12px] items-start p-[16px] rounded-[8px] w-full border border-[#FFDADA]" data-node-id="583:5498" data-name="Patient control notice">
          <AlertTriangle className="size-[20px] text-[#B93838] shrink-0 mt-0.5" data-node-id="583:5499" />
          <div className="flex flex-1 flex-col gap-[4px] items-start leading-[1.5]" data-node-id="583:5501" data-name="Notice content">
            <p className="font-sans font-semibold text-[13px] text-[#B93838] w-full" data-node-id="583:5502">
              Access stops immediately
            </p>
            <p className="font-sans font-normal text-[12px] text-[#41474F] w-full" data-node-id="583:5503">
              {doctorShortName} will no longer be able to open these records through Pulse ID. The request will be marked Revoked in your history, and she will be notified.
            </p>
          </div>
        </div>

        <p className="font-sans font-normal text-[13px] leading-[1.5] text-[#01091E] w-full" data-node-id="583:5504">
          Revoking access does not remove copies already downloaded or information already used in your care. New access will require a new request and your approval.
        </p>

        {/* Confirmation Actions (Figma Node 583:5505) */}
        <div className="border-t border-[#D8DFEB] flex items-center justify-between pt-[20px] w-full" data-node-id="583:5505" data-name="Confirm or cancel">
          <button
            type="button"
            onClick={onClose}
            className="bg-white border border-[#D0DEFF] flex h-[40px] items-center justify-center px-[16px] rounded-[8px] text-[13px] font-bold text-[#02307D] hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            data-node-id="583:5506"
            data-name="Action"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-[#B93838] hover:bg-[#A32F2F] border border-transparent flex gap-[8px] h-[40px] items-center justify-center px-[16px] rounded-[8px] text-[13px] font-bold text-white transition-colors cursor-pointer shadow-sm"
            data-node-id="583:5508"
            data-name="Action"
          >
            <ShieldOff className="size-[16px]" data-node-id="583:5509" />
            <span>Revoke Access</span>
          </button>
        </div>
      </div>
    </div>
  );
}
