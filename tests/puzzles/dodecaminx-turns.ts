import { Dodecaminx } from '@/index';
import { DodecaminxStateSimple } from '@/puzzles/dodecaminx/types';

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

//
// megaminx
//
const stub5x3: DodecaminxStateSimple = {
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
};

//
// tests
//
const tests: TurnTest[] = [
  // {
  //   only: false,
  //   size: 3,
  //   turn: '',
  //   result: {
  //     ...stub5x3,
  //   },
  // },
  {
    only: false,
    size: 3,
    turn: 'U',
    result: {
      ...stub5x3,
      l: [
        [[f], [f], [l], [l], [l]],
        [[f], [l], [l], [l], [l]],
        l,
      ],
      f: [
        [[r], [f], [f], [f], [r]],
        [[f], [f], [f], [f], [r]],
        f,
      ],
      r: [
        [[r], [r], [r], [br], [br]],
        [[r], [r], [r], [br], [r]],
        r,
      ],
      bl: [
        [[bl], [l], [l], [bl], [bl]],
        [[bl], [l], [bl], [bl], [bl]],
        bl,
      ],
      br: [
        [[br], [br], [bl], [bl], [br]],
        [[br], [br], [bl], [br], [br]],
        br,
      ],
    },
  },
  {
    only: false,
    size: 3,
    turn: 'U-',
    result: {
      ...stub5x3,
      l: [
        [[bl], [bl], [l], [l], [l]],
        [[bl], [l], [l], [l], [l]],
        l,
      ],
      f: [
        [[l], [f], [f], [f], [l]],
        [[f], [f], [f], [f], [l]],
        f,
      ],
      r: [
        [[r], [r], [r], [f], [f]],
        [[r], [r], [r], [f], [r]],
        r,
      ],
      bl: [
        [[bl], [br], [br], [bl], [bl]],
        [[bl], [br], [bl], [bl], [bl]],
        bl,
      ],
      br: [
        [[br], [br], [r], [r], [br]],
        [[br], [br], [r], [br], [br]],
        br,
      ],
    },
  },
  {
    only: false,
    size: 3,
    turn: 'U2',
    result: {
      ...stub5x3,
      l: [
        [[r], [r], [l], [l], [l]],
        [[r], [l], [l], [l], [l]],
        l,
      ],
      f: [
        [[br], [f], [f], [f], [br]],
        [[f], [f], [f], [f], [br]],
        f,
      ],
      r: [
        [[r], [r], [r], [bl], [bl]],
        [[r], [r], [r], [bl], [r]],
        r,
      ],
      bl: [
        [[bl], [f], [f], [bl], [bl]],
        [[bl], [f], [bl], [bl], [bl]],
        bl,
      ],
      br: [
        [[br], [br], [l], [l], [br]],
        [[br], [br], [l], [br], [br]],
        br,
      ],
    },
  },
  {
    only: false,
    size: 3,
    turn: 'U2-',
    result: {
      ...stub5x3,
      l: [
        [[br], [br], [l], [l], [l]],
        [[br], [l], [l], [l], [l]],
        l,
      ],
      f: [
        [[bl], [f], [f], [f], [bl]],
        [[f], [f], [f], [f], [bl]],
        f,
      ],
      r: [
        [[r], [r], [r], [l], [l]],
        [[r], [r], [r], [l], [r]],
        r,
      ],
      bl: [
        [[bl], [r], [r], [bl], [bl]],
        [[bl], [r], [bl], [bl], [bl]],
        bl,
      ],
      br: [
        [[br], [br], [f], [f], [br]],
        [[br], [br], [f], [br], [br]],
        br,
      ],
    },
  },
];

export default tests;
