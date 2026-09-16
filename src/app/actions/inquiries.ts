"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
    const inquiry = await prisma.inquiry.create({
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
    return { success: true, inquiry };
  } catch (error) {
    console.error("Failed to create inquiry:", error);
    return { success: false, error: "Failed to submit inquiry." };
  }
}

import { InquiryStatus } from "@prisma/client";

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
