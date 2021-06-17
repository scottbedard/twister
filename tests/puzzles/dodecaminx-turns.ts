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

  //
  // megaminx U
  //
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

  //
  // megaminx U-
  //
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

  //
  // megaminx U2
  //
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

  //
  // megaminx U2-
  //
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

  //
  // megaminx R
  //
  {
    only: false,
    size: 3,
    turn: 'R',
    result: {
      ...stub5x3,
      dbr: [
        [[dbr], [dbr], [dbr], [br], [br]],
        [[dbr], [dbr], [dbr], [br], [dbr]],
        dbr,
      ],
      dr: [
        [[dr], [dr], [dr], [dbr], [dbr]],
        [[dr], [dr], [dr], [dbr], [dr]],
        dr,
      ],
      f: [
        [[dr], [dr], [f], [f], [f]],
        [[dr], [f], [f], [f], [f]],
        f,
      ],
      u: [
        [[u], [f], [f], [u], [u]],
        [[u], [f], [u], [u], [u]],
        u,
      ],
      br: [
        [[br], [u], [u], [br], [br]],
        [[br], [u], [br], [br], [br]],
        br,
      ],
    },
  },

  //
  // megaminx R-
  //
  {
    only: false,
    size: 3,
    turn: 'R-',
    result: {
      ...stub5x3,
      dbr: [
        [[dbr], [dbr], [dbr], [dr], [dr]],
        [[dbr], [dbr], [dbr], [dr], [dbr]],
        dbr,
      ],
      dr: [
        [[dr], [dr], [dr], [f], [f]],
        [[dr], [dr], [dr], [f], [dr]],
        dr,
      ],
      f: [
        [[u], [u], [f], [f], [f]],
        [[u], [f], [f], [f], [f]],
        f,
      ],
      u: [
        [[u], [br], [br], [u], [u]],
        [[u], [br], [u], [u], [u]],
        u,
      ],
      br: [
        [[br], [dbr], [dbr], [br], [br]],
        [[br], [dbr], [br], [br], [br]],
        br,
      ],
    },
  },

  //
  // megaminx R2
  //
  {
    only: false,
    size: 3,
    turn: 'R2',
    result: {
      ...stub5x3,
      dbr: [
        [[dbr], [dbr], [dbr], [u], [u]],
        [[dbr], [dbr], [dbr], [u], [dbr]],
        dbr,
      ],
      dr: [
        [[dr], [dr], [dr], [br], [br]],
        [[dr], [dr], [dr], [br], [dr]],
        dr,
      ],
      f: [
        [[dbr], [dbr], [f], [f], [f]],
        [[dbr], [f], [f], [f], [f]],
        f,
      ],
      u: [
        [[u], [dr], [dr], [u], [u]],
        [[u], [dr], [u], [u], [u]],
        u,
      ],
      br: [
        [[br], [f], [f], [br], [br]],
        [[br], [f], [br], [br], [br]],
        br,
      ],
    },
  },

  //
  // megaminx R2-
  //
  {
    only: false,
    size: 3,
    turn: 'R2-',
    result: {
      ...stub5x3,
      dbr: [
        [[dbr], [dbr], [dbr], [f], [f]],
        [[dbr], [dbr], [dbr], [f], [dbr]],
        dbr,
      ],
      dr: [
        [[dr], [dr], [dr], [u], [u]],
        [[dr], [dr], [dr], [u], [dr]],
        dr,
      ],
      f: [
        [[br], [br], [f], [f], [f]],
        [[br], [f], [f], [f], [f]],
        f,
      ],
      u: [
        [[u], [dbr], [dbr], [u], [u]],
        [[u], [dbr], [u], [u], [u]],
        u,
      ],
      br: [
        [[br], [dr], [dr], [br], [br]],
        [[br], [dr], [br], [br], [br]],
        br,
      ],
    },
  },

  //
  // megaminx L
  //
  {
    only: false,
    size: 3,
    turn: 'L',
    result: {
      ...stub5x3,
      u: [
        [[u], [u], [u], [bl], [bl]],
        [[u], [u], [u], [bl], [u]],
        u,
      ],
      f: [
        [[f], [f], [f], [u], [u]],
        [[f], [f], [f], [u], [f]],
        f,
      ],
      dl: [
        [[dl], [f], [f], [dl], [dl]],
        [[dl], [f], [dl], [dl], [dl]],
        dl,
      ],
      dbl: [
        [[dbl], [dl], [dl], [dbl], [dbl]],
        [[dbl], [dl], [dbl], [dbl], [dbl]],
        dbl,
      ],
      bl: [
        [[bl], [bl], [dbl], [dbl], [bl]],
        [[bl], [bl], [dbl], [bl], [bl]],
        bl,
      ],
    },
  },

  //
  // megaminx L-
  //
  {
    only: false,
    size: 3,
    turn: 'L-',
    result: {
      ...stub5x3,
      u: [
        [[u], [u], [u], [f], [f]],
        [[u], [u], [u], [f], [u]],
        u,
      ],
      f: [
        [[f], [f], [f], [dl], [dl]],
        [[f], [f], [f], [dl], [f]],
        f,
      ],
      dl: [
        [[dl], [dbl], [dbl], [dl], [dl]],
        [[dl], [dbl], [dl], [dl], [dl]],
        dl,
      ],
      dbl: [
        [[dbl], [bl], [bl], [dbl], [dbl]],
        [[dbl], [bl], [dbl], [dbl], [dbl]],
        dbl,
      ],
      bl: [
        [[bl], [bl], [u], [u], [bl]],
        [[bl], [bl], [u], [bl], [bl]],
        bl,
      ],
    },
  },

  //
  // megaminx L2
  //
  {
    only: false,
    size: 3,
    turn: 'L2',
    result: {
      ...stub5x3,
      u: [
        [[u], [u], [u], [dbl], [dbl]],
        [[u], [u], [u], [dbl], [u]],
        u,
      ],
      f: [
        [[f], [f], [f], [bl], [bl]],
        [[f], [f], [f], [bl], [f]],
        f,
      ],
      dl: [
        [[dl], [u], [u], [dl], [dl]],
        [[dl], [u], [dl], [dl], [dl]],
        dl,
      ],
      dbl: [
        [[dbl], [f], [f], [dbl], [dbl]],
        [[dbl], [f], [dbl], [dbl], [dbl]],
        dbl,
      ],
      bl: [
        [[bl], [bl], [dl], [dl], [bl]],
        [[bl], [bl], [dl], [bl], [bl]],
        bl,
      ],
    },
  },

  //
  // megaminx L2
  //
  {
    only: false,
    size: 3,
    turn: 'L2-',
    result: {
      ...stub5x3,
      u: [
        [[u], [u], [u], [dl], [dl]],
        [[u], [u], [u], [dl], [u]],
        u,
      ],
      f: [
        [[f], [f], [f], [dbl], [dbl]],
        [[f], [f], [f], [dbl], [f]],
        f,
      ],
      dl: [
        [[dl], [bl], [bl], [dl], [dl]],
        [[dl], [bl], [dl], [dl], [dl]],
        dl,
      ],
      dbl: [
        [[dbl], [u], [u], [dbl], [dbl]],
        [[dbl], [u], [dbl], [dbl], [dbl]],
        dbl,
      ],
      bl: [
        [[bl], [bl], [f], [f], [bl]],
        [[bl], [bl], [f], [bl], [bl]],
        bl,
      ],
    },
  },
];

export default tests;
