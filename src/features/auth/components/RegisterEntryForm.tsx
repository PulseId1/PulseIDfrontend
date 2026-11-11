"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthCardShell } from "./AuthCardShell";

export function RegisterEntryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "patient";

  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 8) {
      setError("Please enter a valid phone number.");
      return;
    }

    setIsLoading(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("pulseid_register_phone", phone);
      localStorage.setItem("pulseid_register_role", role);
    }

    setTimeout(() => {
      setIsLoading(false);
      router.push(`/auth/verify?mode=register&phone=${encodeURIComponent(phone)}&role=${role}`);
    }, 350);
  };

  return (
    <AuthCardShell heroImage="/assets/auth/auth-phone-hero.png">
      <div className="w-full flex flex-col items-start min-w-0" data-node-id="116:907">
        {/* Heading Block matching Figma node 116:908 */}
        <div className="pb-8 w-full">
          <h1 className="text-[28px] sm:text-[30px] font-bold leading-tight font-heading">
            <span className="text-[#02307D]">Welcome to </span>
            <span className="text-[#078BDE]">Pulse ID</span>
          </h1>
          <p className="mt-2 text-[15px] sm:text-[16px] text-[#41474F] font-normal leading-normal">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Form matching Figma node 116:915 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          {/* Phone Field Block */}
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="register-phone"
              className="text-[12px] font-medium text-[#41474F] block"
            >
              Phone Number
            </label>

            <div className="bg-[#C0CAE3]/10 border border-[#DDE7FF] rounded-[8px] h-[56px] relative flex items-center overflow-hidden focus-within:border-[#078BDE] transition-colors w-full">
              {/* Left Phone Icon */}
              <div className="pl-4 pr-3 flex items-center justify-center shrink-0">
                <div className="w-6 h-6 relative">
                  <Image
                    src="/assets/auth/icon-phone.svg"
                    alt=""
                    width={24}
                    height={24}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Number Input */}
              <input
                id="register-phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="01000000100000"
                className="flex-1 bg-transparent border-none outline-none text-[16px] text-[#040A17] placeholder:text-[#8B8B8B] font-normal min-w-0"
              />

              {/* Right Flag & +20 Prefix Block */}
              <div className="border-l border-[#D0DEFF] h-full px-3.5 flex items-center justify-center gap-1.5 shrink-0 bg-transparent">
                <div className="w-6 h-6 relative shrink-0">
                  <Image
                    src="/assets/auth/flag-egypt.svg"
                    alt="Egypt flag"
                    width={24}
                    height={24}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[12px] font-medium text-[#040A17] font-sans">
                  +20
                </span>
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-500 font-medium">{error}</p>
            )}
          </div>

          {/* Security Notice Card matching Figma node 116:938 */}
          <div className="bg-[#C0CAE3]/10 border border-[#DDE7FF] rounded-[16px] p-4 flex items-start gap-3.5 w-full">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-white border border-[#DDE7FF] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <div className="w-5 h-5 relative">
                <Image
                  src="/assets/auth/icon-lock.svg"
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#41474F] font-normal leading-snug">
              We’ll send you a one-time verification code (OTP) to verify your
              identity and secure your account.
            </p>
          </div>

          {/* Next Button matching Figma node 116:945 */}
          <button
            type="submit"
            disabled={isLoading}
            className="h-[56px] rounded-[12px] bg-[#078BDE] hover:bg-[#0070B8] active:scale-[0.99] text-white font-medium text-[14px] flex items-center justify-center gap-2 cursor-pointer transition-all w-full shadow-sm disabled:opacity-70"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>Next</span>
                <div className="w-[18px] h-[18px] relative rotate-90">
                  <Image
                    src="/assets/auth/icon-arrow-next.svg"
                    alt=""
                    width={18}
                    height={18}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
              </>
            )}
          </button>
        </form>

        {/* Bottom Link matching Figma node 116:949 */}
        <div className="pt-8 w-full">
          <p className="text-[14px] text-[#41474F] text-center">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-[#078BDE] hover:text-[#0060A8] transition-colors ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthCardShell>
  );
}
