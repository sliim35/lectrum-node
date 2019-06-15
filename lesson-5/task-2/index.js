const { pipeline } = require('stream');
const Ui = require('./ui');
const Guardian = require('./guardian');
const AccountManager = require('./accountManager');

const customers = [
  {
    name: 'Pitter Black',
    email: 'pblack@email.com',
    password: 'pblack_123'
  },
  {
    name: 'Oliver White',
    email: 'owhite@email.com',
    password: 'owhite_456'
  }
];

const uiOptions = {
  objectMode: true
};

const guardianOptions = {
  readableObjectMode: true,
  writableObjectMode: true,
  decodeStrings: false
};

const managerOptions = {
  objectMode: true
};

const ui = new Ui(customers, uiOptions);
const guardian = new Guardian(guardianOptions);
const accountManager = new AccountManager(managerOptions);

pipeline(ui, guardian, accountManager, err => {
  if (err) {
    console.error('Pipeline failed.', err);
  } else {
    console.log('Pipeline succeeded.');
  }
});
