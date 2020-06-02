const maxPrecision = 12;

const rounding = (intStr, decimalStr, decimalLength, type) => {
  if (decimalStr.length <= decimalLength) {
    return [intStr || '', decimalStr || ''];
  }
  decimalLength = Math.max(Math.min(decimalLength, maxPrecision - intStr.length), 0);
  const handler = type === 'ceil' ? Math.ceil : (type === 'floor' ? Math.floor : Math.round);
  const rstStrs =
    String(handler(`${intStr}.${decimalStr}e${decimalLength}`) / Math.pow(10, decimalLength)).split('.');
  return [rstStrs[0] || '', rstStrs[1] || ''];
}

/**
 * Create a display function with configs. The function returned converts the value.
 * 
 * @param {number} [length] max display char length (better >= 5 to allow any number); default 9
 * @param {number} [decimal] max decimal precision; default equals length
 * @param {string} [placeholder] result when neither number nor text; default ''
 * @param {boolean} [allowText] allow text as results, if false text will convert to placeholder, text will be slice within length param; default false
 * @param {string} [separator] set separators between digits in group of 3, if there are rooms; default is ','
 * @param {string} [decimalPoint] set decimal point; default is '.'
 * @param {string} [roundingType] rounding type of decimals, enum in 'round', 'floor' or 'ceil'; default 'round'
 * @param {Array<string>} [units] digital units, default is ['k', 'M', 'G', 'T', 'P']
 * 
 * @returns The display function.
 */
const createDisplay = ({
  length = 9,
  decimal,
  placeholder = '',
  allowText = false,
  separator = ',',
  decimalPoint = '.',
  roundingType = 'round',
  units = ['k', 'M', 'G', 'T', 'P'],
} = {}) => value => {
  if (decimal == null) {
    decimal = length;
  }
  placeholder = placeholder.slice(0, length);
  const type = typeof value;

  if (
    (type !== 'number' && type !== 'string')
    || (type === 'number' && !Number.isFinite(value))
  ) {
    return placeholder;
  }

  value = String(value);
  let cells = value.match(/^(-?)(\d*)(\.(\d+))?$/);

  if (!cells || value === '' || value === '-') {
    return allowText ? value.slice(0, length) : placeholder;
  }

  preciseValue = String(parseFloat(parseFloat(value).toPrecision(maxPrecision)));
  cells = preciseValue.match(/^(-?)(\d*)(\.(\d+))?$/);

  const negative = cells[1];
  let [int, deci] = rounding(cells[2] || '0', cells[4] || '', decimal, roundingType);
  const localeInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  separator = separator && separator.slice(0, 1);
  decimalPoint = decimalPoint && decimalPoint.slice(0, 1);
  
  let currentLen = negative.length + localeInt.length + 1 + deci.length;
  if (separator && currentLen <= length) {
    deci = deci.replace(/0+$/, '');
    return `${negative}${localeInt.replace(/,/g, separator)}${deci && decimalPoint}${deci}`;
  }

  let space = length - negative.length - int.length;
  if (space >= 0) {
    [int, deci] = rounding(int, deci, space - 1, roundingType);
    deci = deci.replace(/0+$/, '');
    return `${negative}${int}${deci && decimalPoint}${deci}`;
  }

  const sections = localeInt.split(',');
  if (sections.length > 1) {
    const mainSection = sections[0];
    const tailSection = sections.slice(1).join('');
    const baseUnits = ['k', 'M', 'G', 'T', 'P'];
    const unit = ((units && units[sections.length - 2]) || baseUnits[sections.length - 2]).slice(0, 1);
    space = length - negative.length - mainSection.length - 1;
    if (space >= 0) {
      let [main, tail] = rounding(mainSection, tailSection, space - 1, roundingType);
      tail = tail.replace(/0+$/, '');
      return `${negative}${main}${tail && decimalPoint}${tail}${unit}`;
    }
  }
  
  console.error(`number-display: length: ${length} is too small for ${value}`);
  return value;
};

module.exports = createDisplay;
