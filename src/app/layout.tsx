import { SessionProvider } from "next-auth/react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Baskervville } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { AuthNotifier } from "@/components/auth/AuthNotifier";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const fontSerif = Baskervville({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Spectrum Agency | Digital Engineering & Growth",
  description: "Performance marketing, high-impact UI/UX design, and custom software development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontSerif.variable} font-sans antialiased bg-canvas text-charcoal`}>
        <SessionProvider>
          <AuthNotifier />
          <Navbar />
          <MobileBottomNav />
          <main className="min-h-screen pt-24 lg:pt-24 pt-4">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}