"use client";

import React from "react";
import Link from "next/link";
import { Users, Calendar, TrendingUp, ArrowUpRight } from "lucide-react";

interface AdminHeaderProps {
  activeTab: "leads" | "bookings";
  onTabChange: (tab: "leads" | "bookings") => void;
  leadCount: number;
  bookingCount: number;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onTabChange,
  leadCount,
  bookingCount,
}) => {
  return (
    <div className="space-y-8">
      {/* Top Title & Links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-crimson">Agency Operations</span>
          <h1 className="text-3xl font-extrabold text-charcoal mt-1">Client CRM & Pipeline</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/book"
            target="_blank"
            className="text-xs font-semibold text-charcoal-muted hover:text-crimson flex items-center gap-1 bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm"
          >
            Public Booking Page <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/templates"
            target="_blank"
            className="text-xs font-semibold text-charcoal-muted hover:text-crimson flex items-center gap-1 bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm"
          >
            Live Templates <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-crimson-light text-crimson flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-charcoal">{leadCount}</div>
            <div className="text-xs text-charcoal-muted font-medium">Active Inquiries / Leads</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-charcoal flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-charcoal">{bookingCount}</div>
            <div className="text-xs text-charcoal-muted font-medium">Scheduled Meetings</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-charcoal">94.2%</div>
            <div className="text-xs text-charcoal-muted font-medium">Response Rate (SLA &lt; 2h)</div>
          </div>
        </div>
      </div>

      {/* Navigation Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-black/5 pb-4">
        <button
          onClick={() => onTabChange("leads")}
          className={`px-5 py-2 text-xs font-bold rounded-full transition-colors ${
            activeTab === "leads"
              ? "bg-crimson text-white shadow-sm"
              : "bg-white text-charcoal-muted hover:text-charcoal border border-black/5"
          }`}
        >
          Inquiry Pipeline ({leadCount})
        </button>
        <button
          onClick={() => onTabChange("bookings")}
          className={`px-5 py-2 text-xs font-bold rounded-full transition-colors ${
            activeTab === "bookings"
              ? "bg-crimson text-white shadow-sm"
              : "bg-white text-charcoal-muted hover:text-charcoal border border-black/5"
          }`}
        >
          Booked Calls & Schedule ({bookingCount})
        </button>
      </div>
    </div>
  );
};
