import run from "aocrunner";

let debug = false;
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

  const [deltaY, deltaX] = getSlope(pt1, pt2);

  const pointBeyond1 = [pt1Y + deltaY, pt1X + deltaX];
  const pointBeyond2 = [pt2Y - deltaY, pt2X - deltaX];

  return [pointBeyond1, pointBeyond2];
};

const getSlope = (pt1: [number, number], pt2: [number, number]) => {
  const pt1X = pt1[1];
  const pt1Y = pt1[0];
  const pt2X = pt2[1];
  const pt2Y = pt2[0];

  const deltaX = pt1X - pt2X;
  const deltaY = pt1Y - pt2Y;

  return [deltaY, deltaX];
};

const isInt = (value: string | number) => {
  return Number.isInteger(Number(value));
};

const calcLine = (
  pt1: [number, number],
  pt2: [number, number],
  maxX: number,
  maxY: number,
) => {
  const points = [pt1, pt2];
  const [deltaY, deltaX] = getSlope(pt1, pt2);
  const antinodes = new Set();

  points.forEach((point) => {
    let currentX = point[1] + deltaX;
    let currentY = point[0] + deltaY;

    //Add
    while (
      currentX <= maxX &&
      currentX >= 0 &&
      currentY <= maxY &&
      currentY >= 0
    ) {
      currentX += deltaX;
      currentY += deltaY;

      if (
        currentX <= maxX &&
        currentX >= 0 &&
        currentY <= maxY &&
        currentY >= 0
      ) {
        if (isInt(currentX) && isInt(currentY)) {
          antinodes.add([currentY, currentX].toString());
        }
      }
    }

    currentX = point[1] - deltaX;
    currentY = point[0] - deltaY;
    //Subtract
    while (
      currentX <= maxX &&
      currentX >= 0 &&
      currentY <= maxY &&
      currentY >= 0
    ) {
      currentX -= deltaX;
      currentY -= deltaY;

      if (
        currentX <= maxX &&
        currentX >= 0 &&
        currentY <= maxY &&
        currentY >= 0
      ) {
        if (isInt(currentX) && isInt(currentY)) {
          antinodes.add([currentY, currentX].toString());
        }
      }
    }
  });

  return antinodes;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const maxX = input[0].length;
  const maxY = input.length;

  const antinode = new Set();

  const antennas = getAntennas(input);
  log(antennas);

  for (const [frequency, points] of antennas) {
    log("Frequency", frequency);
    log("Points:", points);
    let lines = getPermutations(2, points);

    for (const line of lines) {
      const nodes = calcVectorPoints(line[0], line[1]);
      for (const node of nodes) {
        if (node[0] < maxY && node[0] >= 0 && node[1] < maxX && node[1] >= 0) {
          antinode.add(node.toString());
        }
      }
    }
  }

  return antinode.size.toString();
};

const part2 = (rawInput: string) => {
  debug = false;
  const input = parseInput(rawInput);
  const maxX = input[0].length - 1;
  const maxY = input.length - 1;

  log("Max X:", maxX);
  log("Max Y:", maxY);
  const antinode = new Set();
  const antennas = getAntennas(input);
  log(antennas);

  for (const [frequency, points] of antennas) {
    log("Frequency", frequency);
    log("Points:", points);
    let lines = getPermutations(2, points);

    for (const line of lines) {
      antinode.add(line[0].toString());
      antinode.add(line[1].toString());
      let harmonics = calcLine(line[0], line[1], maxX, maxY);
      for (const harmonic of harmonics) {
        antinode.add(harmonic);
      }

      const nodes = calcVectorPoints(line[0], line[1]);
      for (const node of nodes) {
        if (node[0] < maxY && node[0] >= 0 && node[1] < maxX && node[1] >= 0) {
          antinode.add(node.toString());
        }
      }
    }
  }

  if (debug) {
    console.log(antinode);
    const points = Array.from(antinode, (pair) => pair.split(",").map(Number));
    console.log(points);
    for (const point of points) {
      input[point[0]][point[1]] = "#";
    }
    printGrid(input);
  }
  return antinode.size.toString();
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
      {
        input: `T.........
...T......
.T........
..........
..........
..........
..........
..........
..........
..........`,
        expected: "9",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
