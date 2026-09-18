"use client";

import React, { useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const faqs = [
  {
    q: "What's your process for designing and developing a new website?",
    a: "We start with a comprehensive discovery phase to understand your brand and goals. Then, we move into wireframing, high-fidelity design in Figma, and finally development using Next.js and modern web standards. We ensure you are involved at every milestone.",
  },
  {
    q: "What if I need to make changes or add features in the future?",
    a: "Our architectures are built to be highly scalable and maintainable. We offer ongoing retainer packages for continuous development, or we can scope out new features on a project basis as your needs evolve.",
  },
  {
    q: "Do you offer SEO services?",
    a: "Yes. Every website we build includes technical on-page SEO best practices out of the box (fast load times, semantic HTML, meta tags). We also offer advanced performance marketing and funnel optimization services.",
  },
  {
    q: "How long does it typically take to see results from my brand's new website?",
    a: "While timelines vary based on complexity, most of our custom website projects launch within 4 to 8 weeks. You'll start seeing improved engagement metrics and conversion rates shortly after launch.",
  },
  {
    q: "How do you ensure the website is mobile-friendly?",
    a: "We take a mobile-first approach to design and development. Every component is rigorously tested across devices and screen sizes to ensure a flawless responsive experience.",
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white font-sans text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        
        {/* Left Column: Title and Intro */}
        <div className="md:col-span-5 flex flex-col space-y-6">
          <ScrollReveal>
            <h2 className="text-7xl sm:text-8xl md:text-[9rem] font-bold tracking-tight leading-none mb-4">
              FAQ
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[#666666] text-xl max-w-sm leading-relaxed">
              We've heard it all. Here's everything you need to know before working with us.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="pt-8">
              <button className="flex items-center gap-3 text-xl font-medium hover:opacity-70 transition-opacity">
                <ArrowDownRight className="w-5 h-5 text-crimson" />
                Ask a question
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Accordion */}
        <div className="md:col-span-7 flex flex-col justify-start mt-4 md:mt-0">
          <div className="border-b border-gray-200">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <ScrollReveal 
                  key={idx} 
                  delay={0.1 * idx}
                  className="border-t border-gray-200"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full py-8 flex justify-between items-center text-left group"
                  >
                    <h3 className="text-lg sm:text-xl font-medium pr-8 group-hover:text-crimson transition-colors">
                      {faq.q}
                    </h3>
                    <div className={`relative w-6 h-6 flex items-center justify-center shrink-0 text-crimson transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                      <div className="absolute w-5 h-[2px] bg-current rounded-full" />
                      <div className={`absolute w-5 h-[2px] bg-current rounded-full transition-transform duration-500 ${isOpen ? "rotate-0" : "rotate-90"}`} />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#666666] text-base leading-relaxed pb-8 pr-12">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
