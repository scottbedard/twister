import { createPolygon } from '../../src/utils/polygon';

describe('polygon utils', () => {
    describe('createPolygon', () => {
        it('throws an error for invalid sides', () => {
            expect(() => createPolygon(4.5, 3)).toThrowError(); // <- must be an integer
            expect(() => createPolygon(2, 3)).toThrowError(); // <- must be 3 or greater
        });

        it('throws an error for invalid layers', () => {
            expect(() => createPolygon(3, 2.5)).toThrowError(); // <- must be an integer
            expect(() => createPolygon(3, 1)).toThrowError(); // <- must be 2 or greater
        });
    });
});