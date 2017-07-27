'use strict';

export default function (sequelize, DataTypes) {
	return sequelize.define('Tournament', {
		id: {
		  type: DataTypes.INTEGER,
		  allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
		},
		name: DataTypes.STRING,
    	espnId: DataTypes.STRING
	});
}
