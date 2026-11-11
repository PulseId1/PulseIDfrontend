import React from "react";
import Link from "next/link";
import Image from "next/image";

export function DoctorFooter() {
  return (
    <footer className="w-full bg-[#02307D] text-white border-t border-white/10 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/doctor" className="flex items-center gap-2">
              <Image
                src="/assets/pulseid-logo.svg"
                alt="PulseID"
                width={130}
                height={34}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Clinical intelligence and biometric health identity platform empowering physicians with authenticated medical history and patient consent.
            </p>
            <div className="pt-2 text-[11px] text-sky-200 font-mono">
              Certified Provider Portal • v1.0.4
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200">
              Clinical Workspace
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/doctor" className="hover:text-white transition-colors">
                  Doctor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/doctor/find-patient" className="hover:text-white transition-colors">
                  Find Patient Directory
                </Link>
              </li>
              <li>
                <Link href="/doctor/access-requests" className="hover:text-white transition-colors">
                  Patient Access Requests
                </Link>
              </li>
              <li>
                <Link href="/doctor/profile" className="hover:text-white transition-colors">
                  Physician Credentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200">
              Regulatory Standards
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>Egyptian Medical Syndicate Guidelines</li>
              <li>HIPAA Clinical Privacy Compliance</li>
              <li>Biometric Electronic Consent</li>
              <li>Encrypted Health Records (AES-256)</li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200">
              Provider Support
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              For clinical assistance, EHR integration, or access escalation:
            </p>
            <p className="text-xs font-semibold text-white">
              support@pulseid.healthcare
            </p>
            <p className="text-xs text-sky-200 font-mono">
              Emergency Provider Hotline: 16244
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 PulseID Healthcare Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Clinical Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
