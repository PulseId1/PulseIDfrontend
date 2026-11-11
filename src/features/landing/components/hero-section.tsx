import React from "react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[668px] bg-[#01091E] overflow-hidden pt-14 sm:pt-16 lg:pt-[72px] pb-16 sm:pb-20 flex items-center">
      {/* 
        Background Visual Hierarchy from Figma (Frame 1171277861):
        Layer 1: Doctor Visual (hero-image.svg) positioned object-top so the 81px navbar is slightly above the glasses
        Layer 2: Official Figma Hero Gradient SVG (hero-gradient.svg)
        Layer 3: Exact linear gradient overlay ensuring text contrast across all resolutions
        Layer 4: Bottom fade into Section 2
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        {/* Layer 1: Doctor & Biometric Holographic Interface */}
        <Image
          src="/landing/hero-image.svg"
          alt="Surgeon with biometric medical holographic interface"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-top lg:object-[center_top] w-full h-full"
        />

        {/* Layer 2: Official Figma Hero Gradient SVG */}
        <Image
          src="/landing/hero-gradient.svg"
          alt=""
          fill
          priority
          unoptimized
          aria-hidden="true"
          className="object-cover object-top w-full h-full"
        />

        {/* Layer 3: Contrast preservation linear gradient matching Figma stops (0.95 left -> 0.75 center -> 0 right) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(1, 9, 30, 0.95) 0%, rgba(1, 9, 30, 0.85) 35%, rgba(1, 9, 30, 0.70) 55%, rgba(1, 9, 30, 0) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Layer 4: Soft bottom fade transition into Section 2 */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#01091E] to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        {/* 
          Text Block 1: Headline
          Figma properties:
          width: 637px;
          height: 182px;
          padding-bottom: 24px;
        */}
        <div
          className="w-full max-w-[637px] flex flex-col justify-center"
          style={{
            maxWidth: "637px",
            minHeight: "182px",
            paddingBottom: "24px",
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-[54px] lg:text-[56px] font-extrabold tracking-tight leading-[1.12] text-white">
            <span className="block drop-shadow-sm whitespace-normal sm:whitespace-nowrap">
              Your Health Data.
            </span>
            <span className="block text-[#078BDE] mt-1 sm:mt-2 drop-shadow-[0_0_35px_rgba(7,139,222,0.35)] whitespace-normal sm:whitespace-nowrap">
              One Secure Identity.
            </span>
          </h1>
        </div>

        {/* 
          Text Block 2: Subtitle Paragraph
          Figma properties:
          width: 663.97px;
          max-width: 672px;
          height: 90px;
          padding-right: 1.97px;
          padding-bottom: 24px;
        */}
        <div
          className="w-full"
          style={{
            maxWidth: "672px",
            minHeight: "90px",
            paddingRight: "1.97px",
            paddingBottom: "24px",
          }}
        >
          <p
            className="text-base sm:text-[18px] text-slate-200/95 leading-[30px] font-normal"
            style={{ maxWidth: "663.97px" }}
          >
            <span className="lg:block">
              PulseID brings your medical records together in one secure place, helping you{" "}
            </span>
            <span className="lg:block">
              manage your health information and control how it is shared with authorized{" "}
            </span>
            <span className="lg:block">
              healthcare professionals.
            </span>
          </p>
        </div>

        {/* CTA Buttons matching Figma 238:724 & Mobile 218:622 */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full max-w-[350px] sm:max-w-none">
          <Link
            href="/patient"
            className="inline-flex items-center justify-center gap-2.5 bg-[#0080DF] hover:bg-[#0072C6] text-white font-semibold text-[15px] sm:text-base h-[45px] sm:h-[47px] px-7 rounded-[10px] sm:rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 group"
          >
            <span>View my profile</span>
            <Image
              src="/assets/figma/icons/icon-arrow-button.svg"
              alt=""
              width={12}
              height={12}
              unoptimized
              className="size-[12px] transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <a
            href="#challenges"
            className="inline-flex items-center justify-center gap-2.5 border-2 border-[#1B458A] hover:border-blue-400 bg-[#071329]/70 hover:bg-[#0B1E40] text-white font-medium text-[14px] sm:text-base h-[47px] px-7 rounded-[10px] sm:rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 group"
          >
            <span>Discover PulseID</span>
            <Image
              src="/assets/figma/icons/icon-arrow-button.svg"
              alt=""
              width={12}
              height={12}
              unoptimized
              className="size-[12px] transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Follow The Summit Social Proof Strip */}
        <div className="mt-10 sm:mt-12 pt-7 sm:pt-8 border-t border-white/15 flex items-center gap-4 flex-wrap max-w-5xl">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-300">
            FOLLOW THE HEALTHCARE SUMMIT:
          </span>
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-slate-200 hover:text-white hover:border-blue-400 hover:bg-blue-500/20 transition-all"
              aria-label="Facebook"
            >
              <Image
                src="/assets/figma/icons/social-facebook.svg"
                alt=""
                width={16}
                height={16}
                unoptimized
                className="size-4"
              />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-slate-200 hover:text-white hover:border-blue-400 hover:bg-blue-500/20 transition-all"
              aria-label="LinkedIn"
            >
              <Image
                src="/assets/figma/icons/social-linkedin.svg"
                alt=""
                width={16}
                height={16}
                unoptimized
                className="size-4"
              />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-slate-200 hover:text-white hover:border-blue-400 hover:bg-blue-500/20 transition-all"
              aria-label="Instagram"
            >
              <Image
                src="/assets/figma/icons/social-instagram.svg"
                alt=""
                width={16}
                height={16}
                unoptimized
                className="size-4"
              />
            </a>

            {/* TikTok / Other */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-slate-200 hover:text-white hover:border-blue-400 hover:bg-blue-500/20 transition-all"
              aria-label="TikTok"
            >
              <Image
                src="/assets/figma/icons/social-tiktok.svg"
                alt=""
                width={16}
                height={16}
                unoptimized
                className="size-4"
              />
            </a>

            {/* Email / Mail */}
            <a
              href="mailto:contact@pulseid.health"
              className="w-9 h-9 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-slate-200 hover:text-white hover:border-blue-400 hover:bg-blue-500/20 transition-all"
              aria-label="Email Contact"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
