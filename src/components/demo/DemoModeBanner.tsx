"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";
import { ArrowRightLeft, RotateCcw, LogOut, ChevronDown, ChevronUp } from "lucide-react";

export function DemoModeBanner() {
  const router = useRouter();
  const { isDemo, userRole, loginDemo, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);

  if (!isDemo) return null;

  const roleLabel = userRole === "doctor" ? "Doctor Experience" : "Patient Experience";
  const userLabel = userRole === "doctor" ? "Dr. Tarek Al-Husseini" : "Sara Mahmoud Ibrahim";

  const handleSwitchRole = () => {
    if (userRole === "doctor") {
      loginDemo("patient");
      router.push("/patient");
    } else {
      loginDemo("doctor");
      router.push("/doctor");
    }
  };

  const handleResetData = () => {
    DemoService.resetDemoData();
    setResetMessage(true);
    setTimeout(() => {
      setResetMessage(false);
      window.location.reload();
    }, 800);
  };

  const handleExitDemo = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <aside 
      aria-label="Demo Mode Control Panel"
      className="sticky top-0 z-[100] w-full bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-white shadow-md border-b border-amber-400/40 text-xs sm:text-sm font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Left Side: Status pill & identity */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold tracking-wider text-[11px] uppercase border border-white/30 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            Demo Mode
          </span>
          <span className="truncate text-white/95 font-medium">
            <span className="hidden sm:inline">Active Role: </span>
            <strong className="text-white font-semibold">{roleLabel}</strong> ({userLabel})
          </span>
        </div>

        {/* Mobile Expand Toggle */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="sm:hidden p-1 text-white hover:bg-white/10 rounded"
          aria-label="Toggle demo options"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Right Side: Interactive Demo Actions (Desktop & Expanded Mobile) */}
        <div
          className={`${
            isExpanded ? "flex" : "hidden"
          } sm:flex w-full sm:w-auto items-center justify-end gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-white/20`}
        >
          {resetMessage ? (
            <span className="text-xs text-white bg-black/20 px-3 py-1 rounded-md font-medium animate-in fade-in">
              ✓ Demo data restored to original fixtures
            </span>
          ) : (
            <>
              {/* Switch Role Button */}
              <button
                type="button"
                onClick={handleSwitchRole}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/15 hover:bg-white/25 text-white transition-colors border border-white/25 font-medium text-xs cursor-pointer"
                title={`Switch to ${userRole === "doctor" ? "Patient" : "Doctor"} Demo`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Switch to {userRole === "doctor" ? "Patient" : "Doctor"}</span>
              </button>

              {/* Reset Demo Data Button */}
              <button
                type="button"
                onClick={handleResetData}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/15 hover:bg-white/25 text-white transition-colors border border-white/25 font-medium text-xs cursor-pointer"
                title="Reset local changes back to clean demo fixtures"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Reset Data</span>
              </button>

              {/* Exit Demo Button */}
              <button
                type="button"
                onClick={handleExitDemo}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/25 hover:bg-black/40 text-white transition-colors border border-white/30 font-medium text-xs cursor-pointer"
                title="Exit Demo Mode and return to real login screen"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit Demo</span>
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
