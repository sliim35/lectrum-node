const fs = require('fs');

const convertFileToArray = (file, cb = () => {}) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (error, data) => {
            if (error) {
                reject(error);
                return cb(error);
            }

            const lines = data
                .toString()
                .trim()
                .split('\n');

            resolve(lines);
            cb(null, lines);
        });
    });
};

// Promises
convertFileToArray(__filename)
    .then(lines => {
        console.log(`Number of file lines from promise: ${lines.length}`);
    })
    .catch(error => {
        console.error(error);
    });

// Callbacks
convertFileToArray(__filename, (error, lines) => {
    if (error) throw error;

    console.log(`Number of file lines from callback: ${lines.length}`);
});
