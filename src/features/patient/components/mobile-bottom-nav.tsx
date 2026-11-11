"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Activity, ShieldCheck, User } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const NAV_ITEMS = [
    {
      label: "Home",
      href: "/patient",
      icon: Home,
    },
    {
      label: "Records",
      href: "/patient/records",
      icon: FileText,
    },
    {
      label: "Health Info",
      href: "/patient/medical-info",
      icon: Activity,
    },
    {
      label: "Access",
      href: "/patient/access-requests",
      icon: ShieldCheck,
    },
    {
      label: "Profile",
      href: "/patient/profile",
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="block lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 pb-safe"
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/patient"
              ? pathname === "/patient"
              : pathname.startsWith(item.href);
          const IconComponent = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-colors ${
                isActive ? "text-[#02307D]" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? "bg-blue-50 text-[#078BDE]" : ""
                }`}
              >
                <IconComponent className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span
                className={`text-[10px] mt-0.5 font-medium leading-none ${
                  isActive ? "text-[#02307D] font-bold" : "text-slate-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
