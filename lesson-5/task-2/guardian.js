const { Transform } = require('stream');
const { createCipheriv, scryptSync, createSign } = require('crypto');
const { validate, validateFields } = require('./helpers');

class Guardian extends Transform {
  constructor(options = {}) {
    super(options);
  }

  _transform(customer, encoding, done) {
    const {
      payload: { email, password },
      payload,
      meta
    } = customer;

    const encryptedCustomer = {
      payload: {
        ...payload,
        email: this._encrypt(email),
        password: this._encrypt(password)
      },
      meta: {
        ...meta,
        signature: this._createSign()
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

  _createSign() {
    const privateKey = `-----BEGIN RSA PRIVATE KEY-----
    MIICXgIBAAKBgQC9rifeKgLIcnkH2PF15YDqzgsatgppdXyj/TLuwiQPlRQDTXnz
    SeffyGDhL2fkvpTo2A5PbUWtaV5WHGwR2zTDU0qsJCauyvlAx1Cv6SA6gfE0HEAx
    aXAmRKoZGjWyNM0nQVDzikvcL9xqvIKwiBL0P21DPT1VSCWusD1ayx2gjwIDAQAB
    AoGBAJb6eadfnyl33Jh/eOrTzAKaEMKpJa59osFRN+pNw7BXhD+AutIJALTiZSK4
    viSYAiU4XGOiYbS/SySVqPuplNuJatzq+EopQQBpS7qasw5p6r/vZ/Sw4OchBGUa
    LhSJOefov085fNIQyaM68xGgDFmoLMYpQUqWxF91+Ompy4LZAkEA5Vutn3jNyz9T
    FF9o6xX6gKiJYO5N5XLpjMBJyWVxSrhUPesbpKedbXzhseZvgQmOjkCRHO99ejsx
    sS1YpUMsywJBANO2mHPrR+0gRC/5p6iEw+x9baCq8dsrCfSgW84OmZOnMeHHxJE/
    OzQITyoTaQru8n2hAwf68jieuuDXHNESBs0CQQClsvUdeBYdV1N7LW7MICXJG3mc
    mK2YLcvDDwx/vpT5qW/bB+cBrsKSXh1j/BnkfHYMGWN9Jxxc2TUOTrdzNbO/AkAM
    hWwWzv9+Ar6Fp9pGmTONNQ3axsFvGOiJ00IaubpThTvqAoqZnIe/2A32ixdXUjJ9
    Q5yOSEUzHBApZA+MPeixAkEAjdZKq6ADXvoi2WOM4xRskwwGqLkSX4OPnIWHZs34
    +/fsfs1sfAWek6aWyaWtO/LAM6NYH1jLwlGgCofnpDt14Q==
    -----END RSA PRIVATE KEY-----`;
    const sign = createSign('SHA256');
    sign.update('Data is protected.');
    console.log('updated');
    sign.end();
    console.log('ended');
    const signature = sign.sign(privateKey);

    return signature;
  }
}

module.exports = Guardian;
