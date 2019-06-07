const { Readable, Writable, Transform } = require('stream');

class Ui extends Readable {
  constructor(data = [], options = {}) {
    super(options);
    this._data = data;
    this.on('data', chunk => {});
  }
  _read() {
    let data = this._data.shift();
    if (!data) {
      this.push(null);
    } else {
      this.push(data);
    }
  }
}

class Guardian extends Transform {
  constructor(options = {}) {
    super(options);
  }

  _protect(data) {
    return Buffer.from(data).toString('hex');
  }

  _transform(chunk, encoding, done) {
    const hexEmail = this._protect(chunk.email);
    const hexPassword = this._protect(chunk.password);
    this.push({
      ...chunk,
      email: hexEmail,
      password: hexPassword
    });
    done();
  }
}

class AccountManager extends Writable {
  constructor(options = {}) {
    super(options);
    this.data = [];
  }

  _write(chunk, encoding, done) {
    this.data.push(chunk);
    done();
  }

  show() {
    this.on('finish', () => console.log(this.data));
  }
}

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
const options = {
  objectMode: true
};

const ui = new Ui(customers, options);
const guardian = new Guardian(options);
const manager = new AccountManager(options);

ui.pipe(guardian).pipe(manager);
manager.show();