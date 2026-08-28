import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteShell from "@/components/layout/SiteShell";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ventila Solutions — Solutions de ventilation performantes",
    template: "%s | Ventila Solutions",
  },
  description:
    "Nous concevons, installons et entretenons des systèmes de ventilation efficaces, économiques et durables. Résidentiel, commercial et industriel.",
  keywords: [
    "ventilation",
    "HVAC",
    "climatisation",
    "installation ventilation",
    "entretien ventilation",
    "ventilation industrielle",
    "ventilation commerciale",
    "Diakhite Air Proteger",
  ],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-900 text-white">
        <SiteShell>{children}</SiteShell>
        <Footer />
      </body>
    </html>
  );
}
