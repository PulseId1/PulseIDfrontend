"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function DoctorFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#01091E] py-12 px-4 sm:px-8 mt-auto flex justify-center">
      <div
        className="max-w-[1280px] w-full backdrop-blur-[12px] bg-[#02307d] border border-[rgba(52,216,225,0.25)] rounded-[24px] p-6 sm:p-[41px] flex flex-col items-center shadow-[0px_25px_50px_-12px_rgba(2,24,68,0.5)] relative overflow-hidden"
        data-node-id="353:10025"
        data-name="Contained Centered Content Card inspired by slothui reference"
      >
        {/* Item 1: Centered Pulse ID Logo Lockup matching Figma Node 353:10027 */}
        <Link href="/doctor" className="flex items-center gap-[12px] group" data-node-id="353:10027">
          <div
            className="size-[40px] rounded-[8px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex items-center justify-center p-px shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0"
            data-node-id="353:10028"
          >
            <div className="h-[30px] w-[27px] relative shrink-0">
              <Image
                src="/assets/doctor/imgGroup4.svg"
                alt="PulseID Logo"
                width={27}
                height={30}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <span className="font-['Inter'] font-bold text-[20px] text-white leading-normal tracking-tight">
            PULSEID
          </span>
        </Link>

        {/* Item 2: Horizontal Navigation Menu matching Figma Node 353:10052 */}
        <nav
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-[40px] pt-[28px]"
          data-node-id="353:10052"
          data-name="Item 2: Horizontal Navigation Menu"
        >
          <Link
            href="/doctor"
            className="font-['Inter'] font-medium text-[16px] text-white hover:text-[#078bde] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="font-['Inter'] font-medium text-[16px] text-white hover:text-[#078bde] transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="font-['Inter'] font-medium text-[16px] text-white hover:text-[#078bde] transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/privacy"
            className="font-['Inter'] font-medium text-[16px] text-white hover:text-[#078bde] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="font-['Inter'] font-medium text-[16px] text-white hover:text-[#078bde] transition-colors"
          >
            Terms &amp; Conditions
          </Link>
        </nav>

        {/* Item 3: Newsletter Box matching Figma Node 353:10064 */}
        <div className="w-full flex justify-center py-[32px]" data-node-id="353:10063">
          <div
            className="backdrop-blur-[4px] bg-[rgba(1,11,31,0.6)] border border-[rgba(7,139,222,0.3)] rounded-[16px] p-6 sm:p-[25px] max-w-[576px] w-full flex flex-col gap-[8px] items-center text-center shadow-lg"
            data-node-id="353:10064"
          >
            <h3 className="font-['Inter'] font-bold text-[20px] text-white leading-normal">
              Stay Updated with Pulse ID
            </h3>

            <p className="font-['Inter'] font-normal text-[14px] text-[#bacfd7] leading-normal max-w-[448px]">
              Get the latest announcements, clinical protocol releases, and security advisories sent directly to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="w-full max-w-[448px] pt-[12px] flex flex-col sm:flex-row gap-[10px]">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work or clinical email"
                  className="w-full h-[41px] rounded-[8px] bg-[#021844] border border-[rgba(255,255,255,0.2)] text-[14px] text-white placeholder-[#727272] pl-[41px] pr-[17px] focus:outline-none focus:border-[#078bde] transition-colors"
                />
                <div className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[15px] h-[12px]">
                  <Image
                    src="/assets/doctor/imgContainer1.svg"
                    alt="Email"
                    width={15}
                    height={12}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-[41px] px-[20px] bg-[#078bde] rounded-[8px] text-white font-['Inter'] font-bold text-[14px] flex items-center justify-center gap-[6px] hover:bg-[#0677BF] transition-colors shadow-[0px_10px_15px_-3px_rgba(7,139,222,0.3)] shrink-0 cursor-pointer"
              >
                <span>{subscribed ? "Subscribed" : "Subscribe"}</span>
                <div className="size-[10.67px] relative shrink-0">
                  <Image
                    src="/assets/doctor/imgContainer2.svg"
                    alt="Arrow"
                    width={11}
                    height={11}
                    className="w-full h-full object-contain"
                  />
                </div>
              </button>
            </form>

            <p className="font-['Inter'] font-normal text-[11px] text-[#8b8b8b] pt-[4px] leading-normal">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Item 4: Social Icons Row matching Figma Node 353:10085 */}
        <div className="flex gap-[16px] items-center justify-center" data-node-id="353:10085">
          <a
            href="https://www.facebook.com/share/19kGnJB7Bf/"
            target="_blank"
            rel="noopener noreferrer"
            className="size-[40px] rounded-[12px] bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] flex items-center justify-center p-px shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#078bde] transition-colors"
            title="Facebook"
          >
            <div className="size-[16px] relative">
              <Image
                src="/assets/doctor/imgSvg.svg"
                alt="Facebook"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="size-[40px] rounded-[12px] bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] flex items-center justify-center p-px shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#078bde] transition-colors"
            title="X (Twitter)"
          >
            <div className="size-[16px] relative">
              <Image
                src="/assets/doctor/imgSvg3.svg"
                alt="X"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
          </a>

          <a
            href="https://www.instagram.com/pulseid.eg?obrf=b3hqdTYwam9qMGs1"
            target="_blank"
            rel="noopener noreferrer"
            className="size-[40px] rounded-[12px] bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] flex items-center justify-center p-px shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#078bde] transition-colors"
            title="Instagram"
          >
            <div className="size-[16px] relative">
              <Image
                src="/assets/doctor/imgSvg2.svg"
                alt="Instagram"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
          </a>

          <a
            href="https://www.linkedin.com/company/pulseid-tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="size-[40px] rounded-[12px] bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] flex items-center justify-center p-px shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#078bde] transition-colors"
            title="LinkedIn"
          >
            <div className="size-[16px] relative">
              <Image
                src="/assets/doctor/imgSvg1.svg"
                alt="LinkedIn"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
