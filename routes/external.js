const express = require("express");
const axios = require("axios");
const { request, gql } = require("graphql-request");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ExternalAPI
 *   description: API інтеграції з зовнішніми сервісами
 */

/**
 * @swagger
 * /external/launches:
 *   get:
 *     summary: Отримати останні 5 запусків SpaceX (GraphQL)
 *     tags: [ExternalAPI]
 *     responses:
 *       200:
 *         description: Успішна відповідь з даними запусків
 *       500:
 *         description: Помилка GraphQL сервера
 */
router.get("/launches", async (req, res) => {
  try {
    const query = gql`
      {
        launchesPast(limit: 5) {
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
        }
      }
    `;

    const data = await request(
      "https://spacex-production.up.railway.app/",
      query
    );

    res.json(data);
  } catch (error) {
    console.error("GraphQL error:", error);
    res.status(500).json({ error: "GraphQL error" });
  }
});

/**
 * @swagger
 * /external/manga/{id}:
 *   get:
 *     summary: Отримати інформацію про манґу з Jikan API
 *     tags: [ExternalAPI]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID манґи
 *     responses:
 *       200:
 *         description: Дані про манґу
 *       500:
 *         description: Помилка REST API
 */
router.get("/manga/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(`https://api.jikan.moe/v4/manga/${id}`);

    return res.json(response.data);
  } catch (error) {
    console.error("REST error:", error);
    res.status(500).json({ error: "Failed to fetch manga" });
  }
});

module.exports = router;
