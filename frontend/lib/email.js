import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const notifyContactForm = async ({ nombre, email, profesion, mensaje }) => {
  const safeNombre = escapeHtml(nombre);
  const safeEmail = escapeHtml(email);
  const safeProfesion = escapeHtml(profesion);
  const safeMensaje = escapeHtml(mensaje).replace(/\n/g, "<br>");

  try {
    await resend.emails.send({
      from: "CAMY Web <info@camybgs.com>",
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de contacto — ${nombre}`,
      html: `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@400;500;600&display=swap">
</head>
<body style="margin:0;padding:0;background-color:#F5F0E8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E8;">
<tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#FFFFFF;border-radius:4px;overflow:hidden;">

<tr>
<td style="background-color:#1D1D2E;padding:22px 32px;">
<span style="font-family:'Outfit',Arial,sans-serif;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#F5F0E8;">CAMY</span>
<span style="font-family:'Outfit',Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#F04E23;padding-left:10px;">Nuevo lead</span>
</td>
</tr>
<tr><td style="height:3px;background-color:#F04E23;font-size:0;line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:36px 32px 8px 32px;">
<h1 style="margin:0;font-family:'DM Serif Display',Georgia,serif;font-weight:400;font-size:26px;line-height:1.3;color:#1D1D2E;">
Tienes un nuevo mensaje de<br><span style="color:#F04E23;">${safeNombre}</span>
</h1>
</td>
</tr>

<tr>
<td style="padding:24px 32px 8px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td style="padding:12px 0;border-bottom:1px solid #EDE7DA;">
      <span style="display:block;font-family:'Outfit',Arial,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6B1530;padding-bottom:4px;">Email</span>
      <a href="mailto:${safeEmail}" style="font-family:'Outfit',Arial,sans-serif;font-size:15px;color:#1D1D2E;text-decoration:none;">${safeEmail}</a>
    </td>
  </tr>
  <tr>
    <td style="padding:12px 0;border-bottom:1px solid #EDE7DA;">
      <span style="display:block;font-family:'Outfit',Arial,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6B1530;padding-bottom:4px;">Profesión</span>
      <span style="font-family:'Outfit',Arial,sans-serif;font-size:15px;color:#1D1D2E;">${safeProfesion}</span>
    </td>
  </tr>
</table>
</td>
</tr>

<tr>
<td style="padding:20px 32px 8px 32px;">
<span style="display:block;font-family:'Outfit',Arial,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6B1530;margin-bottom:8px;">Mensaje</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid #F04E23;background-color:#F5F0E8;">
<tr><td style="padding:16px 18px;">
<p style="margin:0;font-family:'Outfit',Arial,sans-serif;font-size:15px;line-height:1.6;color:#1D1D2E;">${safeMensaje}</p>
</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:28px 32px 36px 32px;">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#F04E23;border-radius:3px;">
<a href="mailto:${safeEmail}" style="display:inline-block;padding:13px 28px;font-family:'Outfit',Arial,sans-serif;font-size:14px;font-weight:600;letter-spacing:0.5px;color:#F5F0E8;text-decoration:none;">Responder a ${safeNombre} →</a>
</td>
</tr>
</table>
</td>
</tr>

</table>

<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
<tr>
<td style="padding:18px 32px 0 32px;text-align:center;">
<span style="font-family:'Outfit',Arial,sans-serif;font-size:11px;color:#1D1D2E;opacity:0.55;">Enviado automáticamente desde el formulario de contacto de camybgs.com</span>
</td>
</tr>
</table>

</td></tr>
</table>
</body>
</html>`,
    });
  } catch (error) {
    console.error("[EMAIL] Failed:", error.message);
  }
};
