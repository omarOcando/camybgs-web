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

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema, "leads-web");
