const { Readable, Writable, Transform } = require('stream');

class Ui extends Readable {
  constructor(data = [], options = {}) {
    super(options);
    this._data = data;
    this.on('data', chunk => {});
    this.on('error', err => console.error(err));
  }
  _validateData(data) {
    data.forEach(({ payload }) => {
      if (
        payload.name === '' ||
        !payload.name ||
        payload.email === '' ||
        !payload.email ||
        (payload.password === '' && !payload.password)
      ) {
        this.emit('error', new Error('All fields must be filled'));
      }
      if (
        typeof payload.name !== 'string' ||
        typeof payload.email !== 'string' ||
        typeof payload.password !== 'string'
      ) {
        this.emit('error', new Error('All fields must be a String'));
      }
    });
  }

  _read() {
    this._validateData(this._data);
    let data = this._data.shift();
    if (!data) {
      this.push(null);
    } else {
      this.push(data);
    }
  }
}

class Decryptor extends Transform {
  constructor(options = {}) {
    super(options);
  }

  _decode(from, algorithm) {
    return Buffer.from(from, algorithm).toString('utf8');
  }

  _transform({ payload, meta }, encoding, done) {
    this.push({
      name: payload.name,
      email: this._decode(payload.email, meta.algorithm),
      password: this._decode(payload.password, meta.algorithm)
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
}

const customers = [
  {
    payload: {
      name: 'Pitter Black',
      email: '70626c61636b40656d61696c2e636f6d',
      password: '70626c61636b5f313233'
    },
    meta: {
      algorithm: 'hex'
    }
  }
];
const options = {
  objectMode: true
};

const ui = new Ui(customers, options);
const decryptor = new Decryptor(options);
const manager = new AccountManager(options);
ui.pipe(decryptor).pipe(manager);
