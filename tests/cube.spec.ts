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
    });
});