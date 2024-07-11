'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PetStatus extends Model {
    static associate({ Pet }) {
      this.hasMany(Pet, { foreignKey: 'petStatusId' });
    }
  }
  PetStatus.init(
    {
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'PetStatus',
    },
  );
  return PetStatus;
};
