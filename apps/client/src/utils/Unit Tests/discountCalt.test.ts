import { discountCalc } from './discountCalc.ts'

describe('discountCalc', () => {
  it('should calculate discount correctly', () => {
    expect(discountCalc(100, 75)).toBe(25);
  });

  it('should throw error if original price is less than or equal to 0', () => {
    expect(() => discountCalc(0, 50)).toThrow('Invalid original price');
  });
});
