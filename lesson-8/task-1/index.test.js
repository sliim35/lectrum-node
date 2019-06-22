const { validate, validateFields } = require('./');

describe('validate function:', () => {
  test('throw error if payload !== object', () => {
    const data = {
      payload: 'String!'
    };
    const name = 'Test name';

    expect(() => validate({ data, name })).toThrow(
      `${name}: payload should be an object`
    );
  });

  test('throw error if field name is required', () => {
    const data = {
      payload: {}
    };
    const name = '';

    expect(() => validate({ data, name })).toThrow(
      `${name}: payload should have required field name`
    );
  });

  test('throw error if payload.name should not be empty', () => {
    const data = {
      payload: {
        name: ''
      }
    };
    const name = '';

    expect(() => validate({ data, name })).toThrow(
      `${name}: payload.name should not be empty`
    );
  });

  test('throw error if payload.name should should be a string', () => {
    const data = {
      payload: {
        name: {}
      }
    };
    const name = '';

    expect(() => validate({ data, name })).toThrow(
      `${name}: payload.name should should be a string`
    );
  });

  test('throw error if payload should have required field email', () => {
    const data = {
      payload: {
        name: 'dsdas'
      }
    };
    const name = '';

    expect(() => validate({ data, name })).toThrow(
      `${name}: payload should have required field email`
    );
  });

  test('payload.email should not be empty', () => {
    const data = {
      payload: {
        name: 'dsdas',
        email: ''
      }
    };
    const name = '';

    expect(() => validate({ data, name })).toThrow(
      `${name}: payload.email should not be empty`
    );
  });

  test('throw error if payload.email should should be a string', () => {
    const data = {
      payload: {
        name: 'dsdas',
        email: {}
      }
    };
    const name = '';

    expect(() => validate({ data, name })).toThrow(
      `${name}: payload.email should should be a string`
    );
  });

  test('throw error if payload should have required field password', () => {
    const data = {
      payload: {
        name: 'dsdas',
        email: '2332'
      }
    };
    const name = '';

    expect(() => validate({ data, name })).toThrow(
      `${name}: payload should have required field password`
    );
  });

  test('throw error if payload.password should not be empty', () => {
    const data = {
      payload: {
        name: 'dsdas',
        email: '2332',
        password: ''
      }
    };
    const name = '';

    expect(() => validate({ data, name })).toThrow(
      `${name}: payload.password should not be empty`
    );
  });

  test('throw error if payload.password should should be a string', () => {
    const data = {
      payload: {
        name: 'dsdas',
        email: '2332',
        password: {}
      }
    };
    const name = '';

    expect(() => validate({ data, name })).toThrow(
      `${name}: payload.password should should be a string`
    );
  });
});

describe('validateFields function:', () => {
  test('throw error if data contains not allowed field', () => {
    const data = {
      dasdasdas: 'String!'
    };
    const name = 'Test name';

    expect(() => validateFields({ data, name })).toThrow(
      `${name}: data contains not allowed field — dasdasdas`
    );
  });

  test('throw error if data contains not allowed nested field', () => {
    const data = {
      test: {
        test: 'dsds'
      }
    };
    const name = 'Test name';

    expect(() => validateFields({ data, name })).toThrow(
      `${name}: data contains not allowed field — test`
    );
  });

  test('working without error if data has nested allowed fields', () => {
    const data = {
      name: {
        name: 'dsds'
      }
    };
    const name = 'Test name';

    expect(() =>
      validateFields({ data, name })
    ).not.toThrow(
      `${name}: data contains not allowed field — test`
    );
  });
});
