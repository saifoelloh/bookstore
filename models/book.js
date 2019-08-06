'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    published: DataTypes.INTEGER,
    authors: DataTypes.ARRAY
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};