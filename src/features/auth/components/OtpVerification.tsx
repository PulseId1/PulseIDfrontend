"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthCardShell } from "./AuthCardShell";
import { DemoService } from "@/lib/demo/demo-service";

const OTP_LENGTH = 4;
const INITIAL_COUNTDOWN = 50;

export function OtpVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phoneParam = searchParams.get("phone") || "";
  const role = searchParams.get("role") || "patient";
  const mode = searchParams.get("mode") || "register";

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 50s Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Autofocus first box
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (error) setError(null);
    const char = value.slice(-1);
    if (char && !/^\d$/.test(char)) return;

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        setDigits(newDigits);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);

    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setDigits(Array(OTP_LENGTH).fill(""));
    setCountdown(INITIAL_COUNTDOWN);
    setError(null);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter the complete 4-digit code.");
      return;
    }

    if (!DemoService.verifySimulatedOtp(code)) {
      setError("Invalid OTP code. Please enter 4 numeric digits.");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);

      if (mode === "login") {
        router.push(`/auth/login?phone=${encodeURIComponent(phoneParam)}&role=${role}`);
      } else {
        router.push(
          `/auth/register/info?phone=${encodeURIComponent(phoneParam)}&role=${role}`
        );
      }
    }, 300);
  };

  return (
    <AuthCardShell heroImage="/assets/auth/auth-otp-hero.png">
      <div className="w-full flex flex-col items-start min-w-0" data-node-id="116:1131">
        {/* Heading Block matching Figma node 116:1133 */}
        <div className="pb-8 w-full">
          <h1 className="text-[28px] sm:text-[30px] font-bold leading-tight text-[#02307D] font-heading">
            Verify Your Phone
          </h1>
          <div className="mt-2 text-[15px] sm:text-[16px] text-[#41474F] font-normal leading-normal">
            <p>Enter the 4-digit code sent to your phone number</p>
            <p className="mt-0.5">
              <span className="font-semibold text-[#01091E]">+20 {phoneParam}</span>
              <span className="mx-2 text-slate-300">|</span>
              <Link
                href={`/auth/register?role=${role}&phone=${encodeURIComponent(phoneParam)}`}
                className="font-bold text-[#078BDE] hover:text-[#0060A8] transition-colors"
              >
                Edit
              </Link>
            </p>
          </div>
        </div>

        {/* Prototype notice: SMS gateway unsupported in v1 */}
        <div className="w-full mb-6 p-3 rounded-lg bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2">
          <span className="font-bold text-amber-600 mt-0.5">ℹ</span>
          <span>
            <strong>Simulated Verification:</strong> SMS OTP Gateway is not provided by backend API v1 (<code className="font-mono bg-amber-100 px-1 rounded text-[11px]">BACKEND_UNSUPPORTED</code>). Enter demo OTP <strong className="font-mono text-[#02307D]">{DemoService.DEMO_OTP}</strong> (or any 4 digits) to proceed.
          </span>
        </div>

        {/* OTP Input Form matching Figma node 116:1139 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
          {/* 4-Digit Boxes */}
          <div className="flex items-center justify-between gap-3 sm:gap-4 w-full">
            {digits.map((digit, index) => {
              const isFilled = digit !== "";
              return (
                <div
                  key={index}
                  className={`w-[72px] sm:w-[92px] h-[80px] sm:h-[100px] rounded-[10px] bg-[#F0F2F6] flex items-center justify-center transition-all ${
                    isFilled
                      ? "border border-[#078BDE] bg-white shadow-sm"
                      : "border border-transparent hover:border-slate-300"
                  }`}
                >
                  <input
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-full h-full bg-transparent text-center font-bold text-[28px] sm:text-[32px] text-[#01091E] outline-none caret-[#078BDE]"
                  />
                </div>
              );
            })}
          </div>

          {error && (
            <p className="text-xs text-rose-500 font-medium text-center -mt-4">
              {error}
            </p>
          )}

          {/* Resend Code Info matching Figma node 116:1149 */}
          <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-[14px] text-[#01091E] font-normal">
              Didn’t receive the code?
            </p>

            <div className="flex items-center gap-3">
              <div className="w-[18px] h-[18px] relative shrink-0">
                <Image
                  src="/assets/auth/icon-reset.svg"
                  alt=""
                  width={18}
                  height={18}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>

              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0}
                className="text-[14px] font-medium text-[#078BDE] hover:text-[#0060A8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Resend Code
              </button>

              <span className="text-[14px] text-[#01091E] font-medium">
                ( {countdown}s )
              </span>
            </div>
          </div>

          {/* Next Button matching Figma node 116:1157 */}
          <button
            type="submit"
            disabled={isVerifying}
            className="h-[56px] rounded-[12px] bg-[#078BDE] hover:bg-[#0070B8] active:scale-[0.99] text-white font-medium text-[14px] flex items-center justify-center gap-2 cursor-pointer transition-all w-full shadow-sm disabled:opacity-70"
          >
            {isVerifying ? (
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
      </div>
    </AuthCardShell>
  );
}
