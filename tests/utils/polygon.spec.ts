import { PolygonFace, PolygonSticker } from '../../src/types';

import  {
    createPolygonFace,
    extractPolygonLayer,
    rotatePolygonFace,
    splicePolygonLayer,
} from '../../src/utils/polygon';

// helper function to map sticker values to an array
const md = (face: PolygonFace) => face.stickers.map(s => s.depth);
const moi = (face: PolygonFace) => face.stickers.map(s => s.originalIndex);
const mv = (face: PolygonFace) => face.stickers.map(s => s.value);

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
                expect(md(kilominx)).toEqual([1, 1, 1, 1, 1]);
            });

            it('3 - megaminx', () => {
                const megaminx = createPolygonFace(5, 3);
                
                expect(megaminx.stickers.length).toBe(11);
                expect(md(megaminx)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]);
            });

            it('4 - masterminx', () => {
                const masterminx = createPolygonFace(5, 4);
                
                expect(masterminx.stickers.length).toBe(20);
                expect(md(masterminx)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2]);
            });

            it('5 - gigaminx', () => {
                const gigaminx = createPolygonFace(5, 5);
                
                expect(gigaminx.stickers.length).toBe(31);
                expect(md(gigaminx)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]);
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

    describe('extractPolygonLayer', () => {
        const moi = (stickers: PolygonSticker[]) => stickers.map(s => s.originalIndex);

        describe('pentagons', () => {
            it('2 - kilominx', () => {
                const kilominx = createPolygonFace(5, 2);

                expect(moi(extractPolygonLayer(kilominx, 1))).toIncludeSameMembers([0, 1]);
                expect(moi(extractPolygonLayer(kilominx, 1, 1))).toIncludeSameMembers([4, 0]);
                expect(moi(extractPolygonLayer(kilominx, 1, 2))).toIncludeSameMembers([3, 4]);
                expect(moi(extractPolygonLayer(kilominx, 1, 3))).toIncludeSameMembers([2, 3]);
                expect(moi(extractPolygonLayer(kilominx, 1, 4))).toIncludeSameMembers([1, 2]);
            });

            it('3 - megaminx', () => {
                const megaminx = createPolygonFace(5, 3);

                expect(moi(extractPolygonLayer(megaminx, 1))).toIncludeSameMembers([0, 1, 2]);
                expect(moi(extractPolygonLayer(megaminx, 1, 1))).toIncludeSameMembers([8, 9, 0]);
                expect(moi(extractPolygonLayer(megaminx, 1, 2))).toIncludeSameMembers([6, 7, 8]);
                expect(moi(extractPolygonLayer(megaminx, 1, 3))).toIncludeSameMembers([4, 5, 6]);
                expect(moi(extractPolygonLayer(megaminx, 1, 4))).toIncludeSameMembers([2, 3, 4]);
            });

            it('4 - masterminx', () => {
                const masterminx = createPolygonFace(5, 4);

                expect(moi(extractPolygonLayer(masterminx, 1))).toIncludeSameMembers([0, 1, 2, 3]);
                expect(moi(extractPolygonLayer(masterminx, 1, 1))).toIncludeSameMembers([12, 13, 14, 0]);
                expect(moi(extractPolygonLayer(masterminx, 1, 2))).toIncludeSameMembers([9, 10, 11, 12]);
                expect(moi(extractPolygonLayer(masterminx, 1, 3))).toIncludeSameMembers([6, 7, 8, 9]);
                expect(moi(extractPolygonLayer(masterminx, 1, 4))).toIncludeSameMembers([3, 4, 5, 6]);

                expect(moi(extractPolygonLayer(masterminx, 2))).toIncludeSameMembers([14, 15, 16, 4]);
                expect(moi(extractPolygonLayer(masterminx, 2, 1))).toIncludeSameMembers([11, 19, 15, 1]);
                expect(moi(extractPolygonLayer(masterminx, 2, 2))).toIncludeSameMembers([8, 18, 19, 13]);
                expect(moi(extractPolygonLayer(masterminx, 2, 3))).toIncludeSameMembers([5, 17, 18, 10]);
                expect(moi(extractPolygonLayer(masterminx, 2, 4))).toIncludeSameMembers([2, 16, 17, 7]);
            });

            it('5 - gigaminx', () => {
                const gigaminx = createPolygonFace(5, 5);

                expect(moi(extractPolygonLayer(gigaminx, 1))).toIncludeSameMembers([0, 1, 2, 3, 4]);
                expect(moi(extractPolygonLayer(gigaminx, 1, 1))).toIncludeSameMembers([16, 17, 18, 19, 0]);
                expect(moi(extractPolygonLayer(gigaminx, 1, 2))).toIncludeSameMembers([12, 13, 14, 15, 16]);
                expect(moi(extractPolygonLayer(gigaminx, 1, 3))).toIncludeSameMembers([8, 9, 10, 11, 12]);
                expect(moi(extractPolygonLayer(gigaminx, 1, 4))).toIncludeSameMembers([4, 5, 6, 7, 8]);

                expect(moi(extractPolygonLayer(gigaminx, 2))).toIncludeSameMembers([19, 20, 21, 22, 5]);
                expect(moi(extractPolygonLayer(gigaminx, 2, 1))).toIncludeSameMembers([15, 28, 29, 20, 1]);
                expect(moi(extractPolygonLayer(gigaminx, 2, 2))).toIncludeSameMembers([11, 26, 27, 28, 17]);
                expect(moi(extractPolygonLayer(gigaminx, 2, 3))).toIncludeSameMembers([7, 24, 25, 26, 13]);
                expect(moi(extractPolygonLayer(gigaminx, 2, 4))).toIncludeSameMembers([3, 22, 23, 24, 9]);
            });
        });
    });

    describe('splicePolygonLayer', () => {
        describe('pentagons', () => {
            it('2 - kilominx', () => {
                const a = createPolygonFace(5, 2, 0);
                const b = createPolygonFace(5, 2, 1);

                expect(mv(splicePolygonLayer(a, 0, b, 0, 1))).toEqual([0, 0, 1, 1, 1]);
                expect(mv(splicePolygonLayer(a, 0, b, 1, 1))).toEqual([0, 1, 1, 1, 0]);
                expect(mv(splicePolygonLayer(a, 0, b, 2, 1))).toEqual([1, 1, 1, 0, 0]);
                expect(mv(splicePolygonLayer(a, 0, b, 3, 1))).toEqual([1, 1, 0, 0, 1]);
                expect(mv(splicePolygonLayer(a, 0, b, 4, 1))).toEqual([1, 0, 0, 1, 1]);
            });

            it('3 - megaminx', () => {
                const a = createPolygonFace(5, 3, 0);
                const b = createPolygonFace(5, 3, 1);

                expect(mv(splicePolygonLayer(a, 0, b, 0, 1))).toEqual([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]);
                expect(mv(splicePolygonLayer(a, 0, b, 1, 1))).toEqual([0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1]);
                expect(mv(splicePolygonLayer(a, 0, b, 2, 1))).toEqual([1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1]);
                expect(mv(splicePolygonLayer(a, 0, b, 3, 1))).toEqual([1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1]);
                expect(mv(splicePolygonLayer(a, 0, b, 4, 1))).toEqual([1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1]);
            });
        });
    });
});
