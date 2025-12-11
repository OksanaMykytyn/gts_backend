require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

async function generateSummary(text) {
  const prompt = `Summarize the following forum post in 1-2 short sentences in Ukrainian (if input is Ukrainian) or in the same language as the input:
"""${text}"""`;
  const resp = await model.generateContent(prompt, {
    temperature: 0.6,
    maxOutputTokens: 120,
  });
  const textOut = resp.response ? resp.response.text() : resp.text || "";
  return textOut.trim();
}

module.exports = { generateSummary };
