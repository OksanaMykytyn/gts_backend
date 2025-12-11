module.exports = (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define("ActivityLog", {
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
  });

  return ActivityLog;
};
