const EventEmitter = require('events');
const fs = require('fs');

class FileReader extends EventEmitter {
    execute(func, ...args) {
        console.time('execute');
        this.emit('start');
        func(...args, (err, data) => {
            if (err) {
                return this.emit('error', err);
            }

            this.emit('data', data);
            console.timeEnd('execute');
            this.emit('end');
        });
    }
}

const reader = new FileReader();

reader.on('start', () => console.log('start execution'));
reader.on('end', () => console.log('end execution'));
reader.on('data', data => {
    console.log(data.toString());
});

reader.execute(fs.readFile, __filename);
