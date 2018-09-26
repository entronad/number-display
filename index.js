const commafy = integerStr => {
  let commafyStr = integerStr;
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(commafyStr)) {  
    commafyStr = commafyStr.replace(rgx, '$1' + ',' + '$2');  
  }
  return commafyStr;
}

// [integer, decimal, unit]
const unitfy = (integerStr, maxAccuracy) => {
  if (integerStr.length <= 3) {
    return [integerStr, '', '', integerStr.length, integerStr.length];
  }
  if (integerStr.length <= 6) {
    const content = String(Number(integerStr) / 1000).split('.');
    return [content[0], content[1] ? content[1].slice(0, maxAccuracy) : '', 'k'];
  }
  if (integerStr.length <= 9) {
    const content = String(Number(integerStr) / 1000000).split('.');
    return [content[0], content[1] ? content[1].slice(0, maxAccuracy) : '', 'M'];
  }
  if (integerStr.length <= 12) {
    const content = String(Number(integerStr) / 1000000000).split('.');
    return [content[0], content[1] ? content[1].slice(0, maxAccuracy) : '', 'G'];
  }
  // 16 length integer cant ensure accuracy
  if (integerStr.length <= 15) {
    const content = String(Number(integerStr) / 1000000000000).split('.');
    return [content[0], content[1] ? content[1].slice(0, maxAccuracy) : '', 'T'];
  }
}

/**
 * 
 * @param {*} input input variable
 * @param {number} [length=8] max display char length (must >= 4)
 * @param {Object} [config] configs
 * @param {number} [config.maxAccuracy=2] max decimal accuracy
 * @param {string} [config.placeholder=--] result when non-number
 * @param {boolean} [config.allowText=true] allow text as results
 * @param {boolean} [config.comma=true] has commas
 */
const display = (
  input,
  length = 8,
  { // config
    maxAccuracy = 2,
    placeholder = '--',
    allowText = true,
    comma = true,
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
  const unitfyInfo = unitfy(integerStr);
  const unitfyMargin = length - signStr.length - unitfyInfo[0].length - 1;
  if (unitfyMargin >= 2 && unitfyInfo[1] != '') {
    return `${signStr}${unitfyInfo[0]}.${unitfyInfo[1].slice(0, unitfyMargin -1)}${unitfyInfo[2]}`
  }
  return `${signStr}${unitfyInfo[0]}${unitfyInfo[2]}`
}

module.exports = display;