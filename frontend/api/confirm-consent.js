import { confirmEmailConsent, confirmPagePath } from "../lib/emailConsentFlow.js";

// Enlace del email de confirmación del doble opt-in (lógica en lib/emailConsentFlow.js)
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const result = await confirmEmailConsent(req.query.token);
  res.setHeader("Cache-Control", "no-store");
  return res.redirect(302, confirmPagePath(result));
}
