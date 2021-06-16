import { DodecaminxStateSimple } from '@/puzzles/dodecaminx/types';
import { Dodecaminx } from '@/index';

const model = new Dodecaminx({ size: 2 });

const b = model.state.b[0][0][0].value;
const bl = model.state.bl[0][0][0].value;
const br = model.state.br[0][0][0].value;
const d = model.state.d[0][0][0].value;
const dbl = model.state.dbl[0][0][0].value;
const dbr = model.state.dbr[0][0][0].value;
const dl = model.state.dl[0][0][0].value;
const dr = model.state.dr[0][0][0].value;
const f = model.state.f[0][0][0].value;
const l = model.state.l[0][0][0].value;
const r = model.state.r[0][0][0].value;
const u = model.state.u[0][0][0].value;

type TurnTest = {
  only: boolean,
  result: DodecaminxStateSimple,
  size: number,
  turn: string,
};

const tests: TurnTest[] = [
  {
    only: false,
    size: 3,
    turn: 'R',
    result: {
      u: [
        [[u], [u], [u], [u], [u]],
        [[u], [u], [u], [u], [u]],
        u,
      ],
      l: [
        [[l], [l], [l], [l], [l]],
        [[l], [l], [l], [l], [l]],
        l,
      ],
      f: [
        [[f], [f], [f], [f], [f]],
        [[f], [f], [f], [f], [f]],
        f,
      ],
      r: [
        [[r], [r], [r], [r], [r]],
        [[r], [r], [r], [r], [r]],
        r,
      ],
      bl: [
        [[bl], [bl], [bl], [bl], [bl]],
        [[bl], [bl], [bl], [bl], [bl]],
        bl,
      ],
      br: [
        [[br], [br], [br], [br], [br]],
        [[br], [br], [br], [br], [br]],
        br,
      ],
      dl: [
        [[dl], [dl], [dl], [dl], [dl]],
        [[dl], [dl], [dl], [dl], [dl]],
        dl,
      ],
      dr: [
        [[dr], [dr], [dr], [dr], [dr]],
        [[dr], [dr], [dr], [dr], [dr]],
        dr,
      ],
      dbl: [
        [[dbl], [dbl], [dbl], [dbl], [dbl]],
        [[dbl], [dbl], [dbl], [dbl], [dbl]],
        dbl,
      ],
      dbr: [
        [[dbr], [dbr], [dbr], [dbr], [dbr]],
        [[dbr], [dbr], [dbr], [dbr], [dbr]],
        dbr,
      ],
      b: [
        [[b], [b], [b], [b], [b]],
        [[b], [b], [b], [b], [b]],
        b,
      ],
      d: [
        [[d], [d], [d], [d], [d]],
        [[d], [d], [d], [d], [d]],
        d,
      ],
    },
  },
];

export default tests;
