const commafy = integerStr => Number(integerStr).toLocaleString();

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
 * @param {*} input max length 16 length integer
 * @param {*} length min 4
 * @param {*} maxAccuracy including unitfy
 * @param {*} placeholder <= length
 */
const display = (
  input,
  length = 8,
  maxAccuracy = 4,
  placeholder = '--',
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
    if (input.trim() === '') {
      return placeholder;
    }

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
  const commafyStr = commafy(integerStr);
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