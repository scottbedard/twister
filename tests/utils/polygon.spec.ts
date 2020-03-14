import  { createPolygonFace } from '../../src/utils/polygon';

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
                expect(face.stickers.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4]);
                expect(face.stickers.filter(s => s.center).length).toBe(0);
            });

            it('3 - megaminx', () => {
                const face = createPolygonFace(5, 3);
                expect(face.stickers.length).toEqual(11);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
                expect(face.stickers.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
                expect(face.stickers.filter(s => s.center).length).toBe(1);
            });

            it('4 - masterminx', () => {
                const face = createPolygonFace(5, 4);
                expect(face.stickers.length).toBe(20);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
                expect(face.stickers.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4]);
                expect(face.stickers.filter(s => s.center).length).toBe(0);
            });

            it('5 - gigaminx', () => {
                const face = createPolygonFace(5, 5);
                expect(face.stickers.length).toBe(31);
                expect(face.stickers.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]);
                expect(face.stickers.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
                expect(face.stickers.filter(s => s.center).length).toBe(1);
            });
        })
    });
});
