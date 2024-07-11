'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestStatus extends Model {
    static associate({Animal}) {
      this.hasMany(Animal, {foreignKey: 'requestStatusId'})
    }
  }
  RequestStatus.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RequestStatus',
  });
  return RequestStatus;
};