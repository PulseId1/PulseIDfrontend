"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HeroBackgroundSlider,
  DEFAULT_PATIENT_HERO_SLIDES,
} from "@/components/common";

export function PatientHero() {
  const router = useRouter();

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const completed =
      typeof window !== "undefined" &&
      localStorage.getItem("pulseid_patient_profile_completed") === "true";
    if (!completed) {
      router.push("/patient/profile/edit?first_time=true");
    } else {
      router.push("/patient/profile");
    }
  };

  return (
    <section
      className="relative w-full min-h-[500px] lg:h-[668px] py-10 lg:py-0 overflow-hidden bg-[#01091E] flex items-center"
      data-node-id="299:4932"
    >
      {/* Background Slideshow with Exact Figma Gradients matching Component 2 (Node 288:561) */}
      <HeroBackgroundSlider
        slides={DEFAULT_PATIENT_HERO_SLIDES}
        intervalMs={6000}
        dataNodeId="288:561"
      />

      {/* Hero Content Container matching Figma Node 299:4934 (Desktop) & 364:4478 (Mobile) */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="w-full max-w-[1216px] flex flex-col items-start pt-2 lg:pt-6" data-node-id="299:4934">
          {/* Main Title & Copy Block */}
          <div className="flex flex-col items-start pb-4 lg:pb-[24px]" data-node-id="299:4936">
            <h1
              className="font-heading font-bold text-[32px] sm:text-[48px] lg:text-[64px] leading-tight flex flex-col gap-1 not-italic text-left"
              data-node-id="299:4938"
            >
              <span className="text-white drop-shadow-sm" data-node-id="299:4939">
                Your Health Journey.
              </span>
              <span className="text-[#078BDE]" data-node-id="299:4940">
                All in One Place.
              </span>
            </h1>

            <p
              className="mt-3 lg:mt-[20px] pb-2 font-sans font-normal text-[14px] sm:text-[16px] lg:text-[18px] text-[#EAEDF6] leading-relaxed max-w-[662px] text-left"
              data-node-id="299:4942"
            >
              Access your medical records and health information securely, all in one place.
              Stay informed and in control of your healthcare journey.
            </p>

            {/* Action Buttons: Stacked on Mobile (364:4478), Row on Desktop (299:4943) */}
            <div
              className="mt-5 lg:mt-[24px] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-[16px] w-full max-w-[390px] sm:max-w-none"
              data-node-id="299:4944"
            >
              {/* Primary Button: Medical Information */}
              <Link
                href="/patient/medical-info"
                className="w-full sm:w-auto bg-[#078BDE] hover:bg-[#0677BE] text-[#EAEDF6] font-semibold text-[15px] sm:text-[16px] h-[48px] sm:h-auto px-6 lg:px-[28px] py-3 lg:py-[14px] rounded-[10px] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#078BDE]/30"
                data-node-id="288:602"
              >
                <span>Medical Information</span>
                <div className="size-[12px] relative shrink-0">
                  <Image
                    src="/assets/patient-home/btn-arrow-right.svg"
                    alt=""
                    width={12}
                    height={12}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>

              {/* Secondary Button: View my profile (First-time redirect logic) */}
              <button
                type="button"
                onClick={handleProfileClick}
                className="w-full sm:w-auto bg-[rgba(2,48,125,0.55)] hover:bg-[rgba(2,48,125,0.8)] border border-[#02307D] text-[#EAEDF6] font-semibold text-[15px] sm:text-[16px] h-[48px] sm:h-auto px-6 lg:px-[28px] py-3 lg:py-[14px] rounded-[10px] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                data-node-id="288:616"
              >
                <span>View my profile</span>
                <div className="size-[12px] relative shrink-0">
                  <Image
                    src="/assets/patient-home/btn-arrow-right.svg"
                    alt=""
                    width={12}
                    height={12}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Social / Summit Bar matching Figma Node 299:4947 / 299:4948 */}
          <div className="w-full pt-4 lg:pt-[24px]" data-node-id="299:4947">
            <div
              className="border-t border-[rgba(255,255,255,0.15)] pt-4 lg:pt-[33px] flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-[12px]"
              data-node-id="299:4948"
            >
              <div className="pr-[8px]">
                <span
                  className="font-semibold text-[11px] sm:text-[12px] text-[rgba(255,255,255,0.7)] tracking-[1.2px] uppercase whitespace-nowrap leading-[16px]"
                  data-node-id="299:4951"
                >
                  FOLLOW THE SUMMIT:
                </span>
              </div>

              {/* 4 Social Media Buttons */}
              <div className="flex items-center gap-[8px]" data-node-id="299:4952">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#DDE7FF] rounded-[8px] size-[36px] flex items-center justify-center p-[0.5px] hover:bg-[rgba(192,202,227,0.25)] transition-colors"
                  aria-label="Facebook"
                  data-node-id="146:429"
                >
                  <div className="size-[16px] relative shrink-0">
                    <Image
                      src="/assets/patient-home/social-fb.svg"
                      alt="Facebook"
                      width={16}
                      height={16}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#DDE7FF] rounded-[8px] size-[36px] flex items-center justify-center p-[0.5px] hover:bg-[rgba(192,202,227,0.25)] transition-colors"
                  aria-label="LinkedIn"
                  data-node-id="146:441"
                >
                  <div className="size-[16px] relative shrink-0">
                    <Image
                      src="/assets/patient-home/social-linkedin.svg"
                      alt="LinkedIn"
                      width={16}
                      height={16}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#DDE7FF] rounded-[8px] size-[36px] flex items-center justify-center p-[0.5px] hover:bg-[rgba(192,202,227,0.25)] transition-colors"
                  aria-label="Instagram"
                  data-node-id="146:447"
                >
                  <div className="size-[16px] relative shrink-0">
                    <Image
                      src="/assets/patient-home/social-insta.svg"
                      alt="Instagram"
                      width={16}
                      height={16}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#DDE7FF] rounded-[8px] size-[36px] flex items-center justify-center p-[0.5px] hover:bg-[rgba(192,202,227,0.25)] transition-colors"
                  aria-label="TikTok"
                  data-node-id="146:453"
                >
                  <div className="size-[16px] relative shrink-0">
                    <Image
                      src="/assets/patient-home/social-tiktok.svg"
                      alt="TikTok"
                      width={16}
                      height={16}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
