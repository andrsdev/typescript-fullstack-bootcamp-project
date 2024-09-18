import { sortArray } from './sortArray.ts';

describe('sortArray function', () => {
  test('sorts an array of numbers in ascending order', () => {
    const unsortedArray = [5, 3, 8, 1];
    const sortedArray = sortArray(unsortedArray);
    expect(sortedArray).toEqual([1, 3, 5, 8]);
  });

  test('returns an empty array when input is empty', () => {
    const emptyArray: number[] = [];
    expect(sortArray(emptyArray)).toEqual([]);
  });
});