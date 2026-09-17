"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const rawImages = [
  "/template_advisoral_1.png",
  "/template_advisoral_2.png",
  "/template_advisoral_3.png",
  "/template_advisoral_4.png",
  "/template_advisoral_5.png",
  "/template_advisoral_6.png"
];


// Double the array to 12 items for a tighter, more dramatic concave curve
const images = [...rawImages, ...rawImages];

const stats = [
  { value: "12+", label: "Years of Experience" },
  { value: "250+", label: "Projects Completed" },
  { value: "4.8/5", label: "Client Satisfaction" },
  { value: "98%", label: "On-Time Delivery" },
];

export const Curved3DGallerySection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF6F5] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 text-center mb-6 relative z-10 flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-charcoal max-w-4xl mx-auto leading-[1.1] tracking-tight">
          With decades of experience, we specialize in turning ideas into well-designed structures that stand the test of time.
        </h2>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center [perspective:2500px] my-6 pointer-events-none">
        
        {/* The rotating cylinder (Concave, tight radius) */}
        <div 
          className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d] animate-[spin-concave_45s_linear_infinite] will-change-transform"
        >
          {images.map((src, idx) => {
            // Distribute 12 items evenly around 360 degrees
            const angle = idx * (360 / images.length);
            
            return (
              <div 
                key={idx}
                className="absolute w-[320px] h-[240px] sm:w-[480px] sm:h-[360px] rounded-2xl overflow-hidden shadow-2xl bg-charcoal custom-3d-item [backface-visibility:hidden]"
                style={{
                  "--rot": `${angle}deg`
                } as React.CSSProperties}
              >
                <Image
                  src={src}
                  alt={`Agency work ${idx + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 320px, 480px"
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Fallback CSS for the custom spin and variable */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-concave {
          0% { transform: translate3d(0,0,-500px) rotateY(0deg); }
          100% { transform: translate3d(0,0,-500px) rotateY(360deg); }
        }
        .custom-3d-item {
          /* Tight concave cylinder radius */
          transform: rotateY(var(--rot)) translate3d(0,0,-1000px);
          will-change: transform;
          outline: 1px solid transparent; /* Anti-aliasing hack */
        }
        @media (max-width: 640px) {
          @keyframes spin-concave {
            0% { transform: translate3d(0,0,-300px) rotateY(0deg); }
            100% { transform: translate3d(0,0,-300px) rotateY(360deg); }
          }
          .custom-3d-item {
            transform: rotateY(var(--rot)) translate3d(0,0,-650px);
          }
        }
      `}} />

      {/* Stats Row */}
      <div className="max-w-6xl mx-auto px-6 mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-5xl sm:text-6xl font-medium text-charcoal font-serif mb-3 tracking-tight">{stat.value}</div>
              <div className="text-sm sm:text-base text-charcoal-muted font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
