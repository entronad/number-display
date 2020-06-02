## 2.3.0

**2020-06-02**

- Make decimal point configurable.

## 2.3.0

**2020-03-12**

- Make seporator and units configurable.

## 2.2.3

**2020-01-08**

- `allowText` default to false, to prevent unexpected result of input `''`.

## 2.2.2

**2020-01-08**

- Fix config params to be optional in index.d.ts.

## 2.2.1

**2020-01-08**

- Fix file set in package.json.

## 2.2.0

**2020-01-08**

- Add built-in types for Typescript.
- Update license to 2020.

## 2.1.2

**2019-12-07**

- Change back param precision name to 'decimal', to avoid confusion with the common 'toPrecision' meaning.
- Add inner precision limit to avoid float error.

## 2.1.1

**2019-12-05**

- Change param decimal name to 'precision', and default to equal to param length, witch means no additional limit.
- Opt the rounding function.
- Change param comma name to 'separator'.

## 2.1.0

**2019-12-02**

- Add feature: roundingType. Now you can set the way to round the decimal in 'round', 'floor' or 'ceil', witch default to 'round'.
- When the length is too small, number-display will return the origin value as a string, instead of throwing an error.

## 2.0.3

**2019-07-30**

- Fix decimal trailing zeros with units.

## 2.0.2

**2019-07-30**

- Remove decimal trailing zeros.

## 2.0.1

**2019-07-26**

- Fix wrong return of '' and '-'.

## 2.0.0

**2019-07-25**

- Simplify APIs, details in README.md.
- Optimize performance.
- Add unit test.

## 1.2.1

**2019-02-07**

- Fix unitfy retrun array.

## 1.2.0

**2018-09-26**

- Add units config params.
- Deal overflow with placeholder.

## 1.1.1

**2018-09-26**

- Optimize unitfy method.

## 1.1.0

**2018-09-26**

- Change the commafy method from toLocaleString to rgx, as toLocaleString went work in android/safari.
- Put config params in a object.

## 1.0.0

**2018-09-26**

* Init this package.
