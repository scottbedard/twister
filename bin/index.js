/* eslint-disable no-undef */
const { Cube, Dodecaminx } = require('../dist/index');
const { program } = require('commander');
const pkg = require('../package.json');

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

program.version(pkg.version);

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

//
// test
//
program.command('test <puzzle> <state> <solution>')
  .description('test if an algorithm solves a puzzle')
  .action((puzzle, state, solution) => {
    const model = createModel(puzzle);

    model.apply(JSON.parse(state));
    model.turn(solution);

    console.log(json({
      solved: model.isSolved(),
    }));
  });

program.parse(process.argv);
