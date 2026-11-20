"use client";

import React from "react";
import Image from "next/image";
import {
  StethoscopeIcon,
  HospitalIcon,
  LabFlaskIcon,
  RadiologyScanIcon,
  PillIcon,
} from "./icons";

export function PulseRecordTab() {
  return (
    <div className="w-full relative min-h-[580px] flex flex-col justify-between py-2">
      {/* SVG Radial Inward Arrows connecting cards to Center Core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 z-0">
        <svg className="w-full h-full" viewBox="0 0 1000 580" fill="none">
          <defs>
            <marker
              id="blue-arrow"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#078bde" />
            </marker>
          </defs>
          {/* Clinic -> Center */}
          <line x1="180" y1="155" x2="430" y2="235" stroke="#078bde" strokeWidth="2.5" strokeDasharray="6 6" markerEnd="url(#blue-arrow)" />
          {/* Hospital A -> Center */}
          <line x1="500" y1="155" x2="500" y2="195" stroke="#078bde" strokeWidth="2.5" strokeDasharray="6 6" markerEnd="url(#blue-arrow)" />
          {/* Laboratory -> Center */}
          <line x1="820" y1="155" x2="570" y2="235" stroke="#078bde" strokeWidth="2.5" strokeDasharray="6 6" markerEnd="url(#blue-arrow)" />
          {/* Radiology -> Center */}
          <line x1="310" y1="435" x2="430" y2="345" stroke="#078bde" strokeWidth="2.5" strokeDasharray="6 6" markerEnd="url(#blue-arrow)" />
          {/* Pharmacy -> Center */}
          <line x1="690" y1="435" x2="570" y2="345" stroke="#078bde" strokeWidth="2.5" strokeDasharray="6 6" markerEnd="url(#blue-arrow)" />
        </svg>
      </div>

      {/* Top Row: Clinic, Hospital A, Laboratory */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-8 w-full z-10">
        {/* Node 1: Clinic */}
        <div className="bg-white border-2 border-slate-200 hover:border-[#078bde]/60 rounded-[18px] p-4 sm:p-5 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
          <div className="bg-[#f8fbfe] border border-slate-200/80 rounded-[12px] p-3.5 text-slate-900 shadow-inner h-[135px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between font-bold text-[11.5px] tracking-wide text-slate-900">
                <span>CLINIC</span>
                <span className="text-slate-400 text-[10.5px]">#C-409</span>
              </div>
              <span className="text-[#02307d] block mt-1.5 text-[12px] font-bold">
                Clinical consultation
              </span>
            </div>
            <div className="space-y-2 pb-1">
              <div className="h-2 bg-slate-200/90 rounded-full w-full" />
              <div className="h-2 bg-slate-200/80 rounded-full w-4/5" />
              <div className="h-2 bg-slate-200/70 rounded-full w-3/5" />
            </div>
          </div>
          <div className="mt-3.5 flex items-center justify-between text-[13.5px] px-1">
            <span className="font-bold text-[#01091e] flex items-center gap-2">
              <StethoscopeIcon className="size-4 text-[#078bde]" />
              <span>Clinic</span>
            </span>
            <span className="text-amber-700 bg-amber-50 border border-amber-200 text-[10.5px] font-bold px-2.5 py-0.5 rounded">
              Unverified
            </span>
          </div>
        </div>

        {/* Node 2: Hospital A */}
        <div className="bg-white border-2 border-slate-200 hover:border-[#078bde]/60 rounded-[18px] p-4 sm:p-5 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
          <div className="bg-[#f8fbfe] border border-slate-200/80 rounded-[12px] p-3.5 text-slate-900 shadow-inner h-[135px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between font-bold text-[11.5px] tracking-wide text-slate-900">
                <span>HOSPITAL A</span>
                <span className="bg-red-500 text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded leading-none">
                  PDF
                </span>
              </div>
              <span className="text-[#02307d] block mt-1.5 text-[12px] font-bold">
                Discharge summary
              </span>
            </div>
            <div className="space-y-2 pb-1">
              <div className="h-2 bg-slate-200/90 rounded-full w-full" />
              <div className="h-2 bg-slate-200/80 rounded-full w-5/6" />
              <div className="h-2 bg-slate-200/70 rounded-full w-2/3" />
            </div>
          </div>
          <div className="mt-3.5 flex items-center justify-between text-[13.5px] px-1">
            <span className="font-bold text-[#01091e] flex items-center gap-2">
              <HospitalIcon className="size-4 text-[#078bde]" />
              <span>Hospital A</span>
            </span>
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 text-[10.5px] font-bold px-2.5 py-0.5 rounded">
              Verified
            </span>
          </div>
        </div>

        {/* Node 3: Laboratory */}
        <div className="bg-white border-2 border-slate-200 hover:border-[#078bde]/60 rounded-[18px] p-4 sm:p-5 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
          <div className="relative h-[135px] rounded-[12px] overflow-hidden bg-white border border-slate-200 shadow-inner">
            <Image
              src="/alsafa.jpeg"
              alt="Lab Report"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="mt-3.5 flex items-center justify-between text-[13.5px] px-1">
            <span className="font-bold text-[#01091e] flex items-center gap-2">
              <LabFlaskIcon className="size-4 text-[#078bde]" />
              <span>Laboratory</span>
            </span>
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 text-[10.5px] font-bold px-2.5 py-0.5 rounded">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Unified Medical Record Core Circle */}
      <div className="my-6 sm:my-8 flex justify-center z-10 relative">
        <div className="size-[175px] sm:size-[195px] rounded-full bg-gradient-to-br from-[#02307d] via-[#033b96] to-[#078bde] border-4 border-sky-400/80 shadow-[0_0_35px_rgba(7,139,222,0.4)] flex flex-col items-center justify-center text-center p-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-200 mb-0.5">
            CONSOLIDATED CORE
          </span>
          <span className="font-sans font-bold text-[19px] sm:text-[21px] leading-tight text-white tracking-wide">
            Unified
          </span>
          <span className="font-sans font-bold text-[19px] sm:text-[21px] leading-tight text-white tracking-wide">
            Medical Record
          </span>
          <span className="text-[12px] text-cyan-200 font-semibold mt-1 tracking-wide">
            Pulse ID
          </span>
        </div>
      </div>

      {/* Bottom Row: Radiology Center & Pharmacy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-8 max-w-[840px] mx-auto w-full z-10">
        {/* Node 4: Radiology Center */}
        <div className="bg-white border-2 border-slate-200 hover:border-[#078bde]/60 rounded-[18px] p-4 sm:p-5 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
          <div className="relative h-[135px] rounded-[12px] overflow-hidden bg-white border border-slate-200 shadow-inner">
            <Image
              src="/xray.jpeg"
              alt="Chest X-Ray"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="mt-3.5 flex items-center justify-between text-[13.5px] px-1">
            <span className="font-bold text-[#01091e] flex items-center gap-2">
              <RadiologyScanIcon className="size-4 text-[#078bde]" />
              <span>Radiology center</span>
            </span>
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 text-[10.5px] font-bold px-2.5 py-0.5 rounded">
              Verified
            </span>
          </div>
        </div>

        {/* Node 5: Pharmacy */}
        <div className="bg-white border-2 border-slate-200 hover:border-[#078bde]/60 rounded-[18px] p-4 sm:p-5 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
          <div className="relative h-[135px] rounded-[12px] overflow-hidden bg-white border border-slate-200 shadow-inner">
            <Image
              src="/IMG-20261120-WA0013.jpg"
              alt="Pharmacy Prescription"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="mt-3.5 flex items-center justify-between text-[13.5px] px-1">
            <span className="font-bold text-[#01091e] flex items-center gap-2">
              <PillIcon className="size-4 text-[#078bde]" />
              <span>Pharmacy</span>
            </span>
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 text-[10.5px] font-bold px-2.5 py-0.5 rounded">
              Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
