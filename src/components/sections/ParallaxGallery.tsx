"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const col1 = [
  "/agency-gallery-1.jpg",
  "/agency-gallery-3.jpg",
];

const col2 = [
  "/agency-gallery-2.jpg",
  "/agency-gallery-4.jpg",
];

export const ParallaxGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={containerRef} className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-crimson">Visual Excellence</span>
        <h2 className="text-4xl sm:text-5xl font-serif font-medium text-charcoal mt-3">
          Moments of <span className="italic font-normal text-crimson">Craft & Code</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1 */}
        <motion.div style={{ y: y1 }} className="space-y-8">
          {col1.map((src, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card border border-black/5 group">
              <Image
                src={src}
                alt="Case Study Showcase"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div style={{ y: y2 }} className="space-y-8 md:mt-12">
          {col2.map((src, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card border border-black/5 group">
              <Image
                src={src}
                alt="Case Study Showcase"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
