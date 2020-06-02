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
export default function createDisplay({
  length,
  decimal,
  placeholder,
  allowText,
  separator,
  decimalPoint,
  roundingType,
  units,
}?: {
  length?: number,
  decimal?: number,
  placeholder?: string,
  decimalPoint?: string,
  allowText?: boolean,
  separator?: string,
  roundingType?: 'round' | 'floor' | 'ceil',
  units?: Array<string>,
}): (value: any) => string;
