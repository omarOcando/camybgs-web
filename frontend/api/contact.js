import connectDB from "../lib/db.js";
import Contact from "../lib/Contact.js";
import { createSystemeContact, addTagToSystemeContactByEmail } from "../lib/systeme.js";
import { notifyContactForm } from "../lib/email.js";
import { INTERESTS } from "../lib/interests.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { nombre, email, profesion, interes, mensaje } = req.body;

  if (!nombre || !email || !profesion || !interes || !mensaje) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!Object.hasOwn(INTERESTS, interes)) {
    return res.status(400).json({ message: "Invalid interest" });
  }

  try {
    await connectDB();
    await Contact.create({ nombre, email, profesion, interes, mensaje });

    await Promise.all([
      createSystemeContact(nombre, email).then(() =>
        addTagToSystemeContactByEmail(email, INTERESTS[interes].tagId)
      ),
      notifyContactForm({ nombre, email, profesion, interes: INTERESTS[interes].label, mensaje }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
