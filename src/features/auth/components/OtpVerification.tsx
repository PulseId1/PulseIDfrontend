"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { AuthCardShell } from "./AuthCardShell";
import { Button } from "@/components/ui/button";
import { VerificationSuccessModal } from "./VerificationSuccessModal";

const OTP_LENGTH = 4;
const INITIAL_COUNTDOWN = 50;

export function OtpVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { role, language } = useAuth();

  const phoneParam = searchParams.get("phone") || "01000000100000";
  const countryParam = searchParams.get("country") || "EG";
  const mode = (searchParams.get("mode") as "login" | "register") || "register";

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN);
  const [error, setError] = useState<string | undefined>();
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const canResend = countdown <= 0;

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (error) setError(undefined);

    const char = value.slice(-1);
    if (char && !/^\d$/.test(char)) return;

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
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
    if (!canResend) return;
    setDigits(Array(OTP_LENGTH).fill(""));
    setCountdown(INITIAL_COUNTDOWN);
    setError(undefined);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = digits.join("");

    if (enteredOtp.length < OTP_LENGTH) {
      setError(
        language === "ar"
          ? "يرجى إدخال رمز التحقق المكون من 4 أرقام كاملًا."
          : "Please enter the complete 4-digit verification code."
      );
      return;
    }

    if (enteredOtp === "0000") {
      setError(
        language === "ar"
          ? "رمز التحقق غير صالح. حاول مرة أخرى."
          : "Invalid verification code. Please try again."
      );
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (mode === "register") {
        router.push(
          `/auth/register/info?phone=${encodeURIComponent(
            phoneParam
          )}&country=${countryParam}&role=${role}&lang=${language}`
        );
      } else {
        setShowSuccessModal(true);
      }
    }, 500);
  };

  const backUrl =
    mode === "login"
      ? `/auth/login?role=${role}&phone=${encodeURIComponent(
          phoneParam
        )}&lang=${language}`
      : `/auth/register?role=${role}&phone=${encodeURIComponent(
          phoneParam
        )}&lang=${language}`;

  return (
    <>
      <AuthCardShell
        heroImage="/auth/hero-verify.jpg"
        heroAlt="PulseID Clinical Consultation"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full space-y-6 text-start"
        >
          {/* Header - Matching 2-otb.jpg */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002D62] tracking-tight">
              {language === "ar" ? "تحقق من رقم هاتفك" : "Verify Your Phone"}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              {language === "ar"
                ? "أدخل الرمز المكون من 4 أرقام المرسل إلى رقم هاتفك"
                : "Enter the 4-digit code sent to your phone number"}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-800">
                +20 {phoneParam}
              </span>
              <Link
                href={backUrl}
                className="text-[#0080DF] hover:underline font-semibold text-xs"
              >
                {language === "ar" ? "تعديل" : "Edit"}
              </Link>
            </div>
          </div>

          {/* Form - Matching 2-otb.jpg */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 4 Digit Boxes */}
            <div
              className="flex items-center justify-center gap-3 sm:gap-4 my-2"
              onPaste={handlePaste}
            >
              {digits.map((digit, idx) => {
                const isCurrent =
                  idx === digits.findIndex((d) => d === "") ||
                  (digits.every((d) => d !== "") && idx === OTP_LENGTH - 1);

                return (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    placeholder="0"
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    disabled={isVerifying}
                    className={`w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl sm:rounded-2xl transition-all focus:outline-none placeholder:text-slate-300 ${
                      digit
                        ? "bg-white text-slate-900 border-2 border-[#0080DF] shadow-sm"
                        : isCurrent
                        ? "bg-[#F0F9FF] text-slate-900 border-2 border-[#0080DF]"
                        : "bg-[#F3F4F6] text-slate-400 border border-transparent"
                    }`}
                  />
                );
              })}
            </div>

            {error && (
              <p className="text-xs text-red-500 font-medium text-center">
                {error}
              </p>
            )}

            {/* Resend Area - Matching 2-otb.jpg */}
            <div className="text-center space-y-1">
              <p className="text-xs text-slate-500">
                {language === "ar"
                  ? "لم يصلك الرمز؟"
                  : "Didn't receive the code?"}
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || isVerifying}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                  canResend
                    ? "text-[#0080DF] hover:underline"
                    : "text-[#0080DF] opacity-90 cursor-default"
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 ${
                    canResend ? "animate-none" : "animate-spin-reverse"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>
                  {language === "ar" ? "إعادة إرسال الرمز" : "Resend Code"}
                  {!canResend && ` ( ${countdown}s )`}
                </span>
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full h-12 text-sm rounded-xl bg-[#0080DF] hover:bg-[#0073C8]"
              isLoading={isVerifying}
              rightIcon={
                <span className={language === "ar" ? "rotate-180" : ""}>→</span>
              }
            >
              {language === "ar" ? "التالي" : "Next"}
            </Button>
          </form>
        </motion.div>
      </AuthCardShell>

      {/* Verification Success Modal for simulated completion */}
      <VerificationSuccessModal
        isOpen={showSuccessModal}
        role={role}
        phone={phoneParam}
        onClose={() => {
          setShowSuccessModal(false);
          router.push(`/auth/login?role=${role}&lang=${language}`);
        }}
      />
    </>
  );
}
