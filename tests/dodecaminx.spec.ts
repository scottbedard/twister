import { Dodecaminx } from '../src/index';

describe('dodecaminx', () => {
    it('throws an error if the size is not an integer', () => {
        expect(() => new Dodecaminx({ size: 3.5 })).toThrow();
    });

    it('throws an error if the size is less than two', () => {
        expect(() => new Dodecaminx({ size: 1 })).toThrow();
    });
});
