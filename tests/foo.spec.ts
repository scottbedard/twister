import { double } from '../src/foo';

describe('foo', () => {
    it('doubles a number', () => {
        expect(double(2)).toBe(4);
    });
});
