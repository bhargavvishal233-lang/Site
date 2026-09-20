"use client";

import React, { useState } from "react";
import { Template } from "@/types/template";
import { Button } from "@/components/ui/Button";
import { X, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { createInquiryAction } from "@/app/actions/inquiries";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "$2,500 - $5,000 (Sprint MVP)",
    notes: "",
  });

  if (!isOpen || !template) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await createInquiryAction({
        clientName: formData.name,
        clientEmail: formData.email,
        company: formData.company,
        budgetRange: formData.budget,
        templateId: template.id,
        templateName: template.title,
        notes: formData.notes,
      });

      if (res.success) {
        setSubmitted(true);
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          budget: "$2,500 - $5,000 (Sprint MVP)",
          notes: "",
        });
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        setErrorMessage(res.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err: any) {
      console.error("Error submitting inquiry:", err);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="p-1 rounded-full hover:bg-canvas transition-colors"
            >
              <X className="w-5 h-5 text-charcoal-muted" />
            </button>
          </div>

          {/* Selected Template Summary Card */}
          <div className="mt-6 bg-canvas p-4 rounded-2xl border border-black/5">
            <span className="text-[10px] font-semibold text-charcoal-muted uppercase">Selected Design:</span>
            <div className="text-sm font-bold text-charcoal mt-1">{template.title}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {template.techStack.map((tech) => (
                <span key={tech} className="text-[9px] bg-white px-2 py-0.5 rounded text-charcoal font-medium shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {submitted ? (
            <div className="py-16 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-charcoal">Inquiry Received</h4>
              <p className="text-xs text-charcoal-muted mt-2 max-w-xs mx-auto leading-relaxed">
                A confirmation email has been dispatched to your email address and our strategy team. We will be in touch shortly!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs text-charcoal bg-white p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson transition-colors"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs text-charcoal bg-white p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson transition-colors"
                  placeholder="jane@company.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Company / Project Name</label>
                <input
                  type="text"
                  disabled={isSubmitting}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full text-xs text-charcoal bg-white p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson transition-colors"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Estimated Budget Range</label>
                <select
                  value={formData.budget}
                  disabled={isSubmitting}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full text-xs text-charcoal bg-white p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson bg-white transition-colors"
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
                  disabled={isSubmitting}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-xs text-charcoal bg-white p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson resize-none transition-colors"
                  placeholder="Tell us any specific features, brand guidelines, or timelines..."
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full mt-4 gap-2 justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Inquiry...
                  </>
                ) : (
                  <>
                    Submit Design Inquiry <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        <div className="pt-4 border-t border-black/5 text-[11px] text-charcoal-muted text-center">
          Inquiries are automatically logged into your agency CRM pipeline and emailed instantly.
        </div>
      </div>
    </div>
  );
};
