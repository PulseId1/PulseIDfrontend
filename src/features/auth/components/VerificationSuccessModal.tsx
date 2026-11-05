"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthRole } from "../types/auth";

interface VerificationSuccessModalProps {
  isOpen?: boolean;
  role?: AuthRole;
  phone?: string;
  onClose?: () => void;
}

export function VerificationSuccessModal({
  isOpen = true,
  role: propRole,
  phone: propPhone,
  onClose,
}: VerificationSuccessModalProps) {
  const {
    role: contextRole,
    phoneNumber,
    countryCode,
    registrationData,
    resetAuth,
    language,
    t,
  } = useAuth();

  if (!isOpen) return null;

  const activeRole = propRole || contextRole;
  const roleName = t.roleSelection.roles[activeRole]?.title || activeRole;
  const activePhone = propPhone || phoneNumber || "01000000100000";
  const displayName =
    registrationData?.fullName ||
    (language === "ar" ? "مستخدم PulseID" : "Healthcare User");

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      resetAuth();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-5 text-center shadow-2xl border border-slate-100"
        >
          {/* Animated Success Checkmark */}
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-md">
            <svg
              className="w-7 h-7 stroke-[2.5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="space-y-1">
            <Badge variant="emerald" size="md">
              {language === "ar"
                ? "تم التحقق بنجاح (محاكاة)"
                : "Verified Successfully (Simulation)"}
            </Badge>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#002D62]">
              {language === "ar"
                ? "اكتمل التحقق بنجاح"
                : "Authentication Complete"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {language === "ar"
                ? `مرحبًا بك، ${displayName}`
                : `Welcome, ${displayName}`}
            </p>
          </div>

          {/* Verified Details Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-start">
            <div className="flex justify-between items-center py-1 border-b border-slate-200/70">
              <span className="text-slate-500">
                {language === "ar" ? "نوع الحساب:" : "Account Role:"}
              </span>
              <span className="font-bold text-[#0080DF]">{roleName}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200/70">
              <span className="text-slate-500">
                {language === "ar" ? "الهاتف الموثق:" : "Verified Phone:"}
              </span>
              <span className="font-mono text-slate-800 font-semibold dir-ltr">
                {countryCode ? `+${countryCode} ` : "+20 "}{activePhone}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">
                {language === "ar" ? "حالة الأمان:" : "Security Status:"}
              </span>
              <span className="text-emerald-600 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {language === "ar"
                  ? "جلسة مصادقة تجريبية نشطة"
                  : "Active Demo Session"}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            {language === "ar"
              ? "تمت محاكاة عملية المصادقة بالكامل في واجهة المستخدم دون أي إرسال للبيانات إلى خادم خارجي."
              : "Authentication flow completed successfully in UI simulation mode without connecting to live backend endpoints."}
          </p>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <Button
              variant="primary"
              size="md"
              className="w-full h-11 text-xs rounded-xl bg-[#0080DF] hover:bg-[#0073C8]"
              onClick={handleClose}
            >
              {language === "ar" ? "العودة للبدء" : "Done / Restart Demo"}
            </Button>

            <Link href="/" className="block">
              <Button variant="ghost" size="md" className="w-full text-xs">
                {language === "ar" ? "الصفحة الرئيسية" : "Return to Launch Landing Page"}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
