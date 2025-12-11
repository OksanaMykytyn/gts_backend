const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key";

const createToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Управління користувачами та аутентифікацією (JWT)
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ivan Koval
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ivan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: secure123
 *     responses:
 *       200:
 *         description: Користувач успішно зареєстрований
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       400:
 *         description: Помилка валідації або email вже існує
 */

router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isString()
      .withMessage("Name must be a string"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
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

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Вхід користувача (Login)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ivan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secure123
 *     responses:
 *       200:
 *         description: Успішний вхід, повертає JWT токен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       400:
 *         description: Невірний пароль
 *       404:
 *         description: Користувача не знайдено
 */

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

    const token = createToken(user.id);

    res.json({ message: "Login successful", token, userId: user.id });
  }
);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Отримати дані профілю поточного користувача
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Дані профілю
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 photo:
 *                   type: string
 *                   nullable: true
 *       401:
 *         description: Несанкціонований доступ
 *       404:
 *         description: Користувача не знайдено
 */

router.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findByPk(req.userId, {
    attributes: ["id", "name", "email", "photo"],
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Оновити дані профілю
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ivan Updated
 *               photo:
 *                 type: string
 *                 format: url
 *                 example: https://example.com/new_photo.jpg
 *     responses:
 *       200:
 *         description: Профіль успішно оновлено
 *       400:
 *         description: Помилка валідації
 *       401:
 *         description: Несанкціонований доступ
 */

router.put(
  "/profile",
  authMiddleware,
  [
    body("email")
      .not()
      .exists()
      .withMessage("Email cannot be updated via this route"),
    body("password")
      .not()
      .exists()
      .withMessage("Password cannot be updated via this route"),

    body("name")
      .optional()
      .trim()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ min: 2, max: 255 })
      .withMessage("Name length must be between 2 and 255 characters"),

    body("photo").optional().isURL().withMessage("Photo must be a valid URL"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updates = {};

    if (req.body.name) updates.name = req.body.name;
    if (req.body.photo) updates.photo = req.body.photo;

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided for update." });
    }

    await User.update(updates, {
      where: { id: req.userId },
    });

    res.json({ message: "Profile updated" });
  }
);

/**
 * @swagger
 * /users/status:
 *   get:
 *     summary: Перевірка статусу аутентифікації
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Користувач аутентифікований
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated:
 *                   type: boolean
 *                   example: true
 *                 userId:
 *                   type: integer
 *                   example: 42
 *       401:
 *         description: Несанкціонований доступ
 */

router.get("/status", authMiddleware, (req, res) => {
  res.json({ authenticated: true, userId: req.userId });
});

module.exports = router;
