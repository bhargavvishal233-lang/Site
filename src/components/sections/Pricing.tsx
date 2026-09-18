"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Plus, List } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

export const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-32 bg-white flex flex-col items-center justify-center font-sans overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <ScrollReveal>
          <div className="text-center mb-12 relative">
            <h2 className="text-7xl sm:text-[8rem] font-bold tracking-tight text-[#111111] leading-none">
              Pricing
            </h2>
            {/* The Red Slide Pattern Highlight behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-16 sm:w-96 sm:h-24 bg-crimson -z-10 -rotate-2 scale-110 opacity-60 mix-blend-multiply rounded-full blur-xl animate-pulse" />
            <p className="text-[#666666] text-xl mt-6">
              No hidden fees. Upgrade, downgrade, or cancel anytime.
            </p>
          </div>
        </ScrollReveal>

        {/* Toggle inside a floating pill */}
        <ScrollReveal delay={0.1} className="flex justify-center mb-16">
          <div className="relative flex items-center p-1.5 bg-gray-100/50 rounded-full border border-gray-200">
            <button
              className={`relative px-8 py-2 text-sm font-medium transition-colors ${isAnnual ? 'text-[#111]' : 'text-[#888]'}`}
              onClick={() => setIsAnnual(true)}
            >
              {isAnnual && (
                <motion.div
                  layoutId="pricing-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Annually <span className="text-crimson ml-1">-20%</span></span>
            </button>
            <button
              className={`relative px-8 py-2 text-sm font-medium transition-colors ${!isAnnual ? 'text-[#111]' : 'text-[#888]'}`}
              onClick={() => setIsAnnual(false)}
            >
              {!isAnnual && (
                <motion.div
                  layoutId="pricing-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
          </div>
        </ScrollReveal>

        {/* The Main Container */}
        <ScrollReveal delay={0.2}>
          <div className="bg-[#F0F3F7] p-3 sm:p-4 rounded-[2.5rem] flex flex-col gap-3 sm:gap-4 shadow-sm">
            {/* Top Row: 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              
              {/* Card 1: Free */}
              <div className="bg-white rounded-[2rem] p-8 flex flex-col">
                <h3 className="text-2xl font-medium text-[#111] mb-2">Makro Free</h3>
                <p className="text-[#666] text-sm h-10 mb-8">Best for startups that want clarity, speed, and automation.</p>
                <div className="mb-1 flex items-baseline h-[3.5rem]">
                  <span className="text-[3.5rem] font-medium leading-none text-[#111]">$</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isAnnual ? 'annual' : 'monthly'}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="text-[3.5rem] font-medium leading-none text-[#111]"
                    >
                      {isAnnual ? "39" : "49"}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-3xl font-medium text-[#111] ml-1">/mo</span>
                </div>
                <p className="text-[#888] text-sm mb-8">per workspace</p>
                
                {/* Light Button */}
                <button className="relative w-full h-14 rounded-[1.25rem] bg-[#F4F6F8] hover:bg-[#EAECEF] transition-colors overflow-hidden group flex items-center p-1.5 mb-10">
                  <div className="absolute top-1.5 bottom-1.5 left-1.5 w-11 bg-white rounded-[0.85rem] shadow-sm transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-[calc(100%-12px)]" />
                  <div className="relative z-10 w-11 h-11 flex items-center justify-center text-[#888] group-hover:text-[#111] transition-colors duration-500 shrink-0">
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                  <span className="relative z-10 flex-1 text-center font-medium text-[#111] -ml-11 transition-transform duration-500 group-hover:translate-x-2">
                    Try free for 14 days
                  </span>
                </button>

                <ul className="flex-1 flex flex-col">
                  {['Unified financial dashboard', 'Income & expense tracking', 'Basic cashflow overview', 'Monthly summaries', 'Up to 1 workspace'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 py-4 border-t border-gray-100 text-sm text-[#444]">
                      <Plus className="w-4 h-4 text-[#aaa]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2: Pro */}
              <div className="bg-white rounded-[2rem] p-8 flex flex-col">
                <h3 className="text-2xl font-medium text-[#111] mb-2">Makro Pro</h3>
                <p className="text-[#666] text-sm h-10 mb-8">Best for startups that want clarity, speed, and automation.</p>
                <div className="mb-1 flex items-baseline h-[3.5rem]">
                  <span className="text-[3.5rem] font-medium leading-none text-[#111]">$</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isAnnual ? 'annual' : 'monthly'}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="text-[3.5rem] font-medium leading-none text-[#111]"
                    >
                      {isAnnual ? "69" : "79"}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-3xl font-medium text-[#111] ml-1">/mo</span>
                </div>
                <p className="text-[#888] text-sm mb-8">per workspace</p>
                
                {/* Dark Button with Expanding Red Circle Slider */}
                <button className="relative w-full h-14 rounded-[1.25rem] bg-[#353740] overflow-hidden group flex items-center p-1.5 mb-10">
                  <div className="absolute top-1.5 bottom-1.5 left-1.5 w-11 bg-crimson rounded-[0.85rem] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-[calc(100%-12px)]" />
                  <div className="relative z-10 w-11 h-11 flex items-center justify-center text-white transition-colors duration-500 shrink-0">
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                  <span className="relative z-10 flex-1 text-center font-medium text-white -ml-11 transition-transform duration-500 group-hover:translate-x-2">
                    Try free for 14 days
                  </span>
                </button>

                <ul className="flex-1 flex flex-col">
                  <li className="flex items-center gap-4 py-4 border-t border-gray-100 text-sm font-medium text-[#111]">
                    <Check className="w-4 h-4 text-[#111]" /> Everything in Makro Free
                  </li>
                  {['Cashflow forecasting', 'Invoice & revenue tracking', 'Smart insights & alerts', 'Up to 5 workspaces'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 py-4 border-t border-gray-100 text-sm text-[#444]">
                      <Plus className="w-4 h-4 text-[#aaa]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 3: Premium */}
              <div className="bg-white rounded-[2rem] p-8 flex flex-col">
                <h3 className="text-2xl font-medium text-[#111] mb-2">Makro Premium</h3>
                <p className="text-[#666] text-sm h-10 mb-8">Best for startups that want clarity, speed, and automation.</p>
                <div className="mb-1 flex items-baseline h-[3.5rem]">
                  <span className="text-[3.5rem] font-medium leading-none text-[#111]">$</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isAnnual ? 'annual' : 'monthly'}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="text-[3.5rem] font-medium leading-none text-[#111]"
                    >
                      {isAnnual ? "159" : "199"}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-3xl font-medium text-[#111] ml-1">/mo</span>
                </div>
                <p className="text-[#888] text-sm mb-8">per workspace</p>
                
                {/* Light Button */}
                <button className="relative w-full h-14 rounded-[1.25rem] bg-[#F4F6F8] hover:bg-[#EAECEF] transition-colors overflow-hidden group flex items-center p-1.5 mb-10">
                  <div className="absolute top-1.5 bottom-1.5 left-1.5 w-11 bg-white rounded-[0.85rem] shadow-sm transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-[calc(100%-12px)]" />
                  <div className="relative z-10 w-11 h-11 flex items-center justify-center text-[#888] group-hover:text-[#111] transition-colors duration-500 shrink-0">
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                  <span className="relative z-10 flex-1 text-center font-medium text-[#111] -ml-11 transition-transform duration-500 group-hover:translate-x-2">
                    Try free for 14 days
                  </span>
                </button>

                <ul className="flex-1 flex flex-col">
                  <li className="flex items-center gap-4 py-4 border-t border-gray-100 text-sm font-medium text-[#111]">
                    <Check className="w-4 h-4 text-[#111]" /> Everything in Makro Pro
                  </li>
                  {['Advanced forecasting models', 'Scenario planning & simulations', 'API access', 'Dedicated onboarding'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 py-4 border-t border-gray-100 text-sm text-[#444]">
                      <Plus className="w-4 h-4 text-[#aaa]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom Row: Enterprise */}
            <div className="bg-[#E4E9F1] rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-2">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium text-[#444] mb-4">
                  <List className="w-4 h-4" /> Enterprise plans
                </div>
                <h3 className="text-3xl font-medium text-[#111] mb-3">Get custom pricing</h3>
                <p className="text-[#555] leading-relaxed">
                  If you manage high transaction volumes, multiple entities, or require custom integrations, our team can tailor Makro to your needs.
                </p>
              </div>
              
              {/* Dark Button with Expanding Red Circle Slider */}
              <button className="relative w-[280px] shrink-0 h-16 rounded-[1.5rem] bg-[#353740] overflow-hidden group flex items-center p-2">
                <div className="absolute top-2 bottom-2 left-2 w-12 bg-crimson rounded-[1rem] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-[calc(100%-16px)]" />
                <div className="relative z-10 w-12 h-12 flex items-center justify-center text-white transition-colors duration-500 shrink-0">
                  <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                </div>
                <span className="relative z-10 flex-1 text-center font-medium text-lg text-white -ml-12 transition-transform duration-500 group-hover:translate-x-2">
                  Contact sales
                </span>
              </button>
            </div>
            
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
