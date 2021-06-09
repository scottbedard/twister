const [y, o, b, r, g, w] = [0, 1, 2, 3, 4, 5];

export default {
  'U': {
    u: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    l: [
      b, b, b,
      o, o, o,
      o, o, o,
    ],
    f: [
      r, r, r,
      b, b, b,
      b, b, b,
    ],
    r: [
      g, g, g,
      r, r, r,
      r, r, r,
    ],
    b: [
      o, o, o,
      g, g, g,
      g, g, g,
    ],
    d: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
  },
  'U-': {
    u: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    l: [
      g, g, g,
      o, o, o,
      o, o, o,
    ],
    f: [
      o, o, o,
      b, b, b,
      b, b, b,
    ],
    r: [
      b, b, b,
      r, r, r,
      r, r, r,
    ],
    b: [
      r, r, r,
      g, g, g,
      g, g, g,
    ],
    d: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
  },
  'U2': {
    u: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    l: [
      r, r, r,
      o, o, o,
      o, o, o,
    ],
    f: [
      g, g, g,
      b, b, b,
      b, b, b,
    ],
    r: [
      o, o, o,
      r, r, r,
      r, r, r,
    ],
    b: [
      b, b, b,
      g, g, g,
      g, g, g,
    ],
    d: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
  },
  '3U': {
    u: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    l: [
      o, o, o,
      o, o, o,
      b, b, b,
    ],
    f: [
      b, b, b,
      b, b, b,
      r, r, r,
    ],
    r: [
      r, r, r,
      r, r, r,
      g, g, g,
    ],
    b: [
      g, g, g,
      g, g, g,
      o, o, o,
    ],
    d: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
  },
  '3U-': {
    u: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    l: [
      o, o, o,
      o, o, o,
      g, g, g,
    ],
    f: [
      b, b, b,
      b, b, b,
      o, o, o,
    ],
    r: [
      r, r, r,
      r, r, r,
      b, b, b,
    ],
    b: [
      g, g, g,
      g, g, g,
      r, r, r,
    ],
    d: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
  },
  '3U2': {
    u: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    l: [
      o, o, o,
      o, o, o,
      r, r, r,
    ],
    f: [
      b, b, b,
      b, b, b,
      g, g, g,
    ],
    r: [
      r, r, r,
      r, r, r,
      o, o, o,
    ],
    b: [
      g, g, g,
      g, g, g,
      b, b, b,
    ],
    d: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
  },
  'L': {
    u: [
      g, y, y,
      g, y, y,
      g, y, y,
    ],
    l: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    f: [
      y, b, b,
      y, b, b,
      y, b, b,
    ],
    r: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    b: [
      g, g, w,
      g, g, w,
      g, g, w,
    ],
    d: [
      b, w, w,
      b, w, w,
      b, w, w,
    ],
  },
  'L-': {
    u: [
      b, y, y,
      b, y, y,
      b, y, y,
    ],
    l: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    f: [
      w, b, b,
      w, b, b,
      w, b, b,
    ],
    r: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    b: [
      g, g, y,
      g, g, y,
      g, g, y,
    ],
    d: [
      g, w, w,
      g, w, w,
      g, w, w,
    ],
  },
  'L2': {
    u: [
      w, y, y,
      w, y, y,
      w, y, y,
    ],
    l: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    f: [
      g, b, b,
      g, b, b,
      g, b, b,
    ],
    r: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    b: [
      g, g, b,
      g, g, b,
      g, g, b,
    ],
    d: [
      y, w, w,
      y, w, w,
      y, w, w,
    ],
  },
  'F': {
    u: [
      y, y, y,
      y, y, y,
      o, o, o,
    ],
    l: [
      o, o, w,
      o, o, w,
      o, o, w,
    ],
    f: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    r: [
      y, r, r,
      y, r, r,
      y, r, r,
    ],
    b: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    d: [
      r, r, r,
      w, w, w,
      w, w, w,
    ],
  },
  'F-': {
    u: [
      y, y, y,
      y, y, y,
      r, r, r,
    ],
    l: [
      o, o, y,
      o, o, y,
      o, o, y,
    ],
    f: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    r: [
      w, r, r,
      w, r, r,
      w, r, r,
    ],
    b: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    d: [
      o, o, o,
      w, w, w,
      w, w, w,
    ],
  },
  'F2': {
    u: [
      y, y, y,
      y, y, y,
      w, w, w,
    ],
    l: [
      o, o, r,
      o, o, r,
      o, o, r,
    ],
    f: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    r: [
      o, r, r,
      o, r, r,
      o, r, r,
    ],
    b: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    d: [
      y, y, y,
      w, w, w,
      w, w, w,
    ],
  },
  'R': {
    u: [
      y, y, b,
      y, y, b,
      y, y, b,
    ],
    l: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    f: [
      b, b, w,
      b, b, w,
      b, b, w,
    ],
    r: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    b: [
      y, g, g,
      y, g, g,
      y, g, g,
    ],
    d: [
      w, w, g,
      w, w, g,
      w, w, g,
    ],
  },
  'R-': {
    u: [
      y, y, g,
      y, y, g,
      y, y, g,
    ],
    l: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    f: [
      b, b, y,
      b, b, y,
      b, b, y,
    ],
    r: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    b: [
      w, g, g,
      w, g, g,
      w, g, g,
    ],
    d: [
      w, w, b,
      w, w, b,
      w, w, b,
    ],
  },
  'R2': {
    u: [
      y, y, w,
      y, y, w,
      y, y, w,
    ],
    l: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    f: [
      b, b, g,
      b, b, g,
      b, b, g,
    ],
    r: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    b: [
      b, g, g,
      b, g, g,
      b, g, g,
    ],
    d: [
      w, w, y,
      w, w, y,
      w, w, y,
    ],
  },
  'Rw': {
    u: [
      y, b, b,
      y, b, b,
      y, b, b,
    ],
    l: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    f: [
      b, w, w,
      b, w, w,
      b, w, w,
    ],
    r: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    b: [
      y, y, g,
      y, y, g,
      y, y, g,
    ],
    d: [
      w, g, g,
      w, g, g,
      w, g, g,
    ],
  },
  'Rw-': {
    u: [
      y, g, g,
      y, g, g,
      y, g, g,
    ],
    l: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    f: [
      b, y, y,
      b, y, y,
      b, y, y,
    ],
    r: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    b: [
      w, w, g,
      w, w, g,
      w, w, g,
    ],
    d: [
      w, b, b,
      w, b, b,
      w, b, b,
    ],
  },

  'Rw2': {
    u: [
      y, w, w,
      y, w, w,
      y, w, w,
    ],
    l: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    f: [
      b, g, g,
      b, g, g,
      b, g, g,
    ],
    r: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    b: [
      b, b, g,
      b, b, g,
      b, b, g,
    ],
    d: [
      w, y, y,
      w, y, y,
      w, y, y,
    ],
  },
  'B': {
    u: [
      r, r, r,
      y, y, y,
      y, y, y,
    ],
    l: [
      y, o, o,
      y, o, o,
      y, o, o,
    ],
    f: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    r: [
      r, r, w,
      r, r, w,
      r, r, w,
    ],
    b: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    d: [
      w, w, w,
      w, w, w,
      o, o, o,
    ],
  },
  'B-': {
    u: [
      o, o, o,
      y, y, y,
      y, y, y,
    ],
    l: [
      w, o, o,
      w, o, o,
      w, o, o,
    ],
    f: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    r: [
      r, r, y,
      r, r, y,
      r, r, y,
    ],
    b: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    d: [
      w, w, w,
      w, w, w,
      r, r, r,
    ],
  },
  'B2': {
    u: [
      w, w, w,
      y, y, y,
      y, y, y,
    ],
    l: [
      r, o, o,
      r, o, o,
      r, o, o,
    ],
    f: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    r: [
      r, r, o,
      r, r, o,
      r, r, o,
    ],
    b: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    d: [
      w, w, w,
      w, w, w,
      y, y, y,
    ],
  },
  'D': {
    u: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    l: [
      o, o, o,
      o, o, o,
      g, g, g,
    ],
    f: [
      b, b, b,
      b, b, b,
      o, o, o,
    ],
    r: [
      r, r, r,
      r, r, r,
      b, b, b,
    ],
    b: [
      g, g, g,
      g, g, g,
      r, r, r,
    ],
    d: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
  },
  'D-': {
    u: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    l: [
      o, o, o,
      o, o, o,
      b, b, b,
    ],
    f: [
      b, b, b,
      b, b, b,
      r, r, r,
    ],
    r: [
      r, r, r,
      r, r, r,
      g, g, g,
    ],
    b: [
      g, g, g,
      g, g, g,
      o, o, o,
    ],
    d: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
  },
  'D2': {
    u: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    l: [
      o, o, o,
      o, o, o,
      r, r, r,
    ],
    f: [
      b, b, b,
      b, b, b,
      g, g, g,
    ],
    r: [
      r, r, r,
      r, r, r,
      o, o, o,
    ],
    b: [
      g, g, g,
      g, g, g,
      b, b, b,
    ],
    d: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
  },
  'X': {
    u: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    l: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    f: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
    r: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    b: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    d: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
  },
  'X-': {
    u: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    l: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    f: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    r: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    b: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
    d: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
  },
  'X2': {
    u: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
    l: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    f: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    r: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    b: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    d: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
  },
  'Y': {
    u: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    l: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    f: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    r: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    b: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    d: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
  },
  'Y-': {
    u: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    l: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    f: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    r: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    b: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    d: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
  },
  'Y2': {
    u: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    l: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    f: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    r: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    b: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    d: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
  },
  'Z': {
    u: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    l: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
    f: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    r: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    b: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    d: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
  },
  'Z-': {
    u: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    l: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
    f: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    r: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
    b: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    d: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
  },
  'Z2': {
    u: [
      w, w, w,
      w, w, w,
      w, w, w,
    ],
    l: [
      r, r, r,
      r, r, r,
      r, r, r,
    ],
    f: [
      b, b, b,
      b, b, b,
      b, b, b,
    ],
    r: [
      o, o, o,
      o, o, o,
      o, o, o,
    ],
    b: [
      g, g, g,
      g, g, g,
      g, g, g,
    ],
    d: [
      y, y, y,
      y, y, y,
      y, y, y,
    ],
  },
};
