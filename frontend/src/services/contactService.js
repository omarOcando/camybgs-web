const API_URL = "/api/contact";

// El formulario usa nombres en inglés; la API y la base de datos conservan los
// suyos (nombre, profesion, interes, mensaje), así que se traducen aquí.
export async function submitContact({ name, email, profession, interest, message, emailConsent, lang }) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: name,
      email,
      profesion: profession,
      interes: interest,
      mensaje: message,
      emailConsent: emailConsent === true,
      lang,
    }),
  });

  if (!res.ok) throw new Error("Contact submission failed: " + res.status);

  return res.json();
}
