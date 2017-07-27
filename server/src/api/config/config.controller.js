/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/configs              ->  index
 * GET     /api/configs/:id          ->  show
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Tournament, Entry, Golfer} from '../../sqldb';

function respondWithResult (res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      if (Array.isArray(entity)) {
        entity = entity.map(mapConfig);
      } else {
        entity = mapConfig(entity);
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



// Gets a list of Configs
export function index (req, res) {
  return Entry.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Config from the DB
export function show (req, res) {
  return Entry.find({
    where: {
      tournamentId: parseInt(req.params.tournamentId, 10)
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

