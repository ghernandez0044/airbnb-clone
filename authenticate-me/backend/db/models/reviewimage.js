'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // One-To-Many Relationship between Reviews and ReviewImages
      ReviewImage.belongsTo(
        models.Review,
        { foreignKey: 'reviewId' }
      )
    }
  }
  ReviewImage.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    reviewId: DataTypes.INTEGER,
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};