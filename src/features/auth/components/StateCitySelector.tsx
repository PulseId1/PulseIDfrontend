"use client";

import React from "react";
import { useReferenceData } from "@/lib/api/use-reference-data";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";

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
    statesError,
    refetchStates,
    selectedStateId,
    setSelectedStateId,
    cities,
    isLoadingCities,
    citiesError,
    refetchCities,
    selectedCityId,
    setSelectedCityId,
  } = useReferenceData();

  const activeStateId = propStateId !== undefined ? propStateId : selectedStateId;
  const activeCityId = propCityId !== undefined ? propCityId : selectedCityId;

  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) {
      setSelectedStateId(null);
      onStateChange(null, "");
      onCityChange(null, "");
      return;
    }

    const stateId = parseInt(val, 10);
    const matchedState = states.find((s) => s.id === stateId);
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
    const matchedCity = cities.find((c) => c.id === cityId);
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
          {isLoadingStates && (
            <span className="text-[11px] text-[#078BDE] flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading...
            </span>
          )}
        </div>

        {statesError ? (
          <div className="flex items-center gap-2 p-2.5 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="flex-1 truncate">Failed to load states</span>
            <button
              type="button"
              onClick={() => refetchStates()}
              className="p-1 hover:bg-red-100 rounded text-red-800"
              title="Retry"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="relative">
            <select
              id="registration-state"
              value={activeStateId !== null && activeStateId !== undefined ? activeStateId : ""}
              onChange={handleStateSelect}
              disabled={isLoadingStates}
              className={`w-full h-[46px] px-3.5 bg-white border ${
                errors?.state ? "border-red-500" : "border-[#E1E6ED]"
              } rounded-xl text-[14px] text-slate-800 focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              <option value="">
                {isLoadingStates
                  ? "Loading states from server..."
                  : states.length === 0
                  ? "No states returned by server"
                  : "Select State / Governorate"}
              </option>
              {states.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.nameEn || st.nameAr || `State ${st.id}`}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        )}

        {/* Empty states warning */}
        {!isLoadingStates && !statesError && states.length === 0 && (
          <p className="text-[11px] text-slate-500">
            Reference table unseeded in server database.
          </p>
        )}
        {errors?.state && (
          <p className="text-[11px] text-red-600">{errors.state}</p>
        )}
      </div>

      {/* City Field */}
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex items-center justify-between">
          <label
            htmlFor="registration-city"
            className="text-[12px] font-medium text-[#41474F] block"
          >
            City / District
          </label>
          {isLoadingCities && (
            <span className="text-[11px] text-[#078BDE] flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading...
            </span>
          )}
        </div>

        {citiesError ? (
          <div className="flex items-center gap-2 p-2.5 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="flex-1 truncate">Failed to load cities</span>
            <button
              type="button"
              onClick={() => refetchCities()}
              className="p-1 hover:bg-red-100 rounded text-red-800"
              title="Retry"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="relative">
            <select
              id="registration-city"
              value={activeCityId !== null && activeCityId !== undefined ? activeCityId : ""}
              onChange={handleCitySelect}
              disabled={isLoadingCities || activeStateId === null || activeStateId === undefined}
              className={`w-full h-[46px] px-3.5 bg-white border ${
                errors?.city ? "border-red-500" : "border-[#E1E6ED]"
              } rounded-xl text-[14px] text-slate-800 focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-colors appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              <option value="">
                {activeStateId === null || activeStateId === undefined
                  ? "Select a state first"
                  : isLoadingCities
                  ? "Loading cities..."
                  : cities.length === 0
                  ? "No cities available for this state"
                  : "Select City"}
              </option>
              {cities.map((ct) => (
                <option key={ct.id} value={ct.id}>
                  {ct.nameEn || ct.nameAr || `City ${ct.id}`}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        )}

        {errors?.city && (
          <p className="text-[11px] text-red-600">{errors.city}</p>
        )}
      </div>
    </div>
  );
}
