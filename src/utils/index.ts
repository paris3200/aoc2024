/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

/**
 * Prints a 2D array to the command line where each row is joined into a single string.
 * @param {ReadonlyArray<ReadonlyArray<number | string>>} grid - A 2D array of strings or numbers.
 */
export const printGrid = (
  grid: ReadonlyArray<ReadonlyArray<number | string>>,
) => {
  for (const row of grid) {
    console.log(row.join(""));
  }
};

/**
 * Generates all possible permutations of a specified length from a given pool of items.
 * @param {number} itemNumber - Number of items in each permutation.
 * @param {Array<string | number>} itemChoices -The pool of items to generate permutations from.
 * @return {Array<Array<string | number>>} - All possible permutations of the specified length.
 */
export const getPermutations = (
  itemNumber: number,
  itemChoices: Array<number | string>,
): Array<Array<string | number>> => {
  const result: Array<Array<string | number>> = [];

  function backtrack(
    permutation: Array<string | number>,
    remainingOptions: Array<string | number>,
  ): void {
    if (permutation.length === itemNumber) {
      result.push([...permutation]);
      return;
    }

    for (let i = 0; i < remainingOptions.length; i++) {
      const option = remainingOptions[i];
      backtrack(
        [...permutation, option],
        [...remainingOptions.slice(0, i), ...remainingOptions.slice(i + 1)],
      );
    }
  }

  backtrack([], itemChoices);
  return result;
};
