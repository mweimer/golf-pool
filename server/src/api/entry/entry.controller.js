/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/entries              ->  index
 * POST    /api/entries              ->  create
 * GET     /api/entries/:id          ->  show
 * PUT     /api/entries/:id          ->  upsert
 * PATCH   /api/entries/:id          ->  patch
 * DELETE  /api/entries/:id          ->  destroy
 */

'use strict';

const jsonpatch = require('fast-json-patch');
const {Entry} = require('../../sqldb');

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
    console.error(err);
    res.status(statusCode).send(err);
  };
}

function mapEntry(e) {
  return {
    id: e.id,
    userId: e.userId,
    tournamentId: e.tournamentId,
    golferIds: [[e.g1AId, e.g1BId, e.g1CId, e.g1DId], [e.g2AId, e.g2BId, e.g2CId, e.g2DId], [e.g3AId, e.g3BId, e.g3CId, e.g3DId]]
  };
}

function mapToEntry(e) {
  const entry = {
    userId: e.userId,
    tournamentId: e.tournamentId,
    g1AId: e.golferIds[0][0],
    g1BId: e.golferIds[0][1],
    g1CId: e.golferIds[0][2],
    g1DId: e.golferIds[0][3],
    g2AId: e.golferIds[1][0],
    g2BId: e.golferIds[1][1],
    g2CId: e.golferIds[1][2],
    g2DId: e.golferIds[1][3],
    g3AId: e.golferIds[2][0],
    g3BId: e.golferIds[2][1],
    g3CId: e.golferIds[2][2],
    g3DId: e.golferIds[2][3],
  };

  if (e.id) {
    entry.id = e.id;
  }

  return entry;
}


// Creates a new Entry in the DB
module.exports.create = function(req, res) {
  const entry = mapToEntry(req.body);
  return Entry.create(entry)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates the given Entry in the DB at the specified ID
module.exports.update = function(req, res) {
  const entry = mapToEntry(req.body);
  return Entry.update(entry, {
    where: {
      id: req.params.id
    }
  })
  .then(respondWithResult(res))
  .catch(handleError(res));
}



