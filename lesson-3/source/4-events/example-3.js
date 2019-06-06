const EventEmitter = require('events').EventEmitter;

const storage = new EventEmitter();

storage.emit('error');
