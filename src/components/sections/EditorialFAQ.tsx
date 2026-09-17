"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How fast can you launch an MVP or redesign?",
    a: "Our standard sprint turnaround is 2 to 4 weeks for full-stack Next.js web applications, brand systems, and custom templates.",
  },
  {
    q: "Do you build custom software or only design UI/UX?",
    a: "We engineer both. We build robust, scalable architectures with Next.js 15, PostgreSQL, Supabase, and custom CRM systems paired with high-fidelity Figma designs.",
  },
  {
    q: "Can we start with one of your pre-built design templates?",
    a: "Yes! You can browse our interactive Template Gallery, choose any template, and our team will customize the code, branding, and workflows to your exact specifications.",
  },
  {
    q: "How does the meeting booking process work?",
    a: "Use our online scheduling calendar to pick a slot. A calendar invite and Google Meet link are automatically generated for you and our engineering leads.",
  },
];

export const EditorialFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-crimson">Inquiries Answered</span>
        <h2 className="text-3xl sm:text-5xl font-serif font-medium text-charcoal mt-3">
          Frequently Asked <span className="italic font-normal text-crimson">Questions</span>
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="bg-white rounded-2xl p-6 border border-black/5 shadow-card cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between text-sm font-bold text-charcoal">
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-crimson transition-transform duration-300 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === idx && (
              <p className="mt-3 text-xs text-charcoal-muted leading-relaxed border-t border-black/5 pt-3">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
