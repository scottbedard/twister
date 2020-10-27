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
      const state = '{"u":[0,0,2,1],"l":[2,5,1,1],"f":[3,0,2,2],"r":[4,3,0,3],"b":[4,1,4,4],"d":[5,3,5,5]}';
      const solution = 'R U- R-';
      const output = await cli(['test', '2x2', `'${state}'`, `'${solution}'`]);
      const data = JSON.parse(output.stdout);

      expect(data.solved).toBe(true);
    });
  });

  describe('dodecaminx', () => {
    it('scramble', async () => {
      const output = await cli(['scramble', 'dodecaminx2', '--turns=5']);
      const data = JSON.parse(output.stdout);

      expect(data.puzzle).toBe('dodecaminx2');
      expect(data.scramble.split(' ').length).toBe(5);
      expect(data.turns).toBe(5);
    });

    it('test', async () => {
      const state = '{"b":[[[5],[4],[6],[6],[0]],[[11],[10],[10],[4],[0]],0],"bl":[[[0],[8],[7],[5],[0]],[[11],[8],[5],[0],[1]],1],"br":[[[5],[10],[11],[9],[2]],[[7],[10],[9],[9],[5]],2],"d":[[[9],[3],[3],[8],[9]],[[3],[3],[1],[3],[7]],3],"dbl":[[[1],[10],[9],[7],[4]],[[1],[5],[2],[7],[8]],4],"dbr":[[[3],[8],[7],[2],[11]],[[3],[5],[0],[9],[5]],5],"dl":[[[5],[1],[4],[1],[6]],[[0],[6],[4],[6],[6]],6],"dr":[[[10],[7],[2],[6],[5]],[[4],[7],[4],[6],[3]],7],"f":[[[8],[3],[0],[0],[11]],[[11],[9],[0],[8],[11]],8],"l":[[[8],[1],[3],[4],[7]],[[8],[7],[9],[10],[2]],9],"r":[[[2],[10],[4],[10],[9]],[[8],[4],[10],[2],[2]],10],"u":[[[11],[1],[11],[2],[6]],[[1],[1],[2],[6],[11]],11]}';
      const solution = 'U- R F L DBL2- BL2 DBL DL2- DBL2- D2- DBL2 B2 D2 B2 DBR BR DBR2- D DR- DL L DL F2 R2- DBR2 R2 DBR-';
      const output = await cli(['test', 'dodecaminx2', `'${state}'`, `'${solution}'`]);
      const data = JSON.parse(output.stdout);

      expect(data.solved).toBe(true);
    });
  });
});
