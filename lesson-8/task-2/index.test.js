const { Bank } = require('./');

jest.mock('events');

describe('bank module:', () => {
  test('bank.register returns an id', () => {
    const bank = new Bank();
    bank.register = jest.fn(() => 12);

    const personId = bank.register({
      name: 'Pitter Black',
      balance: 100
    });

    expect(personId).toBe(12);
  });

  test('emit an error if customer already exist', () => {
    const bank = new Bank();

    expect(() => {
      bank.register({
        name: 'Pitter Black',
        balance: 100
      });

      bank.register({
        name: 'Pitter Black',
        balance: 10
      });
    }).toThrow(
      `duplicated customer for name: 'Pitter Black'`
    );
  });
});
