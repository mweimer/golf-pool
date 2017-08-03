/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/config              ->  index
 * GET     /api/config/:id          ->  show
 */

'use strict';

import jsonpatch from 'fast-json-patch';

import {Entry, Tournament, User, Golfer} from '../../sqldb';

function respondWithResult (res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleEntityNotFound (res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError (res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.error(err);
    res.status(statusCode).send(err);
  };
}

function mapConfig(entity) {
    const golfers = entity.golfers.map(g => ({
      id: g.id,
      name: g.name,
      espnId: g.espnId,
      tier: g.TournamentGolfer.tier
    }));

    const contestantEntries = entity.entries.map(e => ({
      id: e.id,
      userName: e.user.name,
      userId: e.user.id,
      entries: [[e.g1AId, e.g1BId, e.g1CId, e.g1DId], [e.g2AId, e.g2BId, e.g2CId, e.g2DId], [e.g3AId, e.g3BId, e.g3CId, e.g3DId]]
    }));

    return {
      tournament: {
        id: entity.id,
        name: entity.name,
        espnId: entity.espnId
      },
      golfers,
      contestantEntries 
    }
}

// Gets a list of Entries
export function index (req, res) {
  return Tournament.findAll({
    include: [
      { model: Golfer, as: 'golfers' }, 
      { model:Entry, as:'entries', include: [{model:User, as:'user', attributes:['id','name']}]}
    ]
  })
    .then((entity) => entity.map(mapConfig))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Entry from the DB
export function show (req, res) {
  return Tournament.find({
    where: {
      id: req.params.tournamentId,
    },
    include: [
      { model: Golfer, as: 'golfers' }, 
      { model:Entry, as:'entries', include: [{model:User, as:'user', attributes:['id','name']}]}
    ]
  })
    .then(handleEntityNotFound(res))
    .then(mapConfig)
    .then(respondWithResult(res))
    .catch(handleError(res));
}


