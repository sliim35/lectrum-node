const fs = require('fs');

class Json2csv {
  constructor(options) {
    this.filterOptions = options;
    this.init();
  }

  init() {
    fs.readFile('../data/comments.json', (err, data) => {
      if (err) throw err;

      const convertedData = JSON.parse(data.toString());
      let csvString;
      let tableHeader;

      if (this.filterOptions && this.filterOptions.length > 0) {
        const filteredData = this._filter(convertedData);
        tableHeader = this._convertToCsvTableHeader(filteredData);
        csvString = this._convertToCsv(filteredData);
      } else {
        tableHeader = this._convertToCsvTableHeader(convertedData);
        csvString = this._convertToCsv(convertedData);
      }

      const resultCsvTable = `${tableHeader}\n${csvString}`;

      fs.writeFileSync('./comments.csv', resultCsvTable);
    });
  }

  _convertToCsv(data) {
    const csvString = data.reduce((acc, item) => {
      Object.keys(item).forEach(key => (acc += `${item[key]};`));
      acc += '\n';
      return acc;
    }, '');

    return csvString;
  }

  _convertToCsvTableHeader([firstItem]) {
    let tableHeader = '';

    Object.keys(firstItem).forEach(key => (tableHeader += `${key};`));

    return tableHeader;
  }

  _filter(data) {
    const filteredData = data.map(item => {
      let resultObject;
      this.filterOptions.forEach(option => {
        if (option in item) {
          resultObject = {
            ...resultObject,
            [option]: item[option]
          };
        }
      });

      return resultObject;
    });

    return filteredData;
  }
}

module.exports = Json2csv;
