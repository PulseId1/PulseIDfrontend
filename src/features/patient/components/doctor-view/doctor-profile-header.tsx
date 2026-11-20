"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3, ShieldCheck } from "lucide-react";

export interface DoctorProfileData {
  id: string;
  name: string;
  specialty: string;
  department: string;
  hospital: string;
  avatarUrl: string;
  licenseNumber: string;
  clinicAddress: string;
  clinicPhone: string;
  firstVisitDate: string;
  lastVisitDate: string;
  totalVisits: number;
  activePermissionsCount: number;
}

export const DEFAULT_DOCTOR_DATA: DoctorProfileData = {
  id: "DOC-LAILA-1028",
  name: "Dr. Laila Mostafa",
  specialty: "Consultant Endocrinologist",
  department: "Endocrinology & Diabetes",
  hospital: "Dar Al Fouad Hospital",
  avatarUrl: "/assets/doctor/dr-laila-mostafa.png",
  licenseNumber: "EMS-284761 • Verified clinician",
  clinicAddress: "26 July Corridor, 6th of October, Giza",
  clinicPhone: "+20 2 3824 7200",
  firstVisitDate: "8 Apr 2026",
  lastVisitDate: "28 Oct 2026",
  totalVisits: 3,
  activePermissionsCount: 3,
};

interface DoctorProfileHeaderProps {
  doctor?: DoctorProfileData;
  backHref?: string;
}

export function DoctorProfileHeader({
  doctor = DEFAULT_DOCTOR_DATA,
  backHref = "/patient/access-requests",
}: DoctorProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-[32px] items-start text-left w-full" data-node-id="583:5555">
      {/* Back button */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-[8px] text-[#02307D] text-[14px] font-semibold hover:opacity-80 transition-opacity"
        data-node-id="583:5556"
      >
        <ArrowLeft className="size-[18px]" />
        <span>Back to my doctors</span>
      </Link>

      {/* Page introduction */}
      <div className="flex flex-col gap-[8px] text-left w-full" data-node-id="583:5560">
        <h1 className="text-[32px] font-bold text-[#01091E] font-heading leading-tight" data-node-id="583:5561">
          Doctor Profile
        </h1>
        <p className="text-[15px] font-normal text-[#41474F] font-sans leading-[1.5]" data-node-id="583:5562">
          View your doctor&apos;s information, previous visits, and medical recommendations.
        </p>
      </div>

      {/* Doctor profile card matching Figma Node 583:5563 */}
      <div
        className="w-full rounded-[16px] p-6 lg:p-[32px] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] relative overflow-hidden border border-[rgba(0,121,195,0.4)] flex flex-col gap-[24px]"
        style={{
          backgroundImage: "linear-gradient(123deg, #02307D 0.34%, #0A7DC5 93.11%)",
          fontFamily: "var(--font-inter, Inter), sans-serif",
        }}
        data-node-id="583:5563"
      >
        {/* Soft background ambient blur */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Identity Row */}
        <div className="flex flex-wrap items-center justify-between gap-[20px] z-10 w-full" data-node-id="583:5564">
          <div className="flex items-center gap-[20px]">
            <div className="size-[80px] rounded-[100px] overflow-hidden relative bg-[#EBF5FF] border-2 border-white/60 shrink-0 shadow-sm" data-node-id="583:5565">
              <Image
                src={doctor.avatarUrl}
                alt={doctor.name}
                fill
                unoptimized
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="w-full h-full flex items-center justify-center text-xl font-bold text-[#02307D] bg-white select-none">
                {doctor.name.split(" ").map((n) => n[0]).filter(Boolean).slice(-2).join("")}
              </span>
            </div>
            <div className="flex flex-col gap-[3px] text-left" data-node-id="583:5566">
              <h2 className="text-[24px] font-bold text-white leading-normal" data-node-id="583:5567">
                {doctor.name}
              </h2>
              <p className="text-[16px] font-semibold text-white/95 leading-normal" data-node-id="583:5568">
                {doctor.specialty}
              </p>
              <p className="text-[14px] font-normal text-white/85 leading-normal" data-node-id="583:5569">
                {doctor.department} • {doctor.hospital}
              </p>
            </div>
          </div>

          <div className="bg-[#EAF7EF] px-[10px] py-[5px] rounded-[100px] shrink-0" data-node-id="583:5570">
            <span className="text-[#16734E] text-[12px] font-semibold whitespace-nowrap" data-node-id="583:5571">
              Currently associated
            </span>
          </div>
        </div>

        {/* 4 Information Columns matching Figma Node 583:5572 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] pt-[8px] z-10 border-t border-white/15" data-node-id="583:5572">
          <div className="flex flex-col gap-[4px] text-left" data-node-id="583:5573">
            <span className="text-[11px] font-semibold text-white/70 tracking-wider uppercase font-sans" data-node-id="583:5574">
              VERIFIED MEDICAL LICENSE
            </span>
            <span className="text-[13px] font-normal text-white" data-node-id="583:5575">
              {doctor.licenseNumber}
            </span>
          </div>

          <div className="flex flex-col gap-[4px] text-left" data-node-id="583:5576">
            <span className="text-[11px] font-semibold text-white/70 tracking-wider uppercase font-sans" data-node-id="583:5577">
              CLINIC ADDRESS
            </span>
            <span className="text-[13px] font-normal text-white" data-node-id="583:5578">
              {doctor.clinicAddress}
            </span>
          </div>

          <div className="flex flex-col gap-[4px] text-left" data-node-id="583:5579">
            <span className="text-[11px] font-semibold text-white/70 tracking-wider uppercase font-sans" data-node-id="583:5580">
              CLINIC CONTACT
            </span>
            <span className="text-[13px] font-normal text-white font-mono" data-node-id="583:5581">
              {doctor.clinicPhone}
            </span>
          </div>

          <div className="flex flex-col gap-[4px] text-left" data-node-id="583:5582">
            <span className="text-[11px] font-semibold text-white/70 tracking-wider uppercase font-sans" data-node-id="583:5583">
              FIRST RECORDED VISIT
            </span>
            <span className="text-[13px] font-normal text-white" data-node-id="583:5584">
              {doctor.firstVisitDate}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Statistics Cards matching Figma Node 583:5585 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] w-full" data-node-id="583:5585">
        <div className="bg-white border border-[#D0DEFF] rounded-[8px] p-[20px] flex flex-col gap-[8px] text-left shadow-xs" data-node-id="583:5586">
          <div className="flex items-center gap-[8px] text-[#02307D]" data-node-id="583:5587">
            <Clock3 className="size-[18px]" />
            <span className="text-[14px] font-medium" data-node-id="583:5590">Total Visits</span>
          </div>
          <span className="text-[28px] font-bold text-[#02307D] font-mono leading-none" data-node-id="583:5591">
            {String(doctor.totalVisits).padStart(2, "0")}
          </span>
          <span className="text-[12px] font-normal text-[#41474F]" data-node-id="583:5592">
            Recorded consultations
          </span>
        </div>

        <div className="bg-white border border-[#D0DEFF] rounded-[8px] p-[20px] flex flex-col gap-[8px] text-left shadow-xs" data-node-id="583:5593">
          <div className="flex items-center gap-[8px] text-[#02307D]" data-node-id="583:5594">
            <Clock3 className="size-[18px]" />
            <span className="text-[14px] font-medium" data-node-id="583:5597">First Visit</span>
          </div>
          <span className="text-[20px] font-bold text-[#02307D] leading-none pt-1" data-node-id="583:5598">
            {doctor.firstVisitDate}
          </span>
          <span className="text-[12px] font-normal text-[#41474F]" data-node-id="583:5599">
            Care journey began
          </span>
        </div>

        <div className="bg-white border border-[#D0DEFF] rounded-[8px] p-[20px] flex flex-col gap-[8px] text-left shadow-xs" data-node-id="583:5600">
          <div className="flex items-center gap-[8px] text-[#02307D]" data-node-id="583:5601">
            <Clock3 className="size-[18px]" />
            <span className="text-[14px] font-medium">Last Visit</span>
          </div>
          <span className="text-[20px] font-bold text-[#02307D] leading-none pt-1">
            {doctor.lastVisitDate}
          </span>
          <span className="text-[12px] font-normal text-[#41474F]">
            Most recent consultation
          </span>
        </div>

        <div className="bg-white border border-[#D0DEFF] rounded-[8px] p-[20px] flex flex-col gap-[8px] text-left shadow-xs" data-node-id="583:5607">
          <div className="flex items-center gap-[8px] text-[#02307D]">
            <ShieldCheck className="size-[18px]" />
            <span className="text-[14px] font-medium">Active Permissions</span>
          </div>
          <span className="text-[20px] font-bold text-[#02307D] leading-none pt-1">
            {doctor.activePermissionsCount} Record categories
          </span>
          <span className="text-[12px] font-normal text-[#41474F]">
            View access granted
          </span>
        </div>
      </div>
    </div>
  );
}
