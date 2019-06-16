const fs = require('fs');
const { pipeline } = require('stream');
const Json2csv = require('./json2csv');
const Archiver = require('./archiver');

const filterOptions = ['postId', 'name', 'body'];

const json2csv = new Json2csv(filterOptions);
const archiver = new Archiver();

const readFileInStream = fs.createReadStream('./comments.csv');
const writeFileInStream = fs.createWriteStream('./comments.csv.gz');

pipeline(readFileInStream, archiver.archive(), writeFileInStream, err => {
  if (err) {
    console.error('Pipeline failed.', err);
  } else {
    console.log('Pipeline succeeded.');
  }
});
