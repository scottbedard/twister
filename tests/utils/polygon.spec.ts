import { PolygonFace } from '../../src/types';

import  { createPolygonFace, rotatePolygonFace } from '../../src/utils/polygon';

// helper function to map sticker values to an array
const mr = (face: PolygonFace) => face.stickers.map(s => s.ring);
const moi = (face: PolygonFace) => face.stickers.map(s => s.originalIndex);

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
                const kilominx = createPolygonFace(5, 2);
                
                expect(kilominx.stickers.length).toBe(5);
                expect(mr(kilominx)).toEqual([0, 0, 0, 0, 0]);
            });

            it('3 - megaminx', () => {
                const megaminx = createPolygonFace(5, 3);
                
                expect(megaminx.stickers.length).toBe(11);
                expect(mr(megaminx)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
            });

            it('4 - masterminx', () => {
                const masterminx = createPolygonFace(5, 4);
                
                expect(masterminx.stickers.length).toBe(20);
                expect(mr(masterminx)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
            });

            it('5 - gigaminx', () => {
                const gigaminx = createPolygonFace(5, 5);
                
                expect(gigaminx.stickers.length).toBe(31);
                expect(mr(gigaminx)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]);
            });
        });
    });

    describe('rotatePolygonFace', () => {
        it('throws an error if the rotation is not an integer', () => {
            const face = createPolygonFace(5, 2);

            expect(() => rotatePolygonFace(face, 1.5)).toThrow();
        });

        describe('pentagons', () => {
            it('2 - kilominx', () => {
                const kilominx = createPolygonFace(5, 2);

                expect(moi(rotatePolygonFace(kilominx, -4)))
                    .toEqual([4, 0, 1, 2, 3]);

                expect(moi(rotatePolygonFace(kilominx, -3)))
                    .toEqual([3, 4, 0, 1, 2]);

                expect(moi(rotatePolygonFace(kilominx, -2)))
                    .toEqual([2, 3, 4, 0, 1]);

                expect(moi(rotatePolygonFace(kilominx, -1)))
                    .toEqual([1, 2, 3, 4, 0]);

                expect(moi(rotatePolygonFace(kilominx, 0)))
                    .toEqual(moi(kilominx));

                expect(moi(rotatePolygonFace(kilominx, 1)))
                    .toEqual([4, 0, 1, 2, 3]);

                expect(moi(rotatePolygonFace(kilominx, 2)))
                    .toEqual([3, 4, 0, 1, 2]);

                expect(moi(rotatePolygonFace(kilominx, 3)))
                    .toEqual([2, 3, 4, 0, 1]);

                expect(moi(rotatePolygonFace(kilominx, 4)))
                    .toEqual([1, 2, 3, 4, 0]);
            });

            it('3 - megaminx', () => {
                const megaminx = createPolygonFace(5, 3);

                expect(moi(rotatePolygonFace(megaminx, -4)))
                    .toEqual([8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10]);

                expect(moi(rotatePolygonFace(megaminx, -3)))
                    .toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10]);

                expect(moi(rotatePolygonFace(megaminx, -2)))
                    .toEqual([4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10]);

                expect(moi(rotatePolygonFace(megaminx, -1)))
                    .toEqual([2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10]);

                expect(moi(rotatePolygonFace(megaminx, 0)))
                    .toEqual(moi(megaminx));

                expect(moi(rotatePolygonFace(megaminx, 1)))
                    .toEqual([8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 10]);

                expect(moi(rotatePolygonFace(megaminx, 2)))
                    .toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 10]);

                expect(moi(rotatePolygonFace(megaminx, 3)))
                    .toEqual([4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 10]);

                expect(moi(rotatePolygonFace(megaminx, 4)))
                    .toEqual([2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 10]);
            });

            it('4 - masterminx', () => {
                const masterminx = createPolygonFace(5, 4);

                expect(moi(rotatePolygonFace(masterminx, -4)))
                    .toEqual([12, 13, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 19, 15, 16, 17, 18]);

                expect(moi(rotatePolygonFace(masterminx, -3)))
                    .toEqual([9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 15, 16, 17]);

                expect(moi(rotatePolygonFace(masterminx, -2)))
                    .toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 17, 18, 19, 15, 16]);

                expect(moi(rotatePolygonFace(masterminx, -1)))
                    .toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 16, 17, 18, 19, 15]);

                expect(moi(rotatePolygonFace(masterminx, 0)))
                    .toEqual(moi(masterminx));

                expect(moi(rotatePolygonFace(masterminx, 1)))
                    .toEqual([12, 13, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 19, 15, 16, 17, 18]);

                expect(moi(rotatePolygonFace(masterminx, 2)))
                    .toEqual([9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 15, 16, 17]);

                expect(moi(rotatePolygonFace(masterminx, 3)))
                    .toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 17, 18, 19, 15, 16]);

                expect(moi(rotatePolygonFace(masterminx, 4)))
                    .toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 16, 17, 18, 19, 15]);
            });

            it('5 - gigaminx', () => {
                const gigaminx = createPolygonFace(5, 5);

                expect(moi(rotatePolygonFace(gigaminx, -4)))
                    .toEqual([16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 28, 29, 20, 21, 22, 23, 24, 25, 26, 27, 30]);

                expect(moi(rotatePolygonFace(gigaminx, -3)))
                    .toEqual([12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 26, 27, 28, 29, 20, 21, 22, 23, 24, 25, 30]);

                expect(moi(rotatePolygonFace(gigaminx, -2)))
                    .toEqual([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 24, 25, 26, 27, 28, 29, 20, 21, 22, 23, 30]);

                expect(moi(rotatePolygonFace(gigaminx, -1)))
                    .toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 22, 23, 24, 25, 26, 27, 28, 29, 20, 21, 30]);

                expect(moi(rotatePolygonFace(gigaminx, 0)))
                    .toEqual(moi(gigaminx));

                expect(moi(rotatePolygonFace(gigaminx, 1)))
                    .toEqual([16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 28, 29, 20, 21, 22, 23, 24, 25, 26, 27, 30]);

                expect(moi(rotatePolygonFace(gigaminx, 2)))
                    .toEqual([12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 26, 27, 28, 29, 20, 21, 22, 23, 24, 25, 30]);

                expect(moi(rotatePolygonFace(gigaminx, 3)))
                    .toEqual([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 24, 25, 26, 27, 28, 29, 20, 21, 22, 23, 30]);

                expect(moi(rotatePolygonFace(gigaminx, 4)))
                    .toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 22, 23, 24, 25, 26, 27, 28, 29, 20, 21, 30]);
            });
        });
    });
});
