'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vegetable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vegetable.belongsToMany(models.Tag, {
        through: "VegetableTags",
        foreignKey: 'veg_id'
      })
      Vegetable.belongsToMany(models.User, {
        through: "VegVendors",
        foreignKey: 'veg_id'
      })
    }
  };
  Vegetable.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vegetable',
  });
  return Vegetable;
};