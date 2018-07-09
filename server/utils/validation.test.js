const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const test = isRealString();

    expect(test).toBe(false);
  });

  it('should reject string with only spaces', () => {
    const test = isRealString('            ');

    expect(test).toBe(false);
  });

  it('should accept string', () => {
    const test = isRealString('Test');

    expect(test).toBe(true);
  });
});
