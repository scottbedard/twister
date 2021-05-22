#!/usr/bin/env node

/* eslint-disable no-undef */
const { Cube, Dodecaminx, version } = require('../dist/index');
const { program } = require('commander');

const json = output => JSON.stringify(output);
const isCube = str => /^(\d+)x(\1)$/.test(str);
const isDodecaminx = str => /^dodecaminx(\d+)$/.test(str);

const createModel = (type) => {
  if (isCube(type)) {
    return new Cube({ size: parseInt(type, 10) });
  }
  
  if (isDodecaminx(type)) {
    return new Dodecaminx({ size: parseInt(type.slice(10), 10) });
  }

  throw 'Invalid puzzle';
}

program.version(version);

//
// apply
//
program.command('apply <puzzle> <algorithm>')
  .description('apply turns to a puzzle')
  .option('-s, --state [value]', 'Initial puzzle state')
  .action((puzzle, alg, options) => {
    const model = createModel(puzzle);

    if (options.state) {
      model.apply(JSON.parse(options.state));
    }

    model.turn(alg);

    console.log(json({
      puzzle,
      solved: model.isSolved(),
      state: model.output(),
    }));
  });

//
// scramble
//
program.command('scramble <puzzle>')
  .description('scramble puzzle to a given depth')
  .option('-t, --turns [value]', 'Turns')
  .action((puzzle, options) => {
    const model = createModel(puzzle);
    const turns = options.turns && parseInt(options.turns.replace(/[^\d]/g, ''), 10);
    const scramble = model.generateScramble(turns);

    model.turn(scramble);

    console.log(json({
      puzzle,
      turns: turns,
      scramble,
      state: model.output(),
    }));
  });

program.parse(process.argv);
