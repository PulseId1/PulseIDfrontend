"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function HealthRewardBanner() {
  const stars = [
    { left: "827px", top: "-10px", id: "star-1" },
    { left: "788px", top: "37px", id: "star-2" },
    { left: "766px", top: "97px", id: "star-3" },
    { left: "762px", top: "165px", id: "star-4" },
    { left: "774px", top: "222px", id: "star-5" },
    { left: "789px", top: "267px", id: "star-6" },
    { left: "828px", top: "309px", id: "star-7" },
  ];

  return (
    <section className="w-full bg-[#FBFEFF] py-6 sm:py-8 overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div
          className="relative w-full max-w-[1216px] h-[329px] rounded-[12px] overflow-hidden shadow-sm"
          style={{
            backgroundImage:
              "linear-gradient(264.52deg, #078BDE 6.61%, #044B78 68.69%)",
          }}
          data-node-id="299:5181"
        >
          {/* Background Decorative Pattern with Mask matching Figma Node 299:5182 */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'url("/assets/patient-home/daily-reward-pattern.svg")',
              backgroundRepeat: "repeat",
              backgroundSize: "cover",
              maskImage: 'url("/assets/patient-home/daily-reward-mask.svg")',
              WebkitMaskImage: 'url("/assets/patient-home/daily-reward-mask.svg")',
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />

          {/* 7 Glowing Stars matching Figma Node 299:5236 to 299:5254 */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute size-[30px]"
                style={{ left: star.left, top: star.top }}
              >
                <Image
                  src="/assets/patient-home/glowing-star.svg"
                  alt=""
                  width={30}
                  height={30}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Cutout Man Walking matching Figma Node 299:5229 */}
          <div
            className="absolute right-4 sm:right-12 lg:left-[920px] top-1/2 -translate-y-1/2 w-[160px] sm:w-[195px] h-[329px] pointer-events-none select-none z-10"
            data-node-id="299:5229"
          >
            <Image
              src="/assets/patient-home/athletic-man-walking.png"
              alt="Athletic man walking"
              width={195}
              height={329}
              unoptimized
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          {/* Headline & CTA Action matching Figma Node 299:5230 */}
          <div
            className="absolute left-[24px] sm:left-[40px] top-1/2 -translate-y-1/2 flex flex-col gap-[40px] sm:gap-[73px] items-start max-w-[500px] z-20"
            data-node-id="299:5230"
          >
            <div
              className="font-heading font-bold text-[26px] sm:text-[32px] lg:text-[36px] text-white leading-tight tracking-[0px]"
              data-node-id="299:5231"
            >
              <p className="mb-0">Walk 5,000 Steps a Day</p>
              <p>and Earn EGP 10 Daily!</p>
            </div>

            <Link
              href="/patient"
              className="bg-[#078BDE] hover:bg-[#0677BE] rounded-[12px] px-[20px] sm:px-[28px] py-[8px] sm:py-[10px] flex items-center gap-[8px] transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-[#078BDE]/40"
              data-node-id="299:5232"
            >
              <span
                className="font-sans font-medium text-[22px] sm:text-[28px] lg:text-[32px] text-white whitespace-nowrap leading-normal"
                data-node-id="299:5233"
              >
                Get started Now
              </span>
              <div className="size-[18px] relative shrink-0 rotate-90" data-node-id="299:5234">
                <Image
                  src="/assets/patient-home/arrow-up.svg"
                  alt=""
                  width={18}
                  height={18}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
