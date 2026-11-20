"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AccessRequestItem } from "@/lib/api/types";
import { Clock3, ShieldCheck, Eye, Pencil, ShieldOff, Lock } from "lucide-react";

interface AccessRequestCardProps {
  readonly request: AccessRequestItem;
  readonly cardType: "pending" | "active" | "history";
  readonly onAction?: (action: "approve" | "reject" | "revoke") => void;
  readonly nodeId?: string;
}

export function AccessRequestCard({
  request,
  cardType,
  onAction,
  nodeId,
}: AccessRequestCardProps) {
  if (cardType === "pending") {
    const isEdit = request.permissionLevel?.toLowerCase().includes("edit");

    return (
      <div
        className="bg-white rounded-[8px] p-[24px] border border-[#D8DFEB] shadow-[0px_3px_10px_0px_rgba(2,48,125,0.04)] flex flex-col justify-between gap-[16px] text-left w-full"
        data-node-id={nodeId || "583:5094"}
      >
        <div className="flex flex-col gap-[16px]">
          {/* Top status & ID (Figma Node 583:5095) */}
          <div className="flex items-center justify-between">
            <span className="bg-[#FFF6DE] px-[10px] py-[5px] rounded-[100px] text-[#966000] text-[12px] font-semibold flex items-center gap-[5px]">
              <Clock3 className="size-[13px]" />
              Pending
            </span>
            <span className="text-[11px] font-normal text-[#667085] font-mono">
              {request.requestId}
            </span>
          </div>

          {/* Doctor Profile Info (Figma Node 583:5101) */}
          <Link
            href="/patient/doctor"
            className="flex items-center gap-[12px] group cursor-pointer"
          >
            <div className="size-[52px] rounded-[100px] overflow-hidden relative bg-[#EBF5FF] border border-[#D8DFEB] group-hover:border-[#078BDE] shrink-0 flex items-center justify-center transition-colors">
              <Image
                src={request.avatarUrl || "/assets/doctor/dr-sara-ahmed.png"}
                alt={request.doctorName}
                fill
                unoptimized
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-sm font-bold text-[#078BDE] select-none">
                {request.doctorName?.split(" ").map((n) => n[0]).filter(Boolean).slice(-2).join("") || "DR"}
              </span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <h3 className="text-[18px] font-bold text-[#01091E] font-heading leading-normal group-hover:text-[#078BDE] transition-colors">
                {request.doctorName}
              </h3>
              <p className="text-[12px] font-normal text-[#41474F] leading-normal">
                {request.doctorSpecialty}
              </p>
              <p className="text-[12px] font-normal text-[#667085] leading-normal">
                {request.hospitalClinic}
              </p>
            </div>
          </Link>

          {/* Scope and permission (Figma Node 583:5107 & 583:5108) */}
          <div className="flex items-center justify-between">
            <span
              className={`px-[9px] py-[5px] text-[12px] font-semibold rounded-[4px] flex items-center gap-[5px] ${
                isEdit
                  ? "bg-[#F3EEFA] text-[#7350A2]"
                  : "bg-[#EFF8FE] text-[#02307D]"
              }`}
              data-node-id="583:5108"
            >
              {isEdit ? (
                <Pencil className="size-[14px]" />
              ) : (
                <Eye className="size-[14px]" />
              )}
              {isEdit ? "Edit permission" : "View permission"}
            </span>
            <span className="text-[12px] font-normal text-[#667085]">
              {request.permissions.length} record categories
            </span>
          </div>

          {/* Category chips (Figma Node 583:5113) */}
          <div className="flex flex-wrap items-center gap-[6px]">
            {request.permissions.map((p) => (
              <span
                key={p.category}
                className="px-[8px] py-[5px] rounded-[4px] bg-[#F5F8FC] text-[#41474F] text-[11px] font-normal border border-[#D8DFEB]"
              >
                {p.category}
              </span>
            ))}
          </div>

          {/* Reason for Access Container (Figma Node 583:5120) */}
          <div
            className="p-[12px] rounded-[4px] bg-[#F5F8FC] flex flex-col gap-[3px]"
            data-node-id="583:5120"
          >
            <span className="text-[11px] font-semibold text-[#667085] tracking-wider uppercase font-sans">
              REASON FOR ACCESS
            </span>
            <p className="text-[13px] font-normal text-[#41474F] leading-[1.5]">
              {request.reasonForAccess}
            </p>
          </div>

          {/* Dates (Figma Node 583:5123) */}
          <div className="flex items-start justify-between gap-[24px] pt-1">
            <div className="flex flex-col gap-[3px]">
              <span className="text-[11px] font-normal text-[#667085]">Requested</span>
              <span className="text-[12px] font-semibold text-[#01091E]">
                {request.requestedDate || "3 Nov 2026"}
              </span>
            </div>
            <div className="flex flex-col gap-[3px]">
              <span className="text-[11px] font-normal text-[#667085]">Access expires</span>
              <span className="text-[12px] font-semibold text-[#01091E]">
                {request.accessExpires || "10 Nov 2026"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions (Figma Node 583:5130) */}
        <div className="flex items-center justify-between gap-3 pt-[16px] border-t border-[#D8DFEB]">
          <button
            type="button"
            onClick={() => onAction?.("approve")}
            className="h-[40px] px-[16px] rounded-[8px] bg-[#078BDE] hover:bg-[#0070C5] text-white text-[13px] font-bold transition-colors flex items-center justify-center gap-[8px] shadow-sm cursor-pointer"
            data-node-id="583:5131"
          >
            <ShieldCheck className="size-[16px]" />
            Review &amp; Approve
          </button>
          <button
            type="button"
            onClick={() => onAction?.("reject")}
            className="h-[40px] px-[16px] rounded-[8px] bg-white border border-[#EACACA] text-[#B93838] hover:bg-rose-50 text-[13px] font-bold transition-colors flex items-center justify-center cursor-pointer"
            data-node-id="583:5135"
          >
            Reject
          </button>
        </div>
      </div>
    );
  }

  if (cardType === "active") {
    return (
      <div
        className="bg-white rounded-[8px] p-[24px] border border-[#D8DFEB] shadow-[0px_3px_10px_0px_rgba(2,48,125,0.04)] flex flex-col justify-between gap-[16px] text-left w-full"
        data-node-id={nodeId}
      >
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center justify-between">
            <span className="px-[10px] py-[5px] rounded-[100px] bg-[#EAF7EF] text-[#16734E] text-[12px] font-semibold flex items-center gap-[5px]">
              <ShieldCheck className="size-[13px]" />
              Active
            </span>
            <span className="text-[11px] font-normal text-[#667085] font-mono">
              {request.requestId}
            </span>
          </div>

          <Link
            href="/patient/doctor"
            className="flex items-center gap-[12px] group cursor-pointer"
          >
            <div className="size-[52px] rounded-[100px] overflow-hidden relative bg-[#EBF5FF] border border-[#D8DFEB] group-hover:border-[#078BDE] shrink-0 flex items-center justify-center transition-colors">
              <Image
                src={request.avatarUrl || "/assets/doctor/dr-laila-mostafa.png"}
                alt={request.doctorName}
                fill
                unoptimized
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-sm font-bold text-[#078BDE] select-none">
                {request.doctorName?.split(" ").map((n) => n[0]).filter(Boolean).slice(-2).join("") || "DR"}
              </span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <h3 className="text-[18px] font-bold text-[#01091E] font-heading leading-normal group-hover:text-[#078BDE] transition-colors">
                {request.doctorName}
              </h3>
              <p className="text-[12px] font-normal text-[#41474F]">
                {request.doctorSpecialty}
              </p>
              <p className="text-[12px] font-normal text-[#667085]">{request.hospitalClinic}</p>
            </div>
          </Link>

          <div className="flex items-center justify-between">
            <span className="px-[9px] py-[5px] text-[12px] font-semibold rounded-[4px] flex items-center gap-[5px] bg-[#EFF8FE] text-[#02307D]">
              <Eye className="size-[14px]" />
              {request.permissionLevel || "View permission"}
            </span>
            <span className="text-[12px] font-normal text-[#667085]">
              {request.permissions.length} record categories
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-[6px]">
            {request.permissions.map((p) => (
              <span
                key={p.category}
                className="px-[8px] py-[5px] rounded-[4px] bg-[#F5F8FC] text-[#41474F] text-[11px] font-normal border border-[#D8DFEB]"
              >
                {p.category}
              </span>
            ))}
          </div>

          <div className="p-[12px] rounded-[4px] bg-[#F5F8FC] flex flex-col gap-[3px]">
            <span className="text-[11px] font-semibold text-[#667085] tracking-wider uppercase font-sans">
              APPROVED SCOPE
            </span>
            <p className="text-[13px] font-normal text-[#41474F] leading-[1.5]">
              {request.reasonForAccess}
            </p>
          </div>

          <div className="flex items-start justify-between gap-[24px] pt-1">
            <div className="flex flex-col gap-[3px]">
              <span className="text-[11px] font-normal text-[#667085]">Approved</span>
              <span className="text-[12px] font-semibold text-[#01091E]">
                {request.approvedDate || "29 Oct 2026"}
              </span>
            </div>
            <div className="flex flex-col gap-[3px]">
              <span className="text-[11px] font-normal text-[#667085]">Access expires</span>
              <span className="text-[12px] font-semibold text-[#16734E]">
                {request.accessExpires || "28 Nov 2026"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-[16px] border-t border-[#D8DFEB]">
          <span className="text-[12px] text-[#667085]">Permission can be ended at any time</span>
          <button
            type="button"
            onClick={() => onAction?.("revoke")}
            className="h-[40px] px-[16px] rounded-[8px] bg-white border border-[#EACACA] text-[#B93838] hover:bg-rose-50 text-[13px] font-bold transition-colors flex items-center gap-[8px] cursor-pointer"
          >
            <ShieldOff className="size-[16px]" />
            Revoke Access
          </button>
        </div>
      </div>
    );
  }

  // History Card (Figma Node 583:5188 / 583:5228)
  const isRejected = request.status === "rejected";

  return (
    <div
      className="bg-white rounded-[8px] p-[24px] border border-[#D8DFEB] shadow-[0px_3px_10px_0px_rgba(2,48,125,0.04)] flex flex-col justify-between gap-[16px] text-left w-full"
      data-node-id={nodeId}
    >
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center justify-between">
          <span
            className={`px-[10px] py-[5px] rounded-[100px] text-[12px] font-semibold flex items-center gap-[5px] ${
              isRejected
                ? "bg-[#FFF0F0] text-[#B93838]"
                : "bg-[#EDF0F5] text-[#596579]"
            }`}
          >
            <ShieldOff className="size-[13px]" />
            {isRejected ? "Rejected" : "Revoked"}
          </span>
          <span className="text-[11px] font-normal text-[#667085] font-mono">
            {request.requestId}
          </span>
        </div>

        <div className="flex items-center gap-[12px]">
          <div className="size-[52px] rounded-[100px] overflow-hidden relative bg-[#EBF5FF] border border-[#D8DFEB] shrink-0 flex items-center justify-center">
            <Image
              src={
                request.avatarUrl ||
                (isRejected
                  ? "/assets/doctor/dr-hany-nabil.png"
                  : "/assets/doctor/dr-mona-samir.png")
              }
              alt={request.doctorName}
              fill
              unoptimized
              className="object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-sm font-bold text-[#078BDE] select-none">
              {request.doctorName?.split(" ").map((n) => n[0]).filter(Boolean).slice(-2).join("") || "DR"}
            </span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <h3 className="text-[18px] font-bold text-[#01091E] font-heading leading-normal">
              {request.doctorName}
            </h3>
            <p className="text-[12px] font-normal text-[#41474F]">
              {request.doctorSpecialty}
            </p>
            <p className="text-[12px] font-normal text-[#667085]">{request.hospitalClinic}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="px-[9px] py-[5px] text-[12px] font-semibold rounded-[4px] flex items-center gap-[5px] bg-[#EFF8FE] text-[#02307D]">
            <Eye className="size-[14px]" />
            {request.permissionLevel || "View permission"}
          </span>
          <span className="text-[12px] font-normal text-[#667085]">
            {request.permissions.length} record categories
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-[6px]">
          {request.permissions.map((p) => (
            <span
              key={p.category}
              className="px-[8px] py-[5px] rounded-[4px] bg-[#F5F8FC] text-[#41474F] text-[11px] font-normal border border-[#D8DFEB]"
            >
              {p.category}
            </span>
          ))}
        </div>

        <div className="p-[12px] rounded-[4px] bg-[#F5F8FC] flex flex-col gap-[3px]">
          <span className="text-[11px] font-semibold text-[#667085] tracking-wider uppercase font-sans">
            REASON FOR ACCESS
          </span>
          <p className="text-[13px] font-normal text-[#41474F] leading-[1.5]">
            {request.reasonForAccess}
          </p>
        </div>

        <div className="flex items-start justify-between gap-[24px] pt-1">
          <div className="flex flex-col gap-[3px]">
            <span className="text-[11px] font-normal text-[#667085]">Requested</span>
            <span className="text-[12px] font-semibold text-[#01091E]">
              {request.requestedDate || "29 Oct 2026"}
            </span>
          </div>
          <div className="flex flex-col gap-[3px]">
            <span className="text-[11px] font-normal text-[#667085]">Access</span>
            <span className="text-[12px] font-semibold text-[#01091E]">
              {isRejected ? "Not granted" : "Revoked"}
            </span>
          </div>
        </div>

        <p className="text-[12px] font-normal text-[#667085] leading-[1.5]">
          {isRejected
            ? "Rejected 30 Oct 2026 · No records shared"
            : "Access revoked on 28 Oct 2026 · No active access"}
        </p>
      </div>

      <div className="flex items-center gap-[7px] pt-[16px] border-t border-[#D8DFEB]">
        <Lock className="size-[14px] text-[#667085]" />
        <span className="text-[12px] font-normal text-[#667085]">
          {isRejected ? "No access was granted" : "Access has been revoked"}
        </span>
      </div>
    </div>
  );
}
