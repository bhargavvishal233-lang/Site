"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const images = [
  "/agency-tilted.jpg",
  "/agency-tilted-tablet.jpg",
  "/agency-tilted-laptop.jpg"
];

export const TiltedDeviceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 5]);
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section 
      ref={containerRef}
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-crimson bg-crimson-light mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Performance at Scale
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-charcoal leading-tight">
            Data-Driven <br/>
            <span className="italic font-normal text-crimson">Architecture</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-charcoal-muted leading-relaxed max-w-md">
            We don't just build software. We engineer conversion-optimized ecosystems. Every pixel, every database query, and every marketing funnel is tracked, analyzed, and optimized for unparalleled business growth.
          </p>
        </motion.div>

        {/* Right Side: Giant Tilted Image */}
        <div className="relative h-[500px] sm:h-[600px] md:h-[800px] w-full flex justify-center items-center">
          <motion.div 
            style={{ y, rotate }}
            className="absolute w-[150%] sm:w-[120%] h-[150%] -right-1/4 sm:-right-10 origin-center drop-shadow-2xl"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentIdx]}
                  alt="Data Analytics Dashboard on Premium Device"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 150vw, 100vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};
