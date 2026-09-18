import {
  getClientSignUpEmailHtml,
  getClientSignInEmailHtml,
  getAdminNotificationEmailHtml,
  getTemplateInquiryClientEmailHtml,
  getTemplateInquiryAdminEmailHtml,
  TemplateInquiryEmailProps,
} from "./templates";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

const DEFAULT_ADMIN_EMAIL = "aradhyakaustubh1210@gmail.com";
const DEFAULT_FROM = process.env.EMAIL_FROM || "Spectrum <aradhyakaustubh1210@gmail.com>";

/**
 * Universal email dispatcher
 * Supports Resend API (zero extra dependencies) and custom SMTP/Nodemailer
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  from = DEFAULT_FROM,
  replyTo = process.env.ADMIN_NOTIFICATION_EMAIL || DEFAULT_ADMIN_EMAIL,
}: SendEmailOptions): Promise<SendEmailResult> {
  const recipients = Array.isArray(to) ? to : [to];

  // 1. Try Resend API (Preferred for modern Next.js apps)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      let sender = from;
      if (!process.env.EMAIL_FROM && !sender.includes("resend.dev")) {
        sender = "Spectrum <onboarding@resend.dev>";
      }

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: sender,
          to: recipients,
          reply_to: replyTo,
          subject,
          html,
          text: text || subject,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("[Mailer] Resend API error:", data);
        return { success: false, error: data.message || "Failed to send email via Resend" };
      }

      console.log(`[Mailer] Successfully sent email to ${recipients.join(", ")} (ID: ${data.id})`);
      return { success: true, messageId: data.id };
    } catch (err: any) {
      console.error("[Mailer] Resend dispatch exception:", err);
      return { success: false, error: err?.message || String(err) };
    }
  }

  // 2. Try SMTP / Nodemailer (if configured and installed)
  const smtpHost = process.env.SMTP_HOST;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (smtpHost || (gmailUser && gmailPass)) {
    try {
      // @ts-ignore
      const nodemailer = await import("nodemailer").catch(() => null);
      if (nodemailer) {
        const transporter = nodemailer.createTransport(
          gmailUser && gmailPass
            ? {
                service: "gmail",
                auth: {
                  user: gmailUser,
                  pass: gmailPass,
                },
              }
            : {
                host: smtpHost,
                port: Number(process.env.SMTP_PORT) || 587,
                secure: process.env.SMTP_SECURE === "true",
                auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS,
                },
              }
        );

        const info = await transporter.sendMail({
          from,
          to: recipients.join(", "),
          replyTo: replyTo || from,
          subject,
          html,
          text: text || subject,
        });

        console.log(`[Mailer] Successfully sent SMTP email to ${recipients.join(", ")} (ID: ${info.messageId})`);
        return { success: true, messageId: info.messageId };
      }
    } catch (err: any) {
      console.error("[Mailer] SMTP dispatch exception:", err);
      return { success: false, error: err?.message || String(err) };
    }
  }

  // 3. Development / Sandbox Fallback (Console output)
  console.log("------------------------------------------------------------");
  console.log("📧 [SPECTRUM MAILER - DEVELOPMENT PREVIEW]");
  console.log(`From:    ${from}`);
  console.log(`To:      ${recipients.join(", ")}`);
  console.log(`Subject: ${subject}`);
  console.log("Note: To send real emails over the internet, add RESEND_API_KEY");
  console.log("      or GMAIL_USER & GMAIL_APP_PASSWORD in .env.local.");
  console.log("------------------------------------------------------------");

  return { success: true, messageId: "dev-preview-logged" };
}

/**
 * Dispatches both the client confirmation email and the admin alert email
 */
export async function handleAuthNotificationEvent({
  type,
  email,
  name,
  userId,
  ipAddress,
}: {
  type: "SIGN_UP" | "SIGN_IN";
  email: string;
  name?: string | null;
  userId?: string;
  ipAddress?: string | null;
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || DEFAULT_ADMIN_EMAIL;
  const time = new Date().toUTCString();

  console.log(`[Spectrum Auth Event] Processing ${type} for ${email}...`);

  // Prepare client email
  const clientSubject =
    type === "SIGN_UP"
      ? "Welcome to Spectrum - Account Confirmation"
      : "Security Notice: New Sign-In to Spectrum";

  const clientHtml =
    type === "SIGN_UP"
      ? getClientSignUpEmailHtml({ name, email, time })
      : getClientSignInEmailHtml({ name, email, time });

  const clientText =
    type === "SIGN_UP"
      ? `Welcome to Spectrum, ${name || email}!\n\nYour account with Spectrum has been successfully created. We are excited to partner with you to engineer high-impact digital experiences.\n\nRegistered email: ${email}\n\nExplore blueprints & portals: https://spectrum.agency`
      : `Security Notice: New Sign-In to Spectrum\n\nHello ${name || email},\n\nWe detected a successful sign-in to your Spectrum account for ${email} at ${time}.\n\nIf this was you, no action is needed. If you did not authorize this, please reset your password immediately.`;

  // Prepare admin email
  const adminSubject =
    type === "SIGN_UP"
      ? `[Spectrum Alert] New User Sign-Up: ${email}`
      : `[Spectrum Alert] User Sign-In: ${email}`;

  const adminHtml = getAdminNotificationEmailHtml({
    type,
    name,
    email,
    time,
    userId,
    ipAddress,
  });

  const adminText = `Spectrum Alert: ${type === "SIGN_UP" ? "New User Registered" : "User Signed In"}\n\nEmail: ${email}\nName: ${name || "N/A"}\nTime: ${time}\nUser ID: ${userId || "N/A"}`;

  // Execute both dispatches simultaneously
  const [clientResult, adminResult] = await Promise.allSettled([
    sendEmail({
      to: email,
      subject: clientSubject,
      html: clientHtml,
      text: clientText,
    }),
    sendEmail({
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml,
      text: adminText,
    }),
  ]);

  return {
    clientSuccess: clientResult.status === "fulfilled" && clientResult.value.success,
    adminSuccess: adminResult.status === "fulfilled" && adminResult.value.success,
  };
}

/**
 * Dispatches automated emails for template design inquiries:
 * 1. Confirmation to the client
 * 2. Alert to aradhyakaustubh1210@gmail.com
 */
export async function handleTemplateInquiryNotification(
  data: TemplateInquiryEmailProps
) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || DEFAULT_ADMIN_EMAIL;
  const time = new Date().toUTCString();

  console.log(
    `[Spectrum Inquiry Event] Processing inquiry for ${data.templateName} from ${data.clientEmail}...`
  );

  // Client confirmation email
  const clientSubject = `Inquiry Received: ${data.templateName} | Spectrum`;
  const clientHtml = getTemplateInquiryClientEmailHtml({
    ...data,
    time,
  });
  const clientText = `Hi ${data.clientName},\n\nThank you for your inquiry regarding the ${data.templateName} blueprint on Spectrum.\n\nSummary of your request:\n- Selected Blueprint: ${data.templateName}\n- Company: ${data.company || "N/A"}\n- Estimated Budget: ${data.budgetRange || "$3k - $5k"}\n- Details: ${data.notes || "None provided"}\n\nA Spectrum lead architect will review your project and contact you at ${data.clientEmail} within 24 hours.\n\nBest regards,\nSpectrum Architecture Team\naradhyakaustubh1210@gmail.com`;

  // Admin alert email
  const adminSubject = `[Spectrum Inquiry] New Template Inquiry: ${data.templateName} by ${data.clientName}`;
  const adminHtml = getTemplateInquiryAdminEmailHtml({
    ...data,
    time,
  });
  const adminText = `New Design Inquiry on Spectrum!\n\nClient: ${data.clientName} (${data.clientEmail})\nCompany: ${data.company || "N/A"}\nBlueprint: ${data.templateName}\nBudget: ${data.budgetRange || "N/A"}\nNotes: ${data.notes || "None"}\nTime: ${time}`;

  // Execute both dispatches simultaneously
  const [clientResult, adminResult] = await Promise.allSettled([
    sendEmail({
      to: data.clientEmail,
      subject: clientSubject,
      html: clientHtml,
      text: clientText,
    }),
    sendEmail({
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml,
      text: adminText,
    }),
  ]);

  return {
    clientSuccess: clientResult.status === "fulfilled" && clientResult.value.success,
    adminSuccess: adminResult.status === "fulfilled" && adminResult.value.success,
  };
}


import { getBookingClientEmailHtml, getBookingAdminEmailHtml, BookingEmailProps } from "./templates";

export async function handleBookingNotification(data: BookingEmailProps) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || DEFAULT_ADMIN_EMAIL;
  
  const clientSubject = `Booking Confirmed: ${data.meetingType} | Spectrum`;
  const clientHtml = getBookingClientEmailHtml(data);
  const clientText = `Hi ${data.guestName},\n\nYour strategy call with Spectrum has been confirmed.\n\nDate: ${data.slotDate}\nTime: ${data.slotTime}\nMeeting Link: ${data.meetLink}\n\nWe look forward to speaking with you!`;

  const adminSubject = `[Spectrum Alert] New Booking: ${data.meetingType} by ${data.guestName}`;
  const adminHtml = getBookingAdminEmailHtml(data);
  const adminText = `New strategy call booked on Spectrum!\n\nClient: ${data.guestName} (${data.guestEmail})\nType: ${data.meetingType}\nDate: ${data.slotDate}\nTime: ${data.slotTime}\nLink: ${data.meetLink}`;

  const [clientResult, adminResult] = await Promise.allSettled([
    sendEmail({
      to: data.guestEmail,
      subject: clientSubject,
      html: clientHtml,
      text: clientText,
    }),
    sendEmail({
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml,
      text: adminText,
    }),
  ]);

  return {
    clientSuccess: clientResult.status === "fulfilled" && clientResult.value.success,
    adminSuccess: adminResult.status === "fulfilled" && adminResult.value.success,
  };
}
