"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "UserName",
        email: "user@mail.com",
        password: "$2a$10$abcdefabcdefabcdefabcdefabcdefabcdefab", // bcrypt hash
        photo:
          "https://i.pinimg.com/1200x/36/66/70/3666706d4737850f40c16d9ef977df6b.jpg",
        is_premium: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mia",
        email: "mia@mail.com",
        password: "$2a$10$abcdefabcdefabcdefabcdefabcdefabcdefab",
        photo:
          "https://i.pinimg.com/1200x/3d/4d/f8/3d4df803c4cd9809b217e94b026c507a.jpg",
        is_premium: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lio",
        email: "lio@mail.com",
        password: "$2a$10$abcdefabcdefabcdefabcdefabcdefabcdefab",
        photo:
          "https://i.pinimg.com/736x/9f/08/83/9f0883ff5fdcf35b91643d952074e9d1.jpg",
        is_premium: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
