const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "instructions",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      instruction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exerciseId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
