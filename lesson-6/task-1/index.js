const fs = require('fs');
const path = require('path');

class Json2csv {
  constructor(pathToFile) {
    this.pathToFile = pathToFile;
    this.output = '';
    this.init();
  }

  init() {
    this._convertToCsv();
  }

  _convertToCsv() {
    fs.readFile(path.join(__dirname, this.pathToFile), (err, data) => {
      if (err) throw err;

      const convertedData = JSON.parse(data.toString());
      const [firstItem] = convertedData;
      let tableHeader = '';
      const keys = Object.keys(firstItem);
      keys.forEach(key => (tableHeader += `${key};`));

      const csvString = convertedData.reduce((acc, item) => {
        let str = `${item.postId};${item.id};${item.name};${item.email};${item.body};\n`;
        acc += str;
        return acc;
      }, '');

      const resultCsvTable = `${tableHeader}\n${csvString}`;

      fs.writeFileSync('./comments.csv', resultCsvTable);
    });
  }
}

const json2csv = new Json2csv('../data/comments.json');
json2csv.init();
