"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

export function DoctorNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, userId, isDemo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.replace("/auth/login?role=doctor");
  };

  const activeDocAccount = isDemo && typeof window !== "undefined" ? DemoService.getActiveAccount() : null;
  const isDoctorRole = activeDocAccount?.role === "doctor";
  const doctorDisplayName =
    isDemo && isDoctorRole && activeDocAccount?.fullName
      ? activeDocAccount.fullName
      : isDemo
      ? "Ahmed H."
      : userId
      ? `Dr. Practitioner (${userId})`
      : "Ahmed H.";

  const doctorInitials =
    doctorDisplayName
      .replace(/^Dr\.\s*/i, "")
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("") || "AH";

  const isHomeActive = pathname === "/doctor";
  const isPatientsActive = pathname.startsWith("/doctor/find-patient");
  const isRequestsActive = pathname.startsWith("/doctor/access-requests");

  return (
    <header
      className="sticky top-0 z-50 w-full bg-[#02307d] shadow-[0px_4px_20px_rgba(0,0,0,0.15)]"
      data-node-id="353:10098"
      data-name="Header"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-[80px] flex items-center justify-between">
        {/* Left: PULSEID Logo Lockup matching Figma Node 353:10101 */}
        <div className="flex gap-[12px] items-center justify-center shrink-0" data-node-id="353:10101">
          <Link href="/doctor" className="flex items-center gap-[12px] group">
            <div className="h-[30px] w-[32px] relative shrink-0">
              <Image
                src="/assets/doctor/imgFrame1171276973.svg"
                alt="PULSEID Logo Mark"
                width={32}
                height={30}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="font-['Inter'] font-bold text-[18px] text-white tracking-[0.9px] leading-[18px]">
              PULSEID
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav Pills matching Figma Node 353:10124 */}
        <nav
          className="hidden md:flex bg-[rgba(192,202,227,0.1)] border border-[rgba(192,202,227,0.1)] rounded-[12px] p-[7px] gap-[4px] items-center"
          data-node-id="353:10124"
          data-name="Center Nav Links: Home (Active) & About"
        >
          {/* Home Link */}
          <Link
            href="/doctor"
            className={`rounded-[12px] px-[20px] py-[8px] flex items-center gap-[6px] transition-all text-[14px] leading-normal ${
              isHomeActive
                ? "bg-[#078bde] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-white font-normal"
                : "text-[#eaedf6] hover:text-white hover:bg-white/5 font-normal"
            }`}
            data-node-id="353:10125"
          >
            {isHomeActive && (
              <span className="size-[6px] rounded-[12px] bg-white shrink-0" data-node-id="353:10126" />
            )}
            <span>Home</span>
          </Link>

          {/* My Patients Link */}
          <Link
            href="/doctor/find-patient"
            className={`rounded-[12px] px-[20px] py-[8px] flex items-center gap-[6px] transition-all text-[14px] leading-normal ${
              isPatientsActive
                ? "bg-[#078bde] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-white font-normal"
                : "text-[#eaedf6] hover:text-white hover:bg-white/5 font-normal"
            }`}
            data-node-id="353:10128"
          >
            {isPatientsActive && (
              <span className="size-[6px] rounded-[12px] bg-white shrink-0" />
            )}
            <span>My Patients</span>
          </Link>

          {/* Access Requests Link */}
          <Link
            href="/doctor/access-requests"
            className={`rounded-[12px] px-[20px] py-[8px] flex items-center gap-[6px] transition-all text-[14px] leading-normal ${
              isRequestsActive
                ? "bg-[#078bde] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-white font-normal"
                : "text-[#eaedf6] hover:text-white hover:bg-white/5 font-normal"
            }`}
            data-node-id="353:10130"
          >
            {isRequestsActive && (
              <span className="size-[6px] rounded-[12px] bg-white shrink-0" />
            )}
            <span>Access Requests</span>
          </Link>

          {/* Language Toggle Link */}
          <button
            type="button"
            className="rounded-[12px] px-[20px] py-[8px] text-[#eaedf6] hover:text-white hover:bg-white/5 text-[14px] text-center w-[40px] transition-colors cursor-pointer"
            data-node-id="353:10132"
          >
            عربي
          </button>
        </nav>

        {/* Right Actions: User Quick Pill & Buttons matching Figma Node 353:10134 */}
        <div
          className="flex gap-[12px] items-center relative"
          data-node-id="353:10134"
          data-name="Right Actions: Secondary 'Log In' & Primary 'Create Account"
        >
          {/* User Quick Pill with Dropdown matching Figma Node I353:10135;285:6404 */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[12px] pl-[5px] pr-[9px] pt-[7px] pb-[5px] flex items-center gap-[12px] sm:gap-[30px] hover:bg-white/10 transition-colors cursor-pointer"
              data-node-id="I353:10135;285:6404"
              data-name="User Quick Pill"
            >
              <div
                className="size-[28px] rounded-[12px] bg-[#0079c3] flex items-center justify-center shrink-0"
                data-node-id="I353:10135;285:6405"
              >
                <span className="font-['Space_Grotesk'] font-bold text-[12px] text-white leading-[16px]">
                  {doctorInitials}
                </span>
              </div>

              <span className="font-['Inter'] font-medium text-[13px] text-white leading-[16px] truncate max-w-[100px]">
                {doctorDisplayName}
              </span>

              <div className="h-[4.317px] w-[7px] relative shrink-0">
                <Image
                  src="/assets/doctor/imgContainer3.svg"
                  alt="Dropdown"
                  width={7}
                  height={4}
                  className="w-full h-full object-contain"
                />
              </div>
            </button>

            {/* User Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-slate-900 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Clinician Profile
                  </p>
                  <p className="text-sm font-bold text-[#02307D] truncate mt-0.5">
                    {doctorDisplayName}
                  </p>
                  <p className="text-[11px] text-[#078BDE] font-medium">
                    Egyptian Medical Syndicate
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    href="/doctor/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#02307D] transition-colors"
                  >
                    <span>My profile</span>
                  </Link>
                  <Link
                    href="/doctor/find-patient"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#02307D] transition-colors"
                  >
                    <span>My Patients</span>
                  </Link>
                  <Link
                    href="/doctor/access-requests"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#02307D] transition-colors"
                  >
                    <span>Access Requests</span>
                  </Link>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Button matching Figma Node 353:10136 */}
          <Link
            href="/doctor/find-patient"
            className="size-[40px] rounded-[12px] bg-[#eaedf6] border border-[#d0deff] flex items-center justify-center p-px hover:bg-white transition-colors cursor-pointer shrink-0"
            data-node-id="353:10136"
            data-name="Button - Toggle navigation drawer"
            title="Search"
          >
            <div className="size-[24px] relative shrink-0">
              <Image
                src="/assets/doctor/imgBasilSearchOutline.svg"
                alt="Search"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Notifications Button matching Figma Node 353:10137 */}
          <button
            type="button"
            className="size-[40px] rounded-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#078bde] flex items-center justify-center p-[0.5px] hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            data-node-id="353:10137"
            data-name="Button - Toggle navigation drawer"
            title="Notifications"
          >
            <div className="size-[24px] relative shrink-0">
              <Image
                src="/assets/doctor/imgIcOutlineNotifications.svg"
                alt="Notifications"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
          </button>

          {/* Mobile hamburger menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#011B47] border-t border-white/10 px-4 pt-3 pb-6 flex flex-col gap-2">
          <Link
            href="/doctor"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              isHomeActive ? "bg-[#078bde] text-white" : "text-[#eaedf6] hover:bg-white/10"
            }`}
          >
            Home
          </Link>
          <Link
            href="/doctor/find-patient"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              isPatientsActive ? "bg-[#078bde] text-white" : "text-[#eaedf6] hover:bg-white/10"
            }`}
          >
            My Patients
          </Link>
          <Link
            href="/doctor/access-requests"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              isRequestsActive ? "bg-[#078bde] text-white" : "text-[#eaedf6] hover:bg-white/10"
            }`}
          >
            Access Requests
          </Link>
          <Link
            href="/doctor/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#eaedf6] hover:bg-white/10"
          >
            Doctor Profile
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="mt-2 text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-300 hover:bg-rose-900/30"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
}
