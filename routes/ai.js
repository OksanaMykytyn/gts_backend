require("dotenv").config();
const express = require("express");
const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log("[AI] API KEY LOADED:", !!process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function generateSummary(text) {
  const prompt = `Підсумуй наступний допис форуму в 1-2 коротких реченнях українською мовою до 20 слів:\n\n${text}`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();

  if (!response) {
    throw new Error("Empty AI response");
  }

  return response.trim();
}

router.post("/summary", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const summary = await generateSummary(text);

    res.json({ summary });
  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ error: "AI error" });
  }
});

module.exports = router;
