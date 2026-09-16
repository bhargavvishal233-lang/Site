"use client";

import React, { useState } from "react";
import { updateBookingStatusAction } from "@/app/actions/bookings";
import { Video, Calendar, Clock, Check, X } from "lucide-react";

interface BookingRecord {
  id: string;
  guestName: string;
  guestEmail: string;
  guestNotes: string | null;
  meetingType: string;
  slotDate: string;
  slotTime: string;
  meetLink: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
}

export const BookingsList: React.FC<{ initialBookings: BookingRecord[] }> = ({ initialBookings }) => {
  const [bookings, setBookings] = useState(initialBookings);

  const handleStatus = async (id: string, status: "COMPLETED" | "CANCELLED") => {
    const res = await updateBookingStatusAction(id, status);
    if (res.success) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-black/5 text-center">
        <p className="text-sm text-charcoal-muted">No meetings currently scheduled.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-3xl p-6 border border-black/5 shadow-card flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  booking.status === "SCHEDULED"
                    ? "bg-purple-50 text-purple-700 border-purple-200"
                    : booking.status === "COMPLETED"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-neutral-100 text-neutral-500 border-neutral-200"
                }`}
              >
                {booking.status}
              </span>
              <div className="flex items-center gap-1 text-xs font-semibold text-charcoal">
                <Calendar className="w-3.5 h-3.5 text-crimson" />
                <span>{booking.slotDate}</span>
              </div>
            </div>

            <h3 className="text-base font-bold text-charcoal mt-4">{booking.guestName}</h3>
            <p className="text-xs text-charcoal-muted">{booking.guestEmail}</p>

            <div className="mt-4 pt-4 border-t border-black/5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-charcoal">
                <Clock className="w-3.5 h-3.5 text-crimson shrink-0" />
                <span className="font-medium">{booking.slotTime} ({booking.meetingType})</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Video className="w-3.5 h-3.5 text-crimson shrink-0" />
                <a
                  href={booking.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-crimson font-semibold hover:underline truncate"
                >
                  Join Google Meet
                </a>
              </div>
            </div>

            {booking.guestNotes && (
              <p className="mt-3 text-[11px] text-charcoal-muted bg-canvas p-3 rounded-xl border border-black/5">
                "{booking.guestNotes}"
              </p>
            )}
          </div>

          {booking.status === "SCHEDULED" && (
            <div className="mt-6 pt-4 border-t border-black/5 flex items-center gap-2">
              <button
                onClick={() => handleStatus(booking.id, "COMPLETED")}
                className="w-1/2 py-2 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center gap-1 transition-colors"
              >
                <Check className="w-3.5 h-3.5" /> Complete
              </button>
              <button
                onClick={() => handleStatus(booking.id, "CANCELLED")}
                className="w-1/2 py-2 text-xs font-bold rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 flex items-center justify-center gap-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
