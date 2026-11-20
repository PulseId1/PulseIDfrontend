"use client";

import React, { useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCw, Contrast, Download } from "lucide-react";

interface DICOMViewerModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly studyId?: string;
}

export function DICOMViewerModal({
  isOpen,
  onClose,
  studyId = "XR-2024-884",
}: DICOMViewerModalProps) {
  const [zoom, setZoom] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [rotation, setRotation] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#090D16] border border-slate-800 rounded-2xl flex flex-col h-[90vh] max-h-[800px] overflow-hidden shadow-2xl text-white">
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-[#0F1422]">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-sky-950/80 border border-sky-800 flex items-center justify-center text-[#078BDE] text-xs font-bold">
              RX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-wide">
                  Chest PA Digital Radiograph (X-Ray)
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-[10px] font-mono">
                  DICOM v3.0 Certified
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Study ID: {studyId} • Al Borg Diagnostics • Radiologist: Dr. Nader Fouad
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                alert(`Downloaded full diagnostic DICOM dataset (${studyId}.dcm) - 42 MB`);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export DICOM</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Canvas Area */}
        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden select-none">
          {/* Diagnostic Overlay HUD */}
          <div className="absolute top-4 left-4 z-10 font-mono text-[11px] text-emerald-400/80 space-y-1 pointer-events-none">
            <p>PULSEID DIAGNOSTIC VIEWER</p>
            <p>PATIENT: SARA MAHMOUD (PID-8924-EGY)</p>
            <p>KVp: 120 | mA: 320 | EXP: 12ms</p>
            <p>ZOOM: {zoom}% | ROT: {rotation}° | BRIGHTNESS: {brightness}%</p>
          </div>

          <div className="absolute top-4 right-4 z-10 font-mono text-[11px] text-slate-400 text-right space-y-1 pointer-events-none">
            <p className="text-amber-400/90">CLINICAL IMPRESSION: NORMAL</p>
            <p>No acute focal infiltrates</p>
            <p>Cardiothoracic ratio: normal</p>
          </div>

          {/* X-Ray Image Preview */}
          <div
            className="transition-transform duration-100 ease-out flex items-center justify-center"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              filter: `brightness(${brightness}%) contrast(1.1)`,
            }}
          >
            {/* SVG Illustration of Clinical Chest Radiograph */}
            <svg
              className="w-[340px] sm:w-[480px] h-[380px] sm:h-[520px] max-w-full drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              viewBox="0 0 400 450"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="400" height="450" fill="#04060A" />
              <path
                d="M100 80 Q200 40 300 80 Q360 200 350 400 Q200 420 50 400 Q40 200 100 80 Z"
                fill="#121824"
                stroke="#2B384E"
                strokeWidth="1.5"
                opacity="0.8"
              />
              <path d="M120 90 Q200 110 280 90" stroke="#8CA0BA" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
              <line x1="200" y1="90" x2="200" y2="400" stroke="#7A8CA3" strokeWidth="12" strokeDasharray="14 4" opacity="0.5" />
              <path d="M130 140 Q200 160 270 140" stroke="#52647C" strokeWidth="4" fill="none" opacity="0.5" />
              <path d="M110 180 Q200 210 290 180" stroke="#52647C" strokeWidth="5" fill="none" opacity="0.5" />
              <path d="M95 230 Q200 270 305 230" stroke="#52647C" strokeWidth="5.5" fill="none" opacity="0.5" />
              <path d="M85 290 Q200 340 315 290" stroke="#52647C" strokeWidth="5" fill="none" opacity="0.5" />
              <path d="M80 350 Q200 400 320 350" stroke="#52647C" strokeWidth="4" fill="none" opacity="0.4" />
              <path d="M120 130 C120 130 90 260 130 330 C160 330 180 270 170 140 Z" fill="#020305" opacity="0.9" />
              <path d="M280 130 C280 130 310 260 270 330 C240 330 220 270 230 140 Z" fill="#020305" opacity="0.9" />
              <path
                d="M170 240 Q210 230 240 270 Q230 350 160 340 Q150 280 170 240 Z"
                fill="#344359"
                opacity="0.75"
              />
              <path d="M60 380 Q140 340 200 360 Q260 340 340 380" stroke="#667B96" strokeWidth="4" fill="none" opacity="0.7" />
            </svg>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="px-5 py-3 border-t border-slate-800 bg-[#0F1422] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(z + 20, 200))}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(z - 20, 60))}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Rotate 90°"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setBrightness((b) => (b === 100 ? 140 : b === 140 ? 70 : 100))}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Adjust Windowing / Contrast"
            >
              <Contrast className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setZoom(100);
                setRotation(0);
                setBrightness(100);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-[11px] transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>

          <span className="text-slate-400 text-[11px] font-mono hidden sm:inline">
            DICOM Standard Lossless 16-bit Grayscale
          </span>
        </div>
      </div>
    </div>
  );
}
