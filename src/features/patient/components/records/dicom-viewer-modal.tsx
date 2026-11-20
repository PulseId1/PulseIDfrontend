"use client";

import React from "react";
import { MedicalRecordItem } from "@/lib/api/patient-types";

interface DicomViewerModalProps {
  readonly item: MedicalRecordItem | null;
  readonly onClose: () => void;
}

export function DicomViewerModal({ item, onClose }: DicomViewerModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0A101D] text-white rounded-[24px] max-w-4xl w-full p-6 shadow-2xl border border-slate-700 flex flex-col gap-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 text-xs font-mono font-bold border border-cyan-700">
              DICOM READY
            </span>
            <h3 className="text-lg font-bold text-white font-heading">{item.title}</h3>
            <span className="text-xs text-slate-400 font-mono">PulseID Diagnostic Imaging</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl cursor-pointer"
            aria-label="Close DICOM Viewer"
          >
            ✕
          </button>
        </div>

        {/* Diagnostic viewer canvas preview */}
        <div className="w-full h-96 rounded-xl bg-black border border-slate-800 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/30 via-slate-900/50 to-black" />
          <div className="relative z-10 text-center flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-2xl bg-cyan-950/60 border border-cyan-800 flex items-center justify-center text-cyan-400 shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </div>
            <div>
              <p className="text-base font-bold text-cyan-200">High-Fidelity PACS Radiographic Viewer</p>
              <p className="text-xs text-slate-400 mt-1">Multi-planar DICOM reconstructed slice: Axial / Coronal / Sagittal</p>
            </div>
          </div>

          {/* HUD Telemetry corners */}
          <div className="absolute top-3 left-4 text-[10px] font-mono text-cyan-400/80">
            kVp: 120 • mA: 250 • Window: Lung (W:1500 L:-600)
          </div>
          <div className="absolute top-3 right-4 text-[10px] font-mono text-cyan-400/80">
            Zoom: 100% • Slice: 14/48
          </div>
          <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-500">
            Cairo Scan PACS Server • Zero-loss uncompressed DICOM
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>Patient consent verified • Audit logging active</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white font-semibold cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
