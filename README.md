[中文](https://github.com/entronad/number-display/blob/master/README_CN.md) 

# number-display

*Display number smartly within a certain length.*

```
const display = createDisplay({ length: 8 });

display(-254623933.876)    // result: -254.62M
```

The conversion follow this rules:

- result char length will never overflow `length` .
- replace null or wrong type inputs ( undefined / NaN / object ) to placeholder
- use locale string with commas ( 1,234,222 ) as possible ( configurable )
- trim number with units ( 1.23k ) when length is limited
- convert scientific notation ( 1.23e+4 ) to friendly form
- directly return input text if allowed ( configurable )
- when omitting decimals, you can change the rounding type, default to 'round'
- no decimal tailing zeros
- no float error

It also has a [Dart version](https://github.com/entronad/number_display) .

## Install

```
yarn add number-display
```

## Usage

*We have built-in types, so Typescript is supported*

We only export a `createDisplay` function for users to custom their `display` function. So the real display function has only one input: `value` . This separates the configuration and usage, which is more simple and clear.

```
import createDisplay from 'number-display';

const display = createDisplay({
  length: 8,
  decimal: 0,
});

<div>{display(data)}</div>
```

The complete configuration params are listed in the next [section](#Configurations) .

If the length overflow, the trimming rules in order are:

- omit the locale commas
- slice the decimal by the room left
- trim the integer with number units ( k, M, G, T, P )
- if the `length` is >= 5, any number can be trimmed within it. If it's less than 5 and input number is too long, display will throw an error.

Conversion examples:

```
createDisplay();

null => ''
NaN => ''
{} => ''

-123456789.123456789 => '-123.457M'
'123456' => '123,456'
-1.2345e+5 => '-123,450'
```

Note that usually we will try to convert the number-like string input `value` to real number , say '-123', but some special form will be regarded as text like 'NaN', '-1.2345e+5':

```
'-1.2345e+5' => '-1.2345e+'
'NaN' => 'NaN'
```

With some configs:

```
createDisplay({
  allowText: false,
  separator: false,
  placeholder: '--'
});

null => '--'
'abcdefghijklmn' => 'abcdefghi'
123456 => '123456'
```

## Configurations

**length**

( default: 9 )

The max length the result would be. length should be longer then 5 so that any number can display ( say -123000 ) after trim, or you may get a console warning and length overflow.

**decimal**

( default: equals to 'length' )

The max decimal length. Note that this is only a constraint. The final precision will be calculated by length, and less than this param. This param is the same as 'length' by default, witch means no additional limit.  There will be no decimal trailing zeros.

**placeholder**

( default: '' )

The result when the input is neither string nor number, or the input is NaN, Infinity or -Infinity. It will be sliced if longer than length param.

**allowText**

( default: false )

Allow *Text* ( String that cant convert to number) as input and result. It will be sliced within length param. If false , result of text will be placeholder. Note that some special form will be regarded as text like 'NaN', '-1.2345e+5'.

**separator**

( default: true )

Whether the locale string has commas ( 1,234,222 ), if there are rooms.

**roundingType**

( default: 'round' )

The rounding type when omitting decimals, enum in 'round', 'floor' or 'ceil'.

## Blogs

[En](https://medium.com/front-end-weekly/displaying-numbers-in-frontend-2336323493c2) 

[中文](https://zhuanlan.zhihu.com/p/85536865) 