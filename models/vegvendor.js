'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VegVendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  VegVendor.init({
    user_id: DataTypes.INTEGER,
    veg_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VegVendor',
  });
  return VegVendor;
};