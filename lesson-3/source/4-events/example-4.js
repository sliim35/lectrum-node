const EventEmitter = require('events').EventEmitter;

const storage = new EventEmitter();

storage.emit('error', new TypeError('we have a problem'));
