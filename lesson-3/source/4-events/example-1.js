// const EventEmitter = require('events');
const EventEmitter = require('events').EventEmitter;

const storage = new EventEmitter();

storage.on('data', data => {
    if (data.age >= 21) {
        data.valid = true;
    }
});

storage.on('data', data => {
    console.log(data);
});

storage.emit('data', { name: 'John', age: 18 });
storage.emit('data', { name: 'Joe', age: 21 });

// storage.emit(Symbol('data'), { name: 'John', age: 18 });
