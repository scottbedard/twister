import {
    createFace,
    rotateFace,
} from '../../src/index';

import { Face } from '../../src/types';

describe('face utils', () => {
    describe('createFace', () => {
        it('throws an error for invalid sides', () => {
            expect(() => createFace(4.5, 3)).toThrowError(); // <- must be an integer
            expect(() => createFace(2, 3)).toThrowError(); // <- must be 3 or greater
        });

        it('throws an error for invalid layers', () => {
            expect(() => createFace(3, 2.5)).toThrowError(); // <- must be an integer
            expect(() => createFace(3, 1)).toThrowError(); // <- must be 2 or greater
        });

        it('sets layer and side values', () => {
            const face = createFace(4, 3);
            expect(face.layers).toBe(3);
            expect(face.sides).toBe(4);
        });

        describe('triangles', () => {
            // https://www.desmos.com/geometry/ltfdqc56p4
        });

        describe('squares', () => {
            it('2x2', () => {
                const face = createFace(4, 2);
                expect(face.stickers.length).toBe(4);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0]);
                expect(face.stickers.map(s => s.currentIndex)).toEqual([0, 1, 2, 3]);
                expect(face.stickers.filter(s => s.center).length).toBe(0);
            });

            it('3x3', () => {
                const face = createFace(4, 3);
                expect(face.stickers.length).toBe(9);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 1]);
                expect(face.stickers.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 0]);
                expect(face.stickers.filter(s => s.center).length).toBe(1);
            });

            it('4x4', () => {
                const face = createFace(4, 4);
                expect(face.stickers.length).toEqual(16);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]);
                expect(face.stickers.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3]);
                expect(face.stickers.filter(s => s.center).length).toBe(0);
            });

            it('5x5', () => {
                const face = createFace(4, 5);
                expect(face.stickers.length).toEqual(25);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2]);
                expect(face.stickers.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 0]);
                expect(face.stickers.filter(s => s.center).length).toBe(1);
            });
        });

        describe('pentagons', () => {
            it('kilominx', () => {
                const face = createFace(5, 2);
                expect(face.stickers.length).toEqual(5);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0]);
                expect(face.stickers.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4]);
                expect(face.stickers.filter(s => s.center).length).toBe(0);
            });

            it('megaminx', () => {
                const face = createFace(5, 3);
                expect(face.stickers.length).toEqual(11);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
                expect(face.stickers.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
                expect(face.stickers.filter(s => s.center).length).toBe(1);
            });

            it('masterminx', () => {
                const face = createFace(5, 4);
                expect(face.stickers.length).toBe(20);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
                expect(face.stickers.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4]);
                expect(face.stickers.filter(s => s.center).length).toBe(0);
            });

            it('gigaminx', () => {
                const face = createFace(5, 5);
                expect(face.stickers.length).toBe(31);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]);
                expect(face.stickers.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
                expect(face.stickers.filter(s => s.center).length).toBe(1);
            });
        });
    });

    describe('rotateFace', () => {
        const square2 = createFace(4, 2);
        const square3 = createFace(4, 3);
        const square4 = createFace(4, 4);
        const square5 = createFace(4, 5);

        const kilominx = createFace(5, 2);
        const megaminx = createFace(5, 3);

        const mapI = (face: Face) => face.stickers.map(s => s.originalIndex);

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
        });
    });
});