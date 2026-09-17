"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleTemplateInquiryNotification } from "@/lib/email/mailer";
import { InquiryStatus } from "@prisma/client";

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
    let inquiry = null;
    try {
      inquiry = await prisma.inquiry.create({
        data: {
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
    } catch (dbError) {
      console.warn("[Inquiries Action] Database insert skipped or failed:", dbError);
    }

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
    return { success: false, error: error?.message || "Failed to submit inquiry." };
  }
}

export async function updateInquiryStatusAction(
  inquiryId: string,
  status: InquiryStatus
) {
  try {
    const updated = await prisma.inquiry.update({
      where: { id: inquiryId },
      data: { status },
    });

    revalidatePath("/admin");
    return { success: true, updated };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false, error: "Status update failed." };
  }
}
