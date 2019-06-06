'use strict';
const getValue = async () => {
    throw new Error('Something is wrong');
    return 1;
};

const f = async () => {
    try {
        const value = await getValue();
        console.log(value);
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
    }
};

f();
