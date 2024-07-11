'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({ Animal }) {
      this.hasMany(Animal, { foreignKey: 'categoryId' });
    }
  }
  Category.init(
    {
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Category',
    },
  );
  return Category;
};