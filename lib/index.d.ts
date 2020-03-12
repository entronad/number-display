/**
 * Create a display function with configs. The function returned converts the value.
 * 
 * @param length - (Default 9) Max display char length (better >= 5 to allow any number).
 * @param decimal - (Default equals length) Max decimal precision.
 * @param placeholder - (Default '') Result when neither number nor text.
 * @param allowText - (Default false) Allow text as results, if false text will convert to placeholder, text will be slice within length param.
 * @param {boolean} [separator] set separators between digits in group of 3, if there are rooms; default is ','
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
  roundingType,
  units,
}?: {
  length?: number,
  decimal?: number,
  placeholder?: string,
  allowText?: boolean,
  separator?: string,
  roundingType?: 'round' | 'floor' | 'ceil',
  units?: Array<string>,
}): (value: any) => string;
