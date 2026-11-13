"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export type SlideItem =
  | string
  | {
      src: string;
      alt?: string;
      objectPosition?: string;
    };

export interface HeroBackgroundSliderProps {
  /** Array of image paths or slide objects to rotate through */
  slides?: SlideItem[];
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
  /** Optional custom bottom fade (e.g. For landing page) */
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

/** Predefined canonical slides for public Landing Hero (Before Login) */
export const DEFAULT_LANDING_HERO_SLIDES: SlideItem[] = [
  {
    src: "/landing/hero-doctor-authentic.png",
    alt: "Surgeon with biometric medical holographic interface",
    objectPosition: "object-top lg:object-[center_top]",
  },
  {
    src: "/landing/hero-composite-233-92.png",
    alt: "Clinical PulseID Healthcare Ecosystem",
    objectPosition: "object-center",
  },
  {
    src: "/assets/doctor/imgFrame1171277916.png",
    alt: "Physician Clinical Interface",
    objectPosition: "object-center",
  },
  {
    src: "/assets/patient-home/hero-slide-1.png",
    alt: "Patient Medical Record Management",
    objectPosition: "object-center",
  },
];

/** Predefined canonical slides for Pharmacist Portal Hero */
export const DEFAULT_PHARMACIST_HERO_SLIDES: SlideItem[] = [
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
  {
    src: "/assets/patient-home/hero-slide-3.png",
    alt: "Digital Health Records",
    objectPosition: "object-center",
  },
];

/**
 * Reusable hero background slideshow component.
 * Automatically cycles through high-resolution healthcare visual slides
 * with smooth crossfade opacity animations and authentic Figma contrast overlays.
 */
export function HeroBackgroundSlider({
  slides = DEFAULT_PATIENT_HERO_SLIDES,
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

  const normalizedSlides = slides.length > 0 ? slides : DEFAULT_PATIENT_HERO_SLIDES;

  useEffect(() => {
    if (normalizedSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % normalizedSlides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [normalizedSlides.length, intervalMs]);

  return (
    <div
      className={className}
      data-node-id={dataNodeId}
      data-name={dataName}
      aria-hidden="true"
    >
      {normalizedSlides.map((slide, idx) => {
        const src = typeof slide === "string" ? slide : slide.src;
        const alt = typeof slide === "string" ? "" : (slide.alt ?? "");
        const position =
          typeof slide === "string"
            ? "object-center"
            : (slide.objectPosition ?? "object-center");
        const isActive = idx === activeSlide;

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
              className={`object-cover size-full ${position} ${imageClassName ?? ""}`}
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
