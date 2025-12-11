const express = require("express");
const router = express.Router();
const { sequelize } = require("../models");

/**
 * @swagger
 * tags:
 *   name: AdminStats
 *   description: Статистика для адмін-панелі
 */

/**
 * @swagger
 * /stats/users-count:
 *   get:
 *     summary: Кількість користувачів
 *     tags: [AdminStats]
 *     responses:
 *       200:
 *         description: Повертає кількість користувачів
 */
router.get("/users-count", async (req, res) => {
  const [[result]] = await sequelize.query('SELECT COUNT(*) FROM "Users"');
  res.json({ count: result.count });
});

/**
 * @swagger
 * /stats/posts-count:
 *   get:
 *     summary: Кількість постів
 *     tags: [AdminStats]
 *     responses:
 *       200:
 *         description: Повертає кількість постів
 */
router.get("/posts-count", async (req, res) => {
  const [[result]] = await sequelize.query('SELECT COUNT(*) FROM "Posts"');
  res.json({ count: result.count });
});

/**
 * @swagger
 * /stats/posts-by-title:
 *   get:
 *     summary: Кількість постів згрупованих за заголовками
 *     tags: [AdminStats]
 *     responses:
 *       200:
 *         description: Масив категорій і кількість постів
 */
router.get("/posts-by-title", async (req, res) => {
  const [data] = await sequelize.query(`
    SELECT "Titles"."title", COUNT("Posts"."id") AS count
    FROM "Titles"
    LEFT JOIN "Posts" ON "Posts"."titleId" = "Titles"."id"
    GROUP BY "Titles"."title"
  `);

  res.json(data);
});

/**
 * @swagger
 * /stats/activity-by-day:
 *   get:
 *     summary: Кількість активностей по днях
 *     tags: [AdminStats]
 *     responses:
 *       200:
 *         description: Дані активностей по датах
 */
router.get("/activity-by-day", async (req, res) => {
  const [data] = await sequelize.query(`
    SELECT DATE(created_at) AS day, COUNT(*) as count
    FROM activity_logs
    GROUP BY day
    ORDER BY day
  `);

  res.json(data);
});

module.exports = router;
