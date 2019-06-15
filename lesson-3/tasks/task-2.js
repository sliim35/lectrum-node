const EventEmmiter = require('events');

class Bank extends EventEmmiter {
  constructor() {
    super();

    this.clients = [];

    this.on('add', (...args) => {
      const [id, sum] = args;
      if (this._clientNotExist(id))
        return this.emit('error', new Error('Client does not exist'));
      if (sum < 0 || sum === 0)
        return this.emit(
          'error',
          new Error(`Income: ${sum} must be higher than 0`)
        );
      const res = this.clients.map(client => {
        if (client.personId === id)
          return {
            ...client,
            balance: client.balance + sum
          };
        return client;
      });
      this.clients = res;
    });

    this.on('get', (personId, cb) => {
      if (this._clientNotExist(personId))
        return this.emit('error', new Error('Client does not exist'));
      const { balance } = this.clients.find(
        client => client.personId === personId
      );
      cb(balance);
    });

    this.on('send', (personFirstId, personSecondId, sum) => {
      console.log(this.clients);
      if (this._clientNotExist(personFirstId)) {
        return this.emit(
          'error',
          new Error(`Client with id: ${personFirstId} does not exist`)
        );
      }
      if (this._clientNotExist(personSecondId)) {
        return this.emit(
          'error',
          new Error(`Client with id: ${personSecondId} does not exist`)
        );
      }
      if (sum <= 0) {
        return this.emit(
          'error',
          new Error(`Amount of remittance: ${sum} must be > 0`)
        );
      }

      this.clients = this.clients.map(client => {
        if (client.personId === personFirstId) {
          return {
            ...client,
            balance: client.balance - sum
          };
        }
        if (client.personId === personSecondId) {
          return {
            ...client,
            balance: client.balance + sum
          };
        }
        return client;
      });
    });

    this.on('withdraw', (personId, sum) => {
      if (this._clientNotExist(personId))
        return this.emit('error', new Error('Client does not exist'));
      if (this._checkForNegativeBalance(personId, sum))
        return this.emit(
          'error',
          new Error('Sum to withdraw higher than balance')
        );
      if (sum < 0)
        return this.emit(
          'error',
          new Error(`Sum: ${sum} must be higher than 0`)
        );
      const res = this.clients.map(client => {
        if (client.personId === personId) {
          return {
            ...client,
            balance: client.balance - sum
          };
        }
        return client;
      });
      this.clients = res;
    });

    this.on('error', error => {
      console.error(error);
    });
  }

  _theSameName(personName) {
    return this.clients.some(client => client.name === personName);
  }

  _checkForNegativeBalance(personId, sum) {
    const client = this.clients.find(client => client.personId === personId);
    if (client.balance - sum < 0) return true;
    return false;
  }

  _clientNotExist(personId) {
    const res = this.clients.some(client => client.personId === personId);
    console.log(res);
  }

  register(person) {
    if (this._theSameName(person.name))
      return this.emit('error', new Error(`${person.name} already exist`));
    if (person.balance <= 0)
      return this.emit(
        'error',
        new Error(`Income: ${person.balance} must be higher than 0`)
      );
    const personId = Math.floor(Math.random() * Math.floor(10));
    this.clients.push({ ...person, personId });
    return personId;
  }
}

const bank = new Bank();
const personFirstId = bank.register({
  name: 'Pitter Black',
  balance: 100
});
const personSecondId = bank.register({
  name: 'Oliver White',
  balance: 700
});

bank.emit('send', personFirstId, personSecondId, 50);
bank.emit('get', personSecondId, balance => {
  console.log(`I have ${balance}₴`); // I have 750₴
});
bank.emit('get', personFirstId, balance => {
  console.log(`I have ${balance}₴`); // I have 50₴
});
