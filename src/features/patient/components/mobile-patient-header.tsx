"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";
import {
  X,
  Home,
  FileText,
  Activity,
  ShieldCheck,
  User,
  LogOut,
  ChevronRight,
  Heart,
  Calendar,
} from "lucide-react";

interface MobilePatientHeaderProps {
  readonly patientName?: string;
  readonly bloodType?: string;
}

export function MobilePatientHeader({
  patientName,
  bloodType,
}: MobilePatientHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, userId, isDemo } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeDemoAccount = isDemo && typeof window !== "undefined" ? DemoService.getActiveAccount() : null;
  const displayName =
    patientName ||
    (isDemo && activeDemoAccount?.fullName
      ? activeDemoAccount.fullName
      : isDemo
      ? "Ahmed Hassan"
      : userId
      ? `Patient (${userId})`
      : "Patient Account");
  const displayBloodType =
    bloodType ||
    (activeDemoAccount?.bloodType
      ? `${activeDemoAccount.bloodType} (Positive)`
      : "O+ (Positive)");
  const initials =
    displayName
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("") || "AH";

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  const navLinks = [
    { label: "Dashboard", href: "/patient", icon: Home },
    { label: "Medical Records", href: "/patient/records", icon: FileText },
    { label: "Health Information", href: "/patient/medical-info", icon: Activity },
    { label: "Access Requests", href: "/patient/access-requests", icon: ShieldCheck },
    { label: "My Profile & Digital ID", href: "/patient/profile", icon: User },
  ];

  return (
    <>
      {/* 
        Exact MobileHeader matching Figma Node 364:4446:
        390px x 69px, #02307D background
      */}
      <header
        className="block lg:hidden w-full bg-[#02307D] text-white h-[69px] px-4 shadow-md sticky top-0 z-30"
        data-node-id="364:4446"
        data-name="MobileHeader"
      >
        <div className="flex items-center justify-between h-full w-full max-w-[390px] mx-auto">
          {/* Left Brand Container matching Figma 364:4447 */}
          <Link href="/patient" className="flex items-center gap-2.5">
            <div className="size-[30px] relative shrink-0">
              <Image
                src="/favicon.svg"
                alt="PulseID Logo Mark"
                width={30}
                height={28}
                className="object-contain size-full"
                priority
              />
            </div>
            <span className="font-sans font-bold text-[18px] text-white tracking-[0.9px] uppercase">
              PULSE ID
            </span>
          </Link>

          {/* Right Header Actions matching Figma 364:4470 */}
          <div className="flex items-center gap-2" data-node-id="364:4470">
            {/* Search Button matching Figma 364:4472 */}
            <Link
              href="/patient/records"
              className="size-[40px] rounded-[12px] bg-[#EAEDF6] border border-[#d0deff] flex items-center justify-center text-[#02307D] hover:bg-white transition-colors"
              aria-label="Search Medical Records"
              data-node-id="364:4472"
            >
              <div className="size-[20px] relative">
                <Image
                  src="/assets/doctor/imgBasilSearchOutline.svg"
                  alt="Search"
                  width={20}
                  height={20}
                  className="object-contain size-full"
                />
              </div>
            </Link>

            {/* Notifications Button matching Figma 364:4473 */}
            <button
              type="button"
              className="size-[40px] rounded-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#078bde] flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Notifications"
              data-node-id="364:4473"
            >
              <div className="size-[20px] relative">
                <Image
                  src="/assets/doctor/imgIcOutlineNotifications.svg"
                  alt="Notifications"
                  width={20}
                  height={20}
                  className="object-contain size-full"
                />
              </div>
            </button>

            {/* Hamburger Button matching Figma 364:4474 */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="size-[40px] rounded-[12px] bg-white/10 hover:bg-white/20 flex flex-col items-center justify-center gap-[5px] transition-colors cursor-pointer"
              aria-label="Toggle navigation drawer"
              data-node-id="364:4474"
            >
              <span className="w-5 h-[2px] bg-white rounded-full block" />
              <span className="w-5 h-[2px] bg-white rounded-full block" />
              <span className="w-5 h-[2px] bg-white rounded-full block" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Navigation Drawer */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity lg:hidden"
        >
          {/* Backdrop Click */}
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close menu backdrop"
            onClick={() => setDrawerOpen(false)}
          />

          <aside className="relative w-[320px] max-w-[85vw] h-full bg-white text-slate-900 shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 bg-[#02307D] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#078BDE] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  {initials}
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight text-white">{displayName}</h3>
                  <p className="text-xs text-sky-200">Authenticated Citizen Identity</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Health Summary Vitals */}
            <div className="p-4 bg-[#F8FAFC] border-b border-slate-200">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-sans">
                Patient Vitals Snapshot
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>Blood Type</span>
                  </div>
                  <span className="font-bold text-[#02307D]">{displayBloodType}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#078BDE]" />
                    <span>DOB</span>
                  </div>
                  <span className="font-bold text-[#02307D]">14 Sep 1988</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-1.5 flex-1">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-sans">
                Navigation
              </p>
              {navLinks.map((item) => {
                const isActive =
                  item.href === "/patient"
                    ? pathname === "/patient"
                    : pathname.startsWith(item.href);
                const IconComp = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-[#02307D] font-bold"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComp
                        className={`w-5 h-5 ${
                          isActive ? "text-[#078BDE]" : "text-slate-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer with Logout */}
            <div className="p-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>EHR ID</span>
                <span className="font-mono font-semibold text-slate-700">PID-8924-EGY</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 px-3 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 flex items-center justify-center gap-2 text-sm font-semibold transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
