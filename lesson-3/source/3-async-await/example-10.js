'use strict';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const getUsers = async () => {
    await delay(2000);
    console.log('finished users');
    return [
        {
            name: 'John',
        },
    ];
};

const getCustomers = async () => {
    await delay(2000);
    console.log('finished customers');
    return [
        {
            name: 'Alex',
        },
    ];
};

const list = async () => {
    const result = await Promise.all([getUsers(), getCustomers()]);

    // const users = result[0];
    // const customers = result[1];
    //
    const [users, customers] = result;

    const data = [...users, ...customers];
    console.log(data);
};

list();
