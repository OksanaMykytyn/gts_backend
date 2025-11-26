const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password too short"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate)
      return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      photo: "",
    });

    res.json({ message: "User registered", userId: user.id });
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });

    req.session.userId = user.id;

    res.json({ message: "Login successful" });
  }
);

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

function authMiddleware(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

router.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findByPk(req.session.userId, {
    attributes: ["id", "name", "email", "photo"],
  });

  res.json(user);
});

router.put(
  "/profile",
  authMiddleware,
  [body("name").optional().isString(), body("photo").optional().isString()],
  async (req, res) => {
    const updates = {};

    if (req.body.name) updates.name = req.body.name;
    if (req.body.photo) updates.photo = req.body.photo;

    await User.update(updates, {
      where: { id: req.session.userId },
    });

    res.json({ message: "Profile updated" });
  }
);

router.get("/status", authMiddleware, (req, res) => {
  res.json({ authenticated: true, userId: req.session.userId });
});

module.exports = router;
