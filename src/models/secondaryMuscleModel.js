const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("secondaryMuscle", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    muscle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exerciseId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
