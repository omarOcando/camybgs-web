import mongoose from "mongoose";

// Constancia del consentimiento para emails (art. 7.1 del RGPD), aparte de las
// consultas y sin borrado automático: se borra cuando la persona se da de baja
// (proceso en PLAN-REDISENO.md). createdAt es la fecha del consentimiento.
const emailConsentSchema = new mongoose.Schema(
  {
    email:   { type: String, required: true, lowercase: true, trim: true, index: true },
    text:    { type: String, required: true }, // texto exacto de la casilla
    version: { type: String, required: true },
    lang:    { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.EmailConsent
  || mongoose.model("EmailConsent", emailConsentSchema, "email-consents");
