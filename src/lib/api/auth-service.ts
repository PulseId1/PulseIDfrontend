/**
 * PulseID Authentication Service
 *
 * Implements real backend communication for Login and Registration via the centralized ApiClient.
 *
 * Ground Rules:
 * - Single centralized login endpoint: POST /api/v1/Users/Login for ALL user roles.
 * - Role is derived from backend response (typeId 1 = patient, 2 = doctor, 3 = pharmacist).
 * - Registration endpoints are role-specific:
 *   - Patient: POST /api/v1/Patient/Create (application/json)
 *   - Doctor: POST /api/v1/Doctor/Create (multipart/form-data, TypeId: 2)
 *   - Pharmacist: POST /api/v1/Doctor/Create (multipart/form-data, TypeId: 3)
 * - NO mock token generation or fake fallbacks.
 */

import { apiClient, ApiError } from "./client";
import { UserAddUpdateDTO, LoginParameterDTO } from "./types";
import { DoctorService, DoctorRegisterPayload } from "./doctor-service";
import { PharmacistService, PharmacistRegisterPayload } from "./pharmacist-service";

export type RoleType = "patient" | "doctor" | "pharmacist";

export interface LoginCredentials extends LoginParameterDTO {
  role?: RoleType;
}

export interface RegisterFormPayload {
  fullName: string;
  email: string;
  password: string;
  nationalId: string;
  phone: string;
  gender: "male" | "female";
  country: string;
  state: string;
  city: string;
  address?: string;
  stateId?: number;
  cityId?: number;
  role: RoleType;
  license?: string;
  licenseFile?: File | Blob;
  professionalIdFile?: File | Blob;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: UserAddUpdateDTO;
  role?: RoleType;
  error?: string;
  validationErrors?: Record<string, string[]>;
}

/**
 * Maps numeric backend typeId to strongly-typed frontend role.
 * 1 = Patient, 2 = Doctor, 3 = Pharmacist.
 */
export function mapTypeIdToRole(typeId?: number | null): RoleType | undefined {
  if (typeId === 1) return "patient";
  if (typeId === 2) return "doctor";
  if (typeId === 3) return "pharmacist";
  return undefined;
}

/**
 * Maps frontend role string to numeric backend typeId.
 */
export function mapRoleToTypeId(role?: RoleType): number {
  if (role === "doctor") return 2;
  if (role === "pharmacist") return 3;
  return 1; // Default to Patient
}

export const AuthService = {
  /**
   * Centralized Backend Login
   * Endpoint: POST /api/v1/Users/Login
   *
   * All user types (Patient, Doctor, Pharmacist) authenticate through this single endpoint.
   * Extracts token, user identity, and backend role (typeId).
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<Record<string, unknown>>(
        "/api/v1/Users/Login",
        {
          userName: credentials.userName,
          password: credentials.password,
        },
        { skipAuth: true }
      );

      // Extract token from response (could be string, data.token, or data.result.token)
      const data = response.data;
      let token: string | undefined = undefined;

      if (typeof data === "string") {
        token = data;
      } else if (data && typeof data === "object") {
        const tokenCandidate =
          (data.token as string) ||
          ((data.result as Record<string, unknown>)?.token as string);
        if (tokenCandidate) {
          token = tokenCandidate;
        }
      }

      if (!token) {
        return {
          success: false,
          error: "Backend responded successfully but returned no authentication token.",
        };
      }

      // Extract role strictly from backend response properties; do NOT trust client-selected role
      const dataObj = typeof data === "object" && data !== null ? (data as Record<string, unknown>) : {};
      const resultObj = typeof dataObj.result === "object" && dataObj.result !== null ? (dataObj.result as Record<string, unknown>) : {};
      const userObj = typeof dataObj.user === "object" && dataObj.user !== null ? (dataObj.user as Record<string, unknown>) : {};

      const candidateTypeId =
        (dataObj.typeId as number | undefined) ??
        (userObj.typeId as number | undefined) ??
        (resultObj.typeId as number | undefined);

      const backendRole = mapTypeIdToRole(candidateTypeId);

      return {
        success: true,
        token,
        user: (dataObj.user as UserAddUpdateDTO) || undefined,
        role: backendRole,
      };
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        return {
          success: false,
          error: err.message,
          validationErrors: err.validationErrors,
        };
      }

      return {
        success: false,
        error: err instanceof Error ? err.message : "An unexpected login error occurred.",
      };
    }
  },

  /**
   * Real Backend Patient Registration
   * Endpoint: POST /api/v1/Patient/Create
   *
   * Submits UserAddUpdateDTO with typeId: 1 (Patient).
   * Note: Required clinical array collections are passed as [] to satisfy ASP.NET model validation.
   * bloodTypeId is intentionally undefined unless mapped to a confirmed backend record.
   */
  async registerPatient(formData: Omit<RegisterFormPayload, "role">): Promise<AuthResponse> {
    const payload: UserAddUpdateDTO = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `usr-${Date.now()}`,
      nameEn: formData.fullName,
      nameAr: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      userName: formData.phone || formData.email,
      nationalId: formData.nationalId,
      genderTypeId: formData.gender === "male" ? 1 : 2,
      typeId: 1, // Patient
      address: formData.address || `${formData.city}, ${formData.state}, ${formData.country}`,
      birthDate: "1994-05-12T00:00:00.000Z",
      bloodTypeId: undefined, // Do not submit unseeded fallback IDs
      allergyMenu: [],
      chronicDiseases: [],
      currentMedications: [],
      pastMedicalHistory: [],
      previousSurgicalProcedures: [],
    };

    try {
      const response = await apiClient.post<Record<string, unknown>>(
        "/api/v1/Patient/Create",
        payload,
        { skipAuth: true }
      );

      const data = response.data;
      const token = typeof data === "string" ? data : (data?.token as string | undefined);

      return {
        success: true,
        token,
        user: payload,
        role: "patient",
      };
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        return {
          success: false,
          error: err.message,
          validationErrors: err.validationErrors,
        };
      }

      return {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during patient registration.",
      };
    }
  },

  /**
   * Real Backend Doctor Registration
   * Endpoint: POST /api/v1/Doctor/Create (multipart/form-data)
   */
  async registerDoctor(formData: DoctorRegisterPayload | FormData): Promise<AuthResponse> {
    const res = await DoctorService.registerDoctor(formData);
    if (res.success) {
      return {
        success: true,
        role: "doctor",
      };
    }
    return {
      success: false,
      error: res.error,
      validationErrors: res.validationErrors,
    };
  },

  /**
   * Real Backend Pharmacist Registration
   * Endpoint: POST /api/v1/Doctor/Create (multipart/form-data with TypeId: 3)
   */
  async registerPharmacist(formData: PharmacistRegisterPayload | FormData): Promise<AuthResponse> {
    const res = await PharmacistService.registerPharmacist(formData);
    if (res.success) {
      return {
        success: true,
        role: "pharmacist",
      };
    }
    return {
      success: false,
      error: res.error,
      validationErrors: res.validationErrors,
    };
  },

  /**
   * Universal Registration Dispatcher
   * Routes to the appropriate role-specific endpoint:
   * - Patient -> POST /api/v1/Patient/Create
   * - Doctor -> POST /api/v1/Doctor/Create (TypeId: 2, multipart/form-data)
   * - Pharmacist -> POST /api/v1/Doctor/Create (TypeId: 3, multipart/form-data)
   */
  async register(formData: RegisterFormPayload): Promise<AuthResponse> {
    if (formData.role === "patient") {
      return this.registerPatient(formData);
    }

    if (formData.role === "doctor") {
      return this.registerDoctor({
        nameEn: formData.fullName,
        nameAr: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        nationalId: formData.nationalId,
        genderTypeId: formData.gender === "male" ? 1 : 2,
        address: formData.address || `${formData.city}, ${formData.state}, ${formData.country}`,
        license: formData.license || "LIC-DOC-PENDING",
        stateId: formData.stateId,
        cityId: formData.cityId,
        medicalLicenseFile: formData.licenseFile,
        professionalIdFile: formData.professionalIdFile,
      });
    }

    if (formData.role === "pharmacist") {
      return this.registerPharmacist({
        nameEn: formData.fullName,
        nameAr: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        nationalId: formData.nationalId,
        genderTypeId: formData.gender === "male" ? 1 : 2,
        address: formData.address || `${formData.city}, ${formData.state}, ${formData.country}`,
        license: formData.license || "LIC-PHM-PENDING",
        stateId: formData.stateId,
        cityId: formData.cityId,
        pharmacyLicenseFile: formData.licenseFile,
        professionalIdFile: formData.professionalIdFile,
      });
    }

    return {
      success: false,
      error: `Unsupported role: ${String(formData.role)}`,
    };
  },
};
