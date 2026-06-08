const API_URL = `${import.meta.env.VITE_API_URL}/api/contact`;

export async function submitContact({ nombre, email, profesion, mensaje }) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, profesion, mensaje }),
  });

  if (!res.ok) throw new Error("Contact submission failed: " + res.status);

  return res.json();
}
