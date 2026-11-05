"use client";

import React, { useState, useRef, useEffect } from "react";
import { CountryItem } from "../types/auth";
import { SUPPORTED_COUNTRIES } from "../utils/countries";
import { useAuth } from "../context/AuthContext";
import { CountryFlag } from "./CountryFlag";

interface CountrySelectProps {
  selectedCountry: CountryItem;
  onSelect: (country: CountryItem) => void;
  disabled?: boolean;
}

export function CountrySelect({
  selectedCountry,
  onSelect,
  disabled = false,
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { language } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filtered = SUPPORTED_COUNTRIES.filter((c) => {
    const q = search.toLowerCase();
    const name = language === "ar" ? c.nameAr.toLowerCase() : c.name.toLowerCase();
    return (
      name.includes(q) ||
      c.dialCode.includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select Country Calling Code"
        className="h-8 px-2 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg flex items-center gap-1.5 text-xs text-slate-800 transition-all cursor-pointer disabled:opacity-50"
      >
        <CountryFlag code={selectedCountry.code} className="w-5 h-3.5" />
        <span className="font-mono text-xs font-semibold text-slate-700">
          {selectedCountry.dialCode}
        </span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 end-0 w-60 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="p-2 border-b border-slate-100">
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                language === "ar" ? "ابحث عن الدولة..." : "Search country..."
              }
              className="w-full h-8 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0080DF]"
            />
          </div>

          <div className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-xs text-slate-400 text-center">
                {language === "ar" ? "لا توجد نتائج" : "No countries found"}
              </div>
            ) : (
              filtered.map((country) => {
                const isSelected = country.code === selectedCountry.code;
                return (
                  <button
                    key={country.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelect(country);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`w-full px-3 py-2 flex items-center justify-between text-xs transition-colors cursor-pointer text-start ${
                      isSelected
                        ? "bg-[#0080DF]/10 text-[#0080DF] font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CountryFlag code={country.code} className="w-4 h-3" />
                      <span>
                        {language === "ar" ? country.nameAr : country.name}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400">
                      {country.dialCode}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
