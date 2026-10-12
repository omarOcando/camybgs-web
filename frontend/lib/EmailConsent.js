import mongoose from "mongoose";

// Constancia del consentimiento para emails (art. 7.1 del RGPD), aparte de las
// consultas. createdAt es la fecha en que se marcó la casilla.
// Doble opt-in (lib/emailConsentFlow.js): el registro nace "pending" y pasa a
// "confirmed" cuando la persona pulsa el enlace del email de confirmación.
// - Los "confirmed" no se borran solos: se borran cuando la persona se da de
//   baja (proceso en PLAN-REDISENO.md).
// - Los "pending" se borran solos a los 30 días (índice TTL parcial, abajo).
// - Los registros anteriores al doble opt-in no tienen status: ya tenían la
//   etiqueta en Systeme y cuentan como confirmados.
const emailConsentSchema = new mongoose.Schema(
  {
    email:   { type: String, required: true, lowercase: true, trim: true, index: true },
    text:    { type: String, required: true }, // texto exacto de la casilla
    version: { type: String, required: true },
    lang:    { type: String, required: true },
    status:  { type: String, enum: ["pending", "confirmed"] },
    confirmedAt: { type: Date },
    // false si Systeme falló al añadir la etiqueta al confirmar (revisar a mano)
    systemeTagged: { type: Boolean },
  },
  { timestamps: true }
);

// Borrado automático de los consentimientos sin confirmar a los 30 días, como
// dice la política de privacidad. Índice parcial: solo afecta a "pending", así
// que al confirmar el registro deja de caducar. Mongoose lo crea al arrancar.
emailConsentSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30, partialFilterExpression: { status: "pending" } }
);

export default mongoose.models.EmailConsent
  || mongoose.model("EmailConsent", emailConsentSchema, "email-consents");
