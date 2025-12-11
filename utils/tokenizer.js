const fs = require("fs");
const path = require("path");

function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[\n\r]/g, " ")
    .replace(/[^a-zA-Z0-9\u0400-\u04FF\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildVocab(texts, vocabSize = 5000) {
  const freq = {};
  texts.forEach((t) => {
    const words = cleanText(t).split(" ");
    words.forEach((w) => {
      if (!w) return;
      freq[w] = (freq[w] || 0) + 1;
    });
  });
  const sorted = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);
  const vocab = {};
  const limit = Math.min(vocabSize, sorted.length);
  for (let i = 0; i < limit; i++) {
    vocab[sorted[i]] = i + 1;
  }
  return vocab;
}

function textToSequence(text, vocab, maxLen) {
  const words = cleanText(text).split(" ").filter(Boolean);
  const seq = words.map((w) => vocab[w] || 0);
  if (seq.length > maxLen) {
    return seq.slice(0, maxLen);
  } else {
    const pad = new Array(Math.max(0, maxLen - seq.length)).fill(0);
    return seq.concat(pad);
  }
}

function saveVocab(vocab, outPath) {
  fs.writeFileSync(outPath, JSON.stringify(vocab, null, 2), "utf8");
}

function loadVocab(vocabPath) {
  const raw = fs.readFileSync(vocabPath, "utf8");
  return JSON.parse(raw);
}

module.exports = {
  cleanText,
  buildVocab,
  textToSequence,
  saveVocab,
  loadVocab,
};
