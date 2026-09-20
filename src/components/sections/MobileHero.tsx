"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Calendar } from "lucide-react";

export const MobileHero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-end pb-12 pt-28 px-4 overflow-hidden bg-charcoal">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/agency-hero.jpg"
          alt="Digital Agency Interfaces"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-crimson bg-crimson/10 mb-4 border border-crimson/20">
          <Sparkles className="w-3 h-3" />
          High-Impact Digital Agency
        </span>
        
        <h1 className="text-4xl font-serif font-medium tracking-tight text-white leading-tight mb-4">
          Engineering Digital Growth That Drives <br />
          <span className="italic font-normal text-crimson">Real Impact</span>
        </h1>
        
        <p className="text-sm text-gray-300 max-w-sm mb-8 font-sans font-normal leading-relaxed">
          Inspired by uncompromising craft. We build bespoke software, high-conversion UI/UX architectures, and verified growth funnels.
        </p>

        {/* Thumb-friendly Full-Width Buttons */}
        <div className="w-full flex flex-col gap-3">
          <Link
            href="/book"
            className="w-full flex items-center justify-center font-bold rounded-xl transition-all active:scale-[0.98] bg-crimson text-white hover:bg-crimson-hover shadow-lg py-4 text-base"
          >
            <Calendar className="w-5 h-5 mr-2" /> Reserve a Strategy Call
          </Link>
          <Link
            href="/templates"
            className="w-full flex items-center justify-center font-bold rounded-xl transition-all active:scale-[0.98] bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 py-4 text-base"
          >
            Explore Templates
          </Link>
        </div>
      </div>
    </section>
  );
};
