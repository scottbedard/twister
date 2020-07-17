import { Cube } from '../src/index';
import { CubeFace, CubeSticker, CubeTurn } from '../src/cube/cube';
import { getOppositeFace, parseTurn, stringifyTurn } from '../src/cube/helpers';

type StickerData = {
}

describe('cube', () => {
    const w = 0, o = 1, g = 2, r = 3, b = 4, y = 5;

    const faceValues = (face: CubeSticker<StickerData>[]) => face.map(s => s.value);

    const simplifiedState = (cube: Cube<StickerData>) => ({
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

    describe('helpers', () => {
        it('getOppositeFace', () => {
            const cube = new Cube({ size: 2 });

            const faces = {
                U: 'D',
                L: 'R',
                F: 'B',
                R: 'L',
                B: 'F',
                D: 'U',
            };

            Object.keys(faces).forEach((face: CubeFace) => {
                const turn = cube.parseTurn(face);
                expect(getOppositeFace(turn)).toBe(faces[face]);
            });
        });

        it('stringifyTurn', () => {
            expect(stringifyTurn(parseTurn('F'))).toBe('F');
            expect(stringifyTurn(parseTurn('F-'))).toBe('F-');
            expect(stringifyTurn(parseTurn('F2'))).toBe('F2');
            expect(stringifyTurn(parseTurn('Fw'))).toBe('Fw');
            expect(stringifyTurn(parseTurn('2F'))).toBe('2F');
            expect(stringifyTurn(parseTurn('3F'))).toBe('3F');
            expect(stringifyTurn(parseTurn('3Fw'))).toBe('3Fw');
            expect(stringifyTurn(parseTurn('3Fw-'))).toBe('3Fw-');
            expect(stringifyTurn(parseTurn('3Fw2'))).toBe('3Fw2');
        });
    });

    describe('methods', () => {
        it('isSolved', () => {
            const cube = new Cube({ size: 2 });

            expect(cube.isSolved()).toBe(true);

            cube.turn('R');

            expect(cube.isSolved()).toBe(false);
        });

        it('scramble', () => {
            const cube = new Cube({ size: 2 });

            cube.scramble();

            expect(cube.isSolved()).toBe(false);
        });
    });

    describe('notation', () => {
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

    describe('turns', () => {
        const turns: { [turn: string]: { [face: string]: number[] }} = {
            'U': {
                U: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    g, g, g,
                    o, o, o,
                    o, o, o,
                ],
                F: [
                    r, r, r,
                    g, g, g,
                    g, g, g,
                ],
                R: [
                    b, b, b,
                    r, r, r,
                    r, r, r,
                ],
                B: [
                    o, o, o,
                    b, b, b,
                    b, b, b,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
            },
            'U-': {
                U: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    b, b, b,
                    o, o, o,
                    o, o, o,
                ],
                F: [
                    o, o, o,
                    g, g, g,
                    g, g, g,
                ],
                R: [
                    g, g, g,
                    r, r, r,
                    r, r, r,
                ],
                B: [
                    r, r, r,
                    b, b, b,
                    b, b, b,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
            },
            'U2': {
                U: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    r, r, r,
                    o, o, o,
                    o, o, o,
                ],
                F: [
                    b, b, b,
                    g, g, g,
                    g, g, g,
                ],
                R: [
                    o, o, o,
                    r, r, r,
                    r, r, r,
                ],
                B: [
                    g, g, g,
                    b, b, b,
                    b, b, b,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
            },
            '3U': {
                U: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    g, g, g,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    r, r, r,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    b, b, b,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    o, o, o,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
            },
            '3U-': {
                U: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    b, b, b,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    o, o, o,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    g, g, g,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    r, r, r,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
            },
            '3U2': {
                U: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    r, r, r,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    b, b, b,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    o, o, o,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    g, g, g,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
            },
            'L': {
                U: [
                    b, w, w,
                    b, w, w,
                    b, w, w,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                F: [
                    w, g, g,
                    w, g, g,
                    w, g, g,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                B: [
                    b, b, y,
                    b, b, y,
                    b, b, y,
                ],
                D: [
                    g, y, y,
                    g, y, y,
                    g, y, y,
                ],
            },
            'L-': {
                U: [
                    g, w, w,
                    g, w, w,
                    g, w, w,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                F: [
                    y, g, g,
                    y, g, g,
                    y, g, g,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                B: [
                    b, b, w,
                    b, b, w,
                    b, b, w,
                ],
                D: [
                    b, y, y,
                    b, y, y,
                    b, y, y,
                ],
            },
            'L2': {
                U: [
                    y, w, w,
                    y, w, w,
                    y, w, w,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                F: [
                    b, g, g,
                    b, g, g,
                    b, g, g,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                B: [
                    b, b, g,
                    b, b, g,
                    b, b, g,
                ],
                D: [
                    w, y, y,
                    w, y, y,
                    w, y, y,
                ],
            },
            'F': {
                U: [
                    w, w, w,
                    w, w, w,
                    o, o, o,
                ],
                L: [
                    o, o, y,
                    o, o, y,
                    o, o, y,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                R: [
                    w, r, r,
                    w, r, r,
                    w, r, r,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                D: [
                    r, r, r,
                    y, y, y,
                    y, y, y,
                ],
            },
            'F-': {
                U: [
                    w, w, w,
                    w, w, w,
                    r, r, r,
                ],
                L: [
                    o, o, w,
                    o, o, w,
                    o, o, w,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                R: [
                    y, r, r,
                    y, r, r,
                    y, r, r,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                D: [
                    o, o, o,
                    y, y, y,
                    y, y, y,
                ],
            },
            'F2': {
                U: [
                    w, w, w,
                    w, w, w,
                    y, y, y,
                ],
                L: [
                    o, o, r,
                    o, o, r,
                    o, o, r,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                R: [
                    o, r, r,
                    o, r, r,
                    o, r, r,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                D: [
                    w, w, w,
                    y, y, y,
                    y, y, y,
                ],
            },
            'R': {
                U: [
                    w, w, g,
                    w, w, g,
                    w, w, g,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                F: [
                    g, g, y,
                    g, g, y,
                    g, g, y,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                B: [
                    w, b, b,
                    w, b, b,
                    w, b, b,
                ],
                D: [
                    y, y, b,
                    y, y, b,
                    y, y, b,
                ],
            },
            'R-': {
                U: [
                    w, w, b,
                    w, w, b,
                    w, w, b,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                F: [
                    g, g, w,
                    g, g, w,
                    g, g, w,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                B: [
                    y, b, b,
                    y, b, b,
                    y, b, b,
                ],
                D: [
                    y, y, g,
                    y, y, g,
                    y, y, g,
                ],
            },
            'R2': {
                U: [
                    w, w, y,
                    w, w, y,
                    w, w, y,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                F: [
                    g, g, b,
                    g, g, b,
                    g, g, b,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                B: [
                    g, b, b,
                    g, b, b,
                    g, b, b,
                ],
                D: [
                    y, y, w,
                    y, y, w,
                    y, y, w,
                ],
            },
            'B': {
                U: [
                    r, r, r,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    w, o, o,
                    w, o, o,
                    w, o, o,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                R: [
                    r, r, y,
                    r, r, y,
                    r, r, y,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    o, o, o,
                ],
            },
            'B-': {
                U: [
                    o, o, o,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    y, o, o,
                    y, o, o,
                    y, o, o,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                R: [
                    r, r, w,
                    r, r, w,
                    r, r, w,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    r, r, r,
                ],
            },
            'B2': {
                U: [
                    y, y, y,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    r, o, o,
                    r, o, o,
                    r, o, o,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                R: [
                    r, r, o,
                    r, r, o,
                    r, r, o,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    w, w, w,
                ],
            },
            'D': {
                U: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    b, b, b,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    o, o, o,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    g, g, g,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    r, r, r,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
            },
            'D-': {
                U: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    g, g, g,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    r, r, r,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    b, b, b,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    o, o, o,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
            },
            'D2': {
                U: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    r, r, r,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    b, b, b,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    o, o, o,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    g, g, g,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
            },
            'X': {
                U: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                F: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                B: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                D: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
            },
            'X-': {
                U: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                F: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                B: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
                D: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
            },
            'X2': {
                U: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
                L: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                F: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                R: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                B: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                D: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
            },
            'Y': {
                U: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                F: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                R: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                B: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
            },
            'Y-': {
                U: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                F: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                R: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                B: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
            },
            'Y2': {
                U: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                L: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                F: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                R: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                B: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                D: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
            },
            'Z': {
                U: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                L: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                R: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                D: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
            },
            'Z-': {
                U: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                L: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                R: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                D: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
            },
            'Z2': {
                U: [
                    y, y, y,
                    y, y, y,
                    y, y, y,
                ],
                L: [
                    r, r, r,
                    r, r, r,
                    r, r, r,
                ],
                F: [
                    g, g, g,
                    g, g, g,
                    g, g, g,
                ],
                R: [
                    o, o, o,
                    o, o, o,
                    o, o, o,
                ],
                B: [
                    b, b, b,
                    b, b, b,
                    b, b, b,
                ],
                D: [
                    w, w, w,
                    w, w, w,
                    w, w, w,
                ],
            },
        };

        Object.keys(turns).forEach((turn: string) => {
            it(turn, () => {
                const cube = new Cube({ size: 3 });

                cube.turn(turn);

                expect(simplifiedState(cube)).toEqual(turns[turn]);
            });
        });

        it('inner turns effect opposite face', () => {
            const cube = new Cube({ size: 3 });

            cube.turn('L R 3U');

            expect(faceValues(cube.state.D)).toEqual([
                4, 4, 4,
                5, 5, 5,
                2, 2, 2,
            ]);
        });
    });

    // scrambles are generated from the following WCA scrambler
    // https://www.worldcubeassociation.org/regulations/history/files/scrambles/scramble_cube.htm
    describe('scrambles', () => {
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