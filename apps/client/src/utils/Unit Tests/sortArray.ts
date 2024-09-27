// sortArray.ts
export function sortArray(arr: number[]): number[] {
    return arr.slice().sort((a, b) => a - b);
  }