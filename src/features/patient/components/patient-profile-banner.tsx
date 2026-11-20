"use client";

import React from "react";
import { UIPatientProfile } from "@/lib/api/patient-types";
import { PatientInfoCard } from "./patient-info-card";
import { mapProfileToPatientIdentity } from "../utils/patient-mappers";

export interface PatientProfileBannerProps {
  readonly showVerifiedBadge?: boolean;
  readonly profile?: UIPatientProfile | null;
  readonly isDemoPreview?: boolean;
  readonly syncText?: string;
  readonly className?: string;
}

/**
 * Adapter component preserving 100% backwards compatibility for existing imports.
 * Delegates directly to the single authoritative PatientInfoCard.
 */
export function PatientProfileBanner({
  showVerifiedBadge = false,
  profile,
  isDemoPreview = false,
  syncText = "Today, 10:45 AM",
  className,
}: PatientProfileBannerProps) {
  const patient = mapProfileToPatientIdentity(profile, isDemoPreview);

  return (
    <PatientInfoCard
      patient={patient}
      variant={showVerifiedBadge ? "profile" : "general"}
      isDemoPreview={isDemoPreview}
      syncText={syncText}
      className={className}
      nodeId={showVerifiedBadge ? "299:6584" : "299:1910"}
    />
  );
}
