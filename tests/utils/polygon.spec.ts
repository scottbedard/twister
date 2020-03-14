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
    });
});
