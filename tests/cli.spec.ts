const exec = require('child_process').exec;
const path = require('path');

type Output = {
  code: number,
  error: any,
  stderr: string,
  stdout: string,
};

describe('cli', () => {
  const cli = (args: string[]): Promise<Output> => new Promise((resolve) => exec(
    `node ${path.resolve(__dirname, '../bin/index')} ${args.join(' ')}`,
    {},
    (error: any, stdout: string, stderr: string) => resolve({
      code: error && error.code ? error.code : 0,
      error,
      stderr,
      stdout,
    }),
  ));

  it('apply', async () => {
    const output1 = await cli(['apply', 'cube3', '"R U R-"']);
    const data1 = JSON.parse(output1.stdout);

    expect(data1.puzzle).toBe('cube3');
    expect(data1.solved).toBe(false);
    expect(Object.keys(data1.state)).toEqual(['u', 'l', 'f', 'r', 'b', 'd']);

    const output2 = await cli(['apply', 'cube3', '"R U- R-"', `--state='${JSON.stringify(data1.state)}'`]);
    const data2 = JSON.parse(output2.stdout);

    expect(data2.solved).toBe(true);
  });

  it('scramble', async () => {
    const output = await cli(['scramble', 'cube3', '--depth=5']);
    const data = JSON.parse(output.stdout);

    expect(data.puzzle).toBe('cube3');
    expect(data.scramble.split(' ').length).toBe(5);
    expect(Object.keys(data.state)).toEqual(['u', 'l', 'f', 'r', 'b', 'd']);
  });
});
