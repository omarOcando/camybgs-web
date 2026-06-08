import nodemailer from "nodemailer";

const createTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.ionos.de",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export const notifyContactForm = async ({ nombre, email, profesion, mensaje }) => {
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
  } catch (error) {
    console.error("Error sending contact notification email:", error.message);
  }
};
