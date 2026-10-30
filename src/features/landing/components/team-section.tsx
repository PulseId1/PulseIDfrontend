"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, RotateCw, ExternalLink } from "lucide-react";
import {
  LEADERSHIP_MEMBERS,
  SPECIALIST_MEMBERS,
  TEAM_CATEGORIES,
} from "../data/team-members";
import type { TeamFilterCategory, TeamMember } from "../types/team-member";
import { LinkedInIcon } from "@/components/ui/icons";

/**
 * Category Visual Theme Map
 */
const CATEGORY_THEMES = {
  leadership: {
    gradient: "from-[#35D6E8] to-[#2589FF]",
    borderAccent: "border-[#35D6E8]/40",
    glow: "rgba(53, 214, 232, 0.4)",
    badgeBg: "bg-[#35D6E8]/15 text-[#35D6E8] border-[#35D6E8]/30",
    dot: "bg-[#35D6E8]",
    department: "Executive Leadership",
  },
  technology: {
    gradient: "from-[#2589FF] to-[#35D6E8]",
    borderAccent: "border-[#35D6E8]/40",
    glow: "rgba(53, 214, 232, 0.35)",
    badgeBg: "bg-[#2589FF]/15 text-[#35D6E8] border-[#35D6E8]/30",
    dot: "bg-[#35D6E8]",
    department: "Technology & Engineering",
  },
  pharmaceutical: {
    gradient: "from-[#10B981] to-[#35D6E8]",
    borderAccent: "border-[#10B981]/40",
    glow: "rgba(16, 185, 129, 0.35)",
    badgeBg: "bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30",
    dot: "bg-[#34D399]",
    department: "Pharmaceutical Division",
  },
  marketing: {
    gradient: "from-[#8B5CF6] to-[#EC4899]",
    borderAccent: "border-[#8B5CF6]/40",
    glow: "rgba(139, 92, 246, 0.35)",
    badgeBg: "bg-[#8B5CF6]/15 text-[#C084FC] border-[#8B5CF6]/30",
    dot: "bg-[#C084FC]",
    department: "Growth & Marketing",
  },
  "clinical-research": {
    gradient: "from-[#0284C7] to-[#38BDF8]",
    borderAccent: "border-[#38BDF8]/40",
    glow: "rgba(56, 189, 248, 0.35)",
    badgeBg: "bg-[#0284C7]/15 text-[#38BDF8] border-[#38BDF8]/30",
    dot: "bg-[#38BDF8]",
    department: "Clinical & Research",
  },
} as const;

/* =========================================================================
   1. FOUNDING LEADERSHIP CARD (3D In-Place Flip with Safe Link Execution)
   ========================================================================= */

interface FounderCardProps {
  readonly member: TeamMember;
  readonly index: number;
  readonly isFlipped: boolean;
  readonly onToggleFlip: (id: string) => void;
  readonly isMobileLayout?: boolean;
}

function FounderCard({
  member,
  index,
  isFlipped,
  onToggleFlip,
  isMobileLayout = false,
}: FounderCardProps) {
  const theme = CATEGORY_THEMES.leadership;

  // Gentle parabolic arch elevation on desktop: outer cards slightly dipped, center slightly raised
  // index: 0 (CEO) -> 10px, 1 (CTO) -> 0px, 2 (CBO) -> 0px, 3 (CMO) -> 10px
  const desktopY = !isMobileLayout && (index === 0 || index === 3) ? 10 : 0;

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative w-full h-[420px] sm:h-[440px]"
    >
      <motion.div
        animate={{
          rotateY: isFlipped ? 180 : 0,
          y: desktopY,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 28,
          mass: 0.5,
        }}
        className="w-full h-full relative [transform-style:preserve-3d] select-none rounded-3xl"
      >
        {/* ================= FRONT SIDE ================= */}
        <div
          onClick={() => onToggleFlip(member.id)}
          role="button"
          tabIndex={0}
          aria-label={`${member.name}, ${member.role}. Tap to flip card and view biography.`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggleFlip(member.id);
            }
          }}
          className={`absolute inset-0 [backface-visibility:hidden] rounded-3xl border p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 bg-gradient-to-b from-[#14263E] via-[#0D1A2A] to-[#07111F] shadow-[0_12px_36px_rgba(2,6,12,0.8)] hover:shadow-[0_0_40px_rgba(53,214,232,0.28)] hover:border-[#35D6E8]/70 cursor-pointer ${
            isFlipped ? "border-transparent pointer-events-none" : "border-[#1E3652]/80"
          }`}
        >
          {/* Top Header: Role Badge & Flip Cue */}
          <div className="relative z-10 flex items-center justify-between">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold border ${theme.badgeBg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} animate-pulse`} />
              <span className="uppercase tracking-wider">
                {member.badgeId}
              </span>
            </div>

            <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-medium text-[#35D6E8] bg-[#07111F]/90 px-2 py-0.5 rounded-full border border-[#35D6E8]/40 shadow-sm">
              <RotateCw className="w-2.5 h-2.5" />
              <span>Flip bio</span>
            </div>
          </div>

          {/* Studio Portrait Visual */}
          {member.photoUrl && (
            <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-full h-full object-cover object-[center_18%] select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />
              {/* Cinematic Gradient Overlays to preserve text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#07111F]/65 via-transparent to-[#07111F]/80" />
            </div>
          )}

          {/* Bottom: Signature Frosted Floating Glass Nameplate */}
          <div className="relative z-10 rounded-2xl p-3.5 sm:p-4 backdrop-blur-md bg-[#07111F]/90 border border-[#35D6E8]/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            <h3 className="text-base sm:text-lg font-bold text-[#F4F8FC] leading-tight">
              {member.name}
            </h3>

            <p className="text-xs sm:text-sm font-semibold mt-1 text-[#35D6E8] truncate">
              {member.role}
            </p>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1C344D]/80 text-[10px] text-[#9BAFC3]/80">
              <span className="truncate">Executive Leadership</span>
              <span className="text-[#35D6E8] shrink-0 font-medium ml-1.5 inline-flex items-center gap-1">
                <span>View story</span>
                <RotateCw className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE (180° FLIPPED) ================= */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl border-2 border-[#35D6E8] bg-gradient-to-b from-[#14263E] via-[#0D1A2A] to-[#07111F] p-5 sm:p-6 flex flex-col justify-between shadow-[0_0_48px_rgba(53,214,232,0.32),0_20px_45px_rgba(3,8,16,0.9)] text-left overflow-hidden ${
            isFlipped ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* Top Header: Badge & Flip Back */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#1C344D]/80 pb-2.5">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold border ${theme.badgeBg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} animate-pulse`} />
              <span className="uppercase tracking-wider">
                {member.role}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFlip(member.id);
              }}
              className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-medium text-[#35D6E8] hover:text-white bg-[#07111F]/90 px-2.5 py-1 rounded-full border border-[#35D6E8]/40 shadow-sm transition-colors cursor-pointer"
              aria-label="Flip card back to front"
            >
              <RotateCw className="w-2.5 h-2.5" />
              <span>Flip back</span>
            </button>
          </div>

          {/* Full Untruncated Bio with Smooth Scrollbar (Safe for touch scrolling) */}
          <div className="relative z-10 flex-1 my-3 overflow-y-auto pr-1 text-left [scrollbar-width:thin] [scrollbar-color:#35D6E8_transparent]">
            {member.bio ? (
              <div className="text-[12px] sm:text-[13px] text-[#E2E8F0] leading-relaxed whitespace-pre-line font-normal space-y-2">
                {member.bio}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#9BAFC3] text-xs py-4">
                <p className="text-[11px] sm:text-xs text-[#9BAFC3]/90">
                  Official founding member contributing to PulseID&apos;s healthcare technology platform.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Action: Direct LinkedIn Connect Button (Event-Isolated, Never Flips) */}
          <div className="relative z-20 pt-2 border-t border-[#1C344D]/80 flex flex-col gap-1.5">
            {member.socials?.linkedin ? (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onPointerDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(member.socials?.linkedin, "_blank", "noopener,noreferrer");
                }}
                className="relative z-30 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#0077B5] hover:bg-[#006399] active:bg-[#004e75] text-xs font-semibold text-white transition-all shadow-[0_4px_16px_rgba(0,119,181,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8] cursor-pointer"
                aria-label={`Open ${member.name}'s LinkedIn profile`}
              >
                <LinkedInIcon size={14} className="text-white" />
                <span>Connect on LinkedIn</span>
                <ExternalLink size={12} className="text-white/80" />
              </a>
            ) : (
              <div className="px-3 py-2 rounded-xl bg-[#07111F]/80 border border-[#1C344D] text-[11px] text-[#9BAFC3]/80 text-center font-mono">
                Official Founding Member
              </div>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFlip(member.id);
              }}
              className="text-[9px] text-[#35D6E8]/70 hover:text-[#35D6E8] font-mono tracking-wider text-center py-0.5 flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCw className="w-2.5 h-2.5" />
              <span>Tap to flip back</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   2. SPECIALIST ARC CARD (Snappy 3D Coverflow Arc with Tactile Feedback)
   ========================================================================= */

interface ArcCardProps {
  readonly member: TeamMember;
  readonly index: number;
  readonly activeIndex: number;
  readonly totalMembers: number;
  readonly isFlipped: boolean;
  readonly onToggleFlip: (memberId: string) => void;
  readonly onSelect: (index: number) => void;
  readonly isMobile: boolean;
}

function ArcCard({
  member,
  index,
  activeIndex,
  totalMembers,
  isFlipped,
  onToggleFlip,
  onSelect,
  isMobile,
}: ArcCardProps) {
  // Cyclic offset calculation for symmetrical left and right arc curvature
  let offset = index - activeIndex;
  if (totalMembers > 1) {
    if (offset > totalMembers / 2) offset -= totalMembers;
    if (offset < -totalMembers / 2) offset += totalMembers;
  }

  const isCenter = offset === 0;
  const absOffset = Math.abs(offset);
  const effectivelyFlipped = isCenter && isFlipped;

  // Max visible cards on the arc
  const maxDistance = isMobile ? 1 : 3;
  if (absOffset > maxDistance) {
    return null;
  }

  // Refined Arched Coverflow Geometry
  const spacing = isMobile ? 165 : 225;
  const x = offset * spacing;
  const y = Math.pow(absOffset, 1.6) * (isMobile ? 14 : 20);
  const scale = isCenter ? 1.05 : Math.max(0.72, 0.88 - (absOffset - 1) * 0.12);
  const rotateY = effectivelyFlipped ? 180 : -offset * (isMobile ? 14 : 16);
  const rotateZ = offset * 1.5;
  const opacity = isCenter
    ? 1
    : absOffset === 1
    ? (isMobile ? 0.65 : 0.82)
    : absOffset === 2
    ? 0.55
    : 0.32;
  const zIndex = 50 - absOffset * 10;

  const theme = CATEGORY_THEMES[member.category];

  return (
    <motion.div
      style={{
        zIndex,
      }}
      animate={{
        x,
        y,
        scale,
        opacity,
        rotateY,
        rotateZ,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 28,
        mass: 0.5,
      }}
      className="absolute top-4 w-[250px] sm:w-[275px] md:w-[295px] h-[375px] sm:h-[405px] md:h-[425px] [transform-style:preserve-3d] select-none"
    >
      {/* Front Face */}
      <div
        onClick={() => {
          if (!isCenter) {
            onSelect(index);
          } else {
            onToggleFlip(member.id);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${member.name}, ${member.role}. ${
          isCenter ? "Tap to flip card." : "Tap to focus."
        }`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!isCenter) onSelect(index);
            else onToggleFlip(member.id);
          }
        }}
        className={`absolute inset-0 [backface-visibility:hidden] rounded-3xl border p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 cursor-pointer ${
          effectivelyFlipped ? "pointer-events-none" : "pointer-events-auto"
        } ${
          isCenter
            ? "border-2 border-[#35D6E8] bg-gradient-to-b from-[#14263E] via-[#0D1A2A] to-[#07111F] shadow-[0_0_48px_rgba(53,214,232,0.32),0_20px_45px_rgba(3,8,16,0.9)]"
            : "border border-[#1E3652]/70 bg-gradient-to-b from-[#0F1E33]/95 via-[#0A1626]/95 to-[#07111F]/95 shadow-[0_12px_36px_rgba(2,6,12,0.7)] hover:border-[#35D6E8]/50"
        }`}
      >
        {isCenter && (
          <div
            className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full blur-3xl opacity-25"
            style={{ backgroundColor: theme.glow }}
          />
        )}

        {/* Top: Category Tag & Flip */}
        <div className="relative z-10 flex items-center justify-between">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold border ${theme.badgeBg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} animate-pulse`} />
            <span className="uppercase tracking-wider">
              {member.category.replace("-", " & ")}
            </span>
          </div>

          {isCenter ? (
            <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-medium text-[#35D6E8] bg-[#07111F]/90 px-2 py-0.5 rounded-full border border-[#35D6E8]/40 shadow-sm">
              <RotateCw className="w-2.5 h-2.5" />
              <span>Flip</span>
            </div>
          ) : (
            <span className="font-mono text-[9px] text-[#9BAFC3]/70">
              {member.badgeId}
            </span>
          )}
        </div>

        {/* Card Visual: Real Studio Photo OR Stylized Monogram Canvas */}
        {member.photoUrl ? (
          <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.photoUrl}
              alt={member.name}
              className="w-full h-full object-cover object-[center_15%] select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#07111F]/70 via-transparent to-[#07111F]/85" />
          </div>
        ) : (
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-2">
            <div className="relative">
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl p-0.5 transition-transform duration-300 ${
                  isCenter ? "scale-105" : "scale-100"
                }`}
                style={{
                  background: isCenter
                    ? `linear-gradient(135deg, #35D6E8, #2589FF)`
                    : "linear-gradient(135deg, rgba(37,137,255,0.35), rgba(28,52,77,0.5))",
                  boxShadow: isCenter ? `0 0 32px ${theme.glow}` : "none",
                }}
              >
                <div className="w-full h-full rounded-[22px] bg-gradient-to-b from-[#102238] via-[#0B192B] to-[#07111F] flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Discipline Background Graphic */}
                  {member.category === "technology" && (
                    <svg
                      viewBox="0 0 100 30"
                      className="absolute inset-x-0 bottom-2 w-full h-7 text-[#35D6E8]/20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M0 15 H25 L32 5 L40 25 L48 8 L55 20 L62 15 H100" />
                    </svg>
                  )}

                  {member.category === "pharmaceutical" && (
                    <svg
                      viewBox="0 0 60 60"
                      className="absolute inset-0 w-full h-full text-[#10B981]/15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    >
                      <polygon points="30,8 48,18 48,40 30,50 12,40 12,18" />
                      <circle cx="30" cy="8" r="2.5" fill="currentColor" />
                      <circle cx="48" cy="18" r="2.5" fill="currentColor" />
                      <circle cx="48" cy="40" r="2.5" fill="currentColor" />
                      <circle cx="30" cy="50" r="2.5" fill="currentColor" />
                      <circle cx="12" cy="40" r="2.5" fill="currentColor" />
                      <circle cx="12" cy="18" r="2.5" fill="currentColor" />
                    </svg>
                  )}

                  {member.category === "clinical-research" && (
                    <svg
                      viewBox="0 0 100 40"
                      className="absolute inset-x-0 bottom-1 w-full h-8 text-[#38BDF8]/20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M0 20 Q 25 5, 50 20 T 100 20" />
                      <path d="M0 20 Q 25 35, 50 20 T 100 20" strokeDasharray="3 3" />
                    </svg>
                  )}

                  {member.category === "marketing" && (
                    <svg
                      viewBox="0 0 100 40"
                      className="absolute inset-x-0 bottom-1 w-full h-8 text-[#C084FC]/20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M0 35 L30 25 L60 12 L90 5" />
                      <circle cx="90" cy="5" r="3" fill="currentColor" />
                    </svg>
                  )}

                  {/* Monogram Initials */}
                  <span
                    className={`font-mono font-bold text-2xl sm:text-3xl md:text-4xl tracking-widest select-none ${
                      isCenter
                        ? "text-[#F4F8FC] drop-shadow-[0_2px_12px_rgba(53,214,232,0.5)]"
                        : "text-[#9BAFC3]/70"
                    }`}
                  >
                    {member.initials}
                  </span>
                </div>
              </div>

              {isCenter && (
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#07111F] shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              )}
            </div>
          </div>
        )}

        {/* Floating Frosted Nameplate */}
        <div
          className={`relative z-10 rounded-2xl p-3.5 sm:p-4 backdrop-blur-md transition-all duration-300 ${
            isCenter
              ? "bg-[#07111F]/90 border border-[#35D6E8]/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              : "bg-[#07111F]/75 border border-[#1C344D]/80"
          }`}
        >
          <h3
            className={`text-sm sm:text-base font-bold leading-tight ${
              isCenter ? "text-[#F4F8FC]" : "text-[#E2E8F0]"
            }`}
          >
            {member.name}
          </h3>

          <p
            className={`text-xs sm:text-sm font-semibold mt-1 truncate ${
              isCenter ? "text-[#35D6E8]" : "text-[#9BAFC3]"
            }`}
          >
            {member.role}
          </p>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1C344D]/60 text-[10px] text-[#9BAFC3]/70">
            <span className="truncate">{theme.department}</span>
            {isCenter && (
              <span className="text-[#35D6E8] shrink-0 font-medium ml-1.5 inline-flex items-center gap-1">
                <span>Details</span>
                <RotateCw className="w-2.5 h-2.5" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Back Face (180° Flipped with Safe Link Execution) */}
      <div
        className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl border-2 border-[#35D6E8] bg-gradient-to-b from-[#14263E] via-[#0D1A2A] to-[#07111F] p-5 sm:p-6 flex flex-col justify-between shadow-[0_0_48px_rgba(53,214,232,0.32),0_20px_45px_rgba(3,8,16,0.9)] text-left overflow-hidden ${
          effectivelyFlipped ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="relative z-10 flex items-center justify-between border-b border-[#1C344D]/80 pb-2.5">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold border ${theme.badgeBg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} animate-pulse`} />
            <span className="uppercase tracking-wider">
              {theme.department}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFlip(member.id);
            }}
            className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-medium text-[#35D6E8] hover:text-white bg-[#07111F]/90 px-2.5 py-1 rounded-full border border-[#35D6E8]/40 shadow-sm transition-colors cursor-pointer"
            aria-label="Flip card back to front"
          >
            <RotateCw className="w-2.5 h-2.5" />
            <span>Flip back</span>
          </button>
        </div>

        <div className="relative z-10 flex-1 my-3 overflow-y-auto pr-1 text-left [scrollbar-width:thin] [scrollbar-color:#35D6E8_transparent]">
          {member.bio ? (
            <div className="text-[12px] sm:text-[13px] text-[#E2E8F0] leading-relaxed whitespace-pre-line font-normal space-y-2">
              {member.bio}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#9BAFC3] text-xs py-4">
              <p className="text-[11px] sm:text-xs text-[#9BAFC3]/90">
                Official specialist member contributing to PulseID&apos;s healthcare platform.
              </p>
            </div>
          )}
        </div>

        <div className="relative z-20 pt-2 border-t border-[#1C344D]/80 flex flex-col gap-1.5">
          {member.socials?.linkedin ? (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                window.open(member.socials?.linkedin, "_blank", "noopener,noreferrer");
              }}
              className="relative z-30 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#0077B5] hover:bg-[#006399] active:bg-[#004e75] text-xs font-semibold text-white transition-all shadow-[0_4px_16px_rgba(0,119,181,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8] cursor-pointer"
              aria-label={`Open ${member.name}'s LinkedIn profile`}
            >
              <LinkedInIcon size={14} className="text-white" />
              <span>Connect on LinkedIn</span>
              <ExternalLink size={12} className="text-white/80" />
            </a>
          ) : (
            <div className="px-3 py-2 rounded-xl bg-[#07111F]/80 border border-[#1C344D] text-[11px] text-[#9BAFC3]/80 text-center font-mono">
              Core Team Specialist
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFlip(member.id);
            }}
            className="text-[9px] text-[#35D6E8]/70 hover:text-[#35D6E8] font-mono tracking-wider text-center py-0.5 flex items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCw className="w-2.5 h-2.5" />
            <span>Tap to flip back</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================================
   3. MAIN TEAM SECTION COMPONENT
   ========================================================================= */

export function TeamSection() {
  // Flip states for leadership cards
  const [flippedFounders, setFlippedFounders] = useState<Record<string, boolean>>({});

  // Mobile Leadership Carousel State (for smooth swipe instead of 1700px vertical stack)
  const [activeFounderIndex, setActiveFounderIndex] = useState(0);

  // Specialist carousel state
  const [activeCategory, setActiveCategory] = useState<TeamFilterCategory>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedSpecialistId, setFlippedSpecialistId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Touch tracking refs for silky touch swipe navigation
  const touchSpecialistStartX = useRef<number | null>(null);
  const touchFounderStartX = useRef<number | null>(null);

  // Filter specialist members
  const filteredSpecialists =
    activeCategory === "all"
      ? SPECIALIST_MEMBERS
      : SPECIALIST_MEMBERS.filter(
          (member) =>
            member.category === activeCategory ||
            member.secondaryCategory === activeCategory
        );

  // Responsive mobile listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleFounderFlip = (id: string) => {
    setFlippedFounders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCategoryChange = (catId: TeamFilterCategory) => {
    setActiveCategory(catId);
    setActiveIndex(0);
    setFlippedSpecialistId(null);
  };

  const handlePrevSpecialist = useCallback(() => {
    setFlippedSpecialistId(null);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredSpecialists.length - 1));
  }, [filteredSpecialists.length]);

  const handleNextSpecialist = useCallback(() => {
    setFlippedSpecialistId(null);
    setActiveIndex((prev) => (prev < filteredSpecialists.length - 1 ? prev + 1 : 0));
  }, [filteredSpecialists.length]);

  const handleSelectSpecialistCard = (index: number) => {
    setFlippedSpecialistId(null);
    setActiveIndex(index);
  };

  const handleToggleSpecialistFlip = (memberId: string) => {
    setFlippedSpecialistId((prev) => (prev === memberId ? null : memberId));
  };

  // Founder carousel controls on mobile
  const handlePrevFounder = () => {
    setActiveFounderIndex((prev) => (prev > 0 ? prev - 1 : LEADERSHIP_MEMBERS.length - 1));
  };

  const handleNextFounder = () => {
    setActiveFounderIndex((prev) => (prev < LEADERSHIP_MEMBERS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative py-14 sm:py-20 lg:py-26 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-r from-[#2589FF]/12 via-[#35D6E8]/08 to-transparent blur-[160px] rounded-full"
        aria-hidden="true"
      />

      {/* ================= SECTION A: FOUNDING LEADERSHIP ================= */}
      <div className="relative z-10 mb-16 sm:mb-24">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B192B] border border-[#1C344D] text-[#35D6E8] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35D6E8] animate-pulse" />
            <span>Executive Leadership</span>
          </div>

          <h2
            id="team-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F4F8FC] mb-2 leading-tight"
          >
            The Founders &amp; Leadership
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#9BAFC3] max-w-md mx-auto">
            Guiding the clinical vision, technical architecture, business strategy, and global growth of PulseID.
          </p>
        </div>

        {/* 1. Desktop & Large Screens: 4 Founders Side-by-Side in One Unified Level Row */}
        {/* Strictly ordered: CEO -> CTO -> Business -> Marketing */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-center">
          {LEADERSHIP_MEMBERS.map((founder, idx) => (
            <FounderCard
              key={founder.id}
              member={founder}
              index={idx}
              isFlipped={!!flippedFounders[founder.id]}
              onToggleFlip={handleToggleFounderFlip}
              isMobileLayout={false}
            />
          ))}
        </div>

        {/* 2. Mobile & Tablet: Fluid Swipeable Touch Slider with Visible Peeking Cards */}
        <div className="block lg:hidden max-w-md mx-auto">
          {/* Controls Header for Mobile Slider */}
          <div className="flex items-center justify-between px-2 mb-3">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#9BAFC3]">
              <span className="text-[#35D6E8] font-semibold">
                0{activeFounderIndex + 1}
              </span>
              <span>/ 0{LEADERSHIP_MEMBERS.length}</span>
              <span className="text-white/40">•</span>
              <span className="text-[#E2E8F0] font-medium truncate max-w-[150px]">
                {LEADERSHIP_MEMBERS[activeFounderIndex]?.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevFounder}
                className="p-1.5 rounded-xl bg-[#0B192B] border border-[#1C344D] text-[#35D6E8] hover:bg-[#102238] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
                aria-label="Previous leader"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextFounder}
                className="p-1.5 rounded-xl bg-[#0B192B] border border-[#1C344D] text-[#35D6E8] hover:bg-[#102238] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
                aria-label="Next leader"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Swipe Track with Touch Listener */}
          <div
            onTouchStart={(e) => {
              touchFounderStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchFounderStartX.current === null) return;
              const deltaX = e.changedTouches[0].clientX - touchFounderStartX.current;
              if (deltaX < -25) handleNextFounder();
              else if (deltaX > 25) handlePrevFounder();
              touchFounderStartX.current = null;
            }}
            className="w-full flex justify-center touch-pan-y"
          >
            {LEADERSHIP_MEMBERS[activeFounderIndex] && (
              <FounderCard
                key={LEADERSHIP_MEMBERS[activeFounderIndex].id}
                member={LEADERSHIP_MEMBERS[activeFounderIndex]}
                index={activeFounderIndex}
                isFlipped={!!flippedFounders[LEADERSHIP_MEMBERS[activeFounderIndex].id]}
                onToggleFlip={handleToggleFounderFlip}
                isMobileLayout={true}
              />
            )}
          </div>

          {/* Dot Pagination for 4 Leaders */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {LEADERSHIP_MEMBERS.map((founder, idx) => (
              <button
                key={founder.id}
                type="button"
                onClick={() => setActiveFounderIndex(idx)}
                className={`transition-all rounded-full ${
                  idx === activeFounderIndex
                    ? "w-7 h-1.5 bg-[#35D6E8]"
                    : "w-1.5 h-1.5 bg-[#1C344D] hover:bg-[#9BAFC3]"
                }`}
                aria-label={`Go to ${founder.name}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Visual Ambient Divider Between Leadership and Specialists */}
      <div className="relative z-10 max-w-4xl mx-auto mb-14 sm:mb-20 flex items-center justify-center gap-4">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#1C344D] to-[#35D6E8]/40" />
        <div className="w-2.5 h-2.5 rotate-45 border border-[#35D6E8] bg-[#07111F]" />
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#1C344D] to-[#35D6E8]/40" />
      </div>

      {/* ================= SECTION B: MULTIDISCIPLINARY SPECIALISTS (SCROLLING ARC) ================= */}
      <div className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B192B] border border-[#1C344D] text-[#35D6E8] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35D6E8]" />
            <span>Multidisciplinary Team</span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#F4F8FC] mb-2 leading-tight">
            Engineering, Clinical, Pharma &amp; Marketing
          </h3>

          <p className="text-xs sm:text-sm text-[#9BAFC3] max-w-md mx-auto">
            The specialized talent engineering interoperable healthcare systems and clinical safety protocols.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="w-full flex justify-start sm:justify-center mb-8 sm:mb-10 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-2 pb-1">
          <div
            role="tablist"
            aria-label="Specialist disciplines"
            className="inline-flex items-center p-1 rounded-2xl border border-[#1C344D] bg-[#0B192B]/90 backdrop-blur-md shadow-lg shrink-0 mx-auto"
          >
            {TEAM_CATEGORIES.map((category) => {
              const count =
                category.id === "all"
                  ? SPECIALIST_MEMBERS.length
                  : SPECIALIST_MEMBERS.filter(
                      (m) =>
                        m.category === category.id ||
                        m.secondaryCategory === category.id
                    ).length;
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  role="tab"
                  id={`tab-${category.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${category.id}`}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`relative px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide transition-all duration-200 select-none flex items-center gap-1.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8] ${
                    isActive
                      ? "bg-[#102238] border border-[#2589FF]/60 text-[#F4F8FC] shadow-[0_0_20px_rgba(37,137,255,0.25)]"
                      : "border border-transparent text-[#9BAFC3] hover:text-[#F4F8FC] hover:bg-[#102238]/40"
                  }`}
                >
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#35D6E8]/70">
                    {category.index}.
                  </span>
                  <span>{category.label}</span>
                  <span
                    className={`inline-flex items-center justify-center text-[9px] font-mono font-bold w-4 h-4 rounded-full transition-colors ${
                      isActive
                        ? "bg-[#35D6E8] text-[#07111F]"
                        : "bg-[#07111F] text-[#9BAFC3] border border-[#1C344D]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Arched 3D Carousel Stage */}
        <div
          role="tabpanel"
          id={`panel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
          className="relative w-full"
        >
          {/* Navigation Controls Bar */}
          <div className="flex items-center justify-between max-w-3xl mx-auto px-4 mb-3 sm:mb-4">
            <span className="text-[11px] font-mono text-[#9BAFC3]/70">
              {isMobile ? "← Swipe cards to rotate arc →" : "← Drag or click cards to rotate arc →"}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevSpecialist}
                disabled={filteredSpecialists.length <= 1}
                className="p-2 rounded-xl bg-[#0B192B] border border-[#1C344D] text-[#35D6E8] hover:border-[#35D6E8]/60 hover:bg-[#102238] transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
                aria-label="Previous team specialist"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-[#9BAFC3] px-1">
                {activeIndex + 1} / {filteredSpecialists.length}
              </span>
              <button
                type="button"
                onClick={handleNextSpecialist}
                disabled={filteredSpecialists.length <= 1}
                className="p-2 rounded-xl bg-[#0B192B] border border-[#1C344D] text-[#35D6E8] hover:border-[#35D6E8]/60 hover:bg-[#102238] transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
                aria-label="Next team specialist"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3D Arc Presentation Stage with Direct Touch & Drag Gestures */}
          <div
            onTouchStart={(e) => {
              touchSpecialistStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchSpecialistStartX.current === null) return;
              const deltaX = e.changedTouches[0].clientX - touchSpecialistStartX.current;
              if (deltaX < -25) handleNextSpecialist();
              else if (deltaX > 25) handlePrevSpecialist();
              touchSpecialistStartX.current = null;
            }}
            className="relative h-[435px] sm:h-[465px] md:h-[495px] w-full flex items-center justify-center overflow-visible touch-pan-y"
          >
            {/* Side Vignette Gradients */}
            <div className="pointer-events-none absolute left-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-r from-[#07111F] to-transparent z-40" />
            <div className="pointer-events-none absolute right-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-l from-[#07111F] to-transparent z-40" />

            {/* Render Cards Positioned Along the Symmetrical Parabolic Arc */}
            <AnimatePresence mode="popLayout">
              {filteredSpecialists.map((member, index) => (
                <ArcCard
                  key={member.id}
                  member={member}
                  index={index}
                  activeIndex={activeIndex}
                  totalMembers={filteredSpecialists.length}
                  isFlipped={flippedSpecialistId === member.id}
                  onToggleFlip={handleToggleSpecialistFlip}
                  onSelect={handleSelectSpecialistCard}
                  isMobile={isMobile}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Dot Pagination Track */}
          <div className="flex items-center justify-center gap-1.5 mt-4 sm:mt-6">
            {filteredSpecialists.map((member, idx) => (
              <button
                key={member.id}
                type="button"
                onClick={() => handleSelectSpecialistCard(idx)}
                className={`transition-all rounded-full ${
                  idx === activeIndex
                    ? "w-6 h-1.5 bg-[#35D6E8]"
                    : "w-1.5 h-1.5 bg-[#1C344D] hover:bg-[#9BAFC3]"
                }`}
                aria-label={`Go to ${member.name}'s card`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
