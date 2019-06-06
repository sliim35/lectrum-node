const EventEmitter = require('events').EventEmitter;

const storage = new EventEmitter();

storage.setMaxListeners(0);
// storage.setMaxListeners(Number.MAX_SAFE_INTEGER);

class GetData {
    constructor() {
        this.bigData = new Array(1e6).join('*');
    }

    init() {
        storage.on('data', this.onData);
    }

    onData(data) {
        this._send(data);
    }

    _send(data) {
        console.log(data);
    }
}

setInterval(() => {
    const data = new GetData();
    data.init();
    console.log(process.memoryUsage().heapUsed);
}, 200);
