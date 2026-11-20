"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
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
    <footer
      className="bg-[#02307D] border-t border-[#707883]/20 text-white relative w-full overflow-hidden"
      data-node-id="610:16781"
      data-name="Footer - AUTHENTIC PULSE ID FOOTER"
    >
      <div
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-[48px] py-8 lg:py-[40px] flex flex-col gap-6 lg:gap-[32px] w-full"
        data-node-id="610:16782"
        data-name="Container"
      >
        {/* =========================================================================
            1. Newsletter / Broadcast Box matching Figma Node 610:16783
           ========================================================================= */}
        <div
          className="bg-[rgba(139,139,139,0.2)] border border-[rgba(112,120,131,0.2)] rounded-[8px] p-5 lg:p-[25px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6 w-full"
          data-node-id="610:16783"
          data-name="Newsletter / Broadcast Box"
        >
          <div className="flex flex-col gap-1 max-w-[661px]" data-node-id="610:16784">
            <div className="flex items-center gap-2" data-node-id="610:16785">
              <div className="relative shrink-0 w-[21.6px] h-[24px]" data-node-id="610:16786">
                <Image
                  src="/assets/group5.svg"
                  alt=""
                  width={22}
                  height={24}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>
              <h4
                className="font-bold text-[18px] text-white whitespace-nowrap font-sans"
                data-node-id="610:16805"
              >
                Stay Updated with Pulse ID
              </h4>
            </div>
            <p
              className="text-[13px] text-[#BACFD7] font-normal leading-normal font-sans"
              data-node-id="610:16807"
            >
              Get the latest announcements, clinical protocol releases, and security advisories sent directly to your inbox.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex items-center gap-2 w-full lg:w-auto shrink-0"
            data-node-id="610:16808"
            data-name="Form"
          >
            <div
              className="bg-white border border-[#BFC7D3] rounded-[4px] px-[17px] py-[10px] w-full sm:w-[320px] flex items-center"
              data-node-id="610:16809"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full text-[13px] text-[#41474F] placeholder:text-[#41474F] bg-transparent outline-none font-sans"
                required
                aria-label="Email address for announcements"
                data-node-id="610:16811"
              />
            </div>
            <button
              type="submit"
              className="bg-[#02307D] hover:bg-[#002466] text-white font-bold text-[13px] rounded-[4px] px-[16px] py-[10px] shadow-sm transition-colors cursor-pointer shrink-0 font-sans border border-white/10"
              data-node-id="610:16812"
            >
              <span data-node-id="610:16813">{subscribed ? "Subscribed!" : "Subscribe"}</span>
            </button>
          </form>
        </div>

        {/* =========================================================================
            2. Multi-column Organized Navigation & Contact matching Figma 610:16814
           ========================================================================= */}
        <div
          className="border-b border-[rgba(192,202,227,0.1)] pb-7 pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 w-full"
          data-node-id="610:16814"
          data-name="Multi-column Organized Navigation & Contact"
        >
          {/* Column 1: Product */}
          <div className="flex flex-col gap-3" data-node-id="610:16815">
            <h5 className="font-bold text-[18px] text-white font-sans" data-node-id="610:16817">
              Product
            </h5>
            <ul className="flex flex-col gap-2 font-sans text-[13px] text-[#BACFD7]" data-node-id="610:16818">
              <li>
                <Link href="/#challenges" className="hover:text-white transition-colors" data-node-id="610:16820">
                  Problems
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-white transition-colors" data-node-id="610:16822">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors" data-node-id="610:16824">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-3" data-node-id="610:16825">
            <h5 className="font-bold text-[18px] text-white font-sans" data-node-id="610:16827">
              Company
            </h5>
            <ul className="flex flex-col gap-2 font-sans text-[13px] text-[#BACFD7]" data-node-id="610:16828">
              <li>
                <Link href="/#about" className="hover:text-white transition-colors" data-node-id="610:16830">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#team" className="hover:text-white transition-colors" data-node-id="610:16832">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/#spark" className="hover:text-white transition-colors" data-node-id="610:16834">
                  Founders Spark
                </Link>
              </li>
              <li>
                <Link href="/#awards" className="hover:text-white transition-colors" data-node-id="610:16836">
                  Awards
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-3" data-node-id="610:16837">
            <h5 className="font-bold text-[18px] text-white font-sans" data-node-id="610:16839">
              Legal
            </h5>
            <ul className="flex flex-col gap-2 font-sans text-[13px] text-[#BACFD7]" data-node-id="610:16840">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors" data-node-id="610:16842">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors" data-node-id="610:16844">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy#law151" className="hover:text-white transition-colors" data-node-id="610:16846">
                  Data Protection (Law 151/2020)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="flex flex-col gap-3" data-node-id="610:16847">
            <h5 className="font-bold text-[18px] text-white font-sans" data-node-id="610:16849">
              Support
            </h5>
            <ul className="flex flex-col gap-2 font-sans text-[13px] text-[#BACFD7]" data-node-id="610:16850">
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors" data-node-id="610:16852">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors" data-node-id="610:16854">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Official Contact */}
          <div className="flex flex-col gap-3 col-span-2 sm:col-span-1" data-node-id="610:16855">
            <h5 className="font-bold text-[18px] text-white font-sans" data-node-id="610:16857">
              Official Contact
            </h5>
            <a
              href="mailto:admin@pulseidegypt.com"
              className="text-[13px] font-bold text-[#34D8E1] hover:underline font-sans"
              data-node-id="610:16859"
            >
              admin@pulseidegypt.com
            </a>
            {/* Social Icons row matching Figma 610:16860 */}
            <div className="flex items-center gap-2 pt-2" data-node-id="610:16860">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-[36px] rounded-[8px] border border-[#DDE7FF] bg-[rgba(192,202,227,0.1)] backdrop-blur-[12px] flex items-center justify-center hover:bg-white/20 transition-all"
                aria-label="Facebook"
                data-node-id="610:16861"
              >
                <Image src="/assets/fb.svg" alt="" width={16} height={16} unoptimized className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-[36px] rounded-[8px] border border-[#DDE7FF] bg-[rgba(192,202,227,0.1)] backdrop-blur-[12px] flex items-center justify-center hover:bg-white/20 transition-all"
                aria-label="LinkedIn"
                data-node-id="610:16862"
              >
                <Image src="/assets/in.svg" alt="" width={16} height={16} unoptimized className="size-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-[36px] rounded-[8px] border border-[#DDE7FF] bg-[rgba(192,202,227,0.1)] backdrop-blur-[12px] flex items-center justify-center hover:bg-white/20 transition-all"
                aria-label="Instagram"
                data-node-id="610:16863"
              >
                <Image src="/assets/ig.svg" alt="" width={16} height={16} unoptimized className="size-4" />
              </a>
              <a
                href="mailto:admin@pulseidegypt.com"
                className="size-[36px] rounded-[8px] border border-[#DDE7FF] bg-[rgba(192,202,227,0.1)] backdrop-blur-[12px] flex items-center justify-center hover:bg-white/20 transition-all"
                aria-label="Email admin"
                data-node-id="610:16864"
              >
                <Image src="/assets/tiktok.svg" alt="" width={16} height={16} unoptimized className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. Bottom Bar matching Figma Node 610:16865
           ========================================================================= */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full pt-1"
          data-node-id="610:16865"
          data-name="Bottom Bar: Copyright, Official Email, and Language Selector"
        >
          <div className="flex flex-wrap items-center gap-2 text-[13px] font-sans" data-node-id="610:16866">
            <span className="font-semibold text-white" data-node-id="610:16868">
              © 2026 PulseID
            </span>
            <span className="text-[#BFC7D3] tracking-[0.13px]" data-node-id="610:16870">
              •
            </span>
            <span className="text-[#BACFD7] font-normal" data-node-id="610:16872">
              All rights reserved.
            </span>
            <span className="text-[#BFC7D3] tracking-[0.13px]" data-node-id="610:16874">
              •
            </span>
            <a
              href="mailto:admin@pulseidegypt.com"
              className="text-[#34D8E1] hover:underline"
              data-node-id="610:16876"
            >
              admin@pulseidegypt.com
            </a>
          </div>

          <button
            type="button"
            className="border border-[rgba(112,120,131,0.3)] rounded-[8px] px-[16px] py-[8px] text-[13px] text-[#BFC7D3] hover:text-white hover:border-white/50 transition-colors font-sans cursor-pointer shrink-0"
            data-node-id="610:16877"
          >
            <span data-node-id="610:16878">EN / العربية</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
