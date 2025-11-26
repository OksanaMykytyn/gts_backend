"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("Titles", [
      {
        title: "Well, if you're here for a relatable mean girl...",
        tags: "#manga #history #romance",
        image:
          "https://i.pinimg.com/736x/ef/3e/fc/ef3efc656dde30d643d69a940b7a6ddf.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Spy x Family — cutest chaos ever",
        tags: "#anime #comedy",
        image:
          "https://i.pinimg.com/736x/7f/9c/91/7f9c91ea551e07c0eb014873a2005646.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    return queryInterface.bulkDelete("Titles", null, {});
  },
};
