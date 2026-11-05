import { CountryItem } from "../types/auth";
import { AuthLanguage } from "../types/auth";
import { translations } from "../utils/translations";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates mobile phone number against selected country specifications
 */
export function validatePhoneNumber(
  phone: string,
  country: CountryItem,
  lang: AuthLanguage = "en"
): { isValid: boolean; error?: string } {
  const t = translations[lang].errors;
  const cleaned = phone.replace(/[\s\-()]/g, "");

  if (!cleaned) {
    return { isValid: false, error: t.required };
  }

  // Must only contain digits
  if (!/^\d+$/.test(cleaned)) {
    return { isValid: false, error: t.invalidPhone };
  }

  // Check length against country rules
  if (cleaned.length < country.minDigits || cleaned.length > country.maxDigits) {
    return { isValid: false, error: t.invalidPhone };
  }

  // Specific validation for Egyptian mobile numbers (+20)
  if (country.code === "EG") {
    // Egyptian mobile starts with 010, 011, 012, 015 (11 digits) or 10, 11, 12, 15 (10 digits)
    const egRegex = /^(01[0125]\d{8}|1[0125]\d{8})$/;
    if (!egRegex.test(cleaned)) {
      return { isValid: false, error: t.invalidPhone };
    }
  }

  return { isValid: true };
}

/**
 * Validates full name
 */
export function validateFullName(
  name: string,
  lang: AuthLanguage = "en"
): { isValid: boolean; error?: string } {
  const t = translations[lang].errors;
  const trimmed = name.trim();

  if (!trimmed) {
    return { isValid: false, error: t.required };
  }

  if (trimmed.length < 3) {
    return { isValid: false, error: t.fullNameTooShort };
  }

  return { isValid: true };
}

/**
 * Validates a 6-digit OTP code in simulation mode
 */
export function validateOtpCode(
  otp: string,
  lang: AuthLanguage = "en"
): { isValid: boolean; error?: string } {
  const t = translations[lang].errors;
  const cleaned = otp.trim();

  if (cleaned.length < 6) {
    return { isValid: false, error: t.otpIncomplete };
  }

  // In demo simulation mode: 000000 simulates an invalid/expired code
  if (cleaned === "000000") {
    return { isValid: false, error: t.invalidOtp };
  }

  if (!/^\d{6}$/.test(cleaned)) {
    return { isValid: false, error: t.invalidOtp };
  }

  return { isValid: true };
}

