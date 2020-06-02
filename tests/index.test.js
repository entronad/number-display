const createDisplay = require('../lib');

describe('test', () => {
  it('default display', () => {
    const display = createDisplay({ allowText: true });

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
    expect(display(-123456789.123456789)).toBe('-123.457M')
    expect(display(123456)).toBe('123,456');
    expect(display(123.456)).toBe('123.456');
    expect(display('123.4')).toBe('123.4');
    expect(display('12345678.9')).toBe('12345679');

    expect(display('123.0')).toBe('123');
    expect(display(123.0)).toBe('123');
    expect(display('123.000')).toBe('123');
    expect(display(123.000)).toBe('123');
    expect(display(23.008)).toBe('23.008');
    expect(display(1234567.08)).toBe('1234567.1');
    expect(display(100000000000)).toBe('100G');

    expect(display(-1.2345e+5)).toBe('-123,450');
    expect(display(-1.23458e+5)).toBe('-123,458');

    expect(display('-1.2345e+5')).toBe('-1.2345e+');
    expect(display('NaN')).toBe('NaN');

    expect(display('.34')).toBe('0.34');
    expect(display(.34)).toBe('0.34');
    expect(display('-.34')).toBe('-0.34');
    expect(display(-.34)).toBe('-0.34');
  });

  it('rounding', () => {
    const displayRound = createDisplay({roundingType: 'round', decimal: 2});
    const displayFloor = createDisplay({roundingType: 'floor', decimal: 2});
    const displayCeil = createDisplay({roundingType: 'ceil', decimal: 2});

    expect(displayRound(23.008)).toBe('23.01');
    expect(displayFloor(23.008)).toBe('23');
    expect(displayCeil(23.001)).toBe('23.01');
    
    expect(displayRound(-123456789.123456789)).toBe('-123.457M');
    expect(displayFloor(-123456789.123456789)).toBe('-123.456M');
    expect(displayCeil(-123456189.123456789)).toBe('-123.457M');
  });

  it('placeholder allowText separator', () => {
    const display = createDisplay({
      separator: null,
      placeholder: '--'
    });

    expect(display(null)).toBe('--');
    expect(display(NaN)).toBe('--');

    expect(display('abcdefghijklmn')).toBe('--');

    expect(display(123456)).toBe('123456');

    const displayText = createDisplay({
      allowText: true,
      separator: null,
      placeholder: '--'
    });

    // special string for the regexp
    expect(display('')).toBe('--');
    expect(displayText('')).toBe('');
    expect(display('-')).toBe('--');
    expect(displayText('-')).toBe('-');
  });

  it('length decimal', () => {
    const display = createDisplay({
      length: 6,
      decimal: 10,
    });

    expect(display(123456)).toBe('123456');

    expect(display(1.2222)).toBe('1.2222');
    expect(display(-111.2222)).toBe('-111.2');

    expect(display(23.008)).toBe('23.008');

    const display1 = createDisplay({ length: 8 });
    expect(display1(-254623933.876)).toBe('-254.62M');
  });

  it('int', () => {
    const display = createDisplay({
      length: 6,
      decimal: 0,
    });

    expect(display(1234.8)).toBe('1,235');
    expect(display(123456.8)).toBe('123457');
  });

  it('length too short', () => {
    const display = createDisplay({
      length: 3,
      placeholder: 'abcdefg'
    });

    expect(display(null)).toBe('abc');

    expect(display(-123456)).toBe('-123456');
  });

  it('float precision', () => {
    const display = createDisplay({
      length: 30,
      decimal: 30,
      separator: null,
    });

    expect(display(0.1 + 0.2)).toBe('0.3');
    expect(display(0.9999999999999)).toBe('1');
    expect(display('12345678.12345678')).toBe('12345678.1235');
    expect(display('44444444444444')).toBe('44444444444400');
  });

  it('seporator', () => {
    const display = createDisplay({
      length: 30,
      decimal: 30,
      separator: '_',
    });

    expect(display('12345678')).toBe('12_345_678');

    const display2 = createDisplay({
      length: 30,
      decimal: 30,
      separator: '___',
    });

    expect(display2('12345678')).toBe('12_345_678');
  });

  it('units', () => {
    const display = createDisplay({
      length: 8,
      units: null,
    });

    expect(display(-254623933.876)).toBe('-254.62M');

    const display1 = createDisplay({
      length: 8,
      units: [],
    });
    
    expect(display1(-254623933.876)).toBe('-254.62M');

    const display2 = createDisplay({
      length: 8,
      units: ['S', 'S'],
    });
    
    expect(display2(-254623933.876)).toBe('-254.62S');
  });

  it('locale', () => {
    const display = createDisplay({
      length: 12,
      separator: '.',
      decimalPoint: ',',
    });

    expect(display(4623933.8)).toBe('4.623.933,8');
  });
});
