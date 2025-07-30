const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("excerise", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    exerciseId: {
      type: DataTypes.STRING,
      unique: true,
    },
    bodyPart: DataTypes.STRING,
    equipment: DataTypes.STRING,
    name: DataTypes.STRING,
    target: DataTypes.STRING,
    description: DataTypes.TEXT,
    difficulty: DataTypes.STRING,
    category: DataTypes.STRING,
  }, {
    timestamps: false,
  });
