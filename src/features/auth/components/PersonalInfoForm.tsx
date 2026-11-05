"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { AuthCardShell } from "./AuthCardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VerificationSuccessModal } from "./VerificationSuccessModal";

export function PersonalInfoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { role, language } = useAuth();

  const phoneParam = searchParams.get("phone") || "01000000100000";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nationalId, setNationalId] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [country, setCountry] = useState("Egypt");
  const [stateVal, setStateVal] = useState("Qalyubia");
  const [cityVal, setCityVal] = useState("Benha");
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName =
        language === "ar"
          ? "يرجى إدخال الاسم بالكامل."
          : "Please enter your full name.";
    }

    if (!email.trim() || !email.includes("@")) {
      newErrors.email =
        language === "ar"
          ? "يرجى إدخال بريد إلكتروني صالح."
          : "Please enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password =
        language === "ar"
          ? "يرجى إدخال كلمة المرور."
          : "Please enter your password.";
    }

    if (!agreedToTerms) {
      newErrors.terms =
        language === "ar"
          ? "يجب الموافقة على الشروط والأحكام للمتابعة."
          : "You must agree to the Terms & Conditions.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 600);
  };

  return (
    <>
      <AuthCardShell
        heroImage="/auth/hero-info.jpg"
        heroAlt="PulseID Surgical & Clinical Care"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full space-y-4 text-start"
        >
          {/* Header - Matching 3-info.jpg */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002D62] tracking-tight">
              {language === "ar" ? "المعلومات الشخصية" : "Personal Information"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {language === "ar"
                ? "سجل بياناتك للوصول إلى هويتك الصحية الرقمية والبقاء على اتصال."
                : "Sign in to access your healthcare identity and stay connected."}
            </p>
          </div>

          {/* Form - Matching 3-info.jpg */}
          <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
            {/* Full Name */}
            <Input
              id="info-name"
              label={language === "ar" ? "الاسم بالكامل" : "Full Name"}
              placeholder="Ahmed Hassan"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName)
                  setErrors((prev) => ({ ...prev, fullName: "" }));
              }}
              error={errors.fullName}
              disabled={isSubmitting}
              rightIcon={
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
            />

            {/* Email Address */}
            <Input
              id="info-email"
              type="email"
              label={language === "ar" ? "البريد الإلكتروني" : "Email Address"}
              placeholder="Ahmed@gmail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email)
                  setErrors((prev) => ({ ...prev, email: "" }));
              }}
              error={errors.email}
              disabled={isSubmitting}
              rightIcon={
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

            {/* Password */}
            <div className="space-y-1 text-start">
              <label
                htmlFor="info-password"
                className="block text-xs font-semibold text-slate-700"
              >
                {language === "ar" ? "كلمة المرور" : "Password"}
              </label>
              <div className="relative">
                <input
                  id="info-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="*** *** **"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  disabled={isSubmitting}
                  className={`w-full h-11 bg-white border rounded-xl px-3.5 pe-10 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0080DF] focus:ring-1 focus:ring-[#0080DF] ${
                    errors.password ? "border-red-400" : "border-slate-200"
                  }`}
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
              {errors.password && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* National ID Number */}
            <Input
              id="info-national-id"
              label={
                language === "ar"
                  ? "الرقم القومي"
                  : "National ID Number"
              }
              placeholder="20222210000000"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              disabled={isSubmitting}
              rightIcon={
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="16"
                    rx="2"
                    strokeWidth="2"
                  />
                  <circle cx="9" cy="10" r="2" strokeWidth="2" />
                  <line x1="15" y1="8" x2="17" y2="8" strokeWidth="2" />
                  <line x1="15" y1="12" x2="17" y2="12" strokeWidth="2" />
                </svg>
              }
            />

            {/* Gender Buttons - Matching 3-info.jpg */}
            <div className="w-full text-start">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {language === "ar" ? "الجنس" : "Gender"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`h-11 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    gender === "female"
                      ? "border-[#0080DF] bg-[#F0F9FF] text-[#0080DF] shadow-sm"
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm">♀</span>
                  <span>{language === "ar" ? "أنثى" : "Female"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`h-11 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    gender === "male"
                      ? "border-[#0080DF] bg-[#F0F9FF] text-[#0080DF] shadow-sm"
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm">♂</span>
                  <span>{language === "ar" ? "ذكر" : "Male"}</span>
                </button>
              </div>
            </div>

            {/* Country Dropdown */}
            <div className="space-y-1 text-start">
              <label
                htmlFor="info-country"
                className="block text-xs font-semibold text-slate-700"
              >
                {language === "ar" ? "الدولة" : "Country"}
              </label>
              <div className="relative">
                <select
                  id="info-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-11 bg-white border border-slate-200 rounded-xl px-3.5 pe-9 text-sm text-slate-800 appearance-none focus:outline-none focus:border-[#0080DF] focus:ring-1 focus:ring-[#0080DF] cursor-pointer"
                >
                  <option value="Egypt">Egypt</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="UAE">UAE</option>
                  <option value="Kuwait">Kuwait</option>
                </select>
                <div className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* State and City Two-column Dropdowns */}
            <div className="grid grid-cols-2 gap-3 text-start">
              <div className="space-y-1">
                <label
                  htmlFor="info-state"
                  className="block text-xs font-semibold text-slate-700"
                >
                  {language === "ar" ? "المحافظة" : "State"}
                </label>
                <div className="relative">
                  <select
                    id="info-state"
                    value={stateVal}
                    onChange={(e) => setStateVal(e.target.value)}
                    className="w-full h-11 bg-white border border-slate-200 rounded-xl px-3 pe-8 text-xs sm:text-sm text-slate-800 appearance-none focus:outline-none focus:border-[#0080DF] focus:ring-1 focus:ring-[#0080DF] cursor-pointer"
                  >
                    <option value="Qalyubia">Qalyubia</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Giza">Giza</option>
                    <option value="Alexandria">Alexandria</option>
                  </select>
                  <div className="absolute end-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="info-city"
                  className="block text-xs font-semibold text-slate-700"
                >
                  {language === "ar" ? "المدينة" : "City"}
                </label>
                <div className="relative">
                  <select
                    id="info-city"
                    value={cityVal}
                    onChange={(e) => setCityVal(e.target.value)}
                    className="w-full h-11 bg-white border border-slate-200 rounded-xl px-3 pe-8 text-xs sm:text-sm text-slate-800 appearance-none focus:outline-none focus:border-[#0080DF] focus:ring-1 focus:ring-[#0080DF] cursor-pointer"
                  >
                    <option value="Benha">Benha</option>
                    <option value="Toukh">Toukh</option>
                    <option value="Qalyub">Qalyub</option>
                    <option value="Shubra El Kheima">Shubra El Kheima</option>
                  </select>
                  <div className="absolute end-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="pt-1 text-start">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (errors.terms)
                      setErrors((prev) => ({ ...prev, terms: "" }));
                  }}
                  className="mt-0.5 rounded text-[#0080DF] focus:ring-[#0080DF]"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  {language === "ar" ? (
                    <>
                      أوافق على{" "}
                      <span className="text-[#0080DF] font-semibold hover:underline">
                        الشروط والأحكام
                      </span>{" "}
                      و{" "}
                      <span className="text-[#0080DF] font-semibold hover:underline">
                        سياسة الخصوصية
                      </span>
                    </>
                  ) : (
                    <>
                      I agree to the{" "}
                      <span className="text-[#0080DF] font-semibold hover:underline">
                        Terms & Conditions
                      </span>{" "}
                      and{" "}
                      <span className="text-[#0080DF] font-semibold hover:underline">
                        Privacy Policy
                      </span>
                    </>
                  )}
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full h-12 text-sm mt-1 rounded-xl bg-[#0080DF] hover:bg-[#0073C8]"
              isLoading={isSubmitting}
              rightIcon={
                <span className={language === "ar" ? "rotate-180" : ""}>→</span>
              }
            >
              {language === "ar" ? "التالي" : "Next"}
            </Button>
          </form>

          {/* Footer Link - Matching 3-info.jpg */}
          <div className="text-center pt-1 text-xs sm:text-sm text-slate-500">
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
