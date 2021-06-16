import { Dodecaminx } from '@/index';

describe('Dodecaminx', () => {
  it('apply', () => {
    const model = new Dodecaminx({ size: 3 });

    model.apply({
      f: [
        [[-1], [-2], [-3], [-4], [-5]],
        [[-6], [-7], [-8], [-9], [-10]],
        -11,
      ],
    });

    expect(model.state.f[0][0][0].value).toBe(-1);
    expect(model.state.f[0][1][0].value).toBe(-2);
    expect(model.state.f[0][2][0].value).toBe(-3);
    expect(model.state.f[0][3][0].value).toBe(-4);
    expect(model.state.f[0][4][0].value).toBe(-5);
    expect(model.state.f[1][0][0].value).toBe(-6);
    expect(model.state.f[1][1][0].value).toBe(-7);
    expect(model.state.f[1][2][0].value).toBe(-8);
    expect(model.state.f[1][3][0].value).toBe(-9);
    expect(model.state.f[1][4][0].value).toBe(-10);
    expect(model.state.f[2].value).toBe(-11);
  });
});
