"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeroBackgroundSlider,
  DEFAULT_LANDING_HERO_SLIDES,
} from "@/components/common";

export function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[668px] bg-[#01091e] overflow-hidden"
      data-node-id="665:3565"
      data-name="HeroSection"
    >
      {/* Background Rotating Slider matching Figma Component 39 (Node 665:3566 / Node 146:392) */}
      <HeroBackgroundSlider
        slides={DEFAULT_LANDING_HERO_SLIDES}
        intervalMs={5500}
        showBottomFade={true}
        dataNodeId="665:3566"
        overlayGradient={
          <div
            className="absolute inset-0 bg-gradient-to-r from-[rgba(1,9,30,0.95)] via-[rgba(1,9,30,0.75)] to-[rgba(1,9,30,0.25)] pointer-events-none"
            aria-hidden="true"
          />
        }
      />

      {/* Main Content Container matching Figma Node 665:3567 */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 py-16 sm:py-20 flex flex-col justify-between min-h-[668px]">
        <div className="flex flex-col items-start max-w-[720px] pt-4 sm:pt-8">
          {/* Main Title matching Figma 665:3571 */}
          <h1 className="font-sans font-bold text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.1] tracking-tight">
            <span className="block text-white">Your Health Data.</span>
            <span className="block text-[#078bde] mt-1">One Secure Identity.</span>
          </h1>

          {/* Subtitle Description matching Figma 665:3575 */}
          <p className="mt-6 text-[16px] sm:text-[18px] leading-[1.6] text-[#eaedf6] max-w-[662px]">
            PulseID brings your medical records together in one secure place, helping you
            manage your health information and control how it is shared with authorized
            healthcare professionals.
          </p>

          {/* Action Buttons with equalized heights matching user request */}
          <div className="mt-8 flex flex-wrap items-center gap-[16px]">
            <Link
              href="/auth/role"
              className="h-[46px] bg-[#078bde] hover:bg-[#067bc5] text-[#eaedf6] font-semibold text-[15px] px-[24px] rounded-[10px] flex items-center justify-center gap-[8px] shadow-lg shadow-blue-900/30 transition-all transform hover:-translate-y-0.5 group"
            >
              <span>Get Started</span>
              <Image
                src="/assets/landing-new/ca32cc4dd1482bbbbb2df755468ea50f51badcf5.svg"
                alt=""
                width={12}
                height={12}
                className="size-[12px] transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <button
              type="button"
              className="h-[46px] px-[20px] rounded-[10px] border border-[#02307d] bg-[rgba(2,48,125,0.45)] backdrop-blur-sm hover:bg-[rgba(2,48,125,0.75)] text-white font-semibold text-[15px] flex items-center justify-center gap-[12px] transition-colors"
            >
              <span>Intro</span>
              <Image
                src="/assets/landing-new/9f6920c702f582fa51c0af145eddcc2a8770a775.svg"
                alt=""
                width={20}
                height={20}
                className="size-[20px]"
              />
            </button>
          </div>
        </div>

        {/* Bottom Social Bar matching Figma 665:3580 */}
        <div className="w-full pt-8 mt-12 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-6">
          <span className="font-semibold text-[12px] text-white/70 tracking-[1.2px] uppercase">
            FOLLOW THE PULSEID:
          </span>
          <div className="flex items-center gap-[8px]">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="size-[36px] rounded-[8px] backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border border-[#dde7ff]/30 hover:border-[#dde7ff] flex items-center justify-center transition-colors"
              aria-label="PulseID on Facebook"
            >
              <Image
                src="/assets/landing-new/ac2d16bab3a1bad1ffd6aea9ad1a7da5c4e15e9c.svg"
                alt="Facebook"
                width={16}
                height={16}
                className="size-[16px]"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="size-[36px] rounded-[8px] backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border border-[#dde7ff]/30 hover:border-[#dde7ff] flex items-center justify-center transition-colors"
              aria-label="PulseID on LinkedIn"
            >
              <Image
                src="/assets/landing-new/a9e99ad78a6e691e9d5478f6db14fde3f4608ad2.svg"
                alt="LinkedIn"
                width={16}
                height={16}
                className="size-[16px]"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="size-[36px] rounded-[8px] backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border border-[#dde7ff]/30 hover:border-[#dde7ff] flex items-center justify-center transition-colors"
              aria-label="PulseID on Instagram"
            >
              <Image
                src="/assets/landing-new/5dd6fa4a2a3c70a30748ca2dd3736363691912f7.svg"
                alt="Instagram"
                width={16}
                height={16}
                className="size-[16px]"
              />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="size-[36px] rounded-[8px] backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border border-[#dde7ff]/30 hover:border-[#dde7ff] flex items-center justify-center transition-colors"
              aria-label="PulseID on TikTok"
            >
              <Image
                src="/assets/landing-new/df0a7cb7c183b8a5dcfca45c0b5962cf1f24bf3e.svg"
                alt="TikTok"
                width={16}
                height={16}
                className="size-[16px]"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
