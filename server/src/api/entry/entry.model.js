'use strict';

module.exports = function (sequelize, DataTypes) {
	const Entry = sequelize.define('Entry', {
		id: {
		  type: DataTypes.INTEGER,
		  allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
		}
	});

	Entry.belongsTo(sequelize.models.User, {as: "user"});

	Entry.belongsTo(sequelize.models.Golfer, {as: "g1A"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "g1B"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "g1C"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "g1D"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "g2A"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "g2B"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "g2C"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "g2D"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "g3A"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "g3B"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "g3C"});
	Entry.belongsTo(sequelize.models.Golfer, {as: "g3D"});

	sequelize.models.Tournament.hasMany(Entry, {as: "entries", foreignKey: 'tournamentId'});

	return Entry;
}
