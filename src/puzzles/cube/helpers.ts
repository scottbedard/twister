import {
    CubeFace,
    CubeState,
    CubeSticker,
    CubeStickerValue,
    CubeTurn,
} from './types';

import {
    first,
    makeArray,
    reverse,
    slice,
    splice,
} from '../../utils/array';

/**
 * Chunk a face array into columns.
 *
 * [                [
 *     1, 2, 3,         [1, 4, 7],
 *     4, 5, 6,  ->     [2, 5, 8],
 *     7, 8, 9,         [3, 6, 9],
 * ]                ]
 *
 * @param  {T[]}    face
 *
 * @return {T[][]}
 */
export function chunkCols<T>(face: T[]): T[][] {
    return flip(chunkRows(face));
}

/**
 * Chunk a face array into rows.
 *
 * [                [
 *     1, 2, 3,         [1, 2, 3],
 *     4, 5, 6,  ->     [4, 5, 6], 
 *     7, 8, 9,         [7, 8, 9],
 * ]                ]
 *
 * @param  {T[]}    face
 *
 * @return {T[][]}
 */
export function chunkRows<T>(face: T[]): T[][] {
    const size = Math.sqrt(face.length);

    return makeArray(size).map((val, i) => {
        const start = i * size;
        return slice(face, start, start + size);
    });
}

/**
 * Create an array of stickers.
 *
 * @param {CubeStickerValue}    value 
 * @param {number}              length
 *
 * @return {CubeSticker[]} 
 */
export function createFace(value: CubeStickerValue, length: number): CubeSticker[] {
    return makeArray(length).map((x, i): CubeSticker => {
        return {
            data: null,
            originalIndex: i,
            value,
        };
    })
}

/**
 * Flatten an array of columns.
 *
 * [                    [
 *     [1, 4, 7],           1, 2, 3,
 *     [2, 5, 8],  ->       4, 5, 6,
 *     [3, 6, 9],           7, 8, 9,
 * ]                    ]
 *
 * @param  {T[][]}  cols
 *
 * @return {T[]}
 */
export function flattenCols<T>(cols: T[][]): T[] {
    return flattenRows(flip(cols));
}

/**
 * Flatten an array of rows.
 *
 * [                    [
 *     [1, 2, 3],           1, 2, 3,
 *     [4, 5, 6],  ->       4, 5, 6,
 *     [7, 8, 9],           7, 8, 9,
 * ]                    ]
 *
 * @param  {T[][]} rows
 *
 * @return {T[]}
 */
export function flattenRows<T>(rows: T[][]): T[] {
   return rows.reduce((acc, row) => acc.concat(row), []);
}

/**
 * Convert row and column chunks. A good way to visualize
 * this operation is to imagine holding a card by the
 * top-left / bottom-right corners, and flipping it over.
 *
 * [                    [
 *     [1, 2, 3],           [1, 4, 7],
 *     [4, 5, 6],  ->       [2, 5, 8],    
 *     [7, 8, 9],           [3, 6, 9],
 * ]                    ]
 *
 * @param  {T[][]}  chunks
 *
 * @return {T[]}
 */
export function flip<T>(chunks: T[][]): T[][] {
    return chunks[0].map((x, i) => chunks.map(chunk => chunk[i]));
}

/**
 * Get the face being turned.
 *
 * @param turn 
 */
export function getFace(turn: CubeTurn): CubeFace {
    const { target } = turn;

    switch (target) {
        case 'U': return 'U';
        case 'L': return 'L';
        case 'F': return 'F';
        case 'R': return 'R';
        case 'B': return 'B';
        case 'D': return 'D';
    }
}

/**
 * Itterate over the slices of a turn.
 *
 * @param  {CubeTurn}   turn 
 * @param  {Function}   fn
 *
 * @return {void}
 */
export function loopSlices(turn: CubeTurn, fn: Function) {
    const { depth, wide } = turn;

    for (let i = depth, end = wide ? 0 : depth - 1; i > end; i--) {
        fn(i, -i, i - 1);
    }
}

/**
 * Parse a turn.
 *
 * @param {string}  turn
 *
 * @return {CubeTurn} 
 */
export function parseTurn(turn: string): CubeTurn {
    const result = turn.match(/^(\d)*([ulfrbdxyzULFRBDXYZ]){1}(w)*(['-2])*$/);

    if (result === null) {
        throw new Error(`Invalid turn: ${turn}`);
    }

    const modifier: string = result[4];
    const target: string = result[2];
    const wide: boolean = Boolean(result[3]);

    let depth: number = result[1] ? parseInt(result[1], 10) : 1;

    if (wide) {
        depth = Math.max(2, depth);
    }

    let rotation = 1;

    if (modifier === '-' || modifier === '\'') {
        rotation = -1;
    } else if (modifier === '2') {
        rotation = 2;
    }

    return { depth, rotation, target, wide };
}

/**
 * Rotate a face array.
 *
 * @param {CubeSticker[]}   face
 * @param {number}          rotation
 *
 * @param {CubeSticker[]} 
 */
export function rotate(arr: CubeSticker[], rotation: number) {
    if (rotation === -1) {
        return flattenRows(reverse(chunkCols(arr)));
    }
    
    if (rotation === 2) {
        return reverse(arr);
    }
    
    return flattenCols(reverse(chunkRows(arr)));
}


/**
 * Slice a cube into each face's rows and columns.
 *
 * @param  {CubeState}   cube
 *
 * @return {object}
 */
export function sliceCube(state: CubeState) {
    return {
        U: { r: chunkRows(state.U), c: chunkCols(state.U) },
        L: { r: chunkRows(state.L), c: chunkCols(state.L) },
        F: { r: chunkRows(state.F), c: chunkCols(state.F) },
        R: { r: chunkRows(state.R), c: chunkCols(state.R) },
        B: { r: chunkRows(state.B), c: chunkCols(state.B) },
        D: { r: chunkRows(state.D), c: chunkCols(state.D) },
    };
}

/**
 * Turn a cube along the X axis.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export function turnCubeX({ U, L, F, R, B, D }: CubeState, { rotation }: CubeTurn): CubeState {
    if (rotation === -1) {
        return {
            U: reverse(B),
            L: rotate(L, 1),
            F: slice(U),
            R: rotate(R, -1),
            B: reverse(D),
            D: slice(F),
        };
    }

    if (rotation === 2) {
        return {
            U: slice(D),
            L: rotate(L, 2),
            F: reverse(B),
            R: rotate(R, 2),
            B: reverse(F),
            D: slice(U),
        };
    }

    return {
        U: slice(F),
        L: rotate(L, -1),
        F: slice(D),
        R: rotate(R, 1),
        B: reverse(U),
        D: reverse(B),
    }
}

/**
 * Turn a cube along the Y axis.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export function turnCubeY({ U, L, F, R, B, D }: CubeState, { rotation }: CubeTurn): CubeState {
    if (rotation === -1) {
        return {
            U: rotate(U, -1),
            L: slice(B),
            F: slice(L),
            R: slice(F),
            B: slice(R),
            D: rotate(D, 1),
        };
    }

    if (rotation === 2) {
        return {
            U: rotate(U, 2),
            L: slice(R),
            F: slice(B),
            R: slice(L),
            B: slice(F),
            D: rotate(D, 2),
        };
    }

    return {
        U: rotate(U, 1),
        L: slice(F),
        F: slice(R),
        R: slice(B),
        B: slice(L),
        D: rotate(D, -1),
    };
}

/**
 * Turn a cube along the Z axis.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export function turnCubeZ({ U, L, F, R, B, D }: CubeState, { rotation }: CubeTurn): CubeState {
    if (rotation === -1) {
        return {
            U: rotate(R, -1),
            L: rotate(U, -1),
            F: rotate(F, -1),
            R: rotate(D, -1),
            B: rotate(B, 1),
            D: rotate(L, -1),
        }
    }

    if (rotation === 2) {
        return {
                           U: reverse(D),
            L: reverse(R), F: rotate(F, 2), R: reverse(L), B: rotate(B, 2),
                           D: reverse(U),
        }
    }
    
    return {
        U: rotate(L, 1),
        L: rotate(D, 1),
        F: rotate(F, 1),
        R: rotate(U, 1),
        B: rotate(B, -1),
        D: rotate(R, 1),
    };
}

/**
 * Turn slices for a B turn.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export function turnSliceB(state: CubeState, turn: CubeTurn) {
    const slicedCube = sliceCube(state);

    loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
        const oldU = first(slicedCube.U.r, iSubOne);
        const oldL = first(slicedCube.L.c, iSubOne);
        const oldD = first(slicedCube.D.r, negI);
        const oldR = first(slicedCube.R.c, negI);
        
        let newU, newL, newD, newR;

        if (turn.rotation === 2) {
            // 180
            newU = reverse(oldD);
            newL = reverse(oldR);
            newD = reverse(oldU);
            newR = reverse(oldL);
        } else if (turn.rotation === -1) {
            // 90 counter-clockwise
            newU = reverse(oldL);
            newL = oldD;
            newD = reverse(oldR);
            newR = oldU;
        } else {
            // 90 clockwise
            newU = oldR;
            newL = reverse(oldU);
            newD = oldL;
            newR = reverse(oldD);
        }

        splice(slicedCube.U.r, i - 1, 1, newU);
        splice(slicedCube.L.c, i - 1, 1, newL);
        splice(slicedCube.D.r, negI, 1, newD);
        splice(slicedCube.R.c, negI, 1, newR);

        state.U = flattenRows(slicedCube.U.r);
        state.L = flattenCols(slicedCube.L.c);
        state.D = flattenRows(slicedCube.D.r);
        state.R = flattenCols(slicedCube.R.c);
    });
}

/**
 * Turn slices for a D turn.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export function turnSliceD(state: CubeState, turn: CubeTurn) {
    const slicedCube = sliceCube(state);

    loopSlices(turn, (i: number, negI: number) => {
        const oldF = first(slicedCube.F.r, negI);
        const oldR = first(slicedCube.R.r, negI);
        const oldB = first(slicedCube.B.r, negI);
        const oldL = first(slicedCube.L.r, negI);
        
        let newF, newR, newB, newL;

        if (turn.rotation === 2) {
            // 180
            newF = oldB;
            newR = oldL;
            newB = oldF;
            newL = oldR;
        } else if (turn.rotation === -1) {
            // 90 counter-clockwise
            newF = oldR;
            newR = oldB;
            newB = oldL;
            newL = oldF;
        } else {
            // 90 clockwise
            newF = oldL;
            newR = oldF;
            newB = oldR;
            newL = oldB;
        }

        splice(slicedCube.F.r, negI, 1, newF);
        splice(slicedCube.R.r, negI, 1, newR);
        splice(slicedCube.B.r, negI, 1, newB);
        splice(slicedCube.L.r, negI, 1, newL);

        state.F = flattenRows(slicedCube.F.r);
        state.R = flattenRows(slicedCube.R.r);
        state.B = flattenRows(slicedCube.B.r);
        state.L = flattenRows(slicedCube.L.r);
    });
}

/**
 * Turn slices for a F turn.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export function turnSliceF(state: CubeState, turn: CubeTurn) {
    const slicedCube = sliceCube(state);

    loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
        const oldU = first(slicedCube.U.r, negI);
        const oldR = first(slicedCube.R.c, iSubOne);
        const oldD = first(slicedCube.D.r, iSubOne);
        const oldL = first(slicedCube.L.c, negI);

        let newU, newR, newD, newL;

        if (turn.rotation === 2) {
            // 180
            newU = reverse(oldD);
            newR = reverse(oldL);
            newD = reverse(oldU);
            newL = reverse(oldR);
        } else if (turn.rotation === -1) {
            // 90 counter-clockwise
            newU = oldR;
            newR = reverse(oldD);
            newD = oldL;
            newL = reverse(oldU);
        } else {
            // 90 clockwise
            newU = reverse(oldL);
            newR = oldU;
            newD = reverse(oldR);
            newL = oldD;
        }

        splice(slicedCube.U.r, negI, 1, newU);
        splice(slicedCube.R.c, iSubOne, 1, newR);
        splice(slicedCube.D.r, iSubOne, 1, newD);
        splice(slicedCube.L.c, negI, 1, newL);

        state.U = flattenRows(slicedCube.U.r);
        state.R = flattenCols(slicedCube.R.c);
        state.D = flattenRows(slicedCube.D.r);
        state.L = flattenCols(slicedCube.L.c);
    });
}

/**
 * Turn slices for a L turn.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export function turnSliceL(state: CubeState, turn: CubeTurn) {
    const slicedCube = sliceCube(state);

    loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
        const oldU = first(slicedCube.U.c, iSubOne);
        const oldF = first(slicedCube.F.c, iSubOne);
        const oldD = first(slicedCube.D.c, iSubOne);
        const oldB = first(slicedCube.B.c, negI);

        let newU, newF, newD, newB;

        if (turn.rotation === 2) {
            // 180
            newU = oldD;
            newF = reverse(oldB);
            newD = oldU;
            newB = reverse(oldF);
        } else if (turn.rotation === -1) {
            // 90 counter-clockwise
            newU = oldF;
            newF = oldD;
            newD = reverse(oldB);
            newB = reverse(oldU);
        } else {
            // 90 clockwise
            newU = reverse(oldB);
            newF = oldU;
            newD = oldF;
            newB = reverse(oldD);
        }

        splice(slicedCube.U.c, iSubOne, 1, newU);
        splice(slicedCube.F.c, iSubOne, 1, newF);
        splice(slicedCube.D.c, iSubOne, 1, newD);
        splice(slicedCube.B.c, negI, 1, newB);

        state.U = flattenCols(slicedCube.U.c);
        state.F = flattenCols(slicedCube.F.c);
        state.D = flattenCols(slicedCube.D.c);
        state.B = flattenCols(slicedCube.B.c);
    });
}

/**
 * Turn slices for a R turn.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export function turnSliceR(state: CubeState, turn: CubeTurn) {
    const slicedCube = sliceCube(state);

    loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
        const oldU = first(slicedCube.U.c, negI);
        const oldB = first(slicedCube.B.c, iSubOne);
        const oldD = first(slicedCube.D.c, negI);
        const oldF = first(slicedCube.F.c, negI);
        
        let newU, newB, newD, newF;

        if (turn.rotation === 2) {
            // 180
            newU = oldD;
            newB = reverse(oldF);
            newD = oldU;
            newF = reverse(oldB);
        } else if (turn.rotation === -1) {
            // 90 counter-clockwise
            newU = reverse(oldB);
            newB = reverse(oldD);
            newD = oldF;
            newF = oldU;
        } else {
            // 90 clockwise
            newU = oldF;
            newB = reverse(oldU);
            newD = reverse(oldB);
            newF = oldD;
        }

        splice(slicedCube.U.c, negI, 1, newU);
        splice(slicedCube.B.c, iSubOne, 1, newB);
        splice(slicedCube.D.c, negI, 1, newD);
        splice(slicedCube.F.c, negI, 1, newF);

        state.U = flattenCols(slicedCube.U.c);
        state.B = flattenCols(slicedCube.B.c);
        state.D = flattenCols(slicedCube.D.c);
        state.F = flattenCols(slicedCube.F.c);
    });
}

/**
 * Turn slices for a R turn.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export function turnSliceU(state: CubeState, turn: CubeTurn) {
    const slicedCube = sliceCube(state);

    loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
        const oldB = first(slicedCube.B.r, iSubOne);
        const oldR = first(slicedCube.R.r, iSubOne);
        const oldF = first(slicedCube.F.r, iSubOne);
        const oldL = first(slicedCube.L.r, iSubOne);

        let newB, newR, newF, newL;

        if (turn.rotation === 2) {
            // 180
            newB = oldF;
            newR = oldL;
            newF = oldB;
            newL = oldR;
        } else if (turn.rotation === -1) {
            // 90 counter-clockwise
            newB = oldR;
            newR = oldF;
            newF = oldL;
            newL = oldB;
        } else {
            // 90 clockwise
            newB = oldL;
            newR = oldB;
            newF = oldR;
            newL = oldF;
        }

        splice(slicedCube.B.r, iSubOne, 1, newB);
        splice(slicedCube.R.r, iSubOne, 1, newR);
        splice(slicedCube.F.r, iSubOne, 1, newF);
        splice(slicedCube.L.r, iSubOne, 1, newL);

        state.B = flattenRows(slicedCube.B.r);
        state.R = flattenRows(slicedCube.R.r);
        state.F = flattenRows(slicedCube.F.r);
        state.L = flattenRows(slicedCube.L.r);
    });
}
