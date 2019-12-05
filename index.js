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

/**
 * Create a display function with configs. The function returned converts the value.
 * 
 * @param {number} [length] max display char length (better >= 5 to allow any number); default 9
 * @param {number} [precision] max decimal precision; default equals length
 * @param {string} [placeholder] result when neither number nor text; default ''
 * @param {boolean} [allowText] allow text as results, if false text will convert to placeholder, text will be slice within length param; default true
 * @param {boolean} [separator] show commas between digits in group of 3, if there are rooms; default true
 * @param {string} [roundingType] Rounding type of decimals, enum in 'round', 'floor' or 'ceil'; default 'round'
 */
const createDisplay = ({
  length = 9,
  precision,
  placeholder = '',
  allowText = true,
  separator = true,
  roundingType = 'round',
} = {}) => value => {
  if (precision == null) {
    precision = length;
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
  const cells = value.match(/^(-?)(\d*)(\.(\d+))?$/);

  if (!cells || value === '' || value === '-') {
    return allowText ? value.slice(0, length) : placeholder;
  }

  const negative = cells[1];
  let [int, deci] = rounding(cells[2] || '0', cells[4] || '', precision, roundingType);
  const localeInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  let currentLen = negative.length + localeInt.length + 1 + deci.length;
  if (separator && currentLen <= length) {
    deci = deci.replace(/0+$/, '');
    return `${negative}${localeInt}${deci && '.'}${deci}`;
  }

  let space = length - negative.length - int.length;
  if (space >= 0) {
    [int, deci] = rounding(int, deci, space - 1, roundingType);
    deci = deci.replace(/0+$/, '');
    return `${negative}${int}${deci && '.'}${deci}`;
  }

  const sections = localeInt.split(',');
  if (sections.length > 1) {
    const mainSection = sections[0];
    const tailSection = sections.slice(1).join('');
    const units = ['k', 'M', 'G', 'T', 'P'];
    const unit = units[sections.length - 2];
    space = length - negative.length - mainSection.length - 1;
    if (space >= 0) {
      let [main, tail] = rounding(mainSection, tailSection, space - 1, roundingType);
      tail = tail.replace(/0+$/, '');
      return `${negative}${main}${tail && '.'}${tail}${unit}`;
    }
  }
  
  console.error(`number-display: length: ${length} is too small for ${value}`);
  return value;
};

module.exports = createDisplay;
