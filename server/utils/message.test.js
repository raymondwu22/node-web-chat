const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generageMessage', () => {
  it('should generate a message with the correct properties', () => {
    const msg = generateMessage('Bob', 'Hi, this is my message');

    expect(msg.from).toBe('Bob');
    expect(msg.text).toBe('Hi, this is my message');
    expect(typeof msg.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const locationMsg = generateLocationMessage('John', 100, 200);

    expect(locationMsg.from).toBe('John');
    expect(locationMsg.url).toBe('https://www.google.com/maps?q=100,200');
    expect(typeof locationMsg.createdAt).toBe('number');
  });
});
