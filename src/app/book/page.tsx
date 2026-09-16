import React from "react";
import { MeetingScheduler } from "@/components/booking/MeetingScheduler";
import { Badge } from "@/components/ui/Badge";
import { Footer } from "@/components/layout/Footer";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <section className="pt-12 pb-14 max-w-7xl mx-auto px-6 text-center">
        <Badge>ONLINE CALENDAR</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal mt-4">
          Book a <span className="bracket-accent text-crimson">Strategy Call</span>
        </h1>
        <p className="text-charcoal-muted mt-3 max-w-xl mx-auto text-sm sm:text-base">
          Schedule a direct session with our digital engineering and UI/UX team. Choose a convenient time slot below.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <MeetingScheduler />
      </section>

      <Footer />
    </div>
  );
}
