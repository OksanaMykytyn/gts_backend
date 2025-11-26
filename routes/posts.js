const express = require("express");
const router = express.Router();
const { Post, User, Title } = require("../models");

router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    include: [{ model: User, attributes: ["name", "photo"] }, { model: Title }],
  });

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
