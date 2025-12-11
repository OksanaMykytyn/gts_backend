const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET);
/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Інтеграція Stripe (підписки)
 */

/**
 * @swagger
 * /api/stripe/create-session:
 *   post:
 *     summary: Створити Stripe Checkout Session для підписки
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: URL сторінки оплати
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: https://checkout.stripe.com/...
 *       500:
 *         description: Stripe error
 */
router.post("/create-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: "price_1ScwlT2XUtdeUjHkjWxkBzCL",
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/profile?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/profile?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe error" });
  }
});

/**
 * @swagger
 * /api/stripe/webhook:
 *   post:
 *     summary: Webhook Stripe для обробки подій
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Подія отримана
 *       400:
 *         description: Некоректний webhook підпис
 */
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log(
        `Checkout session completed for customer: ${session.customer_email}`
      );
    }

    res.json({ received: true });
  }
);

module.exports = router;
