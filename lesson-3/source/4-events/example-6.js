class GetData {
    constructor() {
        this.bigData = new Array(1e6).join('*');
    }

    onError() {
        this._send('we have a problem');
    }

    _send(data) {
        console.log(data);
    }
}

setInterval(() => {
    const data = new GetData();
    console.log(process.memoryUsage().heapUsed);
}, 200);

// --trace_gc --trace_gc_verbose
