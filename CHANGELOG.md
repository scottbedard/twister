# Twister changelog

> **Warning:** This library is in beta. Breaking changes are no longer anticipated, but may still happen before 1.0 is tagged.

## 1.0.0-beta.10

- If no argument is provided to `stickers`, all stickers will be returned

## 1.0.0-beta.9

- All turn objects now include a `whole` property
- Added `parseAlgorithm` method
- Added `parse` and `parseAlgorithm` cli commands

## 1.0.0-beta.8

- Adds previous turn argument to `scramble` and `generateScramble` to allow for continuous scrambling.

## 1.0.0-beta.7

- **BREAKING:** CLI no longer uses special puzzle names to define constructor options. An explicit `options` parameter must now be provided to use non-default values.

## 1.0.0-beta.1

#### Improvements

- A number of technical improvements, the largest of which being that cubes now use the "net" strategy for managing how faces are related to one another. This significantly reduces the size of the library, and makes things much more maintainable.
- Migrated the playground from vue-cli to vite.
- Added a light mode to the playground.
- Refactored tests to be more maintainable.

#### Breaking changes

- Simplified how state for Dodecaminx faces, we now use "composite matrices". See the `src/utils/composite-matrix.ts` for more information.
- Renamed `getStickersForTurn` to `stickers`.
- Renamed `isSolved` to `test`.
- `scramble` and `generateScramble` now return the resulting scramble.
- Typescript resources for specific puzzles are no longer exported.
- Dodecaminx no longer supports Pochmann-style scrambling notation.
- Dodecaminx now uses lowercase letters to denote whole-puzzle turns.

## 0.7.0

-  **BREAKING:** Replaced `test` CLI command with `apply`

## 0.6.6

- Fixed node environment issue that broke npx

## 0.6.5

- Export base `Puzzle` class

## 0.6.4

- Fix versioning and dependency issue that broke the command line interface

## 0.6.2

- Fix dodecaminx `getStickersForTurn` logic that wasn't including all slices of wide turns ([#12](https://github.com/scottbedard/twister/issues/12))

## 0.6.1

- Fix dodecaminx `getStickersForTurn` logic that extracted slices from incorrect angles ([#11](https://github.com/scottbedard/twister/issues/11))

## 0.6.0

- Dodecaminx puzzle added

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
