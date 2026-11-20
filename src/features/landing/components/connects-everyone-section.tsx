"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface RoleCard {
  id: "doctor" | "patient" | "pharmacist";
  role: string;
  description: string;
  photoUrl: string;
  photoAlt: string;
  nodeId: string;
}

const ROLE_CARDS: readonly RoleCard[] = [
  {
    id: "doctor",
    role: "Doctor",
    description:
      "Access patient-approved medical records, review health history, and make more informed clinical decisions.",
    photoUrl: "/assets/landing-new/doctor-card-665.png",
    photoAlt: "Doctor reviewing clinical health records",
    nodeId: "665:3756",
  },
  {
    id: "patient",
    role: "Patient Experience",
    description:
      "Keep your medical records, prescriptions, and test results organized while staying in control of who can access your health information.",
    photoUrl: "/assets/landing-new/patient-card-665.png",
    photoAlt: "Patient managing personal health records",
    nodeId: "665:3767",
  },
  {
    id: "pharmacist",
    role: "Pharmacists",
    description:
      "Access relevant prescription information and use digital medical records to support a more organized healthcare workflow.",
    photoUrl: "/assets/landing-new/pharmacist-card-665.png",
    photoAlt: "Pharmacist verifying digital prescription",
    nodeId: "665:3778",
  },
];

export function ConnectsEveryoneSection() {
  // Default to index 1 ("patient") matching Figma node 665:3751 initial state
  const [activeIndex, setActiveIndex] = useState(1);

  const total = ROLE_CARDS.length;
  const leftIndex = (activeIndex - 1 + total) % total;
  const rightIndex = (activeIndex + 1) % total;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Continuously auto-scroll / auto-swap every 2.8 seconds - NEVER pauses on hover
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 2800);
    return () => clearInterval(timer);
  }, [handleNext]);

  const leftCard = ROLE_CARDS[leftIndex];
  const centerCard = ROLE_CARDS[activeIndex];
  const rightCard = ROLE_CARDS[rightIndex];

  return (
    <section
      id="connects-everyone"
      className="w-full bg-gradient-to-b from-white via-[#cfe4fd]/60 to-white py-16 sm:py-24 relative overflow-hidden"
      data-node-id="665:3750"
      data-name="ConnectsEveryoneSection"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            SECTION HEADER (Figma 665:3752) - Exact match to Figma
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[540px] mx-auto pb-12 sm:pb-16 flex flex-col items-center"
          data-node-id="665:3752"
        >
          <h2
            className="font-sans font-semibold text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.2] text-[#01091e] tracking-tight"
            data-node-id="665:3753"
          >
            Healthcare That Connects Everyone
          </h2>
          <p
            className="mt-4 text-[15px] sm:text-[16px] text-[#41474f] leading-relaxed max-w-[440px]"
            data-node-id="665:3754"
          >
            PulseID brings patients, doctors, and pharmacists together through a smarter,
            more connected healthcare experience.
          </p>
        </motion.div>

        {/* =========================================================
            DYNAMIC AUTO-SWAPPING CARDS (Figma 665:3755)
            Center: 665:3767 (318px height, 243x270 photo, elevated)
            Sides:  665:3756 (256px height, 196x208 photo, clickable)
            ========================================================= */}
        <div
          className="relative w-full flex items-center justify-center min-h-[340px]"
          data-node-id="665:3755"
        >
          {/* =========================================================
              DESKTOP VIEW: 3 SWAPPABLE CARDS (Center active, sides peeking)
              ========================================================= */}
          <div className="hidden lg:flex items-center justify-center gap-8 xl:gap-14 w-full overflow-visible">
            {/* 1. LEFT CARD (Figma 665:3756 Inactive Side Card) */}
            <motion.div
              key={`left-${leftCard.id}`}
              initial={{ opacity: 0.4, x: -30, scale: 0.95 }}
              animate={{ opacity: 0.72, x: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => setActiveIndex(leftIndex)}
              className="bg-white h-[256px] w-[540px] xl:w-[652px] rounded-[16px] shadow-sm border border-slate-200/90 relative overflow-hidden flex items-center shrink-0 cursor-pointer transition-all duration-300 hover:opacity-100 hover:border-[#078bde]/50 hover:shadow-md group"
              data-node-id="665:3756"
              data-name="LeftCard"
              title={`Click to switch to ${leftCard.role}`}
            >
              {/* Media box */}
              <div className="absolute left-[20px] xl:left-[24px] top-1/2 -translate-y-1/2 bg-[#2b2b2b] h-[208px] w-[180px] xl:w-[196px] rounded-[8.5px] overflow-hidden shrink-0 shadow-inner">
                <Image
                  src={leftCard.photoUrl}
                  alt={leftCard.photoAlt}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text content */}
              <div className="absolute left-[216px] xl:left-[248px] right-[40px] top-1/2 -translate-y-1/2 flex flex-col gap-6 xl:gap-8 items-start">
                <p className="font-sans font-medium text-[14.5px] xl:text-[16px] text-[#01091e] leading-relaxed line-clamp-3">
                  {leftCard.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-sans font-medium text-[15px] xl:text-[16px] text-[#01091e]">
                    {leftCard.role}
                  </span>
                </div>
              </div>

              {/* Quote icon SVG */}
              <div className="absolute right-[20px] xl:right-[24px] top-[18px] opacity-32 pointer-events-none">
                <Image
                  src="/assets/landing-new/quote-card-665.svg"
                  alt=""
                  width={24}
                  height={18}
                  unoptimized
                />
              </div>
            </motion.div>

            {/* 2. CENTER ACTIVE CARD (Figma 665:3767 Active Hero Card) */}
            <motion.div
              key={`center-${centerCard.id}`}
              initial={{ opacity: 0.6, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="bg-white h-[318px] w-[580px] xl:w-[652px] rounded-[16px] shadow-[0px_10px_35px_rgba(2,48,125,0.1)] border border-slate-100 relative overflow-hidden flex items-center shrink-0 z-20"
              data-node-id="665:3767"
              data-name="ActiveCenterCard"
            >
              {/* Media box */}
              <div className="absolute left-[20px] xl:left-[24px] top-1/2 -translate-y-1/2 bg-[#2b2b2b] h-[270px] w-[220px] xl:w-[243px] rounded-[16px] overflow-hidden shrink-0 shadow-inner">
                <Image
                  src={centerCard.photoUrl}
                  alt={centerCard.photoAlt}
                  fill
                  unoptimized
                  priority
                  className="object-cover"
                />
              </div>

              {/* Text content */}
              <div className="absolute left-[260px] xl:left-[295px] right-[48px] top-1/2 -translate-y-1/2 flex flex-col gap-6 xl:gap-8 items-start">
                <p className="font-sans font-medium text-[15px] xl:text-[16px] text-[#01091e] leading-relaxed">
                  {centerCard.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-sans font-medium text-[16px] xl:text-[17px] text-[#01091e]">
                    {centerCard.role}
                  </span>
                </div>
              </div>

              {/* Quote icon SVG */}
              <div className="absolute right-[24px] top-[18px] opacity-32 pointer-events-none">
                <Image
                  src="/assets/landing-new/quote-card-665.svg"
                  alt=""
                  width={34}
                  height={25}
                  unoptimized
                />
              </div>
            </motion.div>

            {/* 3. RIGHT CARD (Figma 665:3756 Inactive Side Card) */}
            <motion.div
              key={`right-${rightCard.id}`}
              initial={{ opacity: 0.4, x: 30, scale: 0.95 }}
              animate={{ opacity: 0.72, x: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => setActiveIndex(rightIndex)}
              className="bg-white h-[256px] w-[540px] xl:w-[652px] rounded-[16px] shadow-sm border border-slate-200/90 relative overflow-hidden flex items-center shrink-0 cursor-pointer transition-all duration-300 hover:opacity-100 hover:border-[#078bde]/50 hover:shadow-md group"
              data-node-id="665:3756"
              data-name="RightCard"
              title={`Click to switch to ${rightCard.role}`}
            >
              {/* Media box */}
              <div className="absolute left-[20px] xl:left-[24px] top-1/2 -translate-y-1/2 bg-[#2b2b2b] h-[208px] w-[180px] xl:w-[196px] rounded-[8.5px] overflow-hidden shrink-0 shadow-inner">
                <Image
                  src={rightCard.photoUrl}
                  alt={rightCard.photoAlt}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text content */}
              <div className="absolute left-[216px] xl:left-[248px] right-[40px] top-1/2 -translate-y-1/2 flex flex-col gap-6 xl:gap-8 items-start">
                <p className="font-sans font-medium text-[14.5px] xl:text-[16px] text-[#01091e] leading-relaxed line-clamp-3">
                  {rightCard.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-sans font-medium text-[15px] xl:text-[16px] text-[#01091e]">
                    {rightCard.role}
                  </span>
                </div>
              </div>

              {/* Quote icon SVG */}
              <div className="absolute right-[20px] xl:right-[24px] top-[18px] opacity-32 pointer-events-none">
                <Image
                  src="/assets/landing-new/quote-card-665.svg"
                  alt=""
                  width={24}
                  height={18}
                  unoptimized
                />
              </div>
            </motion.div>
          </div>

          {/* =========================================================
              MOBILE & TABLET VIEW: SINGLE ACTIVE CARD AUTO-SWAPPING
              ========================================================= */}
          <div className="lg:hidden w-full max-w-[560px] px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-${centerCard.id}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                onClick={handleNext}
                className="bg-white rounded-[16px] p-6 shadow-xl border border-slate-100 relative overflow-hidden flex flex-col sm:flex-row gap-5 items-center cursor-pointer"
              >
                {/* Quote icon */}
                <div className="absolute right-4 top-4 opacity-32 pointer-events-none">
                  <Image
                    src="/assets/landing-new/quote-card-665.svg"
                    alt=""
                    width={28}
                    height={20}
                    unoptimized
                  />
                </div>

                {/* Photo */}
                <div className="relative w-full sm:w-[200px] h-[220px] rounded-[14px] bg-[#2b2b2b] overflow-hidden shrink-0 shadow-inner">
                  <Image
                    src={centerCard.photoUrl}
                    alt={centerCard.photoAlt}
                    fill
                    unoptimized
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1 py-1 text-left">
                  <p className="font-sans font-medium text-[15px] text-[#01091e] leading-relaxed">
                    {centerCard.description}
                  </p>
                  <span className="mt-4 font-sans font-medium text-[16px] text-[#01091e] block">
                    {centerCard.role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
