import { createFace } from '../../src/utils/face';

describe('face utils', () => {
    describe('createPolygon', () => {
        it('throws an error for invalid sides', () => {
            expect(() => createFace(4.5, 3)).toThrowError(); // <- must be an integer
            expect(() => createFace(2, 3)).toThrowError(); // <- must be 3 or greater
        });

        it('throws an error for invalid layers', () => {
            expect(() => createFace(3, 2.5)).toThrowError(); // <- must be an integer
            expect(() => createFace(3, 1)).toThrowError(); // <- must be 2 or greater
        });

        describe('triangles', () => {
            // https://www.desmos.com/geometry/ltfdqc56p4
        });

        describe('square', () => {
            it('2x2', () => {
                const face = createFace(4, 2);
                expect(face.length).toBe(4);
                expect(face.map(s => s.depth)).toEqual([0, 0, 0, 0]);
                expect(face.map(s => s.currentIndex)).toEqual([0, 1, 2, 3]);
                expect(face.filter(s => s.center).length).toBe(0);
            });

            it('3x3', () => {
                const face = createFace(4, 3);
                expect(face.length).toBe(9);
                expect(face.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 1]);
                expect(face.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 0]);
                expect(face.filter(s => s.center).length).toBe(1);
            });

            it('4x4', () => {
                const face = createFace(4, 4);
                expect(face.length).toEqual(16);
                expect(face.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]);
                expect(face.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3]);
                expect(face.filter(s => s.center).length).toBe(0);
            });

            it('5x5', () => {
                const face = createFace(4, 5);
                expect(face.length).toEqual(25);
                expect(face.map(s => s.depth)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2]);
                expect(face.map(s => s.currentIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 0]);
                expect(face.filter(s => s.center).length).toBe(1);
            });
        });
    });
});