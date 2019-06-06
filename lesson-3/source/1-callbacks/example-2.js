const fs = require('fs');

const convertFileToArray = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (error, data) => {
            if (error) {
                return reject(error);
            }

            const lines = data
                .toString()
                .trim()
                .split('\n');
            resolve(lines);
        });
    });
};

// __dirname
convertFileToArray(__filename)
    .then(lines => {
        console.log(`Number of file lines: ${lines.length}`);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        console.log('Done!');
    });
