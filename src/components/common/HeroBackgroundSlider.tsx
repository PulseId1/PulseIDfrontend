"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  APPROVED_HERO_IMAGES,
  type HeroRoleType,
} from "@/lib/constants/hero-images";

export type SlideItem =
  | string
  | {
      src: string;
      alt?: string;
      objectPosition?: string;
      objectPositionMobile?: string;
    };

export interface HeroBackgroundSliderProps {
  /** Array of image paths or slide objects to rotate through */
  slides?: SlideItem[];
  /** Deterministic role selection. When provided, strictly displays that role's approved Figma image */
  selectedRole?: HeroRoleType | null;
  /** Rotation interval in milliseconds (default: 6000ms matching Patient Hero) */
  intervalMs?: number;
  /** Transition duration class (default: "duration-1000") */
  transitionDurationClassName?: string;
  /** Custom overlay gradient JSX or class. If true or undefined, renders standard PulseID Figma gradient overlay */
  overlayGradient?: React.ReactNode | boolean;
  /** Optional container class name */
  className?: string;
  /** Optional image class name */
  imageClassName?: string;
  /** Optional custom bottom fade (e.g. for landing page) */
  showBottomFade?: boolean;
  /** Figma tracking node ID */
  dataNodeId?: string;
  /** Component name */
  dataName?: string;
}

/** Predefined canonical slides matching Figma Component 2 (Node 288:561) */
export const DEFAULT_PATIENT_HERO_SLIDES: SlideItem[] = [
  "/assets/patient-home/hero-slide-1.png",
  "/assets/patient-home/hero-slide-2.png",
  "/assets/patient-home/hero-slide-3.png",
];

/** Predefined canonical slides matching Figma Node 322:1291 */
export const DEFAULT_DOCTOR_HERO_SLIDES: SlideItem[] = [
  "/assets/doctor/imgFrame1171277916.png",
  "/assets/doctor/imgFrame1171277917.png",
  "/assets/doctor/imgFrame1171277915.png",
];

/**
 * EXACT THREE APPROVED FIGMA IMAGES FOR THE UNAUTHENTICATED HERO:
 * 1. Doctor: Node 146:394 (041b34b4...)
 * 2. Normal: Node 146:396 (9066fed7...)
 * 3. Patient: Node 146:395 (fc35ed77...)
 */
export const DEFAULT_LANDING_HERO_SLIDES: SlideItem[] = [
  {
    src: APPROVED_HERO_IMAGES.doctor.src,
    alt: APPROVED_HERO_IMAGES.doctor.alt,
    objectPosition: APPROVED_HERO_IMAGES.doctor.objectPositionDesktop,
    objectPositionMobile: APPROVED_HERO_IMAGES.doctor.objectPositionMobile,
  },
  {
    src: APPROVED_HERO_IMAGES.patient.src,
    alt: APPROVED_HERO_IMAGES.patient.alt,
    objectPosition: APPROVED_HERO_IMAGES.patient.objectPositionDesktop,
    objectPositionMobile: APPROVED_HERO_IMAGES.patient.objectPositionMobile,
  },
];

/** Predefined canonical slides for Pharmacist Portal Hero */
export const DEFAULT_PHARMACIST_HERO_SLIDES: SlideItem[] = [
  {
    src: "/assets/pharmacist/4e07e4059389a77e23743d034606b15b6d574ed6.png",
    alt: "Pharmacist Verification & Safe Dispensing",
    objectPosition: "object-center",
  },
  {
    src: "/assets/doctor/imgFrame1171277916.png",
    alt: "Clinical Dispensary Verification",
    objectPosition: "object-center",
  },
  {
    src: "/assets/patient-home/hero-slide-2.png",
    alt: "Prescription & Medication Tracking",
    objectPosition: "object-center",
  },
  {
    src: "/assets/doctor/imgFrame1171277917.png",
    alt: "Pharmacy Registry Integration",
    objectPosition: "object-center",
  },
];

/**
 * Reusable hero background slideshow component.
 * Automatically cycles through high-resolution healthcare visual slides
 * with smooth crossfade opacity animations and authentic Figma contrast overlays.
 */
export function HeroBackgroundSlider({
  slides,
  selectedRole,
  intervalMs = 6000,
  transitionDurationClassName = "duration-1000",
  overlayGradient = true,
  className = "absolute inset-0 size-full overflow-hidden pointer-events-none select-none",
  imageClassName,
  showBottomFade = false,
  dataNodeId,
  dataName = "HeroBackgroundSlider",
}: HeroBackgroundSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // If a role is specifically selected, deterministically lock to its approved image
  const resolvedSlides: SlideItem[] = React.useMemo(() => {
    if (selectedRole && APPROVED_HERO_IMAGES[selectedRole]) {
      const img = APPROVED_HERO_IMAGES[selectedRole];
      return [
        {
          src: img.src,
          alt: img.alt,
          objectPosition: img.objectPositionDesktop,
          objectPositionMobile: img.objectPositionMobile,
        },
      ];
    }
    if (slides && slides.length > 0) return slides;
    return DEFAULT_LANDING_HERO_SLIDES;
  }, [selectedRole, slides]);

  useEffect(() => {
    if (resolvedSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % resolvedSlides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [resolvedSlides.length, intervalMs]);

  const activeIndex =
    resolvedSlides.length <= 1 ? 0 : activeSlide % resolvedSlides.length;

  return (
    <div
      className={className}
      data-node-id={dataNodeId}
      data-name={dataName}
      aria-hidden="true"
    >
      {resolvedSlides.map((slide, idx) => {
        const src = typeof slide === "string" ? slide : slide.src;
        const alt = typeof slide === "string" ? "" : (slide.alt ?? "");
        const positionDesktop =
          typeof slide === "string"
            ? "object-center"
            : (slide.objectPosition ?? "object-center");
        const positionMobile =
          typeof slide === "string"
            ? "object-center"
            : (slide.objectPositionMobile ?? positionDesktop);
        const isActive = idx === activeIndex;

        return (
          <div
            key={`${src}-${idx}`}
            className={`absolute inset-0 size-full transition-opacity ease-in-out ${transitionDurationClassName} ${
              isActive ? "opacity-100 z-0" : "opacity-0 pointer-events-none z-[-1]"
            }`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={idx === 0}
              unoptimized
              className={`object-cover size-full ${positionMobile} sm:${positionDesktop} ${imageClassName ?? ""}`}
            />
          </div>
        );
      })}

      {/* Default PulseID Figma Gradient Overlay matching Node 288:564 & 322:1294 */}
      {overlayGradient === true && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-[rgba(1,9,30,0.95)] via-[rgba(1,9,30,0.75)] to-[rgba(1,9,30,0)] size-full pointer-events-none z-[1]"
          data-node-id="288:564"
        />
      )}

      {/* Custom Gradient Overlay JSX if passed */}
      {typeof overlayGradient === "object" && overlayGradient !== null && (
        <div className="absolute inset-0 size-full pointer-events-none z-[1]">
          {overlayGradient}
        </div>
      )}

      {/* Optional bottom fade transition into subsequent sections */}
      {showBottomFade && (
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#01091E] to-transparent pointer-events-none z-[2]" />
      )}
    </div>
  );
}
