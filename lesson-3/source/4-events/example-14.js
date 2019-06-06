const EventEmitter = require('events').EventEmitter;

const loop = new EventEmitter();

loop.once('event', data => {
    console.log(data);
});

loop.on('event', data => {
    console.log(data);
});

loop.emit('event', 1);
console.log('\n=====================\n');
loop.emit('event', 2);
// Prints:
//   1
//   1

//   =====================
//   2
