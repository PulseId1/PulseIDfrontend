import React from "react";
import Link from "next/link";

interface FeatureCardData {
  number: string;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  iconSvg: React.ReactNode;
}

const HEALTHCARE_FEATURES: FeatureCardData[] = [
  {
    number: "01",
    title: "Unified Medical Records",
    description:
      "Keep all your medical history in one secure place, including diagnoses, prescriptions, lab results, and imaging.",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    iconSvg: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Medical Assistant",
    description:
      "Get personalized answers and insights about your health using authorized clinical records.",
    iconBg: "bg-blue-50",
    iconColor: "text-[#0080DF]",
    iconSvg: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Smart Prescription & OCR",
    description:
      "Upload prescription images to automatically extract doctor info, drug names, and dosages into verifiable records.",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    iconSvg: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Secure Data Sharing",
    description:
      "Stay in full control of your records by approving, auditing, and managing doctors' access permissions in real-time.",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    iconSvg: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
    ),
  },
];

export function CompleteHealthcareSection() {
  return (
    <section id="about" className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0080DF] tracking-tight">
            Complete Healthcare, All in One Place
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            PulseID brings essential healthcare services together in one connected
            platform, making medical information easier to manage, access, and
            share securely.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HEALTHCARE_FEATURES.map((feature) => (
            <div
              key={feature.number}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Icon + Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.iconBg} ${feature.iconColor} transition-transform group-hover:scale-110 duration-300`}
                  >
                    {feature.iconSvg}
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-[#0080DF] transition-colors">
                    {feature.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0080DF] transition-colors mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center text-sm font-semibold text-[#0080DF] hover:text-[#0060A8] transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

