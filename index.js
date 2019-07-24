export const createDisplay = ({
  length = 8,
  decimal = 2,
  placeholder = '',
  allowText = true,
  comma = true,
} = {}) => (value) => {
  placeholder = placeholder.slice(0, length);
  const type = typeof value;

  if (
    (type !== 'number' && type !== 'string')
    || (type === 'number' && !Number.isFinite(value))
  ) {
    return placeholder;
  }

  const value = String(value);
  const cells = value.match(/^(-?)(\d*)(\.(\d+))?$/);

  if (!cells) {
    return allowText ? value.slice(0, length) : placeholder;
  }

  const negative = cells[1];
  const int = cells[2] || '0';
  const localeInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const deci = cells[4].slice(0, decimal) || '';

  let currentLen = negative.length + localeInt.length + 1 + deci.length;
  if (comma && currentLen <= length) {
    return `${negative}${localeInt}.${deci}`;
  }

  let space = length - negative.length - int.length;
  if (deci && space >= 2) {
    return `${negative}${int}.${deci.slice(0, space - 1)}`;
  }
  if (space >= 0) {
    return `${negative}${int}`;
  }

  const sections = localeInt.spilt(',');
  if (sections.length > 1) {
    const mainSection = sections[0];
    const tailSection = sections.slice(1).join();
    space = length - negative.length - mainSection.length - 1;
    if (space >= 2) {
      return `${negative}${mainSection}.${tailSection.slice(0, space - 1)}`;
    }
    if (space >= 0) {
      const units = ['k', 'M', 'G', 'T', 'P'];
      const unit = units[sections.length - 2];
      return `${negative}${mainSection}${unit}`;
    }
  }
  
  throw new Error(`length: ${length} is too small`);
}

export default createDisplay();
