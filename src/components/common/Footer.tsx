"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      className="w-full bg-[#01091e] py-12 px-4 sm:px-8 mt-auto flex justify-center"
      aria-label="Footer"
    >
      {/* Contained Centered Content Card matching Figma Node 353:10025 */}
      <div
        className="backdrop-blur-[12px] bg-[#02307d] border border-[rgba(52,216,225,0.25)] border-solid content-stretch flex flex-col items-center p-6 sm:p-[41px] relative max-w-[1280px] w-full rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(2,24,68,0.5)] overflow-hidden"
        data-node-id="353:10025"
        data-name="Contained Centered Content Card inspired by slothui reference"
      >
        {/* Shadow Overlay matching Figma Node 353:10026 */}
        <div
          className="absolute bg-[rgba(255,255,255,0)] inset-[-1px_-1px_-0.5px_-1px] shadow-[0px_25px_50px_-12px_rgba(2,24,68,0.5)] pointer-events-none rounded-[24px]"
          data-node-id="353:10026"
          data-name="Contained Centered Content Card inspired by slothui reference:shadow"
        />

        {/* Item 1: Centered Pulse ID Logo Lockup matching Figma Node 353:10027 */}
        <div className="relative shrink-0" data-node-id="353:10027" data-name="Link - Item 1: Centered Pulse ID Logo Lockup">
          <Link
            href="/"
            className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex gap-[12px] items-center relative size-full group"
          >
            <div
              className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] border-solid content-stretch flex items-center justify-center p-px relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 size-[40px] group-hover:bg-white/20 transition-colors"
              data-node-id="353:10028"
              data-name="Overlay+Border+Shadow"
            >
              <div className="h-[30px] relative shrink-0 w-[27px]" data-node-id="353:10029">
                <Image
                  src="/assets/doctor/imgGroup4.svg"
                  alt="PulseID Logo"
                  width={27}
                  height={30}
                  className="absolute block inset-0 max-w-none size-full object-contain"
                />
              </div>
            </div>
            <div className="content-stretch flex items-center relative shrink-0" data-node-id="353:10048" data-name="Container">
              <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="353:10049" data-name="Container">
                <div
                  className="break-words flex flex-col font-['Inter'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white text-center whitespace-nowrap"
                  data-node-id="353:10050"
                >
                  <p className="leading-normal">PULSEID</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Item 2: Horizontal Navigation Menu matching Figma Node 353:10051 */}
        <div className="relative shrink-0" data-node-id="353:10051" data-name="Item 2: Horizontal Navigation Menu:margin">
          <div className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex flex-col items-start pt-[28px] relative size-full">
            <nav
              className="content-center flex flex-wrap gap-6 sm:gap-[40px] items-center justify-center relative shrink-0"
              data-node-id="353:10052"
              data-name="Item 2: Horizontal Navigation Menu"
            >
              <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="353:10053" data-name="Link">
                <Link
                  href="/"
                  className="break-words flex flex-col font-['Inter'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white text-center whitespace-nowrap hover:text-[#078bde] transition-colors"
                  data-node-id="353:10054"
                >
                  <p className="leading-normal">Home</p>
                </Link>
              </div>

              <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="353:10055" data-name="Link">
                <Link
                  href="/#about"
                  className="break-words flex flex-col font-['Inter'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white text-center whitespace-nowrap hover:text-[#078bde] transition-colors"
                  data-node-id="353:10056"
                >
                  <p className="leading-normal">About Us</p>
                </Link>
              </div>

              <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="353:10057" data-name="Link">
                <Link
                  href="/#contact"
                  className="break-words flex flex-col font-['Inter'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white text-center whitespace-nowrap hover:text-[#078bde] transition-colors"
                  data-node-id="353:10058"
                >
                  <p className="leading-normal">Contact Us</p>
                </Link>
              </div>

              <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="353:10059" data-name="Link">
                <Link
                  href="/privacy"
                  className="break-words flex flex-col font-['Inter'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white text-center whitespace-nowrap hover:text-[#078bde] transition-colors"
                  data-node-id="353:10060"
                >
                  <p className="leading-normal">Privacy Policy</p>
                </Link>
              </div>

              <div className="content-stretch flex flex-col items-center relative shrink-0" data-node-id="353:10061" data-name="Link">
                <Link
                  href="/terms"
                  className="break-words flex flex-col font-['Inter'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white text-center whitespace-nowrap hover:text-[#078bde] transition-colors"
                  data-node-id="353:10062"
                >
                  <p className="leading-normal">Terms & Conditions</p>
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Item 3: Newsletter Box matching Figma Node 353:10063 */}
        <div className="relative shrink-0 w-full" data-node-id="353:10063" data-name="Item 3: Social Media Icon Row (Facebook, X, Instagram, LinkedIn):margin">
          <div className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex flex-col items-center px-0 md:px-[287px] py-[32px] relative size-full">
            <div
              className="backdrop-blur-[4px] bg-[rgba(1,11,31,0.6)] border border-[rgba(7,139,222,0.3)] border-solid content-stretch flex flex-col gap-[8px] items-center max-w-[576px] p-4 sm:p-[25px] relative rounded-[16px] shrink-0 w-full shadow-lg"
              data-node-id="353:10064"
              data-name="Item 3: Social Media Icon Row (Facebook, X, Instagram, LinkedIn)"
            >
              <div className="relative shrink-0 w-full" data-node-id="353:10065" data-name="Heading 3">
                <div className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex flex-col items-center relative size-full">
                  <div
                    className="break-words flex flex-col font-['Inter'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] sm:text-[20px] text-white text-center whitespace-nowrap"
                    data-node-id="353:10066"
                  >
                    <p className="leading-normal">Stay Updated with Pulse ID</p>
                  </div>
                </div>
              </div>

              <div className="max-w-[448px] relative shrink-0 w-full" data-node-id="353:10067" data-name="Container">
                <div className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex flex-col items-center max-w-[inherit] relative size-full">
                  <div
                    className="break-words flex flex-col font-['Inter'] font-normal justify-center not-italic relative shrink-0 text-[13px] sm:text-[14px] text-[#bacfd7] text-center"
                    data-node-id="353:10068"
                  >
                    <p className="leading-normal mb-0">Get the latest announcements, clinical protocol releases, and</p>
                    <p className="leading-normal">security advisories sent directly to your inbox.</p>
                  </div>
                </div>
              </div>

              {/* Form matching Figma Node 353:10069 */}
              <div className="max-w-[448px] relative shrink-0 w-full" data-node-id="353:10069" data-name="Form">
                {subscribed ? (
                  <div className="pt-[12px] pb-[4px] text-center">
                    <p className="text-[14px] font-semibold text-[#078bde] bg-[#078bde]/10 border border-[#078bde]/30 rounded-[8px] py-[10px] px-4">
                      ✓ Thank you for subscribing to PulseID updates!
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex gap-[10px] items-center max-w-[inherit] pt-[12px] relative size-full"
                  >
                    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-0 relative" data-node-id="353:10070" data-name="Container">
                      <div
                        className="border border-[rgba(255,255,255,0.2)] border-solid content-stretch flex items-center overflow-hidden pb-[13px] pl-[41px] pr-[17px] pt-[12px] relative rounded-[8px] shrink-0 w-full bg-[#021844] shadow-[inset_0px_2px_4px_1px_rgba(0,0,0,0.05)] focus-within:border-[#078bde] transition-colors"
                        data-node-id="353:10071"
                        data-name="Input"
                      >
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your work or clinical email"
                          className="bg-transparent border-0 outline-none text-[14px] text-white placeholder-[#727272] font-['Inter'] font-normal w-full"
                        />
                      </div>
                      <div
                        className="-translate-y-1/2 absolute h-[12px] left-[14px] top-1/2 w-[15px] pointer-events-none"
                        data-node-id="353:10074"
                        data-name="Container"
                      >
                        <Image
                          src="/assets/doctor/imgContainer1.svg"
                          alt="Email icon"
                          width={15}
                          height={12}
                          className="absolute block inset-0 max-w-none size-full"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#078bde] content-stretch flex gap-[6px] items-center justify-center px-[20px] py-[10px] relative rounded-[8px] shrink-0 hover:bg-[#0079c3] transition-colors cursor-pointer shadow-[0px_10px_15px_-3px_rgba(7,139,222,0.3),0px_4px_6px_-4px_rgba(7,139,222,0.3)]"
                      data-node-id="353:10076"
                      data-name="Button"
                    >
                      <span className="font-['Inter'] font-bold text-[14px] text-white whitespace-nowrap leading-normal">
                        Subscribe
                      </span>
                      <div className="relative shrink-0 size-[10.667px]" data-node-id="353:10080" data-name="Container">
                        <Image
                          src="/assets/doctor/imgContainer.svg"
                          alt="Arrow"
                          width={11}
                          height={11}
                          className="absolute block inset-0 max-w-none size-full"
                        />
                      </div>
                    </button>
                  </form>
                )}
              </div>

              <div className="relative shrink-0 w-full" data-node-id="353:10082" data-name="Container">
                <div className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
                  <div
                    className="break-words flex flex-col font-['Inter'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-[#8b8b8b] text-center whitespace-nowrap"
                    data-node-id="353:10083"
                  >
                    <p className="leading-normal">We respect your privacy. Unsubscribe at any time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Item 4: Social Media Icon Row matching Figma Node 353:10084 */}
        <div className="relative shrink-0" data-node-id="353:10084" data-name="Margin">
          <div className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex flex-col items-start pt-[32px] relative size-full">
            <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0" data-node-id="353:10085" data-name="Container">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] border-solid content-stretch flex items-center justify-center p-px relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 size-[40px] hover:bg-white/20 transition-colors"
                data-node-id="353:10086"
                data-name="Link - Facebook"
              >
                <div className="relative shrink-0 size-[16px]" data-node-id="353:10087" data-name="SVG">
                  <Image
                    src="/assets/doctor/imgSvg.svg"
                    alt="Facebook"
                    width={16}
                    height={16}
                    className="absolute block inset-0 max-w-none size-full"
                  />
                </div>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] border-solid content-stretch flex items-center justify-center p-px relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 size-[40px] hover:bg-white/20 transition-colors"
                data-node-id="353:10089"
                data-name="Link - X (Twitter)"
              >
                <div className="relative shrink-0 size-[16px]" data-node-id="353:10090" data-name="SVG">
                  <Image
                    src="/assets/doctor/imgSvg1.svg"
                    alt="X (Twitter)"
                    width={16}
                    height={16}
                    className="absolute block inset-0 max-w-none size-full"
                  />
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] border-solid content-stretch flex items-center justify-center p-px relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 size-[40px] hover:bg-white/20 transition-colors"
                data-node-id="353:10092"
                data-name="Link - Instagram"
              >
                <div className="relative shrink-0 size-[16px]" data-node-id="353:10093" data-name="SVG">
                  <Image
                    src="/assets/doctor/imgSvg2.svg"
                    alt="Instagram"
                    width={16}
                    height={16}
                    className="absolute block inset-0 max-w-none size-full"
                  />
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] border-solid content-stretch flex items-center justify-center p-px relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 size-[40px] hover:bg-white/20 transition-colors"
                data-node-id="353:10095"
                data-name="LinkedIn"
              >
                <div className="relative shrink-0 size-[16px]" data-node-id="353:10096" data-name="SVG">
                  <Image
                    src="/assets/doctor/imgSvg3.svg"
                    alt="LinkedIn"
                    width={16}
                    height={16}
                    className="absolute block inset-0 max-w-none size-full"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
