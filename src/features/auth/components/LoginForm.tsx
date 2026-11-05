"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { AuthCardShell } from "./AuthCardShell";
import { PhoneInput } from "./PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_COUNTRY } from "../utils/countries";
import { CountryItem } from "../types/auth";
import { validatePhoneNumber } from "../schemas/authValidation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { role, language } = useAuth();

  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(DEFAULT_COUNTRY);
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "phone") {
      const phoneValidation = validatePhoneNumber(phone, selectedCountry, language);
      if (!phoneValidation.isValid) {
        setError(phoneValidation.error);
        return;
      }
    } else {
      if (!email.trim() || !email.includes("@")) {
        setError(
          language === "ar"
            ? "يرجى إدخال عنوان بريد إلكتروني صالح."
            : "Please enter a valid email address."
        );
        return;
      }
    }

    if (!password.trim()) {
      setError(
        language === "ar"
          ? "يرجى إدخال كلمة المرور."
          : "Please enter your password."
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(
        `/auth/verify?mode=login&phone=${encodeURIComponent(
          phone || "01000000100000"
        )}&country=${selectedCountry.code}&role=${role}&lang=${language}`
      );
    }, 400);
  };

  return (
    <AuthCardShell
      heroImage="/auth/hero-login.jpg"
      heroAlt="PulseID Digital Healthcare Technology"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full space-y-6 text-start"
      >
        {/* Header - Matching 4-login.jpg */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002D62] tracking-tight">
            {language === "ar" ? "مرحبًا بعودتك" : "Welcome Back"}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            {language === "ar"
              ? "سجل الدخول للوصول إلى هويتك الصحية الرقمية والبقاء على اتصال."
              : "Sign in to access your healthcare identity and stay connected."}
          </p>
        </div>

        {/* Tab Toggle: Phone Number / Email Address - Matching 4-login.jpg */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab("phone");
              setError(undefined);
            }}
            className={`h-11 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer border min-w-0 ${
              activeTab === "phone"
                ? "bg-[#F0F9FF] border-[#0080DF] text-[#0080DF] shadow-sm"
                : "bg-white border-slate-200 text-slate-500 hover:text-slate-800"
            }`}
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect
                x="5"
                y="2"
                width="14"
                height="20"
                rx="2"
                ry="2"
                strokeWidth="2"
              />
              <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
            </svg>
            <span className="truncate">{language === "ar" ? "رقم الهاتف" : "Phone Number"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("email");
              setError(undefined);
            }}
            className={`h-11 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer border min-w-0 ${
              activeTab === "email"
                ? "bg-[#F0F9FF] border-[#0080DF] text-[#0080DF] shadow-sm"
                : "bg-white border-slate-200 text-slate-500 hover:text-slate-800"
            }`}
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="truncate">{language === "ar" ? "البريد الإلكتروني" : "Email Address"}</span>
          </button>
        </div>

        {/* Form - Matching 4-login.jpg */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {activeTab === "phone" ? (
            <PhoneInput
              id="login-phone"
              label={language === "ar" ? "رقم الهاتف" : "Phone Number"}
              value={phone}
              selectedCountry={selectedCountry}
              onChangePhone={(newVal) => {
                setPhone(newVal);
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
          ) : (
            <Input
              id="login-email"
              type="email"
              label={language === "ar" ? "البريد الإلكتروني" : "Email Address"}
              placeholder="ahmed@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(undefined);
              }}
              error={error}
              disabled={isSubmitting}
              leftIcon={
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
            />
          )}

          {/* Password Field - Matching 4-login.jpg */}
          <div className="space-y-1 text-start">
            <label
              htmlFor="login-password"
              className="block text-xs font-semibold text-slate-700"
            >
              {language === "ar" ? "كلمة المرور" : "Password"}
            </label>
            <div className="relative">
              <span className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
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
              </span>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="*** *** **"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(undefined);
                }}
                disabled={isSubmitting}
                className="w-full h-11 sm:h-12 bg-white border border-slate-200 rounded-xl ps-9 pe-10 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0080DF] focus:ring-1 focus:ring-[#0080DF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
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
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

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

        {/* Footer Link - Matching 4-login.jpg */}
        <div className="text-center pt-2 text-xs sm:text-sm text-slate-500">
          <span>
            {language === "ar"
              ? "ليس لديك حساب بعد؟ "
              : "Don't have an account yet? "}
          </span>
          <Link
            href={`/auth/register?role=${role}&lang=${language}`}
            className="text-[#0080DF] hover:underline font-semibold"
          >
            {language === "ar" ? "إنشاء حساب" : "Sign Up"}
          </Link>
        </div>
      </motion.div>
    </AuthCardShell>
  );
}
