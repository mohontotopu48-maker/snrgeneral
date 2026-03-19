import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S New Roof | Orange County & LA County Roofing Experts",
  description: "Top-rated roofing contractor in Santa Ana, Orange County & Los Angeles. S New Roof offers free roof inspections, emergency repairs, and new roof installations. Call 714-770-4756",
  keywords: ["roofing", "roof repair", "Orange County", "Los Angeles", "Santa Ana", "S New Roof", "roof installation", "emergency roof repair", "roofing contractor"],
  authors: [{ name: "S New Roof Inc." }],
  icons: {
    icon: "https://i.ibb.co.com/JjCXRQw9/snr-linkedin-icon-26-sc-original-blue-1.jpg",
  },
  openGraph: {
    title: "S New Roof | Orange County & LA County Roofing Experts",
    description: "Top-rated roofing contractor in Santa Ana, Orange County & Los Angeles. Free roof inspections, emergency repairs, and new roof installations.",
    url: "https://snewroof.com",
    siteName: "S New Roof",
    type: "website",
    images: [
      {
        url: "https://i.ibb.co.com/JjCXRQw9/snr-linkedin-icon-26-sc-original-blue-1.jpg",
        width: 1200,
        height: 630,
        alt: "S New Roof - Professional Roofing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "S New Roof | Orange County & LA County Roofing Experts",
    description: "Top-rated roofing contractor in Santa Ana, Orange County & Los Angeles.",
    images: ["https://i.ibb.co.com/JjCXRQw9/snr-linkedin-icon-26-sc-original-blue-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* GHL External Tracking Script */}
        <Script
          src="https://link.msgsndr.com/js/external-tracking.js"
          strategy="afterInteractive"
          data-tracking-id="tk_f0a09374a6094ab9a4c1345ca43b3c48"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
