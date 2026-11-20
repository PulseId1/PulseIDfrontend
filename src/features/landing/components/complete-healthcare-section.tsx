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
 * CompleteHealthcareSection — Implementation of:
 * - Desktop: Figma Node 233:422 (1280px canvas, px-[32px] py-[96px], 4-column cards)
 * - Mobile: Figma Node 218:650 (390px canvas, px-[16px] py-[40px], 1-column stack)
 */
export function CompleteHealthcareSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 w-full relative z-10 bg-[#f4f7fb] lg:bg-[#C0CAE3]/10 py-10 lg:py-[96px] px-4 lg:px-[32px] my-0 lg:my-[96px]"
      data-node-id="218:650"
      data-name="Section - CompleteHealthcareServices"
    >
      <div className="max-w-[1216px] mx-auto flex flex-col gap-7 lg:gap-12 items-center w-full">
        {/* Centered Section Header matching Figma node 218:651 (Mobile) & 233:424 (Desktop) */}
        <div
          className="flex flex-col gap-2 lg:gap-3 items-center max-w-[768px] text-center w-full"
          data-node-id="218:651"
        >
          <div className="flex flex-col items-center w-full">
            <h2
              className="text-center font-bold tracking-tight text-[#02307D] lg:text-[#078BDE] text-[24px] lg:text-[36px] leading-[30px] lg:leading-normal font-sans"
              data-node-id="218:654"
            >
              <span className="block lg:inline">Complete Healthcare, All in One </span>
              <span className="block lg:inline">Place</span>
            </h2>
          </div>
          <div className="flex flex-col items-center max-w-[384px] lg:max-w-[672px] w-full pt-1">
            <p
              className="text-center font-normal text-[#41474F] text-[12px] lg:text-[16px] leading-[19.5px] lg:leading-normal font-sans"
              data-node-id="218:656"
            >
              Pulse ID brings essential healthcare services together in one connected platform,
              making medical information easier to manage, access, and share securely.
            </p>
          </div>
        </div>

        {/* Responsive Grid: 1-Column on Mobile (218:657), 4-Column on Desktop (233:429) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full max-w-[480px] sm:max-w-none mx-auto items-stretch"
          data-node-id="218:657"
        >
          {HEALTHCARE_FEATURES.map((feature, index) => {
            const cardNodeIds = ["233:430", "233:448", "233:466", "233:484"];
            return (
              <div
                key={feature.number}
                className="bg-white border border-[#dde7ff] lg:border-[#E9EFFD] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[21px] lg:p-[25px] flex flex-col justify-between h-full hover:shadow-md hover:border-[#D0E5F5] transition-all duration-300 group"
                data-node-id={cardNodeIds[index]}
              >
                {/* Upper Content */}
                <div className="flex flex-col gap-[6px] items-start w-full">
                  {/* Top Row: Icon Container + Badge */}
                  <div className="flex items-center justify-between w-full">
                    {/* Icon Box: 40x40 on Mobile (218:660), 48x48 on Desktop */}
                    <div className="size-[40px] lg:w-12 lg:h-12 rounded-[12px] lg:rounded-[8px] bg-[rgba(142,191,222,0.2)] border border-[rgba(192,202,227,0.1)] lg:border-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-300">
                      <div
                        className="relative flex items-center justify-center"
                        style={{ width: feature.iconWidth, height: feature.iconHeight }}
                      >
                        <Image
                          src={feature.iconPath}
                          alt={feature.title}
                          width={feature.iconWidth}
                          height={feature.iconHeight}
                          priority
                          unoptimized
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Number Badge: Pill rounded-full on Mobile (218:663), rounded-[4px] on Desktop */}
                    <div className="bg-[rgba(142,191,222,0.2)] lg:bg-[rgba(7,139,222,0.2)] border border-[rgba(192,202,227,0.1)] lg:border-none px-[11px] py-[5px] lg:px-2 lg:py-0.5 rounded-full lg:rounded-[4px] shrink-0">
                      <span className="font-sans text-[12px] font-extrabold lg:font-bold text-[#078bde] lg:text-[#02307D] leading-[16px] lg:leading-normal block">
                        {feature.number}
                      </span>
                    </div>
                  </div>

                  {/* Card Title pt-[6px] */}
                  <div className="pt-[6px] lg:pt-2 w-full">
                    <h3 className="font-sans text-[14px] lg:text-[18px] font-bold text-[#01091e] lg:text-[#02307D] group-hover:text-[#078BDE] transition-colors leading-[20px] lg:leading-normal">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Card Description */}
                  <p className="font-sans text-[12px] lg:text-[14px] text-[#41474F] leading-[19.5px] lg:leading-[20px] w-full">
                    {feature.description}
                  </p>
                </div>

                {/* Footer: Learn More Link with Authentic Figma Arrow */}
                <div className="pt-[10px] lg:pt-4 w-full">
                  <div className="lg:border-t lg:border-[#E9EFFD] pt-0 lg:pt-[17px] flex items-center w-full">
                    <Link
                      href="/patient"
                      className="inline-flex items-center gap-[6px] lg:gap-1 font-sans text-[12px] font-bold text-[#078BDE] hover:text-[#0060A8] transition-colors group/link"
                    >
                      <span className="leading-[16px] lg:leading-normal">Learn More</span>
                      <div className="size-[14px] lg:w-[11px] lg:h-[11px] relative flex items-center justify-center">
                        <Image
                          src="/assets/figma/icons/healthcare-learn-more-arrow.svg"
                          alt=""
                          width={14}
                          height={14}
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
