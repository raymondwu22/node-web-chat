const expect = require('expect');
const { generateMessage } = require('./message');

describe('generageMessage', () => {
  it('should generate a message with the correct properties', () => {
    const msg = generateMessage('Bob', 'Hi, this is my message');

    expect(msg.from).toBe('Bob');
    expect(msg.text).toBe('Hi, this is my message');
    expect(typeof msg.createdAt).toBe('number');
  });
});
