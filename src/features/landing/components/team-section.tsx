"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface FounderMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  linkedinUrl: string;
  photoPosition?: string;
}

const FOUNDERS: FounderMember[] = [
  {
    id: "maryam-ebrahim",
    name: "Maryam Ebrahim",
    role: "Founder & CEO",
    bio: "Originated the idea behind PulseID and leads the company.",
    photoUrl: "/team/MaryamEbrahim.jpg",
    linkedinUrl: "https://www.linkedin.com/in/maryam-ebrahim1",
    photoPosition: "object-[center_20%]",
  },
  {
    id: "mohamed-helmy",
    name: "Mohamed Helmy",
    role: "Co-founder & CTO",
    bio: "Leads technical development and PulseNLP.",
    photoUrl: "/team/MohamedHelmy.jpg",
    linkedinUrl: "https://www.linkedin.com/in/mohahelmy7",
    photoPosition: "object-[center_22%]",
  },
  {
    id: "youssef-elgendy",
    name: "Youssef Elgendy",
    role: "Co-founder & CBO",
    bio: "Leads business strategy, financial planning and marketing direction.",
    photoUrl: "/team/YoussefElgendy.jpg",
    linkedinUrl: "https://www.linkedin.com/in/youssef-elgendyy",
    photoPosition: "object-[center_20%]",
  },
  {
    id: "mahmoud-ibrahim",
    name: "Mahmoud Ibrahim",
    role: "Co-founder & CMO",
    bio: "Leads marketing, digital content and social media presence.",
    photoUrl: "/team/MahmoudIbrahim.jpg",
    linkedinUrl: "https://www.linkedin.com/in/maibsa",
    photoPosition: "object-[center_20%]",
  },
];

export function TeamSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      id="team"
      className="w-full bg-white py-16 sm:py-24 border-t border-slate-100"
      data-name="TeamSection"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header matching Investor Pitch Slide */}
        <div className="max-w-[800px] mb-12 sm:mb-16">
          <h2 className="font-sans font-bold text-[36px] sm:text-[44px] lg:text-[48px] text-[#01091e] tracking-tight leading-tight">
            Team
          </h2>
          <p className="mt-3 text-[16px] sm:text-[18px] text-[#5c6063] font-normal leading-relaxed">
            A 17-member team across AI, engineering, security, medicine, pharmacy and business.
          </p>
        </div>

        {/* 4 Co-Founders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FOUNDERS.map((founder) => (
            <div
              key={founder.id}
              className="flex flex-col group transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Photo Box */}
              <div className="w-full aspect-[4/5] sm:h-[300px] lg:h-[290px] relative rounded-[10px] overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100">
                <Image
                  src={founder.photoUrl}
                  alt={founder.name}
                  fill
                  unoptimized
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                    founder.photoPosition || "object-top"
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Details */}
              <div className="mt-4 flex flex-col flex-1">
                <h3 className="font-sans font-bold text-[18px] sm:text-[19px] text-[#01091e]">
                  {founder.name}
                </h3>

                <span className="mt-1 font-semibold text-[13.5px] text-[#078bde] tracking-wide">
                  {founder.role}
                </span>

                <p className="mt-2.5 text-[13px] sm:text-[13.5px] text-[#5c6063] leading-relaxed flex-1">
                  {founder.bio}
                </p>

                {/* LinkedIn Link with subtle divider */}
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-[12.5px] text-slate-500">
                  <span>LinkedIn:</span>
                  <a
                    href={founder.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#078bde] hover:underline font-medium cursor-pointer"
                  >
                    [view profile]
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Footer Notes */}
        <div className="mt-14 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12.5px] text-slate-400">
          <p>
            Supported by AI engineers, developers, cybersecurity specialists and a clinical and pharmacy review team. Full team:{" "}
            <a
              href="#about"
              className="text-[#078bde] hover:underline font-medium"
            >
              [add link]
            </a>
          </p>
          <span className="font-medium tracking-wide text-slate-400">
            PULSE ID · Investor Pitch 2026 • 12
          </span>
        </div>
      </div>
    </motion.section>
  );
}
