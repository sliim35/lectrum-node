'use strict';
function Async() {
    const promise = new Promise(function(resolve, reject) {
        console.log('Promise init'); // 1) Promise init

        setTimeout(function() {
            console.log('resolving...'); // 3) resolving...
            resolve();
        }, 2000);
    });
    return promise;
}

const promise = Async();
promise
    .then(function() {
        console.log('Step 1'); // 4) Step 1
        return 777;
    })
    .then(function(value) {
        console.log('Step 2'); // 5) Step 2
        console.log(value); // 6) 777
    })
    .then(function(value) {
        console.log(value); // undefined
        return new Promise(resolve => resolve(5));
    })
    .then(function(value) {
        console.log('Step 4');
        console.log(value);
    });

console.log('Next step'); // 2) Next step
