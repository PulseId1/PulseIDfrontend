"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  image: string;
  badgeLabel?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    number: "1/",
    question: "What is PulseID and how does it work?",
    answer:
      "PulseID is a unified healthcare identity and medical records platform. It seamlessly links all your prescriptions, lab tests, and hospital visits into one secure, patient-controlled digital timeline.",
    image: "/assets/landing-new/1ed92cb142452c36704a13d46c0b9830eefe6891.png",
    badgeLabel: "Unified Medical Record",
  },
  {
    id: "faq-2",
    number: "2/",
    question: "How can I upload and manage my medical records?",
    answer:
      "Simply snap a photo of any handwritten prescription or upload diagnostic PDFs. PulseID automatically reads, tags, date-stamps, and consolidates the records into your profile.",
    image: "/prescription-sample.jpg",
    badgeLabel: "Instant Document Upload",
  },
  {
    id: "faq-3",
    number: "3/",
    question: "How does PulseID protect my personal health data?",
    answer:
      "All health records are safeguarded with zero-knowledge AES-256 encryption. Only you hold the decryption keys, and access is protected by biometric verification and strict audit logging.",
    image: "/assets/landing-new/fc2397e2b08f4f42f1bed9e47f0c3090d80a075b.png",
    badgeLabel: "Zero-Knowledge Encryption",
  },
  {
    id: "faq-4",
    number: "4/",
    question: "Can I securely share my medical records with doctors?",
    answer:
      "Yes. You can grant instant, temporary, or selective access to verified physicians through a time-limited QR code or direct digital link that you can revoke at any second.",
    image: "/assets/landing-new/6cddaa5c10b90ce2f90904c9654e7486e85e3885.png",
    badgeLabel: "Consent-Driven Access",
  },
  {
    id: "faq-5",
    number: "5/",
    question: "How does the AI Medical Assistant work?",
    answer:
      "PulseID integrates clinical NLP and RAG (Retrieval-Augmented Generation) to transcribe handwritten prescriptions, clarify complex lab findings, and screen for medication interactions in seconds.",
    image: "/assets/landing-new/356ee9186a1b5fed1d2d371a6067124991d65428.png",
    badgeLabel: "Clinical AI & NLP",
  },
  {
    id: "faq-6",
    number: "6/",
    question: "Who can access my medical records?",
    answer:
      "Only you and the licensed healthcare providers you explicitly authorize. PulseID never sells or exposes your health data to advertisers, employers, or third-party brokers.",
    image: "/assets/landing-new/705a0ab84f4790a0f3202f7470f9421c83cef495.png",
    badgeLabel: "Patient-Owned Identity",
  },
  {
    id: "faq-7",
    number: "7/",
    question: "How does PulseID help prevent medication errors and drug interactions?",
    answer:
      "Whenever a doctor or pharmacy prescribes new medication, PulseID automatically cross-checks active regimens against known allergies and contraindications, alerting clinicians instantly.",
    image: "/alsafa.jpeg",
    badgeLabel: "Automated Safety Screening",
  },
  {
    id: "faq-8",
    number: "8/",
    question: "How can I access emergency medical information through PulseID?",
    answer:
      "First responders and emergency ER staff can scan your dedicated Emergency QR code or NFC badge to view vital stats—blood type, chronic conditions, and emergency contacts—even if you are unconscious.",
    image: "/xray.jpeg",
    badgeLabel: "Emergency Telemetry",
  },
];

export function FaqSection() {
  const [activeId, setActiveId] = useState<string>("faq-1");

  const currentItem = FAQ_ITEMS.find((item) => item.id === activeId) || FAQ_ITEMS[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      id="about"
      className="w-full bg-white py-16 sm:py-24"
      data-node-id="665:3789"
      data-name="FaqSection"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header matching Figma 665:3791 & 3792 */}
        <div className="text-center max-w-[650px] mx-auto pb-14 sm:pb-16">
          <span className="font-sans font-semibold text-[15px] sm:text-[16px] text-[#078bde] block mb-2 tracking-wide uppercase">
            Get Your Answer
          </span>
          <h2 className="font-sans font-bold text-[34px] sm:text-[42px] lg:text-[46px] leading-[1.2] text-[#02307d] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-[15px] text-[#5c6063]">
            Hover or click on any question to view clear, concise answers and explore the platform live.
          </p>
        </div>

        {/* 2-Column Content Row matching Figma 665:3793 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Column: Dynamic Visual Showcase with Floating Badge */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center justify-center relative">
            <div className="w-full max-w-[460px] h-[380px] sm:h-[440px] rounded-[16px] border-8 border-white shadow-2xl overflow-hidden relative bg-slate-900 transition-all duration-500">
              {FAQ_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    item.id === currentItem.id ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.question}
                    fill
                    unoptimized
                    priority={item.id === "faq-1"}
                    className="object-cover object-center"
                  />
                  {/* Subtle dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  
                  {/* Context caption inside image */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#078bde]/90 text-white uppercase tracking-wider mb-1">
                      {item.badgeLabel}
                    </span>
                    <p className="text-[13px] font-medium text-white/90 line-clamp-1">
                      {item.question}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating 84k+ Patients Badge matching Figma 665:3796 */}
            <div className="absolute -bottom-5 left-4 sm:left-6 bg-white rounded-[12px] p-3.5 sm:p-4 shadow-xl border border-slate-100 flex items-center gap-3.5 z-20">
              <div className="size-[42px] rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <Image
                  src="/assets/landing-new/08aa7c91e7c90be8d5d9d8d2ebdd9c670db41bec.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="size-[28px]"
                />
              </div>
              <div>
                <span className="font-sans font-bold text-[20px] sm:text-[22px] text-[#078bde] block leading-none">
                  84k+
                </span>
                <span className="text-[13px] sm:text-[14px] text-[#41474f] font-medium mt-0.5 block">
                  Happy Patients
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 8 Questions Accordion with Hover & Click Triggers */}
          <div className="lg:col-span-7 flex flex-col gap-3 w-full">
            {FAQ_ITEMS.map((item) => {
              const isOpen = activeId === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleSelect(item.id)}
                  onClick={() => handleSelect(item.id)}
                  className={`bg-white border rounded-[12px] overflow-hidden transition-all duration-200 cursor-pointer ${
                    isOpen
                      ? "border-[#078bde] shadow-md shadow-blue-500/10 ring-1 ring-[#078bde]/30"
                      : "border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="w-full px-5 py-4 sm:py-4.5 flex items-center justify-between text-left gap-3.5">
                    <div className="flex items-center gap-3">
                      <span className={`text-[14px] font-bold shrink-0 ${isOpen ? "text-[#078bde]" : "text-slate-400"}`}>
                        {item.number}
                      </span>
                      <span className={`font-sans font-semibold text-[15.5px] sm:text-[16.5px] leading-snug ${
                        isOpen ? "text-[#02307d]" : "text-slate-800"
                      }`}>
                        {item.question}
                      </span>
                    </div>

                    <span className={`size-[26px] rounded-full flex items-center justify-center font-bold text-[16px] shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#078bde] text-white"
                        : "bg-blue-50 text-[#078bde]"
                    }`}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#41474f] border-t border-slate-100 bg-slate-50/40">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
