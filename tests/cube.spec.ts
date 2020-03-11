import { Cube } from '../src/index';
import { CubeSticker } from '../src/puzzles/cube/types';

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
});