const EventEmitter = require('events').EventEmitter;

const loop = new EventEmitter();

// special event
loop.once('newListener', (event, listener) => {
    if (event === 'event') {
        // Insert a new listener in front
        loop.on('event', () => {
            console.log('First event handler');
        });
    }
});

loop.on('event', () => {
    console.log('Second event handler');
});

loop.on('event1', () => {
    console.log('Second event handler');
});

loop.emit('event');
// Prints:
//   First event handler
//   Second event handler
