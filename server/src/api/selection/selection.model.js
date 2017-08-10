'use strict';

module.exports = function (sequelize, DataTypes) {
	const Selection = sequelize.define('Selection', {
		id: {
		  type: DataTypes.INTEGER,
		  allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
		}
	});

	Selection.belongsTo(sequelize.models.User, {as: "user"});

	Selection.belongsTo(sequelize.models.Golfer, {as: "g1A"});
	Selection.belongsTo(sequelize.models.Golfer, {as: "g1B"});
	Selection.belongsTo(sequelize.models.Golfer, {as: "g1C"});
	Selection.belongsTo(sequelize.models.Golfer, {as: "g1D"});
	Selection.belongsTo(sequelize.models.Golfer, {as: "g2A"});
	Selection.belongsTo(sequelize.models.Golfer, {as: "g2B"});
	Selection.belongsTo(sequelize.models.Golfer, {as: "g2C"});
	Selection.belongsTo(sequelize.models.Golfer, {as: "g2D"});
	Selection.belongsTo(sequelize.models.Golfer, {as: "g3A"});
	Selection.belongsTo(sequelize.models.Golfer, {as: "g3B"});
	Selection.belongsTo(sequelize.models.Golfer, {as: "g3C"});
	Selection.belongsTo(sequelize.models.Golfer, {as: "g3D"});

	sequelize.models.Tournament.hasMany(Selection, {as: "selections", foreignKey: 'tournamentId'});

	return Selection;
}
