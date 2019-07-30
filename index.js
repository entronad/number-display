/**
 * Create a display function with configs. The function returned converts the value.
 * 
 * @param {number} [length] max display char length (better >= 5 to allow any number); default 9
 * @param {number} [decimal] max decimal precision; default 2
 * @param {string} [placeholder] result when neither number nor text; default ''
 * @param {boolean} [allowText] allow text as results, if false text will convert to placeholder, text will be slice within length param; default true
 * @param {boolean} [comma] show commas between digits in group of 3, if there are rooms; default true
 */
const createDisplay = ({
  length = 9,
  decimal = 2,
  placeholder = '',
  allowText = true,
  comma = true,
} = {}) => value => {
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
  const int = cells[2] || '0';
  const localeInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const deci = (cells[4] || '').slice(0, decimal).replace(/0+$/, '');

  let currentLen = negative.length + localeInt.length + 1 + deci.length;
  if (comma && currentLen <= length) {
    return `${negative}${localeInt}${deci && '.'}${deci}`;
  }

  let space = length - negative.length - int.length;
  if (space >= 2) {
    return `${negative}${int}${deci && '.'}${deci.slice(0, space - 1)}`;
  }
  if (space >= 0) {
    return `${negative}${int}`;
  }

  const sections = localeInt.split(',');
  if (sections.length > 1) {
    const mainSection = sections[0];
    const tailSection = sections.slice(1).join();
    const units = ['k', 'M', 'G', 'T', 'P'];
    const unit = units[sections.length - 2];
    space = length - negative.length - mainSection.length - 1;
    if (space >= 2) {
      return `${negative}${mainSection}.${tailSection.slice(0, space - 1)}${unit}`;
    }
    if (space >= 0) {
      return `${negative}${mainSection}${unit}`;
    }
  }
  
  throw new Error(`length: ${length} is too small`);
};

module.exports = createDisplay;
