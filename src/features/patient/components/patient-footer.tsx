"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function PatientFooter() {
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
      className="w-full bg-[#02307D] backdrop-blur-[12px] border-t border-[rgba(52,216,225,0.25)] py-[41px] px-4 sm:px-8 flex flex-col items-center shadow-[0px_25px_50px_-12px_rgba(2,24,68,0.5)]"
      data-node-id="299:5108"
    >
      <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center">
        {/* Item 1: Centered Logo Lockup matching Figma Node 299:5110 */}
        <Link
          href="/patient"
          className="flex items-center gap-[12px] focus:outline-none focus:ring-2 focus:ring-[#078BDE] rounded-lg"
          data-node-id="299:5110"
        >
          <div
            className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] size-[40px] flex items-center justify-center p-px shrink-0"
            data-node-id="299:5111"
          >
            <div className="w-[27px] h-[30px] relative shrink-0" data-node-id="299:5112">
              <Image
                src="/assets/patient-home/footer-logo.svg"
                alt="PulseID"
                width={27}
                height={30}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <span
            className="font-heading font-bold text-[20px] text-white text-center leading-normal tracking-wide"
            data-node-id="299:5133"
          >
            PULSEID
          </span>
        </Link>

        {/* Item 2: Horizontal Navigation Menu matching Figma Node 299:5134 / 299:5135 */}
        <nav
          aria-label="Footer Navigation"
          className="pt-[28px] flex flex-wrap gap-[24px] sm:gap-[40px] items-center justify-center"
          data-node-id="299:5135"
        >
          <Link
            href="/patient"
            className="font-sans font-medium text-[16px] text-white hover:text-[#078BDE] transition-colors"
            data-node-id="299:5136"
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="font-sans font-medium text-[16px] text-white hover:text-[#078BDE] transition-colors"
            data-node-id="299:5138"
          >
            About Us
          </Link>
          <Link
            href="/#contact"
            className="font-sans font-medium text-[16px] text-white hover:text-[#078BDE] transition-colors"
            data-node-id="299:5140"
          >
            Contact Us
          </Link>
          <Link
            href="/privacy"
            className="font-sans font-medium text-[16px] text-white hover:text-[#078BDE] transition-colors"
            data-node-id="299:5142"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="font-sans font-medium text-[16px] text-white hover:text-[#078BDE] transition-colors"
            data-node-id="299:5144"
          >
            Terms & Conditions
          </Link>
        </nav>

        {/* Item 3: Newsletter Form Box matching Figma Node 299:5146 / 299:5147 */}
        <div className="w-full flex justify-center py-[32px]" data-node-id="299:5146">
          <div
            className="bg-[rgba(1,11,31,0.6)] backdrop-blur-[4px] border border-[rgba(7,139,222,0.3)] rounded-[16px] p-[25px] max-w-[576px] w-full flex flex-col gap-[8px] items-center"
            data-node-id="299:5147"
          >
            <h3
              className="font-heading font-bold text-[20px] text-white text-center leading-normal"
              data-node-id="299:5149"
            >
              Stay Updated with Pulse ID
            </h3>

            <p
              className="font-sans font-normal text-[14px] text-[#BACFD7] text-center leading-normal max-w-[448px]"
              data-node-id="299:5151"
            >
              Get the latest announcements, clinical protocol releases, and security advisories sent directly to your inbox.
            </p>

            {subscribed ? (
              <div className="w-full max-w-[448px] py-3 text-center text-emerald-400 text-[14px] font-semibold">
                ✓ Thank you for subscribing to PulseID clinical updates!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="w-full max-w-[448px] flex flex-col sm:flex-row gap-[10px] items-center pt-[12px]"
                data-node-id="299:5152"
              >
                <div className="relative flex-1 w-full" data-node-id="299:5153">
                  <div className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[15px] h-[12px] pointer-events-none">
                    <Image
                      src="/assets/patient-home/footer-mail.svg"
                      alt=""
                      width={15}
                      height={12}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work or clinical email"
                    className="w-full bg-[#021844] border border-[rgba(255,255,255,0.2)] rounded-[8px] pl-[41px] pr-[17px] py-[12px] text-white placeholder:text-[#727272] text-[14px] font-sans focus:outline-none focus:border-[#078BDE] shadow-inner"
                    data-node-id="299:5154"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#078BDE] hover:bg-[#0677BE] rounded-[8px] px-[20px] py-[10px] text-white font-heading font-bold text-[14px] flex items-center justify-center gap-[6px] shrink-0 shadow-[0px_10px_15px_-3px_rgba(7,139,222,0.3),0px_4px_6px_-4px_rgba(7,139,222,0.3)] transition-colors cursor-pointer"
                  data-node-id="299:5159"
                >
                  <span data-node-id="299:5162">Subscribe</span>
                  <div className="size-[11px] relative shrink-0" data-node-id="299:5163">
                    <Image
                      src="/assets/patient-home/footer-send-arrow.svg"
                      alt=""
                      width={11}
                      height={11}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                </button>
              </form>
            )}

            <p
              className="font-sans font-normal text-[11px] text-[#8B8B8B] text-center pt-[4px] leading-normal"
              data-node-id="299:5166"
            >
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Item 4: Social Media Icons matching Figma Node 299:5167 / 299:5168 */}
        <div className="pt-[16px] flex items-center justify-center gap-[16px]" data-node-id="299:5168">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] rounded-[12px] size-[40px] flex items-center justify-center p-px shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[rgba(142,191,222,0.4)] transition-colors"
            aria-label="Facebook"
            data-node-id="299:5169"
          >
            <div className="size-[16px] relative shrink-0">
              <Image
                src="/assets/patient-home/social-fb.svg"
                alt="Facebook"
                width={16}
                height={16}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
          </a>

          {/* Twitter / X */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] rounded-[12px] size-[40px] flex items-center justify-center p-px shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[rgba(142,191,222,0.4)] transition-colors"
            aria-label="X (Twitter)"
            data-node-id="299:5172"
          >
            <div className="size-[16px] relative shrink-0">
              <Image
                src="/assets/patient-home/social-x.svg"
                alt="X"
                width={16}
                height={16}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] rounded-[12px] size-[40px] flex items-center justify-center p-px shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[rgba(142,191,222,0.4)] transition-colors"
            aria-label="Instagram"
            data-node-id="299:5175"
          >
            <div className="size-[16px] relative shrink-0">
              <Image
                src="/assets/patient-home/social-insta.svg"
                alt="Instagram"
                width={16}
                height={16}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] rounded-[12px] size-[40px] flex items-center justify-center p-px shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[rgba(142,191,222,0.4)] transition-colors"
            aria-label="LinkedIn"
            data-node-id="299:5178"
          >
            <div className="size-[16px] relative shrink-0">
              <Image
                src="/assets/patient-home/social-linkedin.svg"
                alt="LinkedIn"
                width={16}
                height={16}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
