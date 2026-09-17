"use client";

import React, { useState } from "react";
import { createBookingAction } from "@/app/actions/bookings";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, Video, CheckCircle2, AlertCircle } from "lucide-react";

type MeetingType = "DISCOVERY" | "STRATEGY" | "HANDOFF";

const meetingTypes: { id: MeetingType; title: string; duration: string; desc: string }[] = [
  { id: "DISCOVERY", title: "15-Min Discovery Call", duration: "15 mins", desc: "Quick intro to evaluate your agency project scope and timeline." },
  { id: "STRATEGY", title: "45-Min UX Strategy & Demo", duration: "45 mins", desc: "Deep-dive walkthrough of selected templates, UI systems, and pricing." },
  { id: "HANDOFF", title: "60-Min Full Engineering Review", duration: "60 mins", desc: "Technical architecture evaluation for custom web/app software builds." },
];

const availableTimeSlots = [
  "10:00 AM", "11:00 AM", "01:30 PM", "02:30 PM", "03:45 PM", "05:00 PM"
];

export const MeetingScheduler: React.FC = () => {
  const [selectedType, setSelectedType] = useState<MeetingType>(meetingTypes[0].id);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [selectedSlot, setSelectedSlot] = useState(availableTimeSlots[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await createBookingAction({
      guestName: name,
      guestEmail: email,
      guestNotes: notes,
      meetingType: selectedType,
      slotDate: selectedDate,
      slotTime: selectedSlot,
    });

    setLoading(false);
    if (res.success && res.booking) {
      setConfirmedBooking(res.booking);
    } else {
      setErrorMsg(res.error || "Failed to confirm meeting.");
    }
  };

  if (confirmedBooking) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-black/5 max-w-xl mx-auto text-center">
        <div className="w-16 h-16 bg-crimson-light text-crimson rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <Badge>MEETING CONFIRMED</Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal mt-3">You're Scheduled!</h2>
        <p className="text-sm text-charcoal-muted mt-2">
          An invitation and calendar invite have been logged for <span className="font-semibold text-charcoal">{confirmedBooking.guestEmail}</span>.
        </p>

        <div className="mt-8 bg-canvas p-6 rounded-2xl border border-black/5 text-left space-y-3">
          <div className="flex items-center gap-3 text-sm text-charcoal">
            <Clock className="w-4 h-4 text-crimson shrink-0" />
            <span>{confirmedBooking.meetingType}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-charcoal">
            <Calendar className="w-4 h-4 text-crimson shrink-0" />
            <span>{confirmedBooking.slotDate} at {confirmedBooking.slotTime}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-charcoal">
            <Video className="w-4 h-4 text-crimson shrink-0" />
            <a href={confirmedBooking.meetLink} target="_blank" rel="noreferrer" className="text-crimson font-medium hover:underline truncate">
              {confirmedBooking.meetLink}
            </a>
          </div>
        </div>

        <Button
          variant="outline"
          size="md"
          className="mt-8"
          onClick={() => {
            setConfirmedBooking(null);
            setName("");
            setEmail("");
            setNotes("");
          }}
        >
          Book Another Slot
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-black/5 max-w-4xl mx-auto">
      <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column: Meeting Details & Slots */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-charcoal">1. Select Call Format</h3>
            <div className="mt-3 space-y-2.5">
              {meetingTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    selectedType === type.id
                      ? "border-crimson bg-crimson-light/40 shadow-sm"
                      : "border-black/5 hover:border-black/15 bg-canvas/60"
                  }`}
                >
                  <div className="text-xs font-bold text-charcoal flex items-center justify-between">
                    <span>{type.title}</span>
                    <span className="text-crimson text-[10px] font-semibold">{type.duration}</span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted mt-1 leading-relaxed">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-charcoal">2. Choose Date</h3>
            <input
              type="date"
              required
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-2 w-full p-3 rounded-xl border border-black/10 text-xs text-charcoal bg-white focus:outline-none focus:border-crimson"
            />
          </div>

          <div>
            <h3 className="text-lg font-bold text-charcoal">3. Select Time Slot</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {availableTimeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-colors ${
                    selectedSlot === slot
                      ? "bg-crimson text-white border-crimson shadow-sm"
                      : "bg-canvas text-charcoal border-black/5 hover:border-black/20"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Guest Information */}
        <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-black/5 pt-6 md:pt-0 md:pl-10">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-charcoal">4. Your Details</h3>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full text-xs p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                className="w-full text-xs p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Project Topics / Template of Interest</label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share your goals, preferred design templates, or specific requirements..."
                className="w-full text-xs p-3 rounded-xl border border-black/10 focus:outline-none focus:border-crimson resize-none"
              />
            </div>
          </div>

          <div className="mt-8 pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Confirming Slot..." : `Confirm ${selectedSlot} Meeting`}
            </Button>
            <p className="text-[11px] text-charcoal-muted text-center mt-2.5">
              Google Meet conference link generated automatically upon confirmation.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
