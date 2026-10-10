// Casilla opcional de emails del formulario de contacto.
// Fuente única del texto: lo muestra Contacto.jsx y lo guarda api/contact.js
// en email-consents como prueba de lo que aceptó cada persona.
// - Si cambia el texto, cambiar también la versión (nunca editar una versión
//   ya publicada: los consentimientos guardados la citan).
// - Al añadir otro idioma, añadir su texto con la misma versión.

export const EMAIL_CONSENT_VERSION = "2026-10-09";

export const EMAIL_CONSENT_TEXT = {
  es: "Quiero recibir emails ocasionales con ideas, novedades e información útil para mi negocio. Puedo darme de baja cuando quiera.",
  en: "I would like to receive occasional emails with ideas, news and useful information for my business. I can unsubscribe at any time.",
};

// Texto en el idioma pedido, o en español si no existe
export function getEmailConsentText(lang) {
  const key = Object.hasOwn(EMAIL_CONSENT_TEXT, lang) ? lang : "es";
  return { lang: key, text: EMAIL_CONSENT_TEXT[key] };
}
