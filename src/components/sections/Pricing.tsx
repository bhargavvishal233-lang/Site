"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const tiers = [
  {
    name: "Design Prototype",
    price: "$2,500",
    description: "Perfect for startups needing a high-fidelity Figma prototype.",
    features: ["UX Research & Wireframing", "High-Fidelity UI Design", "Interactive Prototype", "2 Revision Rounds"],
    isPopular: false,
  },
  {
    name: "Full Build",
    price: "$8,500",
    description: "Complete design to code delivery. Ready for production.",
    features: ["Everything in Design", "Next.js Frontend Development", "CMS Integration", "SEO Optimization", "1 Month Post-Launch Support"],
    isPopular: true,
  },
];

export const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge>Transparent Pricing</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal mt-6">
            Invest in <span className="bracket-accent">Quality</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`bg-white rounded-3xl p-8 relative shadow-card border ${
                tier.isPopular ? "border-crimson shadow-xl" : "border-black/5"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-crimson text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-charcoal">{tier.name}</h3>
              <div className="mt-4 flex items-baseline text-charcoal">
                <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                <span className="text-charcoal-muted ml-1 font-medium">/project</span>
              </div>
              <p className="mt-4 text-charcoal-muted">{tier.description}</p>
              
              <ul className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-crimson"/>
                    <span className="text-charcoal font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full mt-8" variant={tier.isPopular ? "primary" : "outline"}>
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
