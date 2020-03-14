import {
    createFace,
    extractSlice,
    rotateFace,
} from '../../src/index';

import { Face } from '../../src/types';

describe('face utils', () => {
    const square2 = createFace(4, 2);
    const square3 = createFace(4, 3);
    const square4 = createFace(4, 4);
    const square5 = createFace(4, 5);
    const kilominx = createFace(5, 2);
    const megaminx = createFace(5, 3);
    const masterminx = createFace(5, 4);
    const gigaminx = createFace(5, 5);

    const mapI = (face: Face) => face.stickers.map(s => s.originalIndex);

    //
    // extractSlice
    //
    describe('extractSlice', () => {
        it('throws an error for non-integer depth', () => {
            expect(() => extractSlice(square3, 1.5, 1)).toThrow();
        });

        it('throws an error for negative depth', () => {
            expect(() => extractSlice(square3, -1, 1)).toThrow();
        });

        it('throws an error for non-integer angle', () => {
            expect(() => extractSlice(square3, 1, 1.5)).toThrow();
        });

        it('throws an error for negative angle', () => {
            expect(() => extractSlice(square3, 1, -1)).toThrow();
        });
    });

    //
    // rotateFace
    //
    describe('rotateFace', () => {
        it('throws an error for non-integer rotations', () => {
            expect(() => rotateFace(square3, 1.5)).toThrow();
        });

        describe('squares', () => {
            it('2x2', () => {
                expect(mapI(rotateFace(square2, -3)))
                    .toEqual([3, 0, 1, 2]);

                expect(mapI(rotateFace(square2, -2)))
                    .toEqual([2, 3, 0, 1]);

                expect(mapI(rotateFace(square2, -1)))
                    .toEqual([1, 2, 3, 0]);

                expect(mapI(rotateFace(square2, 0)))
                    .toEqual(mapI(square2));

                expect(mapI(rotateFace(square2, 1)))
                    .toEqual([3, 0, 1, 2]);

                expect(mapI(rotateFace(square2, 2)))
                    .toEqual([2, 3, 0, 1]);

                expect(mapI(rotateFace(square2, 3)))
                    .toEqual([1, 2, 3, 0]);
            });

            it('3x3', () => {
                expect(mapI(rotateFace(square3, -3)))
                    .toEqual([6, 7, 0, 1, 2, 3, 4, 5, 0]);

                expect(mapI(rotateFace(square3, -2)))
                    .toEqual([4, 5, 6, 7, 0, 1, 2, 3, 0]);

                expect(mapI(rotateFace(square3, -1)))
                    .toEqual([2, 3, 4, 5, 6, 7, 0, 1, 0]);

                expect(mapI(rotateFace(square3, 0)))
                    .toEqual(mapI(square3));

                expect(mapI(rotateFace(square3, 1)))
                    .toEqual([6, 7, 0, 1, 2, 3, 4, 5, 0]);

                expect(mapI(rotateFace(square3, 2)))
                    .toEqual([4, 5, 6, 7, 0, 1, 2, 3, 0]);

                expect(mapI(rotateFace(square3, 3)))
                    .toEqual([2, 3, 4, 5, 6, 7, 0, 1, 0]);
            });

            it('4x4', () => {
                expect(mapI(rotateFace(square4, -3)))
                    .toEqual([9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 3, 0, 1, 2]);

                expect(mapI(rotateFace(square4, -2)))
                    .toEqual([6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 2, 3, 0, 1]);

                expect(mapI(rotateFace(square4, -1)))
                    .toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 1, 2, 3, 0]);

                expect(mapI(rotateFace(square4, 0)))
                    .toEqual(mapI(square4));

                expect(mapI(rotateFace(square4, 1)))
                    .toEqual([9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 3, 0, 1, 2]);

                expect(mapI(rotateFace(square4, 2)))
                    .toEqual([6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 2, 3, 0, 1]);

                expect(mapI(rotateFace(square4, 3)))
                    .toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 1, 2, 3, 0]);
            });

            it('5x5', () => {
                expect(mapI(rotateFace(square5, -3)))
                    .toEqual([12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 6, 7, 0, 1, 2, 3, 4, 5, 0]);

                expect(mapI(rotateFace(square5, -2)))
                    .toEqual([8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 4, 5, 6, 7, 0, 1, 2, 3, 0]);

                expect(mapI(rotateFace(square5, -1)))
                    .toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 2, 3, 4, 5, 6, 7, 0, 1, 0]);

                expect(mapI(rotateFace(square5, 0)))
                    .toEqual(mapI(square5));

                expect(mapI(rotateFace(square5, 1)))
                    .toEqual([12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 6, 7, 0, 1, 2, 3, 4, 5, 0]);

                expect(mapI(rotateFace(square5, 2)))
                    .toEqual([8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 4, 5, 6, 7, 0, 1, 2, 3, 0]);

                expect(mapI(rotateFace(square5, 3)))
                    .toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 2, 3, 4, 5, 6, 7, 0, 1, 0]);
            });
        });

        describe('pentagons', () => {
            it('kilominx', () => {
                expect(mapI(rotateFace(kilominx, -4)))
                    .toEqual([4, 0, 1, 2, 3]);

                expect(mapI(rotateFace(kilominx, -3)))
                    .toEqual([3, 4, 0, 1, 2]);

                expect(mapI(rotateFace(kilominx, -2)))
                    .toEqual([2, 3, 4, 0, 1]);

                expect(mapI(rotateFace(kilominx, -1)))
                    .toEqual([1, 2, 3, 4, 0]);

                expect(mapI(rotateFace(kilominx, 0)))
                    .toEqual(mapI(kilominx));

                expect(mapI(rotateFace(kilominx, 1)))
                    .toEqual([4, 0, 1, 2, 3]);

                expect(mapI(rotateFace(kilominx, 2)))
                    .toEqual([3, 4, 0, 1, 2]);

                expect(mapI(rotateFace(kilominx, 3)))
                    .toEqual([2, 3, 4, 0, 1]);

                expect(mapI(rotateFace(kilominx, 4)))
                    .toEqual([1, 2, 3, 4, 0]);
            });

            it('megaminx', () => {
                expect(mapI(rotateFace(megaminx, -4)))
                    .toEqual([8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 0]);

                expect(mapI(rotateFace(megaminx, -3)))
                    .toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 0]);

                expect(mapI(rotateFace(megaminx, -2)))
                    .toEqual([4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 0]);

                expect(mapI(rotateFace(megaminx, -1)))
                    .toEqual([2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 0]);

                expect(mapI(rotateFace(megaminx, 0)))
                    .toEqual(mapI(megaminx));

                expect(mapI(rotateFace(megaminx, 1)))
                    .toEqual([8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 0]);

                expect(mapI(rotateFace(megaminx, 2)))
                    .toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 0]);

                expect(mapI(rotateFace(megaminx, 3)))
                    .toEqual([4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 0]);

                expect(mapI(rotateFace(megaminx, 4)))
                    .toEqual([2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 0]);
            });

            it('masterminx', () => {
                expect(mapI(rotateFace(masterminx, -4)))
                    .toEqual([12, 13, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 4, 0, 1, 2, 3]);

                expect(mapI(rotateFace(masterminx, -3)))
                    .toEqual([9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 3, 4, 0, 1, 2]);

                expect(mapI(rotateFace(masterminx, -2)))
                    .toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 2, 3, 4, 0, 1]);

                expect(mapI(rotateFace(masterminx, -1)))
                    .toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 1, 2, 3, 4, 0]);

                expect(mapI(rotateFace(masterminx, 0)))
                    .toEqual(mapI(masterminx));

                expect(mapI(rotateFace(masterminx, 1)))
                    .toEqual([12, 13, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 4, 0, 1, 2, 3]);

                expect(mapI(rotateFace(masterminx, 2)))
                    .toEqual([9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 3, 4, 0, 1, 2]);

                expect(mapI(rotateFace(masterminx, 3)))
                    .toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 2, 3, 4, 0, 1]);

                expect(mapI(rotateFace(masterminx, 4)))
                    .toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 1, 2, 3, 4, 0]);
            });

            it('gigaminx', () => {
                expect(mapI(rotateFace(gigaminx, -4)))
                    .toEqual([16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 0]);

                expect(mapI(rotateFace(gigaminx, -3)))
                    .toEqual([12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 0]);

                expect(mapI(rotateFace(gigaminx, -2)))
                    .toEqual([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 0]);

                expect(mapI(rotateFace(gigaminx, -1)))
                    .toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 0]);

                expect(mapI(rotateFace(gigaminx, 0)))
                    .toEqual(mapI(gigaminx));

                expect(mapI(rotateFace(gigaminx, 1)))
                    .toEqual([16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 0]);

                expect(mapI(rotateFace(gigaminx, 2)))
                    .toEqual([12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 0]);

                expect(mapI(rotateFace(gigaminx, 3)))
                    .toEqual([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 0]);

                expect(mapI(rotateFace(gigaminx, 4)))
                    .toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 0]);
            });
        });
    });
});