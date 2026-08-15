import { site } from "@/lib/site";

/**
 * ---------------------------------------------------------------------------
 * EMAIL — Resend, scaffolded and ready
 * ---------------------------------------------------------------------------
 * Written against Resend's REST API with plain `fetch`, so there is no package
 * to install. Until RESEND_API_KEY exists in .env.local this logs the message
 * to the terminal and reports success, which means you can use and demo the
 * whole contact flow today. Add the key and mail starts sending — no code
 * change anywhere.
 *
 * To turn it on:
 *   1. Sign up at https://resend.com (free tier is plenty)
 *   2. Verify your sending domain, or use onboarding@resend.dev while testing
 *   3. Put RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL in .env.local
 * ---------------------------------------------------------------------------
 */

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
const to = process.env.CONTACT_TO_EMAIL ?? site.email;

export const emailConfigured = Boolean(apiKey);

export type Enquiry = {
  name: string;
  email: string;
  phone?: string;
  piece?: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(enquiry: Enquiry) {
  const rows: [string, string][] = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "—"],
    ["Piece", enquiry.piece || "General enquiry"],
  ];

  return `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#1c1917;line-height:1.6">
      <h2 style="font-size:18px;margin:0 0 18px">New enquiry from ${escapeHtml(site.name)}</h2>
      <table style="border-collapse:collapse;font-size:14px;margin-bottom:20px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:4px 18px 4px 0;color:#57504a">${label}</td>
            <td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td>
          </tr>`,
          )
          .join("")}
      </table>
      <div style="border-left:3px solid #dbd4c8;padding-left:16px;white-space:pre-wrap;font-size:15px">${escapeHtml(
        enquiry.message,
      )}</div>
    </div>`;
}

export async function sendEnquiryEmail(enquiry: Enquiry): Promise<boolean> {
  if (!emailConfigured) {
    console.info(
      [
        "",
        "──────────────────────────────────────────────",
        " NEW ENQUIRY (email is not configured yet)",
        "──────────────────────────────────────────────",
        ` Name:    ${enquiry.name}`,
        ` Email:   ${enquiry.email}`,
        ` Phone:   ${enquiry.phone || "—"}`,
        ` Piece:   ${enquiry.piece || "General enquiry"}`,
        ` Message: ${enquiry.message}`,
        "──────────────────────────────────────────────",
        " Add RESEND_API_KEY to .env.local to send this by email.",
        "",
      ].join("\n"),
    );
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.name} <${from}>`,
        to: [to],
        reply_to: enquiry.email,
        subject: enquiry.piece
          ? `Enquiry — ${enquiry.piece} — ${enquiry.name}`
          : `Enquiry from ${enquiry.name}`,
        html: buildHtml(enquiry),
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`[resend] ${res.status}: ${await res.text()}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[resend] could not send the enquiry:", error);
    return false;
  }
}
