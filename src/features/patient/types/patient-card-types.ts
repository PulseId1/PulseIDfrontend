import React from "react";

/**
 * Normalized patient identity presentation model.
 * Decouples presentation components from backend DTOs and API schema details.
 */
export interface PatientIdentity {
  readonly id: string;
  readonly name: string;
  readonly birthDate?: string | null;
  readonly bloodType?: string | null;
  readonly bloodTypeId?: number | null;
  readonly avatarUrl?: string | null;
  readonly isVerified?: boolean;
}

export type PatientInfoCardVariant = "general" | "profile";

export interface PatientInfoCardProps {
  /** Normalized patient identity model */
  readonly patient?: PatientIdentity | null;
  /** Visual variant: 'general' (shows sync & blood group) or 'profile' (shows verified badge, no sync) */
  readonly variant?: PatientInfoCardVariant;
  /** Custom sync text (defaults to 'Today, 10:45 AM') */
  readonly syncText?: string;
  /** Whether this is a demonstration preview */
  readonly isDemoPreview?: boolean;
  /** Optional custom right-hand badge/action slot for extensibility */
  readonly rightBadge?: React.ReactNode;
  /** Optional custom metadata or actions to render inside the banner */
  readonly children?: React.ReactNode;
  /** Optional CSS class overrides */
  readonly className?: string;
  /** Figma node ID for audit tracking */
  readonly nodeId?: string;
}
