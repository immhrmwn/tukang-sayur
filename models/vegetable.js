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
    formatStock(){
      if(this.stock === 1){
        return this.stock + ' pc'
      } else {
        return this.stock + ' pcs'
      }
    }

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
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "nama tidak boleh kosong"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "stock tidak boleh kosong"
        },
        isZero(value){
          if(+value === 0){
            throw new Error('masukan stock lebih dari 0')
          }
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "price tidak boleh kosong"
        },
        isZero(value){
          if(+value === 0){
            throw new Error('masukan price lebih dari 0')
          }
        }
      }
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vegetable',
    hooks: {
      beforeCreate(instance, options){
        instance.name += ' segar'
      }
    }
  });
  return Vegetable;
};