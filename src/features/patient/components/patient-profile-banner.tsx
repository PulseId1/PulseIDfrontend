"use client";

import React from "react";
import Image from "next/image";
import { UIPatientProfile } from "@/lib/api/patient-types";

interface PatientProfileBannerProps {
  readonly showVerifiedBadge?: boolean;
  readonly profile?: UIPatientProfile | null;
  readonly isDemoPreview?: boolean;
}

function getInitials(name?: string | null): string {
  if (!name || !name.trim()) return "P";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function calculateAgeText(birthDate?: string | null): string {
  if (!birthDate) return "";
  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return "";
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    years--;
  }
  if (years <= 0 || years > 130) return "";
  return years >= 18 ? `Adult • ${years} Yrs` : `Minor • ${years} Yrs`;
}

const BLOOD_TYPE_LABELS: Record<number, string> = {
  1: "Blood O+",
  2: "Blood O-",
  3: "Blood A+",
  4: "Blood A-",
  5: "Blood B+",
  6: "Blood B-",
  7: "Blood AB+",
  8: "Blood AB-",
};

export function PatientProfileBanner({
  showVerifiedBadge = false,
  profile,
  isDemoPreview = false,
}: PatientProfileBannerProps) {
  const displayName = profile?.nameEn || profile?.userName || (isDemoPreview ? "Ahmed Hassan" : "Patient");
  const displayId = profile?.id || (isDemoPreview ? "PID-8924-EGY" : "PID-PENDING");
  const ageText = calculateAgeText(profile?.birthDate) || (isDemoPreview ? "Adult • 34 Yrs" : "");
  const bloodGroup = (profile?.bloodTypeId && BLOOD_TYPE_LABELS[profile.bloodTypeId]) || (isDemoPreview ? "Blood O+" : "Not Recorded");
  const initials = getInitials(displayName);

  return (
    <div
      className="w-full rounded-[20px] bg-gradient-to-r from-[#0080DF] via-[#006EBE] to-[#024E99] p-6 lg:p-7 text-white shadow-md relative overflow-hidden"
      data-node-id="299:1042"
    >
      {/* Background soft ambient radial decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
        {/* Left: Avatar + Details */}
        <div className="flex items-center gap-5">
          {/* Avatar 80x80 */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/60 overflow-hidden shadow-sm shrink-0 bg-white">
            {isDemoPreview ? (
              <Image
                src="/assets/figma/avatars/patient-ahmed-hassan.png"
                alt={displayName}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                }}
              />
            ) : null}
            {/* Fallback container with initials */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0080DF] to-[#02307D] flex items-center justify-center text-white font-bold text-xl">
              {initials}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading">
                {displayName}
              </h2>
              {isDemoPreview && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400/30 text-amber-100 text-[11px] font-semibold border border-amber-300/40">
                  Demo Preview
                </span>
              )}
              {ageText && (
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[12px] font-medium backdrop-blur-sm border border-white/10">
                  {ageText}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-white/80 text-[13px] flex-wrap font-sans">
              <span>Pulse ID: <strong className="text-white font-mono">{displayId}</strong></span>
              <span className="text-white/40">•</span>
              <span className="inline-flex items-center gap-1.5 text-cyan-100">
                <svg className="w-3.5 h-3.5 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Sync: Active Session
              </span>
            </div>
          </div>
        </div>

        {/* Right: Blood Group or Verified Badge */}
        <div className="flex items-center gap-3 sm:self-center shrink-0">
          {showVerifiedBadge ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 border border-white/25 text-white text-[13px] font-medium shadow-sm backdrop-blur-sm">
              <svg className="w-4 h-4 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              <span>Verified Identity</span>
            </div>
          ) : (
            <div className="bg-white rounded-2xl px-5 py-3 shadow-md flex items-center gap-3.5 border border-white/40">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  PRIMARY GROUP
                </span>
                <span className="text-[17px] font-extrabold text-[#02307D] leading-tight">
                  {bloodGroup}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
