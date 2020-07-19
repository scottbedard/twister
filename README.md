# twister

[![Build status](https://img.shields.io/github/workflow/status/scottbedard/twister/Test)](https://github.com/scottbedard/twister/actions)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/twister)](https://codecov.io/gh/scottbedard/twister)
[![Dependencies](https://img.shields.io/david/scottbedard/twister)](https://david-dm.org/scottbedard/twister)
[![Dev dependencies](https://img.shields.io/david/dev/scottbedard/twister)](https://david-dm.org/scottbedard/twister?type=dev)
[![NPM](https://img.shields.io/npm/v/@bedard/twister)](https://www.npmjs.com/package/@bedard/twister)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@bedard/twister?label=gzipped)](https://bundlephobia.com/result?p=@bedard/twister)
[![License](https://img.shields.io/github/license/scottbedard/twister?color=blue)](https://github.com/scottbedard/twister/blob/master/LICENSE)

Twister is a library for modeling the state of twisty puzzles. To get started, [check out the interactive sandbox](https://scottbedard-twister.netlify.app/).

> **Warning:** This is a work in progress, and is not ready for production use. Changes may happen at any time.

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

// generate a scramble, but don't execute it
puzzle.generateScramble();

// execute a series of turns
puzzle.turn('R U- R-');

// reset the puzzle
puzzle.reset();

// test if the puzzle is solved
puzzle.isSolved();

// set puzzle state
puzzle.applyState(state);
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

Soon...

## License

[MIT](https://github.com/scottbedard/twister/blob/master/LICENSE)

Copyright (c) 2020-present, Scott Bedard
