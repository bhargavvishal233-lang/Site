"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const Showcase: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <Badge>Featured Work</Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal mt-6">
              Proven <span className="bracket-accent">Design Systems</span>
            </h2>
          </div>
          <Link href="/templates">
            <Button className="gap-2 hidden md:flex" variant="outline">
              View All Templates <ArrowRight className="w-4 h-4"/>
            </Button>
          </Link>
        </div>

        {/* Mockup Grid - To be replaced with actual template data in Phase 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-3xl bg-canvas border border-black/5 overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
                <div className="w-[80%] h-[80%] bg-white rounded-t-xl shadow-xl border border-black/10 translate-y-8 group-hover:translate-y-4 transition-transform duration-500 flex items-center justify-center">
                  <span className="text-charcoal-muted font-medium">Project Preview {item}</span>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-charcoal">Fintech Dashboard UI</h3>
                <p className="text-charcoal-muted mt-2">Next.js • Tailwind • Shadcn</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <Link className="mt-10 block md:hidden" href="/templates">
          <Button className="w-full gap-2" variant="outline">
            View All Templates <ArrowRight className="w-4 h-4"/>
          </Button>
        </Link>
      </div>
    </section>
  );
};
