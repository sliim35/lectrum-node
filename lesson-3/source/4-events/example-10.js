const EventEmitter = require('events').EventEmitter;

const loop = new EventEmitter();

loop.on('event1', () => {
    console.log('event1 fired');
    loop.emit('event2');
});

loop.on('event2', () => {
    console.log('event2 fired');
    loop.emit('event3');
});

loop.on('event3', () => {
    console.log('event3 fired');
    loop.emit('event1');
});

loop.emit('event1'); // will cause RangeError after some amount of time.
