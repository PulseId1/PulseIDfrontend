"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AccessRequestItem } from "@/lib/api/types";
import { ShieldOff, X, Pencil, Clock3, AlertTriangle } from "lucide-react";

interface RejectRequestModalProps {
  readonly request: AccessRequestItem | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}

/**
 * Reject Request Confirmation Modal
 * EXACT implementation of Figma Node 583:5407 (600px wide, authentic layout, icons & typography)
 */
export function RejectRequestModal({
  request,
  isOpen,
  onClose,
  onConfirm,
}: RejectRequestModalProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!isOpen || !request) return null;

  const initials =
    request.doctorName
      ?.split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(-2)
      .join("") || "DR";

  const isEdit = request.permissionLevel?.toLowerCase().includes("edit");

  return (
    <div
      className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6 overflow-y-auto custom-scrollbar pt-6 sm:pt-10 pb-8 sm:pb-12"
      style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
    >
      <div
        className="relative w-full max-w-[600px] bg-white rounded-[16px] p-[24px] sm:p-[32px] shadow-[0px_3px_10px_0px_rgba(2,48,125,0.04)] border border-[#D8DFEB] text-left flex flex-col gap-[24px] animate-in fade-in zoom-in-95 duration-200"
        data-node-id="583:5407"
        data-name="Reject request confirmation"
      >
        {/* Dialog Header (Figma Node 583:5408) */}
        <div className="flex flex-col gap-[16px] items-start w-full" data-node-id="583:5408" data-name="Dialog header">
          <div className="flex items-center justify-between w-full" data-node-id="583:5409" data-name="Dialog controls">
            <div className="bg-[#FFF0F0] flex items-center justify-center rounded-[12px] size-[48px] shrink-0" data-node-id="583:5410" data-name="Purpose icon">
              <ShieldOff className="size-[24px] text-[#B93838]" data-node-id="583:5411" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="size-[28px] rounded-md flex items-center justify-center text-[#667085] hover:text-[#01091E] hover:bg-slate-100 transition-colors cursor-pointer"
              data-node-id="583:5413"
              aria-label="Close dialog"
            >
              <X className="size-[20px]" />
            </button>
          </div>
          <div className="flex flex-col gap-[8px] items-start w-full" data-node-id="583:5415" data-name="Dialog introduction">
            <h3 className="font-heading font-bold text-[24px] sm:text-[26px] leading-[1.25] text-[#01091E] w-full" data-node-id="583:5416">
              Reject this request?
            </h3>
            <p className="font-sans font-normal text-[14px] leading-[1.5] text-[#41474F] w-full" data-node-id="583:5417">
              {request.doctorName} will not receive access to your records.
            </p>
          </div>
        </div>

        {/* Request Summary (Figma Node 583:5418) */}
        <div className="bg-[#F5F8FC] flex flex-col gap-[16px] items-start p-[16px] rounded-[8px] w-full border border-[#E9EFF8]" data-node-id="583:5418" data-name="Request summary">
          <div className="flex gap-[12px] items-center w-full" data-node-id="583:5419" data-name="Doctor profile">
            <div className="rounded-[100px] size-[52px] relative overflow-hidden bg-[#F3EEFA] border border-[#D8DFEB] shrink-0 flex items-center justify-center" data-node-id="583:5420" data-name="Profile photo">
              {!imgFailed ? (
                <Image
                  src={request.avatarUrl || "/assets/doctor/dr-omar-farouk.png"}
                  alt={request.doctorName}
                  fill
                  unoptimized
                  className="object-cover"
                  onError={() => setImgFailed(true)}
                />
              ) : null}
              {imgFailed && (
                <span className="text-sm font-bold text-[#7350A2] select-none">
                  {initials}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-[2px] items-start" data-node-id="583:5421" data-name="Professional identity">
              <p className="font-heading font-bold text-[18px] text-[#01091E] leading-normal" data-node-id="583:5422">
                {request.doctorName}
              </p>
              <p className="font-sans font-normal text-[12px] text-[#41474F] leading-normal" data-node-id="583:5423">
                {request.doctorSpecialty}
              </p>
              <p className="font-sans font-normal text-[12px] text-[#667085] leading-normal" data-node-id="583:5424">
                {request.hospitalClinic}
              </p>
            </div>
          </div>
          <div className="flex items-start justify-between w-full" data-node-id="583:5425" data-name="Request state">
            <div
              className={`flex gap-[5px] items-center px-[9px] py-[5px] rounded-[4px] ${
                isEdit ? "bg-[#F3EEFA] text-[#7350A2]" : "bg-[#EFF8FE] text-[#02307D]"
              }`}
              data-node-id="583:5426"
              data-name="Permission"
            >
              <Pencil className="size-[14px]" data-node-id="583:5427" />
              <p className="font-sans font-semibold text-[12px] whitespace-nowrap leading-normal" data-node-id="583:5429">
                {request.permissionLevel || "Edit permission"}
              </p>
            </div>
            <div className="bg-[#FFF6DE] flex gap-[5px] items-center px-[10px] py-[5px] rounded-[100px]" data-node-id="583:5430" data-name="Request status">
              <Clock3 className="size-[13px] text-[#966000]" data-node-id="583:5431" />
              <p className="font-sans font-semibold text-[12px] text-[#966000] whitespace-nowrap leading-normal" data-node-id="583:5433">
                Pending
              </p>
            </div>
          </div>
          <p className="font-sans font-normal text-[12px] leading-[1.5] text-[#667085] w-full" data-node-id="583:5434">
            {request.requestId} · Requested {request.requestedDate || "2 Nov 2026"} · Patient: Ahmed Hassan
          </p>
        </div>

        {/* Requested Information (Figma Node 583:5435) */}
        <div className="flex flex-col gap-[8px] items-start leading-[1.5] w-full" data-node-id="583:5435" data-name="Requested information">
          <p className="font-heading font-bold text-[14px] text-[#01091E] w-full" data-node-id="583:5436">
            Requested information
          </p>
          <p className="font-sans font-normal text-[12px] text-[#667085] w-full" data-node-id="583:5437">
            {request.doctorName.startsWith("Dr. ") ? request.doctorName.split(" ").slice(0, 2).join(" ") : request.doctorName} asked for view and edit permission on:
          </p>
          <div className="flex flex-wrap items-center gap-[6px] w-full" data-node-id="583:5438">
            <span className="bg-[#F0F2F6] px-[8px] py-[3px] rounded-[4px] text-[12px] font-semibold text-[#02307D]" data-node-id="583:5439">
              Prescriptions
            </span>
            <span className="bg-[#F0F2F6] px-[8px] py-[3px] rounded-[4px] text-[12px] font-semibold text-[#02307D]" data-node-id="583:5441">
              Diagnoses &amp; Conditions
            </span>
          </div>
          <p className="font-sans font-normal text-[12px] text-[#667085] w-full" data-node-id="583:5442">
            Reason: {request.reasonForAccess || "Patient requested consultation review for current medications."}
          </p>
        </div>

        {/* Patient Control Notice (Figma Node 583:5444) */}
        <div className="bg-[#FFF0F0] flex gap-[12px] items-start p-[16px] rounded-[8px] w-full border border-[#FFDADA]" data-node-id="583:5444" data-name="Patient control notice">
          <AlertTriangle className="size-[20px] text-[#B93838] shrink-0 mt-0.5" data-node-id="583:5445" />
          <div className="flex flex-1 flex-col gap-[4px] items-start leading-[1.5]" data-node-id="583:5447" data-name="Notice content">
            <p className="font-sans font-semibold text-[13px] text-[#B93838] w-full" data-node-id="583:5448">
              No records will be shared
            </p>
            <p className="font-sans font-normal text-[12px] text-[#41474F] w-full" data-node-id="583:5449">
              The request will be marked Rejected in your history. Dr. Omar can submit a new request if needed.
            </p>
          </div>
        </div>

        <p className="font-sans font-normal text-[13px] leading-[1.5] text-[#01091E] w-full" data-node-id="583:5450">
          You can change your mind later only if {request.doctorName} submits a new request. Rejecting will not affect your care.
        </p>

        {/* Confirmation Actions (Figma Node 583:5451) */}
        <div className="border-t border-[#D8DFEB] flex items-center justify-between pt-[20px] w-full" data-node-id="583:5451" data-name="Confirm or cancel">
          <button
            type="button"
            onClick={onClose}
            className="bg-white border border-[#D0DEFF] flex h-[40px] items-center justify-center px-[16px] rounded-[8px] text-[13px] font-bold text-[#02307D] hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            data-node-id="583:5452"
            data-name="Action"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-[#B93838] hover:bg-[#A32F2F] border border-transparent flex gap-[8px] h-[40px] items-center justify-center px-[16px] rounded-[8px] text-[13px] font-bold text-white transition-colors cursor-pointer shadow-sm"
            data-node-id="583:5453"
            data-name="Action"
          >
            <ShieldOff className="size-[16px]" data-node-id="583:5454" />
            <span>Reject Request</span>
          </button>
        </div>
      </div>
    </div>
  );
}
