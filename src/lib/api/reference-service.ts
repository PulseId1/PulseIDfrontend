/**
 * PulseID Reference Data API Service
 *
 * Implements real backend retrieval for:
 * - Blood Types (GET /api/v1/BloodType/GetAll)
 * - States / Governorates (POST /api/v1/States/GetAll)
 * - Cities (POST /api/v1/Citys/GetAll)
 *
 * Operational rules:
 * - Returns actual backend data directly.
 * - Does NOT silently replace empty backend lists with fake data.
 * - If the backend returns 0 records, returns an empty array.
 * - Does NOT send empty filter objects or orderByValue arrays that trigger ASP.NET EF Core 500 errors.
 * - Filters cities by stateId on the returned dataset according to backend schema.
 * - Static UI fallbacks are strictly separated with clear disclaimers and must never be submitted as foreign keys.
 */

import { apiClient } from "./client";
import { BloodTypeDTO, StatesDTO, CitysDTO, PaginatedResult } from "./types";

export class ReferenceService {
  /**
   * Fetches blood types from backend.
   * Endpoint: GET /api/v1/BloodType/GetAll
   *
   * Note from live testing: Backend DB currently has 0 seeded blood types.
   * This method returns the actual backend response (empty array if empty).
   */
  static async getBloodTypes(): Promise<BloodTypeDTO[]> {
    const response = await apiClient.get<PaginatedResult<BloodTypeDTO> | BloodTypeDTO[]>(
      "/api/v1/BloodType/GetAll"
    );

    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (response.data && "result" in response.data && Array.isArray(response.data.result)) {
      return response.data.result;
    }

    return [];
  }

  /**
   * Fetches states / governorates from backend.
   * Endpoint: POST /api/v1/States/GetAll
   *
   * Ground rule: Must send only { pageNumber, pageSize } without empty filter objects
   * or empty orderByValue arrays, which trigger ASP.NET Core EF Core 500 exceptions.
   */
  static async getStates(): Promise<StatesDTO[]> {
    const response = await apiClient.post<PaginatedResult<StatesDTO>>(
      "/api/v1/States/GetAll",
      {
        pageNumber: 1,
        pageSize: 100,
      }
    );

    if (response.data && Array.isArray(response.data.result)) {
      return response.data.result;
    }

    return [];
  }

  /**
   * Fetches cities from backend with optional stateId filtering.
   * Endpoint: POST /api/v1/Citys/GetAll
   *
   * Ground rule: In OpenAPI, CitysDTO contains stateId, while CitysFilter has no
   * filter properties. Cities are retrieved and filtered by stateId when specified.
   */
  static async getCities(stateId?: number): Promise<CitysDTO[]> {
    const response = await apiClient.post<PaginatedResult<CitysDTO>>(
      "/api/v1/Citys/GetAll",
      {
        pageNumber: 1,
        pageSize: 500,
      }
    );

    let cities: CitysDTO[] = [];
    if (response.data && Array.isArray(response.data.result)) {
      cities = response.data.result;
    }

    if (stateId !== undefined && stateId !== null) {
      return cities.filter((c) => c.stateId === stateId);
    }

    return cities;
  }

  // ==========================================================================
  // PRESENTATION-ONLY BLOOD TYPE REFERENCE LIST (OFFLINE UI PROTOTYPE ONLY)
  //
  // STRICT GROUND RULE:
  // The IDs below (1-8) are arbitrary client presentation constants.
  // They must NEVER be submitted as foreign keys to backend endpoints (such as
  // Patient/Update or Patient/Create) because the remote database table has 0
  // seeded records. Submitting unverified foreign keys can cause SQL foreign key
  // violations or data corruption.
  // ==========================================================================

  static readonly PRESENTATION_ONLY_BLOOD_TYPES: BloodTypeDTO[] = [
    { id: 1, nameEn: "O+ (Positive)", nameAr: "موجب O" },
    { id: 2, nameEn: "O- (Negative)", nameAr: "سالب O" },
    { id: 3, nameEn: "A+ (Positive)", nameAr: "موجب A" },
    { id: 4, nameEn: "A- (Negative)", nameAr: "سالب A" },
    { id: 5, nameEn: "B+ (Positive)", nameAr: "موجب B" },
    { id: 6, nameEn: "B- (Negative)", nameAr: "سالب B" },
    { id: 7, nameEn: "AB+ (Positive)", nameAr: "موجب AB" },
    { id: 8, nameEn: "AB- (Negative)", nameAr: "سالب AB" },
  ];

  /** Legacy alias for backward compatibility; presentation-only */
  static readonly CLIENT_FALLBACK_BLOOD_TYPES = ReferenceService.PRESENTATION_ONLY_BLOOD_TYPES;
}
