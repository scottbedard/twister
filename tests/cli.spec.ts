const exec = require('child_process').exec;
const path = require('path');

type Output = {
  code: number,
  error: any,
  stderr: string,
  stdout: string,
}

describe('cli', () => {
  function cli(args): Promise<Output> {
    return new Promise(resolve => {
      exec(
        `node ${path.resolve(__dirname, '../bin/index')} ${args.join(' ')}`,
        {},
        (error, stdout, stderr) => {
          resolve({
            code: error && error.code ? error.code : 0,
            error,
            stderr,
            stdout,
          });
        }
      );
    });
  }

  it('scramble', async () => {
    const output = await cli(['scramble', '3x3', '--turns=5']);
    const data = JSON.parse(output.stdout);

    expect(data.puzzle).toBe('3x3');
    expect(data.scramble.split(' ').length).toBe(5);
    expect(Object.keys(data.state)).toEqual(['u', 'l', 'f', 'r', 'b', 'd']);
    expect(data.turns).toBe(5);
  });
});
