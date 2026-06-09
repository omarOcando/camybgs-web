import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const notifyContactForm = async ({ nombre, email, profesion, mensaje }) => {
  console.log("[EMAIL] Attempting to send notification to:", process.env.EMAIL_USER);
  try {
    await resend.emails.send({
      from: "CAMY Web <info@camybgs.com>",
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de contacto — ${nombre}`,
      html: `
        <h2>Nuevo mensaje desde camybgs.com</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Profesión:</strong> ${profesion}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });
    console.log("[EMAIL] Notification sent successfully.");
  } catch (error) {
    console.error("[EMAIL] Failed:", error.message);
  }
};
