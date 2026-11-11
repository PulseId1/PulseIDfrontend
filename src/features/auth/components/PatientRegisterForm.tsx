"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/api/auth-service";
import { DemoService } from "@/lib/demo/demo-service";
import { DemoAccount } from "@/lib/demo/demo-data";
import { useAuth } from "@/lib/auth/auth-context";
import { StateCitySelector } from "./StateCitySelector";
import { Loader2, ArrowRight, UserCheck, LogIn, Sparkles } from "lucide-react";

interface PatientRegisterFormProps {
  initialPhone?: string;
}

export function PatientRegisterForm({ initialPhone = "" }: PatientRegisterFormProps) {
  const router = useRouter();
  const { loginDemo } = useAuth();

  const [authTarget, setAuthTarget] = useState<"demo" | "live">("demo");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(initialPhone);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nationalId, setNationalId] = useState("");
  const [birthDate, setBirthDate] = useState("1995-06-15");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [address, setAddress] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateId, setStateId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredAccount, setRegisteredAccount] = useState<DemoAccount | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full legal name.";
    }
    if (!email.trim() || !email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!phone.trim() || !DemoService.isEgyptianMobile(phone.trim())) {
      newErrors.phone = "Please enter a valid 11-digit Egyptian mobile number (010, 011, 012, or 015).";
    }
    if (!password.trim() || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!nationalId.trim() || nationalId.trim().length !== 14) {
      newErrors.nationalId = "National ID must be exactly 14 digits.";
    }
    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the Terms & Conditions and Privacy Policy.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const fullAddressString = [
      address.trim(),
      cityName.trim(),
      stateName.trim(),
      "Egypt",
    ]
      .filter(Boolean)
      .join(", ");

    if (authTarget === "demo") {
      // Offline Demo Sandbox registration
      setTimeout(() => {
        setIsSubmitting(false);
        const result = DemoService.registerDemoPatient({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
          nationalId: nationalId.trim(),
          birthDate,
          gender,
          address: fullAddressString,
          state: stateName,
          city: cityName,
        });

        if (result.success && result.account) {
          setRegisteredAccount(result.account);
          setIsSuccess(true);
        } else {
          setErrors({
            form: result.error || "Demo patient registration failed. Please review the details.",
          });
        }
      }, 400);
      return;
    }

    // Live Cloud Run API registration
    try {
      const result = await AuthService.registerPatient({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        nationalId: nationalId.trim(),
        phone: phone.trim(),
        gender,
        country: "Egypt",
        state: stateName,
        city: cityName,
        address: fullAddressString,
        stateId: stateId || undefined,
        cityId: cityId || undefined,
      });

      setIsSubmitting(false);

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push(
            `/auth/login?registered=true&phone=${encodeURIComponent(phone.trim())}&email=${encodeURIComponent(email.trim())}&role=patient`
          );
        }, 900);
      } else {
        setErrors({
          form: result.error || "Patient registration failed on live backend.",
        });
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrors({
        form:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during patient registration.",
      });
    }
  };

  return (
    <div className="w-full">
      {/* Environment Target Toggle */}
      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 mb-5">
        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Environment:
        </span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setAuthTarget("demo")}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              authTarget === "demo"
                ? "bg-[#078BDE] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Demo Sandbox
          </button>
          <button
            type="button"
            onClick={() => setAuthTarget("live")}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              authTarget === "live"
                ? "bg-[#02307D] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Live Cloud Run API
          </button>
        </div>
      </div>

      {/* Success Confirmation Modal / Card */}
      {isSuccess ? (
        <div className="w-full p-6 rounded-2xl bg-white border border-[#D0DEFF] shadow-md flex flex-col gap-5 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-[18px] text-[#02307D]">
                Registration Complete!
              </h3>
              <p className="text-xs text-slate-600">
                Your patient identity has been created and saved in demo storage.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Patient Name:</span>
              <span className="font-bold text-slate-800">{registeredAccount?.fullName || fullName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">National ID:</span>
              <span className="font-mono font-semibold text-slate-800">{registeredAccount?.nationalId || nationalId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Mobile Number:</span>
              <span className="font-mono font-semibold text-slate-800">{registeredAccount?.phone || phone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Demo Patient ID:</span>
              <span className="font-mono font-bold text-[#078BDE]">{registeredAccount?.id || "PT-DEMO"}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                router.push(
                  `/auth/login?registered=true&phone=${encodeURIComponent(phone.trim())}&email=${encodeURIComponent(email.trim())}&role=patient`
                );
              }}
              className="flex-1 h-[48px] rounded-xl border border-[#078BDE] text-[#078BDE] hover:bg-sky-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In With Your Account</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (registeredAccount) {
                  loginDemo("patient", registeredAccount);
                } else {
                  loginDemo("patient");
                }
                router.push("/patient");
              }}
              className="flex-1 h-[48px] rounded-xl bg-[#078BDE] hover:bg-[#0070B8] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
            >
              <span>Launch Patient Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          {/* Form Error Banner */}
          {errors.form && (
            <div className="w-full p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
              {errors.form}
            </div>
          )}

      {/* Full Name */}
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor="patient-name" className="text-[12px] font-medium text-[#41474F] block">
          Full Legal Name (English)
        </label>
        <input
          id="patient-name"
          type="text"
          placeholder="e.g. Ahmed Hassan"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={`w-full h-[46px] px-3.5 bg-white border ${
            errors.fullName ? "border-red-500" : "border-[#E1E6ED]"
          } rounded-xl text-[14px] text-slate-800 placeholder:text-[#A0AEC0] focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors`}
        />
        {errors.fullName && <p className="text-[11px] text-red-600">{errors.fullName}</p>}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="patient-email" className="text-[12px] font-medium text-[#41474F] block">
            Email Address
          </label>
          <input
            id="patient-email"
            type="email"
            placeholder="e.g. name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full h-[46px] px-3.5 bg-white border ${
              errors.email ? "border-red-500" : "border-[#E1E6ED]"
            } rounded-xl text-[14px] text-slate-800 placeholder:text-[#A0AEC0] focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors`}
          />
          {errors.email && <p className="text-[11px] text-red-600">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="patient-phone" className="text-[12px] font-medium text-[#41474F] block">
            Mobile Number
          </label>
          <input
            id="patient-phone"
            type="tel"
            placeholder="e.g. 01012345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full h-[46px] px-3.5 bg-white border ${
              errors.phone ? "border-red-500" : "border-[#E1E6ED]"
            } rounded-xl text-[14px] text-slate-800 placeholder:text-[#A0AEC0] focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors font-mono`}
          />
          {errors.phone && <p className="text-[11px] text-red-600">{errors.phone}</p>}
        </div>
      </div>

      {/* National ID & Birth Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="patient-national-id" className="text-[12px] font-medium text-[#41474F] block">
            National ID Number (14 Digits)
          </label>
          <input
            id="patient-national-id"
            type="text"
            maxLength={14}
            placeholder="29501011234567"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ""))}
            className={`w-full h-[46px] px-3.5 bg-white border ${
              errors.nationalId ? "border-red-500" : "border-[#E1E6ED]"
            } rounded-xl text-[14px] text-slate-800 placeholder:text-[#A0AEC0] focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors font-mono`}
          />
          {errors.nationalId && <p className="text-[11px] text-red-600">{errors.nationalId}</p>}
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="patient-dob" className="text-[12px] font-medium text-[#41474F] block">
            Date of Birth
          </label>
          <input
            id="patient-dob"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full h-[46px] px-3.5 bg-white border border-[#E1E6ED] rounded-xl text-[14px] text-slate-800 focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors"
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor="patient-password" className="text-[12px] font-medium text-[#41474F] block">
          Password
        </label>
        <div className="relative">
          <input
            id="patient-password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full h-[46px] pl-3.5 pr-11 bg-white border ${
              errors.password ? "border-red-500" : "border-[#E1E6ED]"
            } rounded-xl text-[14px] text-slate-800 placeholder:text-[#A0AEC0] focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <p className="text-[11px] text-red-600">{errors.password}</p>}
      </div>

      {/* Gender Selection */}
      <div className="flex flex-col gap-1.5 w-full">
        <span className="text-[12px] font-medium text-[#41474F] block">Gender</span>
        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            type="button"
            onClick={() => setGender("male")}
            className={`h-[42px] rounded-xl text-[13px] font-medium flex items-center justify-center border transition-all ${
              gender === "male"
                ? "bg-blue-50/80 border-[#078BDE] text-[#02307D] font-semibold"
                : "bg-white border-[#E1E6ED] text-[#41474F] hover:bg-slate-50"
            }`}
          >
            Male
          </button>
          <button
            type="button"
            onClick={() => setGender("female")}
            className={`h-[42px] rounded-xl text-[13px] font-medium flex items-center justify-center border transition-all ${
              gender === "female"
                ? "bg-blue-50/80 border-[#078BDE] text-[#02307D] font-semibold"
                : "bg-white border-[#E1E6ED] text-[#41474F] hover:bg-slate-50"
            }`}
          >
            Female
          </button>
        </div>
      </div>

      {/* Dynamic API Reference Data: State & City */}
      <StateCitySelector
        onStateChange={(id, name) => {
          setStateId(id);
          setStateName(name);
        }}
        onCityChange={(id, name) => {
          setCityId(id);
          setCityName(name);
        }}
        errors={errors}
      />

      {/* Residential Address */}
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor="patient-address" className="text-[12px] font-medium text-[#41474F] block">
          Street Address / District (Optional)
        </label>
        <input
          id="patient-address"
          type="text"
          placeholder="e.g. 14 El-Tahrir Street"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full h-[46px] px-3.5 bg-white border border-[#E1E6ED] rounded-xl text-[14px] text-slate-800 placeholder:text-[#A0AEC0] focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors"
        />
      </div>

      {/* Terms & Conditions */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          id="patient-terms"
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-[#E1E6ED] text-[#078BDE] focus:ring-[#078BDE]"
        />
        <label htmlFor="patient-terms" className="text-[12px] text-[#41474F] leading-snug cursor-pointer select-none">
          I agree to the{" "}
          <Link href="/terms" target="_blank" className="text-[#078BDE] underline hover:text-[#02307D]">
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy" target="_blank" className="text-[#078BDE] underline hover:text-[#02307D]">
            Privacy Policy
          </Link>
          .
        </label>
      </div>
      {errors.terms && <p className="text-[11px] text-red-600 -mt-2">{errors.terms}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className="w-full h-[50px] mt-2 bg-[#078BDE] hover:bg-[#0677BE] active:bg-[#02307D] text-white font-semibold text-[15px] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Creating Patient Account...</span>
          </>
        ) : (
          <span>Create Patient Identity</span>
        )}
      </button>
    </form>
    )}
  </div>
  );
}
