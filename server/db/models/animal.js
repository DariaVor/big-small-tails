'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate({ PetStatus, Category, Color, RequestStatus, User }) {
      this.belongsTo(PetStatus, { foreignKey: 'petStatusId' });
      this.belongsTo(Category, { foreignKey: 'categoryId' });
      this.belongsTo(Color, { foreignKey: 'colorId' });
      this.belongsTo(RequestStatus, { foreignKey: 'requestStatusId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Pet.init(
    {
      name: DataTypes.STRING,
      petStatusId: DataTypes.INTEGER,
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
      modelName: 'Pet',
    },
  );
  return Pet;
};
