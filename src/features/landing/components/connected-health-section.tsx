"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

export function ConnectedHealthSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white py-16 sm:py-24"
      data-node-id="665:3614"
      data-name="ConnectedHealthSection"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Header split row matching Figma 665:3616 */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-12 sm:pb-16">
          <h2 className="font-sans font-semibold text-[36px] sm:text-[44px] lg:text-[50px] leading-[1.2] text-[#2b2b2b] tracking-tight max-w-[500px]">
            Your Health, Smarter and More Connected.
          </h2>
          <p className="font-normal text-[16px] leading-[1.7] text-[#5c6063] max-w-[340px]">
            PulseID brings your medical records, AI-powered insights, and secure healthcare
            sharing together in one connected experience.
          </p>
        </div>

        {/* 3 Cards Row matching Figma 665:3619 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Your Complete Medical Story (lg:col-span-4) */}
          <div
            className="lg:col-span-4 bg-[#f3f5f7] rounded-[16px] p-8 flex flex-col justify-between min-h-[397px] relative overflow-hidden"
            data-node-id="665:3620"
          >
            <div>
              {/* Overlapping circular avatars matching Figma 665:3621 */}
              <div className="flex items-center">
                <div className="size-[44px] rounded-full border-2 border-white overflow-hidden relative -mr-4 shadow-sm z-30">
                  <Image
                    src="/assets/landing-new/ce58838abd5e6e7c9cf640c3837ba06f522ca84a.png"
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="size-[44px] rounded-full border-2 border-white overflow-hidden relative -mr-4 shadow-sm z-20">
                  <Image
                    src="/assets/landing-new/df808745d4eeae509bbfb902288411fb819999c2.png"
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="size-[44px] rounded-full border-2 border-white overflow-hidden relative shadow-sm z-10">
                  <Image
                    src="/assets/landing-new/389d48c3df5ee8b67ef377543c9b31f0e430e2a6.png"
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Title matching Figma 665:3625 */}
              <h3 className="mt-6 font-sans font-bold text-[24px] text-[#2b2b2b] leading-[1.4] tracking-[-0.5px]">
                Your Complete Medical Story
              </h3>
            </div>

            {/* Dark Pills at Bottom matching Figma 665:3626 */}
            <div className="mt-8 flex flex-col gap-3">
              <div className="w-full bg-[#2b2b2b] text-white text-center py-2.5 px-4 rounded-full text-[14px] font-normal shadow-sm">
                AI Medical Analysis
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#2b2b2b] text-white text-center py-2.5 px-2 rounded-full text-[14px] font-normal shadow-sm">
                  Health Insights
                </div>
                <div className="flex-1 bg-[#2b2b2b] text-white text-center py-2.5 px-2 rounded-full text-[14px] font-normal shadow-sm">
                  Smart Summaries
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Understand Your Health Better (lg:col-span-4) */}
          <div
            className="lg:col-span-4 bg-[#f3f5f7] rounded-[16px] p-8 flex flex-col justify-between min-h-[397px] relative overflow-hidden"
            data-node-id="665:3635"
          >
            {/* Top row with heading and robot icon */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-sans font-bold text-[20px] text-[#2b2b2b] leading-[1.3]">
                  Understand Your Health Better
                </h3>
                <span className="text-[16px] text-[#5c6063] mt-1 block">Start</span>
              </div>
              <div className="size-[40px] rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                <Image
                  src="/assets/landing-new/996aa8959f53dc00f30df19c632e98a00183a8dd.svg"
                  alt="AI Bot"
                  width={22}
                  height={19}
                  className="size-[20px]"
                />
              </div>
            </div>

            {/* Waveform graphic matching Figma 665:3643 */}
            <div className="w-full h-[168px] relative flex items-center justify-center mt-6">
              <Image
                src="/assets/landing-new/f843ee00b3420c1956b78f0f78abd5ab640054f1.svg"
                alt="Waveform telemetry"
                width={274}
                height={168}
                className="max-h-full object-contain"
              />
            </div>
          </div>

          {/* Card 3: Connect Your Healthcare Team (lg:col-span-4) */}
          <div
            className="lg:col-span-4 bg-[#078bde] rounded-[16px] p-8 flex flex-col justify-center items-center min-h-[397px] relative overflow-hidden text-center"
            data-node-id="665:3669"
          >
            {/* Concentric orbital rings matching Figma 665:3670, 3671, 3672 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="size-[260px] rounded-full border-2 border-white/20" />
              <div className="absolute size-[360px] rounded-full border-2 border-white/20" />
              <div className="absolute size-[460px] rounded-full border-2 border-white/20" />
            </div>

            {/* Orbiting Avatar Dots matching Figma */}
            <div className="absolute top-6 left-1/4 size-[40px] rounded-full overflow-hidden border border-white/40 shadow-md">
              <Image
                src="/assets/landing-new/d00c0eda9b2f2a34c0f9d864d6f6562ea70ac39a.png"
                alt=""
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-10 left-6 size-[40px] rounded-full overflow-hidden border border-white/40 shadow-md">
              <Image
                src="/assets/landing-new/56d7248471ab72b364b36ca971b65b23ebcbf18b.png"
                alt=""
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="absolute top-14 right-8 size-[40px] rounded-full overflow-hidden border border-white/40 shadow-md">
              <Image
                src="/assets/landing-new/3db93ad52d8c9e72d6a0cee2a8172f8f0f1679a9.png"
                alt=""
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-8 right-12 size-[40px] rounded-full overflow-hidden border border-white/40 shadow-md">
              <Image
                src="/assets/landing-new/fc2397e2b08f4f42f1bed9e47f0c3090d80a075b.png"
                alt=""
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Center Content matching Figma 665:3673 */}
            <div className="relative z-10 max-w-[200px]">
              <h3 className="font-sans font-bold text-[22px] leading-[1.3] text-[#01091e]">
                Connect Your Healthcare Team
              </h3>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
