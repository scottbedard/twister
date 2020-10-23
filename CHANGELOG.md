# Twister changelog

> **Warning:** This library is a work in progress, and is not ready for production use. Breaking changes may happen at any time.

## 0.5.1

- Fix regression of default type definitions added in v0.4.1

## 0.5.0

- Add support for generating cryptographically strong scrambles ([#4](https://github.com/scottbedard/twister/issues/4))
- Add `getStickersForTurn` method ([#5](https://github.com/scottbedard/twister/issues/5))

## 0.4.1

- For use with Typescript projects, a default sticker data type of [`Record<string, unknown>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype) will be used

## 0.4.0

- **BREAKING:** Various methods have been renamed, [check the readme for current API](https://github.com/scottbedard/twister#api)

## 0.3.0

- Added command line interface ([#3](https://github.com/scottbedard/twister/issues/3))
- Added `toState` method

## 0.2.0

- Added `applyState` method
- **BREAKING:** `Cube` state now uses lower case keys