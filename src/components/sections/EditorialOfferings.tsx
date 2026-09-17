"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Offering {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  tag: string;
}

const offerings: Offering[] = [
  {
    id: "1",
    name: "Full-Stack Web App Development",
    category: "Software Engineering",
    price: "From $4,500",
    description: "Next.js 15, Supabase PostgreSQL, Prisma ORM, and high-security API architectures.",
    tag: "Next.js 15 / Supabase",
  },
  {
    id: "2",
    name: "Conversion-Focused UI/UX Design System",
    category: "Product Design",
    price: "From $2,800",
    description: "Comprehensive tokenized Figma design system, auto-layouts, micro-animations, and prototypes.",
    tag: "Figma / Tokens",
  },
  {
    id: "3",
    name: "Headless E-Commerce Experience",
    category: "Commerce",
    price: "From $5,200",
    description: "Shopify headless storefronts engineered for sub-second load times and high basket checkout rates.",
    tag: "Shopify / Stripe",
  },
  {
    id: "4",
    name: "Performance Marketing & Funnel CRO",
    category: "Acquisition",
    price: "From $3,000/mo",
    description: "Multi-channel paid ads (Meta, Google, LinkedIn) paired with custom high-converting landing pages.",
    tag: "Attribution & Ads",
  },
  {
    id: "5",
    name: "Custom Agency CRM & Calendar Scheduling",
    category: "Automation",
    price: "From $3,500",
    description: "Self-service booking portals, Google Meet automation, and lead management pipelines.",
    tag: "Cal.com / Google API",
  },
];

export const EditorialOfferings: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>(offerings[0].id);

  return (
    <section className="py-24 bg-canvas-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-crimson">Curated Menu of Services</span>
          <h2 className="text-4xl sm:text-6xl font-serif font-medium text-charcoal mt-3">
            Signature <span className="italic font-normal text-crimson">Offerings</span>
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-3">
            Every service is tailored to deliver immediate velocity and measurable revenue expansion.
          </p>
        </div>

        {/* Editorial Menu List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {offerings.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveItem(item.id)}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                activeItem === item.id
                  ? "bg-white border-crimson/30 shadow-subtle -translate-y-1"
                  : "bg-white/70 border-black/5 hover:bg-white"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-bold text-crimson uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-charcoal">{item.name}</h3>
                </div>
                {/* Dotted leader filler on desktop */}
                <div className="hidden sm:block flex-1 mx-4 border-b border-dotted border-black/15" />
                <div className="text-base font-serif font-bold text-charcoal shrink-0">
                  {item.price}
                </div>
              </div>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-charcoal-muted">
                <p className="max-w-xl leading-relaxed">{item.description}</p>
                <Link href="/book">
                  <Button variant="ghost" size="sm" className="gap-1 text-crimson font-bold p-0 hover:bg-transparent">
                    Inquire <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
