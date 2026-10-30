/**
 * PulseID Application Constants
 *
 * Centralized, immutable project constants and metadata.
 */

export const APP_NAME = "PulseID" as const;
export const APP_TAGLINE = "Your health. Connected." as const;
export const APP_EYEBROW = "THE FUTURE OF CONNECTED HEALTHCARE" as const;
export const APP_DESCRIPTION =
  "A more connected approach to personal healthcare information." as const;

/**
 * Public launch target specifications
 * Date: 20 November 2026
 * Timezone: Africa/Cairo (UTC+02:00)
 */
export const LAUNCH_DATE = "2026-11-20" as const;
export const LAUNCH_DISPLAY_DATE = "November 20, 2026" as const;
export const LAUNCH_TARGET_ISO = "2026-11-20T00:00:00+02:00" as const;
export const LAUNCH_TIMEZONE_LABEL = "Africa/Cairo (UTC+2)" as const;

/**
 * Confirmed target user roles for future phases
 */
export const USER_ROLES = ["patient", "doctor", "pharmacist"] as const;
export type UserRole = (typeof USER_ROLES)[number];

/**
 * Centralized Color Tokens (matching Tailwind CSS v4 variables in globals.css)
 */
export const COLOR_TOKENS = {
  bgMain: "#07111F",
  bgSecondary: "#0B192B",
  bgCard: "#102238",
  primaryBlue: "#2589FF",
  cyanAccent: "#35D6E8",
  textPrimary: "#F4F8FC",
  textSecondary: "#9BAFC3",
  borderSubtle: "#1C344D",
} as const;

/**
 * Landing Page Section Anchors
 */
export const LANDING_NAV_LINKS = [
  { label: "Overview", href: "#intro" },
  { label: "Launch Countdown", href: "#countdown" },
  { label: "Team", href: "#team" },
] as const;
