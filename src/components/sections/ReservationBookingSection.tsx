"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const ReservationBookingSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] min-h-[80vh] flex flex-col items-center justify-center py-32 font-serif text-white">
      {/* 3D Dot Grid Background replicating the Sentira wave vibe in crimson */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute bottom-0 w-[200%] left-[-50%] h-[150%] opacity-40 sm:opacity-60"
          style={{
            backgroundImage: "radial-gradient(circle at center, #dc143c 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
            transform: "perspective(800px) rotateX(60deg) translateY(100px) translateZ(-200px)",
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        {/* Soft radial glow in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-crimson/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-2 mb-6 opacity-80 font-sans">
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            </div>
            <span className="text-sm font-medium tracking-widest uppercase text-white/80">Direct Pipeline</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-12 leading-[1.1]">
            Reserve Your <br className="hidden sm:block" />
            <span className="italic font-normal text-crimson">Discovery Session</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Link href="/book">
            <Button variant="primary" size="lg" className="px-10 py-7 text-lg font-sans font-medium bg-white text-black hover:bg-gray-100 rounded-full transition-transform hover:scale-105 shadow-[0_0_40px_rgba(220,20,60,0.2)] border-none">
              Open Live Calendar
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};
