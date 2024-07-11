'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestStatus extends Model {
    static associate({Pet}) {
      this.hasMany(Pet, {foreignKey: 'requestStatusId'})
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