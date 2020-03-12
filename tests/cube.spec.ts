import { Cube } from '../src/index';
import { CubeSticker, CubeTurn } from '../src/puzzles/cube/types';
import { parseTurn } from '../src/puzzles/cube/helpers';

describe('cube', () => {
    const faceValues = (face: CubeSticker[]) => face.map(s => s.value);

    const simplifiedState = (cube: Cube) => ({
        U: faceValues(cube.state.U),
        L: faceValues(cube.state.L),
        F: faceValues(cube.state.F),
        R: faceValues(cube.state.R),
        B: faceValues(cube.state.B),
        D: faceValues(cube.state.D),
    });

    it('throws an error if the cube size is not an integer', () => {
        expect(() => new Cube({ size: 3.5 })).toThrow();
    });

    it('throws an error if the size is less than two', () => {
        expect(() => new Cube({ size: 1 })).toThrow();
    });

    it('sets the initial state', () => {
        const cube = new Cube({ size: 3 });
        const { U, L, F, R, B, D } = cube.state;

        expect(faceValues(U)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        expect(faceValues(L)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1]);
        expect(faceValues(F)).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2]);
        expect(faceValues(R)).toEqual([3, 3, 3, 3, 3, 3, 3, 3, 3]);
        expect(faceValues(B)).toEqual([4, 4, 4, 4, 4, 4, 4, 4, 4]);
        expect(faceValues(D)).toEqual([5, 5, 5, 5, 5, 5, 5, 5, 5]);
    });

    describe('notation', () => {
        describe('parseTurn', () => {
            it('throws an exception for invalid turns', () => {
                expect(() => parseTurn('invalid turn')).toThrow();
            });

            describe('turn parsing', () => {
                const turns: { [key: string]: CubeTurn } = {
                    // standard
                    'U': { depth: 1, rotation: 1, target: 'U', wide: false },
                    'U2': { depth: 1, rotation: 2, target: 'U', wide: false },
                    'U-': { depth: 1, rotation: -1, target: 'U', wide: false },
                    'U\'': { depth: 1, rotation: -1, target: 'U', wide: false },

                    // deep
                    '2L': { depth: 2, rotation: 1, target: 'L', wide: false },
                    '2L2': { depth: 2, rotation: 2, target: 'L', wide: false },
                    '2L-': { depth: 2, rotation: -1, target: 'L', wide: false },
                    '2L\'': { depth: 2, rotation: -1, target: 'L', wide: false },

                    // wide
                    'Fw': { depth: 2, rotation: 1, target: 'F', wide: true },
                    'Fw2': { depth: 2, rotation: 2, target: 'F', wide: true },
                    'Fw-': { depth: 2, rotation: -1, target: 'F', wide: true },
                    'Fw\'': { depth: 2, rotation: -1, target: 'F', wide: true },
                    '3Fw': { depth: 3, rotation: 1, target: 'F', wide: true },
                };
            
                Object.keys(turns).forEach((turn) => {
                    const result = turns[turn];

                    it(turn, () => expect(parseTurn(turn)).toEqual(result));
                });
            });
        });
    });

    // scrambles are generated from the following WCA scrambler
    // https://www.worldcubeassociation.org/regulations/history/files/scrambles/scramble_cube.htm
    describe('scrambles', () => {
        const w = 0, o = 1, g = 2, r = 3, b = 4, y = 5;

        it('2x2', () => {
            const cube = new Cube({ size: 2 });
            
            cube.turn(`F2 U2 F2 U' F' R F2 U2 F' U2`);
    
            expect(simplifiedState(cube)).toEqual({
                U: [
                    w, g,
                    b, g,
                ],
                L: [
                    g, r,
                    o, b,
                ],
                F: [
                    y, o,
                    r, o,
                ],
                R: [
                    y, y,
                    b, g,
                ],
                B: [
                    r, o,
                    w, b,
                ],
                D: [
                    w, w,
                    y, r,
                ],
            });
        });

        it('3x3', () => {
            const cube = new Cube({ size: 3 });
            
            cube.turn(`R U' L' B2 F2 L' R' U2 R D' L R' D' L D B' L B D' B2 F' L R D2 B' R' F2 L B2 D2`);
    
            expect(simplifiedState(cube)).toEqual({
                U: [
                    o, r, b,
                    w, w, o,
                    b, y, g,
                ],
                L: [
                    g, o, o,
                    y, o, r,
                    o, b, b,
                ],
                F: [
                    w, g, y,
                    g, g, r,
                    y, w, y,
                ],
                R: [
                    r, g, w,
                    w, r, r,
                    b, y, g,
                ],
                B: [
                    r, y, y,
                    b, b, b,
                    w, w, g,
                ],
                D: [
                    r, b, o,
                    o, y, o,
                    w, g, r,
                ],
            });
        });

        it('4x4', () => {
            const cube = new Cube({ size: 4 });

            cube.turn(`Rw2 U' B2 Fw D' R2 D2 R' Uw' L2 Fw' L2 B' D' R' F Rw B' L' Rw2 B2 Uw2 L' Fw Uw2 F Uw Fw' F L2`);
        
            expect(simplifiedState(cube)).toEqual({
                U: [
                    y, o, g, b,
                    r, g, o, g,
                    g, b, y, y,
                    g, b, y, r,
                ],
                L: [
                    b, b, r, r,
                    r, w, r, r,
                    b, y, g, y,
                    b, b, r, y,
                ],
                F: [
                    w, y, o, g,
                    b, y, b, b,
                    o, r, r, w,
                    o, g, y, w,
                ],
                R: [
                    y, b, y, w,
                    o, g, o, w,
                    o, g, r, g,
                    o, g, r, g,
                ],
                B: [
                    r, r, b, o,
                    o, w, w, w,
                    w, b, w, w,
                    o, w, g, r,
                ],
                D: [
                    g, o, r, b,
                    w, o, y, y,
                    w, o, b, y,
                    y, o, g, w,
                ],
            });
        });

        it('5x5', () => {
            const cube = new Cube({ size: 5 });

            cube.turn(`R' Dw2 L' D' U2 B R2 B2 U' Bw' Lw2 Dw' Rw' U' R Dw' Uw' F Dw' B' L2 Lw' Rw' R2 Bw' Fw2 F R' B' D`);
        
            expect(simplifiedState(cube)).toEqual({
                U: [
                    g, y, r, b, y,
                    o, y, w, g, r,
                    o, b, w, o, g,
                    b, r, w, r, y,
                    o, b, o, o, o,
                ],
                L: [
                    r, y, g, w, y,
                    g, w, r, b, g,
                    b, y, o, b, r,
                    b, y, y, g, b,
                    w, w, b, b, r,
                ],
                F: [
                    g, o, y, y, w,
                    w, r, y, y, y,
                    y, b, g, o, w,
                    w, w, g, g, g,
                    g, o, w, g, r,
                ],
                R: [
                    b, g, r, w, o,
                    r, b, w, o, r,
                    r, r, r, w, o,
                    w, b, g, w, r,
                    w, g, g, r, b,
                ],
                B: [
                    b, r, b, b, y,
                    y, g, r, o, o,
                    b, b, b, y, y,
                    w, r, g, y, y,
                    y, r, o, b, o,
                ],
                D: [
                    w, w, g, o, b,
                    r, o, r, w, y,
                    w, g, y, o, y,
                    o, b, o, o, g,
                    g, o, w, g, r,
                ],
            });
        });
    });
});