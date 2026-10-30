import React from "react";
import { PulseLogo } from "@/components/ui/logo";
import { APP_NAME, APP_DESCRIPTION, LAUNCH_DISPLAY_DATE } from "@/lib/constants";

export function LandingFooter() {
  const currentYear = 2026;

  return (
    <footer
      aria-label="PulseID footer"
      className="border-t border-[#1C344D] bg-[#07111F] text-[#9BAFC3] py-14 px-4 sm:px-6 lg:px-8 mt-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand and Mission */}
        <div className="space-y-3 max-w-md">
          <PulseLogo size="md" />
          <p className="text-xs sm:text-sm text-[#9BAFC3] leading-relaxed">
            {APP_DESCRIPTION}
          </p>
          <p className="text-xs text-[#9BAFC3]/70">
            Target Public Launch: <span className="text-[#F4F8FC]">{LAUNCH_DISPLAY_DATE}</span>
          </p>
        </div>

        {/* Navigation & Informational Quick-Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 text-xs sm:text-sm">
          <a
            href="#intro"
            className="hover:text-[#F4F8FC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8] rounded"
          >
            Overview
          </a>
          <a
            href="#countdown"
            className="hover:text-[#F4F8FC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8] rounded"
          >
            Launch Countdown
          </a>
          <a
            href="#team"
            className="hover:text-[#F4F8FC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8] rounded"
          >
            Team
          </a>
        </div>
      </div>

      {/* Legal & Brand Notice */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#1C344D]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9BAFC3]/70">
        <p>
          &copy; {currentYear} {APP_NAME}. All rights reserved.
        </p>
        <p className="text-center sm:text-right">
          Proposed public marketing pre-launch page. Visual identity and founding roster subject to formal announcement.
        </p>
      </div>
    </footer>
  );
}
