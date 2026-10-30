"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "motion/react";

interface MascotFaceProps {
  readonly className?: string;
}

export function MascotFace({ className = "" }: MascotFaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);

  // Smooth springs for eye pupil movement
  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const eyeX = useSpring(0, springConfig);
  // Default to looking downward towards the countdown counter below
  const eyeY = useSpring(6, springConfig);
  const headRotate = useSpring(0, springConfig);

  // Idle timer to look back at the counter when mouse stops
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width / 2;
      const faceCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - faceCenterX;
      const deltaY = e.clientY - faceCenterY;

      const distance = Math.hypot(deltaX, deltaY);
      const maxDistance = 450;
      const factor = Math.min(distance / maxDistance, 1);

      const angle = Math.atan2(deltaY, deltaX);

      // Max eye travel bounds in pixels
      const maxEyeX = 10;
      const maxEyeY = 8;

      eyeX.set(Math.cos(angle) * factor * maxEyeX);
      eyeY.set(Math.sin(angle) * factor * maxEyeY);

      // Gentle head tilt
      headRotate.set(Math.cos(angle) * factor * 4);

      // Reset idle timer: if user is idle for 2s, look back down at the countdown counter
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        eyeX.set(0);
        eyeY.set(7); // Eyes look down at counter
        headRotate.set(0);
      }, 2000);
    };

    const handleMouseLeave = () => {
      // Look straight down at the countdown
      eyeX.set(0);
      eyeY.set(7);
      headRotate.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [eyeX, eyeY, headRotate]);

  // Periodic natural blinking
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;

    const scheduleNextBlink = () => {
      const delay = Math.random() * 3500 + 2500;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 150);
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  const handleClick = () => {
    const messages = [
      "Nov 20, 2026",
      "Tracking launch!",
      "Connected health.",
      "T-minus active!",
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setSpeechBubble(randomMsg);
    setTimeout(() => setSpeechBubble(null), 2000);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-col items-center select-none cursor-pointer ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label="Interactive PulseID mascot looking at countdown counter with eyes following your cursor"
    >
      {/* Interactive Speech Bubble */}
      {speechBubble && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.9 }}
          className="absolute -top-9 z-20 px-2.5 py-0.5 rounded-full bg-[#0B192B] border border-[#35D6E8]/60 text-[#35D6E8] text-[10px] font-mono tracking-wider font-semibold whitespace-nowrap shadow-[0_0_16px_rgba(53,214,232,0.3)] pointer-events-none"
        >
          {speechBubble}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#0B192B] border-r border-b border-[#35D6E8]/60" />
        </motion.div>
      )}

      {/* Floating Mascot Head */}
      <motion.div
        style={{ rotate: headRotate }}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative group"
      >
        {/* Soft Ambient Cyan/White Aura */}
        <div
          className={`absolute inset-0 rounded-[28px] sm:rounded-[34px] blur-lg transition-all duration-300 scale-105 ${
            isHovered
              ? "bg-[#35D6E8]/40 shadow-[0_0_35px_rgba(53,214,232,0.35)]"
              : "bg-[#35D6E8]/20"
          }`}
          aria-hidden="true"
        />

        {/* Mascot Face Body - clean white squircle pill matching user reference */}
        <div className="relative w-20 h-13 sm:w-24 sm:h-15 md:w-26 md:h-16 rounded-[26px] sm:rounded-[30px] bg-gradient-to-b from-[#FFFFFF] via-[#F4F8FC] to-[#DCE6F2] shadow-[0_8px_24px_rgba(5,15,30,0.5),inset_0_-3px_6px_rgba(37,137,255,0.12),inset_0_2px_4px_rgba(255,255,255,0.95)] border border-white/70 flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105">
          {/* Subtle forehead reflection highlight */}
          <div className="absolute top-1.5 inset-x-5 h-1.5 rounded-full bg-white/80 blur-[0.5px]" />

          {/* Eye Socket Track & Animated Pupils */}
          <div className="relative w-full px-4 sm:px-5 flex items-center justify-between mt-1 sm:mt-1.5">
            {/* Left Eye */}
            <div className="relative w-5 h-8 sm:w-6 sm:h-9 flex items-center justify-center">
              <motion.div
                style={{
                  x: eyeX,
                  y: eyeY,
                  scaleY: isBlinking ? 0.1 : 1,
                }}
                transition={{
                  scaleY: { duration: 0.1, ease: "easeInOut" },
                }}
                className="w-4 h-6 sm:w-4.5 sm:h-7 rounded-full bg-[#07111F] shadow-[inset_0_1px_2px_rgba(0,0,0,0.7),0_1px_4px_rgba(7,17,31,0.4)] flex items-start justify-end p-0.5"
              >
                {/* Eye Catchlight Reflection */}
                <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
              </motion.div>
            </div>

            {/* Right Eye */}
            <div className="relative w-5 h-8 sm:w-6 sm:h-9 flex items-center justify-center">
              <motion.div
                style={{
                  x: eyeX,
                  y: eyeY,
                  scaleY: isBlinking ? 0.1 : 1,
                }}
                transition={{
                  scaleY: { duration: 0.1, ease: "easeInOut" },
                }}
                className="w-4 h-6 sm:w-4.5 sm:h-7 rounded-full bg-[#07111F] shadow-[inset_0_1px_2px_rgba(0,0,0,0.7),0_1px_4px_rgba(7,17,31,0.4)] flex items-start justify-end p-0.5"
              >
                {/* Eye Catchlight Reflection */}
                <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
