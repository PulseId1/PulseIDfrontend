"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  FolderIcon,
  PillIcon,
  RobotIcon,
  AlertShieldIcon,
  AmbulanceIcon,
  LockIcon,
  GlobeIcon,
  ChartIcon,
} from "./interactive/icons";
import {
  PulseRecordTab,
  PulseNlpTab,
  RagSystemTab,
  AlertsTab,
  EmergencyTab,
  BiometricTab,
  EcosystemTab,
  AnalyticsTab,
} from "./interactive";

// ==========================================
// 1. ANIMATED NUMBER COUNTERS (Achievements)
// ==========================================
function AnimatedCounter({
  end,
  duration = 1800,
  prefix = "+",
}: {
  end: number;
  duration?: number;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, end, duration]);

  return (
    <div ref={ref} className="tabular-nums inline-block">
      {prefix}
      {count}
    </div>
  );
}

// Tab Definition
interface FeatureTab {
  id: string;
  label: string;
  anchor: string;
  icon: React.ReactNode;
}

const FEATURE_TABS: readonly FeatureTab[] = [
  { id: "record", label: "Pulse Record", anchor: "#record", icon: <FolderIcon className="size-4" /> },
  { id: "nlp", label: "PulseNLP", anchor: "#nlp", icon: <PillIcon className="size-4" /> },
  { id: "assist", label: "RAG System", anchor: "#assist", icon: <RobotIcon className="size-4" /> },
  { id: "alerts", label: "Alerts", anchor: "#alerts", icon: <AlertShieldIcon className="size-4" /> },
  { id: "emerg", label: "Emergency", anchor: "#emerg", icon: <AmbulanceIcon className="size-4" /> },
  { id: "bio", label: "Biometric", anchor: "#bio", icon: <LockIcon className="size-4" /> },
  { id: "eco", label: "Ecosystem", anchor: "#eco", icon: <GlobeIcon className="size-4" /> },
  { id: "ana", label: "Analytics", anchor: "#ana", icon: <ChartIcon className="size-4" /> },
];

export function FeaturesInteractiveSection() {
  const [activeTab, setActiveTab] = useState("record");

  return (
    <section
      id="solutions"
      className="w-full bg-white py-16 sm:py-24"
      data-node-id="665:3591"
      data-name="FeaturesInteractiveSection"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* =========================================================
            ACHIEVEMENTS COUNTER ROW (Animated Motion Counting Up)
            Figma 665:3593
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full pb-16 sm:pb-20 border-b border-slate-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-center">
            {/* 1. Happy Patients */}
            <div className="flex flex-col items-center justify-center p-2">
              <span className="font-sans font-bold text-[46px] sm:text-[56px] lg:text-[64px] text-[#078bde] leading-none tracking-tight">
                <AnimatedCounter end={5120} duration={2000} prefix="+" />
              </span>
              <span className="mt-2 text-[15px] sm:text-[16px] text-[#41474f] font-medium">
                Happy patients
              </span>
            </div>

            {/* 2. Total Pharmacies */}
            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="font-sans font-bold text-[46px] sm:text-[56px] lg:text-[64px] text-[#078bde] leading-none tracking-tight">
                <AnimatedCounter end={26} duration={1600} prefix="+" />
              </span>
              <span className="mt-2 text-[15px] sm:text-[16px] text-[#41474f] font-medium">
                Total pharmacies
              </span>
            </div>

            {/* 3. Senior Doctors */}
            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="font-sans font-bold text-[46px] sm:text-[56px] lg:text-[64px] text-[#078bde] leading-none tracking-tight">
                <AnimatedCounter end={53} duration={1800} prefix="+" />
              </span>
              <span className="mt-2 text-[15px] sm:text-[16px] text-[#41474f] font-medium">
                Senior doctors
              </span>
            </div>

            {/* 4. Years Experience */}
            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="font-sans font-bold text-[46px] sm:text-[56px] lg:text-[64px] text-[#078bde] leading-none tracking-tight">
                <AnimatedCounter end={10} duration={1400} prefix="+" />
              </span>
              <span className="mt-2 text-[15px] sm:text-[16px] text-[#41474f] font-medium">
                Years experience
              </span>
            </div>
          </div>
        </motion.div>

        {/* Section Heading matching Figma 665:3610 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="pt-16 sm:pt-20 text-center max-w-[680px] mx-auto flex flex-col items-center"
        >
          <h2 className="font-sans font-bold text-[34px] sm:text-[42px] lg:text-[46px] leading-[1.2] text-[#01091e] tracking-tight">
            Healthcare Features Designed Around You
          </h2>
          <p className="mt-4 text-[15px] sm:text-[17px] text-[#5c6063] leading-relaxed max-w-[540px]">
            From managing medical records to understanding your health, PulseID makes healthcare
            information smarter, simpler, and more accessible.
          </p>
        </motion.div>

        {/* =========================================================
            FEATURE CATEGORY TABS (Crisp SVG Icons, Zero Emojis)
            ========================================================= */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center flex-wrap gap-2 sm:gap-2.5">
          {FEATURE_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-[12px] text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#02307d] text-white shadow-md shadow-blue-900/20 scale-[1.02]"
                    : "bg-white border border-slate-200/90 text-slate-700 hover:border-[#078bde]/40 hover:bg-slate-50 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.04)]"
                }`}
              >
                <span className={isActive ? "text-cyan-300" : "text-slate-500"}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================
            MODULAR FEATURE CONTENT (No Artificial Outer Box Container)
            Each tab renders directly with authentic layout & zero blank space
            ========================================================= */}
        <div className="mt-8 sm:mt-10 w-full">
          {activeTab === "record" && <PulseRecordTab />}
          {activeTab === "nlp" && <PulseNlpTab />}
          {activeTab === "assist" && <RagSystemTab />}
          {activeTab === "alerts" && <AlertsTab />}
          {activeTab === "emerg" && <EmergencyTab />}
          {activeTab === "bio" && <BiometricTab />}
          {activeTab === "eco" && <EcosystemTab />}
          {activeTab === "ana" && <AnalyticsTab />}
        </div>
      </div>
    </section>
  );
}
