"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/api/auth-service";
import { StateCitySelector } from "./StateCitySelector";
import { Loader2, Upload, FileCheck } from "lucide-react";

interface DoctorRegisterFormProps {
  initialPhone?: string;
}

export function DoctorRegisterForm({ initialPhone = "" }: DoctorRegisterFormProps) {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(initialPhone);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nationalId, setNationalId] = useState("");
  const [birthDate, setBirthDate] = useState("1985-04-12");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [address, setAddress] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateId, setStateId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);

  // Professional Clinician Credentials
  const [license, setLicense] = useState("");
  const [medicalLicenseFile, setMedicalLicenseFile] = useState<File | null>(null);
  const [professionalIdFile, setProfessionalIdFile] = useState<File | null>(null);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your doctor full name.";
    }
    if (!email.trim() || !email.includes("@")) {
      newErrors.email = "Please enter a valid professional email address.";
    }
    if (!phone.trim() || phone.trim().length < 8) {
      newErrors.phone = "Please enter a valid mobile number.";
    }
    if (!password.trim() || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!nationalId.trim() || nationalId.trim().length !== 14) {
      newErrors.nationalId = "National ID must be exactly 14 digits.";
    }
    if (!license.trim()) {
      newErrors.license = "Please enter your Egyptian Medical Syndicate License Number.";
    }
    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the Terms & Conditions and Healthcare Compliance Guidelines.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const fullAddressString = [
        address.trim(),
        cityName.trim(),
        stateName.trim(),
        "Egypt",
      ]
        .filter(Boolean)
        .join(", ");

      const result = await AuthService.registerDoctor({
        nameEn: fullName.trim(),
        nameAr: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        nationalId: nationalId.trim(),
        genderTypeId: gender === "male" ? 1 : 2,
        birthDate: `${birthDate}T00:00:00.000Z`,
        address: fullAddressString,
        license: license.trim(),
        stateId: stateId || undefined,
        cityId: cityId || undefined,
        medicalLicenseFile: medicalLicenseFile || undefined,
        professionalIdFile: professionalIdFile || undefined,
        medicalLicenseName: medicalLicenseFile?.name,
        professionalIdName: professionalIdFile?.name,
      });

      setIsSubmitting(false);

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push(
            `/auth/login?registered=true&phone=${encodeURIComponent(phone.trim())}&email=${encodeURIComponent(email.trim())}&role=doctor`
          );
        }, 900);
      } else {
        setErrors({
          form: result.error || "Doctor registration failed. Please review the professional fields.",
        });
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrors({
        form:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during doctor registration.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      {/* Success Notification */}
      {isSuccess && (
        <div className="w-full p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
          <span className="text-xl font-bold">✓</span>
          <div>
            <p className="font-bold">Doctor account registered successfully!</p>
            <p className="text-xs text-emerald-700">Redirecting to clinician sign in...</p>
          </div>
        </div>
      )}

      {/* Form Error Banner */}
      {errors.form && (
        <div className="w-full p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
          {errors.form}
        </div>
      )}

      {/* Full Name */}
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor="doc-name" className="text-[12px] font-medium text-[#41474F] block">
          Clinician Full Name (English)
        </label>
        <input
          id="doc-name"
          type="text"
          placeholder="e.g. Dr. Sherif Mansour"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={`w-full h-[46px] px-3.5 bg-white border ${
            errors.fullName ? "border-red-500" : "border-[#E1E6ED]"
          } rounded-xl text-[14px] text-slate-800 placeholder:text-[#A0AEC0] focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors`}
        />
        {errors.fullName && <p className="text-[11px] text-red-600">{errors.fullName}</p>}
      </div>

      {/* Professional Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="doc-email" className="text-[12px] font-medium text-[#41474F] block">
            Professional Email Address
          </label>
          <input
            id="doc-email"
            type="email"
            placeholder="e.g. dr.sherif@hospital.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full h-[46px] px-3.5 bg-white border ${
              errors.email ? "border-red-500" : "border-[#E1E6ED]"
            } rounded-xl text-[14px] text-slate-800 placeholder:text-[#A0AEC0] focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors`}
          />
          {errors.email && <p className="text-[11px] text-red-600">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="doc-phone" className="text-[12px] font-medium text-[#41474F] block">
            Mobile Number
          </label>
          <input
            id="doc-phone"
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

      {/* Medical Syndicate License */}
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor="doc-license" className="text-[12px] font-medium text-[#41474F] block">
          Medical Syndicate License Number (Registration Code)
        </label>
        <input
          id="doc-license"
          type="text"
          placeholder="e.g. DOC-EGY-98421"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          className={`w-full h-[46px] px-3.5 bg-white border ${
            errors.license ? "border-red-500" : "border-[#E1E6ED]"
          } rounded-xl text-[14px] text-slate-800 placeholder:text-[#A0AEC0] focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors font-mono`}
        />
        {errors.license && <p className="text-[11px] text-red-600">{errors.license}</p>}
      </div>

      {/* National ID & Birth Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="doc-national-id" className="text-[12px] font-medium text-[#41474F] block">
            National ID Number (14 Digits)
          </label>
          <input
            id="doc-national-id"
            type="text"
            maxLength={14}
            placeholder="28501011234567"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ""))}
            className={`w-full h-[46px] px-3.5 bg-white border ${
              errors.nationalId ? "border-red-500" : "border-[#E1E6ED]"
            } rounded-xl text-[14px] text-slate-800 placeholder:text-[#A0AEC0] focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors font-mono`}
          />
          {errors.nationalId && <p className="text-[11px] text-red-600">{errors.nationalId}</p>}
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="doc-dob" className="text-[12px] font-medium text-[#41474F] block">
            Date of Birth
          </label>
          <input
            id="doc-dob"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full h-[46px] px-3.5 bg-white border border-[#E1E6ED] rounded-xl text-[14px] text-slate-800 focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors"
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor="doc-password" className="text-[12px] font-medium text-[#41474F] block">
          Password
        </label>
        <div className="relative">
          <input
            id="doc-password"
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

      {/* Clinic / Hospital Address */}
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor="doc-address" className="text-[12px] font-medium text-[#41474F] block">
          Clinic or Hospital Practice Address (Optional)
        </label>
        <input
          id="doc-address"
          type="text"
          placeholder="e.g. Kasr Al-Ainy Hospital, Internal Medicine Dept"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full h-[46px] px-3.5 bg-white border border-[#E1E6ED] rounded-xl text-[14px] text-slate-800 placeholder:text-[#A0AEC0] focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors"
        />
      </div>

      {/* Document Uploads: Multipart Form Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* Medical License Document */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[12px] font-medium text-[#41474F] block">
            Practice License Document (PDF / Image)
          </label>
          <label className="flex flex-col items-center justify-center h-[76px] px-3 border border-dashed border-[#CBD5E1] rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer">
            {medicalLicenseFile ? (
              <div className="flex items-center gap-2 text-emerald-700 text-xs truncate max-w-full">
                <FileCheck className="w-4 h-4 shrink-0" />
                <span className="truncate">{medicalLicenseFile.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 text-slate-500 text-xs">
                <Upload className="w-4 h-4 text-[#078BDE]" />
                <span>Upload License File</span>
              </div>
            )}
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setMedicalLicenseFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>

        {/* Syndicate ID Document */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[12px] font-medium text-[#41474F] block">
            Syndicate Card Photo (PDF / Image)
          </label>
          <label className="flex flex-col items-center justify-center h-[76px] px-3 border border-dashed border-[#CBD5E1] rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer">
            {professionalIdFile ? (
              <div className="flex items-center gap-2 text-emerald-700 text-xs truncate max-w-full">
                <FileCheck className="w-4 h-4 shrink-0" />
                <span className="truncate">{professionalIdFile.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 text-slate-500 text-xs">
                <Upload className="w-4 h-4 text-[#078BDE]" />
                <span>Upload Syndicate Card</span>
              </div>
            )}
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setProfessionalIdFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          id="doc-terms"
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-[#E1E6ED] text-[#078BDE] focus:ring-[#078BDE]"
        />
        <label htmlFor="doc-terms" className="text-[12px] text-[#41474F] leading-snug cursor-pointer select-none">
          I certify that I am a licensed physician in Egypt and agree to the{" "}
          <Link href="/terms" target="_blank" className="text-[#078BDE] underline hover:text-[#02307D]">
            Terms
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
            <span>Registering Doctor Credentials...</span>
          </>
        ) : (
          <span>Register Clinician Identity</span>
        )}
      </button>
    </form>
  );
}
