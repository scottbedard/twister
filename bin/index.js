/* eslint-disable no-undef */
const { Cube } = require('../dist/index');
const { program } = require('commander');
const pkg = require('../package.json');

const json = output => JSON.stringify(output);

program.version(pkg.version);

//
// scramble
//
program.command('scramble <puzzle>')
  .description('scramble puzzle to a given depth')
  .option('-t, --turns [value]', 'Turns')
  .action((puzzle, options) => {
    const cubeSize = parseInt(puzzle, 10);

    // cubes
    if (Number.isFinite(cubeSize)) {
      const cube = new Cube({ size: cubeSize });
      const turns = options.turns && parseInt(options.turns.replace(/[^\d]/g, ''), 10);
      const scramble = cube.generateScramble(turns);

      cube.turn(scramble);

      console.log(json({
        puzzle,
        turns: turns,
        scramble,
        state: cube.output(),
      }));

      return;
    }

    throw 'Invalid puzzle';
  });

//
// test
//
program.command('test <puzzle> <state> <solution>')
  .description('test if an algorithm solves a puzzle')
  .action((puzzle, state, solution) => {
    const cubeSize = parseInt(puzzle, 10);

    // cubes
    if (Number.isFinite(cubeSize)) {
      const cube = new Cube({ size: cubeSize });
      cube.apply(JSON.parse(state));
      cube.turn(solution);

      console.log(json({
        solved: cube.isSolved(),
      }));

      return;
    }

    throw 'Invalid puzzle';
  });

program.parse(process.argv);
