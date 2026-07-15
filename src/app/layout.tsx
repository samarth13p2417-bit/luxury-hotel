import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";
import CustomCursor from "@/components/shared/CustomCursor";
import Navbar from "@/components/shared/Navbar";
import AIConcierge from "@/components/shared/AIConcierge";
import BackgroundMusic from "@/components/shared/BackgroundMusic";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AURUM | 7-Star Immersive Luxury Resort & Management Platform",
  description:
    "Experience the ultimate in bespoke hospitality. Tour our private estate, exclusive suites, infinity pool, wellness spa, and access our premium hotel management modules.",
  keywords: ["Aman Resorts", "Luxury Hotel", "7-Star Resort", "Hospitality Management", "Booking Dashboard", "Hotel Analytics"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${inter.variable} h-full antialiased no-scrollbar`}
    >
      <body className="min-h-full bg-[#0A0A0A] text-[#F8F7F2] font-sans selection:bg-gold-champagne selection:text-[#0A0A0A]">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <BackgroundMusic />
          <main className="flex-1 flex flex-col">{children}</main>
          <AIConcierge />
        </SmoothScroll>
      </body>
    </html>
  );
}
