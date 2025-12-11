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
      {
        title: "The Villainess Reverses the Hourglass",
        tags: "#isekai #time_travel #revenge",
        image:
          "https://i.pinimg.com/1200x/36/5c/08/365c08a9c904c73bbe5d17b341797070.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Who Made Me a Princess?",
        tags: "#fantasy #royal #cute",
        image:
          "https://i.pinimg.com/736x/07/33/b7/0733b74481fe1203733823bbddc03f63.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Reason Why Raeliana Ended up at the Duke's Mansion",
        tags: "#mystery #contract_marriage #suspense",
        image:
          "https://i.pinimg.com/736x/0d/f3/bd/0df3bd2ff5ed5317832a13fc60515619.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Suddenly Became A Princess One Day",
        tags: "#fantasy #rebirth #adventure",
        image:
          "https://i.pinimg.com/736x/9a/01/53/9a0153d2a9278938a1f0f736e1120d9a.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "I Became the Male Lead's Adopted Daughter",
        tags: "#family #healing #magic",
        image:
          "https://i.pinimg.com/1200x/b2/c3/c5/b2c3c5248264ac69ef3c99b39890c7fa.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    return queryInterface.bulkDelete("Titles", null, {});
  },
};
