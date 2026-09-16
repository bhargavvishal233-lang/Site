"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, PenTool, Code2, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const services = [
  {
    icon: <BarChart3 className="w-6 h-6 text-crimson"/>,
    title: "Performance Marketing",
    description: "Data-driven campaigns across Meta and Google that lower CPA and scale your user acquisition.",
  },
  {
    icon: <PenTool className="w-6 h-6 text-crimson"/>,
    title: "UI/UX & Product Design",
    description: "High-converting web and mobile interfaces built in Figma with complete design systems.",
  },
  {
    icon: <Code2 className="w-6 h-6 text-crimson"/>,
    title: "Full-Stack Web Apps",
    description: "Lightning-fast Next.js applications backed by scalable PostgreSQL databases.",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-crimson"/>,
    title: "Mobile Development",
    description: "Native and hybrid iOS/Android applications built for performance and seamless user experience.",
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge>Our Expertise</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-charcoal mt-6">
            End-to-End <span className="bracket-accent">Digital Engineering</span>
          </h2>
          <p className="mt-4 text-charcoal-muted max-w-2xl mx-auto">
            We don't just design; we build, launch, and scale. Everything you need to grow your digital product under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-card border border-black/5 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-crimson-light flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">{service.title}</h3>
              <p className="text-charcoal-muted leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
