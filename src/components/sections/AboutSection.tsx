"use client";

import React, { useRef } from "react";
import { motion, useScroll, useVelocity, useSpring, useMotionValue, useAnimationFrame, useMotionTemplate } from "framer-motion";

const brands = ["NIKE", "CHANEL", "GOOGLE", "FRAMER", "NETFLIX", "APPLE", "VOGUE"];

export const AboutSection: React.FC = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const baseRotation = useRef(0);
  const rotateY = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    // Base continuous rotation speed
    let moveBy = 0.015 * delta;
    
    // Add scroll velocity impact (adjust multiplier for sensitivity)
    moveBy += smoothVelocity.get() * 0.01;
    
    baseRotation.current -= moveBy;
    rotateY.set(baseRotation.current);
  });

  const transform = useMotionTemplate`rotateX(-15deg) rotateZ(-5deg) rotateY(${rotateY}deg)`;

  return (
    <section id="about" className="relative bg-[#111] text-white pt-28 pb-32 overflow-hidden rounded-t-[3rem] -mt-12 z-20">
      
      {/* Editorial 3-Column Header */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* Column 1: Bio */}
        <div className="md:col-span-6 lg:col-span-5">
          <h2 className="text-[#a0a0a0] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            About Us
          </h2>
          <p className="text-base md:text-lg leading-[1.6] font-light text-white/90">
            We are a creative team that turns bold ideas into thoughtful, engaging digital experiences. We combine bold visuals, intuitive layouts, and strategic thinking to create websites that feel unique, work seamlessly, and help brands stand out.
          </p>
        </div>

        {/* Spacer for Desktop */}
        <div className="hidden lg:block lg:col-span-3"></div>

        {/* Column 2: Services */}
        <div className="md:col-span-3 lg:col-span-2">
          <h2 className="text-[#a0a0a0] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Services
          </h2>
          <ul className="space-y-2 text-sm font-light text-white/80">
            <li>Branding</li>
            <li>UX/UI Design</li>
            <li>Development</li>
            <li>Animation</li>
            <li>Art Direction</li>
          </ul>
        </div>

        {/* Column 3: Industries */}
        <div className="md:col-span-3 lg:col-span-2">
          <h2 className="text-[#a0a0a0] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Industries
          </h2>
          <ul className="space-y-2 text-sm font-light text-white/80">
            <li>Design</li>
            <li>Technology</li>
            <li>Fashion</li>
            <li>Sport</li>
            <li>Beauty</li>
          </ul>
        </div>
      </div>

      {/* 3D Rotating Text Carousel */}
      <div className="mt-28 h-[40vh] min-h-[400px] w-full flex items-center justify-center relative select-none pointer-events-none">
        
        {/* CSS for the 3D Animation */}
        <style dangerouslySetInnerHTML={{__html: `
          .perspective-container {
            perspective: 1500px;
            transform-style: preserve-3d;
          }
          .carousel-ring {
            position: relative;
            width: 0;
            height: 0;
            transform-style: preserve-3d;
          }
          .carousel-item {
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: center;
            /* The base styling for the text */
            color: white;
            font-weight: 800;
            font-size: clamp(1.25rem, 3.5vw, 3.25rem); /* Reduced text size */
            letter-spacing: -0.02em;
            white-space: nowrap;
            /* Hide the back of the cylinder slightly or completely if desired. */
            backface-visibility: visible;
          }
        `}} />

        <div className="perspective-container flex items-center justify-center w-full h-full">
          <motion.div className="carousel-ring" style={{ transform }}>
            {brands.map((brand, i) => {
              const rotationY = (360 / brands.length) * i;
              // Adjust translateZ based on viewport size for responsive radius so text doesn't overlap
              return (
                <div 
                  key={i} 
                  className="carousel-item -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${rotationY}deg) translateZ(calc(180px + 10vw))`, /* Reduced ring size */
                  }}
                >
                  {brand}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Background radial gradient to give depth to the cylinder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none z-0" />
    </section>
  );
};
