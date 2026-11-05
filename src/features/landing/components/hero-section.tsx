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

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Link
            href="/patient"
            className="inline-flex items-center justify-center bg-[#0080DF] hover:bg-[#0072C6] text-white font-semibold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            View my profile
          </Link>

          <a
            href="#challenges"
            className="inline-flex items-center justify-center border border-blue-500/50 hover:border-blue-400 bg-[#071329]/70 hover:bg-[#0B1E40] text-white font-medium text-base px-7 py-3.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Discover PulseID
          </a>
        </div>

        {/* Follow The Summit Social Proof Strip */}
        <div className="mt-10 sm:mt-12 pt-7 sm:pt-8 border-t border-white/15 flex items-center gap-4 flex-wrap max-w-5xl">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-300">
            FOLLOW THE SUMMIT:
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
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-slate-200 hover:text-white hover:border-blue-400 hover:bg-blue-500/20 transition-all"
              aria-label="LinkedIn"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-slate-200 hover:text-white hover:border-blue-400 hover:bg-blue-500/20 transition-all"
              aria-label="Instagram"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
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
