/**
 * PulseID Authentication Type Definitions
 */

export type AuthRole = "patient" | "doctor" | "pharmacist";

export type AuthLanguage = "en" | "ar";

export interface CountryItem {
  readonly code: string;       // ISO country code e.g. "EG"
  readonly name: string;       // English name
  readonly nameAr: string;     // Arabic name
  readonly dialCode: string;   // e.g. "+20"
  readonly flag: string;       // emoji flag
  readonly placeholder: string;
  readonly sample: string;
  readonly minDigits: number;
  readonly maxDigits: number;
}

export interface PatientFields {
  readonly dateOfBirth: string;
  readonly gender: "male" | "female" | "other" | "";
  readonly nationalId?: string;
  readonly emergencyContactName?: string;
  readonly emergencyContactPhone?: string;
}

export interface DoctorFields {
  readonly specialization: string;
  readonly licenseNumber: string;
  readonly hospitalAffiliation?: string;
  readonly yearsExperience?: string;
}

export interface PharmacistFields {
  readonly licenseNumber: string;
  readonly pharmacyName: string;
  readonly pharmacyBranch?: string;
  readonly syndicateId?: string;
}

export type RoleSpecificFields = PatientFields | DoctorFields | PharmacistFields;

export interface RegistrationData {
  readonly role: AuthRole;
  readonly fullName: string;
  readonly countryCode: string;
  readonly phoneNumber: string;
  readonly roleFields: RoleSpecificFields;
}

export interface LoginData {
  readonly role: AuthRole;
  readonly countryCode: string;
  readonly phoneNumber: string;
}

export type AuthFlowMode = "login" | "register";

export interface AuthSessionState {
  readonly role: AuthRole;
  readonly mode: AuthFlowMode;
  readonly countryCode: string;
  readonly phoneNumber: string;
  readonly registrationData?: RegistrationData;
  readonly isVerified: boolean;
  readonly language: AuthLanguage;
}

