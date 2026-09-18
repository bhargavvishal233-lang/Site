/**
 * Spectrum Email HTML Templates
 * Styled with modern, high-contrast, responsive inline CSS
 */

interface ClientEmailProps {
  name?: string | null;
  email: string;
  time?: string;
}

interface AdminEmailProps {
  type: "SIGN_UP" | "SIGN_IN";
  name?: string | null;
  email: string;
  time: string;
  userId?: string;
  ipAddress?: string | null;
}

/**
 * Generates the Sign-Up confirmation email sent to the client from Spectrum
 */
export function getClientSignUpEmailHtml({ name, email }: ClientEmailProps): string {
  const displayName = name?.trim() ? name.trim() : email.split("@")[0];
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Spectrum</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0d0e; color: #f4f4f5;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0c0d0e; min-height: 100vh; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #141517; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Header / Brand -->
          <tr>
            <td style="padding: 36px 36px 24px; border-bottom: 1px solid #27272a; background: linear-gradient(180deg, #1a1b1e 0%, #141517 100%);">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display: inline-block; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                      SPECTRUM<span style="color: #6366f1;">.</span>
                    </div>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa; background-color: #27272a; padding: 4px 10px; border-radius: 20px;">
                      Confirmation
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 36px 28px;">
              <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; color: #ffffff; line-height: 1.3;">
                Welcome to Spectrum, ${displayName}!
              </h1>
              
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #d4d4d8;">
                Your account with <strong style="color: #ffffff;">Spectrum</strong> has been successfully created. We are thrilled to partner with you to engineer high-impact digital experiences, intelligent software, and high-velocity growth.
              </p>

              <!-- Info Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #1a1b1e; border: 1px solid #2d2e33; border-radius: 10px; margin: 24px 0;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #a1a1aa; margin-bottom: 6px;">Registered Email</div>
                    <div style="font-size: 15px; font-weight: 600; color: #6366f1; font-family: monospace;">${email}</div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 28px; font-size: 14px; line-height: 1.6; color: #a1a1aa;">
                You now have full access to explore our engineering blueprints, custom software prototypes, and schedule dedicated 1-on-1 strategy sessions with our architecture team.
              </p>

              <!-- CTA Button -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                <tr>
                  <td align="center" style="border-radius: 8px; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);">
                    <a href="https://spectrum.agency" target="_blank" style="font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 14px 28px; display: inline-block; border-radius: 8px;">
                      Access Spectrum Portal &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 36px;">
              <div style="height: 1px; background-color: #27272a;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px 36px; text-align: left;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #71717a; line-height: 1.5;">
                If you did not register for a Spectrum account, please contact our team immediately at <a href="mailto:support@spectrum.agency" style="color: #a1a1aa; text-decoration: underline;">support@spectrum.agency</a>.
              </p>
              <p style="margin: 0; font-size: 11px; color: #52525b;">
                &copy; ${year} Spectrum Agency. All rights reserved. High-Impact Engineering & Growth.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generates the Sign-In confirmation / security notice email sent to the client from Spectrum
 */
export function getClientSignInEmailHtml({ name, email, time }: ClientEmailProps): string {
  const displayName = name?.trim() ? name.trim() : email.split("@")[0];
  const year = new Date().getFullYear();
  const formattedTime = time || new Date().toUTCString();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security Notice: Sign-In to Spectrum</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0d0e; color: #f4f4f5;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0c0d0e; min-height: 100vh; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #141517; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 36px 36px 24px; border-bottom: 1px solid #27272a; background: linear-gradient(180deg, #1a1b1e 0%, #141517 100%);">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display: inline-block; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                      SPECTRUM<span style="color: #10b981;">.</span>
                    </div>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #34d399; background-color: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.25); padding: 4px 10px; border-radius: 20px;">
                      Sign-In Detected
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 36px 28px;">
              <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: #ffffff; line-height: 1.3;">
                Hello ${displayName},
              </h1>
              
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #d4d4d8;">
                We detected a successful sign-in to your <strong style="color: #ffffff;">Spectrum</strong> account.
              </p>

              <!-- Event Details -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #1a1b1e; border: 1px solid #2d2e33; border-radius: 10px; margin: 24px 0;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #a1a1aa; margin-bottom: 6px;">Account</div>
                    <div style="font-size: 14px; font-weight: 600; color: #ffffff; font-family: monospace; margin-bottom: 12px;">${email}</div>
                    
                    <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #a1a1aa; margin-bottom: 6px;">Time (UTC)</div>
                    <div style="font-size: 14px; font-weight: 500; color: #d4d4d8;">${formattedTime}</div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #a1a1aa;">
                If this was you, no action is needed. You are ready to continue where you left off.
              </p>

              <div style="padding: 14px 16px; background-color: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px;">
                <p style="margin: 0; font-size: 13px; color: #f87171; line-height: 1.5;">
                  <strong>Did not sign in?</strong> If you did not authorize this access, please reply to this email or reset your credentials immediately to protect your account.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px 36px; border-top: 1px solid #27272a;">
              <p style="margin: 0; font-size: 11px; color: #52525b;">
                &copy; ${year} Spectrum Agency &bull; Security & Account Operations
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generates the notification email sent to the owner (aradhyakaustubh1210@gmail.com)
 */
export function getAdminNotificationEmailHtml({
  type,
  name,
  email,
  time,
  userId,
  ipAddress,
}: AdminEmailProps): string {
  const isSignUp = type === "SIGN_UP";
  const badgeColor = isSignUp ? "#6366f1" : "#10b981";
  const badgeBg = isSignUp ? "rgba(99, 102, 241, 0.15)" : "rgba(16, 185, 129, 0.15)";
  const badgeBorder = isSignUp ? "rgba(99, 102, 241, 0.3)" : "rgba(16, 185, 129, 0.3)";
  const eventTitle = isSignUp ? "New Client Sign-Up" : "Client Sign-In Alert";
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${eventTitle} - Spectrum Admin</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090a0b; color: #f4f4f5;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #090a0b; min-height: 100vh; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #121316; border: 1px solid #232428; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; border-bottom: 1px solid #232428; background-color: #18191d;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size: 18px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                      SPECTRUM <span style="font-size: 12px; font-weight: 600; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px;">Admin Alert</span>
                    </div>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: ${badgeColor}; background-color: ${badgeBg}; border: 1px solid ${badgeBorder}; padding: 5px 12px; border-radius: 20px;">
                      ${isSignUp ? "Client Sign-Up" : "Client Sign-In"}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #ffffff;">
                ${isSignUp ? "🎉 A new client registered on Spectrum" : "⚡ Client signed in to Spectrum"}
              </h2>
              <p style="margin: 0 0 24px; font-size: 14px; color: #a1a1aa;">
                Automated alert dispatched to owner (<strong>aradhyakaustubh1210@gmail.com</strong>).
              </p>

              <!-- Details Grid -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #18191e; border: 1px solid #2a2b30; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c; width: 35%;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Client Email</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <a href="mailto:${email}" style="font-size: 14px; font-weight: 600; color: #6366f1; text-decoration: none; font-family: monospace;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Client Name</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 14px; font-weight: 600; color: #f4f4f5;">${name?.trim() ? name.trim() : "Not specified"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Event Type</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 13px; font-weight: 600; color: ${badgeColor};">${isSignUp ? "Account Registration" : "Active Session Started"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Timestamp</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 13px; color: #d4d4d8;">${time}</span>
                  </td>
                </tr>
                ${
                  userId
                    ? `
                <tr>
                  <td style="padding: 16px 20px; ${ipAddress ? "border-bottom: 1px solid #25262c;" : ""}">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Clerk User ID</span>
                  </td>
                  <td style="padding: 16px 20px; ${ipAddress ? "border-bottom: 1px solid #25262c;" : ""}">
                    <span style="font-size: 12px; font-family: monospace; color: #a1a1aa;">${userId}</span>
                  </td>
                </tr>`
                    : ""
                }
                ${
                  ipAddress
                    ? `
                <tr>
                  <td style="padding: 16px 20px;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">IP Address</span>
                  </td>
                  <td style="padding: 16px 20px;">
                    <span style="font-size: 12px; font-family: monospace; color: #a1a1aa;">${ipAddress}</span>
                  </td>
                </tr>`
                    : ""
                }
              </table>

              <!-- Quick Link -->
              <div style="margin-top: 24px;">
                <a href="https://dashboard.clerk.com" target="_blank" style="display: inline-block; font-size: 13px; font-weight: 600; color: #a1a1aa; text-decoration: none; border: 1px solid #2d2e33; padding: 10px 18px; border-radius: 8px; background-color: #18191d;">
                  View in Clerk Dashboard &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; border-top: 1px solid #232428; background-color: #0e0f11;">
              <p style="margin: 0; font-size: 11px; color: #52525b;">
                Spectrum Internal Notification Engine &bull; System ID: notify-spectrum-v1
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export interface TemplateInquiryEmailProps {
  clientName: string;
  clientEmail: string;
  templateName: string;
  templateId?: string;
  company?: string;
  budgetRange?: string;
  notes?: string;
  time?: string;
}

/**
 * Generates the confirmation email sent to the client when they submit a template inquiry
 */
export function getTemplateInquiryClientEmailHtml({
  clientName,
  clientEmail,
  templateName,
  company,
  budgetRange,
  notes,
}: TemplateInquiryEmailProps): string {
  const displayName = clientName.trim() || clientEmail.split("@")[0];
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Received - ${templateName} | Spectrum</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0d0e; color: #f4f4f5;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0c0d0e; min-height: 100vh; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #141517; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 36px 36px 24px; border-bottom: 1px solid #27272a; background: linear-gradient(180deg, #1a1b1e 0%, #141517 100%);">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display: inline-block; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                      SPECTRUM<span style="color: #ef4444;">.</span>
                    </div>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #f87171; background-color: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.25); padding: 4px 10px; border-radius: 20px;">
                      Inquiry Received
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 36px 28px;">
              <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: #ffffff; line-height: 1.3;">
                Thank you for your inquiry, ${displayName}!
              </h1>
              
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #d4d4d8;">
                We have received your inquiry for the <strong style="color: #ffffff;">${templateName}</strong> blueprint. Our design and software architecture team is currently reviewing your project details.
              </p>

              <!-- Summary Card -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #1a1b1e; border: 1px solid #2d2e33; border-radius: 12px; margin: 20px 0; overflow: hidden;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #25262c; width: 35%;">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #a1a1aa; letter-spacing: 0.5px;">Selected Blueprint</span>
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 13px; font-weight: 700; color: #ffffff;">${templateName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #a1a1aa; letter-spacing: 0.5px;">Company / Project</span>
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 13px; color: #d4d4d8;">${company?.trim() ? company.trim() : "Not specified"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #a1a1aa; letter-spacing: 0.5px;">Estimated Budget</span>
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 13px; font-weight: 600; color: #10b981;">${budgetRange || "$3k - $5k"}</span>
                  </td>
                </tr>
                ${
                  notes?.trim()
                    ? `
                <tr>
                  <td style="padding: 14px 18px; vertical-align: top;">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #a1a1aa; letter-spacing: 0.5px;">Project Details</span>
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="font-size: 13px; color: #d4d4d8; line-height: 1.5;">${notes.trim()}</span>
                  </td>
                </tr>`
                    : ""
                }
              </table>

              <!-- What's Next -->
              <div style="padding: 18px 20px; background-color: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 10px; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #818cf8; margin-bottom: 6px;">Next Steps</div>
                <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #c7d2fe;">
                  A Spectrum lead architect will contact you directly at <strong>${clientEmail}</strong> within 24 business hours to discuss custom features, technical requirements, and deployment timelines.
                </p>
              </div>

              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 8px; background: #ef4444;">
                    <a href="https://spectrum.agency/templates" target="_blank" style="font-size: 13px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 24px; display: inline-block; border-radius: 8px;">
                      Explore More Blueprints &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px 36px; border-top: 1px solid #27272a;">
              <p style="margin: 0 0 6px; font-size: 12px; color: #71717a;">
                Need urgent modifications? Contact us directly at <a href="mailto:aradhyakaustubh1210@gmail.com" style="color: #a1a1aa; text-decoration: underline;">aradhyakaustubh1210@gmail.com</a>.
              </p>
              <p style="margin: 0; font-size: 11px; color: #52525b;">
                &copy; ${year} Spectrum Agency. All rights reserved. High-Impact Engineering & Growth.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generates the notification email sent to the owner (aradhyakaustubh1210@gmail.com)
 * when a client submits a template design inquiry
 */
export function getTemplateInquiryAdminEmailHtml({
  clientName,
  clientEmail,
  templateName,
  templateId,
  company,
  budgetRange,
  notes,
  time,
}: TemplateInquiryEmailProps): string {
  const year = new Date().getFullYear();
  const formattedTime = time || new Date().toUTCString();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Template Inquiry: ${templateName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090a0b; color: #f4f4f5;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #090a0b; min-height: 100vh; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #121316; border: 1px solid #232428; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; border-bottom: 1px solid #232428; background-color: #18191d;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size: 18px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                      SPECTRUM <span style="font-size: 12px; font-weight: 600; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px;">Admin Alert</span>
                    </div>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #f87171; background-color: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); padding: 5px 12px; border-radius: 20px;">
                      Template Inquiry
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #ffffff;">
                🚀 New Design Inquiry Received!
              </h2>
              <p style="margin: 0 0 24px; font-size: 14px; color: #a1a1aa;">
                A prospective client submitted an inquiry for <strong>${templateName}</strong>.
              </p>

              <!-- Details Grid -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #18191e; border: 1px solid #2a2b30; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c; width: 35%;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Selected Blueprint</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <strong style="font-size: 14px; color: #ffffff;">${templateName}</strong>
                    ${templateId ? `<span style="display: block; font-size: 11px; color: #71717a; font-family: monospace; margin-top: 2px;">ID: ${templateId}</span>` : ""}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Client Name</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 14px; font-weight: 600; color: #f4f4f5;">${clientName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Client Email</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <a href="mailto:${clientEmail}?subject=Regarding your Spectrum inquiry for ${encodeURIComponent(templateName)}" style="font-size: 14px; font-weight: 600; color: #6366f1; text-decoration: none; font-family: monospace;">${clientEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Company / Project</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 14px; color: #d4d4d8;">${company?.trim() ? company.trim() : "Not specified"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Budget Range</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 13px; font-weight: 600; color: #10b981;">${budgetRange || "$3k - $5k"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Customizations & Notes</span>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #25262c;">
                    <span style="font-size: 13px; color: #d4d4d8; line-height: 1.5; white-space: pre-wrap;">${notes?.trim() ? notes.trim() : "None provided"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px;">Timestamp</span>
                  </td>
                  <td style="padding: 16px 20px;">
                    <span style="font-size: 13px; color: #a1a1aa;">${formattedTime}</span>
                  </td>
                </tr>
              </table>

              <!-- Quick Action -->
              <div style="margin-top: 24px;">
                <a href="mailto:${clientEmail}?subject=Regarding your Spectrum inquiry for ${encodeURIComponent(templateName)}" style="display: inline-block; font-size: 13px; font-weight: 600; color: #ffffff; text-decoration: none; border: 1px solid #ef4444; background-color: #ef4444; padding: 10px 20px; border-radius: 8px;">
                  Reply Directly to Client &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; border-top: 1px solid #232428; background-color: #0e0f11;">
              <p style="margin: 0; font-size: 11px; color: #52525b;">
                Spectrum Internal CRM &bull; Inquiries routed to aradhyakaustubh1210@gmail.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}


export interface BookingEmailProps {
  guestName: string;
  guestEmail: string;
  meetingType: string;
  slotDate: string;
  slotTime: string;
  meetLink: string;
  time?: string;
}

export function getBookingClientEmailHtml(data: BookingEmailProps): string {
  const year = new Date().getFullYear();
  return `
<!DOCTYPE html>
<html lang="en">
<body>
  <div style="font-family: sans-serif; padding: 20px;">
    <h2>Booking Confirmed: ${data.meetingType}</h2>
    <p>Hi ${data.guestName},</p>
    <p>Your strategy call with Spectrum has been confirmed.</p>
    <ul>
      <li><strong>Date:</strong> ${data.slotDate}</li>
      <li><strong>Time:</strong> ${data.slotTime}</li>
      <li><strong>Meeting Link:</strong> <a href="${data.meetLink}">${data.meetLink}</a></li>
    </ul>
    <p>We look forward to speaking with you!</p>
    <br/>
    <p>&copy; ${year} Spectrum Agency</p>
  </div>
</body>
</html>
  `;
}

export function getBookingAdminEmailHtml(data: BookingEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<body>
  <div style="font-family: sans-serif; padding: 20px;">
    <h2>New Booking Scheduled</h2>
    <p>A new strategy call has been booked on Spectrum.</p>
    <ul>
      <li><strong>Client:</strong> ${data.guestName} (${data.guestEmail})</li>
      <li><strong>Type:</strong> ${data.meetingType}</li>
      <li><strong>Date:</strong> ${data.slotDate}</li>
      <li><strong>Time:</strong> ${data.slotTime}</li>
      <li><strong>Meeting Link:</strong> <a href="${data.meetLink}">${data.meetLink}</a></li>
    </ul>
  </div>
</body>
</html>
  `;
}
