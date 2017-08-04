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

import jsonpatch from 'fast-json-patch';
import {Entry} from '../../sqldb';

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

function mapEntry(e) {
  return {
    id: e.id,
    userId: e.userId,
    tournamentId: e.tournamentId,
    golferIds: [[e.g1AId, e.g1BId, e.g1CId, e.g1DId], [e.g2AId, e.g2BId, e.g2CId, e.g2DId], [e.g3AId, e.g3BId, e.g3CId, e.g3DId]]
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
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Entry in the DB
export function create (req, res) {
  return Entry.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Entry in the DB at the specified ID
export function update (req, res) {

  return Entry.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Entry in the DB
export function patch (req, res) {
  if (req.body.id) {
    Reflect.deleteProperty(req.body, 'id');
  }
  return Entry.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Entry from the DB
export function destroy (req, res) {
  return Entry.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
