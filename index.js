const commafy = integerStr => {
  let commafyStr = integerStr;
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(commafyStr)) {  
    commafyStr = commafyStr.replace(rgx, '$1' + ',' + '$2');  
  }
  return commafyStr;
}

// [integer, decimal, unit]
const unitfy = (integerStr, units, unitsInterval, unitsMaxAccuracy) => {
  if (integerStr.length <= unitsInterval) {
    return [integerStr, '', '', integerStr.length, integerStr.length];
  }
  for (let i = 0; i < units.length; i++) {
    if (integerStr.length <= (i + 2) * unitsInterval) {
      const content = String(Number(integerStr) / Math.pow(10, (i + 1) * unitsInterval)).split('.');
      return [content[0], content[1] ? content[1].slice(0, unitsMaxAccuracy) : '', units[i]];
    }
  }
  return null;
}

/**
 * 
 * @param {*} input input variable
 * @param {number} [length=8] max display char length (must >= 4)
 * @param {Object} [config] configs
 * @param {number} [config.maxAccuracy=2] max decimal accuracy
 * @param {string} [config.placeholder=--] result when non-number
 * @param {boolean} [config.allowText=true] allow text as results
 * @param {boolean} [config.comma=true] with commas in results
 * @param {Array} [config.units=true] array of number units
 * @param {number} [config.unitsInterval=true] figures of each unit
 * @param {number} [config.unitsMaxAccuracy=true] max decimal accuracy while display with units
 */
const display = (
  input,
  length = 8,
  { // config
    maxAccuracy = 2,
    placeholder = '--',
    allowText = true,
    comma = true,
    units = ['k', 'M', 'G', 'T'],
    unitsInterval = 3,
    unitsMaxAccuracy = 4,
  } = {},
) => {
  // placeholder must in length
  if(length < placeholder.length) {
    throw new Error('placeholder overflow');
  }
  // return non-number
  const inputType = typeof input;
  if ((inputType !== 'number') && (inputType !== 'string')) {
    return placeholder;
  }
  let inputNum = input;
  if (inputType === 'string') {
    // neither number nor text
    if (
      input.trim() === ''
      || input === 'NaN'
      || input === 'Infinity'
      || input === '-Infinity'
    ) {
      return placeholder;
    }

    // text
    if (isNaN(input)) {
      return allowText ? input.slice(0, length) : placeholder;
    }

    // number
    // str -> num -> str to uniform the number format
    inputNum = Number(input);
  }
  if (isNaN(inputNum) || inputNum === Infinity || inputNum === -Infinity) {
    return placeholder;
  }
  
  const inputStr = String(inputNum);
  const signStr = /^-/.test(inputStr) ? '-' : '';
  const integerStr = inputStr.split('.')[0].replace('-', '');
  const decimalStr = inputStr.split('.')[1] ? inputStr.split('.')[1].slice(0, maxAccuracy) : '';

  // length min is 4
  const commafyStr = comma ? commafy(integerStr) : integerStr;
  const commafyMargin = length - signStr.length - commafyStr.length;
  if (commafyMargin >= 2 && decimalStr != '') {
    return `${signStr}${commafyStr}.${decimalStr.slice(0, commafyMargin - 1)}`;
  }
  if (commafyMargin >= 0) {
    return `${signStr}${commafyStr}`;
  }
  // unitfy has no decimal
  const unitfyInfo = unitfy(integerStr, units, unitsInterval, unitsMaxAccuracy);
  if (unitfyInfo == null) {
    return placeholder;
  }
  const unitfyMargin = length - signStr.length - unitfyInfo[0].length - unitfyInfo[2].length;
  if (unitfyMargin >= 2 && unitfyInfo[1] != '') {
    return `${signStr}${unitfyInfo[0]}.${unitfyInfo[1].slice(0, unitfyMargin -1)}${unitfyInfo[2]}`
  }
  return `${signStr}${unitfyInfo[0]}${unitfyInfo[2]}`
}

module.exports = display;