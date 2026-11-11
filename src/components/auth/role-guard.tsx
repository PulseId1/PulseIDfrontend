"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole, getDashboardPathForRole } from "@/lib/auth/auth-context";
import { DemoModeBanner } from "@/components/demo/DemoModeBanner";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const { isAuthenticated, userRole, isLoading, status } = useAuth();

  useEffect(() => {
    if (isLoading || status === "initializing") return;

    // 1. Unauthenticated users cannot access protected dashboards
    if (!isAuthenticated) {
      router.replace("/auth/login");
      return;
    }

    // 2. Role-specific protection: redirect if user role does not match allowed roles
    if (userRole && !allowedRoles.includes(userRole)) {
      const targetDashboard = getDashboardPathForRole(userRole);
      router.replace(targetDashboard);
    }
  }, [isAuthenticated, userRole, isLoading, status, allowedRoles, router]);

  // Loading state matching PulseID UI system
  if (isLoading || status === "initializing") {
    return (
      <div className="min-h-screen bg-[#FBFEFF] flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-[#078BDE]/20 border-t-[#078BDE] rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-[#41474F] font-sans">
          Verifying healthcare credentials...
        </p>
      </div>
    );
  }

  // If unauthenticated or role mismatch while redirect is in flight
  if (!isAuthenticated || (userRole && !allowedRoles.includes(userRole))) {
    return (
      <div className="min-h-screen bg-[#FBFEFF] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
            !
          </div>
          <h2 className="text-lg font-bold text-[#02307D] mb-1 font-heading">
            Access Authorization
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Redirecting to your authorized healthcare portal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DemoModeBanner />
      {children}
    </>
  );
}
