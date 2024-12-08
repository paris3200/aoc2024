import run from "aocrunner";

const onlyTests = true;
const log = (...str: any[]) => {
  if (onlyTests) {
    console.log(...str);
  }
};

const parseInput = (rawInput: string): string[][] => {
  return rawInput
    .trim()
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.split(""));
};

const printGrid = (grid: ReadonlyArray<ReadonlyArray<number | string>>) => {
  for (const row of grid) {
    console.log(row.join(""));
  }
};

const getAntennas = (
  grid: readonly (readonly (number | string)[])[],
): Map<string | number, string[]> => {
  const result = new Map<string | number, string[]>();

  for (const [i, row] of grid.entries()) {
    for (const [j, value] of row.entries()) {
      const coordinates = [i, j];

      if (value !== ".") {
        if (result.has(value)) {
          result.get(value)!.push(coordinates);
        } else {
          result.set(value, [coordinates]);
        }
      }
    }
  }

  return result;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  printGrid(input);

  log(getAntennas(input));

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  log(input);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `..........
..........
..........
....a.....
..........
.....a....
..........
..........
..........
..........`,
        expected: "2",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests,
});
