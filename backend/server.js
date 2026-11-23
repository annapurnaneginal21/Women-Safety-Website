
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes");
const sosRoutes = require("./routes/sosRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/contacts", contactRoutes);
app.use("/sos", sosRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Women Safety Server Running 🚀");
});

// MongoDB Atlas Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log("DB Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
