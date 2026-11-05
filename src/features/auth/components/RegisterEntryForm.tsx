"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { AuthCardShell } from "./AuthCardShell";
import { PhoneInput } from "./PhoneInput";
import { Button } from "@/components/ui/button";
import { DEFAULT_COUNTRY } from "../utils/countries";
import { CountryItem } from "../types/auth";
import { validatePhoneNumber } from "../schemas/authValidation";

export function RegisterEntryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { role, language } = useAuth();

  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(DEFAULT_COUNTRY);
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validatePhoneNumber(phone, selectedCountry, language);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(
        `/auth/verify?mode=register&phone=${encodeURIComponent(
          phone
        )}&country=${selectedCountry.code}&role=${role}&lang=${language}`
      );
    }, 400);
  };

  return (
    <AuthCardShell
      heroImage="/auth/hero-register.jpg"
      heroAlt="PulseID Doctors and Healthcare Providers"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full space-y-6 text-start"
      >
        {/* Header - Matching 1-register.jpg */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002D62] tracking-tight">
            {language === "ar" ? "مرحبًا بك في " : "Welcome to "}
            <span className="text-[#0080DF]">Pulse ID</span>
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            {language === "ar"
              ? "يرجى إدخال بياناتك للمتابعة."
              : "Please enter your details to sign in."}
          </p>
        </div>

        {/* Form - Matching 1-register.jpg */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <PhoneInput
            id="register-phone"
            label={language === "ar" ? "رقم الهاتف" : "Phone Number"}
            value={phone}
            selectedCountry={selectedCountry}
            onChangePhone={(val) => {
              setPhone(val);
              if (error) setError(undefined);
            }}
            onSelectCountry={(c) => {
              setSelectedCountry(c);
              if (error) setError(undefined);
            }}
            error={error}
            disabled={isSubmitting}
            placeholder="01000000100000"
          />

          {/* Security Notice Box (Matching 1-register.jpg) */}
          <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl p-3.5 flex items-start gap-3">
            <div className="text-[#0080DF] shrink-0 mt-0.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === "ar"
                ? "سنرسل لك رمز تحقق لمرة واحدة (OTP) لتأكيد هويتك وحماية حسابك الصحي."
                : "We'll send you a one-time verification code (OTP) to verify your identity and secure your account."}
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full h-12 text-sm mt-2 rounded-xl bg-[#0080DF] hover:bg-[#0073C8]"
            isLoading={isSubmitting}
            rightIcon={
              <span className={language === "ar" ? "rotate-180" : ""}>→</span>
            }
          >
            {language === "ar" ? "التالي" : "Next"}
          </Button>
        </form>

        {/* Footer Link - Matching 1-register.jpg */}
        <div className="text-center pt-2 text-xs sm:text-sm text-slate-500">
          <span>
            {language === "ar"
              ? "لديك حساب بالفعل؟ "
              : "Already have an account? "}
          </span>
          <Link
            href={`/auth/login?role=${role}&lang=${language}`}
            className="text-[#0080DF] hover:underline font-semibold"
          >
            {language === "ar" ? "تسجيل الدخول" : "Sign In"}
          </Link>
        </div>
      </motion.div>
    </AuthCardShell>
  );
}
