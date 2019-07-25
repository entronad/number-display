const createDisplay = require('..');

describe('test', () => {
  it('default display', () => {
    const display = createDisplay();

    expect(display(null)).toBe('');
    expect(display(undefined)).toBe('');
    expect(display(NaN)).toBe('');
    expect(display(Infinity)).toBe('');
    expect(display(-Infinity)).toBe('');
    expect(display(true)).toBe('');
    expect(display([])).toBe('');
    expect(display([1.1])).toBe('');
    expect(display({})).toBe('');
    expect(display(new Date())).toBe('');

    expect(display('abcdefghijklmn')).toBe('abcdefghi');
    expect(display('--12.34')).toBe('--12.34');
    expect(display('12..34')).toBe('12..34');

    expect(display(-123456789.123456789)).toBe(display('-123456789.123456789'));
    expect(display(-123456789.123456789)).toBe('-123.456M')
    expect(display(123456)).toBe('123,456');
    expect(display(123.456)).toBe('123.45');
    expect(display('123.4')).toBe('123.4');
    expect(display('12345678.9')).toBe('12345678');
    expect(display('123.0')).toBe('123.0');
    expect(display('123.000')).toBe('123.00');
    expect(display(-1.2345e+5)).toBe('-123,450');

    expect(display('-1.2345e+5')).toBe('-1.2345e+');
    expect(display('NaN')).toBe('NaN');
  });

  it('placeholder allowText comma', () => {
    const display = createDisplay({
      allowText: false,
      comma: false,
      placeholder: '--'
    });

    expect(display(null)).toBe('--');
    expect(display(NaN)).toBe('--');

    expect(display('abcdefghijklmn')).toBe('--');

    expect(display(123456)).toBe('123456');
  });

  it('length decimal', () => {
    const display = createDisplay({
      length: 6,
      decimal: 10,
    });

    expect(display(123456)).toBe('123456');

    expect(display(1.2222)).toBe('1.2222');
    expect(display(-111.2222)).toBe('-111.2');

    const display1 = createDisplay({ length: 8 });
    expect(display1(-254623933.876)).toBe('-254.62M');
  });

  it('int', () => {
    const display = createDisplay({
      length: 6,
      decimal: 0,
    });

    expect(display(1234.0)).toBe('1,234');
    expect(display(123456.0)).toBe('123456');
  });

  it('length too short', () => {
    const display = createDisplay({
      length: 3,
      placeholder: 'abcdefg'
    });

    expect(display(null)).toBe('abc');

    expect(() => display(-123456)).toThrowError('length: 3 is too small');
  });
});
