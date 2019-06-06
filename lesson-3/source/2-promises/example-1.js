'use strict';

const promise = new Promise(function(resolve, reject) {
    console.log('Promise 1'); // 1) Promise

    setTimeout(() => {
        resolve(10);
    }, 2000);
});

promise.then(function(data) {
    console.log('Resolved ' + data); // 3) Resolved
});

console.log('Hi'); // 2) Hi
