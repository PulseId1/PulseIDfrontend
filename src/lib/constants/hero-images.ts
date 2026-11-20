/**
 * PulseID Authentic Figma Hero Image Mapping
 *
 * CRITICAL REQUIREMENT:
 * The unauthenticated hero has EXACTLY THREE approved Figma images from Node 146:392 (Component 39):
 * 1. Doctor: Frame 1171277857 (Node 146:394) -> Hash 041b34b49081c2d20cef030953eee720e7ab882f
 * 2. Normal / General: Pulse ID Healthcare Clinical Hero Background (Node 146:396) -> Hash 9066fed7c5ff54e7585f05f1e205bc70e13ed899
 * 3. Patient: Frame 1171277858 (Node 146:395) -> Hash fc35ed77358e110e8f35e8550a639b4dce427ff8
 *
 * NO other images (Unsplash, stock, external URLs, random generators) are permitted.
 */

export type HeroRoleType = "doctor" | "normal" | "patient";

export interface HeroImageConfig {
  readonly id: HeroRoleType;
  readonly roleName: string;
  readonly src: string;
  readonly alt: string;
  readonly figmaNode: string;
  readonly figmaFrameName: string;
  readonly sha256HashPrefix: string;
  readonly objectPositionDesktop: string;
  readonly objectPositionMobile: string;
}

export const APPROVED_HERO_IMAGES: Record<HeroRoleType, HeroImageConfig> = {
  doctor: {
    id: "doctor",
    roleName: "Doctor",
    src: "/assets/hero/hero-doctor.png",
    alt: "Surgeon with biometric medical holographic interface",
    figmaNode: "146:394",
    figmaFrameName: "Frame 1171277857",
    sha256HashPrefix: "041b34b4",
    objectPositionDesktop: "object-top lg:object-[center_top]",
    objectPositionMobile: "object-center",
  },
  normal: {
    id: "normal",
    roleName: "Normal / General",
    src: "/assets/hero/hero-normal.png",
    alt: "Pulse ID Healthcare Clinical Hero Background",
    figmaNode: "146:396",
    figmaFrameName: "Pulse ID Healthcare Clinical Hero Background",
    sha256HashPrefix: "9066fed7",
    objectPositionDesktop: "object-center",
    objectPositionMobile: "object-center",
  },
  patient: {
    id: "patient",
    roleName: "Patient",
    src: "/assets/hero/hero-patient.png",
    alt: "Healthcare clinician consultation with patient",
    figmaNode: "146:395",
    figmaFrameName: "Frame 1171277858",
    sha256HashPrefix: "fc35ed77",
    objectPositionDesktop: "object-center",
    objectPositionMobile: "object-center",
  },
};

/**
 * Strict ordered sequence of the three approved hero images.
 * Used for deterministic slideshow and ambient cycling across approved hero states.
 */
export const APPROVED_HERO_IMAGE_SEQUENCE: readonly HeroImageConfig[] = [
  APPROVED_HERO_IMAGES.doctor,
  APPROVED_HERO_IMAGES.normal,
  APPROVED_HERO_IMAGES.patient,
];

/**
 * Deterministically resolves the approved hero image for a given user type or role.
 * If role is not provided or recognized, defaults to the default landing image ('doctor' as in Figma Node 233:92).
 */
export function getApprovedHeroImage(role?: string | null): HeroImageConfig {
  if (!role) return APPROVED_HERO_IMAGES.doctor;
  const normalized = role.toLowerCase().trim();
  if (normalized === "doctor" || normalized === "doc") return APPROVED_HERO_IMAGES.doctor;
  if (normalized === "patient" || normalized === "pat") return APPROVED_HERO_IMAGES.patient;
  if (normalized === "normal" || normalized === "general" || normalized === "landing") return APPROVED_HERO_IMAGES.normal;
  return APPROVED_HERO_IMAGES.doctor;
}
