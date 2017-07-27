/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/config              ->  index
 * GET     /api/config/:id          ->  show
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Entry, Tournament} from '../../sqldb';

function respondWithResult (res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      if (Array.isArray(entity)) {
        entity = entity.map(mapEntry);
      } else {
        entity = mapEntry(entity);
      }

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
    res.status(statusCode).send(err);
  };
}

function mapEntry(e) {
  return {
    id: e.id,
    userId: e.userId,
    tournamentId: e.tournamentId,
    golferIds: [[e.golfer1AId, e.golfer1BId, e.golfer1CId, e.golfer1DId], 
      [e.golfer2AId, e.golfer2BId, e.golfer2CId, e.golfer2DId], 
      [e.golfer3AId, e.golfer3BId, e.golfer3CId, e.golfer3DId]]
  };
}

// Gets a list of Entries
export function index (req, res) {
  return Entry.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Entry from the DB
export function show (req, res) {
  return Entry.find({
    where: {
      tournamentId: req.params.tournamentId,
    },
    include: [{
      model: Tournament
    }]
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


