'use strict';

export default function (sequelize, DataTypes) {
	const Entry = sequelize.define('Entry', {
		id: {
		  type: DataTypes.INTEGER,
		  allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
		}
	});

	Entry.belongsTo(sequelize.models.User, {as: "user"});

	Entry.belongsTo(sequelize.models.Golfer, {as: "golfer1A"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "golfer1B"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "golfer1C"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "golfer1D"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "golfer2A"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "golfer2B"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "golfer2C"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "golfer2D"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "golfer3A"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "golfer3B"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "golfer3C"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "golfer3D"});

	Entry.belongsTo(sequelize.models.Tournament, {as: "tournament"});

	return Entry;
}
