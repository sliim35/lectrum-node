'use strict';
const Async1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('First promise');
        resolve(1);
    }, 4000);
});

const Async2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Second promise');
        resolve(2);
    }, 1000);
});

Promise.all([Async1, Async2]).then(
    values => {
        console.log('Ok', values);
    },
    () => {
        console.log('Nope');
    }
);
