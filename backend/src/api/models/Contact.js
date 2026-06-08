import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    nombre:    { type: String, required: true },
    email:     { type: String, required: true },
    profesion: { type: String, required: true },
    mensaje:   { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
