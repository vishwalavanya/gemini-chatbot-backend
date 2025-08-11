// gemini.js
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Make sure your GEMINI_API_KEY is set in Render's Environment Variables
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing! Set it in Render environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST: /api/gemini/chat
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message must be a non-empty string." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const reply = result?.response?.text?.() || "No reply generated.";

    res.json({ reply });

  } catch (error) {
    console.error("❌ Gemini API Error:", error?.message || error);
    if (error?.response) {
      console.error("📄 Full error response:", JSON.stringify(error.response, null, 2));
    } else {
      console.error("📄 Full error object:", error);
    }

    res.status(500).json({
      error: "Gemini API request failed",
      details: error?.message || "Unknown error"
    });
  }
});

module.exports = router;

