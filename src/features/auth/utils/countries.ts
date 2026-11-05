import { CountryItem } from "../types/auth";

export const DEFAULT_COUNTRY_CODE = "EG";

export const DEFAULT_COUNTRY: CountryItem = {
  code: "EG",
  name: "Egypt",
  nameAr: "مصر",
  dialCode: "+20",
  flag: "🇪🇬",
  placeholder: "010 1234 5678",
  sample: "01012345678",
  minDigits: 10,
  maxDigits: 11,
};

export const SUPPORTED_COUNTRIES: CountryItem[] = [
  {
    code: "EG",
    name: "Egypt",
    nameAr: "مصر",
    dialCode: "+20",
    flag: "🇪🇬",
    placeholder: "010 1234 5678",
    sample: "01012345678",
    minDigits: 10,
    maxDigits: 11,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    nameAr: "المملكة العربية السعودية",
    dialCode: "+966",
    flag: "🇸🇦",
    placeholder: "050 123 4567",
    sample: "0501234567",
    minDigits: 9,
    maxDigits: 10,
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    nameAr: "الإمارات العربية المتحدة",
    dialCode: "+971",
    flag: "🇦🇪",
    placeholder: "050 123 4567",
    sample: "0501234567",
    minDigits: 9,
    maxDigits: 10,
  },
  {
    code: "KW",
    name: "Kuwait",
    nameAr: "الكويت",
    dialCode: "+965",
    flag: "🇰🇼",
    placeholder: "9123 4567",
    sample: "91234567",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    code: "QA",
    name: "Qatar",
    nameAr: "قطر",
    dialCode: "+974",
    flag: "🇶🇦",
    placeholder: "3312 3456",
    sample: "33123456",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    code: "JO",
    name: "Jordan",
    nameAr: "الأردن",
    dialCode: "+962",
    flag: "🇯🇴",
    placeholder: "07 9123 4567",
    sample: "0791234567",
    minDigits: 9,
    maxDigits: 10,
  },
  {
    code: "US",
    name: "United States",
    nameAr: "الولايات المتحدة",
    dialCode: "+1",
    flag: "🇺🇸",
    placeholder: "(555) 012-3456",
    sample: "5550123456",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    code: "GB",
    name: "United Kingdom",
    nameAr: "المملكة المتحدة",
    dialCode: "+44",
    flag: "🇬🇧",
    placeholder: "07123 456789",
    sample: "07123456789",
    minDigits: 10,
    maxDigits: 11,
  },
  {
    code: "DE",
    name: "Germany",
    nameAr: "ألمانيا",
    dialCode: "+49",
    flag: "🇩🇪",
    placeholder: "0151 23456789",
    sample: "015123456789",
    minDigits: 10,
    maxDigits: 11,
  },
];

export function getCountryByCode(code: string): CountryItem {
  return (
    SUPPORTED_COUNTRIES.find(
      (c) => c.code.toUpperCase() === code.toUpperCase()
    ) || SUPPORTED_COUNTRIES[0]
  );
}

export function getCountryByDialCode(dialCode: string): CountryItem {
  return (
    SUPPORTED_COUNTRIES.find((c) => c.dialCode === dialCode) ||
    SUPPORTED_COUNTRIES[0]
  );
}

