#!/usr/bin/env node
const { Cube, Dodecaminx, version } = require('../dist/index')
const { program } = require('commander')

const json = output => JSON.stringify(output)

const isCube = str => /^cube(\d+)$/.test(str)

const isDodecaminx = str => /^dodecaminx(\d+)$/.test(str)

const createModel = (type) => {
  if (isCube(type)) {
    return new Cube({ size: parseInt(type.slice(4), 10) })
  }
  
  if (isDodecaminx(type)) {
    return new Dodecaminx({ size: parseInt(type.slice(10), 10) })
  }

  throw 'Invalid puzzle'
}

//
// apply
//
program
  .command('apply <puzzle> <algorithm>')
  .description('apply turns to a puzzle')
  .option('-s, --state [value]', 'initial puzzle state')
  .action((puzzle, alg, options) => {
    const model = createModel(puzzle)

    if (options.state) {
      model.apply(JSON.parse(options.state))
    }

    model.turn(alg)

    console.log(json({
      puzzle,
      solved: model.test(),
      state: model.output(),
    }))
  })

//
// scramble
//
program.command('scramble <puzzle>')
  .description('scramble puzzle to a given number of turns')
  .option('-t, --turns [value]', 'length of scramble')
  .action((puzzle, options) => {
    const model = createModel(puzzle)
    const turns = options.turns && parseInt(options.turns.replace(/[^\d]/g, ''), 10)
    const scramble = model.generateScramble(turns)

    model.turn(scramble)

    console.log(json({
      puzzle,
      scramble,
      state: model.output(),
      turns: scramble.split(' ').length,
    }))
  })

program.version(version)

program.parse(process.argv)
