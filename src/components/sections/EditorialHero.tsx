"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const EditorialHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative z-40 min-h-[92vh] flex flex-col pt-24 pb-8 px-6 max-w-7xl mx-auto overflow-hidden pointer-events-none"
    >
      {/* Main Content Wrapper (Grows to take available space and centers content) */}
      <div className="flex-1 flex flex-col justify-center w-full pointer-events-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Side: Text Content (60%) */}
          <motion.div style={{ y: yText, opacity }} className="flex-1 max-w-2xl relative z-50 pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-crimson bg-crimson-light mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              High-Impact Digital Agency
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-charcoal leading-[1.05]">
              Engineering Digital Growth That Drives <br className="hidden lg:block"/>
              <span className="italic font-normal text-crimson">Real Impact</span>
            </h1>
            <p className="mt-8 text-base sm:text-xl text-charcoal-muted max-w-xl font-sans font-normal leading-relaxed">
              Inspired by uncompromising craft. We build bespoke software, high-conversion UI/UX architectures, and verified growth funnels.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-30">
              <Link 
                href="/book" 
                className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none active:scale-[0.98] bg-crimson text-white hover:bg-crimson-hover shadow-sm hover:shadow gap-2 text-sm px-8 py-4 relative z-50 cursor-pointer"
              >
                <Calendar className="w-4 h-4" /> Reserve a Strategy Call
              </Link>
              <Link 
                href="/templates" 
                className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none active:scale-[0.98] border border-black/10 text-charcoal hover:bg-black/5 text-sm px-8 py-4 bg-white relative z-50 cursor-pointer"
              >
                Explore Templates
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Image/Visual (40%) */}
          <motion.div style={{ y: yImage, opacity }} className="flex-1 relative w-full lg:h-[600px] min-h-[400px] z-0 hidden md:block pointer-events-none">
            {/* Main Hero Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] lg:w-[140%] h-full">
              <Image 
                src="/agency-hero.jpg" 
                alt="Digital Agency Interfaces" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Information Row & Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-full border-t border-black/5 pt-6 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-charcoal-muted z-20"
      >
        <div>
          <span className="font-bold text-charcoal uppercase block">Specialization</span>
          Performance & UI/UX Systems
        </div>
        <div>
          <span className="font-bold text-charcoal uppercase block">Client Satisfaction</span>
          98% Verified Across 150+ Builds
        </div>
        <div>
          <span className="font-bold text-charcoal uppercase block">Delivery Sprint</span>
          Rapid 2-to-4 Week Turnaround
        </div>
        <div className="flex items-center justify-end gap-2 text-crimson font-bold">
          Scroll to explore <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
