"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { handleTemplateInquiryNotification } from "@/lib/email/mailer";

export async function createInquiryAction(data: {
  clientName: string;
  clientEmail: string;
  company?: string;
  budgetRange?: string;
  templateId?: string;
  templateName?: string;
  notes?: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    // If logged in and user record doesn't exist in Postgres yet, upsert it
    if (userId) {
      await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId,
          email: data.clientEmail,
          name: data.clientName,
          company: data.company || null,
        },
      });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        userId: userId || null,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        company: data.company || null,
        budgetRange: data.budgetRange || "$3k - $5k",
        templateId: data.templateId || null,
        templateName: data.templateName || null,
        notes: data.notes || null,
        status: "NEW",
      },
    });

    revalidatePath("/admin");

    // Dispatch automated confirmation emails to both client and admin
    await handleTemplateInquiryNotification({
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      templateName: data.templateName || "Custom Template Blueprint",
      templateId: data.templateId,
      company: data.company,
      budgetRange: data.budgetRange,
      notes: data.notes,
    });

    return { success: true, inquiry };
  } catch (error: any) {
    console.error("[Inquiries Action] Failed to process inquiry:", error);
    return { success: false, error: error?.message || "Failed to submit inquiry to Supabase." };
  }
}

export async function updateInquiryStatusAction(
  inquiryId: string,
  status: "NEW" | "CONTACTED" | "MEETING_SCHEDULED" | "PROPOSAL_SENT" | "CLOSED_WON" | "CLOSED_LOST"
) {
  try {
    const updated = await prisma.inquiry.update({
      where: { id: inquiryId },
      data: { status },
    });

    revalidatePath("/admin");
    return { success: true, updated };
  } catch (error) {
    console.error("Status update error:", error);
    return { success: false, error: "Unable to update inquiry status." };
  }
}
