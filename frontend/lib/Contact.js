import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    nombre:    { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    profesion: { type: String, required: true },
    mensaje:   { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema, "leads-web");
