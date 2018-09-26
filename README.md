# number-display
*Display number smartly within a certain length.*

```
result = display(input, length, config)
```

To display data in a width-limited component, this function will smartly help you to convert number to a certain chart length. To be **simple**, **plain**, **flexible** and **accurate**, the conversion follow this rules:

- result chart length will never overflow length
- filter strange inputs ( null/NaN/object ) to placeholder ( -- )
- use locale string with commas ( 1,234,222 ) as possible ( configurable )
- use number with units ( 1.23k ) when length is limited
- NO scientific notation ( 1.23e+4 )
- return input text if allowed

## Install

```
yarn add number-display
```

or

```
npm i number-display --save
```

## Usage

```
import display from 'number-display';

// result = display(input, length, config)
// config: {maxAccuracy, placeholder, allowText}

console.log(display(1234.123));                   // 1,234.12
console.log(display(1234.123, 4));                // 1.2k
console.log(display('1000000000'));               // 1G
console.log(display(-1.2345e+5));                 // -123,450
console.log(display(NaN));                        // --
console.log(display(''));                         // --
console.log(display(new Date()));                 // --
console.log(display((new Date()).toISOString())); // 2018-09-

console.log(display(NaN, 2, {placeholder: '**'}));// **
console.log(display(1.22, 8, {maxAccuracy: 0}));  // 1.2
console.log(display('text', 8, {allowText: false}));  // --
console.log(display(12345678, 19, {comma: false}));// 12345678

```

## Params

**input**

The *thing* you want to display as a number. When it can't be converted to a number, the result would be a *placeholder*.

**length**

( default: 8 )

The max length the result would be. length should no less then 4 so that any number can display ( say -123 ) after trim.

**config**

- **maxAccuracy**

   ( default: 4 )

  The max accuracy. The final accuracy will be calculated by length(of course less than maxAccuracy), so usually you don't need to set this param.

- **placeholder**

  ( default: '--' )

  The result when the input can't be converted to a number. it's length should no more than your length param.

- **allowText**

  ( default: true )

  Allow *Text* ( String that cant convert to number/null/undefined/NaN ) as input and result. If false , result of text will be placeholder.

- **comma**

  ( default: true )

  Whether the locale string has commas ( 1,234,222 ).

# Change Log

[CHANGELOG.md](CHANGELOG.md)