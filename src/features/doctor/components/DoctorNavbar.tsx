"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import {
  Home,
  Search,
  ShieldCheck,
  User,
  LogOut,
  Bell,
  Menu,
  X,
  Stethoscope,
} from "lucide-react";

export function DoctorNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, userId, isDemo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/auth/login?role=doctor");
  };

  const navLinks = [
    { label: "Dashboard", href: "/doctor", icon: Home },
    { label: "Find Patient", href: "/doctor/find-patient", icon: Search },
    { label: "Access Requests", href: "/doctor/access-requests", icon: ShieldCheck },
    { label: "Doctor Profile", href: "/doctor/profile", icon: User },
  ];

  const doctorDisplayName = isDemo
    ? "Dr. Tarek Al-Husseini"
    : userId
    ? `Dr. Practitioner (${userId})`
    : "Dr. Clinician";
  const doctorInitials = isDemo ? "TH" : userId ? "DR" : "MD";
  const doctorSubtitle = isDemo
    ? "Consultant Pulmonologist"
    : userId
    ? `ID: ${userId}`
    : "Clinician";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand & Portal Badge matching Figma Node 353:10098 */}
        <div className="flex items-center gap-3">
          <Link href="/doctor" className="flex items-center gap-2.5">
            <Image
              src="/assets/pulseid-logo.svg"
              alt="PulseID Logo"
              width={120}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#02307D] border border-blue-200 text-[11px] font-bold">
            <Stethoscope className="w-3.5 h-3.5 text-[#078BDE]" />
            Doctor Portal
          </span>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/doctor"
                ? pathname === "/doctor"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-[#EAF2FF] text-[#02307D] shadow-2xs font-bold"
                    : "text-slate-600 hover:text-[#02307D] hover:bg-slate-50"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#078BDE]" : "text-slate-400"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Doctor Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#078BDE]" />
          </button>

          <Link
            href="/doctor/profile"
            className="hidden sm:flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#02307D] to-[#078BDE] text-white font-bold flex items-center justify-center text-xs shadow-xs">
              {doctorInitials}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-xs font-bold text-[#02307D] leading-tight">
                {doctorDisplayName}
              </p>
              <p className="text-[11px] text-slate-500 font-sans leading-none mt-0.5">
                {doctorSubtitle}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-700"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="p-3 bg-blue-50/70 rounded-xl mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#02307D] text-white font-bold text-xs flex items-center justify-center">
                {doctorInitials}
              </div>
              <div>
                <p className="text-xs font-bold text-[#02307D]">{doctorDisplayName}</p>
                <p className="text-[10px] text-slate-500">Cardiology Specialist</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#02307D]">
              Verified
            </span>
          </div>

          {navLinks.map((item) => {
            const isActive =
              item.href === "/doctor"
                ? pathname === "/doctor"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#EAF2FF] text-[#02307D] font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#078BDE]" : "text-slate-400"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100 mt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
