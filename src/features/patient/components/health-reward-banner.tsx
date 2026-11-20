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
    <section className="w-full bg-[#FBFEFF] py-4 sm:py-6 lg:py-8 overflow-hidden">
      <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        {/* =========================================================================
            MOBILE LAYOUT: Exact Figma Node 364:4540 (359px x 143px horizontal rectangle)
            Positioned directly above Recent Medical Activity (364:4539)
           ========================================================================= */}
        <div
          className="block lg:hidden relative w-full max-w-[359px] h-[143px] rounded-[12px] overflow-hidden shadow-sm shrink-0"
          style={{
            backgroundImage:
              "linear-gradient(266.27deg, #078BDE 6.61%, #044B78 68.69%)",
          }}
          data-node-id="364:4540"
          data-name="Daily Reward Banner - Mobile"
        >
          {/* Athletic Man Walking Cutout matching Figma 364:4541 */}
          <div
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-[84px] h-[143px] pointer-events-none select-none z-10"
            data-node-id="364:4541"
          >
            <Image
              src="/assets/patient-home/athletic-man-walking.png"
              alt="Athletic man walking"
              width={84}
              height={143}
              unoptimized
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          {/* Text stack & compact CTA button matching Figma 364:4542 */}
          <div
            className="absolute left-[16px] top-[18px] flex flex-col gap-[14px] items-start w-[215px] z-20"
            data-node-id="364:4542"
          >
            <div
              className="font-bold text-[18px] text-white leading-snug tracking-[0px]"
              data-node-id="364:4543"
            >
              <p className="mb-0">Walk 5,000 Steps a Day</p>
              <p>and Earn EGP 10 Daily!</p>
            </div>

            <Link
              href="/patient"
              className="bg-[#078BDE] hover:bg-[#0677BE] rounded-[12px] px-[12px] py-[8px] flex items-center gap-[6px] transition-all cursor-pointer shadow-sm"
              data-node-id="364:4544"
            >
              <span
                className="font-medium text-[12px] text-white whitespace-nowrap leading-none"
                data-node-id="364:4545"
              >
                Get started Now
              </span>
              <div className="size-[14px] relative shrink-0 rotate-90" data-node-id="364:4546">
                <Image
                  src="/assets/patient-home/arrow-up.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP LAYOUT: Exact Figma Node 299:5181 (1216px x 329px horizontal rectangle)
           ========================================================================= */}
        <div
          className="hidden lg:block relative w-full max-w-[1216px] h-[329px] rounded-[12px] overflow-hidden shadow-sm shrink-0"
          style={{
            backgroundImage:
              "linear-gradient(264.52deg, #078BDE 6.61%, #044B78 68.69%)",
          }}
          data-node-id="299:5181"
          data-name="Daily Reward Banner - Desktop"
        >
          {/* Background Decorative Pattern with Mask */}
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

          {/* 7 Glowing Stars matching Figma Node 299:5236 */}
          <div className="absolute inset-0 pointer-events-none">
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
            className="absolute left-[920px] top-1/2 -translate-y-1/2 w-[195px] h-[329px] pointer-events-none select-none z-10"
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
            className="absolute left-[40px] top-1/2 -translate-y-1/2 flex flex-col gap-[36px] items-start max-w-[500px] z-20"
            data-node-id="299:5230"
          >
            <div
              className="font-heading font-bold text-[36px] text-white leading-tight tracking-[0px]"
              data-node-id="299:5231"
            >
              <p className="mb-0">Walk 5,000 Steps a Day</p>
              <p>and Earn EGP 10 Daily!</p>
            </div>

            <Link
              href="/patient"
              className="bg-[#078BDE] hover:bg-[#0677BE] rounded-[12px] px-[28px] py-[12px] flex items-center gap-[8px] transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-[#078BDE]/40"
              data-node-id="299:5232"
            >
              <span
                className="font-sans font-medium text-[16px] text-white whitespace-nowrap leading-normal"
                data-node-id="299:5233"
              >
                Get started Now
              </span>
              <div className="size-[16px] relative shrink-0 rotate-90" data-node-id="299:5234">
                <Image
                  src="/assets/patient-home/arrow-up.svg"
                  alt=""
                  width={16}
                  height={16}
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
