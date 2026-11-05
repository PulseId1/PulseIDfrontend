"use client";

import React from "react";
import Image from "next/image";

interface AuthCardShellProps {
  heroImage: string;
  heroAlt: string;
  children: React.ReactNode;
}

export function AuthCardShell({
  heroImage,
  heroAlt,
  children,
}: AuthCardShellProps) {
  return (
    <div className="flex flex-col lg:flex-row w-full items-stretch bg-white min-w-0">
      {/* Left Column: Hero Medical Imagery (Visible on lg+) */}
      <div className="hidden lg:block lg:w-1/2 relative min-h-[540px] overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>

      {/* Right Column: Authentication Form Content */}
      <div className="w-full lg:w-1/2 p-4 sm:p-8 lg:p-12 flex flex-col justify-center min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
