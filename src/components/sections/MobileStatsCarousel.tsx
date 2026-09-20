"use client";

import React from "react";
import Image from "next/image";

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

export const MobileStatsCarousel: React.FC = () => {
  return (
    <section id="why-choose-us-mobile" className="py-16 bg-[#FAF6F5]">
      <div className="px-6 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-crimson mb-2 block">The Spectrum Standard</span>
        <h2 className="text-3xl font-serif font-medium text-charcoal">
          Why Visionary Brands <span className="italic text-crimson font-normal">Choose Us</span>
        </h2>
      </div>

      <div className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-6 flex gap-4">
        {pillars.map((item) => (
          <div 
            key={item.number} 
            className="flex-none w-[85vw] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 snap-center flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-serif text-charcoal/40 text-lg">{item.number}</span>
                <span className="w-6 h-px bg-charcoal/20" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal">{item.subtitle}</span>
              </div>
              
              <h3 className="text-2xl font-serif text-charcoal mb-3">{item.title}</h3>
              <p className="text-sm text-charcoal-muted leading-relaxed mb-6">{item.description}</p>
            </div>
            
            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-charcoal">
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover object-top"
                sizes="85vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
