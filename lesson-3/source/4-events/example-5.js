const EventEmitter = require('events').EventEmitter;

const storage = new EventEmitter();

storage.on('error', error => {
    if (error.name === 'TypeError') {
        console.error(
            `Received ${error.name} with a message: '${error.message}'`,
        );
    } else if (error.name === 'Error') {
        console.log('Do some stuff');
    }
});

storage.emit('error', new TypeError('we have a problem'));
