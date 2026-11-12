"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";
import {
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  User,
  ShieldCheck,
  LogOut,
  Users,
} from "lucide-react";

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
      ? "Dr. Mohamed"
      : userId
      ? `Dr. Practitioner (${userId})`
      : "Dr. Clinician";

  const doctorInitials =
    doctorDisplayName
      .replace(/^Dr\.\s*/i, "")
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("") || "DR";

  const isHomeActive = pathname === "/doctor";
  const isPatientsActive = pathname.startsWith("/doctor/find-patient");
  const isRequestsActive = pathname.startsWith("/doctor/access-requests");

  return (
    <header
      className="sticky top-0 z-50 bg-[#02307D] border-b border-[#03449E]/40 text-white shadow-md"
      data-node-id="353:10098"
      data-name="Header"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Centered PulseID Logo Lockup matching Figma Node 353:10121 */}
        <div className="flex items-center gap-3">
          <Link href="/doctor" className="flex items-center gap-2.5 group">
            <div className="bg-white/10 border border-white/20 rounded-[8px] size-10 flex items-center justify-center p-1 shadow-xs group-hover:bg-white/15 transition-colors">
              <Image
                src="/assets/figma/landing/pulseid-logo.svg"
                alt="PulseID Logo"
                width={26}
                height={26}
                className="w-6 h-6 brightness-0 invert"
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white font-heading">
              PULSEID
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav Pills matching Figma Node 353:10124 */}
        <nav
          className="hidden md:flex items-center bg-[rgba(192,202,227,0.1)] border border-[rgba(192,202,227,0.1)] rounded-[12px] p-[6px] gap-1"
          data-node-id="353:10124"
          data-name="Center Nav Links: Home (Active) & About"
        >
          {/* Home Tab */}
          <Link
            href="/doctor"
            className={`px-4 py-1.5 rounded-[10px] text-sm font-semibold transition-all flex items-center gap-2 ${
              isHomeActive
                ? "bg-[#078BDE] text-white shadow-xs font-bold"
                : "text-[#EAEDF6] hover:text-white hover:bg-white/5"
            }`}
          >
            {isHomeActive && (
              <span className="size-1.5 rounded-full bg-white shrink-0" />
            )}
            <span>Home</span>
          </Link>

          {/* My Patients Tab */}
          <Link
            href="/doctor/find-patient"
            className={`px-4 py-1.5 rounded-[10px] text-sm font-semibold transition-all flex items-center gap-2 ${
              isPatientsActive
                ? "bg-[#078BDE] text-white shadow-xs font-bold"
                : "text-[#EAEDF6] hover:text-white hover:bg-white/5"
            }`}
          >
            {isPatientsActive && (
              <span className="size-1.5 rounded-full bg-white shrink-0" />
            )}
            <span>My Patients</span>
          </Link>

          {/* Access Requests Tab */}
          <Link
            href="/doctor/access-requests"
            className={`px-4 py-1.5 rounded-[10px] text-sm font-semibold transition-all flex items-center gap-2 ${
              isRequestsActive
                ? "bg-[#078BDE] text-white shadow-xs font-bold"
                : "text-[#EAEDF6] hover:text-white hover:bg-white/5"
            }`}
          >
            {isRequestsActive && (
              <span className="size-1.5 rounded-full bg-white shrink-0" />
            )}
            <span>Access Requests</span>
          </Link>

          {/* Language Toggle */}
          <button
            type="button"
            className="px-3 py-1.5 rounded-[10px] text-sm font-medium text-[#EAEDF6] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Switch Language"
          >
            عربي
          </button>
        </nav>

        {/* Right Actions matching Figma Node 353:10134 */}
        <div className="flex items-center gap-3">
          {/* Search Toggle Button */}
          <Link
            href="/doctor/find-patient"
            className="size-10 rounded-[12px] bg-[rgba(234,237,246,0.1)] border border-[#D0DEFF]/30 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
            title="Find Patient"
            data-node-id="353:10136"
          >
            <Search className="w-4 h-4 text-[#EAEDF6]" />
          </Link>

          {/* Notifications Bell */}
          <button
            type="button"
            className="size-10 rounded-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#078BDE] text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer relative"
            title="Notifications"
            data-node-id="353:10137"
          >
            <Bell className="w-4 h-4 text-[#EAEDF6]" />
            <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-[#078BDE] ring-2 ring-[#02307D]" />
          </button>

          {/* User Quick Pill matching Figma Node I353:10135;285:6404 */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] hover:bg-white/10 transition-colors rounded-[12px] pl-1.5 pr-2.5 py-1.5 flex items-center gap-2 text-left cursor-pointer"
              data-node-id="I353:10135;285:6404"
            >
              <div className="size-7 rounded-[8px] bg-[#0079C3] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs font-mono">
                {doctorInitials}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#EAEDF6] max-w-[110px] truncate">
                {doctorDisplayName}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#EAEDF6]/70 transition-transform ${
                  userDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
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
                    Egyptian Medical Syndicate Verified
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    href="/doctor/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#02307D] transition-colors"
                  >
                    <User className="w-4 h-4 text-[#078BDE]" />
                    <span>My profile</span>
                  </Link>
                  <Link
                    href="/doctor/find-patient"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#02307D] transition-colors"
                  >
                    <Users className="w-4 h-4 text-[#078BDE]" />
                    <span>My Patients</span>
                  </Link>
                  <Link
                    href="/doctor/access-requests"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#02307D] transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#078BDE]" />
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
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#011B47] border-t border-white/10 px-4 pt-3 pb-6 flex flex-col gap-2">
          <Link
            href="/doctor"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              isHomeActive ? "bg-[#078BDE] text-white" : "text-[#EAEDF6] hover:bg-white/10"
            }`}
          >
            Home
          </Link>
          <Link
            href="/doctor/find-patient"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              isPatientsActive ? "bg-[#078BDE] text-white" : "text-[#EAEDF6] hover:bg-white/10"
            }`}
          >
            My Patients
          </Link>
          <Link
            href="/doctor/access-requests"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              isRequestsActive ? "bg-[#078BDE] text-white" : "text-[#EAEDF6] hover:bg-white/10"
            }`}
          >
            Access Requests
          </Link>
          <Link
            href="/doctor/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#EAEDF6] hover:bg-white/10"
          >
            Doctor Profile
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="mt-2 text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-300 hover:bg-rose-900/30 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </header>
  );
}
