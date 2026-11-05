import React from "react";
import Link from "next/link";
import { PulseLogo } from "@/components/ui/logo";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy | PulseID",
  description:
    "PulseID Patient Privacy Policy, Zero-Knowledge Encryption Standards, and Healthcare Data Sovereignty.",
};

export default function PrivacyPolicyPage() {
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
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            PulseID Privacy Policy
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Last updated: November 2026 • Effective upon launch
          </p>
        </div>

        <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="bg-[#021845]/60 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0080DF]" />
              1. Patient Data Sovereignty & Ownership
            </h2>
            <p>
              At {APP_NAME}, we fundamentally believe that your healthcare data belongs exclusively
              to you. Unlike legacy hospital portals and commercial aggregator systems, {APP_NAME} does
              not sell, monetize, broker, or leverage your protected health information (PHI) for
              advertising or unauthorized clinical profiling. You retain sole cryptographic ownership
              of your medical records at all times.
            </p>
          </section>

          <section className="bg-[#021845]/60 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0080DF]" />
              2. Zero-Knowledge & End-to-End Encryption
            </h2>
            <p>
              All biometric indicators, prescription scans, diagnostic laboratory reports, and
              physician consultations are encrypted both in transit (TLS 1.3 with forward secrecy)
              and at rest (AES-256-GCM). Verification keys are anchored to your verified biometric
              identity, ensuring that neither unauthorized third parties nor platform operators can
              decrypt your medical histories without your authenticated consent.
            </p>
          </section>

          <section className="bg-[#021845]/60 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0080DF]" />
              3. Granular, Revocable Consent Architecture
            </h2>
            <p className="mb-3">
              Whenever you visit an accredited doctor, hospital clinic, or partner pharmacy,
              disclosure of your clinical profile requires an explicit digital consent transaction.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>
                <strong className="text-slate-200">Time-bound access:</strong> Consultations expire automatically following appointments.
              </li>
              <li>
                <strong className="text-slate-200">Scope-limited disclosure:</strong> Grant access strictly to relevant diagnostic specialties (e.g. ophthalmology records without disclosing psychiatric history).
              </li>
              <li>
                <strong className="text-slate-200">Instant revocation:</strong> Revoke any provider or laboratory access with one click from your profile.
              </li>
            </ul>
          </section>

          <section className="bg-[#021845]/60 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0080DF]" />
              4. Regulatory Compliance & Standards
            </h2>
            <p>
              {APP_NAME} is architected to align with international clinical privacy regulations,
              including the Health Insurance Portability and Accountability Act (HIPAA), Health
              Information Technology for Economic and Clinical Health Act (HITECH), General Data
              Protection Regulation (GDPR Article 9 for special category health data), and
              Fast Healthcare Interoperability Resources (HL7® FHIR® Release 4).
            </p>
          </section>

          <section className="bg-[#021845]/60 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0080DF]" />
              5. Contact Our Data Protection Officer
            </h2>
            <p>
              For privacy inquiries, audit trail verification requests, or data deletion mandates,
              contact our Data Protection Officer at:{" "}
              <a
                href="mailto:privacy@pulseid.health"
                className="text-[#0080DF] hover:underline font-semibold"
              >
                privacy@pulseid.health
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

