const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");
const SOS = require("../models/SOS"); // 👈 ADD THIS
const nodemailer = require("nodemailer");

// Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "annapurnaneginal21@gmail.com",
    pass: "udiyltucitijfnda"
  }
});

// 🚨 SOS (POST)
router.post("/", async (req, res) => {
  try {
    const { location } = req.body;

    // 👉 Static user (later dynamic करू शकतोस)
    const name = "Annapurna";
    const phone = "7840942103";

    // 🔥 GET ALL SOS
router.get("/history", async (req, res) => {
  try {
    const data = await SOS.find().sort({ time: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

    // ✅ SAVE TO DB
    const newSOS = new SOS({
      name,
      phone,
      location
    });

    await newSOS.save();

    // 📧 Email
    const mailOptions = {
      from: "annapurnaneginal21@gmail.com",
      to: "annapurnaneginal21@gmail.com",
      subject: "🚨 SOS Alert",
      html: `
        <h1 style="color:red;">🚨 SOS ALERT 🚨</h1>

        <p style="font-size:18px;">
          <b>Name:</b> ${name} <br>
          <b>Phone:</b> ${phone}
        </p>

        <p style="font-size:20px; color:red;">
          Emergency! I need help immediately.
        </p>

        <p>
          📍 <a href="${location}" target="_blank">View My Location</a>
        </p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "SOS Saved + Email Sent ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;