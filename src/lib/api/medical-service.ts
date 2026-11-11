/**
 * PulseID Medical Records API Service
 *
 * Implements real backend CRUD operations for clinical sub-domains:
 * - AllergyMenu
 * - ChronicDiseases
 * - CurrentMedications
 * - PastMedicalHistory
 * - PreviousSurgicalProcedures
 *
 * All operations consume the centralized ApiClient.
 * Strips frontend-only presentation properties to match OpenAPI schemas strictly.
 * Ground rule: Omits empty orderByValue arrays to avoid backend EF Core HTTP 500 crashes.
 */

import { apiClient } from "./client";
import {
  AllergyMenuDTO,
  ChronicDiseasesDTO,
  CurrentMedicationsDTO,
  PastMedicalHistoryDTO,
  PreviousSurgicalProceduresDTO,
  PaginatedResult,
} from "./types";

export class MedicalService {
  // ==========================================================================
  // ALLERGIES
  // ==========================================================================

  static async getAllergies(
    patientId: string,
    pageNumber: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResult<AllergyMenuDTO>> {
    const response = await apiClient.post<PaginatedResult<AllergyMenuDTO>>(
      "/api/v1/AllergyMenu/GetAll",
      {
        pageNumber,
        pageSize,
        filter: { patientId },
      }
    );
    return response.data || { pageNumber, pageSize, totalCount: 0, result: [] };
  }

  static async createAllergy(dto: AllergyMenuDTO): Promise<AllergyMenuDTO> {
    const clean: AllergyMenuDTO = {
      name: dto.name,
      patientId: dto.patientId,
      date: dto.date || new Date().toISOString(),
    };
    const response = await apiClient.post<AllergyMenuDTO>(
      "/api/v1/AllergyMenu/Create",
      clean
    );
    return response.data || clean;
  }

  static async deleteAllergy(id: number): Promise<boolean> {
    const response = await apiClient.post(
      `/api/v1/AllergyMenu/delete?id=${encodeURIComponent(id)}`
    );
    return response.success;
  }

  // ==========================================================================
  // CHRONIC DISEASES
  // ==========================================================================

  static async getChronicDiseases(
    patientId: string,
    pageNumber: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResult<ChronicDiseasesDTO>> {
    const response = await apiClient.post<PaginatedResult<ChronicDiseasesDTO>>(
      "/api/v1/ChronicDiseases/GetAll",
      {
        pageNumber,
        pageSize,
        filter: { patientId },
      }
    );
    return response.data || { pageNumber, pageSize, totalCount: 0, result: [] };
  }

  static async createChronicDisease(
    dto: ChronicDiseasesDTO
  ): Promise<ChronicDiseasesDTO> {
    const clean: ChronicDiseasesDTO = {
      name: dto.name,
      patientId: dto.patientId,
      date: dto.date || new Date().toISOString(),
    };
    const response = await apiClient.post<ChronicDiseasesDTO>(
      "/api/v1/ChronicDiseases/Create",
      clean
    );
    return response.data || clean;
  }

  static async deleteChronicDisease(id: number): Promise<boolean> {
    const response = await apiClient.post(
      `/api/v1/ChronicDiseases/delete?id=${encodeURIComponent(id)}`
    );
    return response.success;
  }

  // ==========================================================================
  // CURRENT MEDICATIONS
  // ==========================================================================

  static async getCurrentMedications(
    patientId: string,
    pageNumber: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResult<CurrentMedicationsDTO>> {
    const response = await apiClient.post<PaginatedResult<CurrentMedicationsDTO>>(
      "/api/v1/CurrentMedications/GetAll",
      {
        pageNumber,
        pageSize,
        filter: { patientId },
      }
    );
    return response.data || { pageNumber, pageSize, totalCount: 0, result: [] };
  }

  static async createCurrentMedication(
    dto: CurrentMedicationsDTO
  ): Promise<CurrentMedicationsDTO> {
    const clean: CurrentMedicationsDTO = {
      name: dto.name,
      patientId: dto.patientId,
      date: dto.date || new Date().toISOString(),
    };
    const response = await apiClient.post<CurrentMedicationsDTO>(
      "/api/v1/CurrentMedications/Create",
      clean
    );
    return response.data || clean;
  }

  static async deleteCurrentMedication(id: number): Promise<boolean> {
    const response = await apiClient.post(
      `/api/v1/CurrentMedications/delete?id=${encodeURIComponent(id)}`
    );
    return response.success;
  }

  // ==========================================================================
  // PAST MEDICAL HISTORY
  // ==========================================================================

  static async getPastMedicalHistory(
    patientId: string,
    pageNumber: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResult<PastMedicalHistoryDTO>> {
    const response = await apiClient.post<PaginatedResult<PastMedicalHistoryDTO>>(
      "/api/v1/PastMedicalHistory/GetAll",
      {
        pageNumber,
        pageSize,
        filter: { patientId },
      }
    );
    return response.data || { pageNumber, pageSize, totalCount: 0, result: [] };
  }

  static async createPastMedicalHistory(
    dto: PastMedicalHistoryDTO
  ): Promise<PastMedicalHistoryDTO> {
    const clean: PastMedicalHistoryDTO = {
      name: dto.name,
      userId: dto.userId,
      date: dto.date || new Date().toISOString(),
    };
    const response = await apiClient.post<PastMedicalHistoryDTO>(
      "/api/v1/PastMedicalHistory/Create",
      clean
    );
    return response.data || clean;
  }

  // ==========================================================================
  // PREVIOUS SURGICAL PROCEDURES
  // ==========================================================================

  static async getPreviousSurgicalProcedures(
    patientId: string,
    pageNumber: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResult<PreviousSurgicalProceduresDTO>> {
    const response = await apiClient.post<
      PaginatedResult<PreviousSurgicalProceduresDTO>
    >("/api/v1/PreviousSurgicalProcedures/GetAll", {
      pageNumber,
      pageSize,
      filter: { patientId },
    });
    return response.data || { pageNumber, pageSize, totalCount: 0, result: [] };
  }

  static async createPreviousSurgicalProcedure(
    dto: PreviousSurgicalProceduresDTO
  ): Promise<PreviousSurgicalProceduresDTO> {
    const clean: PreviousSurgicalProceduresDTO = {
      name: dto.name,
      patientId: dto.patientId,
      date: dto.date || new Date().toISOString(),
    };
    const response = await apiClient.post<PreviousSurgicalProceduresDTO>(
      "/api/v1/PreviousSurgicalProcedures/Create",
      clean
    );
    return response.data || clean;
  }
}
