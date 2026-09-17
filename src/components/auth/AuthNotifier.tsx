"use client";

import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

/**
 * AuthNotifier component
 * Detects authenticated client sessions and ensures confirmation emails
 * are dispatched to both the client and Spectrum admin (aradhyakaustubh1210@gmail.com).
 */
export function AuthNotifier() {
  const { isSignedIn, sessionId } = useAuth();
  const { isLoaded } = useUser();
  const notifiedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !sessionId) return;

    // Check in-memory and browser session storage to prevent multiple calls
    if (notifiedRef.current === sessionId) return;

    const storageKey = `spectrum_auth_notified_${sessionId}`;
    if (typeof window !== "undefined" && window.sessionStorage.getItem(storageKey)) {
      return;
    }

    notifiedRef.current = sessionId;
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(storageKey, "true");
    }

    // Call internal notification endpoint
    fetch("/api/auth/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.warn("[Spectrum AuthNotifier] Notification status:", res.status, text);
        } else {
          const data = await res.json();
          console.log("[Spectrum AuthNotifier] Email dispatch confirmed:", data);
        }
      })
      .catch((err) => {
        console.error("[Spectrum AuthNotifier] Failed to contact notification endpoint:", err);
      });
  }, [isLoaded, isSignedIn, sessionId]);

  return null;
}
