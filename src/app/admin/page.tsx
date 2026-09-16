import React from "react";
import { prisma } from "@/lib/prisma";
import { AdminPortalView } from "@/components/admin/AdminPortalView";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Fetch real-time data via Prisma
  const [inquiries, bookings] = await Promise.all([
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-canvas pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <AdminPortalView initialLeads={inquiries as any} initialBookings={bookings as any} />
      </div>
    </div>
  );
}
