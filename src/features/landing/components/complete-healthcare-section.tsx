import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FeatureCardData {
  number: string;
  title: string;
  description: string;
  iconPath: string;
  iconWidth: number;
  iconHeight: number;
}

const HEALTHCARE_FEATURES: FeatureCardData[] = [
  {
    number: "01",
    title: "Unified Medical Records",
    description:
      "Keep all your medical history in one secure place, including diagnoses, prescriptions, lab results, and imaging.",
    iconPath: "/assets/figma/icons/healthcare-unified-records.svg",
    iconWidth: 20,
    iconHeight: 16,
  },
  {
    number: "02",
    title: "AI Medical Assistant",
    description:
      "Get personalized answers and insights about your health using authorized clinical records.",
    iconPath: "/assets/figma/icons/healthcare-ai-assistant.svg",
    iconWidth: 22,
    iconHeight: 19,
  },
  {
    number: "03",
    title: "Smart Prescription & OCR",
    description:
      "Upload prescription images to automatically extract doctor info, drug names, and dosages into verifiable records.",
    iconPath: "/assets/figma/icons/healthcare-smart-prescription.svg",
    iconWidth: 20,
    iconHeight: 22,
  },
  {
    number: "04",
    title: "Secure Data Sharing",
    description:
      "Stay in full control of your records by approving, auditing, and managing doctors' access permissions in real-time.",
    iconPath: "/assets/figma/icons/healthcare-secure-sharing.svg",
    iconWidth: 16,
    iconHeight: 20,
  },
];

/**
 * CompleteHealthcareSection — Implementation of Figma Node 233:422
 * Canvas width: 1280px; padding: px-[32px] py-[96px]
 * Heading: "Complete Healthcare, All in One Place" (36px, #078BDE, Inter:Bold)
 * Subtitle: max-w-[672px], 16px, #41474F, Inter:Regular
 * 4 Cards: 286px wide each, 24px gap, 25px padding, 16px radius, border #E9EFFD
 * Background: rgba(192, 202, 227, 0.1) -- NO top border
 */
export function CompleteHealthcareSection() {
  return (
    <section
      id="about"
      className="bg-[#C0CAE3]/10 w-full relative z-10"
      style={{
        marginTop: "96px",
        marginBottom: "96px",
        paddingTop: "96px",
        paddingBottom: "96px",
        paddingLeft: "32px",
        paddingRight: "32px",
      }}
      data-node-id="233:422"
    >
      <div className="max-w-[1216px] mx-auto flex flex-col gap-12 items-center w-full">
        {/* Centered Section Header matching Figma node 233:424 */}
        <div
          className="flex flex-col gap-3 items-center max-w-[768px] text-center w-full"
          data-node-id="233:424"
        >
          <div className="flex flex-col items-center w-full" data-node-id="233:425">
            <h2
              className="text-center font-bold tracking-tight text-[#078BDE]"
              style={{
                color: "var(--Text-primary-color, #078BDE)",
                textAlign: "center",
                fontFamily: "var(--Inter-font-family, Inter)",
                fontSize: "36px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "normal",
              }}
              data-node-id="233:426"
            >
              Complete Healthcare, All in One Place
            </h2>
          </div>
          <div
            className="flex flex-col items-center max-w-[672px] w-full"
            data-node-id="233:427"
          >
            <p
              className="text-center font-normal max-w-[672px] text-[#41474F]"
              style={{
                color: "var(--Text-primary-color-dark-2, #41474F)",
                textAlign: "center",
                fontFamily: "var(--Inter-font-family, Inter)",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
              data-node-id="233:428"
            >
              Pulse ID brings essential healthcare services together in one connected platform,
              making medical information easier to manage, access, and share securely.
            </p>
          </div>
        </div>

        {/* 4-Column Horizontal Grid matching Figma node 233:429 */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch"
          data-node-id="233:429"
        >
          {HEALTHCARE_FEATURES.map((feature, index) => {
            const cardNodeIds = ["233:430", "233:448", "233:466", "233:484"];
            return (
              <div
                key={feature.number}
                className="bg-white border border-[#E9EFFD] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[25px] flex flex-col justify-between h-full hover:shadow-md hover:border-[#D0E5F5] transition-all duration-300 group"
                data-node-id={cardNodeIds[index]}
              >
                {/* Upper Content */}
                <div className="flex flex-col gap-2 items-start w-full">
                  {/* Top Row: Icon Container + Badge */}
                  <div className="flex items-center justify-between w-full">
                    {/* Icon Box 48x48 rounded-8px */}
                    <div className="w-12 h-12 rounded-[8px] bg-[rgba(142,191,222,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-300">
                      <div
                        className="relative flex items-center justify-center"
                        style={{ width: feature.iconWidth, height: feature.iconHeight }}
                      >
                        <Image
                          src={feature.iconPath}
                          alt={feature.title}
                          width={feature.iconWidth}
                          height={feature.iconHeight}
                          unoptimized
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Number Badge with 4px radius */}
                    <div className="bg-[rgba(7,139,222,0.2)] px-2 py-0.5 rounded-[4px] shrink-0">
                      <span className="font-sans text-[12px] font-bold text-[#02307D] leading-normal block">
                        {feature.number}
                      </span>
                    </div>
                  </div>

                  {/* Card Title pt-2 */}
                  <div className="pt-2 w-full">
                    <h3 className="font-sans text-[18px] font-bold text-[#02307D] group-hover:text-[#078BDE] transition-colors leading-normal">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Card Description */}
                  <p className="font-sans text-[14px] text-[#41474F] leading-[20px] w-full">
                    {feature.description}
                  </p>
                </div>

                {/* Footer: Learn More Link with Authentic Figma Arrow */}
                <div className="pt-4 w-full">
                  <div className="border-t border-[#E9EFFD] pt-[17px] flex items-center w-full">
                    <Link
                      href="/patient"
                      className="inline-flex items-center gap-1 font-sans text-[12px] font-bold text-[#078BDE] hover:text-[#0060A8] transition-colors group/link"
                    >
                      <span className="leading-normal">Learn More</span>
                      <div className="w-[11px] h-[11px] relative flex items-center justify-center">
                        <Image
                          src="/assets/figma/icons/healthcare-learn-more-arrow.svg"
                          alt=""
                          width={11}
                          height={11}
                          unoptimized
                          className="w-full h-full object-contain transition-transform group-hover/link:translate-x-1"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
