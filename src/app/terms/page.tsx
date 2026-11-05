import React from "react";
import Link from "next/link";
import { PulseLogo } from "@/components/ui/logo";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: "Terms & Conditions | PulseID",
  description:
    "PulseID Platform Terms of Service, User Verification Standards, and Clinical Disclaimers.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#01091E] text-slate-100 flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-[#1B458A] bg-[#02307D] py-4 px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <PulseLogo size="md" theme="light" />
        </Link>
        <Link
          href="/"
          className="text-sm font-semibold text-white/90 hover:text-white bg-[#153F87] hover:bg-[#1B4B9D] border border-[#244B8F] px-4 py-2 rounded-xl transition-colors"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Content Container */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 sm:py-16">
        <div className="mb-10">
          <span className="text-xs font-bold tracking-widest text-[#0080DF] uppercase">
            Platform Agreement
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            PulseID Terms & Conditions
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Last updated: November 2026 • Effective upon launch
          </p>
        </div>

        <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="bg-[#021845]/60 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0080DF]" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, creating an account on, or interacting with {APP_NAME}, you agree to be
              bound by these Terms & Conditions. If you represent a healthcare provider, hospital,
              or licensed pharmacy, you additionally confirm that your clinical credentials have
              been legitimately issued by the pertinent medical licensing board or Ministry of Health.
            </p>
          </section>

          <section className="bg-[#021845]/60 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0080DF]" />
              2. Medical Identity & Credential Integrity
            </h2>
            <p>
              Each {APP_NAME} account represents a verified individual identity. You agree not to
              impersonate any person, forge electronic prescriptions, submit fraudulent laboratory
              diagnostics, or bypass biometric authentication procedures. Providing deceptive health
              records undermines clinical safety and triggers immediate account termination.
            </p>
          </section>

          <section className="bg-[#021845]/60 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0080DF]" />
              3. Non-Emergency & Clinical Advice Disclaimer
            </h2>
            <p>
              {APP_NAME} is an identity, interoperability, and medical record management platform.
              The AI Medical Assistant and OCR features are designed to organize and synthesize
              clinical documentation for authorized review. They do not constitute emergency
              medical care, medical diagnosis, or autonomous treatment directives. In the event
              of a medical emergency, contact your local emergency services immediately.
            </p>
          </section>

          <section className="bg-[#021845]/60 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0080DF]" />
              4. Platform Availability & Security
            </h2>
            <p>
              We maintain continuous platform health, zero-knowledge redundancy, and uptime SLAs.
              However, scheduled security maintenances and network interruptions may occur.
              {APP_NAME} employs fault-tolerant localized cryptographic caches to facilitate offline
              emergency record access where clinically critical.
            </p>
          </section>

          <section className="bg-[#021845]/60 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0080DF]" />
              5. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms are governed by and construed in accordance with applicable healthcare
              regulations and jurisdiction laws. Inquiries concerning terms interpretation should
              be directed to:{" "}
              <a
                href="mailto:legal@pulseid.health"
                className="text-[#0080DF] hover:underline font-semibold"
              >
                legal@pulseid.health
              </a>.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-[#021845] py-8 px-6 text-center text-xs text-slate-400">
        <p>© 2026 {APP_NAME} Healthcare Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

