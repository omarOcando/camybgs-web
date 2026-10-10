import mongoose from "mongoose";
import { INTEREST_VALUES } from "./interests.js";

// El email no es único: si alguien escribe otra vez, se guarda también.
// (El índice único antiguo "email_1" de leads-web hay que borrarlo en Atlas;
// Mongoose no lo borra solo.)
const contactSchema = new mongoose.Schema(
  {
    nombre:    { type: String, required: true },
    email:     { type: String, required: true },
    profesion: { type: String, required: true },
    interes:   { type: String, required: true, enum: INTEREST_VALUES },
    mensaje:   { type: String, required: true },
    // Casilla opcional de campañas por email: queda constancia de si se marcó
    // y cuándo (createdAt) como prueba del consentimiento
    emailConsent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Borrado automático (TTL) a los 24 meses del envío, como dice la política de
// privacidad. 730 días para no pasarse nunca de 24 meses. Mongoose crea el
// índice al arrancar (autoIndex), también en la base real.
contactSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 730 });

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema, "leads-web");
