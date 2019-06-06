'use strict';
const getValue = async () => {
    return 1;
};

// const getValue = () =>
//     new Promise(resolve => {
//         resolve(1);
//     });

const f = async () => {
    const value = await getValue();
    console.log(value);
};

f();

// (async () => {
//     const value = await getValue();
//     console.log(value);
// })();
