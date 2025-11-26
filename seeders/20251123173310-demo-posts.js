"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("Posts", [
      {
        userId: 1,
        titleId: 1,
        title: "Well, if you're here for a relatable mean girl...",
        content: "Well, if you're here for a relatable mean girl...",
        tags: "#manga #history #romance",
        likes: 34,
        comments: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        titleId: null,
        title: "Why villains are always more interesting",
        content: "Good characters don't struggle enough...",
        tags: "",
        likes: 122,
        comments: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        titleId: 2,
        title: "Anya supremacy",
        content: "Twilight is the best spy...",
        tags: "#anime #comedy",
        likes: 51,
        comments: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
