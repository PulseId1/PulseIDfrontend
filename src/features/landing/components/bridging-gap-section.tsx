"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

export function BridgingGapSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white py-16 sm:py-24 overflow-hidden"
      data-node-id="665:3681"
      data-name="BridgingGapSection"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Gradient Heading matching Figma 665:3686 */}
        <div className="text-center max-w-[540px] mx-auto pb-12 sm:pb-16">
          <h2 className="font-sans font-bold text-[32px] sm:text-[38px] lg:text-[41px] leading-[1.3] tracking-[-1.6px] bg-clip-text text-transparent bg-gradient-to-r from-[#078bde] to-[#7cc1f3]">
            Bridging the gap between patients and doctors
          </h2>
        </div>

        {/* 3-Column Interactive Diagram matching Figma 665:3687 - 3704 */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 relative">
          {/* Left Photo: Doctor & Child Patient */}
          <div className="w-[285px] h-[222px] rounded-[16px] overflow-hidden relative shadow-md shrink-0">
            <Image
              src="/assets/landing-new/356ee9186a1b5fed1d2d371a6067124991d65428.png"
              alt="Doctor consultation"
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Left Connecting Arrow */}
          <div className="hidden lg:flex items-center justify-center w-[60px] shrink-0">
            <Image
              src="/assets/landing-new/a90617d357254e7e8ae8fe62ee1a033981ec0c3f.svg"
              alt=""
              width={60}
              height={8}
              className="w-full"
            />
          </div>

          {/* Center Glass Card with floating letters */}
          <div className="w-full max-w-[426px] h-[212px] rounded-[16px] backdrop-blur-[21px] bg-[rgba(192,202,227,0.1)] border border-[#078bde] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] relative shrink-0 overflow-hidden flex items-center justify-center">
            {/* Center Orb & Pulse */}
            <div className="flex items-center justify-center size-[36px] relative z-10">
              <div className="size-[24px] rounded-full bg-[#078bde] shadow-sm relative flex items-center justify-center">
                <div className="size-[12px] rounded-full bg-cyan-300" />
              </div>
            </div>

            {/* Floating Letters matching Figma coordinates */}
            <span className="absolute top-[28px] left-[65px] font-sans text-[38px] text-[#078bde] -rotate-[14deg] font-normal select-none pointer-events-none">
              p
            </span>
            <span className="absolute top-[28px] left-[180px] font-sans text-[38px] text-[#078bde] rotate-[23deg] font-normal select-none pointer-events-none">
              u
            </span>
            <span className="absolute top-[32px] right-[100px] font-sans text-[38px] text-[#078bde] -rotate-[14deg] font-normal select-none pointer-events-none">
              l
            </span>
            <span className="absolute bottom-[30px] left-[65px] font-sans text-[38px] text-[#078bde] -rotate-[35deg] font-normal select-none pointer-events-none">
              d
            </span>
            <span className="absolute bottom-[20px] left-[175px] font-sans text-[38px] text-[#078bde] rotate-[11deg] font-normal select-none pointer-events-none">
              i
            </span>
            <span className="absolute bottom-[24px] right-[125px] font-sans text-[38px] text-[#078bde] -rotate-[30deg] font-normal select-none pointer-events-none">
              e
            </span>
            <span className="absolute top-[90px] right-[65px] font-sans text-[38px] text-[#078bde] rotate-[23deg] font-normal select-none pointer-events-none">
              s
            </span>
          </div>

          {/* Right Connecting Arrow */}
          <div className="hidden lg:flex items-center justify-center w-[60px] shrink-0">
            <Image
              src="/assets/landing-new/627b1bf7c9f00a1366982a711057d3d96d3b648c.svg"
              alt=""
              width={60}
              height={8}
              className="w-full"
            />
          </div>

          {/* Right Photo: Patient MRI Scan */}
          <div className="w-[285px] h-[212px] rounded-[16px] overflow-hidden relative shadow-md shrink-0">
            <Image
              src="/assets/landing-new/bd2bb70a3e8c51b0fa0beb1d10335de2eef3358b.png"
              alt="Medical MRI scan"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
