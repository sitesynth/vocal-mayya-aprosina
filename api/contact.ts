import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, contact, occasion, message } = req.body ?? {};

  if (!name || !contact) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const apiKey = process.env.SENDKIT_API_KEY;
  if (!apiKey) {
    console.error("SENDKIT_API_KEY is not configured");
    return res.status(500).json({ error: "Failed to send message" });
  }

  const html = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Contact:</strong> ${contact}</p>
    <p><strong>Occasion:</strong> ${occasion || "—"}</p>
    <p><strong>Message:</strong></p>
    <p>${(message || "—").replace(/\n/g, "<br>")}</p>
  `;

  const sendkitRes = await fetch("https://api.sendkit.dev/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Mayya Aprosina <hello@sitesynth.com>",
      to: "hello@sitesynth.com",
      subject: `New contact request from ${name}${occasion ? ` (${occasion})` : ""}`,
      html,
    }),
  });

  if (!sendkitRes.ok) {
    console.error("SendKit error:", await sendkitRes.text());
    return res.status(500).json({ error: "Failed to send message" });
  }

  return res.status(200).json({ success: true });
}
