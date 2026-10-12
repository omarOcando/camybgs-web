import { createHmac, timingSafeEqual } from "node:crypto";

// Token del enlace de confirmación del doble opt-in: "<datos>.<firma>", los dos
// en base64url. Los datos llevan el id del registro de email-consents, el
// idioma y la caducidad; la firma es un HMAC-SHA256 con CONSENT_SECRET.

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 días

function sign(data) {
  const secret = process.env.CONSENT_SECRET;
  if (!secret) throw new Error("CONSENT_SECRET is not set");
  return createHmac("sha256", secret).update(data).digest("base64url");
}

export function createConsentToken({ id, lang }) {
  const data = Buffer.from(JSON.stringify({ id: String(id), lang, exp: Date.now() + TOKEN_TTL_MS }))
    .toString("base64url");
  return `${data}.${sign(data)}`;
}

function decode(data) {
  try {
    return JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

// Devuelve { valid: true, id, lang } o { valid: false, lang }.
// lang se intenta leer aunque el token no valga, solo para elegir el idioma de
// la página de error (no se usa para nada más).
export function verifyConsentToken(token) {
  const [data, signature] = typeof token === "string" ? token.split(".") : [];
  const payload = data ? decode(data) : null;
  const lang = payload?.lang;
  if (!data || !signature || !payload) return { valid: false, lang };

  const expected = Buffer.from(sign(data));
  const given = Buffer.from(signature);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return { valid: false, lang };
  }
  if (typeof payload.exp !== "number" || Date.now() > payload.exp) return { valid: false, lang };

  return { valid: true, id: payload.id, lang };
}
