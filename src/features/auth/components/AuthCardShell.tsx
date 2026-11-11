"use client";

import React from "react";
import Image from "next/image";

interface AuthCardShellProps {
  children: React.ReactNode;
  heroImage?: string;
  heroAlt?: string;
  isTall?: boolean;
}

export function AuthCardShell({
  children,
  heroImage = "/assets/auth/auth-visual-branding.png",
  heroAlt = "PulseID Healthcare Authentication",
  isTall = false,
}: AuthCardShellProps) {
  return (
    <div className="w-full flex items-center justify-center min-w-0">
      <div
        className={`w-full max-w-[1100px] bg-white/95 backdrop-blur-[10px] rounded-[24px] shadow-[0px_20px_40px_0px_rgba(93,95,239,0.08)] border border-[rgba(93,95,239,0.1)] overflow-hidden flex flex-col lg:flex-row items-stretch ${
          isTall ? "min-h-[746px] lg:min-h-[960px]" : "min-h-[746px]"
        }`}
      >
        {/* Left Side: Visual / Branding from Figma Node 116:906 */}
        <div className="hidden lg:block w-[549px] shrink-0 relative overflow-hidden bg-[#078BDE]/10">
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            priority
            unoptimized
            className="object-cover object-center pointer-events-none select-none"
          />
        </div>

        {/* Right Side: Form Container matching Figma Node 116:907 */}
        <div className="flex-1 w-full lg:max-w-[551px] flex flex-col justify-center px-6 sm:px-10 lg:px-[64px] py-8 lg:py-[50px] min-w-0">
          <div className="w-full max-w-[421px] mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
