import { capitalizeName } from './capitalizeName.ts';

describe('capitalizeName', () => {
  it('should capitalize the first letter', () => {
    expect(capitalizeName('product')).toBe('Product');
  });

  it('should handle empty strings', () => {
    expect(capitalizeName('')).toBe('');
  });
});