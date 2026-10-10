import connectDB from "../lib/db.js";
import Contact from "../lib/Contact.js";
import EmailConsent from "../lib/EmailConsent.js";
import { EMAIL_CONSENT_VERSION, getEmailConsentText } from "../lib/consentText.js";
import { createSystemeContact, addTagToSystemeContactByEmail, EMAIL_CONSENT_TAG_ID } from "../lib/systeme.js";
import { notifyContactForm } from "../lib/email.js";
import { INTERESTS } from "../lib/interests.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { nombre, email, profesion, interes, mensaje } = req.body;
  const emailConsent = req.body.emailConsent === true;

  if (!nombre || !email || !profesion || !interes || !mensaje) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!Object.hasOwn(INTERESTS, interes)) {
    return res.status(400).json({ message: "Invalid interest" });
  }

  try {
    await connectDB();
    await Contact.create({ nombre, email, profesion, interes, mensaje, emailConsent });
    if (emailConsent) {
      const { lang, text } = getEmailConsentText(req.body.lang);
      await EmailConsent.create({ email, text, version: EMAIL_CONSENT_VERSION, lang });
    }

    await Promise.all([
      createSystemeContact(nombre, email).then(async () => {
        await addTagToSystemeContactByEmail(email, INTERESTS[interes].tagId);
        if (emailConsent) await addTagToSystemeContactByEmail(email, EMAIL_CONSENT_TAG_ID);
      }),
      notifyContactForm({ nombre, email, profesion, interes: INTERESTS[interes].label, mensaje }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
