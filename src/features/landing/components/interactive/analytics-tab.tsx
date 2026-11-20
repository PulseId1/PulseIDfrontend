"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ZapIcon, RefreshIcon, CheckIcon } from "./icons";

function DynamicCounter({
  end,
  duration = 750,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
  }, [end, duration]);

  return (
    <span className="tabular-nums inline-block">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function AnalyticsTab() {
  const [analyticsRiskFilter, setAnalyticsRiskFilter] = useState<"all" | "low" | "high">("all");
  const [analyticsProjectionMode, setAnalyticsProjectionMode] = useState<"standard" | "managed">("standard");

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
        <span className="text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider">
          ILLUSTRATIVE DEMO VALUES &middot; Real figures computed from de-identified cohort
        </span>
        <span className="text-[11px] font-mono text-[#078bde] font-bold flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#078bde] animate-pulse" />
          Telemetry Live &middot; 42 events/min
        </span>
      </div>

      {/* 4 Top KPI Metrics with Dynamic Rising Numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-[#f8fbfe] border border-[#dde7ff] rounded-xl text-center group hover:border-[#078bde] hover:shadow-md transition-all">
          <span className="font-bold text-[32px] sm:text-[36px] text-[#078bde] block leading-none">
            <DynamicCounter
              key={`glycemic-${analyticsRiskFilter}`}
              end={analyticsRiskFilter === "all" ? 38 : analyticsRiskFilter === "low" ? 76 : 18}
              suffix="%"
            />
          </span>
          <span className="text-[12.5px] text-slate-600 mt-1 block">
            Glycemic control (HbA1c &lt; 7%)
          </span>
        </div>

        <div className="p-4 bg-[#f8fbfe] border border-[#dde7ff] rounded-xl text-center group hover:border-[#078bde] hover:shadow-md transition-all">
          <span className="font-bold text-[32px] sm:text-[36px] text-[#02307d] block leading-none">
            <DynamicCounter
              key={`age-${analyticsRiskFilter}`}
              end={analyticsRiskFilter === "all" ? 54 : analyticsRiskFilter === "low" ? 44 : 63}
            />
          </span>
          <span className="text-[12.5px] text-slate-600 mt-1 block">
            Mean age
          </span>
        </div>

        <div className="p-4 bg-[#f8fbfe] border border-[#dde7ff] rounded-xl text-center group hover:border-amber-400 hover:shadow-md transition-all">
          <span className="font-bold text-[32px] sm:text-[36px] text-amber-600 block leading-none">
            <DynamicCounter
              key={`comp-${analyticsRiskFilter}`}
              end={analyticsRiskFilter === "all" ? 41 : analyticsRiskFilter === "low" ? 12 : 71}
              suffix="%"
            />
          </span>
          <span className="text-[12.5px] text-slate-600 mt-1 block">
            Any complication
          </span>
        </div>

        <div className="p-4 bg-[#f8fbfe] border border-[#dde7ff] rounded-xl text-center group hover:border-emerald-400 hover:shadow-md transition-all">
          <span className="font-bold text-[32px] sm:text-[36px] text-emerald-600 block leading-none">
            <DynamicCounter
              key={`meds-${analyticsRiskFilter}`}
              end={analyticsRiskFilter === "all" ? 26 : analyticsRiskFilter === "low" ? 13 : 44}
            />
            <span className="text-[20px] font-semibold text-emerald-500/80">
              {analyticsRiskFilter === "all" ? " (2.6)" : analyticsRiskFilter === "low" ? " (1.3)" : " (4.4)"}
            </span>
          </span>
          <span className="text-[12.5px] text-slate-600 mt-1 block">
            Avg meds / patient
          </span>
        </div>
      </div>

      {/* Middle Row Charts with Interactive Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1,000 patients dot matrix with interactive risk filter */}
        <div className="p-4 bg-white border border-[#dde7ff] rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold text-[#02307d]">
                1,000 patients by risk level
              </span>
              <div className="flex gap-1 text-[10px]">
                <button
                  type="button"
                  onClick={() => setAnalyticsRiskFilter("all")}
                  className={`px-2 py-0.5 rounded cursor-pointer font-semibold transition-all ${
                    analyticsRiskFilter === "all" ? "bg-[#078bde] text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setAnalyticsRiskFilter("low")}
                  className={`px-2 py-0.5 rounded cursor-pointer font-semibold transition-all ${
                    analyticsRiskFilter === "low" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Low
                </button>
                <button
                  type="button"
                  onClick={() => setAnalyticsRiskFilter("high")}
                  className={`px-2 py-0.5 rounded cursor-pointer font-semibold transition-all ${
                    analyticsRiskFilter === "high" ? "bg-rose-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  High
                </button>
              </div>
            </div>

            <div className="h-28 bg-slate-50 rounded-lg p-2.5 flex flex-wrap gap-1 content-start overflow-hidden">
              {Array.from({ length: 120 }).map((_, i) => {
                const isLow = i < 55;
                const isMid = i >= 55 && i < 95;
                const isHigh = i >= 95;
                const isVisible =
                  analyticsRiskFilter === "all" ||
                  (analyticsRiskFilter === "low" && isLow) ||
                  (analyticsRiskFilter === "high" && isHigh);

                return (
                  <div
                    key={i}
                    className={`size-1.5 rounded-full transition-all duration-300 ${
                      !isVisible
                        ? "opacity-15 scale-75"
                        : isLow
                        ? "bg-emerald-500 scale-100 shadow-[0_0_4px_rgba(16,185,129,0.5)]"
                        : isMid
                        ? "bg-amber-400 scale-100 shadow-[0_0_4px_rgba(251,191,36,0.5)]"
                        : "bg-rose-500 scale-105 shadow-[0_0_4px_rgba(244,63,94,0.6)]"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex justify-between text-[11px] font-medium text-slate-600 pt-2 border-t border-slate-100">
            <span className="text-emerald-700 font-semibold">460 Low Risk</span>
            <span className="text-amber-700 font-semibold">330 Moderate</span>
            <span className="text-rose-700 font-semibold">210 High Risk</span>
          </div>
        </div>

        {/* Risk Factors Bar Chart */}
        <div className="p-4 bg-white border border-[#dde7ff] rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[12px] font-bold text-[#02307d] block mb-3">
              Risk factors (% of cohort) &middot; Click to inspect
            </span>
            <div className="space-y-2.5 text-[11.5px]">
              <div
                onClick={() => setAnalyticsRiskFilter(analyticsRiskFilter === "high" ? "all" : "high")}
                className="group cursor-pointer p-1 rounded hover:bg-slate-50 transition-colors"
              >
                <div className="flex justify-between text-slate-700 mb-1">
                  <span className="group-hover:text-[#078bde] font-semibold">Obesity (BMI &ge; 30)</span>
                  <span className="font-bold text-[#02307d]">62%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "62%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-[#078bde] rounded-full group-hover:bg-sky-400 transition-colors"
                  />
                </div>
              </div>

              <div
                onClick={() => setAnalyticsRiskFilter(analyticsRiskFilter === "high" ? "all" : "high")}
                className="group cursor-pointer p-1 rounded hover:bg-slate-50 transition-colors"
              >
                <div className="flex justify-between text-slate-700 mb-1">
                  <span className="group-hover:text-[#078bde] font-semibold">Hypertension</span>
                  <span className="font-bold text-[#02307d]">58%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "58%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-[#078bde] rounded-full group-hover:bg-sky-400 transition-colors"
                  />
                </div>
              </div>

              <div
                onClick={() => setAnalyticsRiskFilter(analyticsRiskFilter === "low" ? "all" : "low")}
                className="group cursor-pointer p-1 rounded hover:bg-slate-50 transition-colors"
              >
                <div className="flex justify-between text-slate-700 mb-1">
                  <span className="group-hover:text-[#078bde] font-semibold">Sedentary Lifestyle</span>
                  <span className="font-bold text-[#02307d]">57%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "57%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-[#078bde] rounded-full group-hover:bg-sky-400 transition-colors"
                  />
                </div>
              </div>

              <div
                onClick={() => setAnalyticsRiskFilter(analyticsRiskFilter === "low" ? "all" : "low")}
                className="group cursor-pointer p-1 rounded hover:bg-slate-50 transition-colors"
              >
                <div className="flex justify-between text-slate-700 mb-1">
                  <span className="group-hover:text-[#078bde] font-semibold">Family History</span>
                  <span className="font-bold text-[#02307d]">44%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "44%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-[#078bde] rounded-full group-hover:bg-sky-400 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <span className="text-[10.5px] text-slate-400 block mt-2">
            Filters reflect verified clinical records from participating clinics.
          </span>
        </div>

        {/* Complications Trend (Interactive Comparison Simulator) */}
        <div className="p-4 bg-white border border-[#dde7ff] rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold text-[#02307d]">
                12m Complications Simulator
              </span>
              <button
                type="button"
                onClick={() =>
                  setAnalyticsProjectionMode(
                    analyticsProjectionMode === "standard" ? "managed" : "standard"
                  )
                }
                className="text-[10.5px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#078bde] hover:bg-blue-100 cursor-pointer transition-colors"
              >
                {analyticsProjectionMode === "standard" ? (
                  <span className="inline-flex items-center gap-1">
                    <ZapIcon className="size-3 text-amber-500" />
                    <span>Simulate PulseID</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <RefreshIcon className="size-3" />
                    <span>Reset</span>
                  </span>
                )}
              </button>
            </div>

            <div className="h-28 bg-slate-50 rounded-lg p-3 flex flex-col justify-end">
              <div className="flex items-end justify-between gap-3 h-20">
                <div
                  style={{ height: analyticsProjectionMode === "standard" ? "35%" : "22%" }}
                  className="w-1/4 bg-amber-300 rounded-t transition-all duration-500 shadow-sm"
                />
                <div
                  style={{ height: analyticsProjectionMode === "standard" ? "55%" : "28%" }}
                  className="w-1/4 bg-amber-400 rounded-t transition-all duration-500 shadow-sm"
                />
                <div
                  style={{ height: analyticsProjectionMode === "standard" ? "75%" : "32%" }}
                  className="w-1/4 bg-amber-500 rounded-t transition-all duration-500 shadow-sm"
                />
                <div
                  style={{ height: analyticsProjectionMode === "standard" ? "95%" : "36%" }}
                  className={`w-1/4 rounded-t transition-all duration-500 shadow-sm ${
                    analyticsProjectionMode === "standard" ? "bg-rose-500" : "bg-emerald-500"
                  }`}
                />
              </div>
              <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
                <span>3m</span>
                <span>6m</span>
                <span>9m</span>
                <span>12m</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100">
            <span className="text-[11.5px] font-bold text-[#02307d] block">
              {analyticsProjectionMode === "standard" ? (
                "Standard Care: Projected complication rate reaches 53%."
              ) : (
                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                  <CheckIcon className="size-3.5 text-emerald-600 shrink-0" />
                  <span>PulseID Care: Drops complication risk to 18% (-66% RRR).</span>
                </span>
              )}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              {analyticsProjectionMode === "standard"
                ? "Delayed interventions lead to acute exacerbations."
                : "Prevented 350 hospitalizations · $1.4M cohort savings."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
