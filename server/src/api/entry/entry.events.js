/**
 * Entry model events
 */

'use strict';

const {EventEmitter} = require('events');
const Entry = require('../../sqldb').Entry;
const EntryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EntryEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents (Entry) {
  for (var e in events) {
    let event = events[e];
    Entry.hook(e, emitEvent(event));
  }
}

function emitEvent (event) {
  return function (doc, options, done) {
    EntryEvents.emit(`${event}:${doc.id}`, doc);
    EntryEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Entry);
export default EntryEvents;
