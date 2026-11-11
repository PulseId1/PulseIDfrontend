"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthCardShell } from "./AuthCardShell";
import { PatientRegisterForm } from "./PatientRegisterForm";
import { DoctorRegisterForm } from "./DoctorRegisterForm";
import { PharmacistRegisterForm } from "./PharmacistRegisterForm";

export function PersonalInfoForm() {
  const searchParams = useSearchParams();

  const phoneParam = searchParams.get("phone") || "";
  const role = (searchParams.get("role") || "patient").toLowerCase();

  const roleTitle =
    role === "doctor"
      ? "Doctor / Clinician Registration"
      : role === "pharmacist"
      ? "Pharmacist Registration"
      : "Patient Personal Information";

  const roleSubtitle =
    role === "doctor"
      ? "Register your clinical practice credentials to access digital prescriptions and diagnostic records."
      : role === "pharmacist"
      ? "Register your pharmacy practice credentials for digital prescription fulfillment."
      : "Enter your personal details to create your secure PulseID healthcare identity.";

  return (
    <AuthCardShell isTall={true} heroImage="/assets/auth/auth-info-hero.png">
      <div className="w-full flex flex-col items-start min-w-0" data-node-id="116:1032">
        {/* Header Block matching Figma node 116:1034 */}
        <div className="pb-6 w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-[#02307D] border border-blue-200 capitalize">
              {role} Account
            </span>
            <Link
              href="/auth/role"
              className="text-xs text-[#078BDE] hover:underline font-medium"
            >
              Change Role
            </Link>
          </div>

          <h1 className="text-[26px] sm:text-[28px] font-bold leading-tight text-[#02307D] font-heading">
            {roleTitle}
          </h1>
          <p className="mt-1 text-[13px] sm:text-[14px] text-[#41474F] font-normal leading-normal">
            {roleSubtitle}
          </p>
        </div>

        {/* Modular Role-Specific Registration Form */}
        {role === "doctor" ? (
          <DoctorRegisterForm initialPhone={phoneParam} />
        ) : role === "pharmacist" ? (
          <PharmacistRegisterForm initialPhone={phoneParam} />
        ) : (
          <PatientRegisterForm initialPhone={phoneParam} />
        )}

        {/* Footer sign in link */}
        <div className="pt-6 w-full text-center border-t border-slate-100 mt-6">
          <p className="text-[13px] text-[#41474F]">
            Already have an account?{" "}
            <Link
              href={`/auth/login?role=${role}`}
              className="text-[#078BDE] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthCardShell>
  );
}
