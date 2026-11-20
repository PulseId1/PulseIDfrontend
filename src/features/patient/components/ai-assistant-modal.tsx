"use client";

import React, { useState, useRef } from "react";
import { X, Bot, Send, User } from "lucide-react";

interface AIAssistantModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  time: string;
}

export function AIAssistantModal({ isOpen, onClose }: AIAssistantModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "assistant",
      text: "Hello Sara! I am your PulseID AI Health Assistant. I have indexed your verified medical records, including your latest Fasting Blood Glucose (94 mg/dL), Lisinopril 10mg prescription, and allergy history (Penicillin). How can I assist your health journey today?",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const counterRef = useRef(2);

  if (!isOpen) return null;

  const quickPrompts = [
    "Are there any drug interactions between my medications?",
    "Explain my latest Fasting Glucose reading",
    "What precautions should I take with my Penicillin allergy?",
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    counterRef.current += 1;
    const userMsgId = `user-${counterRef.current}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: q,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Based on your clinical records, your health telemetry is well-controlled.";
      if (q.toLowerCase().includes("interaction") || q.toLowerCase().includes("medication")) {
        reply = "Zero contraindications detected! Lisinopril (ACE inhibitor) and Ventolin Inhaler (albuterol) have no significant pharmacokinetic conflict. Continue taking Lisinopril in the morning as prescribed.";
      } else if (q.toLowerCase().includes("glucose") || q.toLowerCase().includes("fasting")) {
        reply = "Your Fasting Blood Glucose of 94 mg/dL recorded on Aug 14 at Al Borg Diagnostics is within the optimal reference interval (70–99 mg/dL). No pre-diabetic elevation noted.";
      } else if (q.toLowerCase().includes("allergy") || q.toLowerCase().includes("penicillin")) {
        reply = "You have a documented Moderate allergy to Penicillin. Always alert physicians prior to receiving beta-lactam antibiotics (e.g. Amoxicillin, Ampicillin). Cephalosporins should also be evaluated with caution.";
      } else {
        reply = `I have cross-checked your question with your PulseID EHR passport (PID-8924-EGY). Your vitals, prescriptions, and lab panels remain safely coordinated with your primary care team.`;
      }

      counterRef.current += 1;
      const botMsgId = `bot-${counterRef.current}`;
      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          sender: "assistant",
          text: reply,
          time: "Just now",
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-2xl bg-white rounded-t-[28px] sm:rounded-[24px] h-[85vh] sm:h-[620px] max-h-[90vh] shadow-2xl border border-slate-100 flex flex-col animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 overflow-hidden">
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-2 mb-1 shrink-0" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#078BDE] shadow-xs shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#01091E] font-heading">
                  AI Health Assistant
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                  Verified EHR Sync
                </span>
              </div>
              <p className="text-xs text-slate-500 font-sans">
                Clinical guidance grounded strictly in your personal health passport.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 text-left">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[85%] ${
                m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`size-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  m.sender === "user"
                    ? "bg-[#078BDE] text-white"
                    : "bg-sky-50 border border-sky-200 text-[#00609B]"
                }`}
              >
                {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-[#078BDE] text-white rounded-tr-none shadow-sm"
                    : "bg-[#F8FAFC] border border-slate-200 text-slate-800 rounded-tl-none shadow-xs"
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`block text-[10px] mt-1 ${
                    m.sender === "user" ? "text-sky-100 text-right" : "text-slate-400"
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 mr-auto max-w-[85%] items-center">
              <div className="size-8 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-[#00609B] text-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-[#078BDE] animate-bounce" />
                <div className="size-2 rounded-full bg-[#078BDE] animate-bounce delay-100" />
                <div className="size-2 rounded-full bg-[#078BDE] animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-slate-100 bg-white flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(p)}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-[#078BDE] text-slate-600 text-[11px] font-medium shrink-0 transition-colors cursor-pointer text-left"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 bg-[#F8FAFC] flex gap-2">
          <input
            type="text"
            placeholder="Ask a question about your medical history, labs, or prescriptions..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#078BDE]/30 focus:border-[#078BDE]"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="px-4 py-2.5 rounded-xl bg-[#078BDE] hover:bg-[#0072C6] text-white disabled:opacity-50 transition-all flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
