# twister

[![Build status](https://img.shields.io/github/workflow/status/scottbedard/twister/Test)](https://github.com/scottbedard/twister/actions)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/twister)](https://codecov.io/gh/scottbedard/twister)
[![Dependencies](https://img.shields.io/david/scottbedard/twister)](https://david-dm.org/scottbedard/twister)
[![Dev dependencies](https://img.shields.io/david/dev/scottbedard/twister)](https://david-dm.org/scottbedard/twister?type=dev)
[![NPM](https://img.shields.io/npm/v/@bedard/twister)](https://www.npmjs.com/package/@bedard/twister)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@bedard/twister?label=gzipped)](https://bundlephobia.com/result?p=@bedard/twister)
[![License](https://img.shields.io/github/license/scottbedard/twister?color=blue)](https://github.com/scottbedard/twister/blob/master/LICENSE)

Twister is a library for modeling the state of twisty puzzles. To get started, [check out the interactive playground](https://twister.speedcube.site/).

> **Warning:** This branch will explore a rewrite in hopes of a 1.0 release candidate. Expect chaos.

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

The recommended way to interact with a Twister model is via destructured importing. This allows your bundler to tree-shake any unused puzzles from your application.

```js
import { Cube } from '@bedard/twister'

const puzzle = new Cube({ size: 3 })
```

Once a puzzle has been instantiated, the following methods are available...

##### `apply`

Applies a particular state to the puzzle. Think of this as the counterpart of the `output` method. 

```js
puzzle.apply(state)
```

##### `execute`

Updates a puzzle's state with a parsed turn object. In most situations, it's simpler to use the `turn` method and make use of the puzzle's turn notation.

```js
const turn = puzzle.parse('R')

puzzle.execute(turn)
```

##### `generateScramble`

Generates a scramble of a default or specified number of moves, but does not execute it.

```js
const scramble = puzzle.generateScramble()
```

##### `output`

Returns a minified version of the puzzle's state. This function works well for saving a puzzle's state as JSON, and setting that state using the `apply` method.

```js
const state = puzzle.output()
```

##### `parse`

Convert a string of puzzle notation to a turn object. This method is generally only used when interacting with the `execute` method.

```js
const turn = puzzle.parse('R')
```

##### `reset`

Return a puzzle to it's solved state.

```js
puzzle.reset()
```

##### `scramble`

Scrambles a puzzle to a default or specified number of moves. This is similar to `generateScramble`, with the only difference being that this method executes the resulting scramble.

```js
puzzle.scramble()
```

##### `stickers`

Returns all stickers that are part of a given turn.

```js
const stickers = puzzle.stickers('R')
```

##### `test`

Returns `true` or `false`, indicating if the puzzle is currently solved.

```js
const solved = puzzle.test()
```

##### `turn`

Execute an algorithm.

```js
puzzle.turn('R U R- ...')
```

## License

[MIT](https://github.com/scottbedard/twister/blob/master/LICENSE)

Copyright (c) 2020-present, Scott Bedard
