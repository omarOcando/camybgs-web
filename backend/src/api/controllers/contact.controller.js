import { createSystemeContact, addTagToSystemeContactByEmail } from "../../utils/systeme.js";
import { notifyContactForm } from "../../utils/email.js";
import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {
  try {
    const { nombre, email, profesion, mensaje } = req.body;

    if (!nombre || !email || !profesion || !mensaje) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Contact.create({ nombre, email, profesion, mensaje });
    await createSystemeContact(nombre, email);
    await addTagToSystemeContactByEmail(email, 2049193);
    res.status(200).json({ ok: true });

    notifyContactForm({ nombre, email, profesion, mensaje });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
