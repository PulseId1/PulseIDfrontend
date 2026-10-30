/**
 * PulseID Application Constants
 *
 * Confirmed project constants and metadata.
 */

export const APP_NAME = "PulseID" as const;
export const APP_DESCRIPTION =
  "Next-generation healthcare technology platform connecting patients, doctors, and pharmacists." as const;

/**
 * Public launch target date: 20 November 2026
 */
export const LAUNCH_DATE = "2026-11-20" as const;

/**
 * Confirmed target user roles for future phases
 */
export const USER_ROLES = ["patient", "doctor", "pharmacist"] as const;
export type UserRole = (typeof USER_ROLES)[number];
