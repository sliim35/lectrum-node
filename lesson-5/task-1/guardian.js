const { Transform } = require('stream');
const { createCipheriv, scryptSync } = require('crypto');
const { validate, validateFields } = require('./helpers');

class Guardian extends Transform {
  constructor(options = {}) {
    super(options);
  }

  _transform(customer, encoding, done) {
    const { email, password } = customer;

    const encryptedCustomer = {
      payload: {
        ...customer,
        email: this._encrypt(email),
        password: this._encrypt(password)
      }
    };

    const data = {
      data: encryptedCustomer,
      name: Guardian.name,
      instance: this
    };

    validateFields(data);
    validate(data);

    this.push(encryptedCustomer);
    done();
  }

  _encrypt(str) {
    const algorithm = 'aes192';
    const password = '1qaZxsw2@3edcVfr4';
    const iv = Buffer.alloc(16, 0);
    const key = scryptSync(password, 'salt', 24);

    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(str, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }
}

module.exports = Guardian;
