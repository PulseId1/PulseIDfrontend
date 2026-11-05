"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AuthRole,
  AuthLanguage,
  AuthFlowMode,
  RegistrationData,
} from "../types/auth";
import { DEFAULT_COUNTRY_CODE } from "../utils/countries";
import { translations, AuthTranslations } from "../utils/translations";

interface AuthContextValue {
  role: AuthRole;
  mode: AuthFlowMode;
  countryCode: string;
  phoneNumber: string;
  registrationData: RegistrationData | null;
  isVerified: boolean;
  language: AuthLanguage;
  t: AuthTranslations;
  isPending: boolean;
  simulatedOtp: string;

  setRole: (role: AuthRole) => void;
  setLanguage: (lang: AuthLanguage) => void;
  toggleLanguage: () => void;
  setPhoneDetails: (phone: string, countryCode: string) => void;
  startLogin: (phone: string, countryCode: string) => Promise<boolean>;
  startRegister: (data: RegistrationData) => Promise<boolean>;
  verifyOtp: (code: string) => Promise<{ success: boolean; error?: string }>;
  resendOtp: () => Promise<string>;
  resetAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const VALID_ROLES: AuthRole[] = ["patient", "doctor", "pharmacist"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [internalRole, setInternalRole] = useState<AuthRole>("patient");
  const [internalMode, setInternalMode] = useState<AuthFlowMode>("login");
  const [internalCountry, setInternalCountry] = useState<string>(DEFAULT_COUNTRY_CODE);
  const [internalPhone, setInternalPhone] = useState<string>("");
  const [internalLang, setInternalLang] = useState<AuthLanguage>("en");
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [simulatedOtp, setSimulatedOtp] = useState<string>("123456");

  // Derive parameters preferring searchParams if set
  const paramRole = searchParams.get("role") as AuthRole | null;
  const role: AuthRole =
    paramRole && VALID_ROLES.includes(paramRole) ? paramRole : internalRole;

  const countryCode = searchParams.get("country") || internalCountry;
  const phoneNumber = searchParams.get("phone") || internalPhone;
  const mode: AuthFlowMode =
    searchParams.get("mode") === "register" ? "register" : internalMode;

  const paramLang = searchParams.get("lang");
  const language: AuthLanguage =
    paramLang === "ar" ? "ar" : paramLang === "en" ? "en" : internalLang;

  // Synchronize document dir and lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const setRole = useCallback((newRole: AuthRole) => {
    setInternalRole(newRole);
  }, []);

  const setLanguage = useCallback((lang: AuthLanguage) => {
    setInternalLang(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setInternalLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const setPhoneDetails = useCallback((phone: string, country: string) => {
    setInternalPhone(phone);
    setInternalCountry(country);
  }, []);

  const startLogin = useCallback(
    async (phone: string, country: string): Promise<boolean> => {
      setInternalPhone(phone);
      setInternalCountry(country);
      setInternalMode("login");
      setIsVerified(false);

      // Simulate a brief network dispatch for OTP generation
      await new Promise((resolve) => setTimeout(resolve, 600));

      startTransition(() => {
        router.push(
          `/auth/verify?role=${role}&phone=${encodeURIComponent(
            phone
          )}&country=${country}&mode=login&lang=${language}`
        );
      });
      return true;
    },
    [router, role, language]
  );

  const startRegister = useCallback(
    async (data: RegistrationData): Promise<boolean> => {
      setRegistrationData(data);
      setInternalRole(data.role);
      setInternalPhone(data.phoneNumber);
      setInternalCountry(data.countryCode);
      setInternalMode("register");
      setIsVerified(false);

      // Simulate network registration pre-check
      await new Promise((resolve) => setTimeout(resolve, 700));

      startTransition(() => {
        router.push(
          `/auth/verify?role=${data.role}&phone=${encodeURIComponent(
            data.phoneNumber
          )}&country=${data.countryCode}&mode=register&lang=${language}`
        );
      });
      return true;
    },
    [router, language]
  );

  const verifyOtp = useCallback(
    async (code: string): Promise<{ success: boolean; error?: string }> => {
      // Simulation delay
      await new Promise((resolve) => setTimeout(resolve, 750));

      const t = translations[language].errors;

      if (code === "000000") {
        return {
          success: false,
          error: t.invalidOtp,
        };
      }

      if (code.length === 6) {
        setIsVerified(true);
        return { success: true };
      }

      return {
        success: false,
        error: t.otpIncomplete,
      };
    },
    [language]
  );

  const resendOtp = useCallback(async (): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newCode = "123456";
    setSimulatedOtp(newCode);
    return newCode;
  }, []);

  const resetAuth = useCallback(() => {
    setIsVerified(false);
    setInternalPhone("");
    setRegistrationData(null);
    router.push(`/auth/role?lang=${language}`);
  }, [router, language]);

  const t = translations[language];

  return (
    <AuthContext.Provider
      value={{
        role,
        mode,
        countryCode,
        phoneNumber,
        registrationData,
        isVerified,
        language,
        t,
        isPending,
        simulatedOtp,
        setRole,
        setLanguage,
        toggleLanguage,
        setPhoneDetails,
        startLogin,
        startRegister,
        verifyOtp,
        resendOtp,
        resetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
