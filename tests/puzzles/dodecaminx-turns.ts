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

  //
  // megaminx F
  //
  {
    only: false,
    size: 3,
    turn: 'F',
    result: {
      ...stub5x3,
      r: [
        [[r], [r], [u], [u], [r]],
        [[r], [r], [u], [r], [r]],
        r,
      ],
      dr: [
        [[dr], [dr], [r], [r], [dr]],
        [[dr], [dr], [r], [dr], [dr]],
        dr,
      ],
      dl: [
        [[dl], [dl], [dr], [dr], [dl]],
        [[dl], [dl], [dr], [dl], [dl]],
        dl,
      ],
      l: [
        [[l], [dl], [dl], [l], [l]],
        [[l], [dl], [l], [l], [l]],
        l,
      ],
      u: [
        [[u], [u], [l], [l], [u]],
        [[u], [u], [l], [u], [u]],
        u,
      ],
    },
  },

  //
  // megaminx F-
  //
  {
    only: false,
    size: 3,
    turn: 'F-',
    result: {
      ...stub5x3,
      r: [
        [[r], [r], [dr], [dr], [r]],
        [[r], [r], [dr], [r], [r]],
        r,
      ],
      dr: [
        [[dr], [dr], [dl], [dl], [dr]],
        [[dr], [dr], [dl], [dr], [dr]],
        dr,
      ],
      dl: [
        [[dl], [dl], [l], [l], [dl]],
        [[dl], [dl], [l], [dl], [dl]],
        dl,
      ],
      l: [
        [[l], [u], [u], [l], [l]],
        [[l], [u], [l], [l], [l]],
        l,
      ],
      u: [
        [[u], [u], [r], [r], [u]],
        [[u], [u], [r], [u], [u]],
        u,
      ],
    },
  },

  //
  // megaminx F2
  //
  {
    only: false,
    size: 3,
    turn: 'F2',
    result: {
      ...stub5x3,
      r: [
        [[r], [r], [l], [l], [r]],
        [[r], [r], [l], [r], [r]],
        r,
      ],
      dr: [
        [[dr], [dr], [u], [u], [dr]],
        [[dr], [dr], [u], [dr], [dr]],
        dr,
      ],
      dl: [
        [[dl], [dl], [r], [r], [dl]],
        [[dl], [dl], [r], [dl], [dl]],
        dl,
      ],
      l: [
        [[l], [dr], [dr], [l], [l]],
        [[l], [dr], [l], [l], [l]],
        l,
      ],
      u: [
        [[u], [u], [dl], [dl], [u]],
        [[u], [u], [dl], [u], [u]],
        u,
      ],
    },
  },

  //
  // megaminx F2-
  //
  {
    only: false,
    size: 3,
    turn: 'F2-',
    result: {
      ...stub5x3,
      r: [
        [[r], [r], [dl], [dl], [r]],
        [[r], [r], [dl], [r], [r]],
        r,
      ],
      dr: [
        [[dr], [dr], [l], [l], [dr]],
        [[dr], [dr], [l], [dr], [dr]],
        dr,
      ],
      dl: [
        [[dl], [dl], [u], [u], [dl]],
        [[dl], [dl], [u], [dl], [dl]],
        dl,
      ],
      l: [
        [[l], [r], [r], [l], [l]],
        [[l], [r], [l], [l], [l]],
        l,
      ],
      u: [
        [[u], [u], [dr], [dr], [u]],
        [[u], [u], [dr], [u], [u]],
        u,
      ],
    },
  },

  //
  // megaminx DR
  //
  {
    only: false,
    size: 3,
    turn: 'DR',
    result: {
      ...stub5x3,
      d: [
        [[d], [d], [dbr], [dbr], [d]],
        [[d], [d], [dbr], [d], [d]],
        d,
      ],
      dl: [
        [[dl], [dl], [dl], [d], [d]],
        [[dl], [dl], [dl], [d], [dl]],
        dl,
      ],
      f: [
        [[f], [dl], [dl], [f], [f]],
        [[f], [dl], [f], [f], [f]],
        f,
      ],
      r: [
        [[r], [f], [f], [r], [r]],
        [[r], [f], [r], [r], [r]],
        r,
      ],
      dbr: [
        [[dbr], [dbr], [r], [r], [dbr]],
        [[dbr], [dbr], [r], [dbr], [dbr]],
        dbr,
      ],
    },
  },

  //
  // megaminx DR-
  //
  {
    only: false,
    size: 3,
    turn: 'DR-',
    result: {
      ...stub5x3,
      d: [
        [[d], [d], [dl], [dl], [d]],
        [[d], [d], [dl], [d], [d]],
        d,
      ],
      dl: [
        [[dl], [dl], [dl], [f], [f]],
        [[dl], [dl], [dl], [f], [dl]],
        dl,
      ],
      f: [
        [[f], [r], [r], [f], [f]],
        [[f], [r], [f], [f], [f]],
        f,
      ],
      r: [
        [[r], [dbr], [dbr], [r], [r]],
        [[r], [dbr], [r], [r], [r]],
        r,
      ],
      dbr: [
        [[dbr], [dbr], [d], [d], [dbr]],
        [[dbr], [dbr], [d], [dbr], [dbr]],
        dbr,
      ],
    },
  },

  //
  // megaminx DR2
  //
  {
    only: false,
    size: 3,
    turn: 'DR2',
    result: {
      ...stub5x3,
      d: [
        [[d], [d], [r], [r], [d]],
        [[d], [d], [r], [d], [d]],
        d,
      ],
      dl: [
        [[dl], [dl], [dl], [dbr], [dbr]],
        [[dl], [dl], [dl], [dbr], [dl]],
        dl,
      ],
      f: [
        [[f], [d], [d], [f], [f]],
        [[f], [d], [f], [f], [f]],
        f,
      ],
      r: [
        [[r], [dl], [dl], [r], [r]],
        [[r], [dl], [r], [r], [r]],
        r,
      ],
      dbr: [
        [[dbr], [dbr], [f], [f], [dbr]],
        [[dbr], [dbr], [f], [dbr], [dbr]],
        dbr,
      ],
    },
  },

  //
  // megaminx DR2-
  //
  {
    only: false,
    size: 3,
    turn: 'DR2-',
    result: {
      ...stub5x3,
      d: [
        [[d], [d], [f], [f], [d]],
        [[d], [d], [f], [d], [d]],
        d,
      ],
      dl: [
        [[dl], [dl], [dl], [r], [r]],
        [[dl], [dl], [dl], [r], [dl]],
        dl,
      ],
      f: [
        [[f], [dbr], [dbr], [f], [f]],
        [[f], [dbr], [f], [f], [f]],
        f,
      ],
      r: [
        [[r], [d], [d], [r], [r]],
        [[r], [d], [r], [r], [r]],
        r,
      ],
      dbr: [
        [[dbr], [dbr], [dl], [dl], [dbr]],
        [[dbr], [dbr], [dl], [dbr], [dbr]],
        dbr,
      ],
    },
  },

  //
  // megaminx DL
  //
  {
    only: false,
    size: 3,
    turn: 'DL',
    result: {
      ...stub5x3,
      dbl: [
        [[dbl], [dbl], [d], [d], [dbl]],
        [[dbl], [dbl], [d], [dbl], [dbl]],
        dbl,
      ],
      l: [
        [[l], [l], [dbl], [dbl], [l]],
        [[l], [l], [dbl], [l], [l]],
        l,
      ],
      f: [
        [[f], [f], [l], [l], [f]],
        [[f], [f], [l], [f], [f]],
        f,
      ],
      dr: [
        [[dr], [f], [f], [dr], [dr]],
        [[dr], [f], [dr], [dr], [dr]],
        dr,
      ],
      d: [
        [[d], [dr], [dr], [d], [d]],
        [[d], [dr], [d], [d], [d]],
        d,
      ],
    },
  },

  //
  // megaminx DL-
  //
  {
    only: false,
    size: 3,
    turn: 'DL-',
    result: {
      ...stub5x3,
      dbl: [
        [[dbl], [dbl], [l], [l], [dbl]],
        [[dbl], [dbl], [l], [dbl], [dbl]],
        dbl,
      ],
      l: [
        [[l], [l], [f], [f], [l]],
        [[l], [l], [f], [l], [l]],
        l,
      ],
      f: [
        [[f], [f], [dr], [dr], [f]],
        [[f], [f], [dr], [f], [f]],
        f,
      ],
      dr: [
        [[dr], [d], [d], [dr], [dr]],
        [[dr], [d], [dr], [dr], [dr]],
        dr,
      ],
      d: [
        [[d], [dbl], [dbl], [d], [d]],
        [[d], [dbl], [d], [d], [d]],
        d,
      ],
    },
  },

  //
  // megaminx DL2
  //
  {
    only: false,
    size: 3,
    turn: 'DL2',
    result: {
      ...stub5x3,
      dbl: [
        [[dbl], [dbl], [dr], [dr], [dbl]],
        [[dbl], [dbl], [dr], [dbl], [dbl]],
        dbl,
      ],
      l: [
        [[l], [l], [d], [d], [l]],
        [[l], [l], [d], [l], [l]],
        l,
      ],
      f: [
        [[f], [f], [dbl], [dbl], [f]],
        [[f], [f], [dbl], [f], [f]],
        f,
      ],
      dr: [
        [[dr], [l], [l], [dr], [dr]],
        [[dr], [l], [dr], [dr], [dr]],
        dr,
      ],
      d: [
        [[d], [f], [f], [d], [d]],
        [[d], [f], [d], [d], [d]],
        d,
      ],
    },
  },

  //
  // megaminx DL2-
  //
  {
    only: false,
    size: 3,
    turn: 'DL2-',
    result: {
      ...stub5x3,
      dbl: [
        [[dbl], [dbl], [f], [f], [dbl]],
        [[dbl], [dbl], [f], [dbl], [dbl]],
        dbl,
      ],
      l: [
        [[l], [l], [dr], [dr], [l]],
        [[l], [l], [dr], [l], [l]],
        l,
      ],
      f: [
        [[f], [f], [d], [d], [f]],
        [[f], [f], [d], [f], [f]],
        f,
      ],
      dr: [
        [[dr], [dbl], [dbl], [dr], [dr]],
        [[dr], [dbl], [dr], [dr], [dr]],
        dr,
      ],
      d: [
        [[d], [l], [l], [d], [d]],
        [[d], [l], [d], [d], [d]],
        d,
      ],
    },
  },

  //
  // megaminx DBR
  //
  {
    only: false,
    size: 3,
    turn: 'DBR',
    result: {
      ...stub5x3,
      b: [
        [[b], [b], [b], [br], [br]],
        [[b], [b], [b], [br], [b]],
        b,
      ],
      d: [
        [[d], [d], [d], [b], [b]],
        [[d], [d], [d], [b], [d]],
        d,
      ],
      dr: [
        [[d], [dr], [dr], [dr], [d]],
        [[dr], [dr], [dr], [dr], [d]],
        dr,
      ],
      r: [
        [[dr], [dr], [r], [r], [r]],
        [[dr], [r], [r], [r], [r]],
        r,
      ],
      br: [
        [[r], [r], [br], [br], [br]],
        [[r], [br], [br], [br], [br]],
        br,
      ],
    },
  },

  //
  // megaminx DBR-
  //
  {
    only: false,
    size: 3,
    turn: 'DBR-',
    result: {
      ...stub5x3,
      b: [
        [[b], [b], [b], [d], [d]],
        [[b], [b], [b], [d], [b]],
        b,
      ],
      d: [
        [[d], [d], [d], [dr], [dr]],
        [[d], [d], [d], [dr], [d]],
        d,
      ],
      dr: [
        [[r], [dr], [dr], [dr], [r]],
        [[dr], [dr], [dr], [dr], [r]],
        dr,
      ],
      r: [
        [[br], [br], [r], [r], [r]],
        [[br], [r], [r], [r], [r]],
        r,
      ],
      br: [
        [[b], [b], [br], [br], [br]],
        [[b], [br], [br], [br], [br]],
        br,
      ],
    },
  },

  //
  // megaminx DBR2
  //
  {
    only: false,
    size: 3,
    turn: 'DBR2',
    result: {
      ...stub5x3,
      b: [
        [[b], [b], [b], [r], [r]],
        [[b], [b], [b], [r], [b]],
        b,
      ],
      d: [
        [[d], [d], [d], [br], [br]],
        [[d], [d], [d], [br], [d]],
        d,
      ],
      dr: [
        [[b], [dr], [dr], [dr], [b]],
        [[dr], [dr], [dr], [dr], [b]],
        dr,
      ],
      r: [
        [[d], [d], [r], [r], [r]],
        [[d], [r], [r], [r], [r]],
        r,
      ],
      br: [
        [[dr], [dr], [br], [br], [br]],
        [[dr], [br], [br], [br], [br]],
        br,
      ],
    },
  },

  //
  // megaminx DBR2-
  //
  {
    only: false,
    size: 3,
    turn: 'DBR2-',
    result: {
      ...stub5x3,
      b: [
        [[b], [b], [b], [dr], [dr]],
        [[b], [b], [b], [dr], [b]],
        b,
      ],
      d: [
        [[d], [d], [d], [r], [r]],
        [[d], [d], [d], [r], [d]],
        d,
      ],
      dr: [
        [[br], [dr], [dr], [dr], [br]],
        [[dr], [dr], [dr], [dr], [br]],
        dr,
      ],
      r: [
        [[b], [b], [r], [r], [r]],
        [[b], [r], [r], [r], [r]],
        r,
      ],
      br: [
        [[d], [d], [br], [br], [br]],
        [[d], [br], [br], [br], [br]],
        br,
      ],
    },
  },

  //
  // megaminx DBL
  //
  {
    only: false,
    size: 3,
    turn: 'DBL',
    result: {
      ...stub5x3,
      bl: [
        [[bl], [bl], [bl], [b], [b]],
        [[bl], [bl], [bl], [b], [bl]],
        bl,
      ],
      l: [
        [[l], [l], [l], [bl], [bl]],
        [[l], [l], [l], [bl], [l]],
        l,
      ],
      dl: [
        [[l], [l], [dl], [dl], [dl]],
        [[l], [dl], [dl], [dl], [dl]],
        dl,
      ],
      d: [
        [[dl], [dl], [d], [d], [d]],
        [[dl], [d], [d], [d], [d]],
        d,
      ],
      b: [
        [[b], [d], [d], [b], [b]],
        [[b], [d], [b], [b], [b]],
        b,
      ],
    },
  },

  //
  // megaminx DBL-
  //
  {
    only: false,
    size: 3,
    turn: 'DBL-',
    result: {
      ...stub5x3,
      bl: [
        [[bl], [bl], [bl], [l], [l]],
        [[bl], [bl], [bl], [l], [bl]],
        bl,
      ],
      l: [
        [[l], [l], [l], [dl], [dl]],
        [[l], [l], [l], [dl], [l]],
        l,
      ],
      dl: [
        [[d], [d], [dl], [dl], [dl]],
        [[d], [dl], [dl], [dl], [dl]],
        dl,
      ],
      d: [
        [[b], [b], [d], [d], [d]],
        [[b], [d], [d], [d], [d]],
        d,
      ],
      b: [
        [[b], [bl], [bl], [b], [b]],
        [[b], [bl], [b], [b], [b]],
        b,
      ],
    },
  },

  //
  // megaminx DBL2
  //
  {
    only: false,
    size: 3,
    turn: 'DBL2',
    result: {
      ...stub5x3,
      bl: [
        [[bl], [bl], [bl], [d], [d]],
        [[bl], [bl], [bl], [d], [bl]],
        bl,
      ],
      l: [
        [[l], [l], [l], [b], [b]],
        [[l], [l], [l], [b], [l]],
        l,
      ],
      dl: [
        [[bl], [bl], [dl], [dl], [dl]],
        [[bl], [dl], [dl], [dl], [dl]],
        dl,
      ],
      d: [
        [[l], [l], [d], [d], [d]],
        [[l], [d], [d], [d], [d]],
        d,
      ],
      b: [
        [[b], [dl], [dl], [b], [b]],
        [[b], [dl], [b], [b], [b]],
        b,
      ],
    },
  },

  //
  // megaminx DBL2-
  //
  {
    only: false,
    size: 3,
    turn: 'DBL2-',
    result: {
      ...stub5x3,
      bl: [
        [[bl], [bl], [bl], [dl], [dl]],
        [[bl], [bl], [bl], [dl], [bl]],
        bl,
      ],
      l: [
        [[l], [l], [l], [d], [d]],
        [[l], [l], [l], [d], [l]],
        l,
      ],
      dl: [
        [[b], [b], [dl], [dl], [dl]],
        [[b], [dl], [dl], [dl], [dl]],
        dl,
      ],
      d: [
        [[bl], [bl], [d], [d], [d]],
        [[bl], [d], [d], [d], [d]],
        d,
      ],
      b: [
        [[b], [l], [l], [b], [b]],
        [[b], [l], [b], [b], [b]],
        b,
      ],
    },
  },

  //
  // megaminx D
  //
  {
    only: false,
    size: 3,
    turn: 'D',
    result: {
      ...stub5x3,
      dbl: [
        [[dbl], [dbl], [dbl], [b], [b]],
        [[dbl], [dbl], [dbl], [b], [dbl]],
        dbl,
      ],
      dl: [
        [[dbl], [dl], [dl], [dl], [dbl]],
        [[dl], [dl], [dl], [dl], [dbl]],
        dl,
      ],
      dr: [
        [[dl], [dl], [dr], [dr], [dr]],
        [[dl], [dr], [dr], [dr], [dr]],
        dr,
      ],
      dbr: [
        [[dbr], [dr], [dr], [dbr], [dbr]],
        [[dbr], [dr], [dbr], [dbr], [dbr]],
        dbr,
      ],
      b: [
        [[b], [b], [dbr], [dbr], [b]],
        [[b], [b], [dbr], [b], [b]],
        b,
      ],
    },
  },

  //
  // megaminx D-
  //
  {
    only: false,
    size: 3,
    turn: 'D-',
    result: {
      ...stub5x3,
      dbl: [
        [[dbl], [dbl], [dbl], [dl], [dl]],
        [[dbl], [dbl], [dbl], [dl], [dbl]],
        dbl,
      ],
      dl: [
        [[dr], [dl], [dl], [dl], [dr]],
        [[dl], [dl], [dl], [dl], [dr]],
        dl,
      ],
      dr: [
        [[dbr], [dbr], [dr], [dr], [dr]],
        [[dbr], [dr], [dr], [dr], [dr]],
        dr,
      ],
      dbr: [
        [[dbr], [b], [b], [dbr], [dbr]],
        [[dbr], [b], [dbr], [dbr], [dbr]],
        dbr,
      ],
      b: [
        [[b], [b], [dbl], [dbl], [b]],
        [[b], [b], [dbl], [b], [b]],
        b,
      ],
    },
  },

  //
  // megaminx D2
  //
  {
    only: false,
    size: 3,
    turn: 'D2',
    result: {
      ...stub5x3,
      dbl: [
        [[dbl], [dbl], [dbl], [dbr], [dbr]],
        [[dbl], [dbl], [dbl], [dbr], [dbl]],
        dbl,
      ],
      dl: [
        [[b], [dl], [dl], [dl], [b]],
        [[dl], [dl], [dl], [dl], [b]],
        dl,
      ],
      dr: [
        [[dbl], [dbl], [dr], [dr], [dr]],
        [[dbl], [dr], [dr], [dr], [dr]],
        dr,
      ],
      dbr: [
        [[dbr], [dl], [dl], [dbr], [dbr]],
        [[dbr], [dl], [dbr], [dbr], [dbr]],
        dbr,
      ],
      b: [
        [[b], [b], [dr], [dr], [b]],
        [[b], [b], [dr], [b], [b]],
        b,
      ],
    },
  },

  //
  // megaminx D2-
  //
  {
    only: false,
    size: 3,
    turn: 'D2-',
    result: {
      ...stub5x3,
      dbl: [
        [[dbl], [dbl], [dbl], [dr], [dr]],
        [[dbl], [dbl], [dbl], [dr], [dbl]],
        dbl,
      ],
      dl: [
        [[dbr], [dl], [dl], [dl], [dbr]],
        [[dl], [dl], [dl], [dl], [dbr]],
        dl,
      ],
      dr: [
        [[b], [b], [dr], [dr], [dr]],
        [[b], [dr], [dr], [dr], [dr]],
        dr,
      ],
      dbr: [
        [[dbr], [dbl], [dbl], [dbr], [dbr]],
        [[dbr], [dbl], [dbr], [dbr], [dbr]],
        dbr,
      ],
      b: [
        [[b], [b], [dl], [dl], [b]],
        [[b], [b], [dl], [b], [b]],
        b,
      ],
    },
  },
];

export default tests;
