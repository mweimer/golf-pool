/**
 * Selection model events
 */

'use strict';

const {EventEmitter} = require('events');
const Selection = require('../../sqldb').Selection;
const SelectionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SelectionEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents (Selection) {
  for (var e in events) {
    let event = events[e];
    Selection.hook(e, emitEvent(event));
  }
}

function emitEvent (event) {
  return function (doc, options, done) {
    SelectionEvents.emit(`${event}:${doc.id}`, doc);
    SelectionEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Selection);
export default SelectionEvents;
