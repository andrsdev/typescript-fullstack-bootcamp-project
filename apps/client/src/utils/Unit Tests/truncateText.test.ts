import { truncateText } from './truncateText.ts';

describe('truncateText', () => {
  it('should truncate text longer than the given length', () => {
    expect(truncateText('This is a long product name', 10)).toBe('This is a ...');
  });

  it('should return the original text if it is shorter than the given length', () => {
    expect(truncateText('Short name', 20)).toBe('Short name');
  });
});
