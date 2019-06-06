const EventEmitter = require('events').EventEmitter;

const storage = new EventEmitter();
const eventName = 'data';

storage.on(eventName, data => {
    if (data.age >= 21) {
        data.valid = true;
    }
});

storage.on(eventName, data => {
    console.log(data);
});

const listeners = storage.listeners('data');

console.log(listeners);

console.log(
    `Number of listeners for the '${eventName}' event is ${listeners.length}`
);
