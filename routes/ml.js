const express = require("express");
const router = express.Router();
const tf = require("@tensorflow/tfjs-node");
const path = require("path");
const { loadVocab, textToSequence } = require("../utils/tokenizer");

const MODEL_DIR = path.join(__dirname, "..", "model");
const VOCAB_PATH = path.join(__dirname, "..", "vocab.json");

let model = null;
let vocab = null;
const MAX_LEN = 30;

async function loadModelAndVocab() {
  try {
    vocab = loadVocab(VOCAB_PATH);
    model = await tf.loadLayersModel(
      "file://" + path.join(MODEL_DIR, "model.json")
    );
    console.log(
      "[ML] Model and vocab loaded. Vocab size:",
      Object.keys(vocab).length
    );
  } catch (err) {
    console.error("[ML] Failed to load model or vocab:", err);
    throw err;
  }
}

loadModelAndVocab().catch(() => {
  console.error(
    "[ML] Model load failed — endpoint will return error until model is trained and saved."
  );
});

const LABELS = {
  0: "negative",
  1: "neutral",
  2: "positive",
};

/**
 * @swagger
 * tags:
 *   name: ML
 *   description: Машинне навчання — класифікація настрою тексту
 */

/**
 * @swagger
 * /ml/sentiment:
 *   post:
 *     summary: Аналіз настрою тексту (positive / neutral / negative)
 *     tags: [ML]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: I love this project!
 *     responses:
 *       200:
 *         description: Результат аналізу настрою
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 label:
 *                   type: string
 *                   example: positive
 *                 probabilities:
 *                   type: object
 *                   properties:
 *                     negative:
 *                       type: number
 *                       example: 0.02
 *                     neutral:
 *                       type: number
 *                       example: 0.12
 *                     positive:
 *                       type: number
 *                       example: 0.86
 *       400:
 *         description: Немає тексту
 *       500:
 *         description: Модель не завантажена або помилка інференсу
 */
router.post("/sentiment", async (req, res) => {
  try {
    if (!model || !vocab) {
      return res
        .status(500)
        .json({ error: "Model not loaded. Run training and restart server." });
    }

    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "text is required" });

    const seq = textToSequence(text, vocab, MAX_LEN);
    const input = tf.tensor2d([seq], [1, MAX_LEN], "int32");

    const preds = model.predict(input);
    const probs = preds.arraySync()[0];

    let maxIdx = 0;
    for (let i = 1; i < probs.length; i++) {
      if (probs[i] > probs[maxIdx]) maxIdx = i;
    }

    const result = {
      label: LABELS[maxIdx],
      probabilities: {
        negative: probs[0],
        neutral: probs[1],
        positive: probs[2],
      },
    };

    input.dispose();
    preds.dispose();

    return res.json(result);
  } catch (err) {
    console.error("[ML] Inference error", err);
    return res
      .status(500)
      .json({ error: "inference failed", details: err.message });
  }
});

module.exports = router;
