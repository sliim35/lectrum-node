const doHeavyJob = () => {
    let count = 0;

    for (let i = 0; i < 1e8; i++) {
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

setInterval(() => {
    console.log('Not blocked!');
}, 1000);

console.log(doHeavyJob());
