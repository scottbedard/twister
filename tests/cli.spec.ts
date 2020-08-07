const exec = require('child_process').exec;
const path = require('path');

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
    })
  ));

  describe('cube', () => {
    it('scramble', async () => {
      const output = await cli(['scramble', '3x3', '--turns=5']);
      const data = JSON.parse(output.stdout);

      expect(data.puzzle).toBe('3x3');
      expect(data.scramble.split(' ').length).toBe(5);
      expect(Object.keys(data.state)).toEqual(['u', 'l', 'f', 'r', 'b', 'd']);
      expect(data.turns).toBe(5);
    });

    it('test', async () => {
      const output = await cli(['test', '2x2', '\'{"u":[0,0,2,1],"l":[2,5,1,1],"f":[3,0,2,2],"r":[4,3,0,3],"b":[4,1,4,4],"d":[5,3,5,5]}\'', '\'R U- R-\'']);
      const data = JSON.parse(output.stdout);

      expect(data.solved).toBe(true);
    });
  });
});
