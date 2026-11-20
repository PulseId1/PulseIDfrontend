"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthCardShell } from "./AuthCardShell";
import { useAuth, UserRole } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";
import { User, Stethoscope, Sparkles, Pill } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = (searchParams.get("role") as UserRole) || "patient";
  const justRegistered = searchParams.get("registered") === "true";
  const { login, loginDemo } = useAuth();

  const [authTarget, setAuthTarget] = useState<"demo" | "live">("demo");
  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState(() => searchParams.get("phone") || "");
  const [email, setEmail] = useState(() => searchParams.get("email") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = activeTab === "phone" ? phone.trim() : email.trim();

    if (!identifier) {
      setError(
        activeTab === "phone"
          ? "Please enter your phone number."
          : "Please enter your email address."
      );
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    if (authTarget === "demo") {
      // Offline Demo Sandbox credentials verification
      setTimeout(() => {
        setIsLoading(false);
        const result = DemoService.authenticateDemo(identifier, password);
        if (result.success && result.account) {
          loginDemo(result.account.role as "patient" | "doctor" | "pharmacist", result.account);
          if (result.account.role === "doctor") {
            router.push("/doctor");
          } else if (result.account.role === "pharmacist") {
            router.push("/pharmacist");
          } else {
            router.push("/patient");
          }
        } else {
          setError(result.error || "Authentication failed in demo environment.");
        }
      }, 300);
      return;
    }

    // Live Cloud Run API
    try {
      const result = await login({
        userName: identifier,
        password,
        role,
      });

      setIsLoading(false);

      if (result.success) {
        if (result.role === "doctor") {
          router.push("/doctor");
        } else if (result.role === "pharmacist") {
          router.push("/pharmacist");
        } else {
          router.push("/patient");
        }
      } else {
        setError(result.error || "Invalid username or password.");
      }
    } catch (err) {
      setIsLoading(false);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred during login."
      );
    }
  };

  return (
    <AuthCardShell heroImage="/assets/auth/auth-login-hero.png">
      <div className="w-full flex flex-col items-start min-w-0" data-node-id="116:960">
        {/* Header Block matching Figma node 116:962 */}
        <div className="pb-4 w-full">
          <h1 className="text-[28px] sm:text-[30px] font-bold leading-tight text-[#02307D] font-heading">
            Welcome Back
          </h1>
          <p className="mt-2 text-[14px] sm:text-[15px] text-[#41474F] font-normal leading-normal">
            Sign in to access your healthcare identity and stay connected.
          </p>
        </div>

        {/* Environment Target Toggle */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 w-full mb-5">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Environment:
          </span>
          <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setAuthTarget("demo");
                setError(null);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                authTarget === "demo"
                  ? "bg-[#078BDE] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Demo Sandbox
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthTarget("live");
                setError(null);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                authTarget === "live"
                  ? "bg-[#02307D] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Live Cloud Run API
            </button>
          </div>
        </div>

        {/* Just registered confirmation notification */}
        {justRegistered && (
          <div className="w-full mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in">
            <span className="text-base text-emerald-600 font-bold">✓</span>
            <div>
              <span className="font-semibold">Account created successfully!</span>{" "}
              Please enter your password to sign in.
            </div>
          </div>
        )}

        {/* Tab Toggle: Phone Number / Email Address matching Figma node 116:968 */}
        <div className="border border-[#D0DEFF] rounded-[10px] p-[3px] flex items-center justify-between w-full mb-6 bg-white">
          <button
            type="button"
            onClick={() => {
              setActiveTab("phone");
              setError(null);
            }}
            className={`flex-1 h-[48px] rounded-[8px] flex items-center justify-center gap-2.5 transition-all cursor-pointer font-medium text-[14px] sm:text-[15px] ${
              activeTab === "phone"
                ? "bg-[rgba(142,191,222,0.2)] border border-[#078BDE] text-[#078BDE] shadow-sm font-semibold"
                : "text-[#727272] hover:text-[#078BDE] border border-transparent"
            }`}
          >
            <div className="w-5 h-5 relative">
              <Image
                src="/assets/auth/icon-phone.svg"
                alt=""
                width={20}
                height={20}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
            <span>Phone Number</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("email");
              setError(null);
            }}
            className={`flex-1 h-[48px] rounded-[8px] flex items-center justify-center gap-2.5 transition-all cursor-pointer font-medium text-[14px] sm:text-[15px] ${
              activeTab === "email"
                ? "bg-[rgba(142,191,222,0.2)] border border-[#078BDE] text-[#078BDE] shadow-sm font-semibold"
                : "text-[#727272] hover:text-[#078BDE] border border-transparent"
            }`}
          >
            <div className="w-5 h-5 relative">
              <Image
                src="/assets/auth/icon-email.svg"
                alt=""
                width={20}
                height={20}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
            <span>Email Address</span>
          </button>
        </div>

        {/* Form matching Figma node 116:982 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          {/* Active Tab Input: Phone OR Email */}
          {activeTab === "phone" ? (
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-[12px] font-medium text-[#41474F]">Phone Number</label>
              <div className="bg-[#C0CAE3]/10 border border-[#DDE7FF] rounded-[8px] h-[56px] relative flex items-center overflow-hidden focus-within:border-[#078BDE] transition-colors w-full">
                <div className="pl-4 pr-3 flex items-center justify-center shrink-0">
                  <div className="w-6 h-6 relative">
                    <Image
                      src="/assets/auth/icon-phone.svg"
                      alt=""
                      width={24}
                      height={24}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="01000000100000"
                  className="flex-1 bg-transparent border-none outline-none text-[15px] text-[#040A17] placeholder:text-[#8B8B8B] font-normal min-w-0"
                />

                <div className="border-l border-[#D0DEFF] h-full px-3.5 flex items-center justify-center gap-1.5 shrink-0">
                  <div className="w-6 h-6 relative shrink-0">
                    <Image
                      src="/assets/auth/flag-egypt.svg"
                      alt="Egypt flag"
                      width={24}
                      height={24}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[12px] font-medium text-[#040A17] font-sans">
                    +20
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-[12px] font-medium text-[#41474F]">Email Address</label>
              <div className="bg-[#C0CAE3]/10 border border-[#DDE7FF] rounded-[8px] h-[56px] relative flex items-center px-4 focus-within:border-[#078BDE] transition-colors w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="ahmed@gmail.com"
                  className="flex-1 bg-transparent border-none outline-none text-[15px] text-[#040A17] placeholder:text-[#8B8B8B] font-normal min-w-0 pr-2"
                />
                <div className="w-6 h-6 relative shrink-0 opacity-70">
                  <Image
                    src="/assets/auth/icon-email.svg"
                    alt=""
                    width={24}
                    height={24}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Password Input matching Figma node 116:1005 */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[12px] font-medium text-[#41474F]">Password</label>
            <div className="bg-[#C0CAE3]/10 border border-[#DDE7FF] rounded-[8px] h-[56px] relative flex items-center px-4 focus-within:border-[#078BDE] transition-colors w-full">
              <div className="pr-3 flex items-center justify-center shrink-0">
                <div className="w-5 h-5 relative opacity-70">
                  <Image
                    src="/assets/auth/icon-lock.svg"
                    alt=""
                    width={20}
                    height={20}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="*** *** **"
                className="flex-1 bg-transparent border-none outline-none text-[15px] text-[#040A17] placeholder:text-[#8B8B8B] font-normal min-w-0 pr-2"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="w-6 h-6 relative shrink-0 opacity-70 hover:opacity-100 cursor-pointer"
              >
                <Image
                  src="/assets/auth/icon-eye-closed.svg"
                  alt="toggle password"
                  width={24}
                  height={24}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-500 font-medium -mt-1">{error}</p>
          )}

          {/* Next / Sign In Button matching Figma node 116:1017 */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-[56px] rounded-[12px] bg-[#078BDE] hover:bg-[#0070B8] active:scale-[0.99] text-white font-medium text-[14px] flex items-center justify-center gap-2 cursor-pointer transition-all w-full shadow-sm disabled:opacity-70"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>Next</span>
                <div className="w-[18px] h-[18px] relative rotate-90">
                  <Image
                    src="/assets/auth/icon-arrow-next.svg"
                    alt=""
                    width={18}
                    height={18}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
              </>
            )}
          </button>
        </form>

        {/* Bottom Link matching Figma node 116:1021 */}
        <div className="pt-8 w-full">
          <p className="text-[14px] text-[#41474F] text-center">
            Don’t have an account?{" "}
            <Link
              href="/auth/role"
              className="font-bold text-[#078BDE] hover:text-[#0060A8] transition-colors ml-1"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Option B: Explore Demo Mode */}
        <div className="w-full mt-8 pt-6 border-t border-[#DDE7FF] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Explore in Demo Mode
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Zero backend dependencies</span>
          </div>

          <p className="text-[13px] text-[#41474F] leading-relaxed">
            Demonstrate the verified Figma Patient, Doctor, and Pharmacist experiences using isolated offline healthcare fixtures. No backend authentication required.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1 w-full">
            {/* Option 1: Demo Patient Card */}
            <button
              type="button"
              onClick={() => {
                loginDemo("patient");
                router.push("/patient");
              }}
              className="p-3.5 rounded-xl border border-[#D0DEFF] bg-[#F8FAFF] hover:bg-[#EFF5FF] hover:border-[#078BDE] text-left transition-all cursor-pointer group flex flex-col justify-between gap-3 shadow-2xs hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-[#02307D]">
                    Patient Portal
                  </span>
                  <User className="w-4 h-4 text-[#078BDE] group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-sm font-bold text-[#02307D] font-heading">
                  Ahmed Hassan
                </h3>
                <p className="text-[11px] text-[#41474F] mt-1 leading-snug">
                  Mild Hypertension, health rewards, lab records, emergency contacts.
                </p>
              </div>
              <div className="text-[12px] font-bold text-[#078BDE] flex items-center gap-1 mt-1 group-hover:translate-x-0.5 transition-transform">
                <span>Launch Patient Demo →</span>
              </div>
            </button>

            {/* Option 2: Demo Doctor Card */}
            <button
              type="button"
              onClick={() => {
                loginDemo("doctor");
                router.push("/doctor");
              }}
              className="p-3.5 rounded-xl border border-[#D0DEFF] bg-[#F8FAFF] hover:bg-[#EFF5FF] hover:border-[#078BDE] text-left transition-all cursor-pointer group flex flex-col justify-between gap-3 shadow-2xs hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-[#02307D]">
                    Doctor Portal
                  </span>
                  <Stethoscope className="w-4 h-4 text-[#078BDE] group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-sm font-bold text-[#02307D] font-heading">
                  Dr. Tarek Al-Husseini
                </h3>
                <p className="text-[11px] text-[#41474F] mt-1 leading-snug">
                  Pulmonology consultant, 6 scheduled consultations, directory search, permissions.
                </p>
              </div>
              <div className="text-[12px] font-bold text-[#078BDE] flex items-center gap-1 mt-1 group-hover:translate-x-0.5 transition-transform">
                <span>Launch Doctor Demo →</span>
              </div>
            </button>

            {/* Option 3: Demo Pharmacist Card */}
            <button
              type="button"
              onClick={() => {
                loginDemo("pharmacist");
                router.push("/pharmacist");
              }}
              className="p-3.5 rounded-xl border border-[#D0DEFF] bg-[#F8FAFF] hover:bg-[#EFF5FF] hover:border-[#078BDE] text-left transition-all cursor-pointer group flex flex-col justify-between gap-3 shadow-2xs hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                    Pharmacist Hub
                  </span>
                  <Pill className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-sm font-bold text-[#02307D] font-heading">
                  Pharmacist Mohamed Ali
                </h3>
                <p className="text-[11px] text-[#41474F] mt-1 leading-snug">
                  Prescription verification, safety review, drug interactions, OTC dispensing.
                </p>
              </div>
              <div className="text-[12px] font-bold text-emerald-600 flex items-center gap-1 mt-1 group-hover:translate-x-0.5 transition-transform">
                <span>Launch Pharmacist Demo →</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </AuthCardShell>
  );
}
