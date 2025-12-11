require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

async function parseIntent(userText) {
  const prompt = `You are an assistant that extracts the user's intent and keywords for a forum chatbot.
Return a strict JSON object only with keys: "intent" and "keywords".
Possible intents: search_posts, recommend_posts, summarize, generate_reply, chitchat.
"keywords" must be an array of short keywords (0..5).
User message: """${userText}"""`;

  const resp = await model.generateContent(prompt);
  const responseText = resp.response ? resp.response.text() : resp.text || "";
  const cleaned = responseText.replace(/```json|```/g, "").trim();
  try {
    const parsed = JSON.parse(cleaned);
    return {
      intent: parsed.intent || "chitchat",
      keywords: Array.isArray(parsed.keywords)
        ? parsed.keywords.map((k) => String(k).trim()).filter(Boolean)
        : [],
    };
  } catch (e) {
    const lowered = userText.toLowerCase();
    if (
      lowered.includes("find") ||
      lowered.includes("search") ||
      lowered.includes("шук") ||
      lowered.includes("find posts") ||
      lowered.includes("search for")
    ) {
      return { intent: "search_posts", keywords: [userText] };
    }
    if (lowered.includes("recommend") || lowered.includes("suggest")) {
      return { intent: "recommend_posts", keywords: [] };
    }
    if (
      lowered.includes("summarize") ||
      lowered.includes("summary") ||
      lowered.includes("підсум")
    ) {
      return { intent: "summarize", keywords: [] };
    }
    return { intent: "chitchat", keywords: [] };
  }
}

async function generateReplyWithGemini(postOrMessage, opts = {}) {
  const tone = opts.tone || "friendly and constructive";
  const prompt = `You are a helpful forum assistant. Write a short reply (3-5 sentences) in Ukrainian or same language as input. Tone: ${tone}.
Message: """${postOrMessage}"""`;
  const resp = await model.generateContent(prompt, {
    temperature: 0.7,
    maxOutputTokens: 200,
  });
  const text = resp.response ? resp.response.text() : resp.text || "";
  return text.trim();
}

module.exports = {
  parseIntent,
  generateReplyWithGemini,
};
