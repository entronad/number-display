/**
 * Create a display function with configs. The function returned converts the value.
 * 
 * @param length - (Default 9) Max display char length (better >= 5 to allow any number).
 * @param decimal - (Default equals length) Max decimal precision.
 * @param placeholder - (Default '') Result when neither number nor text.
 * @param allowText - (Default true) Allow text as results, if false text will convert to placeholder, text will be slice within length param.
 * @param separator - (Default true) Show commas between digits in group of 3, if there are rooms.
 * @param roundingType - (Derault 'round') Rounding type of decimals, enum in 'round', 'floor' or 'ceil'.
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
}: {
  length: number,
  decimal: number,
  placeholder: string,
  allowText: boolean,
  separator: boolean,
  roundingType: 'round' | 'floor' | 'ceil',
}): (value: any) => string;
