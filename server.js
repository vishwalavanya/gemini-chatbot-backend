const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const geminiRouter = require("./routes/gemini");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // replaces body-parser.json()

// Routes
app.use("/api/gemini", geminiRouter);

// Start server
const PORT = process.env.PORT || 1000; // port=1000 here
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

