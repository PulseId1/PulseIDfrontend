"use client";

import React from "react";
import Image from "next/image";
import { PatientInfoCardProps } from "../types/patient-card-types";
import { getInitials, calculateAgeText } from "../utils/patient-mappers";

/**
 * Subcomponent: 80x80 Avatar with graceful monogram fallback.
 */
export function PatientAvatar({
  name,
  avatarUrl,
}: {
  readonly name: string;
  readonly avatarUrl?: string | null;
}) {
  const initials = getInitials(name);
  const [imageFailed, setImageFailed] = React.useState(false);

  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/60 overflow-hidden shadow-sm shrink-0 bg-[#02307D]">
      {avatarUrl && !imageFailed ? (
        <Image
          src={avatarUrl}
          alt={name}
          fill
          unoptimized
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-tr from-[#0080DF] to-[#02307D] flex items-center justify-center text-white font-bold text-xl select-none">
          {initials}
        </div>
      )}
    </div>
  );
}

/**
 * Subcomponent: Primary Blood Group rectangular indicator (Figma Node 564:1815 / 564:1816 / 564:1817).
 */
export function BloodGroupBadge({
  bloodType = "Blood O+",
  nodeId = "564:1816",
}: {
  readonly bloodType?: string;
  readonly nodeId?: string;
}) {
  return (
    <div
      className="content-stretch flex items-center relative shrink-0 self-start md:self-auto"
      data-node-id={nodeId}
      data-name="Right: Blood Type Indicator container"
    >
      <div
        className="bg-white border border-[#d0deff] rounded-[8px] px-[21px] py-[13px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center gap-[14px] shrink-0 relative"
        style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
        data-node-id="564:1817"
        data-name="Background+Border"
      >
        <div
          className="size-[40px] rounded-[8px] bg-[#fcdede] flex items-center justify-center shrink-0"
          data-node-id="564:1819"
          data-name="Overlay"
        >
          <div
            className="w-[16px] h-[20px] relative shrink-0 flex items-center justify-center"
            data-node-id="564:1820"
            data-name="Container"
          >
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 block"
              aria-hidden="true"
            >
              {/* Solid Red Droplet */}
              <path
                d="M8 20C5.71667 20 3.8125 19.2167 2.2875 17.65C0.7625 16.0833 0 14.1333 0 11.8C0 10.1333 0.6625 8.32083 1.9875 6.3625C3.3125 4.40417 5.31667 2.28333 8 0C10.6833 2.28333 12.6875 4.40417 14.0125 6.3625C15.3375 8.32083 16 10.1333 16 11.8C16 14.1333 15.2375 16.0833 13.7125 17.65C12.1875 19.2167 10.2833 20 8 20Z"
                fill="#EF4444"
              />
              {/* Specular White Highlight Arc */}
              <path
                d="M3.8 12.8C4.05 14.2 4.65 15.15 5.55 15.7C6.45 16.25 7.4 16.45 8.3 16.4"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col min-w-[93px]" data-node-id="564:1822" data-name="Container">
          <div className="flex flex-col items-start w-full" data-node-id="564:1823" data-name="Container">
            <span
              className="font-bold text-[11px] text-[#41474f] uppercase whitespace-nowrap leading-normal"
              data-node-id="564:1824"
            >
              PRIMARY GROUP
            </span>
          </div>
          <div className="flex flex-col items-start w-full" data-node-id="564:1825" data-name="Container">
            <span
              className="font-bold text-[18px] text-[#02307d] whitespace-nowrap leading-normal"
              data-node-id="564:1826"
            >
              {bloodType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Subcomponent: Profile Verification Status badge (Figma Node 299:6595).
 */
export function VerifiedStatusBadge({
  label = "Verified",
  nodeId = "609:3662",
}: {
  readonly label?: string;
  readonly nodeId?: string;
}) {
  return (
    <div
      className="bg-white/10 border border-white/15 rounded-[8px] px-4 py-2.5 flex items-center gap-2 shadow-sm backdrop-blur-sm shrink-0 self-start md:self-auto"
      style={{ fontFamily: "var(--font-inter, Inter), sans-serif" }}
      data-node-id={nodeId}
      data-name="Verification status"
    >
      <Image
        src="/assets/check-verified-filled.svg"
        alt=""
        width={18}
        height={18}
        unoptimized
        className="size-[18px]"
      />
      <span className="font-semibold text-[13px] text-white whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

/**
 * Unified Patient Information Card.
 * Serves as the single authoritative component for:
 * - General Patient Information Banner (Figma Node 583:5018 & 299:1910)
 * - Patient Profile Header Banner (Figma Node 299:6584)
 */
export function PatientInfoCard({
  patient,
  variant = "general",
  syncText = "Today, 10:45 AM",
  rightBadge,
  children,
  className = "",
  nodeId,
}: PatientInfoCardProps) {
  const displayName = patient?.name || "Ahmed Hassan";
  const displayId = patient?.id || "PID-8924-EGY";
  const ageText = calculateAgeText(patient?.birthDate) || "Adult • 34 Yrs";
  const bloodType = patient?.bloodType || "Blood O+";
  const resolvedNodeId = nodeId || (variant === "profile" ? "299:6584" : "583:5018");

  return (
    <div
      className={`w-full rounded-[16px] p-6 lg:p-8 text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] relative overflow-hidden border border-[rgba(0,121,195,0.4)] flex flex-col md:flex-row md:items-center justify-between gap-6 ${className}`}
      style={{
        backgroundImage: "linear-gradient(134.1deg, #02307D 0.34%, #0A7DC5 93.11%)",
        fontFamily: "var(--font-inter, Inter), sans-serif",
      }}
      data-node-id={resolvedNodeId}
      data-name={variant === "profile" ? "Patient overview" : "Patient information"}
    >
      {/* Soft ambient background blur */}
      <div className="absolute right-0 top-0 bottom-0 w-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Left: Avatar & Patient Identity Details */}
      <div className="flex items-center gap-5 z-10">
        <PatientAvatar name={displayName} avatarUrl={patient?.avatarUrl || "/assets/figma/avatars/patient-ahmed-hassan.png"} />

        <div className="flex flex-col gap-1.5">
          {/* Row 1: Name + Age Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl lg:text-[22px] font-bold text-white tracking-tight leading-normal">
              {displayName}
            </h2>
            {ageText && (
              <span className="bg-[rgba(192,202,227,0.1)] border border-[rgba(142,191,222,0.2)] rounded-[12px] px-[8px] py-[2px] text-[11px] font-bold text-white whitespace-nowrap">
                {ageText}
              </span>
            )}
          </div>

          {/* Row 2: Pulse ID and Sync status */}
          {variant === "profile" ? (
            /* Profile View (Node 299:6584): Single line Pulse ID, NO sync text */
            <div className="flex items-center gap-1.5 text-[13px]">
              <span className="text-[#bacfd7] font-bold">Pulse ID:</span>
              <span className="text-white font-normal font-mono">{displayId}</span>
            </div>
          ) : (
            /* General View (Node 583:5018 / 299:1910): Horizontal inline row matching Figma */
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[13px]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#bacfd7] font-bold">Pulse ID:</span>
                <span className="text-white font-normal font-mono">{displayId}</span>
              </div>
              <span className="text-white/40 font-normal select-none">•</span>
              <div className="inline-flex items-center gap-1.5 text-white/90">
                <svg
                  className="size-[10px] text-cyan-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                <span>
                  <span className="text-[#eaedf6]">Sync:</span> {syncText}
                </span>
              </div>
            </div>
          )}

          {children}
        </div>
      </div>

      {/* Right: Badge Slot */}
      <div className="z-10 shrink-0">
        {rightBadge ? (
          rightBadge
        ) : variant === "profile" ? (
          <VerifiedStatusBadge />
        ) : (
          <BloodGroupBadge bloodType={bloodType} />
        )}
      </div>
    </div>
  );
}
