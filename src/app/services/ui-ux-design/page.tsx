"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

/* ─── helpers ─── */
const IMG = (name: string) => `/ui-ux-design-static/images/${name}`;

/* ─── data ─── */
const projects = [
  {
    name: "Aster Bloom",
    desc: "A botanical identity for a skincare brand rooted in slow, seasonal rituals.",
    year: "2025",
    bg: IMG("WguPM6HPYTluOZxSMcYEgbD8qQU.png"),
    thumb: IMG("hH00a4VHWtZ62VAvH51MjlEa1dA.png"),
  },
  {
    name: "Nova Grid",
    desc: "A crisp visual system for a data platform that wanted to feel human.",
    year: "2024",
    bg: IMG("dr9Kjuoj8tBkGoVNCxADGYRQc0.png"),
    thumb: IMG("t7BA8vHW8KWtPHPdXBrQyM50gE.png"),
  },
  {
    name: "Marrow Coffee",
    desc: "A bold, honest identity for a roaster obsessed with origin and craft.",
    year: "2024",
    bg: IMG("xrJdHryeemb6EZoFAfmzsqvyA.png"),
    thumb: IMG("RaLNS4VgX9hxs1sW2xYQzvlrkk.png"),
  },
];

const services = [
  {
    title: "Brand Identity",
    desc: "A complete visual identity built from strategy up — logo suite, type and color systems, and a flexible design language. We deliver a brand that stays recognizable everywhere while giving each touchpoint room to breathe.",
    price: "$6,000",
    num: "01",
    bg: IMG("kpBv8nDwHuDnulhZDyTkA5e3jKY.png"),
    icon: IMG("50VoT25sg8sdvPHCkYWMmg2bsI.png"),
  },
  {
    title: "Visual Design",
    desc: "Design work that turns your brand into real, usable assets — packaging, web layouts, social templates, and marketing collateral. We keep every piece coherent so your brand feels considered at every scale.",
    price: "$3,500",
    num: "02",
    bg: IMG("dKrf6MyLfXuNHd0WYCeJf3AJYdE.png"),
    icon: IMG("F3Hkc6HIgflzBGzwpmXVz9l988.png"),
  },
  {
    title: "Content & Voice",
    desc: "An editorial voice and content strategy that make your brand sound as intentional as it looks. We define tone guidelines, shape your key messaging, and set up a publishing rhythm your team can sustain.",
    price: "$2,500",
    num: "03",
    bg: IMG("o0pbgb2IJo19Cm8jajdjFYuXf0.png"),
    icon: IMG("1jl3akZHz3CwamtA8csVvGKrUAs.png"),
  },
  {
    title: "Brand Refresh",
    desc: "A focused evolution for brands that are close but not quite there — sharpening your identity, tightening the system, and modernizing without losing what people already recognize.",
    price: "$4,000",
    num: "04",
    bg: IMG("TDcaDM5rdt2pNTvsSasyIoBR8.png"),
    icon: IMG("o2QAfZCLQLRnwjBf4kADwhYWmow.png"),
  },
];

const clientLogos = [
  { src: IMG("F7p8ROgFDYQfLQ0LL6N2SKBNzKY.png"), alt: "AlphaWave" },
  { src: IMG("uppSb7qud9g4SFWc1ZTLTLcVVM.png"), alt: "Boltshift" },
  { src: IMG("PDI24QzNBd4Uee5rpQJ5MtUPXA.png"), alt: "Capsule" },
  { src: IMG("Ds32hVeQWhn5Nwsxo8deMuuSZdU.png"), alt: "Codecraft" },
  { src: IMG("H3FI8vU6VHnW5yaKaKjXrj2co8I.png"), alt: "Euphoria" },
  { src: IMG("VzkqlJxScLQy77hQmBsjz2nGc.png"), alt: "Frequencii" },
];

const processSteps = [
  { title: "Discovery", duration: "1–2 weeks", desc: "We start by getting under the skin of your business — interviewing stakeholders, auditing your current brand, and mapping the competitive landscape. The goal is a clear, shared understanding of where you are and where you want to go." },
  { title: "Strategy", duration: "1 week", desc: "With the research in hand, we define the strategic foundation — your positioning, messaging, and the core narrative that sets you apart. This becomes the blueprint that guides every creative and design decision that follows." },
  { title: "Design", duration: "2–3 weeks", desc: "This is where the vision takes shape. We explore directions, refine the details, and craft a distinctive visual identity — from typography and colour to the finer moments that make the work feel unmistakably yours." },
  { title: "Development", duration: "2–4 weeks", desc: "We bring the designs to life with clean, performant build work. Every interaction is considered and every breakpoint tested, so the final product feels as good as it looks across every device and screen." },
  { title: "Launch", duration: "", desc: "With everything polished and approved, we prepare for a smooth launch. We handle the final checks, hand over the assets and guidelines, and make sure you are set up to carry the work forward with confidence." },
];

const testimonials = [
  { quote: "From day one they understood exactly who we wanted to become. The identity they crafted feels bold, timeless, and unmistakably ours—it has completely changed how people recognise and remember us.", author: "Marcus Bennett", role: "Founder of Northlight Studio", image: IMG("CwRDnaK71gnb49cyGrerAsBcbo.png"), label: "A Brand Identity Project" },
  { quote: "Every screen they touched came back sharper, cleaner, and more considered. The visual system they built gives our product a sense of polish and clarity we simply could not achieve on our own.", author: "Elena Ruiz", role: "Head of Product at Cadence Labs", image: IMG("OffbPo1xN9en13sHjYeafadd2w8.png"), label: "A Visual Design Project" },
  { quote: "They found the words we had been struggling to say for years. Our messaging finally sounds human, confident, and consistent—everything we publish now feels like it speaks with one clear voice.", author: "Priya Nair", role: "Brand Lead at Veritas Group", image: IMG("soZrFw6hoHsNFJED4LLBoszdMyE.png"), label: "A Content & Voice Project" },
];

const faqs = [
  { q: "What services do you actually offer?", a: "We focus on brand identity, visual and web design, and content and voice. Whether you need a full rebrand or help refining one part of your presence, we shape a scope that fits where your business is right now." },
  { q: "How long does a typical project take?", a: "Most brand and website projects run between four and eight weeks, depending on scope. After our first call we share a clear timeline with milestones so you always know what is happening and what comes next." },
  { q: "What do you need from me to get started?", a: "Just an initial brief and a short kickoff call. From there we handle the heavy lifting, checking in at key milestones and only asking for your input where your feedback genuinely moves the work forward." },
  { q: "Do you offer ongoing support after launch?", a: "Yes. We offer flexible retainers for continued design, iteration, and support once your project is live, so your brand and website keep evolving alongside your business rather than standing still." },
  { q: "How does pricing and payment work?", a: "We quote a fixed price per project based on scope, so there are no surprises. Payment is typically split into an upfront deposit and a final balance on delivery, with retainers billed monthly." },
  { q: "Do you work with clients outside New York?", a: "Absolutely. We are based in New York but work with clients around the world, running projects remotely with regular check-ins. Different time zones have never gotten in the way of great work." },
];

const blogPosts = [
  { title: "The art of white space in designing user interfaces", excerpt: "Understanding how negative space shapes user experience and visual hierarchy.", date: "Jun 2, 2026", category: "Design", image: IMG("rnAwUwI9QEUlWFS2AfAcBqfS2E.png") },
  { title: "Building a brand voice that lasts for our clients", excerpt: "How to define a tone of voice that stays consistent as your company grows.", date: "Jun 9, 2026", category: "Branding", image: IMG("GFfZxqU7yP7bDfc4SYK6oTjxhP0.png") },
  { title: "Designing for performance from day one", excerpt: "Why speed is a design decision long before it becomes an engineering one.", date: "Jun 16, 2026", category: "Development", image: IMG("yvaxkMMXh26b1c0HcnRgQxBeYE.png") },
  { title: "Why constraints make better design work", excerpt: "How boundaries drive creativity and lead to stronger, more focused outcomes.", date: "Jun 23, 2026", category: "Insights", image: IMG("3USy4GbPVcqIt9mlHN3CTHVLc.png") },
];

/* ─── sub-components ─── */

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

function FAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-7 text-left group cursor-pointer">
        <span className="font-serif text-xl md:text-2xl text-white group-hover:text-white/80 transition-colors pr-8">{item.q}</span>
        <span className="text-2xl text-white/40 shrink-0 transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-96 pb-7" : "max-h-0"}`}>
        <p className="text-white/50 text-base leading-relaxed max-w-3xl">{item.a}</p>
      </div>
    </div>
  );
}

/* ─── MARQUEE ─── */
function Marquee({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="inline-flex animate-marquee">
        {children}
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function UiUxDesignPage() {
  const [activeService, setActiveService] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black -mt-24">

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-end overflow-hidden">
        {/* Background video */}
        <video src="/ui-ux-design-static/media/44061-720.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero content overlay */}
        <div className="relative z-10 w-full px-6 md:px-16 pb-16 md:pb-20">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-sm tracking-[0.2em] uppercase text-white/60 mb-6">
            Creative Agency
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }} className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] max-w-4xl">
            Designed to endure.<br />
            Written to resonate.<br />
            Considered in every detail.
          </motion.h1>

          {/* Service counter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 flex items-center gap-6">
            <div className="flex items-center gap-2 text-white/40 text-sm font-mono">
              <span className="text-white">01</span>
              <span>/</span>
              <span>04</span>
            </div>
            <div>
              <h4 className="font-serif text-xl text-white">Brand Identity</h4>
              <p className="text-white/50 text-sm mt-1 max-w-md">We believe a brand identity is a body of work, not just a logo.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SPECTRUM MARQUEE ──────────────────────────────────── */}
      <section className="py-8 border-b border-white/10">
        <Marquee className="text-white/30">
          <span className="text-7xl md:text-9xl font-serif italic mx-8">Spectrum</span>
          <span className="text-sm tracking-[0.3em] uppercase mx-8 self-center">More About Us</span>
          <span className="text-7xl md:text-9xl font-serif italic mx-8">Spectrum</span>
          <span className="text-sm tracking-[0.3em] uppercase mx-8 self-center">More About Us</span>
        </Marquee>
      </section>

      {/* ── MANIFESTO ──────────────────────────────────────── */}
      <section className="py-28 md:py-40 px-6 md:px-16 max-w-[1400px] mx-auto">
        <FadeIn>
          <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.2] text-white/85 max-w-5xl">
            We&apos;re a <em className="not-italic text-white">brand</em> and <em className="not-italic text-white">editorial</em> studio for companies that would rather be <em className="not-italic text-white">understood</em> than noticed. We build identities, publications, and content systems with the patience of print. Fewer projects, closer attention, work that reads the same on a <em className="not-italic text-white">billboard</em> as it does on a <em className="not-italic text-white">business card.</em>
          </p>
        </FadeIn>
      </section>

      {/* ── FEATURED WORK ──────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-32 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.15}>
              <div className="group relative overflow-hidden rounded-sm cursor-pointer">
                {/* Background */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={p.bg} alt={`${p.name} background`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                {/* Thumbnail + info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end gap-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden relative shrink-0 border border-white/20">
                      <Image src={p.thumb} alt={`${p.name} thumbnail`} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl">{p.name}</h3>
                      <p className="text-white/50 text-sm mt-1 leading-snug">{p.desc}</p>
                      <span className="text-white/30 text-xs mt-2 block">{p.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────── */}
      <section className="bg-[#fafafa] text-black py-28 md:py-40 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="text-sm tracking-[0.2em] uppercase text-black/40 mb-4">What we offer</p>
            <h2 className="font-serif text-4xl md:text-6xl mb-4">A focused set of brand, web, and digital design services shaped to elevate your presence.</h2>
          </FadeIn>

          {/* Service tabs */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Tab list */}
            <div className="space-y-0">
              {services.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => setActiveService(i)}
                  className={`w-full text-left py-6 border-t border-black/10 flex items-start gap-4 transition-colors cursor-pointer group ${activeService === i ? "text-black" : "text-black/30 hover:text-black/60"}`}
                >
                  <span className="text-xs font-mono mt-1.5">Service {s.num}</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl md:text-3xl">{s.title}</h3>
                    <div className={`overflow-hidden transition-all duration-500 ${activeService === i ? "max-h-60 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="text-black/50 text-sm leading-relaxed">{s.desc}</p>
                      <div className="mt-4 text-xs text-black/40">
                        <span>Starting at</span>
                        <span className="ml-2 text-black font-serif text-2xl">{s.price}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Service image */}
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden hidden lg:block">
              <Image
                key={activeService}
                src={services[activeService].bg}
                alt={services[activeService].title}
                fill
                className="object-cover transition-opacity duration-500"
              />
              <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full overflow-hidden border-2 border-white/30">
                <Image src={services[activeService].icon} alt="" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS MARQUEE ────────────────────────────── */}
      <section className="py-16 border-b border-white/10">
        <Marquee>
          {clientLogos.map((logo) => (
            <div key={logo.alt} className="mx-10 flex items-center h-8 opacity-40 hover:opacity-70 transition-opacity">
              <Image src={logo.src} alt={logo.alt} width={120} height={32} className="object-contain h-6 w-auto invert" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* ── PROCESS ────────────────────────────────────────── */}
      <section className="py-28 md:py-40 px-6 md:px-16 max-w-[1400px] mx-auto">
        <FadeIn>
          <p className="font-serif text-4xl md:text-6xl leading-[1.15] max-w-4xl">
            A <em className="not-italic text-white/60">refined</em> process built on <em className="not-italic text-white/60">clarity.</em>
          </p>
        </FadeIn>

        <div className="mt-20 space-y-0">
          {processSteps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.08}>
              <div className="border-t border-white/10 py-10 grid grid-cols-1 md:grid-cols-12 gap-6 group">
                <div className="md:col-span-3 flex items-baseline gap-3">
                  <span className="text-white/20 font-mono text-sm">0{i + 1}</span>
                  <h3 className="font-serif text-2xl md:text-3xl group-hover:text-white transition-colors text-white/80">{step.title}</h3>
                </div>
                {step.duration && (
                  <div className="md:col-span-2">
                    <span className="text-xs tracking-[0.15em] uppercase text-white/30 border border-white/10 px-3 py-1 rounded-full">{step.duration}</span>
                  </div>
                )}
                <div className={`${step.duration ? "md:col-span-7" : "md:col-span-9"}`}>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS (STICKY STACKING CARDS) ───────────── */}
      <section className="px-6 md:px-16 max-w-[1200px] mx-auto pt-28 md:pt-40 pb-40">
        <FadeIn className="mb-12 md:mb-16 text-center md:text-left">
          <p className="text-sm tracking-[0.2em] uppercase text-white/40">Hear from our clients</p>
        </FadeIn>

        {/* 
          Native CSS Sticky Stack (One Upon One):
          - All cards stick at the exact same 'top' position (perfectly overlapping).
          - margin-bottom creates the scroll distance.
          - As you scroll, the next card slides up and completely covers the previous one.
        */}
        <div className="relative mx-auto max-w-4xl">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className="sticky"
              style={{
                top: '20vh',
                zIndex: 10 + i,
                marginBottom: i === testimonials.length - 1 ? '0' : '50vh',
              }}
            >
              <div
                className="bg-white text-black rounded-sm overflow-hidden"
                style={{
                  boxShadow: '0 -20px 40px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.5)',
                }}
              >
                <div className="p-10 md:p-16 flex flex-col justify-between min-h-[420px] md:min-h-[480px]">
                  {/* Label */}
                  <span className="text-xs tracking-[0.15em] uppercase text-black/30 mb-8 block">{t.label}</span>

                  {/* Quote */}
                  <div className="flex-1">
                    <span className="text-6xl md:text-8xl font-serif text-black/10 leading-none block -mb-6 md:-mb-4">&ldquo;</span>
                    <p className="font-serif text-2xl md:text-4xl leading-[1.4] max-w-3xl">{t.quote}</p>
                  </div>

                  {/* Author */}
                  <div className="mt-12 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-xl">{t.author}</h4>
                      <p className="text-black/40 text-sm mt-1">{t.role}</p>
                    </div>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden relative shrink-0 grayscale">
                      <Image src={t.image} alt={t.author} fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="py-28 md:py-40 px-6 md:px-16 max-w-[1000px] mx-auto">
        <FadeIn>
          <p className="font-serif text-4xl md:text-6xl leading-[1.15] mb-4">
            Your <em className="not-italic text-white/60">questions,</em> answered.
          </p>
          <p className="text-white/40 mb-16">A quick rundown of how we work and what to expect.</p>
        </FadeIn>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} item={faq} />
          ))}
        </div>

        <FadeIn className="mt-16 text-center">
          <p className="text-white/50 mb-4">Still looking for answers or need a good chat?</p>
          <Link href="/book" className="inline-block font-serif text-lg border-b border-white/40 pb-1 hover:border-white transition-colors">
            Contact us
          </Link>
        </FadeIn>
      </section>

      {/* ── BLOG ────────────────────────────────────────────── */}
      <section className="py-28 md:py-40 px-6 md:px-16 max-w-[1400px] mx-auto border-t border-white/10">
        <FadeIn>
          <p className="font-serif text-4xl md:text-6xl leading-[1.15] mb-4">
            From the <em className="not-italic text-white/60">studio.</em>
          </p>
          <p className="text-white/40 mb-16 max-w-2xl">Essays, notes, and perspectives on brand, design, and the craft of telling better stories.</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, i) => (
            <FadeIn key={post.title} delay={i * 0.1}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-4">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs tracking-[0.15em] uppercase text-white/30 border border-white/10 px-2 py-0.5 rounded-full">{post.category}</span>
                  <span className="text-xs text-white/20">{post.date}</span>
                </div>
                <h3 className="font-serif text-lg leading-snug group-hover:text-white/70 transition-colors">{post.title}</h3>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <Link href="#" className="text-sm tracking-[0.15em] uppercase text-white/40 border-b border-white/20 pb-1 hover:text-white hover:border-white transition-colors">
            Read More
          </Link>
        </FadeIn>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-40 md:py-56 px-6 md:px-16 text-center bg-[#fafafa] text-black">
        <FadeIn>
          <h2 className="font-serif text-5xl md:text-8xl lg:text-9xl leading-[1.05]">
            Great Work<br />Starts Here
          </h2>
          <Link
            href="/book"
            className="inline-block mt-12 px-10 py-4 bg-black text-white text-sm tracking-[0.2em] uppercase hover:bg-black/80 transition-colors rounded-full"
          >
            Start a project
          </Link>
        </FadeIn>
      </section>

      {/* ── FOOTER (Spectrum branded, black bg) ──────────────── */}
      <Footer />

      {/* ── MARQUEE CSS ─────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
