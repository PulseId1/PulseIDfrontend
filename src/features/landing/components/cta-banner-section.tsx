"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export function CtaBannerSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white py-12 sm:py-20"
      data-node-id="665:3864"
      data-name="CtaBannerSection"
    >
      <div className="max-w-[1208px] mx-auto px-4 sm:px-6">
        {/* Banner Card matching Figma 665:3865 */}
        <div className="w-full min-h-[460px] sm:min-h-[520px] lg:h-[550px] rounded-[32px] overflow-hidden relative p-8 sm:p-14 lg:p-16 flex flex-col justify-between shadow-2xl">
          {/* Background image & dark overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/assets/landing-new/919756ef14979bdc91d98fcad893ba0a72d00b30.png"
              alt="Global Healthcare Connectivity"
              fill
              unoptimized
              loading="eager"
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          {/* Heading matching Figma 665:3868 */}
          <div className="relative z-10 max-w-[1020px]">
            <h2 className="font-sans font-bold text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.1] text-white tracking-[-2px] sm:tracking-[-2.88px]">
              Your Health Data. Your Control. Your PulseID.
            </h2>
          </div>

          {/* Pill Action Button matching Figma 665:3869 */}
          <div className="relative z-10 pt-8">
            <Link
              href="/auth/role"
              className="inline-flex items-center gap-4 px-[36px] sm:px-[50px] py-[16px] sm:py-[18px] rounded-full border border-white text-white font-bold text-[16px] sm:text-[18px] tracking-[-0.36px] shadow-lg transition-transform hover:-translate-y-0.5 group"
              style={{
                backgroundImage:
                  "linear-gradient(74.5deg, #078bde 23.9%, #acdfff 97.2%)",
              }}
            >
              <span>Get Started Today</span>
              <Image
                src="/assets/landing-new/ca32cc4dd1482bbbbb2df755468ea50f51badcf5.svg"
                alt=""
                width={14}
                height={14}
                className="size-[14px] transition-transform group-hover:translate-x-1 brightness-0 invert"
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
