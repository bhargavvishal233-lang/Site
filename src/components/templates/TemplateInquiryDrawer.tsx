"use client";

import React, { useState } from "react";
import { Template } from "@/types/template";
import { Button } from "@/components/ui/Button";
import { X, Send, CheckCircle2 } from "lucide-react";

interface TemplateInquiryDrawerProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateInquiryDrawer: React.FC<TemplateInquiryDrawerProps> = ({
  template,
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "$3k - $5k",
    notes: "",
  });

  if (!isOpen || !template) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-crimson">
                Template Inquiry
              </span>
              <h3 className="text-xl font-bold text-charcoal mt-0.5">Start With This Design</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-canvas">
              <X className="w-5 h-5 text-charcoal-muted" />
            </button>
          </div>

          {/* Selected Template Summary Card */}
          <div className="mt-6 bg-canvas p-4 rounded-2xl border border-black/5">
            <span className="text-[10px] font-semibold text-charcoal-muted uppercase">Selected Design:</span>
            <div className="text-sm font-bold text-charcoal mt-1">{template.title}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {template.techStack.map((tech) => (
                <span key={tech} className="text-[9px] bg-white px-2 py-0.5 rounded text-charcoal font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {submitted ? (
            <div className="py-16 text-center">
              <div className="w-12 h-12 bg-crimson-light text-crimson rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-charcoal">Inquiry Received</h4>
              <p className="text-xs text-charcoal-muted mt-2 max-w-xs mx-auto">
                We have recorded your selected design ({template.title}). Our strategy team will reach out with a customized deployment proposal.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson"
                  placeholder="jane@company.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Company / Project Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Estimated Budget Range</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson bg-white"
                >
                  <option>$2,500 - $5,000 (Sprint MVP)</option>
                  <option>$5,000 - $10,000 (Full Design & Code)</option>
                  <option>$10,000+ (Custom Enterprise & CRM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Project Details & Customizations</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson resize-none"
                  placeholder="Tell us any specific features, brand guidelines, or timelines..."
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-4 gap-2">
                Submit Design Inquiry <Send className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>

        <div className="pt-4 border-t border-black/5 text-[11px] text-charcoal-muted text-center">
          Inquiries are automatically logged into your agency CRM pipeline.
        </div>
      </div>
    </div>
  );
};
