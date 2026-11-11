/**
 * PulseID Doctor API Service
 *
 * Implements real backend communication for Doctor registration and profiles.
 * Source of Truth: OpenAPI Tag "DoctorAndPharmacy", Endpoint: /api/v1/Doctor/Create
 *
 * Operational rules:
 * - Content-Type for Doctor/Create is multipart/form-data.
 * - Role TypeId is strictly 2 for Doctors.
 * - Content-Type header is NEVER set manually on FormData (browser generates boundary).
 */

import { apiClient, ApiError } from "./client";
import { UserAddUpdateDoctorDTO, PaginatedResult } from "./types";

export interface DoctorRegisterPayload {
  id?: string;
  nameEn: string;
  nameAr?: string;
  birthDate?: string;
  genderTypeId: number;
  email: string;
  phone: string;
  nationalId: string;
  address?: string;
  userName?: string;
  password?: string;
  stateId?: number;
  cityId?: number;
  license: string;
  medicalLicenseFile?: File | Blob;
  professionalIdFile?: File | Blob;
  medicalLicenseName?: string;
  professionalIdName?: string;
}

export class DoctorService {
  /**
   * Registers a new doctor using multipart/form-data.
   * Endpoint: POST /api/v1/Doctor/Create
   */
  static async registerDoctor(
    payload: DoctorRegisterPayload | FormData
  ): Promise<{ success: boolean; data?: unknown; error?: string; validationErrors?: Record<string, string[]> }> {
    let formData: FormData;

    if (payload instanceof FormData) {
      formData = payload;
      // Ensure TypeId 2 is set
      if (!formData.has("TypeId")) {
        formData.append("TypeId", "2");
      }
    } else {
      formData = new FormData();
      const doctorId = payload.id || (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `doc-${Date.now()}`);
      formData.append("Id", doctorId);
      formData.append("NameEn", payload.nameEn);
      formData.append("NameAr", payload.nameAr || payload.nameEn);
      formData.append("BirthDate", payload.birthDate || "1985-01-01T00:00:00.000Z");
      formData.append("GenderTypeId", String(payload.genderTypeId || 1));
      formData.append("TypeId", "2"); // Doctor
      formData.append("Email", payload.email);
      formData.append("Phone", payload.phone);
      formData.append("NationalId", payload.nationalId);
      formData.append("Address", payload.address || "");
      formData.append("UserName", payload.userName || payload.phone || payload.email);
      formData.append("Password", payload.password || "");
      formData.append("License", payload.license);

      if (payload.stateId !== undefined && payload.stateId !== null) {
        formData.append("StateId", String(payload.stateId));
      }
      if (payload.cityId !== undefined && payload.cityId !== null) {
        formData.append("CityId", String(payload.cityId));
      }

      if (payload.medicalLicenseFile) {
        formData.append("MedicalLicense", payload.medicalLicenseFile);
        formData.append("MedicalLicenseName", payload.medicalLicenseName || "medical_license.pdf");
      }
      if (payload.professionalIdFile) {
        formData.append("ProfessionalID", payload.professionalIdFile);
        formData.append("ProfessionalIDName", payload.professionalIdName || "syndicate_id.pdf");
      }
    }

    try {
      const response = await apiClient.post<Record<string, unknown>>(
        "/api/v1/Doctor/Create",
        formData,
        { skipAuth: true }
      );
      return { success: true, data: response.data };
    } catch (err) {
      if (err instanceof ApiError) {
        return {
          success: false,
          error: err.message,
          validationErrors: err.validationErrors,
        };
      }
      return {
        success: false,
        error: err instanceof Error ? err.message : "An unexpected error occurred during doctor registration.",
      };
    }
  }

  /**
   * Retrieves a doctor profile by ID.
   * Endpoint: GET /api/v1/Doctor/getById?id={id}
   */
  static async getDoctorById(id: string): Promise<UserAddUpdateDoctorDTO | null> {
    const response = await apiClient.get<UserAddUpdateDoctorDTO>(
      `/api/v1/Doctor/getById?id=${encodeURIComponent(id)}`
    );
    return response.data || null;
  }

  /**
   * Fetches all registered doctors.
   * Endpoint: POST /api/v1/Doctor/GetAll
   */
  static async getAllDoctors(pageNumber = 1, pageSize = 50): Promise<UserAddUpdateDoctorDTO[]> {
    const response = await apiClient.post<PaginatedResult<UserAddUpdateDoctorDTO>>(
      "/api/v1/Doctor/GetAll",
      { pageNumber, pageSize }
    );
    return response.data?.result || [];
  }
}
