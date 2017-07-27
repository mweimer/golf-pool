/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tournaments              ->  index
 * POST    /api/tournaments              ->  create
 * GET     /api/tournaments/:id          ->  show
 * PUT     /api/tournaments/:id          ->  upsert
 * PATCH   /api/tournaments/:id          ->  patch
 * DELETE  /api/tournaments/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';

import {Tournament} from '../../sqldb';

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

// Gets a list of Tournaments
export function index (req, res) {
  return Tournament.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Tournament from the DB
export function show (req, res) {
    return Tournament.find({
    where: {
      id: req.params.id
    }
   // include: [{ all: true }]
    })
    .then(handleEntityNotFound(res))
   // .then(getGolfers(req.params.id))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Tournament in the DB
export function create (req, res) {
  return Tournament.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Tournament in the DB at the specified ID
export function upsert (req, res) {
  if (req.body.id) {
    Reflect.deleteProperty(req.body, 'id');
  }

  return Tournament.upsert(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Tournament in the DB
export function patch (req, res) {
  if (req.body.id) {
    Reflect.deleteProperty(req.body, 'id');
  }
  return Tournament.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Tournament from the DB
export function destroy (req, res) {
  return Tournament.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
