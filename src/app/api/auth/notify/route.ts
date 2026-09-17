import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { handleAuthNotificationEvent } from "@/lib/email/mailer";

// Track notified sessions in memory to prevent duplicate emails
const notifiedSessions = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const { userId, sessionId } = await auth();

    if (!userId || !sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Deduplication check per session ID
    if (notifiedSessions.has(sessionId)) {
      return NextResponse.json({ status: "already_notified" });
    }
    notifiedSessions.add(sessionId);
    // Evict after 30 minutes
    setTimeout(() => notifiedSessions.delete(sessionId), 30 * 60 * 1000);

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const email = user.emailAddresses?.[0]?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: "User has no email address" }, { status: 400 });
    }

    const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");

    // Determine whether this session represents a brand new sign-up or returning sign-in
    // If user account was created within the last 2 minutes, treat as sign up
    const isNewUser = user.createdAt && Date.now() - Number(user.createdAt) < 2 * 60 * 1000;
    const type = isNewUser ? "SIGN_UP" : "SIGN_IN";

    console.log(`[Auth Notify API] Triggering ${type} email dispatch for: ${email}`);

    const result = await handleAuthNotificationEvent({
      type,
      email,
      name,
      userId,
      ipAddress: ip,
    });

    return NextResponse.json({
      success: true,
      type,
      dispatchedToClient: result.clientSuccess,
      dispatchedToAdmin: result.adminSuccess,
    });
  } catch (error: any) {
    console.error("[Auth Notify API] Error dispatching auth notification:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
