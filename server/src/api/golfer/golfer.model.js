'use strict';

module.exports = function (sequelize, DataTypes) {
  const Golfer = sequelize.define('Golfer', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    espnId: DataTypes.STRING
  });

  return Golfer;
}
