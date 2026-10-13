import express from "express";
import contactHandler from "../api/contact.js";
import confirmConsentHandler from "../api/confirm-consent.js";

// ─── SERVIDOR DE LA API EN RENDER ────────────────────────────────────────────
// Sirve las mismas funciones de /api que Vercel (los handlers se reutilizan
// tal cual: Express acepta la misma firma req, res). El sitio estático de
// Render reenvía /api/* y /tarjeta a este servicio (render.yaml), así que el
// navegador ve todo bajo el mismo dominio.

// Orígenes que pueden llamar a la API desde el navegador, separados por comas
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "https://www.camybgs.com,https://camybgs.com")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

// Destino del QR de las tarjetas de visita (el mismo que en vercel.json)
const TARJETA_URL =
  "https://wa.me/491778587715?text=Hi%20Omar%2C%20I%20got%20your%20business%20card.%20I%27d%20like%20to%20talk%20about%20a%20website%20for%20my%20business.";

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", true);

// CORS solo para los dominios propios. Sin cabecera Origin (enlace del email
// de confirmación, health check) la petición pasa; con un origen ajeno, 403.
app.use("/api", (req, res, next) => {
  const { origin } = req.headers;
  if (!origin) return next();
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ message: "Origin not allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", "86400");
    return res.sendStatus(204);
  }
  next();
});

// Como en Vercel, req.body es siempre un objeto (vacío si no llega JSON)
app.use(express.json({ limit: "10kb" }));
app.use((req, res, next) => {
  req.body ??= {};
  next();
});

app.all("/api/contact", contactHandler);
app.all("/api/confirm-consent", confirmConsentHandler);
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Redirección temporal (302): si cambia el texto del mensaje, los móviles que
// ya escanearon el QR no se quedan con la antigua
app.get("/tarjeta", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.redirect(302, TARJETA_URL);
});

app.use((req, res) => res.status(404).json({ message: "Not found" }));

// JSON mal formado o demasiado grande: error del cliente, en JSON
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const status = error.status ?? error.statusCode ?? 500;
  if (status >= 500) console.error("[API]", error);
  res.status(status).json({ message: status >= 500 ? "Internal server error" : "Bad request" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`[API] Listening on port ${port}`));
