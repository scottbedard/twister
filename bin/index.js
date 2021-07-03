#!/usr/bin/env node
const { Cube, Dodecaminx, version } = require('../dist/index')
const { program } = require('commander')
const JSON5 = require('json5')

const json = output => JSON.stringify(output)

const createModel = (type, options) => {
  const normalizedType = type.trim().toLowerCase()
  const normalizedOptions = JSON5.parse(options)

  if (normalizedType === 'cube') {
    return new Cube(normalizedOptions)
  }
  
  if (normalizedType === 'dodecaminx') {
    return new Dodecaminx(normalizedOptions)
  }

  throw 'Invalid puzzle'
}

//
// apply
//
program
  .command('turn [puzzle] [algorithm]')
  .description('apply turns to a puzzle')
  .option('-o, --options [value]', 'puzzle options', '{}')
  .option('-s, --state [value]', 'initial state')
  .action((puzzle, alg, options) => {
    const model = createModel(puzzle, options.options)

    if (options.state) {
      model.apply(JSON5.parse(options.state))
    }

    model.turn(alg)

    console.log(json({
      options: model.options,
      puzzle,
      solved: model.test(),
      state: model.output(),
    }))
  })

//
// scramble
//
program.command('scramble [puzzle]')
  .description('scramble puzzle')
  .option('-o, --options [value]', 'puzzle options', '{}')
  .option('-t, --turns [value]', 'length of scramble')
  .action((puzzle, options) => {
    const model = createModel(puzzle, options.options)
    const turns = options.turns && parseInt(options.turns.replace(/[^\d]/g, ''), 10)
    const scramble = model.generateScramble(turns)

    model.turn(scramble)

    console.log(json({
      options: model.options,
      scramble,
      state: model.output(),
      turns: scramble.split(' ').length,
    }))
  })

program
  .name('twister')
  .version(version, '-v, --version')
  .parse(process.argv)
