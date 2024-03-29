# twister

[![Build status](https://img.shields.io/github/actions/workflow/status/scottbedard/twister/test.yml?branch=main)](https://github.com/scottbedard/twister/actions)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/twister)](https://codecov.io/gh/scottbedard/twister)
[![NPM](https://img.shields.io/npm/v/@bedard/twister)](https://www.npmjs.com/package/@bedard/twister)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@bedard/twister?label=gzipped)](https://bundlephobia.com/result?p=@bedard/twister)
[![License](https://img.shields.io/github/license/scottbedard/twister?color=blue)](https://github.com/scottbedard/twister/blob/main/LICENSE)

Twister is a library for modeling the state of twisty puzzles. To get started, [check out the interactive playground](https://twister.speedcube.site/).

- [Installation](#installation)
- [Basic usage](#basic-usage)
- [Advanced usage](#advanced-usage)
- [CLI](#cli)
- [Puzzles](#puzzles)
  - [Cube](#cube)
  - [Dodecaminx](#dodecaminx)
- [License](#license)

## Installation

The recommended way to install is through NPM.

```bash
npm install @bedard/twister
```

Alternatively, you can use the CDN. When using the CDN, the library will be exposed globally as `Twister`.

```html
<script src="https://unpkg.com/@bedard/twister"></script>
```

## Basic usage

Below is the recommended way to instantiate Twister models. Using destructured imports allows for unused puzzles to be tree-shaken from your application.

```js
import { Cube } from '@bedard/twister'

const puzzle = new Cube({ size: 3 })
```

Once a puzzle has been instantiated, the following methods are available...

#### `apply`

Set the puzzle to a given state. State objects can be created using the [`output`](#output) method.

```js
puzzle.apply(state)
```

#### `clone`

Create a new puzzle instance with the same `state` and `options`.

```js
const puzzle = new Puzzle()

const clone = puzzle.clone()
```

#### `execute`

Updates puzzle state using a parsed turn object. In most situations, it's simpler to use the [`turn`](#turn) method and make use of turn notation.

```js
const turn = puzzle.parse('R')

puzzle.execute(turn)
```

#### `generateScramble`

Generates a scramble of a default or specified number of moves, but does not execute it.

```js
const scramble = puzzle.generateScramble()
```

#### `notation`

Generate the string representation of a parsed turn object. This can be thought of as the opposite of [`parse`](#parse).

```js
const turn = puzzle.parse('R')

puzzle.notation(turn) // 'R'
```

#### `output`

Returns a minified version of the puzzle's state. This method is useful for saving state as JSON, then restoring that state via the [`apply`](#apply) method.

```js
const state = puzzle.output()
```

#### `parse`

Convert a single piece of puzzle notation to a turn object. This method is generally used to interact with the [`execute`](#execute) method, but is also useful for testing if notation is valid. To parse a turn in reverse, provide `true` as the second argument.

```js
const turn = puzzle.parse('R')
```

#### `parseAlgorithm`

Convert a space-delimited string of turns into an array of turn objects. To parse an algorithm in reverse, provide `true` as the second argument.

```js
const turns = puzzle.parseAlgorithm('R U R-')
```

#### `reset`

Return a puzzle to its solved state.

```js
puzzle.reset()
```

#### `scramble`

Scrambles a puzzle to a default or specified number of moves. This is similar to [`generateScramble`](#generatescramble), the only difference being that this method executes the resulting scramble. This method is also available via the CLI, [more info here](#cli).

```js
puzzle.scramble()
```

#### `stickers`

Get stickers affected by a turn. If no turn notation is provided, all stickers will be returned.

```js
const stickers = puzzle.stickers('R')
```

#### `test`

Test if the puzzle is solved, or matches a specific state.

```js
// test if the puzzle is solved
const solved = puzzle.test()

// test for a specific state
const isSame = puzzle.test(otherPuzzle.output())
```

#### `turn`

Executes an algorithm. This method is also available via the CLI, [more info here](#cli).

```js
puzzle.turn('R U R-')
```

#### `unturn`

Execute the reverse of an algorithm. Note that unturns are executed from right to left.

```js
const scramble = puzzle.turn('R U R-')

puzzle.unturn('R U R-') // 'R U- R-'
```

## Advanced usage

All stickers are stored as `{ value }` objects. This allows for additional information, such as rendering data, to be attached to the stickers. To do this, simply instantiate the puzzle, and modify the objects that are part of `puzzle.state`.

```js
import { Cube } from '@bedard/twister'

const puzzle = new Cube({ size: 3 })

puzzle.state.u[0].foo = 'bar'
```

For applications with advanced scrambling needs, a custom random function can be provided on instantiation. Below is an example using [Rando.js](https://randojs.com/) to generate cryptographically strong scrambles. The `random` option must be a function that returns a floating point number between `0` and `1`. By default, [`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) is used.

```js
import { Cube } from '@bedard/twister'
import { rando } from '@nastyox/rando.js';

const puzzle = new Cube({
  random: rando,
  size: 3,
});
```

> While this library does it's best to generate strong scrambles, _**it should never be used in WCA events**_. Always use the official [TNoodle](https://github.com/thewca/tnoodle) library for WCA purposes.

## CLI

The following utilities are available from the command line. Constructor options can be provided via `--options`. Note that when providing JSON arguments, we use [JSON5](https://json5.org/) syntax for a smoother user experience.

#### `parse`

Parse a single piece of turn notation.

```bash
$ twister parse cube R
```

#### `parseAlgorithm`

Parse multiple pieces of turn notation.

```bash
$ twister parseAlgorithm cube "R U R-"
```

#### `scramble`

Scramble a puzzle.

```bash
# scramble a puzzle
$ twister scramble cube

# scramble a puzzle to a specific number of moves
$ twister scramble cube --turns=10
```

#### `turn`

Execute an algorithm. This will be performed on a solved puzzle unless an initial state is provided.

```bash
# apply turns to a solved puzzle
$ twister turn cube "R U R-"

# apply turns from an initial state
$ twister turn cube "R U R-" --state="{...}"

# apply turns and test for a particular state
$ twister turn cube "R U R-" --test="{...}"
```

## Puzzles

### Cube

This puzzle represents an N-layered face turning cube.

<img src="https://user-images.githubusercontent.com/7980426/76586921-8a3c3280-649f-11ea-9d9c-31b7a3080e60.png">

```js
import { Cube } from '@bedard/twister';

const puzzle = new Cube({ size: 3 });
```

Cube state is represented as an array of sticker objects. Each face array starts from the top left sticker and read sequentially to the bottom right. To picture how these values map onto an actual cube, imagine unfolding a cube while looking at the `F` face. Notice that the `B` face has the same orientation as the `L`, `F`, and `R` faces.

<p align="center">
  <img src="https://user-images.githubusercontent.com/7980426/97519717-e7b1c080-1956-11eb-96f9-5259cdcf221f.png" width="400px">
</p>

Our notation is a superset of [WCA notation](https://www.worldcubeassociation.org/regulations/#12a). Any algorithm produced by a WCA scrambler is compatible with this library. There are however, a couple of extensions we've made to the WCA notation. The first of which is the optional use of a `-` to indicate counter-clockwise turns. The second is the ability to annotate "slice turns" with a single move. To do this, simply omit the `wide` segment of a turn. For example, a `3F` in our notation system would be equal to `3Fw 2Fw'` in WCA notation.

### Dodecaminx

This puzzle represents an N-layered face turning dodecahedron.

<img src="https://user-images.githubusercontent.com/7980426/76587868-86f67600-64a2-11ea-80f3-74dd928909c6.png">

```js
import { Dodecaminx } from '@bedard/twister';

const puzzle = new Dodecaminx({ size: 3 });
```

State for a dodecaminx is stored as an array of corner matrices, middle arrays, and a center value. These arrays start from the primary corner of a face, and continue clockwise around that face. The corner matrices are similar to that of a cube face, starting with the corner furthest from the center and reading sequentially towards the center. Middle arrays start with the sticker furthest from the center. Note that for even-layered puzzles, the middle and center values are omitted.

<p align="center">
  <img src="https://user-images.githubusercontent.com/7980426/97093355-f9663180-15ff-11eb-93e4-8783045b8f71.png" width="600px">
</p>

Notation for this puzzle is similar to that of cubes. The main difference is that whole-puzzle rotations are denoted by lowercase letters. Here are a few examples to demonstrate various turns around the `U` face.

- `U` = outer layer turned once clockwise
- `U2` = outer layer turned twice clockwise
- `U2-` = outer layer turned twice counter-clockwise
- `2U` = second layer turned once clockwise
- `Uw` = second and outer layer turned once clockwise
- `u` = entire puzzle rotated once clockwise
- `u2` = entire puzzle rotated twice clockwise
- `u2-` = entire puzzle rotated twice counter-clockwise

## License

[MIT](https://github.com/scottbedard/twister/blob/master/LICENSE)

Copyright (c) 2020-present, Scott Bedard
