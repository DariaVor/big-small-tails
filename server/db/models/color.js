'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate({ Animal }) {
      this.hasMany(Animal, { foreignKey: 'colorId' });
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
