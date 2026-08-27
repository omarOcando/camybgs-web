import connectDB from "../lib/db.js";
import Contact from "../lib/Contact.js";
import { createSystemeContact, addTagToSystemeContactByEmail } from "../lib/systeme.js";
import { notifyContactForm } from "../lib/email.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { nombre, email, profesion, mensaje } = req.body;

  if (!nombre || !email || !profesion || !mensaje) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await connectDB();

    try {
      await Contact.create({ nombre, email, profesion, mensaje });
    } catch (dbError) {
      if (dbError.code !== 11000) throw dbError;
    }

    await Promise.all([
      createSystemeContact(nombre, email).then(() =>
        addTagToSystemeContactByEmail(email, 2049193)
      ),
      notifyContactForm({ nombre, email, profesion, mensaje }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
