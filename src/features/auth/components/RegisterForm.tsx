"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { getCountryByCode } from "../utils/countries";
import {
  CountryItem,
  RegistrationData,
  RoleSpecificFields,
} from "../types/auth";
import {
  validatePhoneNumber,
  validateFullName,
} from "../schemas/authValidation";
import { PhoneInput } from "./PhoneInput";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthCardShell } from "./AuthCardShell";

export function RegisterForm() {
  const {
    role,
    countryCode,
    phoneNumber,
    startRegister,
    language,
    t,
  } = useAuth();

  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(() =>
    getCountryByCode(countryCode)
  );

  // Common Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState(phoneNumber);
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Patient Fields
  const [nationalId, setNationalId] = useState("");
  const [gender, setGender] = useState<"female" | "male">("male");
  const [state, setState] = useState("Qalyubia");
  const [city, setCity] = useState("Benha");

  // Doctor Fields
  const [specialization, setSpecialization] = useState("");
  const [docLicense, setDocLicense] = useState("");
  const [hospitalAffiliation, setHospitalAffiliation] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");

  // Pharmacist Fields
  const [pharmLicense, setPharmLicense] = useState("");
  const [pharmacyName, setPharmacyName] = useState("");
  const [pharmacyBranch, setPharmacyBranch] = useState("");
  const [syndicateId, setSyndicateId] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleName = t.roleSelection.roles[role].title;

  const doctorSpecialties = [
    { value: "", label: t.register.doctorFields.specializationSelectPrompt },
    { value: "cardiology", label: language === "ar" ? "أمراض القلب والأوعية الدموية" : "Cardiology" },
    { value: "general_practice", label: language === "ar" ? "طب عام وطوارئ" : "General Practice" },
    { value: "internal_medicine", label: language === "ar" ? "أمراض باطنة" : "Internal Medicine" },
    { value: "pediatrics", label: language === "ar" ? "طب الأطفال وحديثي الولادة" : "Pediatrics" },
    { value: "orthopedics", label: language === "ar" ? "جراحة العظام والمفاصل" : "Orthopedics" },
    { value: "neurology", label: language === "ar" ? "المخ والأعصاب" : "Neurology" },
    { value: "dermatology", label: language === "ar" ? "الأمراض الجلدية" : "Dermatology" },
    { value: "ophthalmology", label: language === "ar" ? "طب وجراحة العيون" : "Ophthalmology" },
    { value: "surgery", label: language === "ar" ? "الجراحة العامة" : "General Surgery" },
    { value: "other", label: language === "ar" ? "تخصص آخر" : "Other Specialization" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const nameVal = validateFullName(fullName, language);
    if (!nameVal.isValid) {
      newErrors.fullName = nameVal.error || t.errors.required;
    }

    const phoneVal = validatePhoneNumber(phone, selectedCountry, language);
    if (!phoneVal.isValid) {
      newErrors.phone = phoneVal.error || t.errors.required;
    }

    if (!agreedToTerms) {
      newErrors.terms =
        language === "ar"
          ? "يجب الموافقة على الشروط وسياسة الخصوصية للمتابعة."
          : "You must agree to the Terms & Conditions and Privacy Policy.";
    }

    let roleFields: RoleSpecificFields;

    if (role === "patient") {
      roleFields = {
        dateOfBirth: "1995-01-01",
        gender,
        nationalId: nationalId || undefined,
        emergencyContactName: undefined,
        emergencyContactPhone: undefined,
      };
    } else if (role === "doctor") {
      if (!specialization) {
        newErrors.specialization = t.errors.required;
      }
      if (!docLicense.trim()) {
        newErrors.docLicense = t.errors.required;
      } else if (docLicense.trim().length < 4) {
        newErrors.docLicense = t.errors.invalidLicense;
      }
      roleFields = {
        specialization,
        licenseNumber: docLicense.trim(),
        hospitalAffiliation: hospitalAffiliation || undefined,
        yearsExperience: yearsExperience || undefined,
      };
    } else {
      if (!pharmLicense.trim()) {
        newErrors.pharmLicense = t.errors.required;
      } else if (pharmLicense.trim().length < 4) {
        newErrors.pharmLicense = t.errors.invalidLicense;
      }
      if (!pharmacyName.trim()) {
        newErrors.pharmacyName = t.errors.required;
      }
      roleFields = {
        licenseNumber: pharmLicense.trim(),
        pharmacyName: pharmacyName.trim(),
        pharmacyBranch: pharmacyBranch || undefined,
        syndicateId: syndicateId || undefined,
      };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const regData: RegistrationData = {
        role,
        fullName: fullName.trim(),
        countryCode: selectedCountry.code,
        phoneNumber: phone.trim(),
        roleFields,
      };
      await startRegister(regData);
    } catch {
      setErrors({
        form: language === "ar" ? "حدث خطأ غير متوقع" : "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCardShell heroImage="/auth/hero-info.jpg" heroAlt="Personal Information">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full space-y-5 text-start"
      >
        {/* Active Role Indicator */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>{t.register.selectedRoleLabel}</span>
            <Badge variant="blue" size="sm">
              {roleName}
            </Badge>
          </div>
          <Link
            href={`/auth/role?lang=${language}`}
            className="text-xs text-[#0080DF] hover:underline font-semibold flex items-center gap-1"
          >
            <span>{t.register.changeRole}</span>
            <span aria-hidden="true" className={language === "ar" ? "rotate-180" : ""}>
              →
            </span>
          </Link>
        </div>

        {/* Header (Matching 3-info.jpg) */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002D62] tracking-tight">
            {language === "ar" ? "البيانات الشخصية" : "Personal Information"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {language === "ar"
              ? "سجل الدخول للوصول إلى هويتك الصحية الرقمية والبقاء على اتصال."
              : "Sign in to access your healthcare identity and stay connected."}
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
          {errors.form && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
              {errors.form}
            </div>
          )}

          {/* Full Name */}
          <Input
            id="register-fullname"
            label={language === "ar" ? "الاسم بالكامل" : "Full Name"}
            placeholder="Ahmed Hassan"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
            }}
            error={errors.fullName}
            isRequired
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

          {/* Mobile Phone Input */}
          <PhoneInput
            id="register-phone"
            label={language === "ar" ? "رقم الهاتف المحمول" : "Phone Number"}
            value={phone}
            selectedCountry={selectedCountry}
            onChangePhone={(newVal) => {
              setPhone(newVal);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            onSelectCountry={(c) => {
              setSelectedCountry(c);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            error={errors.phone}
            disabled={isSubmitting}
            isRequired
          />

          {/* Email Address (Matching 3-info.jpg) */}
          <Input
            id="register-email"
            type="email"
            label={language === "ar" ? "البريد الإلكتروني" : "Email Address"}
            placeholder="Ahmed@gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          {/* Role-Specific Fields */}
          {role === "patient" && (
            <>
              {/* National ID */}
              <Input
                id="patient-national-id"
                label={
                  language === "ar"
                    ? "الرقم القومي (اختياري)"
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

              {/* Gender Selector (Matching 3-info.jpg) */}
              <div className="w-full text-start">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {language === "ar" ? "الجنس" : "Gender"}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`h-11 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      gender === "female"
                        ? "border-[#0080DF] bg-[#F0F9FF] text-[#0080DF] ring-1 ring-[#0080DF]/30"
                        : "border-slate-200 bg-[#F8FAFC] text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-sm">♀</span>
                    <span>{language === "ar" ? "أنثى" : "Female"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`h-11 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      gender === "male"
                        ? "border-[#0080DF] bg-[#F0F9FF] text-[#0080DF] ring-1 ring-[#0080DF]/30"
                        : "border-slate-200 bg-[#F8FAFC] text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-sm">♂</span>
                    <span>{language === "ar" ? "ذكر" : "Male"}</span>
                  </button>
                </div>
              </div>

              {/* Country (Matching 3-info.jpg) */}
              <Select
                id="patient-country"
                label={language === "ar" ? "الدولة" : "Country"}
                value="Egypt"
                onChange={() => {}}
                options={[{ value: "Egypt", label: language === "ar" ? "مصر" : "Egypt" }]}
                disabled={isSubmitting}
              />

              {/* State & City (Matching 3-info.jpg) */}
              <div className="grid grid-cols-2 gap-3">
                <Select
                  id="patient-state"
                  label={language === "ar" ? "المحافظة" : "State"}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  options={[
                    { value: "Qalyubia", label: language === "ar" ? "القليوبية" : "Qalyubia" },
                    { value: "Cairo", label: language === "ar" ? "القاهرة" : "Cairo" },
                    { value: "Giza", label: language === "ar" ? "الجيزة" : "Giza" },
                    { value: "Alexandria", label: language === "ar" ? "الإسكندرية" : "Alexandria" },
                  ]}
                  disabled={isSubmitting}
                />

                <Select
                  id="patient-city"
                  label={language === "ar" ? "المدينة" : "City"}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  options={[
                    { value: "Benha", label: language === "ar" ? "بنها" : "Benha" },
                    { value: "Nasr City", label: language === "ar" ? "مدينة نصر" : "Nasr City" },
                    { value: "Dokki", label: language === "ar" ? "الدقي" : "Dokki" },
                    { value: "Smouha", label: language === "ar" ? "سموحة" : "Smouha" },
                  ]}
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}

          {/* Doctor Fields */}
          {role === "doctor" && (
            <>
              <Select
                id="doctor-specialization"
                label={t.register.doctorFields.specialization}
                value={specialization}
                onChange={(e) => {
                  setSpecialization(e.target.value);
                  if (errors.specialization) {
                    setErrors((prev) => ({ ...prev, specialization: "" }));
                  }
                }}
                options={doctorSpecialties}
                error={errors.specialization}
                isRequired
                disabled={isSubmitting}
              />

              <Input
                id="doctor-license"
                label={t.register.doctorFields.licenseNumber}
                placeholder="MED-123456"
                value={docLicense}
                onChange={(e) => {
                  setDocLicense(e.target.value);
                  if (errors.docLicense) {
                    setErrors((prev) => ({ ...prev, docLicense: "" }));
                  }
                }}
                error={errors.docLicense}
                isRequired
                disabled={isSubmitting}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="doctor-affiliation"
                  label={t.register.doctorFields.hospitalAffiliation}
                  placeholder="Cairo University Hospitals"
                  value={hospitalAffiliation}
                  onChange={(e) => setHospitalAffiliation(e.target.value)}
                  disabled={isSubmitting}
                />

                <Input
                  id="doctor-experience"
                  type="number"
                  min="0"
                  max="60"
                  label={t.register.doctorFields.yearsExperience}
                  placeholder="8"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}

          {/* Pharmacist Fields */}
          {role === "pharmacist" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="pharmacist-license"
                  label={t.register.pharmacistFields.licenseNumber}
                  placeholder="PHARM-987654"
                  value={pharmLicense}
                  onChange={(e) => {
                    setPharmLicense(e.target.value);
                    if (errors.pharmLicense) {
                      setErrors((prev) => ({ ...prev, pharmLicense: "" }));
                    }
                  }}
                  error={errors.pharmLicense}
                  isRequired
                  disabled={isSubmitting}
                />

                <Input
                  id="pharmacist-syndicate"
                  label={t.register.pharmacistFields.syndicateId}
                  placeholder="SYN-44321"
                  value={syndicateId}
                  onChange={(e) => setSyndicateId(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <Input
                id="pharmacist-pharmacy-name"
                label={t.register.pharmacistFields.pharmacyName}
                placeholder="El Ezaby Pharmacy - Maadi Branch"
                value={pharmacyName}
                onChange={(e) => {
                  setPharmacyName(e.target.value);
                  if (errors.pharmacyName) {
                    setErrors((prev) => ({ ...prev, pharmacyName: "" }));
                  }
                }}
                error={errors.pharmacyName}
                isRequired
                disabled={isSubmitting}
              />

              <Input
                id="pharmacist-branch"
                label={t.register.pharmacistFields.pharmacyBranch}
                placeholder="Road 9, Maadi, Cairo"
                value={pharmacyBranch}
                onChange={(e) => setPharmacyBranch(e.target.value)}
                disabled={isSubmitting}
              />
            </>
          )}

          {/* Terms Checkbox (Matching 3-info.jpg) */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none text-start">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }));
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

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full h-12 text-sm mt-2"
            isLoading={isSubmitting}
            rightIcon={
              <span className={language === "ar" ? "rotate-180" : ""}>→</span>
            }
          >
            {language === "ar" ? "التالي" : "Next"}
          </Button>
        </form>

        {/* Switch to Login */}
        <div className="text-center pt-1 text-xs text-slate-500">
          <span>{t.register.alreadyRegistered} </span>
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
