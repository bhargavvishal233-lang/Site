"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { LeadsPipelineTable } from "@/components/admin/LeadsPipelineTable";
import { BookingsList } from "@/components/admin/BookingsList";

export function AdminPortalView({ initialLeads, initialBookings }: { initialLeads: any[]; initialBookings: any[] }) {
  const [activeTab, setActiveTab] = useState<"leads" | "bookings">("leads");

  return (
    <div className="space-y-8">
      <AdminHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        leadCount={initialLeads.length}
        bookingCount={initialBookings.length}
      />

      {activeTab === "leads" ? (
        <LeadsPipelineTable initialLeads={initialLeads} />
      ) : (
        <BookingsList initialBookings={initialBookings} />
      )}
    </div>
  );
}
