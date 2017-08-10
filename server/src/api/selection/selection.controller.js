/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/selections              ->  index
 * POST    /api/selections              ->  create
 * GET     /api/selections/:id          ->  show
 * PUT     /api/selections/:id          ->  upsert
 * PATCH   /api/selections/:id          ->  patch
 * DELETE  /api/selections/:id          ->  destroy
 */

'use strict';

const jsonpatch = require('fast-json-patch');
const {Selection} = require('../../sqldb');

function respondWithMappedResult (res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      if (Array.isArray(entity)) {
        entity = entity.map(mapSelection);
      } else {
        entity = mapSelection(entity);
      }

      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

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

function mapSelection(e) {
  return {
    id: e.id,
    userId: e.userId,
    tournamentId: e.tournamentId,
    entries: [[e.g1AId, e.g1BId, e.g1CId, e.g1DId], [e.g2AId, e.g2BId, e.g2CId, e.g2DId], [e.g3AId, e.g3BId, e.g3CId, e.g3DId]]
  };
}

function mapToSelection(e) {
  const selection = {
    userId: e.userId,
    tournamentId: e.tournamentId,
    g1AId: e.entries[0][0],
    g1BId: e.entries[0][1],
    g1CId: e.entries[0][2],
    g1DId: e.entries[0][3],
    g2AId: e.entries[1][0],
    g2BId: e.entries[1][1],
    g2CId: e.entries[1][2],
    g2DId: e.entries[1][3],
    g3AId: e.entries[2][0],
    g3BId: e.entries[2][1],
    g3CId: e.entries[2][2],
    g3DId: e.entries[2][3],
  };

  if (e.id) {
    selection.id = e.id;
  }

  return selection;
}


// Creates a new Selection in the DB
module.exports.create = function(req, res) {
  const selection = mapToSelection(req.body);
  return Selection.create(selection)
    .then(respondWithMappedResult(res, 201))
    .catch(handleError(res));
}

// Updates the given Selection in the DB at the specified ID
module.exports.update = function(req, res) {
  const selection = mapToSelection(req.body);
  return Selection.update(selection, {
    where: {
      id: req.params.id
    }
  })
  .then(respondWithResult(res))
  .catch(handleError(res));
}



