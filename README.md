# twister

[![Build status](https://img.shields.io/github/workflow/status/scottbedard/twister/Test)](https://github.com/scottbedard/twister/actions)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/twister)](https://codecov.io/gh/scottbedard/twister)
[![Dependencies](https://img.shields.io/david/scottbedard/twister)](https://david-dm.org/scottbedard/twister)
[![Dev dependencies](https://img.shields.io/david/dev/scottbedard/twister)](https://david-dm.org/scottbedard/twister?type=dev)
[![NPM](https://img.shields.io/npm/v/@bedard/twister)](https://www.npmjs.com/package/@bedard/twister)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@bedard/twister?label=gzipped)](https://bundlephobia.com/result?p=@bedard/twister)
[![License](https://img.shields.io/github/license/scottbedard/twister?color=blue)](https://github.com/scottbedard/twister/blob/master/LICENSE)

Twister is a library for modeling the state of twisty puzzles. To get started, [check out the interactive playground](https://twister.speedcube.site/).

> **Warning:** This library is a work in progress, and is not ready for production use. Breaking changes may happen at any time.

## Installation

The recommended way to install is through NPM.

```bash
npm install @bedard/twister
```

Alternatively, you can use the CDN. When using the CDN, the library will be exposed globally as `Twister`.

```html
<script src="https://unpkg.com/@bedard/twister"></script>
```

## API

All puzzles expose the following methods

```js
// scramble the puzzle
puzzle.scramble();

// scramble the puzzle to a specific depth
puzzle.scramble(10);

// generate scramble, but don't execute it
puzzle.generateScramble();

// generate scramble to a specific depth
puzzle.generateScramble(10);

// get array of stickers effected by a turn
puzzle.getStickersForTurn('F');

// execute a series of turns
puzzle.turn('R U- R-');

// reset the puzzle
puzzle.reset();

// test if the puzzle is solved
puzzle.isSolved();

// apply puzzle state
puzzle.apply(state);

// output puzzle state
puzzle.output();
```

Use the following properties to access puzzle data

```js
// current puzzle state
puzzle.state;

// current puzzle options
puzzle.options;
```

All puzzles store stickers in the following shape `{ data, value }`. The `value` represents the color of that particular sticker, usually as a `number` or `null`. When `null`, the sticker will be considered "solved", regardless of which face it's on. This can be useful when modeling [void puzzles](https://en.wikipedia.org/wiki/Void_Cube) variations. A sticker's `data` object is simply a place to store any additional data with the sticker.

When using with TypeScript, a type argument may be provided to the puzzle constructor to define the shape of this data.

## CLI

The following utilities are available from the command line.

```bash
# generate a scramble
$ twister scramble 3x3

# generate a very short scramble
$ twister scramble 3x3 --turns 3

# test a solution
$ twister test 3x3 '{ ... }' 'R U R- ...'
```

## Advanced Usage

For applications with advanced scrambling needs, a custom random function can be provided. Below is an example using [Rando.js](https://randojs.com/) to generate cryptographically strong scrambles. The `random` option can be any function that returns a floating point number between `0` and `1`. By default, [`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) will be used.

```js
import { Cube } from '@bedard/twister';
import { rando } from '@nastyox/rando.js';

const cube = new Cube({
  size: 3,
  random: rando,
});

cube.scramble();
```

> While this library does it's best to generate strong scrambles, **it should never be used in WCA events**. Always use the official [TNoodle](https://github.com/thewca/tnoodle) library for WCA purposes.

## `Cube`

<img src="https://user-images.githubusercontent.com/7980426/76586921-8a3c3280-649f-11ea-9d9c-31b7a3080e60.png">

This puzzle represents an NxNxN face turning cube.

```js
import { Cube } from '@bedard/twister';

const puzzle = new Cube({ size: 3 });
```

Cube state is represented as an array of sticker objects. Each face array starts from the top left sticker and read sequentially to the bottom right. To picture how these values map onto an actual cube, imagine unfolding a cube while looking at the `F` face. Notice that the `B` face has the same orientation as the `L`, `F`, and `R` faces.

```
  U
L F R B
  D
```

Our notation is a superset of [WCA notation](https://www.worldcubeassociation.org/regulations/#12a). Any algorithm produced by a WCA scrambler is compatible with this library. There are however, a couple of extensions we've made to the WCA notation. The first of which is the optional use of a `-` to indicate counter-clockwise turns. The second is the ability to annotate "slice turns" with a single move. To do this, simply omit the `wide` segment of a turn. For example, a `3F` in our notation system would be equal to `3Fw 2Fw'` in WCA notation.

## `Dodecaminx`

<img src="https://user-images.githubusercontent.com/7980426/76587868-86f67600-64a2-11ea-80f3-74dd928909c6.png">

> **Warning:** This puzzle is currently in development, some methods have not been implemented.

This puzzle represents N-layered face turning dodecahedrons. State for this puzzle is stored as an array of corner matrices and middle values. These arrays start from the faces primary corner, and continue clockwise around the face. The corner matrices are similar to that of the cube face, starting with the corner furthest from the center of the face, and read sequentially towards the center. Middle arrays start with the sticker furthest from the center. Note that for even-layered puzzles, the middle and center values will be an empty array and `null` respectively.

<p align="center">
  <img src="https://user-images.githubusercontent.com/7980426/97093355-f9663180-15ff-11eb-93e4-8783045b8f71.png" width="600px">
</p>

Notation for this puzzle is similar to that of cubes. The main difference is that whole-puzzle rotations are denoted with a `*` prefix. Here are a few examples to demonstrate various turns around the `R` face.

- `R` = outer layer turned once clockwise
- `R2` = outer layer turned twice clockwise
- `R2-` = outer layer turned twice counter-clockwise
- `2R` = second layer turned once clockwise
- `2Rw` = second and outer layer turned once clockwise
- `*R` = entire puzzle rotated once clockwise
- `*R2` = entire puzzle rotated twice clockwise
- `*R2-` = entire puzzle rotated twice counter-clockwise

## License

[MIT](https://github.com/scottbedard/twister/blob/master/LICENSE)

Copyright (c) 2020-present, Scott Bedard
