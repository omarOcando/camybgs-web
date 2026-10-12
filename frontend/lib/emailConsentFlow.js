import mongoose from "mongoose";
import connectDB from "./db.js";
import EmailConsent from "./EmailConsent.js";
import { EMAIL_CONSENT_VERSION, getEmailConsentText } from "./consentText.js";
import { createConsentToken, verifyConsentToken } from "./consentToken.js";
import { sendConsentConfirmation } from "./email.js";
import { addTagToSystemeContactByEmail, EMAIL_CONSENT_TAG_ID } from "./systeme.js";

// Doble opt-in de la casilla de emails del formulario de contacto.
// Toda la lógica está aquí (sin nada propio de Vercel) para que las funciones
// de /api solo la llamen y sirva igual al migrar a Render.
//   1. startEmailConsent: registro "pending" + email de confirmación.
//   2. confirmEmailConsent: valida el enlace, marca "confirmed" y añade la
//      etiqueta consentimiento-emails en Systeme.

// Dominio de los enlaces del email: SITE_URL si existe; en Vercel Preview, la
// URL de ese despliegue; si no, el dominio real. No se usa la cabecera Host:
// se podría falsificar para meter enlaces a otro dominio en nuestros emails.
function getSiteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, "");
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://www.camybgs.com";
}

// Página de confirmación por idioma (las mismas direcciones que
// confirmSubscription en src/config/routes.js)
const CONFIRM_PAGE = { es: "/confirmar-suscripcion", en: "/en/confirm-subscription" };

// Dirección a la que redirigir tras confirmar: status es "confirmed",
// "already" o "error"
export function confirmPagePath({ status, lang }) {
  return `${CONFIRM_PAGE[lang] ?? CONFIRM_PAGE.es}?status=${status}`;
}

// No lanza errores: si algo falla, el formulario de contacto sigue funcionando
// y el fallo queda en el log (como el aviso por email y Systeme).
export async function startEmailConsent({ email, lang: requestedLang }) {
  try {
    const { lang, text } = getEmailConsentText(requestedLang);
    await connectDB();
    const record = await EmailConsent.create({
      email, text, version: EMAIL_CONSENT_VERSION, lang, status: "pending",
    });
    const token = createConsentToken({ id: record._id, lang });
    const confirmUrl = `${getSiteUrl()}/api/confirm-consent?token=${encodeURIComponent(token)}`;
    await sendConsentConfirmation({ email: record.email, lang, confirmUrl });
  } catch (error) {
    console.error("[CONSENT] Could not start double opt-in:", error.message);
  }
}

// Devuelve { status, lang } con status "confirmed", "already" o "error".
// No lanza errores: un fallo inesperado (p. ej. la base de datos) es "error".
export async function confirmEmailConsent(token) {
  let lang = "es";
  try {
    const verified = verifyConsentToken(token);
    if (Object.hasOwn(CONFIRM_PAGE, verified.lang)) lang = verified.lang;
    return { status: await confirmVerified(verified), lang };
  } catch (error) {
    console.error("[CONSENT] Confirmation failed:", error.message);
    return { status: "error", lang };
  }
}

async function confirmVerified({ valid, expired, id }) {
  if ((!valid && !expired) || !mongoose.isValidObjectId(id)) return "error";

  await connectDB();

  // Enlace caducado: solo sirve para decir "ya estaba confirmada"
  if (expired) {
    const confirmed = await EmailConsent.exists({ _id: id, status: "confirmed" });
    return confirmed ? "already" : "error";
  }

  // Paso atómico de "pending" a "confirmed": si se pulsa dos veces (o a la
  // vez), solo una petición lo consigue y solo esa añade la etiqueta.
  // systemeTagged empieza en false y pasa a true cuando Systeme responde bien.
  const record = await EmailConsent.findOneAndUpdate(
    { _id: id, status: "pending" },
    { $set: { status: "confirmed", confirmedAt: new Date(), systemeTagged: false } },
    { returnDocument: "after" }
  );

  if (!record) {
    const confirmed = await EmailConsent.exists({ _id: id, status: "confirmed" });
    return confirmed ? "already" : "error";
  }

  const tagged = await addTagToSystemeContactByEmail(record.email, EMAIL_CONSENT_TAG_ID);
  if (tagged) {
    await EmailConsent.updateOne({ _id: record._id }, { $set: { systemeTagged: true } });
  } else {
    console.error(`[CONSENT] Confirmed but Systeme tag failed (systemeTagged: false): ${record.email}`);
  }

  return "confirmed";
}
