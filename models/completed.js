"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Completed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Completed.init({
      driver: DataTypes.INTEGER,
      passenger: DataTypes.INTEGER,
      origin: DataTypes.GEOMETRY,
      destination: DataTypes.GEOMETRY,
    },
    {
      sequelize,
      modelName: "Completed",
    }
  );
  return Completed;
};
