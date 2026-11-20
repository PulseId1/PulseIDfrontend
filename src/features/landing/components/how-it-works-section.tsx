"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

export function HowItWorksSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      id="how-it-works"
      className="w-full bg-white py-16 sm:py-24 overflow-hidden"
      data-node-id="665:3708"
      data-name="HowItWorksSection"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header matching Figma 665:3709 */}
        <div className="text-center max-w-[600px] mx-auto pb-16 sm:pb-20">
          <h2 className="font-sans font-semibold text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.2] text-[#41474f] tracking-tight">
            How <span className="text-[#01091e] font-bold">PulseID</span> Works
          </h2>
          <p className="mt-4 text-[16px] text-[#41474f] leading-relaxed">
            Getting started with PulseID is simple. Follow a few easy steps to manage your
            medical records and stay connected with your healthcare providers.
          </p>
        </div>

        {/* 2-Column Layout matching Figma 665:3712 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Overlapping Tilted Cards matching Figma 665:3732 */}
          <div className="lg:col-span-6 flex items-center justify-center min-h-[420px] sm:min-h-[460px] relative py-4 sm:py-8 w-full overflow-hidden">
            <div className="w-[340px] sm:w-[420px] h-[380px] sm:h-[400px] relative flex items-center justify-center scale-[0.82] xs:scale-[0.90] sm:scale-100 origin-center shrink-0">
              {/* Card 1: Blue "Your Health Journey Starts Here" (rotated -4deg) */}
              <div className="w-[280px] sm:w-[320px] h-[320px] sm:h-[340px] rounded-[16px] bg-[#078bde] p-6 text-white shadow-xl transform -rotate-[4deg] flex flex-col justify-between absolute left-2 sm:left-4 top-2 sm:top-4 z-10">
                <h3 className="font-sans font-bold text-[22px] sm:text-[24px] leading-[1.3] max-w-[160px]">
                  Your Health Journey Starts Here
                </h3>
                <div className="w-full h-[110px] sm:h-[120px] relative flex items-center justify-center">
                  <Image
                    src="/assets/landing-new/67b82b521e0e7bd6b82d232ad700dbc55c8b2f0e.svg"
                    alt="Pulse telemetry"
                    width={200}
                    height={100}
                    className="w-full object-contain"
                  />
                </div>
              </div>

              {/* Card 2: White "My Medical Records" (rotated +11deg) */}
              <div className="w-[280px] sm:w-[320px] h-[325px] sm:h-[345px] rounded-[16px] bg-[#f3f5f7] p-5 shadow-2xl transform rotate-[11deg] flex flex-col justify-between absolute right-2 sm:right-4 top-6 sm:top-8 z-20 border border-slate-200/60">
                <div className="w-full h-[170px] sm:h-[186px] rounded-[12px] bg-white relative overflow-hidden flex items-center justify-center shadow-inner">
                  <Image
                    src="/assets/landing-new/331e21339f381e1cdc17d2a40bc22d6aa5dfb9e3.png"
                    alt="3D Anatomical Heart"
                    fill
                    unoptimized
                    className="object-contain p-2"
                  />
                  {/* Visual telemetry dots */}
                  <div className="absolute top-[43px] left-[125px] size-[10px] rounded-full bg-[#2b2b2b] border-2 border-white shadow" />
                  <div className="absolute top-[106px] left-[101px] size-[10px] rounded-full bg-[#2b2b2b] border-2 border-white shadow" />
                  <div className="absolute top-[137px] left-[130px] size-[10px] rounded-full bg-[#2b2b2b] border-2 border-white shadow" />
                </div>
                <div className="mt-2">
                  <h4 className="font-sans font-bold text-[20px] sm:text-[22px] text-[#01091e] tracking-[-0.5px]">
                    My Medical Records
                  </h4>
                  <p className="mt-1 text-[12.5px] sm:text-[13px] text-[#41474f] leading-normal">
                    All your health information in one secure place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Sequential Step Cards matching Figma 665:3713 */}
          <div className="lg:col-span-6 flex flex-col gap-4 max-w-[500px] mx-auto lg:mx-0">
            {/* Step 1 */}
            <div
              className="bg-[#f3f5f7] rounded-[16px] p-6 sm:p-7 flex flex-col gap-2 transition-all shadow-sm"
              data-node-id="665:3714"
            >
              <span className="font-sans font-semibold text-[20px] text-[#01091e]">
                Step 1
              </span>
              <div>
                <h4 className="font-sans font-bold text-[18px] text-[#01091e]">
                  Create Your Account
                </h4>
                <p className="mt-1 text-[14px] text-[#41474f] leading-relaxed opacity-85">
                  Sign up and set up your personal profile to get started with PulseID.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="border-[1.5px] border-slate-200/80 bg-white rounded-[16px] p-6 sm:p-7 flex flex-col gap-2 hover:border-[#078bde]/50 transition-all"
              data-node-id="665:3720"
            >
              <span className="font-sans font-semibold text-[20px] text-[#01091e]">
                Step 2
              </span>
              <div>
                <h4 className="font-sans font-bold text-[18px] text-[#01091e]">
                  Add Your Medical Information
                </h4>
                <p className="mt-1 text-[14px] text-[#41474f] leading-relaxed opacity-85">
                  Upload your prescriptions, lab results, and medical reports to build your digital medical record.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="border-[1.5px] border-slate-200/80 bg-white rounded-[16px] p-6 sm:p-7 flex flex-col gap-2 hover:border-[#078bde]/50 transition-all"
              data-node-id="665:3726"
            >
              <span className="font-sans font-semibold text-[20px] text-[#01091e]">
                Step 3
              </span>
              <div>
                <h4 className="font-sans font-bold text-[18px] text-[#01091e]">
                  Manage & Share Your Records
                </h4>
                <p className="mt-1 text-[14px] text-[#41474f] leading-relaxed opacity-85">
                  Access your medical information, explore AI-powered insights, and securely share your records with authorized healthcare professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
