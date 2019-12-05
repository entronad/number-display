const createDisplay = require('..');

describe('test', () => {
  it('rounding function', () => {
    const maxDoubleLength = 16;
    const rounding = (intStr, decimalStr, decimalLength, type) => {
      if (decimalStr.length <= decimalLength) {
        return [intStr || '', decimalStr || ''];
      }
      if (intStr.length + decimalLength > maxDoubleLength) {
        return [intStr || '', (decimalStr || '').slice(0, decimalLength)];
      }
      decimalLength = Math.max(decimalLength, 0);
      const handler = type === 'ceil' ? Math.ceil : (type === 'floor' ? Math.floor : Math.round);
      const rstStrs =
        String(handler(`${intStr}.${decimalStr}e${decimalLength}`) / Math.pow(10, decimalLength)).split('.');
      return [rstStrs[0] || '', rstStrs[1] || ''];
    }

    expect(rounding('123', '456', 2, 'round')).toStrictEqual(['123', '46']);
    expect(rounding('123', '756', 0, 'round')).toStrictEqual(['124', '']);
    expect(rounding('123', '456', 2)).toStrictEqual(['123', '46']);
    expect(rounding('123', '456', 5)).toStrictEqual(['123', '456']);
    expect(rounding('123', '9999', 3)).toStrictEqual(['124', '']);
    expect(rounding('123', '001', 2)).toStrictEqual(['123', '']);
    expect(rounding('123', '005', 2)).toStrictEqual(['123', '01']);

    expect(rounding('123', '9999', 3, 'floor')).toStrictEqual(['123', '999']);
    expect(rounding('123', '9999', 0, 'floor')).toStrictEqual(['123', '']);
    expect(rounding('123', '005', 2, 'floor')).toStrictEqual(['123', '']);

    expect(rounding('123', '4501', 2, 'ceil')).toStrictEqual(['123', '46']);
    expect(rounding('123', '4511', 2, 'ceil')).toStrictEqual(['123', '46']);
    expect(rounding('123', '45', 2, 'ceil')).toStrictEqual(['123', '45']);
    expect(rounding('123', '01', 0, 'ceil')).toStrictEqual(['124', '']);

    expect(rounding('123', '756', -1, 'round')).toStrictEqual(['124', '']);
    expect(rounding('123', '9999', -10, 'floor')).toStrictEqual(['123', '']);
  });

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
    const displayRound = createDisplay({roundingType: 'round', precision: 2});
    const displayFloor = createDisplay({roundingType: 'floor', precision: 2});
    const displayCeil = createDisplay({roundingType: 'ceil', precision: 2});

    expect(displayRound(23.008)).toBe('23.01');
    expect(displayFloor(23.008)).toBe('23');
    expect(displayCeil(23.001)).toBe('23.01');
    
    expect(displayRound(-123456789.123456789)).toBe('-123.457M');
    expect(displayFloor(-123456789.123456789)).toBe('-123.456M');
    expect(displayCeil(-123456189.123456789)).toBe('-123.457M');
  });

  it('placeholder allowText separator', () => {
    const display = createDisplay({
      allowText: false,
      separator: false,
      placeholder: '--'
    });

    expect(display(null)).toBe('--');
    expect(display(NaN)).toBe('--');

    expect(display('abcdefghijklmn')).toBe('--');

    expect(display(123456)).toBe('123456');

    const displayText = createDisplay({
      allowText: true,
      separator: false,
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
      precision: 10,
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
      precision: 0,
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
});
