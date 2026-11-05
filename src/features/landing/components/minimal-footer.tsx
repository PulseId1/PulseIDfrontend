import React from "react";
import { APP_NAME, LAUNCH_DISPLAY_DATE } from "@/lib/constants";

export function MinimalFooter() {
  return (
    <footer
      aria-label="PulseID footer"
      className="border-t border-[#1C344D]/50 bg-[#07111F] py-8 px-4 text-center text-xs text-[#9BAFC3]/70"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>
          &copy; 2026 {APP_NAME}. All rights reserved.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="/auth/login"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0E1F36] border border-[#1C344D] text-[#35D6E8] hover:border-[#2589FF]/60 hover:text-white transition-all font-medium text-[11px]"
          >
            <span>Application Portal</span>
            <span>→</span>
          </a>
          <p className="font-mono text-[11px] text-[#9BAFC3]/50">
            Target Launch • {LAUNCH_DISPLAY_DATE} • Cairo (UTC+2)
          </p>
        </div>
      </div>
    </footer>
  );
}

