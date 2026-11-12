"use client";

import React from "react";
import { useReferenceData } from "@/lib/api/use-reference-data";
import { DEMO_EGYPTIAN_STATES, DEMO_EGYPTIAN_CITIES } from "@/lib/demo/demo-data";
import { Loader2 } from "lucide-react";

interface StateCitySelectorProps {
  onStateChange: (stateId: number | null, stateName: string) => void;
  onCityChange: (cityId: number | null, cityName: string) => void;
  selectedStateId?: number | null;
  selectedCityId?: number | null;
  errors?: {
    state?: string;
    city?: string;
  };
}

export function StateCitySelector({
  onStateChange,
  onCityChange,
  selectedStateId: propStateId,
  selectedCityId: propCityId,
  errors,
}: StateCitySelectorProps) {
  const {
    states,
    isLoadingStates,
    selectedStateId,
    setSelectedStateId,
    cities,
    isLoadingCities,
    selectedCityId,
    setSelectedCityId,
  } = useReferenceData();

  const activeStateId = propStateId !== undefined ? propStateId : selectedStateId;
  const activeCityId = propCityId !== undefined ? propCityId : selectedCityId;

  // Use local Egyptian demo dataset as robust source of truth in demo mode
  const effectiveStates = states && states.length > 0 ? states : DEMO_EGYPTIAN_STATES;
  const effectiveCities =
    cities && cities.length > 0
      ? cities
      : activeStateId !== null && activeStateId !== undefined
      ? DEMO_EGYPTIAN_CITIES.filter((c) => c.stateId === activeStateId)
      : [];

  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) {
      setSelectedStateId(null);
      onStateChange(null, "");
      onCityChange(null, "");
      return;
    }

    const stateId = parseInt(val, 10);
    const matchedState = effectiveStates.find((s) => s.id === stateId);
    setSelectedStateId(stateId);
    onStateChange(stateId, matchedState?.nameEn || matchedState?.nameAr || "");
    onCityChange(null, "");
  };

  const handleCitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) {
      setSelectedCityId(null);
      onCityChange(null, "");
      return;
    }

    const cityId = parseInt(val, 10);
    const matchedCity = effectiveCities.find((c) => c.id === cityId);
    setSelectedCityId(cityId);
    onCityChange(cityId, matchedCity?.nameEn || matchedCity?.nameAr || "");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {/* State / Governorate Field */}
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex items-center justify-between">
          <label
            htmlFor="registration-state"
            className="text-[12px] font-medium text-[#41474F] block"
          >
            State / Governorate
          </label>
          {isLoadingStates && effectiveStates.length === 0 && (
            <span className="text-[11px] text-[#078BDE] flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading...
            </span>
          )}
        </div>

        <div className="relative">
          <select
            id="registration-state"
            value={activeStateId !== null && activeStateId !== undefined ? activeStateId : ""}
            onChange={handleStateSelect}
            disabled={isLoadingStates && effectiveStates.length === 0}
            className={`w-full h-[46px] px-3.5 bg-white border ${
              errors?.state ? "border-red-500" : "border-[#E1E6ED]"
            } rounded-xl text-[14px] text-slate-800 focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <option value="">
              {isLoadingStates && effectiveStates.length === 0
                ? "Loading states..."
                : "Select State / Governorate"}
            </option>
            {effectiveStates.map((st) => (
              <option key={st.id} value={st.id}>
                {st.nameEn || st.nameAr || `State ${st.id}`}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
            ▼
          </div>
        </div>

        {errors?.state && (
          <p className="text-[11px] text-red-600">{errors.state}</p>
        )}
      </div>

      {/* City / District Field */}
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex items-center justify-between">
          <label
            htmlFor="registration-city"
            className="text-[12px] font-medium text-[#41474F] block"
          >
            City / District
          </label>
          {isLoadingCities && effectiveCities.length === 0 && (
            <span className="text-[11px] text-[#078BDE] flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading...
            </span>
          )}
        </div>

        <div className="relative">
          <select
            id="registration-city"
            value={activeCityId !== null && activeCityId !== undefined ? activeCityId : ""}
            onChange={handleCitySelect}
            disabled={
              (isLoadingCities && effectiveCities.length === 0) ||
              activeStateId === null ||
              activeStateId === undefined
            }
            className={`w-full h-[46px] px-3.5 bg-white border ${
              errors?.city ? "border-red-500" : "border-[#E1E6ED]"
            } rounded-xl text-[14px] text-slate-800 focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <option value="">
              {activeStateId === null || activeStateId === undefined
                ? "Select a state first"
                : isLoadingCities && effectiveCities.length === 0
                ? "Loading cities..."
                : effectiveCities.length === 0
                ? "No cities available for this state"
                : "Select City / District"}
            </option>
            {effectiveCities.map((ct) => (
              <option key={ct.id} value={ct.id}>
                {ct.nameEn || ct.nameAr || `City ${ct.id}`}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
            ▼
          </div>
        </div>

        {errors?.city && (
          <p className="text-[11px] text-red-600">{errors.city}</p>
        )}
      </div>
    </div>
  );
}
