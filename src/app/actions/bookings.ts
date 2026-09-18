"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createBookingAction(data: {
  guestName: string;
  guestEmail: string;
  guestNotes?: string;
  meetingType: string;
  slotDate: string;
  slotTime: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (userId) {
      await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId,
          email: data.guestEmail,
          name: data.guestName,
        },
      });
    }

    const randomMeetingId = Math.random().toString(36).substring(2, 6) + "-" + Math.random().toString(36).substring(2, 6);

    const booking = await prisma.booking.create({
      data: {
        userId: userId || null,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestNotes: data.guestNotes || null,
        meetingType: data.meetingType,
        slotDate: data.slotDate,
        slotTime: data.slotTime,
        meetLink: `https://meet.google.com/spc-${randomMeetingId}`,
        status: "SCHEDULED",
      },
    });

    // Send emails to customer and admin
    import("@/lib/email/mailer").then(({ handleBookingNotification }) => {
      handleBookingNotification({
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        meetingType: data.meetingType,
        slotDate: data.slotDate,
        slotTime: data.slotTime,
        meetLink: booking.meetLink || "",
      }).catch(console.error);
    });

    revalidatePath("/admin");
    revalidatePath("/book");
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, error: "Failed to record booking in Supabase." };
  }
}

export async function updateBookingStatusAction(
  bookingId: string,
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
) {
  try {
    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    revalidatePath("/admin");
    return { success: true, updated };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return { success: false, error: "Failed to update booking." };
  }
}
