'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    static associate({ AnimalStatus, Category, Color, RequestStatus, User }) {
      this.belongsTo(AnimalStatus, { foreignKey: 'animalStatusId' });
      this.belongsTo(Category, { foreignKey: 'categoryId' });
      this.belongsTo(Color, { foreignKey: 'colorId' });
      this.belongsTo(RequestStatus, { foreignKey: 'requestStatusId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Animal.init(
    {
      name: DataTypes.STRING,
      animalStatusId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      colorId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      location: DataTypes.STRING,
      image: DataTypes.STRING,
      hasCollar: DataTypes.BOOLEAN,
      contactInfo: DataTypes.STRING,
      date: DataTypes.DATE,
      requestStatusId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Animal',
    },
  );
  return Animal;
};
