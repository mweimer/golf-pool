/**
 * Tournament model events
 */

'use strict';

const {EventEmitter} = require('events');
const Tournament = require('../../sqldb').Tournament;
const TournamentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TournamentEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents (Tournament) {
  for (var e in events) {
    let event = events[e];
    Tournament.hook(e, emitEvent(event));
  }
}

function emitEvent (event) {
  return function (doc, options, done) {
    TournamentEvents.emit(`${event}:${doc.id}`, doc);
    TournamentEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Tournament);
export default TournamentEvents;
