"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckIcon, LockIcon } from "./icons";

export function BiometricTab() {
  const [bioFingerScanning, setBioFingerScanning] = useState(false);
  const [bioFingerVerified, setBioFingerVerified] = useState(false);
  const [bioFaceScanning, setBioFaceScanning] = useState(false);
  const [bioFaceVerified, setBioFaceVerified] = useState(false);

  const handleTapFingerprint = () => {
    setBioFingerScanning(true);
    setTimeout(() => {
      setBioFingerScanning(false);
      setBioFingerVerified(true);
    }, 1000);
  };

  const handleTapFace = () => {
    setBioFaceScanning(true);
    setTimeout(() => {
      setBioFaceScanning(false);
      setBioFaceVerified(true);
    }, 1100);
  };

  return (
    <div className="w-full" data-node-id="665:4879">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 Columns: 2 Sensor Cards (Figma 665:4880) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Sign in to PulseID / Fingerprint (Figma 665:4881) */}
          <div
            onClick={handleTapFingerprint}
            className="bg-white border-2 border-[#008fe5]/40 rounded-[20px] p-5 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[420px] cursor-pointer group"
            data-node-id="665:4881"
          >
            <div>
              <h4 className="font-sans font-bold text-[16px] text-[#01091e]">
                Sign in to PulseID
              </h4>
              <p className="text-[12px] text-[#727272] mt-0.5">Tap the sensor</p>
            </div>

            {/* Sensor Circle (Figma 665:4890) */}
            <div className="my-5 relative size-[140px] rounded-full border-2 border-[#078bde] border-dashed flex items-center justify-center bg-blue-50/30 group-hover:bg-blue-50/70 transition-colors p-[14px]">
              {bioFingerScanning && (
                <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-ping opacity-75" />
              )}
              <div className="relative size-[76px]">
                <Image
                  src="/assets/figma/fingerprint-sensor.svg"
                  alt="Fingerprint sensor"
                  width={76}
                  height={76}
                  className="size-full"
                  unoptimized
                />
              </div>
            </div>

            <div className="text-left w-full text-[11px] text-[#01091e] border-t border-slate-100 pt-3">
              <div className="mb-2 text-center">
                <span
                  className={`inline-block font-bold text-[12px] px-3 py-1 rounded-full ${
                    bioFingerVerified
                      ? "bg-emerald-100 text-emerald-800"
                      : bioFingerScanning
                      ? "bg-cyan-100 text-cyan-800 animate-pulse"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {bioFingerVerified ? (
                    <span className="inline-flex items-center gap-1">
                      <CheckIcon className="size-3.5" />
                      <span>Fingerprint verified</span>
                    </span>
                  ) : bioFingerScanning ? (
                    "Scanning fingerprint..."
                  ) : (
                    "Ready to scan"
                  )}
                </span>
              </div>
              <p className="leading-snug">
                <span className="font-bold">Data used: </span>
                <span className="text-[#41474f]">
                  template in phone&apos;s secure hardware enclave &rarr; signed challenge. No raw fingerprint image reaches PulseID.
                </span>
              </p>
            </div>
          </div>

          {/* Card 2: Face verification (Figma 665:4904) */}
          <div
            onClick={handleTapFace}
            className="bg-white border-2 border-[#008fe5]/40 rounded-[20px] p-5 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[420px] cursor-pointer group"
            data-node-id="665:4904"
          >
            <div>
              <h4 className="font-sans font-bold text-[16px] text-[#01091e]">
                Face verification
              </h4>
              <p className="text-[12px] text-[#727272] mt-0.5">Tap the frame</p>
            </div>

            {/* Face Frame (Figma 665:4913) */}
            <div className="my-5 relative w-[120px] h-[160px] rounded-[38px] border-2 border-[#078bde] border-dashed flex items-center justify-center bg-blue-50/30 group-hover:bg-blue-50/70 transition-colors overflow-hidden">
              {bioFaceScanning && (
                <div className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-[scanLaser_1.2s_ease-in-out_infinite]" />
              )}
              <div className="grid grid-cols-4 gap-2 opacity-60">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="size-1 rounded-full bg-[#078bde]" />
                ))}
              </div>
            </div>

            <div className="text-left w-full text-[11px] text-[#01091e] border-t border-slate-100 pt-3">
              <div className="mb-2 text-center">
                <span
                  className={`inline-block font-bold text-[12px] px-3 py-1 rounded-full ${
                    bioFaceVerified
                      ? "bg-emerald-100 text-emerald-800"
                      : bioFaceScanning
                      ? "bg-cyan-100 text-cyan-800 animate-pulse"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {bioFaceVerified ? (
                    <span className="inline-flex items-center gap-1">
                      <CheckIcon className="size-3.5" />
                      <span>Face verified</span>
                    </span>
                  ) : bioFaceScanning ? (
                    "Scanning landmarks..."
                  ) : (
                    "Ready to scan"
                  )}
                </span>
              </div>
              <p className="leading-snug">
                <span className="font-bold">Data used: </span>
                <span className="text-[#41474f]">
                  depth sensor + infrared landmarks on device. Biometric template never leaves device boundary.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Security & Cryptographic Privacy Architecture */}
        <div className="lg:col-span-6 bg-white border border-[#dde7ff] rounded-[20px] p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="font-bold text-[16px] text-[#02307d] block">
                Cryptographic Hardware Attestation
              </span>
              <span className="text-[12px] text-slate-500">
                FIDO2 / WebAuthn Level 3 Compliance
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                bioFingerVerified || bioFaceVerified
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {bioFingerVerified || bioFaceVerified ? (
                <span className="inline-flex items-center gap-1">
                  <CheckIcon className="size-3.5" />
                  <span>Identity verified</span>
                </span>
              ) : (
                "Identity pending"
              )}
            </span>
          </div>

          <div className="space-y-3 text-[12.5px] text-slate-700">
            <div className="p-3 bg-[#f8fbfe] border border-slate-200 rounded-xl">
              <span className="font-bold text-slate-900 block mb-1">
                Zero Biometric Data Stored on PulseID Cloud
              </span>
              <p className="text-slate-600 text-[12px] leading-relaxed">
                PulseID utilizes asymmetric public-key cryptography. The private key never leaves the device&apos;s Secure Enclave / TPM chip.
              </p>
            </div>

            <div className="p-3 bg-[#f8fbfe] border border-slate-200 rounded-xl">
              <span className="font-bold text-slate-900 block mb-1">
                Instant Verification Speed (&lt; 280ms)
              </span>
              <p className="text-slate-600 text-[12px] leading-relaxed">
                Emergency responders and medical staff can authenticate conscious or unconscious patients in trauma triage within seconds.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11.5px] text-slate-500">
            <span>Hardware Token: Secure Enclave v4</span>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#078bde] font-bold">
              <LockIcon className="size-3.5" />
              <span>AES-256 GCM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
