'use strict';
const EventEmitter = require('events').EventEmitter;

const loop = new EventEmitter();

loop.on('event1', function() {
    console.log(this); // EventEmitter { .... }
});

loop.on('event2', () => {
    console.log(this); // {}
});

loop.emit('event1');
console.log('\n=====================\n');
loop.emit('event2');
