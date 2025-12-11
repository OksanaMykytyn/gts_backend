const tf = require("@tensorflow/tfjs-node");
const { buildVocab, saveVocab, textToSequence } = require("./utils/tokenizer");
const path = require("path");
const fs = require("fs");

const dataset = [
  { text: "I hate this product, it is awful and broken", label: 0 },
  { text: "Terrible experience, will not use again", label: 0 },
  { text: "Not good, disappointed", label: 0 },

  { text: "It is okay, does what it should", label: 1 },
  { text: "Neutral about this, neither good nor bad", label: 1 },
  { text: "Average quality, nothing special", label: 1 },

  { text: "I love it! Very useful and high quality", label: 2 },
  { text: "Great product, exceeded expectations", label: 2 },
  { text: "Amazing! Highly recommend it", label: 2 },

  { text: "Мені дуже сподобалося, дякую", label: 2 },
  { text: "Це нормально, не погано і не дуже добре", label: 1 },
  { text: "Поганий сервіс, я незадоволений", label: 0 },
];

const VOCAB_SIZE = 2000;
const MAX_LEN = 30;
const EMBEDDING_DIM = 50;
const BATCH_SIZE = 4;
const EPOCHS = 30;
const MODEL_DIR = path.join(__dirname, "model");
const VOCAB_PATH = path.join(__dirname, "vocab.json");

async function run() {
  const texts = dataset.map((d) => d.text);
  const vocab = buildVocab(texts, VOCAB_SIZE);
  saveVocab(vocab, VOCAB_PATH);
  console.log("Vocab saved, size =", Object.keys(vocab).length);

  const sequences = dataset.map((d) => textToSequence(d.text, vocab, MAX_LEN));
  const labels = dataset.map((d) => d.label);

  const xs = tf.tensor2d(sequences, [sequences.length, MAX_LEN], "int32");
  const ys = tf.oneHot(tf.tensor1d(labels, "int32"), 3);

  const model = tf.sequential();
  model.add(
    tf.layers.embedding({
      inputDim: VOCAB_SIZE + 1,
      outputDim: EMBEDDING_DIM,
      inputLength: MAX_LEN,
    })
  );
  model.add(tf.layers.globalAveragePooling1d());
  model.add(tf.layers.dense({ units: 32, activation: "relu" }));
  model.add(tf.layers.dropout({ rate: 0.2 }));
  model.add(tf.layers.dense({ units: 3, activation: "softmax" }));

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  model.summary();

  await model.fit(xs, ys, {
    batchSize: BATCH_SIZE,
    epochs: EPOCHS,
    verbose: 1,
  });

  if (!fs.existsSync(MODEL_DIR)) fs.mkdirSync(MODEL_DIR);

  const saveURL = "file://" + MODEL_DIR;
  await model.save(saveURL);
  console.log("Model saved to", MODEL_DIR);

  xs.dispose();
  ys.dispose();
  console.log("Training complete.");
}

run().catch((err) => {
  console.error("Training error", err);
});
