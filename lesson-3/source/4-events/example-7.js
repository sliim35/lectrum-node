const EventEmitter = require('events').EventEmitter;

const storage = new EventEmitter();

class GetData {
    constructor() {
        this.bigData = new Array(1e6).join('*');

        storage.on('data', data => {
            this._send(data);
        });
    }

    _send(data) {
        console.log(data);
    }
}

setInterval(() => {
    const data = new GetData();
    console.log(process.memoryUsage().heapUsed);
    console.log(storage);
}, 200);
