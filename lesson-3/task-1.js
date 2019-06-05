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
    return this.clients.some(client => client.personId !== personId);
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

const personId = bank.register({
  name: 'Pitter Black',
  balance: 200
});

bank.emit('add', personId, 100);
bank.emit('get', personId, balance => {
  console.log(`I have ${balance}₴`);
});
bank.emit('withdraw', personId, 100);
bank.emit('get', personId, balance => {
  console.log(`I have ${balance}₴`);
});
