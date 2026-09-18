"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useVelocity, useSpring, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Syndicate",
    tags: ["BRANDING", "DESIGN"],
    src: "/agency-gallery-1.jpg"
  },
  {
    title: "Beyond the Screen",
    tags: ["DESIGN", "DEVELOPMENT"],
    src: "/agency-gallery-2.jpg"
  },
  {
    title: "Machine's Children",
    tags: ["BRANDING", "DESIGN"],
    src: "/agency-gallery-3.jpg"
  },
  {
    title: "Medium Scene",
    tags: ["BRANDING", "DESIGN"],
    src: "/agency-gallery-4.jpg"
  }
];

const brands = [
  "Acme Corp", "Global Tech", "Stark Industries", "Wayne Enterprises", 
  "Umbrella Corp", "Massive Dynamic", "Cyberdyne", "InGen"
];
// Triple the array to ensure smooth looping even on ultrawide screens
const marqueeItems = [...brands, ...brands, ...brands];

export const ParallaxGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollVelocity = useVelocity(scrollY);
  // Lower stiffness and damping for a buttery smooth lag rather than snappy jitter
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 100 });
  
  // Subtle, premium edge distortion
  const rotateX = useTransform(smoothVelocity, [-1500, 1500], [10, -10]);
  const skewY = useTransform(smoothVelocity, [-1500, 1500], [-1.5, 1.5]);
  const scale = useTransform(smoothVelocity, [-1500, 0, 1500], [0.96, 1, 0.96]);

  // Smooth out the parallax scroll progress so it doesn't jump with mousewheel ticks
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });
  const y1 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} className="pt-24 pb-0 bg-white overflow-hidden">
      {/* Clean Typography Section */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight text-[#111] mb-6"
        >
          Selected Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl text-[#666] max-w-2xl mx-auto"
        >
          A collection of our most recent projects, combining striking visual design with robust engineering.
        </motion.p>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" style={{ perspective: "1200px" }}>
        {/* Column 1 */}
        <motion.div style={{ y: y1 }} className="flex flex-col gap-8 md:gap-12">
          {[projects[0], projects[2]].map((project, i) => (
            <ProjectCard key={i} project={project} rotateX={rotateX} skewY={skewY} scale={scale} />
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div style={{ y: y2 }} className="flex flex-col gap-8 md:gap-12 md:mt-32">
          {[projects[1], projects[3]].map((project, i) => (
            <ProjectCard key={i} project={project} rotateX={rotateX} skewY={skewY} scale={scale} />
          ))}
        </motion.div>
      </div>

      {/* Marquee Ticker */}
      <div className="mt-32 bg-[#111] overflow-hidden py-16 relative flex">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333333%); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        `}} />
        <div className="flex w-max animate-marquee space-x-16 pr-16 items-center">
          {marqueeItems.map((brand, i) => (
            <span key={i} className="text-3xl md:text-5xl font-bold tracking-widest text-[#F4F6F8] opacity-80 uppercase whitespace-nowrap">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, rotateX, skewY, scale }: { 
  project: { title: string, tags: string[], src: string }, 
  rotateX: MotionValue<number>,
  skewY: MotionValue<number>,
  scale: MotionValue<number>
}) => {
  return (
    <motion.div 
      style={{ rotateX, skewY, scale }}
      className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 cursor-pointer shadow-xl origin-center will-change-transform"
    >
      <Image
        src={project.src}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
      />
      
      {/* Overlay - always visible on mobile, appears on hover on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-out" />

      {/* Top Left: Title */}
      <div className="absolute top-8 left-8 text-white z-10 translate-y-0 md:translate-y-[-10px] opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">
        <h3 className="text-3xl font-medium tracking-wide">{project.title}</h3>
      </div>

      {/* Top Right: Arrow */}
      <div className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white translate-y-0 md:translate-y-[-10px] opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-150">
        <ArrowUpRight className="w-6 h-6" />
      </div>

      {/* Bottom Left: Tags */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3 z-10 translate-y-0 md:translate-y-[10px] opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">
        {project.tags.map((tag: string, i: number) => (
          <span 
            key={i} 
            className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
