import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = await Contact.create({
      name,
      email,
      phone,
      message
    });

    res.status(201).json({
      success: true,
      message: "Contact form submitted",
      data: newContact
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
