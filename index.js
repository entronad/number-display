const createDisplay = ({
  length = 8,
  precision = 2,
  placeholder = '',
  allowText = true,
  locale = true,
  localeSeparator = ',',
  units = ['k', 'M', 'G', 'T', 'P'],
  unitSpan = 3,
  unitPrecision,
} = {}) => {
  unitPrecision = unitPrecision || precision;
  return (value) => {
    placeholder = placeholder.slice(0, length);
    const type = typeof value;

    if ((type !== 'number') && (type !== 'string')) {
      return placeholder;
    }

    if ((type === 'number') && !Number.isFinite(value)) {
      return placeholder;
    }

    const value = String(value);
    const cells = value.match(/^(-?)(\d*)(\.(\d+))?$/);

    if (!cells) {
      return value.slice(0, length);
    }

    const negative = cells[1];
    const int = cells[2] || '0';
    const localeInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, localeSeparator);
    const decimal = cells[4].slice(0, precision) || '';

    let currentLen = negative.length + localeInt.length + 1 + decimal.length;
    if (locale && currentLen <= length) {
      return `${negative}${localeInt}.${decimal}`;
    }

    let space = length - negative.length - int.length;
    if (space >= 2) {
      return `${negative}${int}.${decimal.slice(0, space - 1)}`;
    }
    if (space >= 0) {
      return `${negative}${int}`;
    }

    if (int.length <= unitSpan) {
      throw new Error('length too small')
    }

    
  }
}