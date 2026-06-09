import nodemailer from "nodemailer";

const createTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.ionos.es",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

export const notifyContactForm = async ({ nombre, email, profesion, mensaje }) => {
  console.log("[EMAIL] Attempting to send notification. USER:", process.env.EMAIL_USER);
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"CAMY Web" <${process.env.EMAIL_USER}>`,
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
    console.error("[EMAIL] Failed:", error.code, error.message);
  }
};
