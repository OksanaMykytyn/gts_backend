require("dotenv").config();
const express = require("express");
const router = express.Router();
const { parseIntent, generateReplyWithGemini } = require("../services/nlp");
const { generateSummary } = require("../services/aiSummary");
const { Op } = require("sequelize");
const { Post } = require("../models");

/**
 * @swagger
 * tags:
 *   name: Chatbot
 *   description: NLP інтерпретація, пошук та AI генерація відповідей
 */

/**
 * @swagger
 * /chat/message:
 *   post:
 *     summary: Обробка повідомлення чатботом (NLP + AI)
 *     tags: [Chatbot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Покажи мені пости про JavaScript"
 *               context:
 *                 type: object
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Результат інтерпретації і відповідь
 *       500:
 *         description: Внутрішня помилка сервера
 */
router.post("/message", async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) return res.status(400).json({ error: "message required" });

    const nlp = await parseIntent(message);
    console.log("[chatbot] NLP result:", nlp);

    if (nlp.intent === "search_posts") {
      const kw =
        nlp.keywords && nlp.keywords.length ? nlp.keywords[0] : message;
      const posts = await Post.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${kw}%` } },
            { content: { [Op.iLike]: `%${kw}%` } },
          ],
        },
        limit: 8,
      });
      return res.json({ type: "search_results", results: posts });
    }

    if (nlp.intent === "recommend_posts") {
      const tags = nlp.keywords || [];
      if (tags.length > 0) {
        const posts = await Post.findAll({
          where: {
            tags: { [Op.overlap]: tags },
          },
          limit: 6,
        }).catch(() => null);

        if (posts && posts.length)
          return res.json({ type: "recommendations", results: posts });
      }
      const recent = await Post.findAll({
        order: [["createdAt", "DESC"]],
        limit: 6,
      });
      return res.json({ type: "recommendations", results: recent });
    }

    if (nlp.intent === "summarize") {
      const kw = nlp.keywords && nlp.keywords.length ? nlp.keywords[0] : null;
      let textToSummarize = message;
      if (kw) {
        const post = await Post.findOne({
          where: {
            [Op.or]: [
              { title: { [Op.iLike]: `%${kw}%` } },
              { content: { [Op.iLike]: `%${kw}%` } },
            ],
          },
        });
        if (post && post.content) textToSummarize = post.content;
      }
      const summary = await generateSummary(textToSummarize);
      return res.json({ type: "summary", summary });
    }

    if (nlp.intent === "generate_reply") {
      const reply = await generateReplyWithGemini(message, {
        tone: "friendly",
      });
      return res.json({ type: "reply", reply });
    }

    const reply = await generateReplyWithGemini(message, { tone: "helpful" });
    return res.json({ type: "chitchat", reply });
  } catch (err) {
    console.error("[chatbot] error", err);
    return res.status(500).json({ error: "internal", details: err.message });
  }
});

module.exports = router;
