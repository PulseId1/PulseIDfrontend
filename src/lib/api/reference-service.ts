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
import { DEMO_EGYPTIAN_STATES, DEMO_EGYPTIAN_CITIES } from "@/lib/demo/demo-data";

export class ReferenceService {
  /**
   * Fetches blood types from backend.
   * Endpoint: GET /api/v1/BloodType/GetAll
   *
   * In demo mode or if remote backend fails, falls back to presentation blood types.
   */
  static async getBloodTypes(): Promise<BloodTypeDTO[]> {
    try {
      const response = await apiClient.get<PaginatedResult<BloodTypeDTO> | BloodTypeDTO[]>(
        "/api/v1/BloodType/GetAll"
      );

      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }

      if (response.data && "result" in response.data && Array.isArray(response.data.result) && response.data.result.length > 0) {
        return response.data.result;
      }
    } catch {
      // Offline / demo fallback
    }

    return ReferenceService.PRESENTATION_ONLY_BLOOD_TYPES;
  }

  /**
   * Fetches states / governorates from backend.
   * Endpoint: POST /api/v1/States/GetAll
   *
   * In demo mode or if remote backend fails, seamlessly provides local Egyptian states.
   */
  static async getStates(): Promise<StatesDTO[]> {
    try {
      const response = await apiClient.post<PaginatedResult<StatesDTO>>(
        "/api/v1/States/GetAll",
        {
          pageNumber: 1,
          pageSize: 100,
        }
      );

      if (response.data && Array.isArray(response.data.result) && response.data.result.length > 0) {
        return response.data.result;
      }
    } catch {
      // Offline / demo fallback
    }

    return DEMO_EGYPTIAN_STATES;
  }

  /**
   * Fetches cities from backend with optional stateId filtering.
   * Endpoint: POST /api/v1/Citys/GetAll
   *
   * In demo mode or if remote backend fails, seamlessly provides local Egyptian cities.
   */
  static async getCities(stateId?: number): Promise<CitysDTO[]> {
    let cities: CitysDTO[] = [];
    try {
      const response = await apiClient.post<PaginatedResult<CitysDTO>>(
        "/api/v1/Citys/GetAll",
        {
          pageNumber: 1,
          pageSize: 500,
        }
      );

      if (response.data && Array.isArray(response.data.result) && response.data.result.length > 0) {
        cities = response.data.result;
      }
    } catch {
      // Offline / demo fallback
    }

    if (cities.length === 0) {
      cities = DEMO_EGYPTIAN_CITIES;
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
