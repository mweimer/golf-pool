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

    const entries = entity.entries.map(e => ({
      id: e.id,
      userName: e.user.name,
      golferIds: [[e.golfer1AId, e.golfer1BId, e.golfer1CId, e.golfer1DId], 
      [e.golfer2AId, e.golfer2BId, e.golfer2CId, e.golfer2DId], 
      [e.golfer3AId, e.golfer3BId, e.golfer3CId, e.golfer3DId]]
    }));

    return {
      tournament: {
        id: entity.id,
        name: entity.name,
        espnId: entity.espnId
      },
      golfers,
      entries 
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


