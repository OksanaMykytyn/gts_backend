"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("ActivityLogs", [
      {
        user_id: 1,
        post_id: 1,
        action: "view_post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        post_id: 2,
        action: "like_post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        post_id: 3,
        action: "view_post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        user_id: 2,
        post_id: 4,
        action: "view_post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        post_id: 5,
        action: "create_post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        post_id: 6,
        action: "like_post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        user_id: 3,
        post_id: 7,
        action: "view_post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        post_id: 8,
        action: "view_post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        post_id: 9,
        action: "like_post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        post_id: 10,
        action: "create_post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("ActivityLogs", null, {});
  },
};
