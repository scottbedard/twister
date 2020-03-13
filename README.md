# twister

[![Build status](https://img.shields.io/circleci/build/github/scottbedard/twister)](https://circleci.com/gh/scottbedard/twister)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/twister)](https://codecov.io/gh/scottbedard/twister)
[![File size](https://img.shields.io/github/size/scottbedard/twister/dist/index.esm.js?color=yellow)](https://github.com/scottbedard/twister/blob/master/dist/index.esm.js)
[![License](https://img.shields.io/github/license/scottbedard/twister?color=blue)](https://github.com/scottbedard/twister/blob/master/LICENSE)

Twister is a collection of standards and classes useful for modeling [twisty puzzles](https://en.wikipedia.org/wiki/Combination_puzzle).

> **Warning:** This is a work in progress, and is not ready for production use. Changes may happen at any time.

## Installation

Soon...

## API

All puzzles expose the following methods

```js
// scramble the puzzle
puzzle.scramble();

// scramble the puzzle to a specific depth
puzzle.scramble(10);

// generate a scramble, but don't execute it
puzzle.generateScramble();

// execute a series of turns
puzzle.turn('R U- R-');

// reset the puzzle
puzzle.reset();

// test if the puzzle is solved
puzzle.isSolved();
```

Use the following properties to access puzzle data

```js
// current puzzle state
puzzle.state;

// current puzzle options
puzzle.options;
```

## Cube

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

## Dodecaminx

Soon...

## License

[MIT](https://github.com/scottbedard/twister/blob/master/LICENSE)

Copyright (c) 2020-present, Scott Bedard
