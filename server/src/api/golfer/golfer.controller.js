/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/golfers              ->  index
 * POST    /api/golfers              ->  create
 * GET     /api/golfers/:id          ->  show
 * PUT     /api/golfers/:id          ->  upsert
 * PATCH   /api/golfers/:id          ->  patch
 * DELETE  /api/golfers/:id          ->  destroy
 */

'use strict';

const jsonpatch = require('fast-json-patch');
const {Golfer} = require('../../sqldb');

function respondWithResult (res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates (patches) {
  return function (entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /* validate */ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity (res) {
  return function (entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
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

// Gets a list of Golfers
module.exports.index = function(req, res) {
  return Golfer.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Golfer from the DB
module.exports.show = function(req, res) {
  return Golfer.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Golfer in the DB
module.exports.create = function(req, res) {
  return Golfer.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Golfer in the DB at the specified ID
module.exports.upsert = function(req, res) {
  if (req.body.id) {
    Reflect.deleteProperty(req.body, 'id');
  }

  return Golfer.upsert(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Golfer in the DB
module.exports.patch = function(req, res) {
  if (req.body.id) {
    Reflect.deleteProperty(req.body, 'id');
  }
  return Golfer.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Golfer from the DB
module.exports.destroy = function(req, res) {
  return Golfer.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
