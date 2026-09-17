"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";

export const ReservationBookingSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-canvas rounded-3xl p-8 sm:p-14 border border-black/5 shadow-card grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-crimson">Schedule an Encounter</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-charcoal mt-3">
              Reserve Your <span className="italic font-normal text-crimson">Discovery Session</span>
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-4 leading-relaxed">
              Meet directly with our principal designers and technical architects. We analyze your product roadmap and assemble a tailored sprint plan in 45 minutes.
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-xs text-charcoal font-medium">
                <Clock className="w-4 h-4 text-crimson shrink-0" />
                <span>Monday – Friday: 09:00 AM – 06:00 PM EST</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-charcoal font-medium">
                <MapPin className="w-4 h-4 text-crimson shrink-0" />
                <span>Global Remote Presence • Digital Worldwide Studio</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-charcoal font-medium">
                <CheckCircle2 className="w-4 h-4 text-crimson shrink-0" />
                <span>Instant Google Meet calendar confirmation link generated</span>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/book">
                <Button variant="primary" size="lg" className="gap-2 px-8 py-4">
                  <Calendar className="w-4 h-4" /> Open Live Calendar
                </Button>
              </Link>
            </div>
          </div>
          {/* Stylized Visual Frame */}
          <div className="aspect-[4/3] rounded-2xl bg-charcoal p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-neutral-900 to-crimson/70 opacity-90 -z-10" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-crimson-light">Direct Pipeline</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-2">Zero Friction Onboarding</h3>
            </div>
            <div className="pt-6 border-t border-white/10 text-xs text-white/80 space-y-2">
              <p>• 15-Min Executive Introductions</p>
              <p>• 45-Min UI/UX & Architecture Deep-Dive</p>
              <p>• Immediate Proposal and Timeline Estimate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
