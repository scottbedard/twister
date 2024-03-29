const exec = require('child_process').exec
const path = require('path')

type Output = {
  code: number,
  error: any,
  stderr: string,
  stdout: string,
}

describe('cli', () => {
  const cli = (args: string[]): Promise<Output> => new Promise(resolve => exec(
    `node ${path.resolve(__dirname, '../bin/index')} ${args.join(' ')}`,
    {},
    (error: any, stdout: string, stderr: string) => resolve({
      code: error && error.code ? error.code : 0,
      error,
      stderr,
      stdout,
    }),
  ))

  it('parse', async () => {
    const output = await cli(['parse', 'cube', 'R'])
    const data = JSON.parse(output.stdout)

    expect(data.puzzle).toBe('cube')
    expect(data.turn).toEqual({
      depth: 1,
      target: 'r',
      rotation: 1,
      wide: false,
      whole: false,
    })
  })

  it('parseAlgorithm', async () => {
    const output = await cli(['parseAlgorithm', 'cube', '"R U"'])
    const data = JSON.parse(output.stdout)

    expect(data.puzzle).toBe('cube')
    expect(data.turns).toEqual([
      {
        depth: 1,
        target: 'r',
        rotation: 1,
        wide: false,
        whole: false,
      },
      {
        depth: 1,
        target: 'u',
        rotation: 1,
        wide: false,
        whole: false,
      },
    ])
  })

  it('turn', async () => {
    // with no --state flag we should be scrambling the puzzle
    const output = await cli(['turn', 'cube', '"R U R-"'])
    const data = JSON.parse(output.stdout)
    expect(data.puzzle).toBe('cube')
    expect(data.solved).toBe(false)
    expect(data.unturn).toBe('R U- R-')
    expect(Object.keys(data.state)).toEqual(['u', 'l', 'f', 'r', 'b', 'd'])

    // now use that output to test turning from a non-solved state
    const output2 = await cli(['turn', 'cube', '"R U- R-"', `--state='${JSON.stringify(data.state)}'`])
    const data2 = JSON.parse(output2.stdout)
    expect(data2.solved).toBe(true)

    // with --test state
    const output3 = await cli([
      'turn',
      'cube',
      'R',
      `--test='${JSON.stringify({ u: [0, 0, 2, 0, 0, 2, 0, 0, 2] })}'`,
    ])

    const data3 = JSON.parse(output3.stdout)

    expect(data3.solved).toBe(true)
  })

  it('scramble', async () => {
    const output = await cli(['scramble', 'cube', '--turns=5'])
    const data = JSON.parse(output.stdout)

    expect(data.puzzle).toBe('cube')
    expect(data.turns).toBe(5)
    expect(Object.keys(data.state)).toEqual(['u', 'l', 'f', 'r', 'b', 'd'])
  })
})
