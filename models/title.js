"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Title extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Title.hasMany(models.Post, { foreignKey: "titleId" });
    }
  }
  Title.init(
    {
      title: DataTypes.STRING,
      tags: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Title",
    }
  );
  return Title;
};
