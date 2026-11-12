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
      className="bg-[#02307d] content-stretch flex flex-col gap-[28px] items-center overflow-clip p-[40px] relative shrink-0 w-full"
      data-node-id="353:10951"
      data-name="Website footer"
    >
      {/* Brand logo & text matching Figma Node 353:10952 */}
      <div
        className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0"
        data-node-id="353:10952"
        data-name="Pulse ID"
      >
        <Link href="/" className="flex items-center gap-[10px] group">
          <div className="h-[30px] relative shrink-0 w-[32px]" data-node-id="353:10953" data-name="Brand mark">
            <Image
              src="/assets/footer/brandMark.svg"
              alt="PULSEID Brand Mark"
              width={32}
              height={30}
              className="absolute block inset-0 max-w-none size-full object-contain"
              priority
            />
          </div>
          <p
            className="break-words font-['Inter'] font-bold leading-normal not-italic relative shrink-0 text-[19px] text-white whitespace-nowrap"
            data-node-id="353:10972"
          >
            PULSEID
          </p>
        </Link>
      </div>

      {/* Footer links matching Figma Node 353:10973 */}
      <nav
        className="break-words content-start flex flex-wrap font-['Inter'] font-normal gap-[16px_40px] items-start justify-center leading-normal not-italic overflow-clip relative shrink-0 text-[14px] text-white w-full whitespace-nowrap"
        data-node-id="353:10973"
        data-name="Footer links"
        aria-label="Footer Navigation"
      >
        <Link href="/" className="relative shrink-0 hover:text-sky-300 transition-colors" data-node-id="353:10974">
          Home
        </Link>
        <Link href="/#about" className="relative shrink-0 hover:text-sky-300 transition-colors" data-node-id="353:10975">
          About Us
        </Link>
        <Link href="/#contact" className="relative shrink-0 hover:text-sky-300 transition-colors" data-node-id="353:10976">
          Contact Us
        </Link>
        <Link href="/privacy" className="relative shrink-0 hover:text-sky-300 transition-colors" data-node-id="353:10977">
          Privacy Policy
        </Link>
        <Link href="/terms" className="relative shrink-0 hover:text-sky-300 transition-colors" data-node-id="353:10978">
          Terms & Conditions
        </Link>
      </nav>

      {/* Newsletter box matching Figma Node 353:10979 */}
      <div
        className="bg-[#011c49] border border-[rgba(7,139,222,0.3)] border-solid content-stretch flex flex-col gap-[10px] items-center overflow-clip p-[24px] relative rounded-[16px] shrink-0 max-w-[576px] w-full"
        data-node-id="353:10979"
        data-name="Newsletter"
      >
        <p
          className="break-words font-['Inter'] font-bold leading-normal not-italic relative shrink-0 text-[19px] text-white text-center w-full"
          data-node-id="353:10980"
        >
          Stay Updated with Pulse ID
        </p>
        <p
          className="break-words font-['Inter'] font-normal leading-[1.5] not-italic relative shrink-0 text-[13px] text-[#bacfd7] text-center w-full"
          data-node-id="353:10981"
        >
          Get the latest announcements, clinical protocol releases, and security advisories sent directly to your inbox.
        </p>

        {subscribed ? (
          <div className="w-full py-2.5 text-center">
            <p className="text-[13px] font-semibold text-sky-400 bg-sky-500/10 border border-sky-400/30 rounded-[8px] py-2 px-4">
              ✓ Thank you for subscribing to PulseID updates!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="content-stretch flex flex-col sm:flex-row gap-[10px] items-center overflow-clip relative shrink-0 w-full"
            data-node-id="353:10982"
            data-name="Subscribe form"
          >
            <div
              className="border border-[rgba(186,207,215,0.3)] border-solid content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-[44px] min-w-0 overflow-clip p-[12px] relative rounded-[8px] w-full bg-transparent focus-within:border-[#078bde] transition-colors"
              data-node-id="353:10983"
              data-name="Email field"
            >
              <div className="relative shrink-0 size-[16px]" data-node-id="353:10984" data-name="mail">
                <Image
                  src="/assets/footer/mail.svg"
                  alt="Mail icon"
                  width={16}
                  height={16}
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work or clinical email"
                className="bg-transparent border-none outline-none font-['Inter'] font-normal leading-[1.4] text-[12px] text-white placeholder-[#bacfd7] w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-[#078bde] border border-[#078bde] border-solid content-stretch flex gap-[8px] items-center justify-center min-h-[44px] overflow-clip px-[16px] py-[10px] relative rounded-[8px] shrink-0 hover:bg-[#0079c3] cursor-pointer transition-colors w-full sm:w-auto"
              data-node-id="353:10987"
              data-name="Action"
            >
              <div className="relative shrink-0 size-[16px]" data-node-id="353:10988" data-name="arrow-right">
                <Image
                  src="/assets/footer/arrowRight.svg"
                  alt="Arrow icon"
                  width={16}
                  height={16}
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
              <p
                className="break-words font-['Inter'] font-semibold leading-normal not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap"
                data-node-id="353:10990"
              >
                Subscribe
              </p>
            </button>
          </form>
        )}

        <p
          className="break-words font-['Inter'] font-normal leading-[1.5] not-italic relative shrink-0 text-[11px] text-[#bacfd7] text-center w-full"
          data-node-id="353:10991"
        >
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>

      {/* Social links matching Figma Node 353:10992 */}
      <div
        className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0"
        data-node-id="353:10992"
        data-name="Social links"
      >
        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="bg-[rgba(142,191,222,0.2)] content-stretch flex items-center justify-center overflow-clip relative rounded-[10px] shrink-0 size-[40px] hover:bg-white/20 transition-colors"
          data-node-id="353:10993"
          data-name="Social link"
        >
          <div className="relative shrink-0 size-[17px]" data-node-id="353:10994" data-name="facebook">
            <Image
              src="/assets/footer/facebook.svg"
              alt="Facebook"
              width={17}
              height={17}
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
          className="bg-[rgba(142,191,222,0.2)] content-stretch flex items-center justify-center overflow-clip relative rounded-[10px] shrink-0 size-[40px] hover:bg-white/20 transition-colors"
          data-node-id="353:10996"
          data-name="Social link"
        >
          <p
            className="break-words font-['Inter'] font-normal leading-normal not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap"
            data-node-id="353:10997"
          >
            𝕏
          </p>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="bg-[rgba(142,191,222,0.2)] content-stretch flex items-center justify-center overflow-clip relative rounded-[10px] shrink-0 size-[40px] hover:bg-white/20 transition-colors"
          data-node-id="353:10998"
          data-name="Social link"
        >
          <div className="relative shrink-0 size-[17px]" data-node-id="353:10999" data-name="instagram">
            <Image
              src="/assets/footer/instagram.svg"
              alt="Instagram"
              width={17}
              height={17}
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
          className="bg-[rgba(142,191,222,0.2)] content-stretch flex items-center justify-center overflow-clip relative rounded-[10px] shrink-0 size-[40px] hover:bg-white/20 transition-colors"
          data-node-id="353:11001"
          data-name="Social link"
        >
          <div className="relative shrink-0 size-[17px]" data-node-id="353:11002" data-name="linkedin">
            <Image
              src="/assets/footer/linkedin.svg"
              alt="LinkedIn"
              width={17}
              height={17}
              className="absolute block inset-0 max-w-none size-full"
            />
          </div>
        </a>
      </div>
    </footer>
  );
}
