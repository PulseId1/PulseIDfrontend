"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { AuthRole } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthCardShell } from "./AuthCardShell";

interface RoleOption {
  readonly id: AuthRole;
  readonly icon: React.ReactNode;
}

const ROLES: RoleOption[] = [
  {
    id: "patient",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    id: "doctor",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    id: "pharmacist",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
];

export function RoleSelector() {
  const router = useRouter();
  const { role, setRole, language, t } = useAuth();

  const handleContinue = () => {
    router.push(`/auth/login?role=${role}&lang=${language}`);
  };

  return (
    <AuthCardShell heroImage="/auth/hero-login.jpg" heroAlt="PulseID Clinical Healthcare">
      <div className="w-full space-y-5 text-start min-w-0">
        {/* Header Text */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002D62] tracking-tight">
            {language === "ar" ? "مرحبًا بك في " : "Welcome to "}
            <span className="text-[#0080DF]">Pulse ID</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {t.roleSelection.subtitle}
          </p>
        </div>

        {/* Role Cards */}
        <div
          role="radiogroup"
          aria-label="Account Type Selection"
          className="space-y-2.5"
        >
          {ROLES.map((roleOption) => {
            const isSelected = role === roleOption.id;
            const roleData = t.roleSelection.roles[roleOption.id];

            return (
              <motion.div
                key={roleOption.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.15 }}
                onClick={() => setRole(roleOption.id)}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    setRole(roleOption.id);
                  }
                }}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer outline-none min-w-0 ${
                  isSelected
                    ? "bg-[#F0F9FF] border-[#0080DF] shadow-sm ring-1 ring-[#0080DF]/30"
                    : "bg-[#F8FAFC] border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                      isSelected
                        ? "bg-[#0080DF] text-white border-[#0080DF]"
                        : "bg-white border-slate-200 text-slate-500"
                    }`}
                  >
                    {roleOption.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 mb-0.5">
                      <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                        <span className="text-sm font-bold text-slate-900">
                          {roleData.title}
                        </span>
                        <Badge
                          variant={isSelected ? "blue" : "slate"}
                          size="sm"
                          className="text-[10px] truncate max-w-[140px] sm:max-w-none"
                        >
                          {roleData.headline}
                        </Badge>
                      </div>

                      {/* Radio Circle */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                          isSelected
                            ? "bg-[#0080DF] border-[#0080DF] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 stroke-[3]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {roleData.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Primary CTA Button */}
        <div className="space-y-3 pt-1">
          <Button
            variant="primary"
            size="lg"
            className="w-full h-12 text-sm"
            onClick={handleContinue}
            rightIcon={
              <span className={language === "ar" ? "rotate-180" : ""}>→</span>
            }
          >
            {language === "ar" ? "التالي" : "Next"}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-slate-500">
            <span>{t.roleSelection.alreadyHaveAccount}</span>
            <button
              type="button"
              onClick={handleContinue}
              className="text-[#0080DF] font-semibold hover:underline cursor-pointer"
            >
              {language === "ar" ? "تسجيل الدخول" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </AuthCardShell>
  );
}
