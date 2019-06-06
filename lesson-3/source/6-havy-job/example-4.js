const doNotSoHeavyJob = items => {
    let count = 0;

    for (let i = 0; i < items; i++) {
        if (
            Math.round(
                Math.log(Math.sqrt(Math.abs(Math.round(Math.random() * 1000))))
            ) === 1
        ) {
            count++;
        }
    }

    return count;
};

const doHeavyJob = cb => {
    const total = 1e8;
    const cuts = 100;
    let counts = 0;
    let remains = cuts;

    const doPerLoopIteration = () => {
        setImmediate(() => {
            counts = counts + doNotSoHeavyJob(total / cuts);
            remains--;

            if (!remains) {
                process.nextTick(() => {
                    cb(counts);
                });
            } else {
                doPerLoopIteration();
            }
        });
    };

    doPerLoopIteration();
};

setInterval(() => {
    console.log('Not blocked!');
}, 1000);

doHeavyJob(counts => {
    console.log(counts);
});
