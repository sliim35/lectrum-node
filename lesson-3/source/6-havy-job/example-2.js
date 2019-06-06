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

const doHeavyJob = () => {
    const total = 1e8;
    const cuts = 100;
    let counts = 0;

    for (let i = 0; i < cuts; i++) {
        counts = counts + doNotSoHeavyJob(total / cuts);
    }

    return counts;
};

setInterval(() => {
    console.log('Not blocked!');
}, 1000);

console.log(doHeavyJob());
