import { NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { clerkClient } from "@clerk/nextjs/server";
import { handleAuthNotificationEvent } from "@/lib/email/mailer";

// In-memory cache to deduplicate recent events (e.g. Svix retries or session/user races)
const recentEvents = new Set<string>();

export async function POST(req: NextRequest) {
  let evt: any;

  try {
    // If webhook signing secret is configured, verify signature
    if (process.env.CLERK_WEBHOOK_SIGNING_SECRET) {
      evt = await verifyWebhook(req);
    } else {
      // In development without webhook secret, parse json body directly
      const body = await req.json();
      evt = body;
    }
  } catch (err: any) {
    console.error("[Clerk Webhook] Verification error:", err?.message || err);
    return new NextResponse("Webhook verification failed", { status: 400 });
  }

  const eventType = evt?.type;
  const eventId = evt?.data?.id;

  if (!eventType) {
    return new NextResponse("Missing event type", { status: 400 });
  }

  // Deduplication check
  const dedupeKey = `${eventType}:${eventId}`;
  if (recentEvents.has(dedupeKey)) {
    console.log(`[Clerk Webhook] Duplicate event ignored: ${dedupeKey}`);
    return NextResponse.json({ received: true, note: "duplicate" });
  }
  recentEvents.add(dedupeKey);
  // Cleanup cache after 5 minutes
  setTimeout(() => recentEvents.delete(dedupeKey), 5 * 60 * 1000);

  try {
    // 1. Client SIGN-UP Event (user.created)
    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const primaryEmail =
        email_addresses?.[0]?.email_address ||
        email_addresses?.[0]?.emailAddress;
      const fullName = [first_name, last_name].filter(Boolean).join(" ");

      if (primaryEmail) {
        console.log(`[Clerk Webhook] New user registered: ${primaryEmail} (${id})`);
        await handleAuthNotificationEvent({
          type: "SIGN_UP",
          email: primaryEmail,
          name: fullName,
          userId: id,
        });
      }
    }

    // 2. Client SIGN-IN Event (session.created)
    if (eventType === "session.created") {
      const { id: sessionId, user_id: userId } = evt.data;

      if (userId) {
        try {
          // @ts-ignore
          const client = typeof clerkClient === "function" ? await clerkClient() : clerkClient;
          const user = await client.users.getUser(userId);

          const primaryEmail =
            user.emailAddresses?.[0]?.emailAddress;
          const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

          // Check if user was created in the last 60 seconds (new sign-up)
          // to avoid duplicate notifications on first registration
          const isBrandNewSignup =
            user.createdAt && Date.now() - Number(user.createdAt) < 60 * 1000;

          if (primaryEmail && !isBrandNewSignup) {
            console.log(`[Clerk Webhook] User signed in: ${primaryEmail} (${userId})`);
            await handleAuthNotificationEvent({
              type: "SIGN_IN",
              email: primaryEmail,
              name: fullName,
              userId: userId,
            });
          } else if (isBrandNewSignup) {
            console.log(`[Clerk Webhook] User session is part of new sign-up, skipping duplicate sign-in email.`);
          }
        } catch (fetchErr) {
          console.error("[Clerk Webhook] Failed to fetch user for session:", fetchErr);
        }
      }
    }

    return NextResponse.json({ success: true, received: eventType });
  } catch (err: any) {
    console.error("[Clerk Webhook] Processing error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
