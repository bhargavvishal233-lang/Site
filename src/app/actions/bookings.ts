"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { MeetingType, BookingStatus } from "@prisma/client";

export async function createBookingAction(data: {
  guestName: string;
  guestEmail: string;
  guestNotes?: string;
  meetingType: MeetingType;
  slotDate: string;
  slotTime: string;
}) {
  try {
    const booking = await prisma.booking.create({
      data: {
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestNotes: data.guestNotes || null,
        meetingType: data.meetingType,
        slotDate: data.slotDate,
        slotTime: data.slotTime,
        meetLink: `https://meet.google.com/spc-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`,
        status: "SCHEDULED",
      },
    });

    revalidatePath("/admin");
    revalidatePath("/book");
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to schedule booking:", error);
    return { success: false, error: "Unable to schedule meeting." };
  }
}

export async function updateBookingStatusAction(
  bookingId: string,
  status: BookingStatus
) {
  try {
    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    revalidatePath("/admin");
    return { success: true, updated };
  } catch (error) {
    console.error("Failed to update booking:", error);
    return { success: false, error: "Booking update failed." };
  }
}
