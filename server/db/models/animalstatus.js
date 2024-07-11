'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnimalStatus extends Model {
    static associate({ Animal }) {
      this.hasMany(Animal, { foreignKey: 'animalStatusId' });
    }
  }
  AnimalStatus.init(
    {
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'AnimalStatus',
    },
  );
  return AnimalStatus;
};
