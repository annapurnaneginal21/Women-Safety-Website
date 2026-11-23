const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");

// ✅ Save Contact
router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const contact = new Contact(req.body);
    await contact.save();

    res.json({ message: "Contact Saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 DELETE Contact (NEW)
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;