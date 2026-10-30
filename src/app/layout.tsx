import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  APP_NAME,
  APP_TAGLINE,
  APP_DESCRIPTION,
  LAUNCH_DISPLAY_DATE,
} from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#07111F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — ${APP_TAGLINE}`,
    template: `%s | ${APP_NAME}`,
  },
  description: `${APP_DESCRIPTION} Launching ${LAUNCH_DISPLAY_DATE}.`,
  keywords: [
    "PulseID",
    "connected healthcare",
    "digital medical ID",
    "healthcare technology",
    "patient portal",
    "e-prescriptions",
  ],
  authors: [{ name: "PulseID Team" }],
  openGraph: {
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description: `${APP_DESCRIPTION} Launching ${LAUNCH_DISPLAY_DATE}.`,
    siteName: APP_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description: `${APP_DESCRIPTION} Launching ${LAUNCH_DISPLAY_DATE}.`,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#07111F] text-[#F4F8FC]">
        {children}
      </body>
    </html>
  );
}
