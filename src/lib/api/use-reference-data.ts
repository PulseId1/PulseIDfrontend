"use client";

import { useState, useEffect, useCallback } from "react";
import { ReferenceService } from "./reference-service";
import { StatesDTO, CitysDTO, BloodTypeDTO } from "./types";

export interface UseReferenceDataReturn {
  // States
  states: StatesDTO[];
  isLoadingStates: boolean;
  statesError: string | null;
  refetchStates: () => Promise<void>;

  // Selection
  selectedStateId: number | null;
  setSelectedStateId: (stateId: number | null) => void;

  // Cities (dependent on state)
  cities: CitysDTO[];
  isLoadingCities: boolean;
  citiesError: string | null;
  refetchCities: () => Promise<void>;

  selectedCityId: number | null;
  setSelectedCityId: (cityId: number | null) => void;

  // Blood Types
  bloodTypes: BloodTypeDTO[];
  isLoadingBloodTypes: boolean;
  bloodTypesError: string | null;
  refetchBloodTypes: () => Promise<void>;
}

export function useReferenceData(): UseReferenceDataReturn {
  const [states, setStates] = useState<StatesDTO[]>([]);
  const [isLoadingStates, setIsLoadingStates] = useState<boolean>(true);
  const [statesError, setStatesError] = useState<string | null>(null);

  const [selectedStateId, setSelectedStateIdState] = useState<number | null>(null);

  const [allCities, setAllCities] = useState<CitysDTO[]>([]);
  const [cities, setCities] = useState<CitysDTO[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false);
  const [citiesError, setCitiesError] = useState<string | null>(null);

  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  const [bloodTypes, setBloodTypes] = useState<BloodTypeDTO[]>([]);
  const [isLoadingBloodTypes, setIsLoadingBloodTypes] = useState<boolean>(false);
  const [bloodTypesError, setBloodTypesError] = useState<string | null>(null);

  // Fetch States from API
  const fetchStates = useCallback(async () => {
    setIsLoadingStates(true);
    setStatesError(null);
    try {
      const data = await ReferenceService.getStates();
      setStates(data);
    } catch (err) {
      setStatesError(err instanceof Error ? err.message : "Failed to load states from server.");
    } finally {
      setIsLoadingStates(false);
    }
  }, []);

  // Fetch Cities from API
  const fetchCities = useCallback(async (stateId?: number | null) => {
    setIsLoadingCities(true);
    setCitiesError(null);
    try {
      const data = await ReferenceService.getCities();
      setAllCities(data);
      if (stateId !== undefined && stateId !== null) {
        setCities(data.filter((c) => c.stateId === stateId));
      } else {
        setCities(data);
      }
    } catch (err) {
      setCitiesError(err instanceof Error ? err.message : "Failed to load cities from server.");
    } finally {
      setIsLoadingCities(false);
    }
  }, []);

  // Fetch Blood Types from API
  const fetchBloodTypes = useCallback(async () => {
    setIsLoadingBloodTypes(true);
    setBloodTypesError(null);
    try {
      const data = await ReferenceService.getBloodTypes();
      setBloodTypes(data);
    } catch (err) {
      setBloodTypesError(err instanceof Error ? err.message : "Failed to load blood types from server.");
    } finally {
      setIsLoadingBloodTypes(false);
    }
  }, []);

  // Initial load of states without synchronous setState in effect body
  useEffect(() => {
    let isSubscribed = true;

    ReferenceService.getStates()
      .then((data) => {
        if (isSubscribed) {
          setStates(data);
          setIsLoadingStates(false);
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setStatesError(err instanceof Error ? err.message : "Failed to load states from server.");
          setIsLoadingStates(false);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  // When selected state changes:
  // 1. Clear selected city
  // 2. Filter or fetch cities for that state
  const setSelectedStateId = useCallback(
    (stateId: number | null) => {
      setSelectedStateIdState(stateId);
      // Operational Rule: Changing selected state must never leave a city selected from the previous state
      setSelectedCityId(null);

      if (stateId === null) {
        setCities([]);
        return;
      }

      // If we already loaded allCities, filter synchronously
      if (allCities.length > 0) {
        setCities(allCities.filter((c) => c.stateId === stateId));
      } else {
        fetchCities(stateId);
      }
    },
    [allCities, fetchCities]
  );

  const refetchCities = useCallback(async () => {
    await fetchCities(selectedStateId);
  }, [fetchCities, selectedStateId]);

  return {
    states,
    isLoadingStates,
    statesError,
    refetchStates: fetchStates,

    selectedStateId,
    setSelectedStateId,

    cities,
    isLoadingCities,
    citiesError,
    refetchCities,

    selectedCityId,
    setSelectedCityId,

    bloodTypes,
    isLoadingBloodTypes,
    bloodTypesError,
    refetchBloodTypes: fetchBloodTypes,
  };
}
