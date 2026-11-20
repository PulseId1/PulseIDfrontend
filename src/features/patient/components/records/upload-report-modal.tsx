"use client";

import React from "react";

interface UploadReportModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function UploadReportModal({ isOpen, onClose }: UploadReportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg font-bold text-[#02307D]">Upload Diagnostic Report</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center flex flex-col items-center gap-3 bg-slate-50 w-full">
          <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-[#0080DF]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[#02307D]">Click or drag & drop diagnostic file</p>
            <p className="text-xs text-slate-500 mt-1">PDF, DICOM (.dcm), JPG, PNG up to 50MB</p>
          </div>
          <input type="file" className="hidden" id="report-upload-input" />
          <label
            htmlFor="report-upload-input"
            className="px-4 py-2 rounded-xl bg-[#0080DF] text-white text-xs font-semibold cursor-pointer shadow-sm hover:bg-[#0070C5]"
          >
            Select File
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
