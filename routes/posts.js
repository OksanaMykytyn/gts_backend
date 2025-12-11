const express = require("express");
const router = express.Router();
const { Post, User, Title } = require("../models");
const logActivity = require("../middlewares/activityLogger");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Управління постами та публікаціями
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Отримати всі пости
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Список постів
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   hasTitle:
 *                     type: boolean
 *                   titleImage:
 *                     type: string
 *                     nullable: true
 *                   title:
 *                     type: string
 *                     nullable: true
 *                   tags:
 *                     type: string
 *                     nullable: true
 *                   post:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: string
 *                       userImg:
 *                         type: string
 *                         nullable: true
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       likes:
 *                         type: integer
 *                       comments:
 *                         type: integer
 */

router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    include: [{ model: User, attributes: ["name", "photo"] }, { model: Title }],
  });

  if (req.user) {
    logActivity("view_post", req.user.id);
  }

  const formatted = posts.map((p) => ({
    id: p.id,
    hasTitle: p.titleId !== null,
    titleImage: p.Title?.image || null,
    title: p.Title?.title || null,
    tags: p.Title?.tags || null,

    post: {
      user: p.User.name,
      userImg: p.User.photo,
      title: p.title,
      content: p.content,
      likes: p.likes,
      comments: p.comments,
    },
  }));

  res.json(formatted);
});

module.exports = router;
