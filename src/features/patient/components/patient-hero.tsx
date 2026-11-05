import React from "react";
import Image from "next/image";
import Link from "next/link";

export function PatientHero() {
  return (
    <section className="relative min-h-[580px] lg:min-h-[620px] bg-[#01091E] overflow-hidden pt-12 sm:pt-14 lg:pt-[64px] pb-14 sm:pb-16 flex items-center">
      {/* Background Visual Hierarchy matching Figma Home Patient */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        {/* Layer 1: Doctor & Biometric Holographic Interface */}
        <Image
          src="/landing/hero-image.svg"
          alt="Medical holographic interface"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-top lg:object-[center_top] w-full h-full"
        />

        {/* Layer 2: Hero Gradient SVG */}
        <Image
          src="/landing/hero-gradient.svg"
          alt=""
          fill
          priority
          unoptimized
          aria-hidden="true"
          className="object-cover object-top w-full h-full"
        />

        {/* Layer 3: Contrast preservation linear gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(1, 9, 30, 0.95) 0%, rgba(1, 9, 30, 0.85) 35%, rgba(1, 9, 30, 0.70) 55%, rgba(1, 9, 30, 0) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Layer 4: Soft bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#01091E] to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Headline */}
        <div className="w-full max-w-[637px]">
          <h1 className="text-3xl sm:text-4xl md:text-[50px] lg:text-[54px] font-extrabold tracking-tight leading-[1.12] text-white">
            <span className="block drop-shadow-sm">Your Health Data.</span>
            <span className="block text-[#078BDE] mt-1 sm:mt-2 drop-shadow-[0_0_35px_rgba(7,139,222,0.35)]">
              One Secure Identity.
            </span>
          </h1>
        </div>

        {/* Subtitle Paragraph */}
        <div className="w-full max-w-[672px] mt-4 sm:mt-6">
          <p className="text-base sm:text-[18px] text-slate-200/95 leading-relaxed font-normal">
            PulseID brings your medical records together in one secure place,
            helping you manage your health information and control how it is
            shared with authorized healthcare professionals.
          </p>
        </div>

        {/* Action Button: View my profile */}
        <div className="mt-8 flex items-center">
          <Link
            href="/patient/profile"
            className="inline-flex items-center justify-center bg-[#0080DF] hover:bg-[#0070C5] text-white font-semibold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-blue-900/40 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            <span>View my profile</span>
          </Link>
        </div>

        {/* Partner Bar: FOLLOW THE SUMMIT */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold shrink-0">
            FOLLOW THE SUMMIT:
          </span>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 opacity-75">
            <span className="text-white/80 font-bold text-sm tracking-wider">
              EGYPT HEALTHCARE AUTHORITY
            </span>
            <span className="text-white/60 font-medium text-xs tracking-wider">
              MINISTRY OF HEALTH & POPULATION
            </span>
            <span className="text-white/60 font-medium text-xs tracking-wider">
              UNIFIED MEDICAL REGISTRY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

