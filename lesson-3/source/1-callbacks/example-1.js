const fs = require('fs');

const convertFileToArray = (file, cb) => {
    fs.readFile(file, (error, data) => {
        if (error) {
            return cb(error);
        }

        const lines = data
            .toString()
            .trim()
            .split('\n');
        cb(null, lines);
    });
};

convertFileToArray(__filename, (error, lines) => {
    if (error) throw error;

    console.log(`Number of file lines: ${lines.length}`);
});
