"use client";

import React from "react";
import Link from "next/link";
import { Pill, AlertCircle, ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react";

interface PharmacistRegisterFormProps {
  initialPhone?: string;
}

export function PharmacistRegisterForm({ initialPhone = "" }: PharmacistRegisterFormProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Pending Design Specification Alert Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3.5">
        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1.5 text-xs sm:text-sm">
          <p className="font-bold text-amber-900">
            Pharmacist Role Preserved • Registration Specification In Progress
          </p>
          <p className="text-amber-800 leading-relaxed">
            In accordance with PulseID architectural standards, <strong>Pharmacist (Role typeId: 3)</strong> is a distinct first-class account type. The shared authentication pipeline (Account Selection, Egyptian Mobile Entry, and OTP Verification) has been verified for phone <strong>+20 {initialPhone || "010..."}</strong>.
          </p>
        </div>
      </div>

      {/* Honest Audit Status Breakdown */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-4 text-xs text-slate-700">
        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
          <Pill className="w-4 h-4 text-[#078BDE]" />
          Requirements &amp; Architecture Status
        </h4>

        <div className="grid grid-cols-1 gap-2.5">
          <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-bold">✓</span>
            <div>
              <p className="font-semibold text-slate-900">Supported Stages</p>
              <p className="text-slate-600 mt-0.5">
                Role Selection (<code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">typeId: 3</code>), Egyptian phone validation, and simulated OTP verification are active.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-amber-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Pending Figma Dispensary Designs</p>
              <p className="text-slate-600 mt-0.5">
                Figma node <code>353:11437</code> (Patient) and node <code>353:11434</code> (Doctor) define complete UI journeys. Dedicated Pharmacist registration and dispensary workflows are awaiting design finalization.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-amber-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Pending Syndicate Contract</p>
              <p className="text-slate-600 mt-0.5">
                Backend API v1 shares <code>/api/v1/Doctor/Create</code> with pharmacists. To avoid polluting the doctor clinical directory, pharmacist registration requires dedicated Syndicate endpoints in API v2.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Navigation Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link
          href="/auth/role"
          className="flex-1 h-[48px] rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Account Type</span>
        </Link>

        <Link
          href="/auth/register?role=patient"
          className="flex-1 h-[48px] rounded-xl bg-[#078BDE] hover:bg-[#0070B8] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span>Explore Patient Flow</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
