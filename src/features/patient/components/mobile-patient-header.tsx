"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import {
  Menu,
  X,
  Bell,
  Search,
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
  const { logout, userId } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const displayName =
    patientName || (userId ? `Patient (${userId})` : "Patient Account");
  const displayBloodType = bloodType || "O+ (Positive)";
  const initials =
    displayName
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("") || "PT";

  const handleLogout = () => {
    logout();
    router.replace("/auth/login?role=patient");
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
      <header className="block lg:hidden w-full bg-[#02307D] text-white pt-3 pb-3 px-4 shadow-md sticky top-0 z-30">
        {/* Top Branding & Quick Actions Row matching Figma Node 364:4446 */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <Link href="/patient" className="flex items-center gap-2">
            <Image
              src="/assets/pulseid-logo.svg"
              alt="PulseID Logo"
              width={100}
              height={26}
              className="h-6 w-auto brightness-0 invert"
              priority
            />
            <span className="text-[10px] font-bold tracking-widest uppercase bg-white/15 px-1.5 py-0.5 rounded text-sky-200">
              Patient
            </span>
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/90 relative transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#078BDE]" />
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Greeting & Search Row */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <Link
            href="/patient/profile"
            className="flex items-center gap-2.5 min-w-0 group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#078BDE] to-[#0079C3] border border-white/30 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-300 font-normal leading-none">Welcome,</p>
              <h2 className="text-sm font-bold text-white truncate leading-tight mt-0.5 font-heading">
                {displayName}
              </h2>
            </div>
          </Link>

          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/15 text-sky-200 shrink-0">
            {displayBloodType}
          </span>
        </div>

        {/* Search Bar matching Figma Node 364:4445 */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medical records, tests, allergies..."
            className="w-full h-9 pl-9 pr-3 bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-slate-300 text-xs rounded-lg border border-white/15 focus:border-[#078BDE] focus:outline-none focus:ring-1 focus:ring-[#078BDE] transition-all font-sans"
          />
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
        </div>
      </header>

      {/* Slide-over Drawer matching Figma Node 365:1747 ("drob on home") */}
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
                <div className="w-10 h-10 rounded-full bg-[#078BDE] text-white font-bold flex items-center justify-center text-sm">
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

            {/* Quick Health Summary Vitals matching Node 365:1747 */}
            <div className="p-4 bg-[#F8FAFC] border-b border-slate-200">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Patient Vitals Snapshot
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>Blood Type</span>
                  </div>
                  <span className="font-bold text-[#02307D]">{displayBloodType}</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#078BDE]" />
                    <span>DOB</span>
                  </div>
                  <span className="font-bold text-[#02307D]">14 Sep 1988</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-1 flex-1">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
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
                <span>Language</span>
                <span className="font-semibold text-slate-700">English (US)</span>
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
