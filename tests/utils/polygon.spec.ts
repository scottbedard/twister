import { PolygonFace } from '../../src/types';

import  { createPolygonFace, rotatePolygonFace } from '../../src/utils/polygon';

describe('polygon utils', () => {
    describe('createPolygonFace', () => {
        it('throws an error for sides less than 5', () => {
            expect(() => createPolygonFace(4, 2)).toThrow();
        });

        it('throws an error for non-integer sides', () => {
            expect(() => createPolygonFace(5.5, 2)).toThrow();
        });

        it('throws an error for layers less than 2', () => {
            expect(() => createPolygonFace(5, 1)).toThrow();
        });

        it('throws an error for non-integer layers', () => {
            expect(() => createPolygonFace(5, 2.5)).toThrow();
        });

        describe('pentagons', () => {
            it('2 - kilominx', () => {
                const face = createPolygonFace(5, 2);
                expect(face.stickers.length).toEqual(5);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0]);
                expect(face.stickers.map(s => s.originalIndex)).toEqual([0, 1, 2, 3, 4]);
                expect(face.stickers.filter(s => s.center).length).toBe(0);
            });

            it('3 - megaminx', () => {
                const face = createPolygonFace(5, 3);
                expect(face.stickers.length).toEqual(11);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
                expect(face.stickers.map(s => s.originalIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
                expect(face.stickers.filter(s => s.center).length).toBe(1);
            });

            it('4 - masterminx', () => {
                const face = createPolygonFace(5, 4);
                expect(face.stickers.length).toBe(20);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
                expect(face.stickers.map(s => s.originalIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4]);
                expect(face.stickers.filter(s => s.center).length).toBe(0);
            });

            it('5 - gigaminx', () => {
                const face = createPolygonFace(5, 5);
                expect(face.stickers.length).toBe(31);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]);
                expect(face.stickers.map(s => s.originalIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
                expect(face.stickers.filter(s => s.center).length).toBe(1);
            });
        })
    });

    describe('rotatePolygonFace', () => {
        // helper fn to map the original index values to an array
        const oi = (face: PolygonFace) => face.stickers.map(s => s.originalIndex);

        it('throws an error if the rotation is not an integer', () => {
            const face = createPolygonFace(5, 2);

            expect(() => rotatePolygonFace(face, 1.5)).toThrow();
        });

        describe('pentagons', () => {
            it('2 - kilominx', () => {
                const kilominx = createPolygonFace(5, 2);

                expect(oi(rotatePolygonFace(kilominx, -4)))
                    .toEqual([4, 0, 1, 2, 3]);

                expect(oi(rotatePolygonFace(kilominx, -3)))
                    .toEqual([3, 4, 0, 1, 2]);

                expect(oi(rotatePolygonFace(kilominx, -2)))
                    .toEqual([2, 3, 4, 0, 1]);

                expect(oi(rotatePolygonFace(kilominx, -1)))
                    .toEqual([1, 2, 3, 4, 0]);

                expect(oi(rotatePolygonFace(kilominx, 0)))
                    .toEqual(oi(kilominx));

                expect(oi(rotatePolygonFace(kilominx, 1)))
                    .toEqual([4, 0, 1, 2, 3]);

                expect(oi(rotatePolygonFace(kilominx, 2)))
                    .toEqual([3, 4, 0, 1, 2]);

                expect(oi(rotatePolygonFace(kilominx, 3)))
                    .toEqual([2, 3, 4, 0, 1]);

                expect(oi(rotatePolygonFace(kilominx, 4)))
                    .toEqual([1, 2, 3, 4, 0]);
            });

            it('3 - megaminx', () => {
                const megaminx = createPolygonFace(5, 3);

                expect(oi(rotatePolygonFace(megaminx, -4)))
                    .toEqual([8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 0]);

                expect(oi(rotatePolygonFace(megaminx, -3)))
                    .toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 0]);

                expect(oi(rotatePolygonFace(megaminx, -2)))
                    .toEqual([4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 0]);

                expect(oi(rotatePolygonFace(megaminx, -1)))
                    .toEqual([2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 0]);

                expect(oi(rotatePolygonFace(megaminx, 0)))
                    .toEqual(oi(megaminx));

                expect(oi(rotatePolygonFace(megaminx, 1)))
                    .toEqual([8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 0]);

                expect(oi(rotatePolygonFace(megaminx, 2)))
                    .toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 0]);

                expect(oi(rotatePolygonFace(megaminx, 3)))
                    .toEqual([4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 0]);

                expect(oi(rotatePolygonFace(megaminx, 4)))
                    .toEqual([2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 0]);
            });

            it('4 - masterminx', () => {
                const masterminx = createPolygonFace(5, 4);

                expect(oi(rotatePolygonFace(masterminx, -4)))
                    .toEqual([12, 13, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 4, 0, 1, 2, 3]);

                expect(oi(rotatePolygonFace(masterminx, -3)))
                    .toEqual([9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 3, 4, 0, 1, 2]);

                expect(oi(rotatePolygonFace(masterminx, -2)))
                    .toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 2, 3, 4, 0, 1]);

                expect(oi(rotatePolygonFace(masterminx, -1)))
                    .toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 1, 2, 3, 4, 0]);

                expect(oi(rotatePolygonFace(masterminx, 0)))
                    .toEqual(oi(masterminx));

                expect(oi(rotatePolygonFace(masterminx, 1)))
                    .toEqual([12, 13, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 4, 0, 1, 2, 3]);

                expect(oi(rotatePolygonFace(masterminx, 2)))
                    .toEqual([9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 3, 4, 0, 1, 2]);

                expect(oi(rotatePolygonFace(masterminx, 3)))
                    .toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 2, 3, 4, 0, 1]);

                expect(oi(rotatePolygonFace(masterminx, 4)))
                    .toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 1, 2, 3, 4, 0]);
            });

            it('5 - gigaminx', () => {
                const gigaminx = createPolygonFace(5, 5);

                expect(oi(rotatePolygonFace(gigaminx, -4)))
                    .toEqual([16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 0]);

                expect(oi(rotatePolygonFace(gigaminx, -3)))
                    .toEqual([12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 0]);

                expect(oi(rotatePolygonFace(gigaminx, -2)))
                    .toEqual([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 0]);

                expect(oi(rotatePolygonFace(gigaminx, -1)))
                    .toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 0]);

                expect(oi(rotatePolygonFace(gigaminx, 0)))
                    .toEqual(oi(gigaminx));

                expect(oi(rotatePolygonFace(gigaminx, 1)))
                    .toEqual([16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 0]);

                expect(oi(rotatePolygonFace(gigaminx, 2)))
                    .toEqual([12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 0]);

                expect(oi(rotatePolygonFace(gigaminx, 3)))
                    .toEqual([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 0]);

                expect(oi(rotatePolygonFace(gigaminx, 4)))
                    .toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 0]);
            });
        });
    });
});
