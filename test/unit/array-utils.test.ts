import { describe, it, expect } from 'vitest';
import { removeDuplicates, removeDuplicatesWithKey } from '../../server/utils/array-utils';

describe('removeDuplicates', () => {
  it('should remove duplicate primitive values', () => {
    const input = [1, 2, 2, 3, 1, 4];
    const output = removeDuplicates(input);
    expect(output).toEqual([1, 2, 3, 4]);
  });

  it('should work with strings', () => {
    const input = ['apple', 'banana', 'apple', 'cherry'];
    const output = removeDuplicates(input);
    expect(output).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should handle an empty array', () => {
    const output = removeDuplicates([]);
    expect(output).toEqual([]);
  });

  it('should handle arrays with unique values', () => {
    const input = [1, 2, 3];
    const output = removeDuplicates(input);
    expect(output).toEqual([1, 2, 3]);
  });
});

describe('removeDuplicatesWithKey', () => {
  it('should remove duplicate objects based on the given key', () => {
    const input = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 1, name: 'C' },
      { id: 3, name: 'A' },
    ];
    const output = removeDuplicatesWithKey(input, 'id');
    expect(output).toEqual([
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'A' },
    ]);
  });

  it('should remove duplicates by a string key', () => {
    const input = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Alice' },
    ];
    const output = removeDuplicatesWithKey(input, 'name');
    expect(output).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  it('should handle an empty array', () => {
    const output = removeDuplicatesWithKey([], 'id');
    expect(output).toEqual([]);
  });

  it('should handle arrays with unique keys', () => {
    const input = [
      { id: 1, name: 'X' },
      { id: 2, name: 'Y' },
    ];
    const output = removeDuplicatesWithKey(input, 'id');
    expect(output).toEqual(input);
  });
});
