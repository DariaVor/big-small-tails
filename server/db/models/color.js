'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate({ Pet }) {
      this.hasMany(Pet, { foreignKey: 'colorId' });
    }
  }
  Color.init(
    {
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Color',
    },
  );
  return Color;
};
