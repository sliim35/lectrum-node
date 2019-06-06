const fs = require('fs');

// anti-pattern
// this is a callback hell
fs.readFile(__filename, (error, file) => {
    if (error) throw error;

    fs.writeFile(
        './tmp/example-copy.js',
        Buffer.concat([file, file]),
        error => {
            if (error) throw error;

            fs.readFile('./tmp/example-copy.js', (error, file) => {
                if (error) throw error;

                fs.writeFile('./tmp/example-copy-copy.js', file, error => {
                    if (error) throw error;

                    fs.readFile('./tmp/example-copy-copy.js', (error, file) => {
                        if (error) throw error;

                        console.log('all done');
                    });
                });
            });
        }
    );
});
const fs = require('fs');

// anti-pattern
// this is a callback hell
fs.readFile(__filename, (error, file) => {
    if (error) throw error;

    fs.writeFile(
        './tmp/example-copy.js',
        Buffer.concat([file, file]),
        error => {
            if (error) throw error;

            fs.readFile('./tmp/example-copy.js', (error, file) => {
                if (error) throw error;

                fs.writeFile('./tmp/example-copy-copy.js', file, error => {
                    if (error) throw error;

                    fs.readFile('./tmp/example-copy-copy.js', (error, file) => {
                        if (error) throw error;

                        console.log('all done');
                    });
                });
            });
        }
    );
});
