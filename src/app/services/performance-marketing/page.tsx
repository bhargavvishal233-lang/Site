'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, AnimatePresence, Variants } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { Plus, X, Play, Pause } from 'lucide-react';
import { Footer } from "@/components/layout/Footer";

// --- Global Custom Cursor Context ---
const CursorContext = React.createContext<{
  cursorState: 'default' | 'video' | 'project';
  setCursorState: (state: 'default' | 'video' | 'project') => void;
}>({
  cursorState: 'default',
  setCursorState: () => {},
});

function CustomCursor() {
  const { cursorState } = React.useContext(CursorContext);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const variants = {
    default: {
      width: 12,
      height: 12,
      x: pos.x - 6,
      y: pos.y - 6,
      backgroundColor: '#fff',
      mixBlendMode: 'difference' as const,
      borderRadius: '50%',
    },
    video: {
      width: 80,
      height: 80,
      x: pos.x - 40,
      y: pos.y - 40,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      mixBlendMode: 'normal' as const,
      borderRadius: '50%',
    },
    project: {
      width: 140,
      height: 48,
      x: pos.x - 70,
      y: pos.y - 24,
      backgroundColor: '#fff',
      mixBlendMode: 'normal' as const,
      borderRadius: '9999px',
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={cursorState}
      transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center text-black overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {cursorState === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center justify-center"
          >
            <Play fill="black" size={24} className="ml-1" />
          </motion.div>
        )}
        {cursorState === 'project' && (
          <motion.div
            key="project"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-xs font-bold uppercase tracking-widest text-center whitespace-nowrap"
          >
            View Case Study
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


// --- 2. Hero Section (Video Background) ---
function HeroSection() {
  const { setCursorState } = React.useContext(CursorContext);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const lineVariants: any = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section 
      ref={containerRef}
      onMouseEnter={() => setCursorState('video')}
      onMouseLeave={() => setCursorState('default')}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%] -z-20">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
          src="/performance-marketing/JvsYQ6i2XehdtVamXDEovL33lw.mp4"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/60 -z-10" />
      
      <motion.div style={{ opacity }} className="max-w-6xl mx-auto w-full px-6 pt-32 pb-20 relative z-10">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col gap-2 md:gap-4"
        >
          <div className="overflow-hidden"><motion.h1 variants={lineVariants} className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif leading-[0.85] tracking-tighter text-[#f5f5f5]">captivates today.</motion.h1></div>
          <div className="overflow-hidden"><motion.h1 variants={lineVariants} className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif leading-[0.85] tracking-tighter text-[#f5f5f5] italic opacity-70">& inspires.</motion.h1></div>
          <div className="overflow-hidden"><motion.h1 variants={lineVariants} className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif leading-[0.85] tracking-tighter text-[#f5f5f5]">tomorrow.</motion.h1></div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 md:mt-24 text-lg md:text-2xl text-gray-400 max-w-xl font-medium leading-relaxed"
        >
          Aligning creative vision with production expertise to exponentially increase your digital impact.
        </motion.p>
      </motion.div>
    </section>
  );
}

// --- 3. Services / Expertise Accordion ---
const servicesList = [
  { id: "01", title: "Branding", tags: ["Brand Strategy", "Visual Identity", "Art Direction"], desc: "From strategy to execution, we create authentic brand experiences tailored to your audience." },
  { id: "02", title: "Digital", tags: ["Wireframing", "UI/UX Design", "Prototyping"], desc: "Crafting intuitive and immersive digital products that drive engagement." },
  { id: "03", title: "Development", tags: ["Next.js", "Framer Development", "Creative Coding"], desc: "Building robust, scalable, and beautifully animated web architectures." },
];

function ServicesSection() {
  return (
    <section id="services" className="py-32 px-6 md:px-16 max-w-6xl mx-auto bg-[#050505] relative z-20">
      <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-gray-500 mb-16">Our Expertise</h2>
      <div className="flex flex-col border-t border-white/10">
        {servicesList.map((srv, i) => (
          <ServiceAccordion key={srv.id} service={srv} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceAccordion({ service, index }: { service: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-white/10"
    >
      <div 
        className="py-10 cursor-pointer flex items-center justify-between group"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => !isOpen && setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex items-center gap-8 md:gap-16">
          <span className="text-gray-500 font-mono text-sm">{service.id}</span>
          <h3 className="text-4xl md:text-6xl font-serif text-[#f5f5f5] group-hover:pl-4 transition-all duration-500">{service.title}</h3>
        </div>
        <motion.div 
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4, ease: "anticipate" }}
          className="text-gray-400 group-hover:text-white"
        >
          <Plus size={32} strokeWidth={1} />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 pl-[5.5rem] md:pl-[8.5rem] flex flex-col md:flex-row md:items-end justify-between gap-8">
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">{service.desc}</p>
              <div className="flex flex-wrap gap-3">
                {service.tags.map((tag: string) => (
                  <span key={tag} className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-medium bg-white/5 text-gray-300">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- 4. Selected Projects ---
function PortfolioSection() {
  const { setCursorState } = React.useContext(CursorContext);

  return (
    <section id="work" className="py-32 px-6 md:px-16 bg-[#050505] relative z-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-gray-500 mb-16">Selected Projects</h2>
        
        <div 
          className="flex flex-col gap-32"
          onMouseEnter={() => setCursorState('project')}
          onMouseLeave={() => setCursorState('default')}
        >
          <PortfolioItem title="Velocity Motors" category="Automotive Website Revamp" src="/performance-marketing/9vY7DNMWp9tCsWhKr5bgIp3VKM4.jpeg" />
          <PortfolioItem title="Stride Athletics" category="Digital Product Design" src="/performance-marketing/9Z5aXfRedzw4zQn06M31oVPQ8.jpg" align="right" />
          <PortfolioItem title="Hoekstra Studio" category="Digital Product Configurator" src="/performance-marketing/2ZAzenwmK1BGHzmSkbYRVwbwSI.jpg" />
        </div>
      </div>
    </section>
  );
}

function PortfolioItem({ title, category, src, align = "left" }: { title: string, category: string, src: string, align?: "left" | "right" }) {
  const ref = useRef(null);
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`group w-full md:w-[85%] ${align === "right" ? "ml-auto" : ""}`}
    >
      <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden rounded-2xl bg-[#111] mb-8 clip-path-reveal">
        <motion.div 
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <Image 
            src={src} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-75" 
          />
        </motion.div>
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden">
        <motion.h3 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-serif text-[#f5f5f5]"
        >
          {title}
        </motion.h3>
        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-gray-500 text-sm font-mono uppercase tracking-widest"
        >
          {category}
        </motion.p>
      </div>
    </motion.div>
  );
}

// --- 5. Partnership Process ---
function ProcessSection() {
  const steps = [
    { title: "Kickoff: From ideas to action in 48 hours", desc: "We align on your vision and goals immediately, ensuring no momentum is lost." },
    { title: "Design & Development: Bringing your vision to life", desc: "Our team crafts the experience meticulously, focusing on motion, interaction, and brand integrity." },
    { title: "Review & Delivery", desc: "Polishing every detail before launch to guarantee an Awwwards-winning level of execution." }
  ];

  return (
    <section className="py-40 px-6 md:px-16 max-w-7xl mx-auto relative bg-[#050505] z-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-5 relative">
          <div className="sticky top-40">
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-[#f5f5f5]">Partnership,<br/>Not Just Projects.</h2>
            <p className="mt-6 text-gray-500 text-lg">A seamless workflow tailored for modern digital agencies.</p>
          </div>
        </div>
        <div className="md:col-span-7 flex flex-col gap-32 pt-20 pb-40">
          {steps.map((step, i) => (
            <ProcessStep key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index }: { step: any, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const color = useTransform(scrollYProgress, [0, 0.5, 1], ["#555", "#f5f5f5", "#555"]);

  return (
    <motion.div ref={ref} style={{ opacity }} className="flex flex-col gap-6">
      <span className="text-gray-500 font-mono text-sm tracking-widest">0{index + 1}</span>
      <motion.h3 style={{ color }} className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight">{step.title}</motion.h3>
      <p className="text-gray-400 text-lg md:text-xl leading-relaxed">{step.desc}</p>
    </motion.div>
  );
}

// --- 6. Pricing Plans ---
function PricingSection() {
  return (
    <section id="pricing" className="py-32 px-6 md:px-16 bg-[#050505] z-20 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 text-[#f5f5f5]">One subscription, unlimited iterations.</h2>
          <p className="text-gray-500 text-lg">Pause or cancel whenever you wish.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <PricingCard title="Core Plan" price="$3,299" highlight={false} />
          <PricingCard title="Pro Plan" price="$5,499" highlight={true} />
        </div>
      </div>
    </section>
  );
}

function PricingCard({ title, price, highlight }: { title: string, price: string, highlight: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -10, boxShadow: highlight ? "0 25px 50px -12px rgba(255, 255, 255, 0.1)" : "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`p-10 md:p-14 rounded-[2rem] border relative ${highlight ? 'bg-[#111] border-white/20' : 'bg-[#0a0a0a] border-white/5'} transition-all duration-300 overflow-hidden`}
    >
      {highlight && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      )}
      <h3 className="text-2xl font-serif mb-2 text-[#f5f5f5]">{title}</h3>
      <p className="text-gray-500 mb-12">Perfect for growing startups.</p>
      
      <div className="mb-12">
        <span className="text-5xl font-bold text-[#f5f5f5]">{price}</span>
        <span className="text-gray-500"> /month</span>
      </div>
      
      <ul className="flex flex-col gap-6 mb-16">
        {['Unlimited requests', 'Unlimited revisions', 'Dedicated designer', '48-hour turnaround'].map((feature, i) => (
          <li key={i} className="flex items-center gap-4 text-gray-300">
            <Plus size={16} className="text-white" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className={`w-full py-4 rounded-full font-medium transition-colors ${highlight ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}>
        Get Started
      </button>
    </motion.div>
  );
}

// --- 7. Testimonials (Infinite Marquee) ---
function TestimonialsSection() {
  const reviews = [
    { name: "Noah Kristiansen", company: "TWBE", text: "Inspiring client experiences. They completely transformed our brand." },
    { name: "Sophia Williams", company: "Austrian Air", text: "The quality of work and speed of delivery is unmatched in the industry." },
    { name: "Sarah Johnson", company: "BrightWave Media", text: "A true partnership. They understand our vision better than we do." },
  ];

  return (
    <section className="py-40 bg-[#050505] text-[#f5f5f5] overflow-hidden flex flex-col justify-center relative z-20 border-b border-white/10">
      <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-gray-500 mb-16 px-6 md:px-16">Client Experiences</h2>
      <div className="group flex overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
        >
          {[...reviews, ...reviews, ...reviews].map((rev, i) => (
            <div key={i} className="w-[400px] md:w-[600px] flex-shrink-0 p-8 md:p-12 border-l border-white/10">
              <p className="text-2xl md:text-4xl font-serif leading-tight mb-12 whitespace-normal break-words">&ldquo;{rev.text}&rdquo;</p>
              <div>
                <p className="font-bold">{rev.name}</p>
                <p className="text-gray-500 text-sm mt-1">{rev.company}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// --- Main Page Wrapper ---
export default function ArpeggioClonePage() {
  const [cursorState, setCursorState] = useState<'default' | 'video' | 'project'>('default');

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <CursorContext.Provider value={{ cursorState, setCursorState }}>
        <div className="text-[#f5f5f5] min-h-screen selection:bg-white selection:text-black font-sans cursor-none bg-black -mt-24">
          {/* Main content layer */}
          <div className="bg-[#050505] relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <CustomCursor />
            <HeroSection />
            <ServicesSection />
            <PortfolioSection />
            <ProcessSection />
            <PricingSection />
            <TestimonialsSection />
          </div>
          {/* Spectrum Footer */}
          <Footer />
        </div>
      </CursorContext.Provider>
    </ReactLenis>
  );
}
