"use client";

import React from "react";
import { CountryItem } from "../types/auth";
import { CountrySelect } from "./CountrySelect";

interface PhoneInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  value: string;
  selectedCountry: CountryItem;
  onChangePhone: (phone: string) => void;
  onSelectCountry: (country: CountryItem) => void;
  disabled?: boolean;
  isRequired?: boolean;
  id?: string;
  placeholder?: string;
}

export function PhoneInput({
  label,
  error,
  helperText,
  value,
  selectedCountry,
  onChangePhone,
  onSelectCountry,
  disabled = false,
  isRequired = true,
  id = "phone-input",
  placeholder,
}: PhoneInputProps) {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const cleaned = raw.replace(/[^\d\s\-]/g, "");
    onChangePhone(cleaned);
  };

  return (
    <div className="w-full text-start">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-slate-700 mb-1.5"
        >
          {label}
          {isRequired && <span className="text-[#0080DF] ms-1">*</span>}
        </label>
      )}

      <div
        className={`relative flex items-center bg-[#F8FAFC] border rounded-xl transition-all duration-200 px-3.5 h-12 ${
          error
            ? "border-red-400 ring-2 ring-red-400/10"
            : "border-slate-200 hover:border-slate-300 focus-within:border-[#0080DF] focus-within:ring-2 focus-within:ring-[#0080DF]/20"
        } ${disabled ? "opacity-60 cursor-not-allowed bg-slate-100" : ""}`}
      >
        {/* Phone icon */}
        <div className="text-slate-400 shrink-0 me-2.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect
              x="5"
              y="2"
              width="14"
              height="20"
              rx="2"
              ry="2"
              strokeWidth="2"
            />
            <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
          </svg>
        </div>

        {/* Input */}
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          disabled={disabled}
          value={value}
          onChange={handlePhoneChange}
          placeholder={placeholder || selectedCountry.placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className="flex-1 min-w-0 w-0 bg-transparent text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm outline-none font-medium"
        />

        {/* Country Picker embedded pill */}
        <div className="ms-2 shrink-0">
          <CountrySelect
            selectedCountry={selectedCountry}
            onSelect={onSelectCountry}
            disabled={disabled}
          />
        </div>
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={helperId} className="mt-1.5 text-xs text-slate-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
