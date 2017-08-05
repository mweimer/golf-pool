'use strict';

module.exports = function (sequelize, DataTypes) {
	const Tournament = sequelize.define('Tournament', {
		id: {
		  type: DataTypes.INTEGER,
		  allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
		},
		name: DataTypes.STRING,
    	espnId: DataTypes.STRING,
    	current: DataTypes.BOOLEAN
	});

	const TournamentGolfer = sequelize.define('TournamentGolfer', {
		tier: DataTypes.STRING
	});

	Tournament.belongsToMany(sequelize.models.Golfer, {through: TournamentGolfer, as: 'golfers', foreignKey: 'tournamentId'});
	sequelize.models.Golfer.belongsToMany(Tournament, {through: TournamentGolfer, as: 'tournaments', foreignKey: 'golferId'});

	return { Tournament, TournamentGolfer };
}
