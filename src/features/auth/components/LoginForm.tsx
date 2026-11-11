"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthCardShell } from "./AuthCardShell";
import { useAuth, UserRole } from "@/lib/auth/auth-context";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = (searchParams.get("role") as UserRole) || "patient";
  const justRegistered = searchParams.get("registered") === "true";
  const { login } = useAuth();

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

    try {
      const result = await login({
        userName: identifier,
        password,
        role,
      });

      setIsLoading(false);

      if (result.success) {
        // Route according to verified backend role; do not trust client query param alone
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
        <div className="pb-6 w-full">
          <h1 className="text-[28px] sm:text-[30px] font-bold leading-tight text-[#02307D] font-heading">
            Welcome Back
          </h1>
          <p className="mt-2 text-[14px] sm:text-[15px] text-[#41474F] font-normal leading-normal">
            Sign in to access your healthcare identity and stay connected.
          </p>
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
      </div>
    </AuthCardShell>
  );
}
