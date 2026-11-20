import { UIPatientProfile } from "@/lib/api/patient-types";
import { PatientIdentity } from "../types/patient-card-types";

export const BLOOD_TYPE_LABELS: Readonly<Record<number, string>> = {
  1: "Blood O+",
  2: "Blood O-",
  3: "Blood A+",
  4: "Blood A-",
  5: "Blood B+",
  6: "Blood B-",
  7: "Blood AB+",
  8: "Blood AB-",
};

/**
 * Computes initials from a display name (e.g. "Ahmed Hassan" -> "AH").
 */
export function getInitials(name?: string | null): string {
  if (!name || !name.trim()) return "AH";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/**
 * Calculates human-readable age text (e.g. "Adult • 34 Yrs").
 */
export function calculateAgeText(birthDate?: string | null): string {
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

/**
 * Resolves a blood type string from a numeric ID or explicit string.
 */
export function resolveBloodTypeLabel(bloodTypeId?: number | null, bloodTypeStr?: string | null): string {
  if (bloodTypeId && BLOOD_TYPE_LABELS[bloodTypeId]) {
    return BLOOD_TYPE_LABELS[bloodTypeId];
  }
  if (bloodTypeStr && bloodTypeStr.trim()) {
    return bloodTypeStr.startsWith("Blood") ? bloodTypeStr : `Blood ${bloodTypeStr}`;
  }
  return "Blood O+";
}

/**
 * Maps a raw UIPatientProfile into a clean, normalized PatientIdentity model.
 */
export function mapProfileToPatientIdentity(
  profile?: UIPatientProfile | null,
  isDemo = false
): PatientIdentity {
  const defaultName = isDemo ? "Ahmed Hassan" : "Ahmed Hassan";
  const defaultId = isDemo ? "PID-8924-EGY" : "PID-8924-EGY";

  return {
    id: profile?.id || defaultId,
    name: profile?.nameEn || profile?.userName || defaultName,
    birthDate: profile?.birthDate || (isDemo ? "1992-09-14" : null),
    bloodType: resolveBloodTypeLabel(profile?.bloodTypeId, null),
    bloodTypeId: profile?.bloodTypeId ?? 1,
    avatarUrl: "/assets/figma/avatars/patient-ahmed-hassan.png",
    isVerified: true,
  };
}
