const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "images",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      exerciseId: {
        type: DataTypes.STRING,
        unique: true,
      },
      image: {
        type: DataTypes.BLOB,
      },
    },
    {
      timestamps: false,
    }
  );
