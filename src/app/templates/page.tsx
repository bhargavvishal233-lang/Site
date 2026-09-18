"use client";

import React, { useState, useMemo, useRef } from "react";
import { templatesData } from "@/data/templates";
import { Template, TemplateCategory } from "@/types/template";
import { TemplateFilters } from "@/components/templates/TemplateFilters";
import { DevicePreviewModal } from "@/components/templates/DevicePreviewModal";
import { TemplateInquiryDrawer } from "@/components/templates/TemplateInquiryDrawer";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform, useVelocity, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

const categories: TemplateCategory[] = ["All", "SaaS", "E-Commerce", "Mobile", "Fintech", "Agency", "Portfolio"];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 30, stiffness: 50 });
  
  // Advanced scroll-velocity distortions (simulating WebGL) - much softer
  const rotateX = useTransform(smoothVelocity, [-1500, 1500], [5, -5]);
  const skewY = useTransform(smoothVelocity, [-1500, 1500], [-0.5, 0.5]);
  const scale = useTransform(smoothVelocity, [-1500, 0, 1500], [0.98, 1, 0.98]);

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 50 });
  
  // Create a staggered parallax effect for masonry columns - more subtle
  const y1 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 100]);

  const filteredTemplates = useMemo(() => {
    return templatesData.filter((tpl) => {
      const matchesCategory = selectedCategory === "All" || tpl.category === selectedCategory;
      const matchesSearch =
        tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Split templates into two columns for the editorial masonry layout
  const col1 = filteredTemplates.filter((_, i) => i % 2 === 0);
  const col2 = filteredTemplates.filter((_, i) => i % 2 !== 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-crimson selection:text-white" ref={containerRef}>
      
      {/* Editorial Page Header */}
      <section className="pt-32 pb-16 max-w-7xl mx-auto px-6 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-crimson text-sm font-bold tracking-widest uppercase mb-4 block">
            Select Your Foundation
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8">
            Digital <br className="hidden lg:block"/> Experiences.
          </h1>
          <p className="text-[#a0a0a0] max-w-xl text-lg sm:text-xl font-light leading-relaxed">
            A curated selection of premium, high-fidelity prototypes and design systems. Crafted with striking aesthetics and engineered for immediate impact.
          </p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="mb-16 border-t border-white/10 pt-8">
          <TemplateFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="text-center py-40 border border-white/10 rounded-[3rem]">
            <p className="text-[#a0a0a0] text-lg font-light">No experiences found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24" style={{ perspective: "1200px" }}>
            
            {/* Column 1 */}
            <motion.div style={{ y: y1 }} className="flex flex-col gap-8 md:gap-16 lg:gap-24">
              {col1.map((template) => (
                <DistortedTemplateCard 
                  key={template.id} 
                  template={template} 
                  rotateX={rotateX} 
                  skewY={skewY} 
                  scale={scale}
                  onPreview={() => setPreviewTemplate(template)}
                  onSelect={() => setSelectedTemplate(template)}
                />
              ))}
            </motion.div>

            {/* Column 2 */}
            <motion.div style={{ y: y2 }} className="flex flex-col gap-8 md:gap-16 lg:gap-24 md:mt-48">
              {col2.map((template) => (
                <DistortedTemplateCard 
                  key={template.id} 
                  template={template} 
                  rotateX={rotateX} 
                  skewY={skewY} 
                  scale={scale}
                  onPreview={() => setPreviewTemplate(template)}
                  onSelect={() => setSelectedTemplate(template)}
                />
              ))}
            </motion.div>
          </div>
        )}
      </section>

      <DevicePreviewModal
        template={previewTemplate}
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onSelect={(tpl) => {
          setPreviewTemplate(null);
          setTimeout(() => setSelectedTemplate(tpl), 300);
        }}
      />

      <TemplateInquiryDrawer
        template={selectedTemplate}
        isOpen={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />

      <Footer />
    </div>
  );
}

const DistortedTemplateCard = ({ 
  template, 
  rotateX, 
  skewY, 
  scale,
  onPreview,
  onSelect
}: { 
  template: Template, 
  rotateX: MotionValue<number>,
  skewY: MotionValue<number>,
  scale: MotionValue<number>,
  onPreview: () => void,
  onSelect: () => void
}) => {
  return (
    <motion.div 
      style={{ rotateX, skewY, scale }}
      className="group relative flex flex-col gap-6 cursor-pointer origin-center will-change-transform"
    >
      {/* Image Container with strict Aspect Ratio */}
      <div 
        className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-[#111] shadow-2xl"
        onClick={onPreview}
      >
        <Image
          src={template.thumbnailUrl}
          alt={template.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        
        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

        {template.isFeatured && (
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-crimson text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
            <Sparkles className="w-3 h-3" /> Featured
          </div>
        )}

        <div className="absolute top-6 right-6 z-20 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/20">
          {template.category}
        </div>

        {/* Hover Action Button */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
          <button className="bg-white text-black font-bold tracking-widest uppercase text-xs px-8 py-4 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-xl">
            View Live
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Clean Typography Info Section */}
      <div className="flex flex-col gap-2 px-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight group-hover:text-crimson transition-colors">
            {template.title}
          </h3>
          <button 
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className="text-xs uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors shrink-0"
          >
            Select
          </button>
        </div>
        <p className="text-[#a0a0a0] font-light leading-relaxed line-clamp-2 max-w-sm">
          {template.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {template.techStack.map(tech => (
            <span key={tech} className="text-[10px] uppercase tracking-widest text-white/50">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
