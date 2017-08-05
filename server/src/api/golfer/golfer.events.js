/**
 * Golfer model events
 */

'use strict';

const {EventEmitter} = require('events');
const Golfer = require('../../sqldb').Golfer;
const GolferEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GolferEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents (Golfer) {
  for (var e in events) {
    let event = events[e];
    Golfer.hook(e, emitEvent(event));
  }
}

function emitEvent (event) {
  return function (doc, options, done) {
    GolferEvents.emit(`${event}:${doc.id}`, doc);
    GolferEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Golfer);
export default GolferEvents;
