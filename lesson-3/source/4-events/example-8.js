const EventEmitter = require('events').EventEmitter;

const storage = new EventEmitter();

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

    end() {
        storage.removeListener('data', this.onData);
    }
}

setInterval(() => {
    const data = new GetData();
    data.init();
    console.log(storage);
    data.end();
}, 200);
