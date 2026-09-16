import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
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
      <body className={`${fontSans.variable} font-sans antialiased bg-canvas text-charcoal`}>
        <ClerkProvider>
          <Navbar />
          <main className="min-h-screen pt-24">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}