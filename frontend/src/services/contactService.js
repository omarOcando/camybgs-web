const API_URL = "/api/contact";

export async function submitContact({ nombre, email, profesion, interes, mensaje, emailConsent }) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, profesion, interes, mensaje, emailConsent: emailConsent === true }),
  });

  if (!res.ok) throw new Error("Contact submission failed: " + res.status);

  return res.json();
}
