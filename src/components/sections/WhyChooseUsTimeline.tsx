"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const pillars = [
  {
    number: "01",
    subtitle: "Engineering First",
    title: "Uncompromising Velocity",
    description: "Production code and production-grade Figma design systems delivered in high-efficiency sprints without bottlenecks.",
    image: "/template_advisoral_2.png"
  },
  {
    number: "02",
    subtitle: "Unified Platform",
    title: "End-to-End Synergy",
    description: "From design prototypes to Next.js 15, Supabase, and automated marketing pipelines under one unified roof.",
    image: "/template_advisoral_4.png"
  },
  {
    number: "03",
    subtitle: "Data-Driven",
    title: "Conversion Architecture",
    description: "Every pixel, typography scale, and CTA placement is calibrated strictly for quantifiable business revenue growth.",
    image: "/template_ecommerce.jpg"
  },
  {
    number: "04",
    subtitle: "Dedicated Partner",
    title: "White-Glove Support",
    description: "Direct Slack channel communication with your senior engineering and design leads. Zero agency runaround.",
    image: "/template_saas.jpg"
  },
];

const Scroll3DImage = ({ src, alt, isEven }: { src: string, alt: string, isEven: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Dynamic 3D rotation based on scroll position
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? -10 : 10, isEven ? -2 : 2, isEven ? 5 : -5]);

  return (
    <div className="relative w-full aspect-[4/3] [perspective:1200px]" ref={ref}>
      <motion.div 
        style={{ rotateX, rotateY }}
        className="w-full h-full rounded-2xl overflow-hidden shadow-2xl [transform-style:preserve-3d] will-change-transform bg-charcoal"
      >
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover object-top transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </div>
  );
};

export const WhyChooseUsTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate scroll progress for the center line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="why-choose-us" className="py-24 max-w-5xl mx-auto px-6" ref={containerRef}>
      <div className="text-center mb-24">
        <span className="text-xs font-bold uppercase tracking-widest text-crimson mb-3 block">The Spectrum Standard</span>
        <h2 className="text-4xl sm:text-5xl font-serif font-medium text-charcoal">
          Why Visionary Brands <span className="italic text-crimson font-normal">Choose Us</span>
        </h2>
      </div>

      <div className="relative">
        {/* Static Background Line */}
        <div className="absolute left-6 md:left-1/2 top-12 bottom-12 w-px bg-charcoal/10 -translate-x-1/2" />
        
        {/* Animated Active Line */}
        <motion.div 
          className="absolute left-6 md:left-1/2 top-12 bottom-12 w-[2px] bg-crimson -translate-x-1/2 origin-top"
          style={{ scaleY: scrollYProgress }}
        />

        {pillars.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div key={item.number} className="relative flex flex-col md:flex-row justify-between mb-24 last:mb-0 group">
              
              {/* Timeline Dot */}
              <div className="absolute left-6 md:left-1/2 top-8 md:top-12 w-3 h-3 bg-crimson rounded-full -translate-x-1/2 border-[4px] border-[#FAF6F5] box-content z-10" />

              {/* Content */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`w-full md:w-[45%] pl-16 md:pl-0 ${
                  isEven 
                    ? 'md:text-right md:pr-12' 
                    : 'md:ml-auto md:pl-12'
                }`}
              >
                <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                  <span className="font-serif text-charcoal/40 text-lg">{item.number}</span>
                  <span className="w-6 h-px bg-charcoal/20" />
                  <span className="text-sm font-bold uppercase tracking-widest text-charcoal">{item.subtitle}</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-serif text-charcoal mb-4">{item.title}</h3>
                <p className="text-charcoal-muted leading-relaxed mb-8">{item.description}</p>
                
                {/* 3D Image Element */}
                <Scroll3DImage src={item.image} alt={item.title} isEven={isEven} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

