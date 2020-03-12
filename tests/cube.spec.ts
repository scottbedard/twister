import { Cube } from '../src/index';
import { CubeSticker, CubeTurn } from '../src/puzzles/cube/types';
import { parseTurn } from '../src/puzzles/cube/helpers';

describe('cube', () => {
    it('throws an error if the cube size is not an integer', () => {
        expect(() => new Cube({ size: 3.5 })).toThrow();
    });

    it('throws an error if the size is less than two', () => {
        expect(() => new Cube({ size: 1 })).toThrow();
    });

    it('sets the initial state', () => {
        const faceCenter = (face: CubeSticker[]) => face.map(s => s.center);
        const faceValues = (face: CubeSticker[]) => face.map(s => s.value);

        const cube = new Cube({ size: 3 });
        const { U, L, F, R, B, D } = cube.state;
        
        expect(faceCenter(U)).toEqual([false, false, false, false, true, false, false, false, false]);
        expect(faceCenter(L)).toEqual([false, false, false, false, true, false, false, false, false]);
        expect(faceCenter(F)).toEqual([false, false, false, false, true, false, false, false, false]);
        expect(faceCenter(R)).toEqual([false, false, false, false, true, false, false, false, false]);
        expect(faceCenter(B)).toEqual([false, false, false, false, true, false, false, false, false]);
        expect(faceCenter(D)).toEqual([false, false, false, false, true, false, false, false, false]);

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
});