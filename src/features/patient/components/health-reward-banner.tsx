import React from "react";
import Image from "next/image";
import Link from "next/link";

export function HealthRewardBanner() {
  return (
    <section className="w-full bg-[#FBFEFF] py-6 sm:py-8 overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-gradient-to-r from-[#004E92] via-[#000428] to-[#004E92] min-h-[160px] sm:min-h-[200px] flex items-center">
          {/* Background Illustration from Figma (img-046.png) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
            <Image
              src="/patient/steps-reward-banner.png"
              alt="Walk 5,000 steps and earn rewards"
              fill
              className="object-cover object-right sm:object-center"
              priority
            />
            {/* Soft gradient overlay for text readability on smaller screens */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#01091E]/90 via-[#01091E]/70 to-transparent sm:via-[#01091E]/40" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 p-5 sm:p-8 lg:p-10 max-w-xl">
            <span className="inline-block px-3 py-1 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
              Health Rewards
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Walk 5,000 Steps a Day <br className="hidden sm:inline" />
              and Earn EGP 10 Daily!
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-200 font-normal">
              Sync your health wearable, reach daily activity milestones, and redeem cash rewards into your mobile wallet.
            </p>

            <div className="mt-4 sm:mt-6">
              <Link
                href="/patient/rewards"
                className="inline-flex items-center justify-center bg-[#0080DF] hover:bg-[#0070C5] text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-blue-900/40 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
              >
                <span>Get started Now</span>
                <span className="ml-1.5" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

