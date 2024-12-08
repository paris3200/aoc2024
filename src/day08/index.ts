import run from "aocrunner";

const debug = false;
const log = (...str: any[]) => {
  if (debug) {
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

const getPermutations = (items: number, options: string[]): string[][] => {
  const result: string[][] = [];

  function backtrack(permutation: string[], remainingOptions: string[]): void {
    if (permutation.length === items) {
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

  backtrack([], options);
  return result;
};

const calcVectorPoints = (pt1: [number, number], pt2: [number, number]) => {
  const pt1X = pt1[1];
  const pt1Y = pt1[0];
  const pt2X = pt2[1];
  const pt2Y = pt2[0];

  const xHalf = (pt1X - pt2X) * 2;
  const yHalf = (pt1Y - pt2Y) * 2;

  const pointBeyond1 = [pt1Y + yHalf, pt1X + xHalf];
  const pointBeyond2 = [pt2Y - yHalf, pt2X - xHalf];

  return [pointBeyond1, pointBeyond2];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const maxX = input[0].length;
  const maxY = input.length;

  const antinode = new Set();

  const antennas = getAntennas(input);
  console.log(antennas);

  for (const [frequency, points] of antennas) {
    log("Frequency", frequency);
    log("Points:", points);
    let lines = getPermutations(2, points);

    for (const line of lines) {
      const [node1, node2] = calcVectorPoints(line[0], line[1]);

      if (
        node1[0] < maxY &&
        node1[0] >= 0 &&
        node1[1] < maxX &&
        node1[1] >= 0
      ) {
        antinode.add(node1);
      }

      if (
        node2[0] < maxY &&
        node2[0] >= 0 &&
        node2[1] < maxX &&
        node2[1] >= 0
      ) {
        antinode.add(node2);
      }
    }

    printGrid(input);
    console.log();
  }

  console.log(antinode);
  return antinode.size.toString();
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
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: "14",
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
  onlyTests: true,
});
