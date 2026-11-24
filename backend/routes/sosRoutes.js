
const express = require("express");
const router = express.Router();
const SOS = require("../models/sosModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAI,
    pass: process.env.EMAIL_PASS
  }
});

// Get SOS history
router.get("/history", async (req, res) => {
  try {
    const data = await SOS.find().sort({ time: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send SOS alert
router.post("/", async (req, res) => {
  try {
    const { location } = req.body;

    const name = "Annapurna";
    const phone = "7840942103";

    const newSOS = new SOS({
      message: "Emergency Alert",
      time: new Date()
    });

    await newSOS.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "SOS Alert",
      html: `
        <h1>SOS ALERT</h1>
        <p>Name: ${name}</p>
        <p>Phone: ${phone}</p>
        <p>Emergency! I need help immediately.</p>
        <p><a href="${location}" target="_blank">View My Location</a></p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "SOS Saved + Email Sent" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
